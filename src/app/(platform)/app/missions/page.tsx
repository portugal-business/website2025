import type { Metadata } from "next";
import Link from "next/link";
import { companyFormLabel, MissionStatusBadge } from "@/platform/components/bits";
import { trackerProgress } from "@/platform/components/tracker";
import { EmptyState } from "@/platform/components/ui/empty";
import { PageHeader } from "@/platform/components/ui/page-header";
import { Progress } from "@/platform/components/ui/progress";
import { listClients, listMissions } from "@/platform/data";
import { formatDate } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Missions" };

export default async function MissionsPage() {
  const { org } = await getConsultantSession();
  const [missions, clients] = await Promise.all([listMissions(org.id), listClients(org.id)]);
  const clientName = (id: string) => clients.find((c) => c.id === id)?.fullName ?? "-";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dossiers"
        title="Missions"
        description="Chaque création de société, suivie étape par étape, du NIF à la mise en relation comptable."
      />

      {missions.length === 0 ? (
        <EmptyState
          title="Aucune mission"
          description="Convertissez un lead pour démarrer un dossier."
        />
      ) : (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-border border-b text-left font-sans text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-4 py-2.5 font-semibold">Réf.</th>
                <th className="px-4 py-2.5 font-semibold">Société</th>
                <th className="px-4 py-2.5 font-semibold">Client</th>
                <th className="px-4 py-2.5 font-semibold">Forme</th>
                <th className="px-4 py-2.5 font-semibold">Avancement</th>
                <th className="px-4 py-2.5 font-semibold">Statut</th>
                <th className="px-4 py-2.5 font-semibold">Démarrée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {missions.map((m) => {
                const pct = trackerProgress(m.steps);
                return (
                  <tr key={m.id} className="row-link transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/app/missions/${m.id}`}
                        className="font-semibold text-foreground"
                      >
                        {m.ref}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground">{m.companyNameWanted}</td>
                    <td className="px-4 py-3 text-muted-foreground">{clientName(m.clientId)}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {companyFormLabel(m.companyForm)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} tone="accent" className="w-24" />
                        <span className="tnum text-xs text-muted-foreground">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <MissionStatusBadge status={m.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {m.startedAt ? formatDate(m.startedAt) : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
