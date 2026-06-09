import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LettreGenerator } from "@/platform/components/documents/lettre-generator";
import { PageHeader } from "@/platform/components/ui/page-header";
import { getLead } from "@/platform/data";
import type { CompanyForm } from "@/platform/types";

export const metadata: Metadata = { title: "Nouvelle lettre de mission" };

function guessForm(projet?: string): CompanyForm {
  if (!projet) return "unipessoal_lda";
  const p = projet.toLowerCase();
  if (p.includes("plusieurs") || p.includes("associés") || /\blda\b/.test(p)) return "lda";
  return "unipessoal_lda";
}

export default async function NewDocumentPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const { lead: leadId } = await searchParams;
  const lead = leadId ? await getLead(leadId) : undefined;

  const prefill = {
    clientName: lead?.fullName ?? "",
    clientEmail: lead?.email ?? "",
    companyForm: guessForm(lead?.context.projet),
  };

  return (
    <div className="space-y-6">
      <Link
        href="/app/documents"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Documents
      </Link>
      <PageHeader
        eyebrow="Production"
        title="Nouvelle lettre de mission"
        description={
          lead
            ? `Conversion du lead ${lead.fullName} en client. Vérifiez les honoraires puis générez.`
            : "Renseignez le client et les honoraires. L'aperçu se met à jour en direct."
        }
      />
      <LettreGenerator prefill={prefill} />
    </div>
  );
}
