import { Download, FileSignature, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DocStatusBadge } from "@/platform/components/bits";
import { Card } from "@/platform/components/ui/card";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listMissionDocuments } from "@/platform/data";
import { DOCUMENT_TYPE } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";
import { getClientSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Mes documents" };

export default async function PortalDocuments() {
  const { mission } = await getClientSession();
  const docs = await listMissionDocuments(mission.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Documents"
        title="Mes documents"
        description="Vos lettres de mission, contrats et factures, à lire, signer ou télécharger."
      />

      <Card>
        <div className="divide-y divide-border">
          {docs.map((d) => {
            const toSign = d.type !== "facture" && d.status === "sent";
            return (
              <div key={d.id} className="flex items-center gap-3 px-5 py-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-sm bg-muted text-muted-foreground">
                  {d.type === "facture" ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <FileSignature className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-sans text-sm font-semibold text-foreground">
                    {d.title}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{DOCUMENT_TYPE[d.type]}</span>
                    <span>·</span>
                    <span>{d.number}</span>
                    <span>·</span>
                    <span>{formatCents(d.totalTtcCents)}</span>
                    <span>·</span>
                    <span>{formatDate(d.createdAt)}</span>
                  </div>
                </div>
                <DocStatusBadge status={d.status} />
                <Link
                  href={`/portal/documents/${d.id}`}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 font-sans text-xs font-semibold text-foreground transition-colors hover:border-accent/60"
                >
                  {toSign ? (
                    <>
                      <FileSignature className="h-3.5 w-3.5 text-accent" /> Signer
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" /> Ouvrir
                    </>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
