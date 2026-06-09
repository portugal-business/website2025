import { ArrowLeft, FileText, FolderUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyFormLabel, DocStatusBadge, MissionStatusBadge } from "@/platform/components/bits";
import { Tracker, trackerProgress } from "@/platform/components/tracker";
import { Badge } from "@/platform/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Progress } from "@/platform/components/ui/progress";
import { getClient, getMission, listClientFiles, listMissionDocuments } from "@/platform/data";
import { DOCUMENT_TYPE, FILE_STATUS_LABEL } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Mission" };

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = await getMission(id);
  if (!mission) notFound();
  const [client, docs, files] = await Promise.all([
    getClient(mission.clientId),
    listMissionDocuments(mission.id),
    listClientFiles(mission.id),
  ]);
  const pct = trackerProgress(mission.steps);
  const filesReceived = files.filter((f) => f.status !== "requested").length;

  return (
    <div className="space-y-6">
      <Link
        href="/app/missions"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Missions
      </Link>

      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow mb-1">{mission.ref}</div>
          <h1 className="display text-2xl text-foreground">{mission.companyNameWanted}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <MissionStatusBadge status={mission.status} />
            <Badge tone="neutral">{companyFormLabel(mission.companyForm)}</Badge>
            {client ? (
              <Link
                href={`/app/clients/${client.id}`}
                className="font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                {client.fullName}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-1 flex items-center justify-between font-sans text-xs text-muted-foreground">
            <span>Avancement</span>
            <span className="tnum">{pct}%</span>
          </div>
          <Progress value={pct} tone="accent" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Tracker */}
        <Card>
          <CardHeader title="Suivi du dossier" description="Les étapes de la création de société" />
          <CardBody>
            <Tracker steps={mission.steps} />
          </CardBody>
        </Card>

        <div className="space-y-6">
          {/* Détails */}
          <Card>
            <CardHeader title="Détails" />
            <CardBody>
              <dl className="space-y-2.5 text-sm">
                <Row label="Forme juridique" value={companyFormLabel(mission.companyForm)} />
                <Row label="NIPC" value={mission.nipc ?? "-"} />
                <Row
                  label="Démarrée le"
                  value={mission.startedAt ? formatDate(mission.startedAt) : "-"}
                />
                {mission.completedAt ? (
                  <Row label="Terminée le" value={formatDate(mission.completedAt)} />
                ) : null}
              </dl>
            </CardBody>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader
              title="Documents"
              action={<span className="text-xs text-muted-foreground">{docs.length}</span>}
            />
            <div className="divide-y divide-border">
              {docs.map((d) => (
                <Link
                  key={d.id}
                  href={`/app/documents/${d.id}`}
                  className="row-link flex items-center justify-between gap-3 px-5 py-3 transition-colors"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FileText className="h-4 w-4 flex-none text-muted-foreground" />
                    <div className="min-w-0">
                      <div className="truncate font-sans text-sm font-semibold text-foreground">
                        {DOCUMENT_TYPE[d.type]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {d.number} · {formatCents(d.totalTtcCents)}
                      </div>
                    </div>
                  </div>
                  <DocStatusBadge status={d.status} />
                </Link>
              ))}
            </div>
          </Card>

          {/* Pièces */}
          <Card>
            <CardHeader
              title="Pièces du client"
              description={`${filesReceived} / ${files.length} reçues`}
            />
            <div className="divide-y divide-border">
              {files.map((f) => (
                <div key={f.id} className="flex items-center justify-between gap-3 px-5 py-2.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FolderUp className="h-4 w-4 flex-none text-muted-foreground" />
                    <span className="truncate font-sans text-sm text-foreground">{f.label}</span>
                  </div>
                  <Badge tone={FILE_STATUS_LABEL[f.status].tone}>
                    {FILE_STATUS_LABEL[f.status].label}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
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
