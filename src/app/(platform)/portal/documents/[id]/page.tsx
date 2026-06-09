import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocStatusBadge } from "@/platform/components/bits";
import { DocumentPreview } from "@/platform/components/documents/document-preview";
import { SignFlow } from "@/platform/components/portal/sign-flow";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { getDocument } from "@/platform/data";
import { DOCUMENT_TYPE } from "@/platform/lib/constants";
import { formatCents } from "@/platform/lib/format";
import { getClientSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Document" };

export default async function PortalDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { mission, client } = await getClientSession();
  const doc = await getDocument(id);
  // Sécurité (mock) : le client ne voit que les documents de sa mission.
  if (!doc || doc.missionId !== mission.id) notFound();

  const toSign = doc.type !== "facture" && doc.status === "sent";

  return (
    <div className="space-y-6">
      <Link
        href="/portal/documents"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Mes documents
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <DocumentPreview doc={doc} />
        </div>

        <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardHeader
              title={DOCUMENT_TYPE[doc.type]}
              description={`${doc.number} · ${formatCents(doc.totalTtcCents)}`}
              action={<DocStatusBadge status={doc.status} />}
            />
            <CardBody>
              {toSign ? (
                <SignFlow signerName={client.fullName} documentLabel="ce contrat" />
              ) : doc.signature ? (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">
                    Vous avez signé ce document le{" "}
                    <span className="font-semibold">
                      {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
                        new Date(doc.signature.signedAt),
                      )}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-2 font-sans text-xs font-semibold text-foreground transition-colors hover:border-accent/60"
                  >
                    <Download className="h-3.5 w-3.5" /> Télécharger ma copie signée
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-2 font-sans text-xs font-semibold text-foreground transition-colors hover:border-accent/60"
                >
                  <Download className="h-3.5 w-3.5" /> Télécharger le PDF
                </button>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
