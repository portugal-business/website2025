import { CheckCircle2, XCircle } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { PageHeader } from "@/platform/components/ui/page-header";
import { Progress } from "@/platform/components/ui/progress";
import { Stat } from "@/platform/components/ui/stat";
import { listAllLeads } from "@/platform/data";
import { LEAD_SOURCE } from "@/platform/lib/constants";
import type { LeadSource } from "@/platform/types";

export const metadata: Metadata = { title: "Attribution" };

export default async function AdminAttribution() {
  const leads = await listAllLeads();
  const inbound = leads.filter((l) => l.attribution === "inbound");
  const ownNetwork = leads.filter((l) => l.attribution === "own_network");

  const wonInbound = inbound.filter((l) => l.status === "won").length;
  const wonOwn = ownNetwork.filter((l) => l.status === "won").length;

  const sources = (Object.keys(LEAD_SOURCE) as LeadSource[])
    .map((src) => ({ src, count: leads.filter((l) => l.source === src).length }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);
  const maxSrc = Math.max(...sources.map((s) => s.count), 1);
  const inboundPct = leads.length ? Math.round((inbound.length / leads.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Modèle"
        title="Attribution des leads"
        description="Seuls les leads inbound (générés par Propul'SEO) deviennent facturables à la signature. Les leads du réseau propre du consultant ne sont jamais facturés."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Leads totaux" value={leads.length} />
        <Stat label="Inbound" value={inbound.length} hint={`${inboundPct}% du total`} />
        <Stat label="Réseau propre" value={ownNetwork.length} hint="non facturable" />
        <Stat label="Signés inbound" value={wonInbound} hint="facturables" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inbound vs own network */}
        <Card>
          <CardHeader
            title="Inbound vs réseau propre"
            description="Répartition de l'origine des leads"
          />
          <CardBody className="space-y-5">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> Inbound · Propul'SEO
                </span>
                <span className="tnum text-muted-foreground">{inbound.length}</span>
              </div>
              <Progress value={inboundPct} tone="accent" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <XCircle className="h-4 w-4 text-muted-foreground" /> Réseau propre
                </span>
                <span className="tnum text-muted-foreground">{ownNetwork.length}</span>
              </div>
              <Progress value={100 - inboundPct} />
            </div>

            <div className="rounded-sm border border-border bg-background p-3 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Clients signés inbound (facturés)</span>
                <span className="font-semibold text-accent">{wonInbound}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span>Clients signés réseau propre (non facturés)</span>
                <span className="font-semibold text-foreground">{wonOwn}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Par source */}
        <Card>
          <CardHeader title="Par source" description="Quels canaux génèrent les leads" />
          <CardBody className="space-y-3">
            {sources.map((s) => (
              <div key={s.src}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{LEAD_SOURCE[s.src].label}</span>
                  <span className="tnum text-muted-foreground">{s.count}</span>
                </div>
                <Progress
                  value={(s.count / maxSrc) * 100}
                  tone={s.src === "manual" ? "primary" : "accent"}
                />
              </div>
            ))}
            <p className="pt-1 text-xs text-muted-foreground">
              Les sources système (formulaire, outils, Calendly) sont posées par la machine =
              attribution incontestable. « Saisie manuelle » = réseau propre.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
