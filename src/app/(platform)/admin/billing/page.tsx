import type { Metadata } from "next";
import { Badge } from "@/platform/components/ui/badge";
import { Card } from "@/platform/components/ui/card";
import { PageHeader } from "@/platform/components/ui/page-header";
import { Stat } from "@/platform/components/ui/stat";
import { listBillingEvents, listOrgs } from "@/platform/data";
import { formatCents } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Facturation" };

const BILLING_TONE = { pending: "neutral", invoiced: "info", paid: "success" } as const;
const BILLING_LABEL = { pending: "En attente", invoiced: "Facturé", paid: "Payé" } as const;
const TYPE_LABEL = { subscription: "Abonnement", signed_client: "Client signé" } as const;
const TYPE_TONE = { subscription: "neutral", signed_client: "accent" } as const;

export default async function AdminBilling() {
  const [billing, orgs] = await Promise.all([listBillingEvents(), listOrgs()]);
  const orgName = (id: string) => orgs.find((o) => o.id === id)?.brandName ?? "-";

  const paid = billing.filter((b) => b.status === "paid").reduce((s, b) => s + b.amountCents, 0);
  const invoiced = billing
    .filter((b) => b.status === "invoiced")
    .reduce((s, b) => s + b.amountCents, 0);
  const subTotal = billing
    .filter((b) => b.type === "subscription")
    .reduce((s, b) => s + b.amountCents, 0);
  const perfTotal = billing
    .filter((b) => b.type === "signed_client")
    .reduce((s, b) => s + b.amountCents, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Revenus"
        title="Facturation"
        description="Ce que Propul'SEO facture aux consultants : abonnements mensuels + fee par client signé (leads inbound)."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Encaissé" value={formatCents(paid)} hint="payé" />
        <Stat label="À encaisser" value={formatCents(invoiced)} hint="facturé, en attente" />
        <Stat label="Abonnements" value={formatCents(subTotal)} hint="récurrent" />
        <Stat label="Performance" value={formatCents(perfTotal)} hint="clients signés" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-border border-b text-left font-sans text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">Consultant</th>
                <th className="px-5 py-2.5 font-semibold">Libellé</th>
                <th className="px-5 py-2.5 font-semibold">Type</th>
                <th className="px-5 py-2.5 font-semibold">Période</th>
                <th className="px-5 py-2.5 font-semibold">Montant</th>
                <th className="px-5 py-2.5 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {billing.map((b) => (
                <tr key={b.id}>
                  <td className="px-5 py-3 font-semibold text-foreground">{orgName(b.orgId)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.label}</td>
                  <td className="px-5 py-3">
                    <Badge tone={TYPE_TONE[b.type]}>{TYPE_LABEL[b.type]}</Badge>
                  </td>
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
    </div>
  );
}
