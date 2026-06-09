// =====================================================================
//  Accesseurs Supabase, CIBLE DU SWAP de @/platform/data.
//  Mêmes signatures que la couche mock (src/platform/mock/db.ts) pour que
//  `export * from "./supabase"` dans data/index.ts soit un swap transparent.
//  Lectures scopées par RLS (le client server porte la session du viewer).
//  EXCLU du build front (tsconfig + biome) jusqu'à la migration.
// =====================================================================
import type {
  BillingEvent,
  BusinessDocument,
  Client,
  ClientFile,
  ID,
  Lead,
  LeadActivity,
  Mission,
  MissionStep,
  Org,
  OrgMember,
} from "@/platform/types";
import { createClient } from "@/platform/supabase/server";

// rows DB (snake_case), typage souple, dossier exclu du lint/tsc
type Row = Record<string, any>;

// --- mappers row → type domaine -------------------------------------
const toOrg = (r: Row): Org => ({
  id: r.id,
  name: r.name,
  brandName: r.brand_name,
  vatId: r.vat_id ?? undefined,
  location: r.location ?? undefined,
  branding: r.branding ?? { logoText: r.brand_name },
  plan: r.plan,
  perClientFeeCents: r.per_client_fee_cents,
  monthlyFeeCents: r.monthly_fee_cents,
  status: r.status,
  createdAt: r.created_at,
});

const toLead = (r: Row): Lead => ({
  id: r.id,
  orgId: r.org_id,
  fullName: r.full_name,
  email: r.email,
  phone: r.phone ?? undefined,
  locale: r.locale,
  source: r.source,
  attribution: r.attribution,
  status: r.status,
  segment: r.segment,
  leadScore: r.lead_score,
  context: r.context ?? {},
  ownerId: r.owner_id ?? undefined,
  clientId: r.client_id ?? undefined,
  createdAt: r.created_at,
  lastActivityAt: r.last_activity_at,
  consentMarketing: r.consent_marketing,
});

const toActivity = (r: Row): LeadActivity => ({
  id: r.id,
  leadId: r.lead_id,
  type: r.type,
  body: r.body,
  author: r.author,
  createdAt: r.created_at,
});

const toClient = (r: Row): Client => ({
  id: r.id,
  orgId: r.org_id,
  leadId: r.lead_id ?? undefined,
  fullName: r.full_name,
  email: r.email,
  phone: r.phone ?? undefined,
  companyNameWanted: r.company_name_wanted ?? undefined,
  countryOfResidence: r.country_of_residence ?? undefined,
  createdAt: r.created_at,
});

const toStep = (r: Row): MissionStep => ({
  key: r.step_key,
  label: r.label,
  description: r.description,
  status: r.status,
  order: r.ordinal,
  doneAt: r.done_at ?? undefined,
});

const toMission = (r: Row): Mission => ({
  id: r.id,
  orgId: r.org_id,
  clientId: r.client_id,
  leadId: r.lead_id ?? undefined,
  ref: r.ref,
  type: r.type,
  status: r.status,
  companyForm: r.company_form,
  companyNameWanted: r.company_name_wanted ?? undefined,
  nipc: r.nipc ?? undefined,
  steps: (r.mission_steps ?? []).map(toStep).sort((a: MissionStep, b: MissionStep) => a.order - b.order),
  startedAt: r.started_at ?? undefined,
  completedAt: r.completed_at ?? undefined,
  createdAt: r.created_at,
});

const toDocument = (r: Row): BusinessDocument => {
  const sig = Array.isArray(r.signatures) ? r.signatures[0] : r.signatures;
  return {
    id: r.id,
    orgId: r.org_id,
    missionId: r.mission_id,
    clientId: r.client_id,
    type: r.type,
    status: r.status,
    number: r.number,
    title: r.title,
    payload: r.payload,
    totalHtCents: r.total_ht_cents,
    totalTtcCents: r.total_ttc_cents,
    signature: sig
      ? {
          signerName: sig.signer_name,
          signerEmail: sig.signer_email,
          signedAt: sig.signed_at,
          ip: sig.ip,
          userAgent: sig.user_agent,
          consentText: sig.consent_text,
        }
      : undefined,
    createdAt: r.created_at,
    sentAt: r.sent_at ?? undefined,
    signedAt: r.signed_at ?? undefined,
  };
};

