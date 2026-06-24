import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/services/domiciliation";

type Props = { params: Promise<{ locale: string }> };

type Item = { title: string; description: string };
type Fact = { term: string; value: string };

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trust: string;

  roleEyebrow: string;
  roleTitle: string;
  roleBody: string;
  roleItems: Item[];

  includesEyebrow: string;
  includesTitle: string;
  includesSubtitle: string;
  includes: string[];
  notIncludedLabel: string;
  notIncluded: string[];

  whoEyebrow: string;
  whoTitle: string;
  whoSubtitle: string;
  who: Item[];

  priceEyebrow: string;
  priceTitle: string;
  priceBody: string;
  priceFacts: Fact[];

  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbServices: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Domiciliation d'entreprise à Lisbonne (Portugal)",
    metaDesc:
      "Besoin d'une adresse professionnelle pour votre société au Portugal ? Je vous mets en relation avec des solutions de domiciliation d'entreprise à Lisbonne, à partir d'environ 500 €HT/an. Discret, simple, sans engagement.",
    eyebrow: "Réseau de partenaires",
    title: "Une adresse professionnelle pour votre société au Portugal,",
    titleAccent: "en toute discrétion",
    lead: "La domiciliation est un service annexe que je ne survends pas : si votre projet le nécessite, je vous mets simplement en relation avec des solutions de domiciliation d'entreprise éprouvées à Lisbonne. Vous obtenez une adresse de siège crédible, sans louer de bureau, et vous gardez un seul interlocuteur pour l'ensemble de votre implantation.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Comment ça marche",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    roleEyebrow: "À quoi sert une adresse de siège",
    roleTitle: "Pourquoi une société portugaise a besoin d'une adresse",
    roleBody:
      "Toute société immatriculée au Portugal (Unipessoal Lda, Lda, SA) doit déclarer un siège social, une adresse officielle rattachée au NIPC. C'est l'adresse qui figure sur la Certidão Permanente et que reçoivent les administrations. Si vous ne vivez pas sur place ou ne louez pas de local, une solution de domiciliation fournit cette adresse de façon propre et stable.",
    roleItems: [
      {
        title: "Une adresse officielle pour le siège",
        description:
          "Le siège social est obligatoire pour immatriculer la société et figure sur la Certidão Permanente et les actes officiels.",
      },
      {
        title: "Un point de réception fiable",
        description:
          "Le courrier des administrations (Finanças, Segurança Social) et de la banque arrive à une adresse suivie, sans dépendre d'un domicile privé.",
      },
      {
        title: "Une image professionnelle, sans bureau",
        description:
          "Vous présentez une adresse d'affaires crédible à Lisbonne sans engager les coûts d'un local commercial dont vous n'avez pas l'usage.",
      },
    ],

    includesEyebrow: "Ce qui est couvert",
    includesTitle: "Ce que la domiciliation inclut, généralement",
    includesSubtitle:
      "Les prestations varient d'un partenaire à l'autre. Voici le socle habituel d'une domiciliation d'entreprise à Lisbonne, et ce qui n'en fait pas partie, pour éviter toute confusion.",
    includes: [
      "Une adresse de siège social à Lisbonne, utilisable pour l'immatriculation",
      "La réception et la notification de votre courrier administratif",
      "La possibilité de numériser ou faire suivre le courrier important",
      "Une adresse stable pour la Certidão Permanente et les démarches officielles",
    ],
    notIncludedLabel: "Ce que la domiciliation n'est pas",
    notIncluded: [
      "Ce n'est pas un bureau physique ni un espace de travail",
      "Ce n'est pas une garantie de substance fiscale en cas de contrôle",
      "Ce n'est pas un service comptable, fiscal ou juridique (partenaires dédiés)",
    ],

    whoEyebrow: "Pour qui c'est utile",
    whoTitle: "Quand la domiciliation a du sens",
    whoSubtitle:
      "La domiciliation n'est pas systématique. Elle est pertinente dans des cas précis ; dans d'autres, votre propre local suffit. On en discute lors de l'échange.",
    who: [
      {
        title: "Vous ne résidez pas (encore) au Portugal",
        description:
          "Vous créez votre société sans y vivre encore et n'avez pas d'adresse locale à déclarer comme siège.",
      },
      {
        title: "Vous travaillez sans local commercial",
        description:
          "Activité de services, conseil ou import-export pilotée à distance : louer un bureau n'aurait pas de sens.",
      },
      {
        title: "Vous voulez séparer pro et privé",
        description:
          "Vous préférez ne pas exposer votre adresse personnelle sur les documents publics de la société.",
      },
    ],

    priceEyebrow: "La fourchette, sans détour",
    priceTitle: "Combien coûte une domiciliation",
    priceBody:
      "La domiciliation se facture en général à l'année, directement auprès du partenaire. Je vous oriente vers la solution adaptée à votre profil ; le tarif final dépend des prestations retenues (simple adresse, gestion du courrier, options).",
    priceFacts: [
      {
        term: "Fourchette indicative",
        value:
          "À partir d'environ 500 €HT/an pour une domiciliation d'entreprise à Lisbonne, selon le partenaire et les options.",
      },
      {
        term: "Facturation",
        value:
          "Réglée auprès du prestataire de domiciliation, distincte du forfait de création de société.",
      },
      {
        term: "Mon rôle",
        value:
          "Mise en relation et coordination avec le partenaire ; je ne suis pas le prestataire de domiciliation.",
      },
    ],

    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Une adresse de domiciliation ne suffit pas, à elle seule, à caractériser une implantation réelle : votre situation dépend de votre cas individuel et de la convention fiscale France-Portugal. Pour une analyse de votre projet, prenez rendez-vous. Informations à jour en 2026, susceptibles d'évoluer.",

    ctaTitle: "Une adresse à Lisbonne pour votre société ?",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour voir si la domiciliation est utile à votre projet, et vers quel partenaire vous orienter. On regarde votre situation, on avance simplement.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Domiciliation",
    serviceName: "Domiciliation d'entreprise à Lisbonne",
  },
  en: {
    metaTitle: "Business address & domiciliation in Lisbon (Portugal)",
    metaDesc:
      "Need a registered business address for your company in Portugal? I connect you with proven business domiciliation solutions in Lisbon, from around €500 +VAT per year. Discreet, simple, no commitment.",
    eyebrow: "Partner network",
    title: "A professional registered address for your company in Portugal,",
    titleAccent: "handled discreetly",
    lead: "Domiciliation is a secondary service I deliberately keep low-key: if your project needs it, I simply connect you with trusted business address solutions in Lisbon. You get a credible registered office without renting an office, and you keep a single point of contact for your whole setup.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "How it works",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    roleEyebrow: "What a registered office is for",
    roleTitle: "Why a Portuguese company needs an address",
    roleBody:
      "Every company registered in Portugal (Unipessoal Lda, Lda, SA) must declare a registered office, an official address tied to the NIPC. It is the address shown on the Certidão Permanente and used by the administrations. If you do not live on site or rent premises, a domiciliation solution provides that address in a clean, stable way.",
    roleItems: [
      {
        title: "An official registered-office address",
        description:
          "The registered office is mandatory to incorporate the company and appears on the Certidão Permanente and official deeds.",
      },
      {
        title: "A reliable point of receipt",
        description:
          "Mail from the administrations (Finanças, Segurança Social) and the bank reaches a tracked address, independent of a private home.",
      },
      {
        title: "A professional image, without an office",
        description:
          "You present a credible business address in Lisbon without taking on the cost of premises you would not use.",
      },
    ],

    includesEyebrow: "What is covered",
    includesTitle: "What domiciliation usually includes",
    includesSubtitle:
      "Offerings vary from one partner to another. Here is the usual baseline of a business domiciliation in Lisbon, and what falls outside it, to avoid any confusion.",
    includes: [
      "A registered-office address in Lisbon, usable for incorporation",
      "Receipt and notification of your administrative mail",
      "The option to scan or forward important mail",
      "A stable address for the Certidão Permanente and official steps",
    ],
    notIncludedLabel: "What domiciliation is not",
    notIncluded: [
      "It is not a physical office or workspace",
      "It is not a guarantee of tax substance in the event of an audit",
      "It is not an accounting, tax or legal service (dedicated partners for that)",
    ],

    whoEyebrow: "Who it is useful for",
    whoTitle: "When domiciliation makes sense",
    whoSubtitle:
      "Domiciliation is not automatic. It is relevant in specific cases; in others, your own premises are enough. We discuss it during the conversation.",
    who: [
      {
        title: "You do not (yet) live in Portugal",
        description:
          "You set up your company without living there yet and have no local address to declare as the registered office.",
      },
      {
        title: "You work without business premises",
        description:
          "Services, consulting or import-export run remotely: renting an office would make no sense.",
      },
      {
        title: "You want to separate work and home",
        description:
          "You would rather not expose your personal address on the company's public documents.",
      },
    ],

    priceEyebrow: "The range, plainly",
    priceTitle: "How much domiciliation costs",
    priceBody:
      "Domiciliation is usually billed annually, directly by the partner. I steer you toward the solution that fits your profile; the final price depends on the services chosen (plain address, mail handling, options).",
    priceFacts: [
      {
        term: "Indicative range",
        value:
          "From around €500 +VAT per year for a business domiciliation in Lisbon, depending on the partner and options.",
      },
      {
        term: "Billing",
        value: "Paid to the domiciliation provider, separate from the company formation package.",
      },
      {
        term: "My role",
        value:
          "Connection and coordination with the partner; I am not the domiciliation provider myself.",
      },
    ],

    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. A domiciliation address alone is not enough to establish a real presence: your situation depends on your individual case and on the France-Portugal tax treaty. For an analysis of your project, book a meeting. Information up to date in 2026, subject to change.",

    ctaTitle: "A Lisbon address for your company?",
    ctaBody:
      "A first free conversation, with no commitment, to see whether domiciliation is useful for your project and which partner to point you to. We look at your situation and move forward simply.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Domiciliation",
    serviceName: "Business domiciliation in Lisbon",
  },
};

