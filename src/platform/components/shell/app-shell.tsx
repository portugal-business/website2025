import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Avatar } from "@/platform/components/ui/avatar";
import { MobileNav } from "./mobile-nav";
import type { NavItem, SpaceKey } from "./nav-config";
import { SideNav } from "./side-nav";
import { SpaceSwitcher } from "./space-switcher";

function BrandMark() {
  return (
    <span className="grid h-8 w-8 flex-none place-items-center rounded-sm bg-primary text-primary-foreground">
      <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden />
    </span>
  );
}

export function AppShell({
  brand,
  badge,
  items,
  user,
  space,
  children,
}: {
  brand: string;
  badge: string;
  items: NavItem[];
  user: { fullName: string; email: string };
  space: SpaceKey;
  children: ReactNode;
}) {
  return (
    <div className="platform-root flex min-h-dvh">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 flex-none flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 flex-none items-center gap-2.5 border-b border-border px-5">
          <BrandMark />
          <div className="min-w-0">
            <div className="display truncate text-sm font-medium leading-tight text-foreground">
              {brand}
            </div>
            <div className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
              {badge}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <SideNav items={items} />
        </div>
        <div className="flex flex-none items-center gap-2.5 border-t border-border p-3">
          <Avatar name={user.fullName} size="sm" />
          <div className="min-w-0">
            <div className="truncate font-sans text-xs font-semibold text-foreground">
              {user.fullName}
            </div>
            <div className="truncate text-[0.7rem] text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </aside>

      {/* Colonne principale */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 flex-none items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur lg:px-6">
          <MobileNav items={items} brand={brand} />
          <div className="flex items-center gap-2 lg:hidden">
            <BrandMark />
            <span className="display text-sm font-medium text-foreground">{brand}</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <SpaceSwitcher current={space} />
            <ThemeToggle />
            <Avatar name={user.fullName} size="sm" className="ml-0.5" />
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
