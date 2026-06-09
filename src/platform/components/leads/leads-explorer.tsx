"use client";

import { LayoutGrid, Search, Table2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AttributionBadge,
  IficiBadge,
  LeadStatusBadge,
  ScoreBar,
  SourceBadge,
} from "@/platform/components/bits";
import { Avatar } from "@/platform/components/ui/avatar";
import { EmptyState } from "@/platform/components/ui/empty";
import { LEAD_SEGMENT, LEAD_STATUS, LEAD_STATUS_ORDER } from "@/platform/lib/constants";
import { formatRelative } from "@/platform/lib/format";
import type { Lead, LeadStatus } from "@/platform/types";

type View = "table" | "pipeline";
type StatusFilter = LeadStatus | "all";
type AttrFilter = "all" | "inbound" | "own_network";

export function LeadsExplorer({ leads }: { leads: Lead[] }) {
  const [view, setView] = useState<View>("table");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [attr, setAttr] = useState<AttrFilter>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (attr !== "all" && l.attribution !== attr) return false;
      if (needle && !`${l.fullName} ${l.email}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [leads, q, status, attr]);

  return (
    <div className="space-y-4">
      {/* Barre de contrôle */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="-translate-y-1/2 absolute top-1/2 left-2.5 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un lead…"
            className="w-full rounded-sm border border-input bg-background py-2 pr-3 pl-8 font-sans text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={attr}
            onChange={(e) => setAttr(e.target.value as AttrFilter)}
            className="rounded-sm border border-input bg-background px-2.5 py-2 font-sans text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">Toutes attributions</option>
            <option value="inbound">Inbound (Propul'SEO)</option>
            <option value="own_network">Réseau propre</option>
          </select>
          <div className="inline-flex overflow-hidden rounded-sm border border-border">
            <button
              type="button"
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
              className={cn(
                "grid h-9 w-9 place-items-center",
                view === "table"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Table2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("pipeline")}
              aria-pressed={view === "pipeline"}
              className={cn(
                "grid h-9 w-9 place-items-center",
                view === "pipeline"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtres de statut */}
      <div className="flex flex-wrap gap-1.5">
        <StatusChip active={status === "all"} onClick={() => setStatus("all")}>
          Tous ({leads.length})
        </StatusChip>
        {LEAD_STATUS_ORDER.map((s) => {
          const count = leads.filter((l) => l.status === s).length;
          if (count === 0) return null;
          return (
            <StatusChip key={s} active={status === s} onClick={() => setStatus(s)}>
              {LEAD_STATUS[s].label} ({count})
            </StatusChip>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun lead ne correspond"
          description="Ajustez la recherche ou les filtres."
        />
      ) : view === "table" ? (
        <LeadsTable leads={filtered} />
      ) : (
        <LeadsPipeline leads={filtered} />
      )}
    </div>
  );
}

function StatusChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 font-sans text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left font-sans text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
            <th className="px-4 py-2.5 font-semibold">Lead</th>
            <th className="px-4 py-2.5 font-semibold">Source</th>
            <th className="px-4 py-2.5 font-semibold">Attribution</th>
            <th className="px-4 py-2.5 font-semibold">Contexte</th>
            <th className="px-4 py-2.5 font-semibold">Score</th>
            <th className="px-4 py-2.5 font-semibold">Statut</th>
            <th className="px-4 py-2.5 font-semibold">Activité</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="row-link transition-colors">
              <td className="px-4 py-3">
                <Link href={`/app/leads/${lead.id}`} className="flex items-center gap-2.5">
                  <Avatar name={lead.fullName} size="sm" />
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-foreground">{lead.fullName}</div>
                    <div className="truncate text-xs text-muted-foreground">{lead.email}</div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <SourceBadge source={lead.source} />
              </td>
              <td className="px-4 py-3">
                <AttributionBadge attribution={lead.attribution} />
              </td>
              <td className="px-4 py-3">
                {lead.context.ificiResult ? (
                  <IficiBadge result={lead.context.ificiResult} />
                ) : lead.context.simCoutAnnuel ? (
                  <span className="text-xs text-muted-foreground">
                    Sim. {lead.context.simNbSalaries} sal.
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {LEAD_SEGMENT[lead.segment]}
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <ScoreBar score={lead.leadScore} />
              </td>
              <td className="px-4 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                {formatRelative(lead.lastActivityAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadsPipeline({ leads }: { leads: Lead[] }) {
  const cols = LEAD_STATUS_ORDER.filter((s) => s !== "lost");
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cols.map((status) => {
        const items = leads.filter((l) => l.status === status);
        return (
          <div key={status} className="rounded-md border border-border bg-card/50">
            <div className="flex items-center justify-between border-border border-b px-3 py-2">
              <span className="font-sans text-xs font-semibold text-foreground">
                {LEAD_STATUS[status].label}
              </span>
              <span className="tnum text-xs text-muted-foreground">{items.length}</span>
            </div>
            <div className="space-y-2 p-2">
              {items.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/app/leads/${lead.id}`}
                  className="block rounded-sm border border-border bg-background p-2.5 transition-colors hover:border-accent/50"
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={lead.fullName} size="sm" />
                    <span className="truncate font-sans text-xs font-semibold text-foreground">
                      {lead.fullName}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <SourceBadge source={lead.source} />
                    <span className="tnum text-[0.7rem] text-muted-foreground">
                      {lead.leadScore}
                    </span>
                  </div>
                </Link>
              ))}
              {items.length === 0 ? (
                <p className="px-1 py-3 text-center text-[0.7rem] text-muted-foreground">-</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
