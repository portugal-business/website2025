import { ArrowLeft, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyFormLabel, DocStatusBadge, MissionStatusBadge } from "@/platform/components/bits";
import { Tracker, trackerProgress } from "@/platform/components/tracker";
import { Avatar } from "@/platform/components/ui/avatar";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Progress } from "@/platform/components/ui/progress";
import { getClient, getMissionByClient, listMissionDocuments } from "@/platform/data";
import { DOCUMENT_TYPE } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Client" };

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const mission = await getMissionByClient(client.id);
  const docs = mission ? await listMissionDocuments(mission.id) : [];

  return (
    <div className="space-y-6">
      <Link
        href="/app/clients"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Clients
      </Link>

      <div className="flex items-start gap-4 border-b border-border pb-5">
        <Avatar name={client.fullName} size="lg" />
        <div>
          <h1 className="display text-2xl text-foreground">{client.fullName}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a
              href={`mailto:${client.email}`}
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" /> {client.email}
            </a>
            {client.phone ? (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> {client.phone}
              </span>
            ) : null}
            {client.countryOfResidence ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {client.countryOfResidence}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {mission ? (
          <Card>
            <CardHeader
              title="Mission de création"
              description={`${mission.ref} · ${companyFormLabel(mission.companyForm)}`}
              action={
                <Link
                  href={`/app/missions/${mission.id}`}
                  className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-accent"
                >
                  Ouvrir <ExternalLink className="h-3 w-3" />
                </Link>
              }
            />
            <CardBody>
              <div className="mb-4 flex items-center gap-3">
                <MissionStatusBadge status={mission.status} />
                <Progress
                  value={trackerProgress(mission.steps)}
                  tone="accent"
                  className="max-w-xs"
                />
              </div>
              <Tracker steps={mission.steps} />
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardBody>
              <p className="text-sm text-muted-foreground">Pas encore de mission pour ce client.</p>
            </CardBody>
          </Card>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader title="Coordonnées" />
            <CardBody>
              <dl className="space-y-2.5 text-sm">
                <Row label="Société souhaitée" value={client.companyNameWanted ?? "-"} />
                <Row label="Résidence" value={client.countryOfResidence ?? "-"} />
                <Row label="Client depuis" value={formatDate(client.createdAt)} />
              </dl>
            </CardBody>
          </Card>

          {docs.length > 0 ? (
            <Card>
              <CardHeader title="Documents" />
              <div className="divide-y divide-border">
                {docs.map((d) => (
                  <Link
                    key={d.id}
                    href={`/app/documents/${d.id}`}
                    className="row-link flex items-center justify-between gap-3 px-5 py-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-sans text-sm font-semibold text-foreground">
                        {DOCUMENT_TYPE[d.type]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {d.number} · {formatCents(d.totalTtcCents)}
                      </div>
                    </div>
                    <DocStatusBadge status={d.status} />
                  </Link>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
