import { cn } from "@/lib/utils";
import { initials } from "@/platform/lib/format";

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims =
    size === "sm"
      ? "h-7 w-7 text-[0.6rem]"
      : size === "lg"
        ? "h-11 w-11 text-sm"
        : "h-9 w-9 text-xs";
  return (
    <span
      className={cn(
        "inline-flex flex-none items-center justify-center rounded-full border border-border bg-muted font-sans font-semibold uppercase tracking-wide text-muted-foreground",
        dims,
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
