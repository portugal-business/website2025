import { cn } from "@/lib/utils";
import {
  DOCUMENT_STATUS,
  IFICI_RESULT_LABEL,
  LEAD_SOURCE,
  LEAD_STATUS,
  MISSION_STATUS,
} from "@/platform/lib/constants";
import type {
  CompanyForm,
  DocumentStatus,
  LeadAttribution,
  LeadSource,
  LeadStatus,
  MissionStatus,
} from "@/platform/types";
import { Badge } from "./ui/badge";

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const s = LEAD_STATUS[status];
  return (
    <Badge tone={s.tone} dot>
      {s.label}
    </Badge>
  );
}

export function MissionStatusBadge({ status }: { status: MissionStatus }) {
  const s = MISSION_STATUS[status];
  return (
    <Badge tone={s.tone} dot>
      {s.label}
    </Badge>
  );
}

export function DocStatusBadge({ status }: { status: DocumentStatus }) {
  const s = DOCUMENT_STATUS[status];
  return (
    <Badge tone={s.tone} dot>
      {s.label}
    </Badge>
  );
}

export function SourceBadge({ source }: { source: LeadSource }) {
  return <Badge tone="neutral">{LEAD_SOURCE[source].short}</Badge>;
}

export function AttributionBadge({ attribution }: { attribution: LeadAttribution }) {
  return attribution === "inbound" ? (
    <Badge tone="accent">Inbound · Propul'SEO</Badge>
  ) : (
    <Badge tone="neutral">Réseau propre</Badge>
  );
}

export function IficiBadge({ result }: { result: string }) {
  const r = IFICI_RESULT_LABEL[result];
  if (!r) return null;
  return (
    <Badge tone={r.tone}>
      IFICI {result} · {r.label}
    </Badge>
  );
}

const COMPANY_FORM_LABEL: Record<CompanyForm, string> = {
  unipessoal_lda: "Unipessoal Lda",
  lda: "Lda",
  sa: "SA",
};

export function companyFormLabel(form: CompanyForm): string {
  return COMPANY_FORM_LABEL[form];
}

export function ScoreBar({ score }: { score: number }) {
  const tone = score >= 75 ? "bg-accent" : score >= 50 ? "bg-primary" : "bg-muted-foreground/50";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${score}%` }} />
      </div>
      <span className="tnum text-xs text-muted-foreground">{score}</span>
    </div>
  );
}