const pick = (l: string): Copy => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: urlFor(locale, PATH),
      languages: languagesFor(PATH),
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function DomiciliationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.serviceName,
    serviceType: c.serviceName,
    description: c.metaDesc,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Lisbon" },
    url: urlFor(locale, PATH),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: c.breadcrumbHome,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbServices,
        item: `${SITE_URL}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.breadcrumbCurrent,
        item: urlFor(locale, PATH),
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                  href="#role"
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

          <Reveal delay={160}>
            <aside className="border border-border bg-card">
              <div className="rule-brass" />
              <div className="p-8">
                <p className="eyebrow">{c.priceEyebrow}</p>
                <dl className="mt-6 divide-y divide-border">
                  {c.priceFacts.map((f) => (
                    <div key={f.term} className="py-4 first:pt-0 last:pb-0">
                      <dt className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                        {f.term}
                      </dt>
                      <dd className="mt-2 text-[0.98rem] leading-relaxed text-muted-foreground">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* À quoi sert une adresse de siège */}
      <section id="role" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.roleEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.roleTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.roleBody}</p>
              </Reveal>
              <div className="mt-10 border-t border-border">
                {c.roleItems.map((it, i) => (
                  <Reveal key={it.title} delay={i * 60}>
                    <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-7">
                      <span className="index-num text-2xl text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl">{it.title}</h3>
                        <p className="mt-1.5 leading-relaxed text-muted-foreground">
                          {it.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que la domiciliation inclut / n'inclut pas */}
      <section>
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.includesEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.includesTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.includesSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <div className="border-t border-border">
                {c.includes.map((p, i) => (
                  <Reveal key={p} delay={i * 60}>
                    <div className="flex items-baseline gap-5 border-b border-border py-4">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      <span className="text-[1.05rem]">{p}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <p className="mt-10 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.notIncludedLabel}
                </p>
              </Reveal>
              <div className="mt-4 border-t border-border">
                {c.notIncluded.map((n, i) => (
                  <Reveal key={n} delay={i * 60}>
                    <div className="border-b border-border py-4">
                      <span className="text-[1.02rem] text-muted-foreground">{n}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui c'est utile */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.whoEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.whoTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.whoSubtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-3">
            {c.who.map((it, i) => (
              <Reveal key={it.title} delay={i * 70} className="bg-card">
                <div className="h-full p-7">
                  <span className="index-num text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl">{it.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{it.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fourchette indicative */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.priceEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.priceTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.priceBody}</p>
              </Reveal>
              <dl className="mt-10 border-t border-border">
                {c.priceFacts.map((f, i) => (
                  <Reveal key={f.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{f.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{f.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={80}>
                <p className="mt-10 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.disclaimer}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
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
