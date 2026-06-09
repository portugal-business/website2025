"use server";

import { z } from "zod";
import {
  IFICI_TREE_VERSION,
  type IficiAnswers,
  type IficiResult,
} from "@/lib/outils/ifici-questions";
import { captureToolLead } from "@/lib/outils/tool-lead";

// ── Arbre de décision DÉTERMINISTE (côté serveur uniquement) ───────────────
// Fonction PURE, non exportée : le mapping réponses → verdict ne quitte jamais
// le serveur. Mêmes réponses → même résultat. Aucune randomisation, aucun LLM.
function evaluateIfici(a: IficiAnswers): IficiResult {
  const treeVersion = IFICI_TREE_VERSION;

  // 1. Knock-outs (priorité absolue)
  if (a.q1 === "R5_OUI") return { code: "R2", reasonKey: "residencePT", treeVersion };
  if (a.q6 === "ANT_RNH" || a.q6 === "ANT_IFICI")
    return { code: "R2", reasonKey: "dejaBeneficiaire", treeVersion };

  // 2. Branche retraité (exclu de l'IFICI sur ses pensions)
  if (a.q2 === "REV_PENSION") return { code: "R4", variant: a.q2b ?? "PENS_MIXTE", treeVersion };

  // 3. Revenus passifs (rentier / investisseur passif : exclu)
  if (a.q2 === "REV_PASSIF") return { code: "R2", reasonKey: "revenusPassifs", treeVersion };

  // Règle de dégradation par incertitude : un R1 sur base douteuse devient R3.
  const hasDoubt =
    a.q1 === "R5_DOUTE" || a.q2 === "REV_DOUTE" || a.q4 === "EXP_DOUTE" || a.q5 === "CERT_DOUTE";
  const degrade = (code: IficiResult["code"]): IficiResult["code"] =>
    code === "R1" && hasDoubt ? "R3" : code;

  // 4-5. Voies éligibles (profils actifs qualifiés)
  switch (a.q3) {
    case "PROF_RECHERCHE":
    case "PROF_RD":
    case "PROF_STARTUP":
      return { code: degrade(a.q5 === "CERT_OUI" ? "R1" : "R3"), treeVersion };
    case "PROF_QUALIFIEE":
      if (a.q4 === "EXP_OUI") return { code: degrade("R1"), treeVersion };
      if (a.q4 === "EXP_DOUTE") return { code: "R3", treeVersion };
      return { code: "R2", reasonKey: "secteurNonEligible", treeVersion }; // EXP_NON
    case "PROF_FREELANCE":
      if (a.q4 === "EXP_OUI") return { code: "R3", treeVersion };
      return { code: "R2", reasonKey: "secteurNonEligible", treeVersion };
    default: // PROF_AUTRE ou non renseigné
      return { code: "R2", reasonKey: "secteurNonEligible", treeVersion };
  }
}

const answersSchema = z.object({
  q1: z.enum(["R5_NON", "R5_OUI", "R5_DOUTE"]).optional(),
  q2: z.enum(["REV_SALAIRE", "REV_INDEP", "REV_PENSION", "REV_PASSIF", "REV_DOUTE"]).optional(),
  q2b: z.enum(["PENS_PRIVE", "PENS_PUBLIC", "PENS_MIXTE"]).optional(),
  q3: z
    .enum([
      "PROF_RECHERCHE",
      "PROF_QUALIFIEE",
      "PROF_RD",
      "PROF_STARTUP",
      "PROF_FREELANCE",
      "PROF_AUTRE",
    ])
    .optional(),
  q4: z.enum(["EXP_OUI", "EXP_NON", "EXP_DOUTE"]).optional(),
  q5: z.enum(["CERT_OUI", "CERT_NON", "CERT_DOUTE"]).optional(),
  q6: z.enum(["ANT_NON", "ANT_RNH", "ANT_IFICI"]).optional(),
  horizon: z.enum(["DEJA", "M12", "PLUS_TARD", "RENSEIGNE"]).optional(),
});

/** Calcule le verdict côté serveur à partir du vecteur de réponses. */
export async function getIficiResult(answers: IficiAnswers): Promise<IficiResult> {
  const parsed = answersSchema.safeParse(answers);
  const a = parsed.success ? (parsed.data as IficiAnswers) : {};
  return evaluateIfici(a);
}

const leadSchema = z.object({
  email: z.string().trim().email().max(160),
  consentExecution: z.boolean(),
  consentMarketing: z.boolean(),
  locale: z.string().max(5),
  resultCode: z.string().max(4),
  // Honeypot anti-spam : doit rester vide.
  company: z.string().max(0).optional(),
});

export type IficiLeadState = { status: "idle" | "success" | "error" };

/** Capture email NON BLOQUANTE : le résultat reste affiché quoi qu'il arrive. */
export async function submitIficiLead(
  _prev: IficiLeadState,
  formData: FormData,
): Promise<IficiLeadState> {
  const parsed = leadSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    consentExecution: formData.get("consentExecution") === "on",
    consentMarketing: formData.get("consentMarketing") === "on",
    locale: String(formData.get("locale") ?? "fr"),
    resultCode: String(formData.get("resultCode") ?? ""),
    company: String(formData.get("company") ?? ""),
  });
  if (!parsed.success) return { status: "error" };

  const d = parsed.data;
  const ok = await captureToolLead({
    email: d.email,
    source: "test-ifici",
    locale: d.locale,
    consentExecution: d.consentExecution,
    consentMarketing: d.consentMarketing,
    summary: `Résultat IFICI : ${d.resultCode}`,
    payload: { resultCode: d.resultCode, treeVersion: IFICI_TREE_VERSION },
  });
  return { status: ok ? "success" : "error" };
}
