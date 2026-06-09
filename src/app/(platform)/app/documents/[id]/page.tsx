import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocStatusBadge } from "@/platform/components/bits";
import { DocumentActions } from "@/platform/components/documents/document-actions";
import { DocumentPreview } from "@/platform/components/documents/document-preview";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { getDocument, getMission } from "@/platform/data";
import { DOCUMENT_TYPE } from "@/platform/lib/constants";
import { formatCents, formatDateTime } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Document" };

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await getDocument(id);
  if (!doc) notFound();
  const mission = await getMission(doc.missionId);

  return (
    <div className="space-y-6">
      <Link
        href="/app/documents"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Documents
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Aperçu papier */}
        <div>
          <DocumentPreview doc={doc} />
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title={doc.number}
              description={DOCUMENT_TYPE[doc.type]}
              action={<DocStatusBadge status={doc.status} />}
            />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Client</span>
                <span className="font-semibold text-foreground">{doc.payload.clientName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total TTC</span>
                <span className="tnum font-semibold text-accent">
                  {formatCents(doc.totalTtcCents)}
                </span>
              </div>
              {mission ? (
                <Link
                  href={`/app/missions/${mission.id}`}
                  className="flex items-center justify-between text-sm text-foreground hover:text-accent"
                >
                  <span className="text-muted-foreground">Mission</span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    {mission.ref} <ExternalLink className="h-3 w-3" />
                  </span>
                </Link>
              ) : null}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Actions" />
            <CardBody>
              <DocumentActions status={doc.status} type={doc.type} />
            </CardBody>
          </Card>

          {doc.signature ? (
            <Card>
              <CardHeader
                title="Piste d'audit"
                description="Signature électronique (valeur probante)"
              />
              <CardBody>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-[color:var(--tone-success-fg)]" />
                  <dl className="space-y-1.5 text-xs">
                    <Row label="Signataire" value={doc.signature.signerName} />
                    <Row label="E-mail" value={doc.signature.signerEmail} />
                    <Row label="Date / heure" value={formatDateTime(doc.signature.signedAt)} />
                    <Row label="Adresse IP" value={doc.signature.ip} />
                    <Row label="Navigateur" value={doc.signature.userAgent} truncate />
                  </dl>
                </div>
                <p className="mt-3 rounded-sm bg-muted/50 px-3 py-2 text-[0.7rem] text-muted-foreground italic">
                  « {doc.signature.consentText} »
                </p>
              </CardBody>
            </Card>
          ) : null}

          {doc.type === "lettre_mission" && doc.status === "sent" ? (
            <div className="rounded-md border border-accent/30 bg-accent/[0.06] p-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">En attente côté client</p>
              <p className="mt-1">
                Le client lit et signe cette lettre depuis son portail. La signature déclenchera la
                facturation Propul'SEO (lead inbound).
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, truncate }: { label: string; value: string; truncate?: boolean }) {
  return (
    <div>
      <dt className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className={truncate ? "truncate text-foreground" : "text-foreground"}>{value}</dd>
    </div>
  );
}
