"use server";

import { z } from "zod";
import { captureToolLead } from "@/lib/outils/tool-lead";

const leadSchema = z.object({
  email: z.string().trim().email().max(160),
  consentMarketing: z.boolean(),
  locale: z.string().max(5),
  summary: z.string().max(500),
  // Honeypot anti-spam : doit rester vide.
  company: z.string().max(0).optional(),
});

export type SimulateurLeadState = { status: "idle" | "success" | "error" };

/** Capture lead NON BLOQUANTE : le résultat reste affiché à l'écran quoi qu'il arrive. */
export async function submitSimulateurLead(
  _prev: SimulateurLeadState,
  formData: FormData,
): Promise<SimulateurLeadState> {
  const parsed = leadSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    consentMarketing: formData.get("consentMarketing") === "on",
    locale: String(formData.get("locale") ?? "fr"),
    summary: String(formData.get("summary") ?? ""),
    company: String(formData.get("company") ?? ""),
  });
  if (!parsed.success) return { status: "error" };

  const d = parsed.data;
  const ok = await captureToolLead({
    email: d.email,
    source: "simulateur-cout-salarie",
    locale: d.locale,
    // Le consentement RGPD (case non pré-cochée) déclenche le recontact commercial.
    consentExecution: true,
    consentMarketing: d.consentMarketing,
    summary: d.summary,
    payload: { summary: d.summary },
  });
  return { status: ok ? "success" : "error" };
}
