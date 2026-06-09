"use server";
// =====================================================================
//  Server Actions, Documents (lettre de mission / contrat / facture).
//  signDocument = DÉCLENCHEUR DE FACTURATION (lettre signée + lead inbound).
//  EXCLU du build front jusqu'à la migration.
// =====================================================================
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { computeTotals } from "@/platform/lib/honoraires";
import {
  generateDocumentSchema,
  sendDocumentSchema,
  signDocumentSchema,
} from "@/platform/lib/validation";
import { createAdminClient } from "@/platform/supabase/admin";
import { createClient } from "@/platform/supabase/server";

function nextNumber(type: string) {
  const prefix = type === "facture" ? "FA" : type === "contrat" ? "CT" : "LM";
  // À la migration : séquence par org (RPC `next_doc_number(org, prefix)`).
  return `${prefix}-2026-${Math.floor(Date.now() / 1000) % 100000}`;
}

export async function generateDocument(input: unknown) {
  const data = generateDocumentSchema.parse(input);
  const sb = await createClient();
  const totals = computeTotals(
    data.lines.map((l) => ({ ...l, vatRate: data.vatRate })),
  );

  const { data: mission } = await sb
    .from("missions")
    .select("id, org_id, client_id")
    .eq("id", data.missionId)
    .single();
  if (!mission) throw new Error("Mission introuvable");

  const { data: doc, error } = await sb
    .from("documents")
    .insert({
      org_id: mission.org_id,
      mission_id: mission.id,
      client_id: mission.client_id,
      type: data.type,
      status: "draft",
      number: nextNumber(data.type),
      title:
        data.type === "facture"
          ? "Facture pro-forma"
          : "Lettre de mission, Création d'entreprise au Portugal",
      payload: {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        companyForm: data.companyForm,
        lines: data.lines.map((l) => ({ ...l, vatRate: data.vatRate })),
        vatRate: data.vatRate,
      },
      total_ht_cents: totals.totalHtCents,
      total_ttc_cents: totals.totalTtcCents,
    })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath("/app/documents");
  return doc;
}

export async function sendDocument(input: unknown) {
  const { documentId } = sendDocumentSchema.parse(input);
  const sb = await createClient();
  const { error } = await sb
    .from("documents")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", documentId);
  if (error) throw error;
  // TODO migration : email Brevo + invitation portail client (double opt-in non requis : transactionnel).
  revalidatePath("/app/documents");
}

/**
 * Signature électronique à valeur probante. Opérations privilégiées via service role :
 * insertion de la signature (audit immuable), passage du document à `signed`, et
 *, si lettre de mission ET lead inbound, création de l'événement de facturation.
 */
export async function signDocument(input: unknown) {
  const data = signDocumentSchema.parse(input);
  const sb = await createClient();
  const admin = createAdminClient();
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = h.get("user-agent") ?? null;

  // Le client ne peut signer que son propre document (vérifié par RLS sur ce SELECT)
  const { data: doc } = await sb
    .from("documents")
    .select("id, org_id, mission_id, type, status, payload, total_ttc_cents")
    .eq("id", data.documentId)
    .single();
  if (!doc) throw new Error("Document introuvable");
  if (doc.status !== "sent") throw new Error("Document non signable");

  const signedAt = new Date().toISOString();
  await admin.from("signatures").insert({
    org_id: doc.org_id,
    document_id: doc.id,
    signer_name: data.signerName,
    signer_email: doc.payload?.clientEmail ?? "",
    signed_at: signedAt,
    ip,
    user_agent: userAgent,
    consent_text:
      "En cochant cette case et en signant, j'accepte les termes du présent document.",
    audit: { ip, userAgent, signedAt },
  });
  await admin
    .from("documents")
    .update({ status: "signed", signed_at: signedAt })
    .eq("id", doc.id);
  await admin.from("audit_log").insert({
    org_id: doc.org_id,
    event: "document_signed",
    entity: "documents",
    entity_id: doc.id,
    ip,
    user_agent: userAgent,
  });

  // Déclencheur de facturation : lettre de mission + lead inbound
  if (doc.type === "lettre_mission") {
    const { data: mission } = await admin
      .from("missions")
      .select("id, org_id, lead_id, company_name_wanted, leads(attribution)")
      .eq("id", doc.mission_id)
      .single();
    const attribution = (mission as { leads?: { attribution?: string } } | null)?.leads
      ?.attribution;
    if (mission && attribution === "inbound") {
      const { data: org } = await admin
        .from("orgs")
        .select("per_client_fee_cents")
        .eq("id", doc.org_id)
        .single();
      await admin.from("billing_events").insert({
        org_id: doc.org_id,
        type: "signed_client",
        mission_id: mission.id,
        label: `Client signé, ${mission.company_name_wanted ?? "mission"} (lead inbound)`,
        amount_cents: org?.per_client_fee_cents ?? 0,
        period: signedAt.slice(0, 7),
        status: "pending",
      });
    }
  }

  revalidatePath("/portal");
  revalidatePath("/app/documents");
}
