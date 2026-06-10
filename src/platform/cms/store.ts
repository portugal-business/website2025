// =====================================================================
//  CMS « Mon site » — store mock ÉCRIVABLE (en mémoire de process).
//  Contrairement à mock/db (lecture seule), ce module persiste les
//  modifications le temps du process `next dev` / `next start` ; il est
//  accroché à globalThis pour survivre au HMR. À la migration Supabase :
//  remplacer le corps des fonctions par des requêtes (tables
//  site_contents / site_publications / site_posts), signatures conservées.
// =====================================================================

import type {
  ID,
  ISODate,
  SiteContent,
  SiteContentState,
  SitePost,
  SitePostStatus,
  SitePublication,
  SiteSectionKey,
} from "@/platform/types";
import { SEED_SITE_CONTENT, SEED_SITE_POSTS } from "./seed";

interface OrgSiteRecord {
  draft: SiteContent;
  published: SiteContent;
  updatedAt: ISODate;
  publishedAt?: ISODate;
  publications: SitePublication[];
}

interface CmsDb {
  site: Map<ID, OrgSiteRecord>;
  posts: SitePost[];
}

const clone = <T>(v: T): T => structuredClone(v);
const now = (): ISODate => new Date().toISOString();

// Accroché à globalThis : en dev, chaque recompilation recharge ce module,
// mais l'état édité doit survivre (sinon toute sauvegarde serait perdue).
const g = globalThis as typeof globalThis & { __bpCmsDb?: CmsDb };

function db(): CmsDb {
  if (!g.__bpCmsDb) {
    g.__bpCmsDb = { site: new Map(), posts: clone(SEED_SITE_POSTS) };
  }
  return g.__bpCmsDb;
}

function orgRecord(orgId: ID): OrgSiteRecord {
  const state = db();
  let rec = state.site.get(orgId);
  if (!rec) {
    // Démo : tout nouvel org démarre avec le contenu Business Portugal.
    rec = {
      draft: clone(SEED_SITE_CONTENT),
      published: clone(SEED_SITE_CONTENT),
      updatedAt: "2026-06-01T09:00:00.000Z",
      publishedAt: "2026-06-01T09:00:00.000Z",
      publications: [
        {
          id: `pub-seed-${orgId}`,
          orgId,
          publishedAt: "2026-06-01T09:00:00.000Z",
          publishedBy: "Audrey Marques",
          sections: ["identity", "hero", "services", "stats", "faqs"],
        },
      ],
    };
    state.site.set(orgId, rec);
  }
  return rec;
}

const SECTION_KEYS: SiteSectionKey[] = [
  "identity",
  "hero",
  "services",
  "stats",
  "testimonials",
  "faqs",
];

function diffSections(a: SiteContent, b: SiteContent): SiteSectionKey[] {
  return SECTION_KEYS.filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
}

// --- Contenu du site --------------------------------------------------

export async function getSiteState(orgId: ID): Promise<SiteContentState> {
  const rec = orgRecord(orgId);
  return {
    orgId,
    draft: clone(rec.draft),
    published: clone(rec.published),
    dirtySections: diffSections(rec.draft, rec.published),
    updatedAt: rec.updatedAt,
    publishedAt: rec.publishedAt,
    publications: clone(rec.publications).sort(
      (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
    ),
  };
}

/** Met à jour une ou plusieurs sections du brouillon (jamais le publié). */
export async function saveSiteDraft(orgId: ID, patch: Partial<SiteContent>): Promise<void> {
  const rec = orgRecord(orgId);
  rec.draft = { ...rec.draft, ...clone(patch) };
  rec.updatedAt = now();
}

/** Publie le brouillon ; retourne la publication, ou null si rien à publier. */
export async function publishSite(orgId: ID, publishedBy: string): Promise<SitePublication | null> {
  const rec = orgRecord(orgId);
  const sections = diffSections(rec.draft, rec.published);
  if (sections.length === 0) return null;
  const publication: SitePublication = {
    id: crypto.randomUUID(),
    orgId,
    publishedAt: now(),
    publishedBy,
    sections,
  };
  rec.published = clone(rec.draft);
  rec.publishedAt = publication.publishedAt;
  rec.publications.push(publication);
  return clone(publication);
}

/** Abandonne les modifications : le brouillon revient à la version publiée. */
export async function revertSiteDraft(orgId: ID): Promise<void> {
  const rec = orgRecord(orgId);
  rec.draft = clone(rec.published);
  rec.updatedAt = now();
}

// --- Blog --------------------------------------------------------------

export async function listSitePosts(orgId: ID): Promise<SitePost[]> {
  return clone(
    db()
      .posts.filter((p) => p.orgId === orgId)
      .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)),
  );
}

export async function getSitePost(id: ID): Promise<SitePost | undefined> {
  return clone(db().posts.find((p) => p.id === id));
}

export async function createSitePost(orgId: ID): Promise<SitePost> {
  const posts = db().posts;
  const base = "nouvel-article";
  let slug = base;
  for (let n = 2; posts.some((p) => p.orgId === orgId && p.slug === slug); n++) {
    slug = `${base}-${n}`;
  }
  const post: SitePost = {
    id: crypto.randomUUID(),
    orgId,
    slug,
    status: "draft",
    title: { fr: "Nouvel article", en: "New post" },
    excerpt: { fr: "", en: "" },
    body: { fr: "", en: "" },
    category: "Création",
    readingMinutes: 3,
    createdAt: now(),
    updatedAt: now(),
  };
  posts.push(post);
  return clone(post);
}

export type SitePostPatch = Partial<
  Pick<SitePost, "slug" | "title" | "excerpt" | "body" | "category" | "readingMinutes">
>;

export async function updateSitePost(id: ID, patch: SitePostPatch): Promise<SitePost> {
  const post = db().posts.find((p) => p.id === id);
  if (!post) throw new Error("Article introuvable.");
  if (
    patch.slug &&
    db().posts.some((p) => p.id !== id && p.orgId === post.orgId && p.slug === patch.slug)
  ) {
    throw new Error("Ce slug est déjà utilisé par un autre article.");
  }
  Object.assign(post, clone(patch), { updatedAt: now() });
  return clone(post);
}

export async function setSitePostStatus(id: ID, status: SitePostStatus): Promise<SitePost> {
  const post = db().posts.find((p) => p.id === id);
  if (!post) throw new Error("Article introuvable.");
  post.status = status;
  post.updatedAt = now();
  if (status === "published" && !post.publishedAt) post.publishedAt = post.updatedAt;
  return clone(post);
}

export async function deleteSitePost(id: ID): Promise<void> {
  const posts = db().posts;
  const idx = posts.findIndex((p) => p.id === id);
  if (idx >= 0) posts.splice(idx, 1);
}
