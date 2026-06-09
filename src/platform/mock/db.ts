// =====================================================================
//  Accesseurs mock, imitent des requêtes Supabase (async, scoping org).
//  À la migration : remplacer le corps par des requêtes ; signatures conservées.
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
  Org,
  OrgMember,
} from "@/platform/types";
import {
  ALL_LEADS,
  BILLING_EVENTS,
  CLIENT_FILES,
  CLIENTS,
  DOCUMENTS,
  LEAD_ACTIVITIES,
  LEADS,
  MISSIONS,
  ORG_MEMBERS,
  ORGS,
  PLATFORM_ADMIN_IDS,
} from "./data";

// petit clone pour éviter les mutations accidentelles côté UI
const clone = <T>(v: T): T => structuredClone(v);

// --- Orgs ------------------------------------------------------------

export async function listOrgs(): Promise<Org[]> {
  return clone(ORGS);
}

export async function getOrg(id: ID): Promise<Org | undefined> {
  return clone(ORGS.find((o) => o.id === id));
}

export async function listOrgMembers(orgId: ID): Promise<OrgMember[]> {
  return clone(ORG_MEMBERS.filter((m) => m.orgId === orgId));
}

export function isPlatformAdmin(userId: ID): boolean {
  return PLATFORM_ADMIN_IDS.includes(userId);
}

// --- Leads -----------------------------------------------------------

export async function listLeads(orgId: ID): Promise<Lead[]> {
  return clone(
    LEADS.filter((l) => l.orgId === orgId).sort(
      (a, b) => +new Date(b.lastActivityAt) - +new Date(a.lastActivityAt),
    ),
  );
}

export async function getLead(id: ID): Promise<Lead | undefined> {
  return clone(ALL_LEADS.find((l) => l.id === id));
}

/** Tous les leads, tous orgs confondus (admin plateforme). */
export async function listAllLeads(): Promise<Lead[]> {
  return clone(ALL_LEADS);
}

export async function listLeadActivities(leadId: ID): Promise<LeadActivity[]> {
  return clone(
    LEAD_ACTIVITIES.filter((a) => a.leadId === leadId).sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    ),
  );
}

// --- Clients ---------------------------------------------------------

export async function listClients(orgId: ID): Promise<Client[]> {
  return clone(CLIENTS.filter((c) => c.orgId === orgId));
}

export async function getClient(id: ID): Promise<Client | undefined> {
  return clone(CLIENTS.find((c) => c.id === id));
}

// --- Missions --------------------------------------------------------

export async function listMissions(orgId: ID): Promise<Mission[]> {
  return clone(
    MISSIONS.filter((m) => m.orgId === orgId).sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    ),
  );
}

export async function getMission(id: ID): Promise<Mission | undefined> {
  return clone(MISSIONS.find((m) => m.id === id));
}

export async function getMissionByClient(clientId: ID): Promise<Mission | undefined> {
  return clone(MISSIONS.find((m) => m.clientId === clientId));
}

// --- Documents -------------------------------------------------------

export async function listDocuments(orgId: ID): Promise<BusinessDocument[]> {
  return clone(
    DOCUMENTS.filter((d) => d.orgId === orgId).sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    ),
  );
}

export async function getDocument(id: ID): Promise<BusinessDocument | undefined> {
  return clone(DOCUMENTS.find((d) => d.id === id));
}

export async function listMissionDocuments(missionId: ID): Promise<BusinessDocument[]> {
  return clone(
    DOCUMENTS.filter((d) => d.missionId === missionId).sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    ),
  );
}

// --- Fichiers client -------------------------------------------------

export async function listClientFiles(missionId: ID): Promise<ClientFile[]> {
  return clone(CLIENT_FILES.filter((f) => f.missionId === missionId));
}

// --- Facturation -----------------------------------------------------

export async function listBillingEvents(orgId?: ID): Promise<BillingEvent[]> {
  const rows = orgId ? BILLING_EVENTS.filter((b) => b.orgId === orgId) : BILLING_EVENTS;
  return clone([...rows].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
}

// =====================================================================
//  Agrégats dérivés (KPIs dashboards)
// =====================================================================

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
  const leads = LEADS.filter((l) => l.orgId === orgId);
  const missions = MISSIONS.filter((m) => m.orgId === orgId);
  const docs = DOCUMENTS.filter((d) => d.orgId === orgId);
  const signedMonth = docs.filter(
    (d) =>
      d.type === "lettre_mission" && d.signedAt && d.signedAt >= "2026-05-01" && d.orgId === orgId,
  ).length;
  return {
    newLeads: leads.filter((l) => l.status === "new").length,
    inboundLeads: leads.filter((l) => l.attribution === "inbound").length,
    ownNetworkLeads: leads.filter((l) => l.attribution === "own_network").length,
    activeMissions: missions.filter((m) => m.status === "active").length,
    completedMissions: missions.filter((m) => m.status === "completed").length,
    docsToSign: docs.filter((d) => d.type === "lettre_mission" && d.status === "sent").length,
    signedClientsMonth: signedMonth,
    pipelineValueCents:
      leads.filter((l) => ["qualified", "proposal"].includes(l.status)).length * 110000,
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
  const mrr = ORGS.filter((o) => o.status === "active").reduce(
    (sum, o) => sum + o.monthlyFeeCents,
    0,
  );
  const signedMonth = BILLING_EVENTS.filter(
    (b) => b.type === "signed_client" && b.period >= "2026-05",
  );
  return {
    orgs: ORGS.length,
    activeOrgs: ORGS.filter((o) => o.status === "active").length,
    mrrCents: mrr,
    signedClientsMonthCents: signedMonth.reduce((s, b) => s + b.amountCents, 0),
    totalInboundLeads: ALL_LEADS.filter((l) => l.attribution === "inbound").length,
    billableSignedClients: signedMonth.length,
  };
}
