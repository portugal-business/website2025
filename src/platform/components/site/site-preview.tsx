// Aperçu simulé du site vitrine, rendu depuis le contenu CMS (brouillon ou
// publié). Représentation fidèle dans l'esprit (hero, chiffres, services,
// FAQ, pied de page) — pas un rendu pixel-perfect du vrai site SSG.

import { Handshake, Linkedin, Mail, Phone } from "lucide-react";
import type { Localized, SiteContent, SitePost } from "@/platform/types";

type PreviewLang = "fr" | "en";

function pick(v: Localized, lang: PreviewLang): string {
  return v[lang] || v[lang === "fr" ? "en" : "fr"];
}

export function SitePreview({
  content,
  posts,
  lang,
}: {
  content: SiteContent;
  posts: SitePost[];
  lang: PreviewLang;
}) {
  const { identity, hero, services, stats, testimonials, faqs } = content;
  const t = (v: Localized) => pick(v, lang);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      {/* Barre de fenêtre */}
      <div className="flex items-center gap-2 border-border border-b bg-muted/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="ml-2 truncate rounded-sm border border-border bg-background px-3 py-1 font-mono text-[0.65rem] text-muted-foreground">
          portugal-business.com{lang === "en" ? "/en" : "/fr"}
        </span>
      </div>

      <div className="bg-background">
        {/* Header simulé */}
        <div className="flex items-center justify-between border-border border-b px-6 py-3.5">
          <span className="font-serif text-base text-foreground">{identity.brandName}</span>
          <span className="hidden font-sans text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground sm:block">
            {t(identity.tagline)}
          </span>
        </div>

        {/* Hero */}
        <div className="px-6 py-10 sm:px-10">
          <p className="eyebrow">{t(hero.eyebrow)}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-[1.08] text-foreground sm:text-4xl">
            {t(hero.title)} <span className="italic text-accent">{t(hero.titleAccent)}</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t(hero.subtitle)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex h-10 items-center rounded-sm bg-accent px-5 font-sans text-sm font-medium text-accent-foreground">
              {t(hero.ctaPrimary)}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline underline-offset-4">
              {t(hero.ctaSecondary)}
            </span>
          </div>
          <p className="mt-6 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            {t(hero.trustLine)}
          </p>
        </div>

        {/* Chiffres clés */}
        {stats.length > 0 ? (
          <div className="grid border-border border-y bg-card sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.id}
                className={`px-6 py-6 ${i > 0 ? "border-border border-t sm:border-t-0 sm:border-l" : ""}`}
              >
                <div className="font-serif text-2xl text-foreground">{t(s.value)}</div>
                <p className="mt-1.5 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {t(s.label)}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {/* Services */}
        {services.length > 0 ? (
          <div className="px-6 py-10 sm:px-10">
            <p className="eyebrow">{lang === "fr" ? "Services" : "Services"}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((svc) => (
                <div key={svc.id} className="rounded-sm border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-foreground">{t(svc.name)}</h3>
                    {svc.viaPartner ? (
                      <span className="inline-flex flex-none items-center gap-1 rounded-sm bg-muted px-2 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        <Handshake className="h-3 w-3" />
                        {lang === "fr" ? "via partenaire" : "via partner"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t(svc.description)}
                  </p>
                  <p className="mt-3 font-sans text-xs font-semibold text-foreground">
                    {t(svc.priceNote)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Avis */}
        {testimonials.length > 0 ? (
          <div className="border-border border-t px-6 py-10 sm:px-10">
            <p className="eyebrow">{lang === "fr" ? "Avis" : "Reviews"}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {testimonials.map((tm) => (
                <figure key={tm.id} className="rounded-sm border border-border bg-card p-5">
                  <blockquote className="font-serif text-sm italic leading-relaxed text-foreground">
                    « {t(tm.quote)} »
                  </blockquote>
                  <figcaption className="mt-3 font-sans text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{tm.author}</span> —{" "}
                    {t(tm.role)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {/* Blog (articles publiés) */}
        {posts.length > 0 ? (
          <div className="border-border border-t px-6 py-10 sm:px-10">
            <p className="eyebrow">{lang === "fr" ? "Journal" : "Journal"}</p>
            <div className="mt-5 space-y-3">
              {posts.map((p) => (
                <article key={p.id} className="rounded-sm border border-border bg-card p-4">
                  <div className="flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <span className="text-accent">{p.category}</span>
                    <span>·</span>
                    <span>
                      {p.readingMinutes} min · /blog/{p.slug}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-base text-foreground">{t(p.title)}</h3>
                  {t(p.excerpt) ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {t(p.excerpt)}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {/* FAQ */}
        {faqs.length > 0 ? (
          <div className="border-border border-t px-6 py-10 sm:px-10">
            <p className="eyebrow">FAQ</p>
            <div className="mt-5 divide-y divide-border border-border border-y">
              {faqs.map((f) => (
                <details key={f.id} className="group px-1 py-3">
                  <summary className="cursor-pointer list-none font-sans text-sm font-semibold text-foreground">
                    {t(f.question)}
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t(f.answer)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {/* Footer identité */}
        <div className="border-border border-t bg-card px-6 py-6 sm:px-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="font-serif text-sm text-foreground">{identity.brandName}</span>
            <span>
              {identity.legalName} · NIPC {identity.nipc}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {identity.phone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> {identity.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Linkedin className="h-3 w-3" /> LinkedIn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
