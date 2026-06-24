"use client";

import { Building2, ChevronDown, LogIn, UserRound } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COPY = {
  fr: {
    login: "Connexion",
    admin: "Admin",
    adminSub: "Espace consultant",
    client: "Client",
    clientSub: "Portail client",
    preview: "Aperçu — données de démonstration",
  },
  en: {
    login: "Log in",
    admin: "Admin",
    adminSub: "Consultant workspace",
    client: "Client",
    clientSub: "Client portal",
    preview: "Preview — demo data",
  },
} as const;

// Liens hors i18n next-intl (routes plateforme sans préfixe de locale) → <a> natifs.
const ENTRIES = [
  { href: "/app", key: "admin", icon: Building2 },
  { href: "/portal", key: "client", icon: UserRound },
] as const;

// La plateforme SaaS est encore mockée : on n'affiche le menu « Connexion » que
// si elle est activée (même flag que le proxy). En prod vitrine → menu masqué.
const PLATFORM_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PLATFORM === "true";

export function LoginMenu({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const t = COPY[locale === "en" ? "en" : "fr"];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // Plateforme désactivée (prod vitrine) : ne rien afficher.
  if (!PLATFORM_ENABLED) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
      >
        <LogIn className="h-3.5 w-3.5" />
        {t.login}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-60 rounded-md border border-border bg-background p-1.5 shadow-lg"
        >
          {ENTRIES.map((e) => {
            const Icon = e.icon;
            return (
              <a
                key={e.href}
                href={e.href}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="flex items-start gap-3 rounded-sm px-3 py-2.5 hover:bg-muted"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-sans text-sm font-semibold text-foreground">
                    {t[e.key]}
                  </span>
                  <span className="block text-xs text-muted-foreground">{t[`${e.key}Sub`]}</span>
                </span>
              </a>
            );
          })}
          <p className="border-t border-border/70 px-3 pb-1 pt-2 text-[0.65rem] text-muted-foreground">
            {t.preview}
          </p>
        </div>
      )}
    </div>
  );
}
