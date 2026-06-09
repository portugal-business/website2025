import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <div className="eyebrow mb-1.5">{eyebrow}</div> : null}
        <h1 className="display text-2xl text-foreground sm:text-[1.7rem]">{title}</h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-none flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
