import { ArrowRight, Banknote, Building2, Calculator, MapPin, Scale, Users } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/services";

type Props = { params: Promise<{ locale: string }> };

type IconKey = "building" | "bank" | "calculator" | "scale" | "pin" | "users";

type ServiceCard = {
  icon: IconKey;
  index: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

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

  coreEyebrow: string;
  coreTitle: string;
  coreBody: string;
  core: ServiceCard[];

  networkEyebrow: string;
  networkTitle: string;
  networkBody: string;
  network: ServiceCard[];

  singleEyebrow: string;
  singleTitle: string;
  singleBody: string;
  singlePoints: string[];

  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbCurrent: string;
  itemListName: string;
};

const ICONS: Record<IconKey, typeof Building2> = {
  building: Building2,
  bank: Banknote,
  calculator: Calculator,
  scale: Scale,
  pin: MapPin,
  users: Users,
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Nos services, accompagnement création entreprise Portugal",
    metaDesc:
      "Accompagnement création entreprise Portugal : création de société et déblocage bancaire réalisés par Audrey Marques, puis mise en relation avec un réseau de partenaires de confiance, comptabilité, fiscalité, domiciliation, recrutement. Un seul interlocuteur francophone.",

    eyebrow: "Le périmètre des services",
    title: "Un accompagnement à la création d'entreprise au Portugal,",
    titleAccent: "avec un seul interlocuteur francophone",
    lead: "Deux services que je réalise et coordonne moi-même, la création de votre société et le déblocage bancaire, puis un réseau de partenaires de confiance vers qui je vous oriente pour la comptabilité, la fiscalité, la domiciliation et le recrutement. Vous gardez un point de contact unique, du premier échange jusqu'à la mise en relation avec les bons spécialistes.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir les services",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    coreEyebrow: "Ce que je réalise moi-même",
    coreTitle: "Le service cœur : création et banque",
    coreBody:
      "La création de société et l'accompagnement bancaire sont les deux prestations que j'exécute de bout en bout. Pas une coquille « en 2 h » : une implantation réelle, documentée, avec un accompagnement bancaire concret auprès d'un partenaire officiel.",
    core: [
      {
        icon: "building",
        index: "01",
        kicker: "Réalisé par Audrey",
        title: "Création de société",
        description:
          "Du NIF à distance à la constitution de la société : Certidão Permanente sous 24/48 h, RCBE, statuts. Je cadre la bonne structure (Unipessoal Lda, Lda ou SA) et je pilote chaque étape.",
        href: "/creation-societe",
        linkLabel: "Découvrir la création de société",
      },
      {
        icon: "bank",
        index: "02",
        kicker: "Réalisé par Audrey",
        title: "Accompagnement bancaire",
        description:
          "Je vous accompagne à l'ouverture du compte professionnel avec un partenaire bancaire officiel (Millennium) et je prépare le dossier pour maximiser vos chances. L'ouverture dépend toujours de la compliance de la banque.",
        href: "/creation-societe",
        linkLabel: "Voir l'accompagnement bancaire",
      },
    ],

    networkEyebrow: "Ce vers quoi je vous oriente",
    networkTitle: "Le réseau de partenaires, en mise en relation",
    networkBody:
      "Pour la comptabilité, la fiscalité, la domiciliation et le recrutement, je ne prétends pas tout faire moi-même. Je vous mets en relation avec des partenaires spécialisés et de confiance, et je coordonne le démarrage. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet.",
    network: [
      {
        icon: "calculator",
        index: "03",
        kicker: "Mise en relation",
        title: "Comptabilité",
        description:
          "Toute société portugaise doit confier sa comptabilité à un Contabilista Certificado inscrit à l'OCC. Je vous oriente vers nos partenaires (Raly Conseils, Joongle) et coordonne le démarrage de votre comptabilité.",
        href: "/services/comptabilite",
        linkLabel: "En savoir plus sur la comptabilité",
      },
      {
        icon: "scale",
        index: "04",
        kicker: "Mise en relation",
        title: "Fiscalité",
        description:
          "Fiscalité personnelle, IFICI, structuration : je ne suis pas fiscaliste, je vous mets en relation avec le bon professionnel selon votre besoin. Le site informe, le partenaire conseille votre cas précis.",
        href: "/services/fiscalite",
        linkLabel: "En savoir plus sur la fiscalité",
      },
      {
        icon: "pin",
        index: "05",
        kicker: "Mise en relation",
        title: "Domiciliation",
        description:
          "Si votre projet le nécessite, je vous oriente vers des solutions de domiciliation partenaires à Lisbonne, pour disposer d'une adresse professionnelle conforme.",
        href: "/services/domiciliation",
        linkLabel: "En savoir plus sur la domiciliation",
      },
      {
        icon: "users",
        index: "06",
        kicker: "Mise en relation",
        title: "Recrutement",
        description:
          "Pour recruter et employer au Portugal, je vous mets en relation avec une société spécialisée. Vous bénéficiez d'un interlocuteur qui connaît les usages locaux et le cadre social portugais.",
        href: "/services/recrutement",
        linkLabel: "En savoir plus sur le recrutement",
      },
    ],

    singleEyebrow: "La logique d'ensemble",
    singleTitle: "Un seul interlocuteur, du début à la fin",
    singleBody:
      "L'enjeu d'une implantation n'est pas tant l'administration que la coordination. Plutôt que de jongler seul·e, dans une langue étrangère, avec dix interlocuteurs, vous gardez un point de contact francophone unique : je crée la société, je débloque la banque, et je vous connecte aux bons experts au bon moment.",
    singlePoints: [
      "Un point de contact francophone unique, du premier échange à la mise en relation",
      "Création de société et déblocage bancaire réalisés en propre",
      "Un réseau de partenaires de confiance pour comptabilité, fiscalité, domiciliation et recrutement",
      "Réactivité et transparence : ce qui est inclus, ce qui est externalisé, sans frais cachés",
    ],

    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. La comptabilité réglementée et la fiscalité relèvent de partenaires spécialisés (Contabilista Certificado inscrit à l'OCC, fiscaliste). Chaque situation dépend de votre cas et de la convention fiscale France-Portugal. Informations à jour en 2026, susceptibles d'évoluer.",

    ctaTitle: "Parlons de votre projet",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre implantation, identifier ce que je réalise moi-même et les partenaires à mobiliser. On regarde votre situation, on avance.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Services",
    itemListName: "Services d'accompagnement à la création d'entreprise au Portugal",
  },
  en: {
    metaTitle: "Our services, company formation support in Portugal",
    metaDesc:
      "Company formation support in Portugal: incorporation and banking handled by Audrey Marques, then connection to a network of trusted partners, accounting, tax, registered office, recruitment. A single French-speaking point of contact.",

    eyebrow: "The scope of services",
    title: "Support to start your business in Portugal,",
    titleAccent: "with a single French-speaking contact",
    lead: "Two services I handle and coordinate myself, incorporating your company and unlocking banking, then a network of trusted partners I connect you with for accounting, tax, registered office and recruitment. You keep a single point of contact, from the first conversation to being introduced to the right specialists.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the services",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    coreEyebrow: "What I handle myself",
    coreTitle: "The core service: incorporation and banking",
    coreBody:
      "Company formation and banking support are the two services I run end to end. Not a shell company set up “in 2 hours”: a real, documented incorporation with concrete banking support through an official partner.",
    core: [
      {
        icon: "building",
        index: "01",
        kicker: "Handled by Audrey",
        title: "Company formation",
        description:
          "From the remote NIF to incorporation: Certidão Permanente within 24/48 h, RCBE, articles of association. I frame the right structure (Unipessoal Lda, Lda or SA) and steer every step.",
        href: "/creation-societe",
        linkLabel: "Discover company formation",
      },
      {
        icon: "bank",
        index: "02",
        kicker: "Handled by Audrey",
        title: "Banking support",
        description:
          "I support you opening the business account with an official banking partner (Millennium) and prepare the file to maximise your chances. Opening always depends on the bank's compliance.",
        href: "/creation-societe",
        linkLabel: "See banking support",
      },
    ],

    networkEyebrow: "What I connect you with",
    networkTitle: "The partner network, by introduction",
    networkBody:
      "For accounting, tax, registered office and recruitment, I do not pretend to do everything myself. I connect you with trusted, specialised partners and coordinate the start. Regulated accounting is handled by a Contabilista Certificado registered with the OCC, a partner of the practice.",
    network: [
      {
        icon: "calculator",
        index: "03",
        kicker: "Introduction",
        title: "Accounting",
        description:
          "Every Portuguese company must entrust its accounting to a Contabilista Certificado registered with the OCC. I connect you with our partners (Raly Conseils, Joongle) and coordinate the start of your accounting.",
        href: "/services/comptabilite",
        linkLabel: "Learn more about accounting",
      },
      {
        icon: "scale",
        index: "04",
        kicker: "Introduction",
        title: "Tax",
        description:
          "Personal tax, IFICI, structuring: I am not a tax adviser, I connect you with the right professional for your need. The site informs; the partner advises on your specific case.",
        href: "/services/fiscalite",
        linkLabel: "Learn more about tax",
      },
      {
        icon: "pin",
        index: "05",
        kicker: "Introduction",
        title: "Registered office",
        description:
          "If your project requires it, I direct you to partner registered-office solutions in Lisbon, so you have a compliant professional address.",
        href: "/services/domiciliation",
        linkLabel: "Learn more about registered office",
      },
      {
        icon: "users",
        index: "06",
        kicker: "Introduction",
        title: "Recruitment",
        description:
          "To hire and employ in Portugal, I connect you with a specialised company. You get a contact who knows local practices and the Portuguese employment framework.",
        href: "/services/recrutement",
        linkLabel: "Learn more about recruitment",
      },
    ],

    singleEyebrow: "The overall logic",
    singleTitle: "A single point of contact, start to finish",
    singleBody:
      "The challenge of setting up is not so much the administration as the coordination. Rather than juggling ten contacts alone, in a foreign language, you keep a single French-speaking point of contact: I incorporate the company, unlock banking, and connect you with the right experts at the right time.",
    singlePoints: [
      "A single French-speaking contact, from the first conversation to the introductions",
      "Company formation and banking handled in-house",
      "A network of trusted partners for accounting, tax, registered office and recruitment",
      "Responsiveness and transparency: what is included, what is outsourced, no hidden fees",
    ],

    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Regulated accounting and tax are handled by specialised partners (a Contabilista Certificado registered with the OCC, a tax adviser). Every situation depends on your case and on the France-Portugal tax treaty. Information up to date in 2026, subject to change.",

    ctaTitle: "Let's talk about your project",
    ctaBody:
      "A first free conversation, with no commitment, to frame your setup, identify what I handle myself and which partners to bring in. We look at your situation and move forward.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbCurrent: "Services",
    itemListName: "Company formation and setup support services in Portugal",
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

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const allServices = [...c.core, ...c.network];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: c.breadcrumbHome,
        item: urlFor(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbCurrent,
        item: urlFor(locale, PATH),
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.itemListName,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: allServices.length,
    itemListElement: allServices.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: urlFor(locale, s.href),
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        url: urlFor(locale, s.href),
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "Country", name: "Portugal" },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
                  href="#services"
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
                <p className="eyebrow">{c.coreEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {allServices.map((s) => (
                    <div key={`${s.index}-${s.title}`} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">{s.index}</span>
                      <span className="text-[0.98rem]">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Service cœur */}
      <section id="services" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.coreEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.coreTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.coreBody}</p>
              </Reveal>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {c.core.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <Reveal key={s.title} delay={i * 70} className="bg-card">
                    <div className="flex h-full flex-col p-7">
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-accent" aria-hidden />
                        <span className="index-num text-sm text-accent">{s.index}</span>
                      </div>
                      <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                        {s.kicker}
                      </p>
                      <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
                      <p className="mt-2.5 leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                      <Link
                        href={s.href}
                        className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                      >
                        {s.linkLabel}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Réseau de partenaires */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.networkEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.networkTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.networkBody}
                </p>
              </Reveal>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {c.network.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <Reveal key={s.title} delay={i * 70} className="bg-card">
                    <div className="flex h-full flex-col p-7">
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-accent" aria-hidden />
                        <span className="index-num text-sm text-accent">{s.index}</span>
                      </div>
                      <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                        {s.kicker}
                      </p>
                      <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
                      <p className="mt-2.5 leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                      <Link
                        href={s.href}
                        className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                      >
                        {s.linkLabel}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Un seul interlocuteur */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.singleEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.singleTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.singleBody}</p>
              </Reveal>
              <div className="mt-10 border-t border-border">
                {c.singlePoints.map((p, i) => (
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
