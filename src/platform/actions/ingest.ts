"use server";
// =====================================================================
//  Ingestion des leads INBOUND, appelé par le site marketing (formulaire)
//  et les outils gratuits (test IFICI, simulateur). Service role : contourne
//  la RLS pour écrire dans l'org cible. L'attribution est posée par le trigger
//  DB (source != manual → inbound) = incontestable.
//  EXCLU du build front jusqu'à la migration.
// =====================================================================
import { ingestLeadSchema } from "@/platform/lib/validation";
import { createAdminClient } from "@/platform/supabase/admin";

export async function ingestLead(input: unknown) {
  const data = ingestLeadSchema.parse(input);
  const admin = createAdminClient();

  const { data: lead, error } = await admin
    .from("leads")
    .insert({
      org_id: data.orgId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      locale: data.locale,
      source: data.source, // attribution dérivée par trigger
      context: data.context,
      consent_marketing: data.consentMarketing,
    })
    .select("id")
    .single();
  if (error) throw error;

  await admin.from("lead_activities").insert({
    org_id: data.orgId,
    lead_id: lead.id,
    type: "system",
    body: `Lead créé depuis ${data.source}.`,
    author: "Système",
  });

  // TODO migration : Brevo, email transactionnel (copie résultat) + double opt-in
  // si consentMarketing (liste prospection). Jamais Resend.
  return { leadId: lead.id };
}
