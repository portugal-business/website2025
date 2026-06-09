"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "./nav-config";
import { SideNav } from "./side-nav";

export function MobileNav({ items, brand }: { items: NavItem[]; brand: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ferme le tiroir quand on navigue
  // biome-ignore lint/correctness/useExhaustiveDependencies: on veut réagir au changement de route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="inline-grid h-10 w-10 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="display text-base font-medium text-foreground">{brand}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="inline-grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <SideNav items={items} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
