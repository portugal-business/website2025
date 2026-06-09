"use server";
// Server Actions, Leads (CRM consultant). EXCLU du build jusqu'à la migration.
import { revalidatePath } from "next/cache";
import { TRACKER_STEPS } from "@/platform/lib/constants";
import {
  addLeadNoteSchema,
  convertLeadSchema,
  createLeadSchema,
  updateLeadStatusSchema,
} from "@/platform/lib/validation";
import { createClient } from "@/platform/supabase/server";

async function orgId(sb: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await sb.rpc("current_org_id");
  return data as string;
}

export async function createLead(input: unknown) {
  const data = createLeadSchema.parse(input);
  const sb = await createClient();
  const org = await orgId(sb);
  const { data: lead, error } = await sb
    .from("leads")
    .insert({
      org_id: org,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      source: "manual", // → attribution own_network (trigger)
      context: data.context,
    })
    .select("id")
    .single();
  if (error) throw error;
  await sb.from("lead_activities").insert({
    org_id: org,
    lead_id: lead.id,
    type: "system",
    body: "Lead créé manuellement (réseau propre).",
    author: "Consultant",
  });
  revalidatePath("/app/leads");
  return lead;
}

export async function updateLeadStatus(input: unknown) {
  const data = updateLeadStatusSchema.parse(input);
  const sb = await createClient();
  const { data: lead, error } = await sb
    .from("leads")
    .update({ status: data.status, last_activity_at: new Date().toISOString() })
    .eq("id", data.leadId)
    .select("org_id")
    .single();
  if (error) throw error;
  await sb.from("lead_activities").insert({
    org_id: lead.org_id,
    lead_id: data.leadId,
    type: "status_change",
    body: `Statut → ${data.status}.`,
    author: "Consultant",
  });
  revalidatePath(`/app/leads/${data.leadId}`);
}

export async function addLeadNote(input: unknown) {
  const data = addLeadNoteSchema.parse(input);
  const sb = await createClient();
  const { data: lead } = await sb.from("leads").select("org_id").eq("id", data.leadId).single();
  await sb.from("lead_activities").insert({
    org_id: lead?.org_id,
    lead_id: data.leadId,
    type: "note",
    body: data.body,
    author: "Consultant",
  });
  revalidatePath(`/app/leads/${data.leadId}`);
}

/** Convertit un lead en client + mission (avec tracker). */
export async function convertLead(input: unknown) {
  const data = convertLeadSchema.parse(input);
  const sb = await createClient();
  const { data: lead } = await sb
    .from("leads")
    .select("*")
    .eq("id", data.leadId)
    .single();
  if (!lead) throw new Error("Lead introuvable");

  const { data: client } = await sb
    .from("clients")
    .insert({
      org_id: lead.org_id,
      lead_id: lead.id,
      full_name: lead.full_name,
      email: lead.email,
      phone: lead.phone,
      company_name_wanted: data.companyNameWanted,
    })
    .select("id")
    .single();
  if (!client) throw new Error("Création client échouée");

  const { data: mission } = await sb
    .from("missions")
    .insert({
      org_id: lead.org_id,
      client_id: client.id,
      lead_id: lead.id,
      ref: `BP-2026-${Math.floor(Date.now() / 1000) % 1000}`,
      status: "active",
      company_form: data.companyForm,
      company_name_wanted: data.companyNameWanted,
      started_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (!mission) throw new Error("Création mission échouée");

  await sb.from("mission_steps").insert(
    TRACKER_STEPS.map((s, i) => ({
      org_id: lead.org_id,
      mission_id: mission.id,
      step_key: s.key,
      label: s.label,
      description: s.description,
      status: i === 0 ? "done" : "pending",
      ordinal: i,
    })),
  );

  await sb
    .from("leads")
    .update({ status: "won", client_id: client.id })
    .eq("id", lead.id);

  revalidatePath("/app/leads");
  revalidatePath("/app/missions");
  return { clientId: client.id, missionId: mission.id };
}
