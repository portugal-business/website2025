"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const dossier = t.raw("dossier") as { title: string; items: string[]; footer: string };
  const [shown, setShown] = useState(false);
  const [base, setBase] = useState(1500);

  useEffect(() => {
    const skip =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("bp-intro-skip");
    setBase(skip ? 0 : 1500);
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const rev = (i: number) => ({
    className: cn("bp-reveal", shown && "is-visible"),
    style: { transitionDelay: shown ? `${base + i * 110}ms` : undefined } as const,
  });

  return (
    <section className="relative overflow-hidden">
      <div className="site-frame grid items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
        <div>
          {/* Eyebrow + H1 = élément LCP : rendus immédiatement (pas de rideau/délai
              qui masquerait le titre et dégraderait le Largest Contentful Paint). */}
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
            <span className="block">{t("title")}</span>
            <span className="block italic text-accent">{t("titleAccent")}</span>
          </h1>
          <p
            {...rev(3)}
            className={cn(
              rev(3).className,
              "mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground",
            )}
          >
            {t("subtitle")}
          </p>
          <div
            {...rev(4)}
            className={cn(rev(4).className, "mt-9 flex flex-wrap items-center gap-5")}
          >
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#methode"
              className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
          <p
            {...rev(5)}
            className={cn(
              rev(5).className,
              "mt-9 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground",
            )}
          >
            {t("trust")}
          </p>
        </div>

        <aside {...rev(3)} className={cn(rev(3).className, "")}>
          <div className="border border-border bg-card">
            <div className="rule-brass" />
            <div className="p-8">
              <p className="eyebrow">{dossier.title}</p>
              <div className="mt-6 divide-y divide-border">
                {dossier.items.map((it, i) => (
                  <div key={it} className="flex items-baseline gap-4 py-3">
                    <span className="index-num text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.98rem]">{it}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {dossier.footer}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
