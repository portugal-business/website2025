import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { articles, getArticleBySlug } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  FOUNDER_ID,
  LINKEDIN_URL,
  languagesFor,
  ORGANIZATION_ID,
  ogLocaleFor,
  urlFor,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const AUTHOR = {
  name: "Audrey Marques",
  sameAs: LINKEDIN_URL,
  knowsAbout: [
    "Création de société au Portugal",
    "Unipessoal Lda",
    "Lda",
    "NIF/NIPC",
    "Accompagnement bancaire",
    "Implantation d'entreprise au Portugal",
  ],
};

const COPY = {
  fr: {
    locale: "fr-FR",
    breadcrumbHome: "Accueil",
    breadcrumbBlog: "Blog",
    published: "Publié le",
    updated: "Mis à jour le",
    authorRole: "Consultante en implantation & création d'entreprise au Portugal",
    authorBio:
      "Fondatrice de Business Portugal, Audrey accompagne les entrepreneurs francophones dans la création de leur société au Portugal et l'ouverture de leur compte bancaire. Elle coordonne un réseau de partenaires (comptable, fiscaliste) et oriente vers les bons interlocuteurs, elle n'est ni comptable, ni fiscaliste, ni avocate.",
    placeholderAlt: "Illustration de l'article (visuel à venir)",
    disclaimerTitle: "Information, pas conseil personnalisé",
    disclaimer:
      "Cet article a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. La fiscalité dépend de votre situation individuelle et de la convention fiscale France-Portugal. Informations susceptibles d'évoluer (Loi de Finances / Orçamento do Estado). Pour une analyse de votre cas, prenons rendez-vous.",
    ctaTitle: "Un projet d'entreprise au Portugal ?",
    ctaText:
      "Réservez un premier échange gratuit et sans engagement. On fait le point sur votre situation et les bonnes étapes.",
    ctaButton: "Réserver un diagnostic gratuit",
    backToBlog: "Tous les articles",
    relatedTitle: "Pour aller plus loin",
  },
  en: {
    locale: "en-GB",
    breadcrumbHome: "Home",
    breadcrumbBlog: "Blog",
    published: "Published",
    updated: "Updated",
    authorRole: "Consultant in business establishment & company formation in Portugal",
    authorBio:
      "Founder of Business Portugal, Audrey supports French-speaking entrepreneurs in setting up their company in Portugal and opening their bank account. She coordinates a network of partners (accountant, tax adviser) and points clients to the right contacts, she is neither an accountant, nor a tax adviser, nor a lawyer.",
    placeholderAlt: "Article illustration (visual to come)",
    disclaimerTitle: "Information, not personalised advice",
    disclaimer:
      "This article is for information only and does not constitute personalised legal, accounting or tax advice. Taxation depends on your individual situation and on the France-Portugal tax treaty. Information is subject to change (Finance Act / Orçamento do Estado). For an analysis of your case, let's book a call.",
    ctaTitle: "A business project in Portugal?",
    ctaText:
      "Book a first free, no-commitment call. We review your situation and the right next steps.",
    ctaButton: "Book a free assessment",
    backToBlog: "All articles",
    relatedTitle: "Go further",
  },
} as const;

