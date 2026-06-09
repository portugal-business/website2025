import { ArrowRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("hero");
  const dossier = t.raw("dossier") as { title: string; items: string[]; footer: string };

  return (
    <section className="relative overflow-hidden">
      <div className="calcada absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="azulejo-rule" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <p
            className="reveal text-xs font-medium uppercase tracking-[0.18em] text-accent"
            style={{ animationDelay: "0ms" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="reveal mt-5 text-4xl sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t("title")} <span className="italic text-accent">{t("titleAccent")}</span>
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            {t("subtitle")}
          </p>
          <div
            className="reveal mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/#contact"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/#methode" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {t("ctaSecondary")}
            </Link>
          </div>
          <p
            className="reveal mt-6 text-sm text-muted-foreground"
            style={{ animationDelay: "320ms" }}
          >
            {t("trust")}
          </p>
        </div>

        <div className="reveal" style={{ animationDelay: "200ms" }}>
          <div className="relative rounded-xl bg-primary p-7 text-primary-foreground shadow-xl shadow-primary/20 ring-1 ring-primary/40">
            <div
              className="absolute right-5 top-5 h-10 w-10 rounded-full border border-gold/50"
              aria-hidden
            />
            <p className="font-display text-xl">{dossier.title}</p>
            <ul className="mt-6 space-y-3">
              {dossier.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-primary-foreground/15 pt-4 text-sm text-primary-foreground/80">
              {dossier.footer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
