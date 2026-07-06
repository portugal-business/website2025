// Utilitaire SERVEUR de capture de lead pour les outils interactifs (test IFICI,
// simulateur coût salarié). Best-effort : ne bloque jamais l'affichage du résultat,
// ne crashe jamais. Réutilise la même mécanique que le formulaire de contact :
//   - Persistance optionnelle dans Supabase (table `tool_leads`, via API REST).
//   - Notification + inscription Brevo (transactionnel + liste avec double opt-in
//     pour la prospection, la confirmation DOI est gérée côté liste Brevo).
//
// Variables d'env (toutes optionnelles, gated, à fournir par Audrey) :
//   BREVO_API_KEY, BREVO_TO_EMAIL, BREVO_TOOL_LIST_ID (liste DOI prospection),
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
//
// SQL `tool_leads` (à créer dans Supabase, RLS deny-all public) :
//   create table public.tool_leads (
//     id uuid primary key default gen_random_uuid(),
//     created_at timestamptz not null default now(),
//     email text not null,
//     source text not null,                       -- 'test-ifici' | 'simulateur-cout-salarie'
//     consent_execution boolean not null default false,
//     consent_marketing boolean not null default false,
//     locale text,
//     payload jsonb                               -- snapshot anonyme (réponses/inputs/segment)
//   );
//   alter table public.tool_leads enable row level security;
//   -- aucune policy publique : accès serveur via service_role uniquement.

// Expéditeur technique (boîte vérifiée côté Brevo).
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL ?? "audrey.marques@portugal-business.com";

// Destinataires des notifications de lead outil : Audrey + suivi Propul'SEO.
// Surchargeable via BREVO_TO_EMAIL (emails séparés par des virgules).
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

export type ToolLeadInput = {
  email: string;
  source: string;
  locale: string;
  /** Finalité 1, exécution : recevoir une copie / être recontacté (non bloquant). */
  consentExecution: boolean;
  /** Finalité 2, prospection : actualités fiscales (double opt-in Brevo). */
  consentMarketing: boolean;
  /** Récap lisible inséré dans la notification email à Audrey. */
  summary: string;
  /** Snapshot anonyme (réponses, inputs, segment), sans PII. */
  payload?: Record<string, unknown>;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function persistLead(input: ToolLeadInput): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url}/rest/v1/tool_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: input.email,
        source: input.source,
        consent_execution: input.consentExecution,
        consent_marketing: input.consentMarketing,
        locale: input.locale,
        payload: input.payload ?? null,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function notifyBrevo(apiKey: string, input: ToolLeadInput): Promise<boolean> {
  const html = `
    <h2>Nouveau lead outil, ${escapeHtml(input.source)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Email</strong></td><td>${escapeHtml(input.email)}</td></tr>
      <tr><td><strong>Source</strong></td><td>${escapeHtml(input.source)}</td></tr>
      <tr><td><strong>Langue</strong></td><td>${escapeHtml(input.locale)}</td></tr>
      <tr><td><strong>Consentement copie</strong></td><td>${input.consentExecution ? "oui" : "non"}</td></tr>
      <tr><td><strong>Consentement prospection</strong></td><td>${input.consentMarketing ? "oui (double opt-in à confirmer)" : "non"}</td></tr>
      <tr><td valign="top"><strong>Récap</strong></td><td>${escapeHtml(input.summary).replace(/\n/g, "<br/>")}</td></tr>
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
        sender: { name: "Business Portugal, Outils", email: FROM_EMAIL },
        to: resolveRecipients(),
        replyTo: { email: input.email, name: input.email },
        subject: `Nouveau lead outil, ${input.source}`,
        htmlContent: html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Inscription liste prospection : double opt-in délégué à la config de la liste Brevo.
async function subscribeBrevo(apiKey: string, email: string): Promise<boolean> {
  const listId = process.env.BREVO_TOOL_LIST_ID;
  if (!listId) return false;
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(listId)],
        templateId: Number(process.env.BREVO_DOI_TEMPLATE_ID ?? 1),
        redirectionUrl: "https://portugal-business.com",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Enregistre le lead (best-effort) et déclenche les emails Brevo si configuré.
 * Retourne `false` uniquement quand AUCUN canal n'a abouti EN PRODUCTION (anti
 * faux-succès) ; en dev, retourne toujours `true` pour ne pas casser l'UX.
 */
export async function captureToolLead(input: ToolLeadInput): Promise<boolean> {
  const saved = await persistLead(input);

  const apiKey = process.env.BREVO_API_KEY;
  let notified = false;
  if (apiKey) {
    notified = await notifyBrevo(apiKey, input);
    if (input.consentMarketing) await subscribeBrevo(apiKey, input.email);
  }

  if (process.env.NODE_ENV === "production" && !saved && !notified) return false;
  return true;
}