type Loc = "fr" | "en";
type Props = { params: Promise<{ locale: string; slug: string }> };
const norm = (l: string): Loc => (l === "en" ? "en" : "fr");
const pick = (l: string) => COPY[norm(l)];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const l = norm(locale);
  return {
    title: article.title[l],
    description: article.excerpt[l],
    authors: [{ name: AUTHOR.name, url: urlFor(l, "/a-propos") }],
    alternates: {
      canonical: urlFor(l, `/blog/${article.slug}`),
      languages: languagesFor(`/blog/${article.slug}`),
    },
    openGraph: {
      ...ogLocaleFor(l),
      type: "article",
      title: article.title[l],
      description: article.excerpt[l],
      url: urlFor(l, `/blog/${article.slug}`),
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [AUTHOR.name],
    },
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(pick(locale).locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const l = norm(locale);
  const c = pick(locale);
  const sections = article.content[l];
  const blogUrl = urlFor(l, "/blog");
  const articleUrl = urlFor(l, `/blog/${article.slug}`);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[l],
    description: article.excerpt[l],
    inLanguage: l,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    // Auteur et éditeur reliés au graphe d'entité global (@id).
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: urlFor(l, "/") },
      { "@type": "ListItem", position: 2, name: c.breadcrumbBlog, item: blogUrl },
      { "@type": "ListItem", position: 3, name: article.title[l], item: articleUrl },
    ],
  };

  return (
    <article className="site-frame py-24 lg:py-32">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique (SEO)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique (SEO)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* Rail méta (sticky) : fil d'Ariane, titre, dates, auteur */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* Fil d'Ariane */}
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              <Link
                href="/blog"
                className="underline-offset-[6px] hover:text-foreground hover:underline"
              >
                {c.breadcrumbBlog}
              </Link>
            </nav>
          </Reveal>

          {/* En-tête */}
          <Reveal delay={60}>
            <header className="mt-6">
              <h1 className="font-serif text-3xl leading-[1.12] sm:text-4xl lg:text-[2.7rem]">
                {article.title[l]}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <span>
                  {c.published}{" "}
                  <time dateTime={article.datePublished}>
                    {formatDate(article.datePublished, locale)}
                  </time>
                </span>
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                <span>
                  {c.updated}{" "}
                  <time dateTime={article.dateModified}>
                    {formatDate(article.dateModified, locale)}
                  </time>
                </span>
              </div>
            </header>
          </Reveal>

          {/* Bloc auteur */}
          <Reveal delay={120}>
            <div className="mt-8 border border-border bg-card">
              <div className="rule-brass" />
              <div className="flex items-start gap-5 p-6">
                {/* TODO : remplacer par la photo HD d'Audrey (alt descriptif) */}
                <div className="h-14 w-14 shrink-0 rounded-full bg-muted" aria-hidden />
                <div>
                  <p className="font-serif text-lg">{AUTHOR.name}</p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.authorRole}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.authorBio}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Corps : visuel, prose, maillage, disclaimer, CTA, retour */}
        <div>
          {/* Visuel, placeholder (NE PAS hotlinker Unsplash) */}
          {/* TODO : remplacer par un visuel authentique hébergé en propre + alt pertinent */}
          <Reveal delay={160}>
            <div
              className="aspect-[16/9] w-full border border-border bg-muted"
              role="img"
              aria-label={c.placeholderAlt}
            />
          </Reveal>

          {/* Corps de l'article */}
          <div className="mt-12">
            {sections.map((section, i) => (
              <Reveal key={section.heading ?? section.paragraphs[0]} delay={i * 40}>
                <section className={cn(i > 0 && "mt-10")}>
                  {section.heading && (
                    <h2 className="font-serif text-2xl leading-snug sm:text-[1.7rem]">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={p}
                      className={cn(
                        "text-lg leading-relaxed text-foreground/90",
                        (section.heading || j > 0) && "mt-4",
                      )}
                    >
                      {p}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Maillage interne « Pour aller plus loin » (optionnel) */}
          {article.relatedLinks && article.relatedLinks.length > 0 && (
            <Reveal>
              <section className="mt-14 border-t border-border pt-10">
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.relatedTitle}
                </p>
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {article.relatedLinks.map((rl) => (
                    <li key={rl.href}>
                      <Link
                        href={rl.href}
                        className="group flex items-center justify-between gap-4 py-4 text-foreground"
                      >
                        <span className="font-serif text-lg leading-tight">{rl.label[l]}</span>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {/* Disclaimer YMYL */}
          <Reveal>
            <aside className="mt-14 border-l-2 border-accent bg-card py-5 pl-5 pr-5">
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                {c.disclaimerTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.disclaimer}</p>
            </aside>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-14 border border-border bg-primary px-7 py-12 text-center text-primary-foreground lg:px-12">
              <h2 className="font-serif text-2xl sm:text-3xl">{c.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/80">
                {c.ctaText}
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {c.ctaButton}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Retour blog */}
          <Reveal>
            <div className="mt-12">
              <Link
                href="/blog"
                className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
              >
                {c.backToBlog}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
