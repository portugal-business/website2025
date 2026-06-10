"use server";

// =====================================================================
//  CMS « Mon site » — Server Actions (ACTIVES, phase mock).
//  Contrairement à src/platform/actions/* (exclues du build car liées à
//  Supabase), celles-ci mutent le store mock et sont câblées dès
//  maintenant. À la migration : remplacer les appels store par les
//  requêtes Supabase, signatures et validation conservées.
// =====================================================================

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ZodType } from "zod";
import { getConsultantSession } from "@/platform/lib/session";
import type { SiteContent } from "@/platform/types";
import {
  type SitePostPatchInput,
  siteFaqsSchema,
  siteHeroSchema,
  siteIdentitySchema,
  sitePostPatchSchema,
  siteServicesSchema,
  siteStatsSchema,
  siteTestimonialsSchema,
} from "./schemas";
import {
  createSitePost,
  deleteSitePost,
  publishSite,
  revertSiteDraft,
  saveSiteDraft,
  setSitePostStatus,
  updateSitePost,
} from "./store";

export interface ActionResult {
  ok: boolean;
  /** message d'erreur lisible (FR) si ok = false */
  error?: string;
}

const SITE_PATH = "/app/site";

function firstIssue(error: { issues: { message: string }[] }): string {
  return error.issues[0]?.message ?? "Saisie invalide.";
}

async function saveSection<K extends keyof SiteContent>(
  key: K,
  schema: ZodType<SiteContent[K]>,
  input: SiteContent[K],
): Promise<ActionResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const { org } = await getConsultantSession();
  await saveSiteDraft(org.id, { [key]: parsed.data });
  revalidatePath(SITE_PATH, "layout");
  return { ok: true };
}

// --- Sections du brouillon --------------------------------------------

export async function saveIdentityAction(input: SiteContent["identity"]): Promise<ActionResult> {
  return saveSection("identity", siteIdentitySchema, input);
}

export async function saveHeroAction(input: SiteContent["hero"]): Promise<ActionResult> {
  return saveSection("hero", siteHeroSchema, input);
}

export async function saveServicesAction(input: SiteContent["services"]): Promise<ActionResult> {
  return saveSection("services", siteServicesSchema, input);
}

export async function saveStatsAction(input: SiteContent["stats"]): Promise<ActionResult> {
  return saveSection("stats", siteStatsSchema, input);
}

export async function saveTestimonialsAction(
  input: SiteContent["testimonials"],
): Promise<ActionResult> {
  return saveSection("testimonials", siteTestimonialsSchema, input);
}

export async function saveFaqsAction(input: SiteContent["faqs"]): Promise<ActionResult> {
  return saveSection("faqs", siteFaqsSchema, input);
}

// --- Publication --------------------------------------------------------

export async function publishSiteAction(): Promise<ActionResult> {
  const { org, user } = await getConsultantSession();
  const publication = await publishSite(org.id, user.fullName);
  if (!publication) return { ok: false, error: "Aucune modification à publier." };
  revalidatePath(SITE_PATH, "layout");
  return { ok: true };
}

export async function revertSiteDraftAction(): Promise<ActionResult> {
  const { org } = await getConsultantSession();
  await revertSiteDraft(org.id);
  revalidatePath(SITE_PATH, "layout");
  return { ok: true };
}

// --- Blog ----------------------------------------------------------------

export async function createPostAction(): Promise<void> {
  const { org } = await getConsultantSession();
  const post = await createSitePost(org.id);
  revalidatePath(SITE_PATH, "layout");
  redirect(`/app/site/blog/${post.id}`);
}

export async function savePostAction(id: string, input: SitePostPatchInput): Promise<ActionResult> {
  const parsed = sitePostPatchSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  try {
    await updateSitePost(id, parsed.data);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Enregistrement impossible." };
  }
  revalidatePath(SITE_PATH, "layout");
  return { ok: true };
}

export async function setPostStatusAction(
  id: string,
  status: "draft" | "published",
): Promise<ActionResult> {
  try {
    await setSitePostStatus(id, status);
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Changement de statut impossible.",
    };
  }
  revalidatePath(SITE_PATH, "layout");
  return { ok: true };
}

export async function deletePostAction(id: string): Promise<void> {
  await deleteSitePost(id);
  revalidatePath(SITE_PATH, "layout");
  redirect("/app/site/blog");
}
