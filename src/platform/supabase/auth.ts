// =====================================================================
//  Auth & session Supabase, mêmes shapes que src/platform/lib/session.ts.
//  À la migration : `lib/session.ts` devient `export * from "@/platform/supabase/auth"`.
//  EXCLU du build front jusqu'à la migration.
// =====================================================================
import { redirect } from "next/navigation";
import {
  getClient,
  getMissionByClient,
  getOrg,
} from "@/platform/data/supabase";
import type { Client, Mission, Org, PlatformUser } from "@/platform/types";
import { createClient } from "./server";

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

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  app_role: "platform_admin" | "consultant" | "client";
  org_id: string | null;
  client_id: string | null;
}

async function requireProfile(): Promise<Profile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, app_role, org_id, client_id")
    .eq("id", user.id)
    .single();
  if (!profile) redirect("/login");
  return profile as Profile;
}

function toUser(p: Profile): PlatformUser {
  return { id: p.id, fullName: p.full_name ?? p.email, email: p.email };
}

export async function getConsultantSession(): Promise<ConsultantSession> {
  const profile = await requireProfile();
  if (profile.app_role !== "consultant" || !profile.org_id) redirect("/login");
  const org = await getOrg(profile.org_id);
  if (!org) redirect("/login");
  return { user: toUser(profile), org };
}

export async function getAdminSession(): Promise<AdminSession> {
  const profile = await requireProfile();
  if (profile.app_role !== "platform_admin") redirect("/login");
  return { user: toUser(profile) };
}

export async function getClientSession(): Promise<ClientSession> {
  const profile = await requireProfile();
  if (profile.app_role !== "client" || !profile.client_id) redirect("/login");
  const client = await getClient(profile.client_id);
  if (!client) redirect("/login");
  const mission = await getMissionByClient(client.id);
  if (!mission) redirect("/login");
  const org = await getOrg(client.orgId);
  if (!org) redirect("/login");
  return { user: toUser(profile), client, mission, org };
}
