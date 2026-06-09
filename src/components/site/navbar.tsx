"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#methode", label: t("method") },
    { href: "/#reseau", label: t("network") },
    { href: "/a-propos", label: t("about") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm text-primary-foreground">
            BP
          </span>
          Business Portugal
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link
            href="/#contact"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "ml-1.5")}
          >
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-grid h-10 w-10 place-items-center rounded-md hover:bg-muted md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary", size: "sm" }), "flex-1")}
              >
                {t("cta")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
