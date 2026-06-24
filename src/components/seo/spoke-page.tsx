// Composant SERVER partagé pour les pages « créer au Portugal depuis [pays] »
// (spokes du Lot 3 SEO/GEO). Impose la structure des chunks extractibles (GEO) :
// convention + date + confiance · le vrai risque si vous restez résident ·
// faits locaux (résidence/spécificité) · parcours à distance · FAQ · maillage ·
// disclaimer YMYL « à valider fiscaliste » · CTA. Chaque page pays ne fournit
// QUE les données (SpokeCopy), la mise en page et le JSON-LD sont communs ici.

import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, FOUNDER_ID, ORGANIZATION_ID, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

type Pair = { term: string; value: string };
type SpokeFaq = { q: string; a: string };
type SpokeRelated = { label: string; href: string; desc: string };

export type SpokeCopy = {
  metaTitle: string;
  metaDesc: string;
  /** Pays servi (pour areaServed JSON-LD), ex. "Belgique". */
  countryName: string;

  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trust: string;

  // 1. Convention de non-double imposition + date + niveau de confiance
  conventionEyebrow: string;
  conventionTitle: string;
  conventionDate: string;
  conventionConfidence: string;
  conventionBody: string[];

  // 2. Le vrai risque si vous restez résident chez vous (CFC / direction effective)
  riskEyebrow: string;
  riskTitle: string;
  riskBody: string[];
  riskBullets: string[];

  // 3 + 4. Faits locaux : critère de résidence (1 ligne) + spécificité locale
  factsEyebrow: string;
  factsTitle: string;
  facts: Pair[];

  // 5. Votre parcours à distance depuis [pays]
  remoteEyebrow: string;
  remoteTitle: string;
  remoteBody: string;
  remoteSteps: Pair[];

  // 6. FAQ (H2 = question réelle du ressortissant)
  faqEyebrow: string;
  faqTitle: string;
  faq: SpokeFaq[];

  // 7. Maillage piliers
  relatedEyebrow: string;
  relatedTitle: string;
  related: SpokeRelated[];

  // 9. Disclaimer YMYL « à valider fiscaliste »
  disclaimerLabel: string;
  disclaimer: string;

  // 8. CTA
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbHub: string;
  breadcrumbCurrent: string;
};

const HUB_PATH = "/creer-societe-portugal-depuis-letranger";

type Props = {
  locale: string;
  path: string;
  datePublished: string;
  dateModified: string;
  c: SpokeCopy;
};

export function SpokePage({ locale, path, datePublished, dateModified, c }: Props) {
  const canonical = urlFor(locale, path);
  const hubUrl = urlFor(locale, HUB_PATH);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.metaTitle,
    description: c.metaDesc,
    serviceType: "Création de société au Portugal pour non-résidents",
    inLanguage: locale,
    provider: { "@id": BUSINESS_ID },
    url: canonical,
    areaServed: { "@type": "Country", name: c.countryName },
    audience: {
      "@type": "Audience",
      audienceType: "Entrepreneurs et indépendants francophones",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumbHub, item: hubUrl },
      { "@type": "ListItem", position: 3, name: c.breadcrumbCurrent, item: canonical },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.metaTitle,
    description: c.metaDesc,
    inLanguage: locale,
    datePublished,
    dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="site-frame grid items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <Reveal>
              <p className="eyebrow">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[3.6rem]">
                <span className="block">{c.title}</span>
                <span className="block italic text-accent">{c.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {c.lead}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#risque"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-9 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {c.trust}
              </p>
            </Reveal>
          </div>

          {/* Carte convention + niveau de confiance */}
          <Reveal delay={160}>
            <aside className="border border-border bg-card">
              <div className="rule-brass" />
              <div className="p-8">
                <p className="eyebrow">{c.conventionEyebrow}</p>
                <h2 className="mt-4 font-serif text-2xl leading-snug">{c.conventionTitle}</h2>
                <div className="mt-6 divide-y divide-border">
                  <p className="py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.conventionDate}
                  </p>
                  <p className="py-3 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.conventionConfidence}
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {c.conventionBody.map((p) => (
                    <p key={p} className="text-[0.95rem] leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* 2. Le vrai risque si vous restez résident */}
      <section id="risque" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <div className="border border-accent bg-background">
              <div className="rule-brass" />
              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4">
                  <TriangleAlert className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {c.riskEyebrow}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-[1.1] sm:text-4xl">
                      {c.riskTitle}
                    </h2>
                  </div>
                </div>
                <div className="mt-8 space-y-5">
                  {c.riskBody.map((p) => (
                    <p key={p} className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
                <ul className="mt-8 space-y-3.5 border-t border-border pt-8">
                  {c.riskBullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-foreground">
                      <span
                        className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 + 4. Faits locaux : résidence + spécificité */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.factsEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.factsTitle}
                </h2>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.facts.map((f, i) => (
                <Reveal key={f.term} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-6">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {f.term}
                      </h3>
                      <p className="mt-2 leading-relaxed text-foreground">{f.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Votre parcours à distance */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.remoteEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.remoteTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.remoteBody}</p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.remoteSteps.map((s, i) => (
                <Reveal key={s.term} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-7">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl leading-tight">{s.term}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{s.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Maillage */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{c.relatedEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.relatedTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.related.map((r, i) => (
              <Reveal key={r.href} delay={i * 60}>
                <Link href={r.href} className="group block h-full bg-card p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl leading-tight">{r.label}</h3>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{r.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.faqEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.faqTitle}</h2>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.faq.map((f, i) => (
                  <Reveal key={f.q} delay={i * 50}>
                    <div className="border-b border-border py-6">
                      <dt className="font-serif text-lg">{f.q}</dt>
                      <dd className="mt-2.5 leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Disclaimer YMYL « à valider fiscaliste » */}
      <section className="border-t border-border">
        <div className="site-frame py-16 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
              {c.disclaimerLabel}
            </p>
            <p className="mt-4 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
              {c.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-5xl border border-border bg-primary px-8 py-20 text-center text-primary-foreground lg:px-16 lg:py-24">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              {c.ctaBody}
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
              >
                {c.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-7 font-sans text-xs uppercase tracking-[0.16em] text-primary-foreground/55">
              {c.ctaReassurance}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