const toFile = (r: Row): ClientFile => ({
  id: r.id,
  orgId: r.org_id,
  missionId: r.mission_id,
  kind: r.kind,
  label: r.label,
  hint: r.hint ?? undefined,
  status: r.status,
  fileName: r.file_name ?? undefined,
  uploadedAt: r.uploaded_at ?? undefined,
});

const toBilling = (r: Row): BillingEvent => ({
  id: r.id,
  orgId: r.org_id,
  type: r.type,
  missionId: r.mission_id ?? undefined,
  label: r.label,
  amountCents: r.amount_cents,
  period: r.period,
  status: r.status,
  createdAt: r.created_at,
});

const DOC_SELECT = "*, signatures(*)";
const MISSION_SELECT = "*, mission_steps(*)";

// --- Orgs ------------------------------------------------------------
export async function listOrgs(): Promise<Org[]> {
  const sb = await createClient();
  const { data } = await sb.from("orgs").select("*").order("created_at");
  return (data ?? []).map(toOrg);
}
export async function getOrg(id: ID): Promise<Org | undefined> {
  const sb = await createClient();
  const { data } = await sb.from("orgs").select("*").eq("id", id).maybeSingle();
  return data ? toOrg(data) : undefined;
}
export async function listOrgMembers(orgId: ID): Promise<OrgMember[]> {
  const sb = await createClient();
  const { data } = await sb
    .from("org_members")
    .select("id, org_id, role, profiles(id, email, full_name)")
    .eq("org_id", orgId);
  return (data ?? []).map((r: Row) => ({
    id: r.id,
    orgId: r.org_id,
    role: r.role,
    user: {
      id: r.profiles?.id,
      email: r.profiles?.email,
      fullName: r.profiles?.full_name ?? r.profiles?.email,
    },
  }));
}

// --- Leads -----------------------------------------------------------
export async function listLeads(orgId: ID): Promise<Lead[]> {
  const sb = await createClient();
  const { data } = await sb
    .from("leads")
    .select("*")
    .eq("org_id", orgId)
    .order("last_activity_at", { ascending: false });
  return (data ?? []).map(toLead);
}
export async function getLead(id: ID): Promise<Lead | undefined> {
  const sb = await createClient();
  const { data } = await sb.from("leads").select("*").eq("id", id).maybeSingle();
  return data ? toLead(data) : undefined;
}
export async function listAllLeads(): Promise<Lead[]> {
  const sb = await createClient();
  const { data } = await sb.from("leads").select("*");
  return (data ?? []).map(toLead);
}
export async function listLeadActivities(leadId: ID): Promise<LeadActivity[]> {
  const sb = await createClient();
  const { data } = await sb
    .from("lead_activities")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });
  return (data ?? []).map(toActivity);
}

// --- Clients ---------------------------------------------------------
export async function listClients(orgId: ID): Promise<Client[]> {
  const sb = await createClient();
  const { data } = await sb.from("clients").select("*").eq("org_id", orgId);
  return (data ?? []).map(toClient);
}
export async function getClient(id: ID): Promise<Client | undefined> {
  const sb = await createClient();
  const { data } = await sb.from("clients").select("*").eq("id", id).maybeSingle();
  return data ? toClient(data) : undefined;
}

// --- Missions --------------------------------------------------------
export async function listMissions(orgId: ID): Promise<Mission[]> {
  const sb = await createClient();
  const { data } = await sb
    .from("missions")
    .select(MISSION_SELECT)
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });
  return (data ?? []).map(toMission);
}
export async function getMission(id: ID): Promise<Mission | undefined> {
  const sb = await createClient();
  const { data } = await sb.from("missions").select(MISSION_SELECT).eq("id", id).maybeSingle();
  return data ? toMission(data) : undefined;
}
export async function getMissionByClient(clientId: ID): Promise<Mission | undefined> {
  const sb = await createClient();
  const { data } = await sb
    .from("missions")
    .select(MISSION_SELECT)
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? toMission(data) : undefined;
}

