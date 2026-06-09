import { ArrowLeft, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AttributionBadge,
  IficiBadge,
  LeadStatusBadge,
  ScoreBar,
  SourceBadge,
} from "@/platform/components/bits";
import { LeadActionsPanel } from "@/platform/components/leads/lead-actions";
import { LeadTimeline } from "@/platform/components/leads/lead-timeline";
import { Avatar } from "@/platform/components/ui/avatar";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { getLead, listLeadActivities } from "@/platform/data";
import { LEAD_SEGMENT, LEAD_SOURCE } from "@/platform/lib/constants";
import { formatCents, formatDateTime } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Fiche lead" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const activities = await listLeadActivities(lead.id);
  const ctx = lead.context;

  return (
    <div className="space-y-6">
      <Link
        href="/app/leads"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Leads
      </Link>

      {/* En-tête */}
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar name={lead.fullName} size="lg" />
          <div>
            <h1 className="display text-2xl text-foreground">{lead.fullName}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" /> {lead.email}
              </a>
              {lead.phone ? (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {lead.phone}
                </span>
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <LeadStatusBadge status={lead.status} />
              <SourceBadge source={lead.source} />
              <AttributionBadge attribution={lead.attribution} />
            </div>
          </div>
        </div>
        <div className="flex-none">
          <span className="mb-1 block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Score lead
          </span>
          <ScoreBar score={lead.leadScore} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Colonne gauche */}
        <div className="space-y-6">
          {/* Contexte */}
          <Card>
            <CardHeader
              title="Contexte"
              description={`Apporté par : ${LEAD_SOURCE[lead.source].label}`}
            />
            <CardBody className="space-y-4">
              {ctx.ificiResult ? (
                <div className="space-y-2">
                  <IficiBadge result={ctx.ificiResult} />
                  <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Info label="Verdict IFICI">{ctx.ificiResultLabel}</Info>
                    <Info label="Horizon d'installation">{ctx.ificiHorizon}</Info>
                  </dl>
                </div>
              ) : null}

              {ctx.simCoutAnnuel ? (
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Info label="Brut mensuel">{formatCents((ctx.simBrutMensuel ?? 0) * 100)}</Info>
                  <Info label="Salariés">{ctx.simNbSalaries}</Info>
                  <Info label="Coût annuel est.">
                    {formatCents((ctx.simCoutAnnuel ?? 0) * 100)}
                  </Info>
                  <Info label="Surcoût / brut">+{ctx.simSurcoutPct}%</Info>
                </dl>
              ) : null}

              <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Info label="Segment">{LEAD_SEGMENT[lead.segment]}</Info>
                <Info label="Langue">{lead.locale === "en" ? "Anglais" : "Français"}</Info>
              </dl>

              {ctx.projet ? (
                <div>
                  <span className="mb-1 block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Projet
                  </span>
                  <p className="text-sm text-foreground">{ctx.projet}</p>
                </div>
              ) : null}
              {ctx.message ? (
                <div className="rounded-sm border border-border bg-background px-3 py-2.5">
                  <span className="mb-1 block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Message
                  </span>
                  <p className="text-sm text-foreground italic">« {ctx.message} »</p>
                </div>
              ) : null}
            </CardBody>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader title="Activité" />
            <CardBody>
              <LeadTimeline activities={activities} />
            </CardBody>
          </Card>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Actions" />
            <CardBody>
              <LeadActionsPanel
                leadId={lead.id}
                initialStatus={lead.status}
                alreadyConverted={Boolean(lead.clientId)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Détails" />
            <CardBody>
              <dl className="space-y-2.5">
                <Info label="Source">{LEAD_SOURCE[lead.source].label}</Info>
                <Info label="Attribution">
                  {lead.attribution === "inbound"
                    ? "Inbound, facturable à la signature"
                    : "Réseau propre, non facturé"}
                </Info>
                <Info label="Créé le">{formatDateTime(lead.createdAt)}</Info>
                <Info label="Consentement marketing">
                  {lead.consentMarketing ? "Oui (double opt-in)" : "Non"}
                </Info>
              </dl>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === undefined || children === null || children === "") return null;
  return (
    <div>
      <dt className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 font-sans text-sm text-foreground">{children}</dd>
    </div>
  );
}
