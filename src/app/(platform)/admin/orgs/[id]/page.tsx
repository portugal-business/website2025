import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/platform/components/ui/badge";
import { Card, CardHeader } from "@/platform/components/ui/card";
import { Stat } from "@/platform/components/ui/stat";
import {
  getOrg,
  getOrgMetrics,
  listBillingEvents,
  listClients,
  listLeads,
  listMissions,
} from "@/platform/data";
import { PLAN } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Consultant" };

const ORG_STATUS_TONE = { active: "success", trial: "warning", paused: "neutral" } as const;
const ORG_STATUS_LABEL = { active: "Actif", trial: "Essai", paused: "En pause" } as const;
const BILLING_TONE = { pending: "neutral", invoiced: "info", paid: "success" } as const;
const BILLING_LABEL = { pending: "En attente", invoiced: "Facturé", paid: "Payé" } as const;

export default async function AdminOrgDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = await getOrg(id);
  if (!org) notFound();
  const [metrics, billing, leads, clients, missions] = await Promise.all([
    getOrgMetrics(org.id),
    listBillingEvents(org.id),
    listLeads(org.id),
    listClients(org.id),
    listMissions(org.id),
  ]);

  const billedTotal = billing
    .filter((b) => b.status !== "pending")
    .reduce((s, b) => s + b.amountCents, 0);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/orgs"
        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Consultants
      </Link>

      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display text-2xl text-foreground">{org.brandName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {org.name} · NIF {org.vatId} · {org.location}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Badge tone={ORG_STATUS_TONE[org.status]}>{ORG_STATUS_LABEL[org.status]}</Badge>
            <Badge tone="accent">{PLAN[org.plan].label}</Badge>
          </div>
        </div>
        <div className="text-right">
          <span className="block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Facturé (cumul)
          </span>
          <span className="display text-2xl text-foreground tnum">{formatCents(billedTotal)}</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Leads" value={leads.length} hint={`${metrics.inboundLeads} inbound`} />
        <Stat label="Clients" value={clients.length} />
        <Stat label="Missions actives" value={metrics.activeMissions} />
        <Stat
          label="Abo / mois"
          value={formatCents(org.monthlyFeeCents)}
          hint={`${formatCents(org.perClientFeeCents)} / client`}
        />
      </div>

      <Card>
        <CardHeader title="Facturation" description="Abonnement + clients signés (leads inbound)" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-border border-b text-left font-sans text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">Libellé</th>
                <th className="px-5 py-2.5 font-semibold">Période</th>
                <th className="px-5 py-2.5 font-semibold">Montant</th>
                <th className="px-5 py-2.5 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {billing.map((b) => (
                <tr key={b.id}>
                  <td className="px-5 py-3 text-foreground">{b.label}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.period}</td>
                  <td className="px-5 py-3 tnum text-foreground">{formatCents(b.amountCents)}</td>
                  <td className="px-5 py-3">
                    <Badge tone={BILLING_TONE[b.status]}>{BILLING_LABEL[b.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {missions.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          Dernière mission : {missions[0].companyNameWanted} ({formatDate(missions[0].createdAt)}).
        </p>
      ) : null}
    </div>
  );
}