// --- Documents -------------------------------------------------------
export async function listDocuments(orgId: ID): Promise<BusinessDocument[]> {
  const sb = await createClient();
  const { data } = await sb
    .from("documents")
    .select(DOC_SELECT)
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });
  return (data ?? []).map(toDocument);
}
export async function getDocument(id: ID): Promise<BusinessDocument | undefined> {
  const sb = await createClient();
  const { data } = await sb.from("documents").select(DOC_SELECT).eq("id", id).maybeSingle();
  return data ? toDocument(data) : undefined;
}
export async function listMissionDocuments(missionId: ID): Promise<BusinessDocument[]> {
  const sb = await createClient();
  const { data } = await sb
    .from("documents")
    .select(DOC_SELECT)
    .eq("mission_id", missionId)
    .order("created_at", { ascending: false });
  return (data ?? []).map(toDocument);
}

// --- Fichiers --------------------------------------------------------
export async function listClientFiles(missionId: ID): Promise<ClientFile[]> {
  const sb = await createClient();
  const { data } = await sb.from("client_files").select("*").eq("mission_id", missionId);
  return (data ?? []).map(toFile);
}

// --- Facturation -----------------------------------------------------
export async function listBillingEvents(orgId?: ID): Promise<BillingEvent[]> {
  const sb = await createClient();
  let q = sb.from("billing_events").select("*").order("created_at", { ascending: false });
  if (orgId) q = q.eq("org_id", orgId);
  const { data } = await q;
  return (data ?? []).map(toBilling);
}

export function isPlatformAdmin(_userId: ID): boolean {
  // L'isolation est portée par la RLS ; ce helper mock-only n'est plus utilisé côté Supabase.
  return false;
}

// --- Agrégats --------------------------------------------------------
export interface OrgMetrics {
  newLeads: number;
  inboundLeads: number;
  ownNetworkLeads: number;
  activeMissions: number;
  completedMissions: number;
  docsToSign: number;
  signedClientsMonth: number;
  pipelineValueCents: number;
}

export async function getOrgMetrics(orgId: ID): Promise<OrgMetrics> {
  const sb = await createClient();
  const count = async (table: string, build: (q: any) => any) =>
    (await build(sb.from(table).select("*", { count: "exact", head: true }).eq("org_id", orgId)))
      .count ?? 0;

  const [newLeads, inboundLeads, ownNetworkLeads, activeMissions, completedMissions, docsToSign] =
    await Promise.all([
      count("leads", (q) => q.eq("status", "new")),
      count("leads", (q) => q.eq("attribution", "inbound")),
      count("leads", (q) => q.eq("attribution", "own_network")),
      count("missions", (q) => q.eq("status", "active")),
      count("missions", (q) => q.eq("status", "completed")),
      count("documents", (q) => q.eq("type", "lettre_mission").eq("status", "sent")),
    ]);
  const signedClientsMonth = await count("documents", (q) =>
    q.eq("type", "lettre_mission").not("signed_at", "is", null).gte("signed_at", "2026-05-01"),
  );
  const qualified = await count("leads", (q) => q.in("status", ["qualified", "proposal"]));

  return {
    newLeads,
    inboundLeads,
    ownNetworkLeads,
    activeMissions,
    completedMissions,
    docsToSign,
    signedClientsMonth,
    pipelineValueCents: qualified * 110000,
  };
}

export interface PlatformMetrics {
  orgs: number;
  activeOrgs: number;
  mrrCents: number;
  signedClientsMonthCents: number;
  totalInboundLeads: number;
  billableSignedClients: number;
}

export async function getPlatformMetrics(): Promise<PlatformMetrics> {
  const sb = await createClient();
  const { data: orgs } = await sb.from("orgs").select("monthly_fee_cents, status");
  const { data: signed } = await sb
    .from("billing_events")
    .select("amount_cents, type, period")
    .eq("type", "signed_client")
    .gte("period", "2026-05");
  const { count: inbound } = await sb
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("attribution", "inbound");

  const active = (orgs ?? []).filter((o: Row) => o.status === "active");
  return {
    orgs: (orgs ?? []).length,
    activeOrgs: active.length,
    mrrCents: active.reduce((s: number, o: Row) => s + o.monthly_fee_cents, 0),
    signedClientsMonthCents: (signed ?? []).reduce((s: number, b: Row) => s + b.amount_cents, 0),
    totalInboundLeads: inbound ?? 0,
    billableSignedClients: (signed ?? []).length,
  };
}
