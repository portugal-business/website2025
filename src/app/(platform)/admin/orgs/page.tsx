import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/platform/components/ui/badge";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listOrgs } from "@/platform/data";
import { PLAN } from "@/platform/lib/constants";
import { formatCents, formatDate } from "@/platform/lib/format";

export const metadata: Metadata = { title: "Consultants" };

const ORG_STATUS_TONE = { active: "success", trial: "warning", paused: "neutral" } as const;
const ORG_STATUS_LABEL = { active: "Actif", trial: "Essai", paused: "En pause" } as const;

export default async function AdminOrgs() {
  const orgs = await listOrgs();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tenants"
        title="Consultants"
        description="Les organisations clientes de la plateforme. Chacune est isolée (org_id + RLS)."
        actions={
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4" /> Inviter un consultant
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-md border border-border bg-card">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left font-sans text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
              <th className="px-4 py-2.5 font-semibold">Consultant</th>
              <th className="px-4 py-2.5 font-semibold">Formule</th>
              <th className="px-4 py-2.5 font-semibold">Abo/mois</th>
              <th className="px-4 py-2.5 font-semibold">Fee/client</th>
              <th className="px-4 py-2.5 font-semibold">Statut</th>
              <th className="px-4 py-2.5 font-semibold">Depuis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orgs.map((o) => (
              <tr key={o.id} className="row-link transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/admin/orgs/${o.id}`}>
                    <div className="font-semibold text-foreground">{o.brandName}</div>
                    <div className="text-xs text-muted-foreground">
                      {o.name} · {o.location}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{PLAN[o.plan].label}</td>
                <td className="px-4 py-3 tnum text-foreground">{formatCents(o.monthlyFeeCents)}</td>
                <td className="px-4 py-3 tnum text-foreground">
                  {formatCents(o.perClientFeeCents)}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={ORG_STATUS_TONE[o.status]}>{ORG_STATUS_LABEL[o.status]}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                  {formatDate(o.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
