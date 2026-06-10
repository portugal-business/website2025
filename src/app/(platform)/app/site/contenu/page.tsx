import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaqEditor } from "@/platform/components/site/faq-editor";
import { ServicesEditor } from "@/platform/components/site/services-editor";
import { StatsEditor } from "@/platform/components/site/stats-editor";
import { TestimonialsEditor } from "@/platform/components/site/testimonials-editor";
import { PageHeader } from "@/platform/components/ui/page-header";
import { getSiteState } from "@/platform/data";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Contenu — Mon site" };
export const dynamic = "force-dynamic";

export default async function SiteContentPage() {
  const { org } = await getConsultantSession();
  const state = await getSiteState(org.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site vitrine"
        title="Contenu du site"
        description="Services, chiffres clés, avis et FAQ. Enregistrez chaque bloc, puis publiez depuis Mon site."
        actions={
          <Link
            href="/app/site"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à Mon site
          </Link>
        }
      />
      <ServicesEditor initial={state.draft.services} />
      <StatsEditor initial={state.draft.stats} />
      <TestimonialsEditor initial={state.draft.testimonials} />
      <FaqEditor initial={state.draft.faqs} />
    </div>
  );
}
