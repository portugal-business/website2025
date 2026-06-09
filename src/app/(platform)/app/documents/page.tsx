import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DocStatusBadge } from "@/platform/components/bits";
import { Badge } from "@/platform/components/ui/badge";
import { EmptyState } from "@/platform/components/ui/empty";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listDocuments } from "@/platform/data";
import { DOCUMENT_TYPE } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Documents" };

export default async function DocumentsPage() {
  const { org } = await getConsultantSession();
  const docs = await listDocuments(org.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Production"
        title="Documents"
        description="Lettres de mission, contrats et factures. La signature d'une lettre de mission déclenche la facturation Propul'SEO."
        actions={
          <Link
            href="/app/documents/new"
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            <Plus className="h-4 w-4" />
            Nouvelle lettre de mission
          </Link>
        }
      />

      {docs.length === 0 ? (
        <EmptyState
          title="Aucun document"
          description="Générez votre première lettre de mission."
        />
      ) : (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-border border-b text-left font-sans text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-4 py-2.5 font-semibold">Numéro</th>
                <th className="px-4 py-2.5 font-semibold">Client</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Montant TTC</th>
                <th className="px-4 py-2.5 font-semibold">Statut</th>
                <th className="px-4 py-2.5 font-semibold">Créé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {docs.map((d) => (
                <tr key={d.id} className="row-link transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/app/documents/${d.id}`} className="font-semibold text-foreground">
                      {d.number}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground">{d.payload.clientName}</td>
                  <td className="px-4 py-3">
                    <Badge tone={d.type === "facture" ? "info" : "neutral"}>
                      {DOCUMENT_TYPE[d.type]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 tnum text-foreground">{formatCents(d.totalTtcCents)}</td>
                  <td className="px-4 py-3">
                    <DocStatusBadge status={d.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                    {formatDate(d.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
