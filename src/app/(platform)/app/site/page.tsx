import { ExternalLink, History, Newspaper, PenLine } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_SECTION_META, SITE_SECTION_ORDER } from "@/platform/cms/constants";
import { PublishBar } from "@/platform/components/site/publish-bar";
import { Badge } from "@/platform/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { PageHeader } from "@/platform/components/ui/page-header";
import { getSiteState, listSitePosts } from "@/platform/data";
import { formatDateTime } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Mon site" };
// Store CMS mutable : rendu à la requête pour refléter chaque sauvegarde.
export const dynamic = "force-dynamic";

export default async function SitePage() {
  const { org } = await getConsultantSession();
  const [state, posts] = await Promise.all([getSiteState(org.id), listSitePosts(org.id)]);
  const publishedPosts = posts.filter((p) => p.status === "published").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site vitrine"
        title="Mon site"
        description="Modifiez le contenu de votre site, puis publiez quand tout est prêt. Rien ne change tant que vous n'avez pas publié."
        actions={
          <Link
            href="/app/site/apercu"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <ExternalLink className="h-4 w-4" /> Aperçu du site
          </Link>
        }
      />

      <PublishBar
        dirtySections={state.dirtySections}
        publishedAtLabel={state.publishedAt ? formatDateTime(state.publishedAt) : undefined}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_SECTION_ORDER.map((key) => {
          const meta = SITE_SECTION_META[key];
          const dirty = state.dirtySections.includes(key);
          const count = meta.count?.(state.draft);
          return (
            <Link
              key={key}
              href={meta.href}
              className="group rounded-md border border-border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-sans text-sm font-semibold text-foreground">{meta.label}</h3>
                {dirty ? (
                  <Badge tone="warning" dot>
                    Modifié
                  </Badge>
                ) : (
                  <Badge tone="neutral">Publié</Badge>
                )}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{meta.description}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent">
                <PenLine className="h-3.5 w-3.5" />
                {count !== undefined ? `${count} élément${count > 1 ? "s" : ""} · ` : ""}Modifier
              </p>
            </Link>
          );
        })}

        {/* Blog */}
        <Link
          href="/app/site/blog"
          className="group rounded-md border border-border bg-card p-5 transition-colors hover:border-foreground/30"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans text-sm font-semibold text-foreground">Blog</h3>
            <Badge tone="info">{posts.length}</Badge>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {publishedPosts} publié{publishedPosts > 1 ? "s" : ""} · {posts.length - publishedPosts}{" "}
            brouillon{posts.length - publishedPosts > 1 ? "s" : ""}
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent">
            <Newspaper className="h-3.5 w-3.5" /> Gérer les articles
          </p>
        </Link>
      </div>

      <Card>
        <CardHeader
          title={
            <span className="inline-flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" /> Historique des publications
            </span>
          }
          description="Chaque publication remplace la version en ligne"
        />
        {state.publications.length === 0 ? (
          <CardBody>
            <p className="text-sm text-muted-foreground">Aucune publication pour le moment.</p>
          </CardBody>
        ) : (
          <div className="divide-y divide-border">
            {state.publications.map((pub) => (
              <div key={pub.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3">
                <span className="font-sans text-xs font-semibold text-foreground tnum">
                  {formatDateTime(pub.publishedAt)}
                </span>
                <span className="text-xs text-muted-foreground">par {pub.publishedBy}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {pub.sections.map((s) => SITE_SECTION_META[s].label).join(" · ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
