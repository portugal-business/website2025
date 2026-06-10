import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SitePreview } from "@/platform/components/site/site-preview";
import { Badge } from "@/platform/components/ui/badge";
import { PageHeader } from "@/platform/components/ui/page-header";
import { getSiteState, listSitePosts } from "@/platform/data";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Aperçu — Mon site" };
export const dynamic = "force-dynamic";

function ToggleLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-sm px-3 py-1.5 font-sans text-xs font-semibold transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export default async function SitePreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ version?: string; lang?: string }>;
}) {
  const params = await searchParams;
  const version = params.version === "published" ? "published" : "draft";
  const lang = params.lang === "en" ? "en" : "fr";

  const { org } = await getConsultantSession();
  const [state, posts] = await Promise.all([getSiteState(org.id), listSitePosts(org.id)]);
  const content = version === "draft" ? state.draft : state.published;
  const publishedPosts = posts.filter((p) => p.status === "published");

  const qs = (v: string, l: string) => `/app/site/apercu?version=${v}&lang=${l}`;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site vitrine"
        title="Aperçu"
        description="Simulation du rendu à partir du contenu géré ici. La mise en ligne réelle sera branchée avec Supabase."
        actions={
          <Link
            href="/app/site"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à Mon site
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-sm border border-border bg-card p-0.5">
          <ToggleLink href={qs("draft", lang)} active={version === "draft"}>
            Brouillon
          </ToggleLink>
          <ToggleLink href={qs("published", lang)} active={version === "published"}>
            Publié
          </ToggleLink>
        </div>
        <div className="inline-flex rounded-sm border border-border bg-card p-0.5">
          <ToggleLink href={qs(version, "fr")} active={lang === "fr"}>
            FR
          </ToggleLink>
          <ToggleLink href={qs(version, "en")} active={lang === "en"}>
            EN
          </ToggleLink>
        </div>
        {version === "draft" && state.dirtySections.length > 0 ? (
          <Badge tone="warning" dot>
            Contient des modifications non publiées
          </Badge>
        ) : null}
      </div>

      <SitePreview content={content} posts={publishedPosts} lang={lang} />
    </div>
  );
}
