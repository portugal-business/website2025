import { ArrowUpRight, FileSignature, Sparkles, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IficiBadge, LeadStatusBadge, ScoreBar, SourceBadge } from "@/platform/components/bits";
import { trackerProgress } from "@/platform/components/tracker";
import { Avatar } from "@/platform/components/ui/avatar";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Progress } from "@/platform/components/ui/progress";
import { Stat } from "@/platform/components/ui/stat";
import {
  getOrgMetrics,
  listClients,
  listDocuments,
  listLeads,
  listMissions,
} from "@/platform/data";
import { formatCents, formatRelative } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function ConsultantDashboard() {
  const { user, org } = await getConsultantSession();
  const [metrics, leads, missions, documents, clients] = await Promise.all([
    getOrgMetrics(org.id),
    listLeads(org.id),
    listMissions(org.id),
    listDocuments(org.id),
    listClients(org.id),
  ]);

  const recentLeads = leads.slice(0, 6);
  const activeMissions = missions.filter((m) => m.status === "active");
  const toSign = documents.filter((d) => d.type === "lettre_mission" && d.status === "sent");
  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="eyebrow">Tableau de bord</div>
        <h1 className="display text-2xl text-foreground sm:text-[1.7rem]">Bonjour {firstName}.</h1>
        <p className="text-sm text-muted-foreground">
          Voici l'état de {org.brandName} aujourd'hui, leads entrants, dossiers en cours et
          documents à traiter.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Nouveaux leads"
          value={metrics.newLeads}
          hint="à qualifier"
          icon={<Sparkles className="h-4 w-4" />}
        />
        <Stat
          label="Missions en cours"
          value={metrics.activeMissions}
          hint={`${metrics.completedMissions} terminée(s)`}
          icon={<FileSignature className="h-4 w-4" />}
        />
        <Stat
          label="Lettres à signer"
          value={metrics.docsToSign}
          hint="en attente client"
          icon={<FileSignature className="h-4 w-4" />}
        />
        <Stat
          label="Clients (total)"
          value={clients.length}
          hint={`${metrics.inboundLeads} leads inbound`}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Leads récents */}
        <Card>
          <CardHeader
            title="Leads récents"
            description="Triés par dernière activité"
            action={
              <Link href="/app/leads" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Tous les leads
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href={`/app/leads/${lead.id}`}
                className="row-link flex items-center gap-3 px-5 py-3 transition-colors"
              >
                <Avatar name={lead.fullName} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-sans text-sm font-semibold text-foreground">
                      {lead.fullName}
                    </span>
                    {lead.context.ificiResult ? (
                      <IficiBadge result={lead.context.ificiResult} />
                    ) : null}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <SourceBadge source={lead.source} />
                    <span>·</span>
                    <span>{formatRelative(lead.lastActivityAt)}</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <ScoreBar score={lead.leadScore} />
                </div>
                <LeadStatusBadge status={lead.status} />
              </Link>
            ))}
          </div>
        </Card>

        {/* Colonne droite : à signer + missions en cours */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="À traiter" description="Documents en attente" />
            <CardBody className="space-y-3">
              {toSign.length === 0 ? (
                <p className="text-sm text-muted-foreground">Rien en attente. 👏</p>
              ) : (
                toSign.map((d) => (
                  <Link
                    key={d.id}
                    href={`/app/documents/${d.id}`}
                    className="flex items-center justify-between gap-3 rounded-sm border border-border bg-background px-3 py-2.5 transition-colors hover:border-accent/50"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-sans text-sm font-semibold text-foreground">
                        {d.payload.clientName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lettre de mission · {d.number}
                      </div>
                    </div>
                    <span className="font-sans text-xs font-semibold text-accent">
                      {formatCents(d.totalTtcCents)}
                    </span>
                  </Link>
                ))
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Missions en cours"
              action={
                <Link
                  href="/app/missions"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Voir tout
                </Link>
              }
            />
            <CardBody className="space-y-4">
              {activeMissions.map((m) => {
                const pct = trackerProgress(m.steps);
                return (
                  <Link key={m.id} href={`/app/missions/${m.id}`} className="block">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm font-semibold text-foreground">
                        {m.companyNameWanted}
                      </span>
                      <span className="tnum text-xs text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="mb-2 text-xs text-muted-foreground">{m.ref}</div>
                    <Progress value={pct} tone="accent" />
                  </Link>
                );
              })}
            </CardBody>
          </Card>

          <div className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent/[0.06] p-4">
            <Target className="mt-0.5 h-4 w-4 flex-none text-accent" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {metrics.inboundLeads} leads inbound
              </span>{" "}
              attribués à Propul'SEO ce mois, facturés uniquement à la signature d'une lettre de
              mission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
