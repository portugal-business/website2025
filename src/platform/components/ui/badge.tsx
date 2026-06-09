import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BadgeTone } from "@/platform/lib/constants";

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("pill", `tone-${tone}`, className)}>
      {dot ? <span className="pill-dot" aria-hidden /> : null}
      {children}
    </span>
  );
}
