// =====================================================================
//  Session mock, front-first, sans auth réelle.
//  L'espace (route group) détermine l'identité. À la migration : remplacé
//  par Supabase Auth + lecture du membership / client.
// =====================================================================

import { getClient, getMission } from "@/platform/data";
import { ORGS, USER_AUDREY, USER_ETIENNE } from "@/platform/mock/data";
import type { Client, Mission, Org, PlatformUser } from "@/platform/types";

export interface ConsultantSession {
  user: PlatformUser;
  org: Org;
}

export interface AdminSession {
  user: PlatformUser;
}

export interface ClientSession {
  user: PlatformUser;
  client: Client;
  mission: Mission;
  org: Org;
}

/** Org active du consultant (front-first : Business Portugal). */
export const DEMO_ORG_ID = "org-bp";
/** Client de démonstration pour le portail (mission en cours). */
export const DEMO_CLIENT_ID = "client-001";

export async function getConsultantSession(): Promise<ConsultantSession> {
  const org = ORGS.find((o) => o.id === DEMO_ORG_ID);
  if (!org) throw new Error("Org de démo introuvable");
  return { user: USER_AUDREY, org };
}

export async function getAdminSession(): Promise<AdminSession> {
  return { user: USER_ETIENNE };
}

export async function getClientSession(): Promise<ClientSession> {
  const client = await getClient(DEMO_CLIENT_ID);
  if (!client) throw new Error("Client de démo introuvable");
  const mission = await getMission("mission-001");
  if (!mission) throw new Error("Mission de démo introuvable");
  const org = ORGS.find((o) => o.id === client.orgId);
  if (!org) throw new Error("Organisation de démo introuvable");
  return {
    user: { id: "user-client-sofia", fullName: client.fullName, email: client.email },
    client,
    mission,
    org,
  };
}
