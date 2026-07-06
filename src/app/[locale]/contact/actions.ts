"use server";

import { z } from "zod";

/**
 * Server Action du formulaire de qualification (Contact).
 *
 * Variable d'environnement à configurer pour l'envoi réel :
 *   BREVO_API_KEY, clé API Brevo (transactional). Optionnelle : si absente,
 *                     l'action retourne un succès sans envoi (mode dev), sans
 *                     jamais crasher.
 *   BREVO_TO_EMAIL, (optionnel) liste de destinataires séparés par des virgules ;
 *                     remplace la liste par défaut (Audrey + suivi Propul'SEO).
 */

// Expéditeur technique des notifications (boîte vérifiée côté Brevo).
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL ?? "audrey.marques@portugal-business.com";

// Destinataires des notifications de lead. Par défaut : Audrey (relation client)
// + suivi Propul'SEO. Surchargeable via BREVO_TO_EMAIL (emails séparés par ",").
const DEFAULT_RECIPIENTS = [
  { email: "audrey.marques@portugal-business.com", name: "Audrey Marques, Business Portugal" },
  { email: "team@propulseo-site.com", name: "Suivi Propul'SEO" },
];

function resolveRecipients(): { email: string; name?: string }[] {
  const override = process.env.BREVO_TO_EMAIL;
  if (!override) return DEFAULT_RECIPIENTS;
  const emails = override
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
  return emails.length > 0 ? emails : DEFAULT_RECIPIENTS;
}

// Valeurs autorisées pour le type de projet (alignées sur le réseau de services).
const PROJECT_TYPES = [
  "creation",
  "comptabilite",
  "fiscalite",
  "domiciliation",
  "recrutement",
  "autre",
] as const;

const TIMEFRAMES = ["immediate", "trimestre", "semestre", "exploration"] as const;

// Schéma de validation bilingue : les messages sont des clés résolues côté client.
const schema = z.object({
  firstName: z.string().trim().min(1, "firstName").max(80),
  lastName: z.string().trim().min(1, "lastName").max(80),
  email: z.string().trim().min(1, "emailRequired").email("emailInvalid").max(160),
  projectType: z.enum(PROJECT_TYPES, { message: "projectType" }),
  country: z.string().trim().min(1, "country").max(80),
  timeframe: z.enum(TIMEFRAMES, { message: "timeframe" }),
  message: z.string().trim().min(10, "message").max(4000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  // Clés d'erreur par champ (résolues en libellés localisés côté client).
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
  // Clé d'erreur globale (ex. "network").
  formError?: string;
  // Conserve les valeurs saisies pour re-remplir le formulaire après erreur.
  values?: Record<string, string>;
};

const PROJECT_LABELS: Record<(typeof PROJECT_TYPES)[number], string> = {
  creation: "Création de société",
  comptabilite: "Comptabilité (mise en relation)",
  fiscalite: "Fiscalité (mise en relation)",
  domiciliation: "Domiciliation",
  recrutement: "Recrutement (mise en relation)",
  autre: "Autre",
};

const TIMEFRAME_LABELS: Record<(typeof TIMEFRAMES)[number], string> = {
  immediate: "Dès que possible",
  trimestre: "Dans les 3 mois",
  semestre: "Dans les 6 mois",
  exploration: "Je me renseigne",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    email: String(formData.get("email") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    country: String(formData.get("country") ?? ""),
    timeframe: String(formData.get("timeframe") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", fieldErrors, values: raw };
  }

  const data = parsed.data;

  const projectLabel = PROJECT_LABELS[data.projectType];
  const timeframeLabel = TIMEFRAME_LABELS[data.timeframe];
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  // 1) Persistance du lead dans Supabase (best-effort : ne bloque jamais l'envoi).
  const leadSaved = await persistLead(data);

  // 2) Notification email à Audrey via Brevo (best-effort).
  const apiKey = process.env.BREVO_API_KEY;
  const emailSent = apiKey
    ? await sendBrevoNotification(apiKey, {
        fullName,
        email: data.email,
        projectLabel,
        timeframeLabel,
        country: data.country,
        message: data.message,
      })
    : false;

  // En production, si AUCUN canal n'a abouti, ne pas afficher un faux succès :
  // on invite l'utilisateur à réessayer / écrire directement.
  if (process.env.NODE_ENV === "production" && !leadSaved && !emailSent) {
    return { status: "error", formError: "network", values: raw };
  }

  return { status: "success" };
}

// Enregistre le lead dans Supabase via l'API REST (aucune dépendance ajoutée).
// Actif uniquement si SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY sont définis et
// que la table `leads` existe (schéma documenté dans web/.env.example).
async function persistLead(data: z.infer<typeof schema>): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        project_type: data.projectType,
        country: data.country,
        timeframe: data.timeframe,
        message: data.message,
        source: "contact-form",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendBrevoNotification(
  apiKey: string,
  lead: {
    fullName: string;
    email: string;
    projectLabel: string;
    timeframeLabel: string;
    country: string;
    message: string;
  },
): Promise<boolean> {
  const htmlContent = `
    <h2>Nouvelle demande de qualification</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Nom</strong></td><td>${escapeHtml(lead.fullName)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td><strong>Type de projet</strong></td><td>${escapeHtml(lead.projectLabel)}</td></tr>
      <tr><td><strong>Pays de résidence</strong></td><td>${escapeHtml(lead.country)}</td></tr>
      <tr><td><strong>Échéance</strong></td><td>${escapeHtml(lead.timeframeLabel)}</td></tr>
      <tr><td valign="top"><strong>Message</strong></td><td>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `.trim();

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Business Portugal, Formulaire", email: FROM_EMAIL },
        to: resolveRecipients(),
        replyTo: { email: lead.email, name: lead.fullName },
        subject: `Nouvelle demande, ${lead.projectLabel} (${lead.fullName})`,
        htmlContent,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
