import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {icon ? <span className="text-accent">{icon}</span> : null}
      </div>
      <div className="display mt-2 text-3xl text-foreground tnum">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}
