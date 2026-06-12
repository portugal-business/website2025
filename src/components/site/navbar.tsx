"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { LoginMenu } from "./login-menu";
import { ThemeToggle } from "./theme-toggle";

const linkCls =
  "font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/a-propos", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/outils", label: t("tools") },
    { href: "/creation-societe", label: t("create") },
    { href: "/blog", label: t("blog") },
    { href: "/faq", label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="site-frame flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-xl tracking-tight">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
          Business Portugal
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <div className="ml-2">
            <LoginMenu />
          </div>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "ml-2")}
          >
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-grid h-11 w-11 place-items-center rounded-sm hover:bg-muted lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <nav className="site-frame flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <LoginMenu onNavigate={() => setOpen(false)} />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary", size: "md" }), "flex-1")}
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
