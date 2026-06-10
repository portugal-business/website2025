import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostEditor } from "@/platform/components/site/post-editor";
import { PageHeader } from "@/platform/components/ui/page-header";
import { getSitePost } from "@/platform/data";

export const metadata: Metadata = { title: "Article — Mon site" };
export const dynamic = "force-dynamic";

export default async function SiteBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getSitePost(id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site vitrine · Blog"
        title={post.title.fr || "Article"}
        description={`/blog/${post.slug}`}
        actions={
          <Link
            href="/app/site/blog"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Tous les articles
          </Link>
        }
      />
      <PostEditor initial={post} />
    </div>
  );
}
