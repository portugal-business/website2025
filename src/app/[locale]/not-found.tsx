"use client";

import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// 404 localisée et maillée, rendue à l'intérieur du layout [locale]
// (navbar + footer conservés). Déclenchée par le catch-all [...rest].
const COPY = {
  fr: {
    code: "Erreur 404",
    title: "Cette page n'existe pas (ou plus)",
    body: "Le lien est peut-être obsolète ou mal saisi. Voici quelques points de départ utiles pour retrouver votre chemin.",
    cta: "Réserver un diagnostic gratuit",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/services", label: "Nos services" },
      { href: "/creation-societe", label: "Créer ma société" },
      { href: "/faq", label: "Questions fréquentes" },
      { href: "/contact", label: "Contact" },
    ],
  },
  en: {
    code: "Error 404",
    title: "This page doesn't exist (anymore)",
    body: "The link may be outdated or mistyped. Here are a few useful starting points to find your way back.",
    cta: "Book a free assessment",
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Our services" },
      { href: "/creation-societe", label: "Set up my company" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
} as const;

export default function NotFound() {
  const locale = useLocale();
  const c = locale === "en" ? COPY.en : COPY.fr;

  return (
    <section className="mx-auto flex max-w-3xl flex-col px-5 py-28 lg:px-8 lg:py-40">
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-accent">{c.code}</p>
      <h1 className="mt-6 font-serif text-4xl leading-[1.06] sm:text-5xl">{c.title}</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{c.body}</p>

      <div className="mt-9">
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
        >
          {c.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className="mt-12 border-t border-border">
        {c.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center gap-4 border-b border-border py-4 text-[1.05rem] transition-colors hover:text-accent"
            >
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
              {l.label}
              <ArrowRight
                className="ml-auto h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
