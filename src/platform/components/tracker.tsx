import { Check, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/platform/lib/format";
import type { MissionStep } from "@/platform/types";

function StepDot({ status }: { status: MissionStep["status"] }) {
  if (status === "done") {
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-accent text-accent">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      </span>
    );
  }
  if (status === "blocked") {
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border border-border text-muted-foreground">
        <Lock className="h-3 w-3" />
      </span>
    );
  }
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
    </span>
  );
}

export function Tracker({ steps }: { steps: MissionStep[] }) {
  const ordered = [...steps].sort((a, b) => a.order - b.order);
  return (
    <ol className="relative">
      {ordered.map((step, i) => {
        const last = i === ordered.length - 1;
        const active = step.status === "in_progress";
        return (
          <li key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
            {!last ? (
              <span
                className={cn(
                  "absolute left-[13px] top-7 h-full w-px",
                  step.status === "done" ? "bg-primary/40" : "bg-border",
                )}
                aria-hidden
              />
            ) : null}
            <div className="relative z-10 flex-none pt-0.5">
              <StepDot status={step.status} />
            </div>
            <div className={cn("min-w-0 flex-1", step.status === "pending" && "opacity-70")}>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span
                  className={cn(
                    "font-sans text-sm font-semibold",
                    active ? "text-accent" : "text-foreground",
                  )}
                >
                  {step.label}
                </span>
                {step.doneAt ? (
                  <span className="font-sans text-xs text-muted-foreground">
                    · {formatDate(step.doneAt)}
                  </span>
                ) : active ? (
                  <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
                    en cours
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Pourcentage d'avancement d'un tracker. */
export function trackerProgress(steps: MissionStep[]): number {
  if (!steps.length) return 0;
  const done = steps.filter((s) => s.status === "done").length;
  const partial = steps.filter((s) => s.status === "in_progress").length * 0.5;
  return Math.round(((done + partial) / steps.length) * 100);
}
