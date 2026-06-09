"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ICONS } from "./icon-map";
import type { NavItem } from "./nav-config";

function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function SideNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Navigation principale">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        const active = isActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-sm px-3 py-2 font-sans text-sm transition-colors",
              active
                ? "bg-primary/10 font-semibold text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "h-[1.05rem] w-[1.05rem] flex-none",
                active ? "text-accent" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
