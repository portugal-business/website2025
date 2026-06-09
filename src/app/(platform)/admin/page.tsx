import { Banknote, Building2, Target, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/platform/components/ui/badge";
import { Card, CardHeader } from "@/platform/components/ui/card";
import { Stat } from "@/platform/components/ui/stat";
import { getPlatformMetrics, listBillingEvents, listOrgs } from "@/platform/data";
import { PLAN } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Vue d'ensemble" };

const ORG_STATUS_TONE = { active: "success", trial: "warning", paused: "neutral" } as const;
const ORG_STATUS_LABEL = { active: "Actif", trial: "Essai", paused: "En pause" } as const;

export default async function AdminOverview() {
  const [metrics, orgs, billing] = await Promise.all([
    getPlatformMetrics(),
    listOrgs(),
    listBillingEvents(),
  ]);

  const signedClients = billing.filter((b) => b.type === "signed_client").slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-1">Plateforme · Propul'SEO</div>
        <h1 className="display text-2xl text-foreground sm:text-[1.7rem]">Vue d'ensemble</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          L'activité de tous les consultants : revenus récurrents, clients signés facturables et
          attribution des leads.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="MRR"
          value={formatCents(metrics.mrrCents)}
          hint={`${metrics.activeOrgs} org. actives`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <Stat
          label="Clients signés (mois)"
          value={metrics.billableSignedClients}
          hint={`${formatCents(metrics.signedClientsMonthCents)} facturés`}
          icon={<Banknote className="h-4 w-4" />}
        />
        <Stat
          label="Consultants"
          value={metrics.orgs}
          hint="tenants"
          icon={<Building2 className="h-4 w-4" />}
        />
        <Stat
          label="Leads inbound"
          value={metrics.totalInboundLeads}
          hint="attribués Propul'SEO"
          icon={<Target className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Consultants */}
        <Card>
          <CardHeader
            title="Consultants"
            description="Les organisations clientes de la plateforme"
            action={
              <Link href="/admin/orgs" className="font-sans text-xs font-semibold text-accent">
                Gérer
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-border border-b text-left font-sans text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">
                  <th className="px-5 py-2.5 font-semibold">Consultant</th>
                  <th className="px-5 py-2.5 font-semibold">Formule</th>
                  <th className="px-5 py-2.5 font-semibold">Abo/mois</th>
                  <th className="px-5 py-2.5 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orgs.map((o) => (
                  <tr key={o.id} className="row-link transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/orgs/${o.id}`}>
                        <div className="font-semibold text-foreground">{o.brandName}</div>
                        <div className="text-xs text-muted-foreground">{o.location}</div>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{PLAN[o.plan].label}</td>
                    <td className="px-5 py-3 tnum text-foreground">
                      {formatCents(o.monthlyFeeCents)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={ORG_STATUS_TONE[o.status]}>{ORG_STATUS_LABEL[o.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Clients signés facturables */}
        <Card>
          <CardHeader
            title="Clients signés récents"
            description="Événements facturables (lead inbound)"
            action={
              <Link href="/admin/billing" className="font-sans text-xs font-semibold text-accent">
                Facturation
              </Link>
            }
          />
          <div className="divide-y divide-border">
            {signedClients.map((b) => {
              const org = orgs.find((o) => o.id === b.orgId);
              return (
                <div key={b.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <div className="truncate font-sans text-sm font-semibold text-foreground">
                      {b.label.replace(/^Client signé, /, "")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {org?.brandName} · {formatDate(b.createdAt)}
                    </div>
                  </div>
                  <span className="tnum font-sans text-sm font-semibold text-accent">
                    +{formatCents(b.amountCents)}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
