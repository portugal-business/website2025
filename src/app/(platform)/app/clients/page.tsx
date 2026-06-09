import type { Metadata } from "next";
import Link from "next/link";
import { MissionStatusBadge } from "@/platform/components/bits";
import { Avatar } from "@/platform/components/ui/avatar";
import { EmptyState } from "@/platform/components/ui/empty";
import { PageHeader } from "@/platform/components/ui/page-header";
import { listClients, listMissions } from "@/platform/data";
import { formatDate } from "@/platform/lib/format";
import { getConsultantSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Clients" };

export default async function ClientsPage() {
  const { org } = await getConsultantSession();
  const [clients, missions] = await Promise.all([listClients(org.id), listMissions(org.id)]);
  const missionOf = (clientId: string) => missions.find((m) => m.clientId === clientId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Carnet"
        title="Clients"
        description="Les leads convertis. Chaque client a une mission de création de société."
      />

      {clients.length === 0 ? (
        <EmptyState title="Aucun client" description="Les leads convertis apparaîtront ici." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => {
            const mission = missionOf(c.id);
            return (
              <Link
                key={c.id}
                href={`/app/clients/${c.id}`}
                className="group flex flex-col rounded-md border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={c.fullName} />
                  <div className="min-w-0">
                    <div className="truncate font-sans text-sm font-semibold text-foreground">
                      {c.fullName}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{c.email}</div>
                  </div>
                </div>
                <div className="mt-4 space-y-1 border-border border-t pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Société</span>
                    <span className="font-semibold text-foreground">
                      {c.companyNameWanted ?? "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Client depuis</span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                </div>
                {mission ? (
                  <div className="mt-3">
                    <MissionStatusBadge status={mission.status} />
                  </div>
                ) : null}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
