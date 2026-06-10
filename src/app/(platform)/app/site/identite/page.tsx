import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { HeroForm } from "@/platform/components/site/hero-form";
import { IdentityForm } from "@/platform/components/site/identity-form";
import { PageHeader } from "@/platform/components/ui/page-header";
import { getSiteState } from "@/platform/data";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Identité & accueil — Mon site" };
export const dynamic = "force-dynamic";

export default async function SiteIdentityPage() {
  const { org } = await getConsultantSession();
  const state = await getSiteState(org.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site vitrine"
        title="Identité & accueil"
        description="Coordonnées affichées partout sur le site, et premier écran de la page d'accueil."
        actions={
          <Link
            href="/app/site"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à Mon site
          </Link>
        }
      />
      <IdentityForm initial={state.draft.identity} />
      <HeroForm initial={state.draft.hero} />
    </div>
  );
}
