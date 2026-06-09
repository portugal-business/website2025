import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  tone = "primary",
}: {
  value: number; // 0-100
  className?: string;
  tone?: "primary" | "accent";
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all",
          tone === "accent" ? "bg-accent" : "bg-primary",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
