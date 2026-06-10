import { ArrowLeft, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPostAction } from "@/platform/cms/actions";
import { Badge } from "@/platform/components/ui/badge";
import { Card } from "@/platform/components/ui/card";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listSitePosts } from "@/platform/data";
import { formatDate } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Blog — Mon site" };
export const dynamic = "force-dynamic";

export default async function SiteBlogPage() {
  const { org } = await getConsultantSession();
  const posts = await listSitePosts(org.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site vitrine"
        title="Blog"
        description="Articles du site. Un article n'apparaît sur le site qu'une fois publié."
        actions={
          <>
            <Link
              href="/app/site"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Retour à Mon site
            </Link>
            <form action={createPostAction}>
              <button type="submit" className={cn(buttonVariants({ size: "sm" }))}>
                <Plus className="h-4 w-4" /> Nouvel article
              </button>
            </form>
          </>
        }
      />

      <Card>
        {posts.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted-foreground">
            Aucun article. Créez le premier avec « Nouvel article ».
          </p>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/app/site/blog/${post.id}`}
                className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-3.5 transition-colors hover:bg-muted/40"
              >
                <Badge tone={post.status === "published" ? "success" : "neutral"} dot>
                  {post.status === "published" ? "Publié" : "Brouillon"}
                </Badge>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-sans text-sm font-semibold text-foreground">
                    {post.title.fr}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    /blog/{post.slug} · {post.category} · {post.readingMinutes} min
                  </div>
                </div>
                <span className="text-xs text-muted-foreground tnum">
                  maj {formatDate(post.updatedAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
