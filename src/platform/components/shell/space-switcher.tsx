"use client";

import { ChevronsUpDown, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SPACES, type SpaceKey } from "./nav-config";

export function SpaceSwitcher({ current }: { current: SpaceKey }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = SPACES.find((s) => s.key === current);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-2.5 py-1.5 font-sans text-xs text-foreground transition-colors hover:bg-muted"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Eye className="h-3.5 w-3.5 text-accent" />
        <span className="hidden text-muted-foreground sm:inline">Aperçu&nbsp;:</span>
        <span className="font-semibold">{active?.label}</span>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1.5 w-64 overflow-hidden rounded-md border border-border bg-card shadow-lg"
        >
          <div className="border-b border-border px-3 py-2">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Démo, changer d'espace
            </p>
          </div>
          {SPACES.map((s) => (
            <Link
              key={s.key}
              href={s.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2.5 transition-colors hover:bg-muted",
                s.key === current && "bg-primary/10",
              )}
              role="menuitem"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-semibold text-foreground">{s.label}</span>
                {s.key === current ? (
                  <span className="font-sans text-[0.6rem] uppercase tracking-wide text-accent">
                    actuel
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
