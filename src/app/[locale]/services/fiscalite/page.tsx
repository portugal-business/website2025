import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/services/fiscalite";
const IFICI_GUIDE_PATH = "/guides/ifici-2026";
const REQUALIF_PILIER_PATH = "/guides/societe-portugal-sans-risque-france";

type Props = { params: Promise<{ locale: string }> };

type Topic = {
  term: string;
  value: string;
  href?: string;
  linkLabel?: string;
};
type Step = { title: string; description: string };
type Faq = { q: string; a: string };

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

  honestyEyebrow: string;
  honestyTitle: string;
  honestyBody: string;
  honestyPoints: string[];

  topicsEyebrow: string;
  topicsTitle: string;
  topicsSubtitle: string;
  topics: Topic[];

  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  steps: Step[];

  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];

  disclaimerLabel: string;
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
    metaTitle: "Fiscaliste Portugal : mise en relation pour votre fiscalité d'entreprise",
    metaDesc:
      "Fiscalité d'entreprise au Portugal (IRC, IVA, IFICI, double imposition) : j'écoute votre besoin et vous mets en relation avec le bon fiscaliste partenaire. Premier échange gratuit et sans engagement.",
    eyebrow: "Réseau de partenaires · Fiscalité",
    title: "Votre fiscalité au Portugal,",
    titleAccent: "orientée vers le bon fiscaliste",
    lead: "Je ne suis pas fiscaliste, et je ne prétendrai jamais l'être. Je suis consultante en création et implantation d'entreprise. Sur la fiscalité, mon rôle est d'écouter votre besoin (IFICI, fiscalité personnelle, structuration, IRC, IVA, double imposition) et de vous mettre en relation avec le fiscaliste partenaire adapté à votre situation. Vous gardez un interlocuteur de confiance pour coordonner l'ensemble.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir les sujets fiscaux",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    honestyEyebrow: "Le cadre, sans ambiguïté",
    honestyTitle: "Mise en relation, pas conseil fiscal",
    honestyBody:
      "La fiscalité internationale est un sujet sensible : une mauvaise structuration peut coûter cher, en impôts comme en risque de contrôle. C'est pourquoi je ne donne pas de conseil fiscal personnalisé. Je clarifie votre besoin, je vous explique les grands principes en terminologie portugaise exacte, puis je vous oriente vers un fiscaliste partenaire qui établit l'analyse réglementée de votre cas.",
    honestyPoints: [
      "J'écoute votre projet et identifie les enjeux fiscaux à traiter",
      "Je vous explique les notions clés (IRC, IVA, IFICI, convention France-Portugal) sans jargon",
      "Je vous mets en relation avec le fiscaliste partenaire adapté à votre situation",
      "Je coordonne avec la création de société et le Contabilista Certificado partenaire",
    ],

    topicsEyebrow: "Les sujets fiscaux courants",
    topicsTitle: "Ce qui revient le plus souvent",
    topicsSubtitle:
      "Un repère honnête sur les notions et les chiffres 2026, en terminologie portugaise. Ce sont des ordres de grandeur, pas une analyse de votre cas : c'est le fiscaliste partenaire qui chiffre votre situation précise.",
    topics: [
      {
        term: "IRC, impôt sur les sociétés",
        value:
          "Taux général de 19 % en 2026, avec un taux réduit de 15 % pour les PME sur les premiers 50 000 € de bénéfice imposable. Le détail dépend du régime de votre Lda et de son résultat.",
      },
      {
        term: "IVA, la TVA portugaise",
        value:
          "Taux standard de 23 %. Une franchise en base s'applique sous certains seuils de chiffre d'affaires ; le guichet OSS encadre les ventes intra-UE pour le e-commerce. Les obligations déclaratives sont récurrentes.",
      },
      {
        term: "IFICI (ex-« RNH 2.0 »)",
        value:
          "Régime d'incitation réservé à des profils actifs et qualifiés (chercheurs, professions hautement qualifiées, startups, R&D). Les retraités et leurs pensions étrangères en sont exclus. La demande se fait avant le 15 janvier.",
        href: IFICI_GUIDE_PATH,
        linkLabel: "Lire le guide IFICI 2026",
      },
      {
        term: "Outil, test d'éligibilité IFICI",
        value:
          "Un test gratuit en 6 questions pour voir si l'IFICI vous concerne, retraités et freelances inclus. Résultat honnête immédiat à l'écran, sans inscription.",
        href: "/outils/test-eligibilite-ifici",
        linkLabel: "Faire le test d'éligibilité",
      },
      {
        term: "Fiscalité personnelle (IRS)",
        value:
          "Salaires, dividendes, pensions, revenus d'indépendant : l'imposition dépend de votre résidence fiscale et de la convention France-Portugal de 1971. Un fiscaliste partenaire chiffre l'avant/après installation.",
      },
      {
        term: "Double imposition France-Portugal",
        value:
          "La convention de 1971 répartit le droit d'imposer entre les deux pays selon le type de revenu. Éviter la double imposition demande une lecture au cas par cas, pas une règle générale.",
      },
      {
        term: "Risque de requalification française",
        value:
          "Diriger une société portugaise depuis la France peut créer un risque de requalification fiscale (siège de direction effective, établissement stable). Le vrai sujet n'est pas l'adresse du siège mais le lieu réel des décisions.",
        href: REQUALIF_PILIER_PATH,
        linkLabel: "Société portugaise & vie en France",
      },
    ],

    processEyebrow: "Comment je vous mets en relation",
    processTitle: "Un cheminement clair vers le bon spécialiste",
    processSubtitle:
      "Pas de boîte noire : vous savez à chaque étape qui fait quoi. Je reste votre point de contact pour coordonner la création de société, la comptabilité et la fiscalité.",
    steps: [
      {
        title: "On écoute votre besoin",
        description:
          "Lors du premier échange gratuit, on cadre votre projet et les sujets fiscaux qui le concernent réellement (structuration, IFICI, fiscalité perso, IVA transfrontalière, double imposition).",
      },
      {
        title: "On qualifie l'enjeu",
        description:
          "Je vous explique les grands principes pour que vous arriviez préparé·e, et j'identifie le profil de fiscaliste adapté : fiscalité d'entreprise, fiscalité personnelle, ou les deux.",
      },
      {
        title: "Je vous mets en relation",
        description:
          "Je vous oriente vers le fiscaliste partenaire adapté à votre situation, qui établit l'analyse réglementée et personnalisée. Je facilite la prise de contact et le partage des éléments.",
      },
      {
        title: "Je coordonne l'ensemble",
        description:
          "Création de société, Contabilista Certificado partenaire pour la comptabilité, fiscaliste pour le conseil : je veille à ce que tout s'articule, sans vous laisser gérer seul·e plusieurs interlocuteurs.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce qu'on me demande sur la fiscalité",
    faq: [
      {
        q: "Êtes-vous fiscaliste ?",
        a: "Non. Audrey Marques est consultante en création et implantation d'entreprise au Portugal, ni fiscaliste, ni comptable, ni avocate. Sur la fiscalité, mon rôle est de comprendre votre besoin et de vous mettre en relation avec un fiscaliste partenaire qui établit l'analyse réglementée de votre cas.",
      },
      {
        q: "Quel est le taux de l'IRC au Portugal en 2026 ?",
        a: "Le taux général de l'IRC (impôt sur les sociétés) est de 19 % en 2026, avec un taux réduit de 15 % pour les PME sur les premiers 50 000 € de bénéfice imposable. Le calcul exact dépend de votre situation et relève du fiscaliste et du Contabilista Certificado partenaires.",
      },
      {
        q: "Quel est le taux de l'IVA (TVA) ?",
        a: "Le taux standard de l'IVA est de 23 %. Une franchise en base existe sous certains seuils de chiffre d'affaires, et le guichet OSS encadre les ventes intra-UE pour le e-commerce. Les modalités précises dépendent de votre activité.",
      },
      {
        q: "Les retraités peuvent-ils bénéficier de l'IFICI ?",
        a: "Non. L'IFICI (surnommé « RNH 2.0 ») exclut les retraités et leurs pensions étrangères : c'est le changement majeur par rapport à l'ancien RNH. Une pension privée relève en principe du barème IRS portugais, une pension publique reste imposée en France (convention de 1971). Pour votre cas, un fiscaliste partenaire est indispensable.",
      },
      {
        q: "Faut-il un gérant résident au Portugal ?",
        a: "Non, ce n'est pas une obligation légale, c'est un mythe répandu. Le vrai sujet n'est pas la résidence du gérant mais le lieu où la société est réellement dirigée, qui peut créer un risque de requalification fiscale en France. C'est un point à traiter au cas par cas avec un fiscaliste.",
      },
      {
        q: "Comment éviter la double imposition entre la France et le Portugal ?",
        a: "La convention fiscale franco-portugaise de 1971 répartit le droit d'imposer selon le type de revenu. Il n'existe pas de règle unique : la réponse dépend de votre résidence fiscale et de la nature de vos revenus. Je vous mets en relation avec un fiscaliste partenaire pour une analyse personnalisée.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil fiscal, juridique ou comptable personnalisé. Business Portugal n'est pas un cabinet de fiscalité : nous orientons vers des fiscalistes partenaires. Les chiffres cités sont à jour en 2026 et susceptibles d'évoluer à chaque Loi de Finances (Orçamento do Estado). Votre situation dépend de votre cas individuel et de la convention fiscale France-Portugal de 1971. Pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Parlons de votre fiscalité",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer vos enjeux fiscaux et vous orienter vers le bon fiscaliste partenaire. On regarde votre situation, on identifie le bon interlocuteur, on avance ensemble.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Mise en relation · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Fiscalité",
    serviceName: "Mise en relation fiscalité d'entreprise au Portugal",
  },
  en: {
    metaTitle: "Portugal tax adviser: connecting you for your company taxation",
    metaDesc:
      "Company taxation in Portugal (IRC, IVA, IFICI, double taxation): I listen to your needs and connect you with the right partner tax adviser. First conversation free, no commitment.",
    eyebrow: "Partner network · Taxation",
    title: "Your taxation in Portugal,",
    titleAccent: "guided to the right tax adviser",
    lead: "I am not a tax adviser, and I will never claim to be one. I am a consultant in company formation and setup. On taxation, my role is to listen to your needs (IFICI, personal taxation, structuring, IRC, IVA, double taxation) and connect you with the partner tax adviser suited to your situation. You keep one trusted point of contact to coordinate everything.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the tax topics",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    honestyEyebrow: "The framing, plainly",
    honestyTitle: "An introduction, not tax advice",
    honestyBody:
      "International taxation is a sensitive matter: poor structuring can be costly, both in tax and in audit risk. That is why I do not give personalised tax advice. I clarify your needs, explain the key principles in accurate Portuguese terminology, then connect you with a partner tax adviser who provides the regulated analysis of your case.",
    honestyPoints: [
      "I listen to your project and identify the tax issues to address",
      "I explain the key notions (IRC, IVA, IFICI, France-Portugal treaty) without jargon",
      "I connect you with the partner tax adviser suited to your situation",
      "I coordinate with company formation and the partner Contabilista Certificado",
    ],

    topicsEyebrow: "Common tax topics",
    topicsTitle: "What comes up most often",
    topicsSubtitle:
      "An honest overview of the 2026 notions and figures, in Portuguese terminology. These are orders of magnitude, not an analysis of your case: it is the partner tax adviser who quantifies your specific situation.",
    topics: [
      {
        term: "IRC, corporate income tax",
        value:
          "General rate of 19% in 2026, with a reduced 15% rate for SMEs on the first €50,000 of taxable profit. The detail depends on your Lda's regime and its results.",
      },
      {
        term: "IVA, Portuguese VAT",
        value:
          "Standard rate of 23%. A small-business exemption applies below certain turnover thresholds; the OSS scheme frames intra-EU sales for e-commerce. Reporting obligations are recurring.",
      },
      {
        term: "IFICI (formerly “NHR 2.0”)",
        value:
          "Incentive regime reserved for active, qualified profiles (researchers, highly qualified professions, startups, R&D). Retirees and their foreign pensions are excluded. The application is due before 15 January.",
        href: IFICI_GUIDE_PATH,
        linkLabel: "Read the IFICI 2026 guide",
      },
      {
        term: "Tool, IFICI eligibility test",
        value:
          "A free 6-question test to see whether the IFICI applies to you, retirees and freelancers included. An honest result instantly on screen, no sign-up.",
        href: "/outils/test-eligibilite-ifici",
        linkLabel: "Take the eligibility test",
      },
      {
        term: "Personal taxation (IRS)",
        value:
          "Salaries, dividends, pensions, self-employed income: taxation depends on your tax residence and the 1971 France-Portugal treaty. A partner tax adviser quantifies the before/after of relocating.",
      },
      {
        term: "France-Portugal double taxation",
        value:
          "The 1971 treaty allocates taxing rights between the two countries by type of income. Avoiding double taxation requires a case-by-case reading, not a general rule.",
      },
      {
        term: "French reclassification risk",
        value:
          "Running a Portuguese company from France can create a tax reclassification risk (place of effective management, permanent establishment). The real issue is not the registered address but where decisions are actually made.",
        href: REQUALIF_PILIER_PATH,
        linkLabel: "Portuguese company & living in France",
      },
    ],

    processEyebrow: "How I connect you",
    processTitle: "A clear path to the right specialist",
    processSubtitle:
      "No black box: at each step you know who does what. I remain your point of contact to coordinate company formation, accounting and taxation.",
    steps: [
      {
        title: "We listen to your needs",
        description:
          "During the free first conversation, we frame your project and the tax topics that actually concern it (structuring, IFICI, personal taxation, cross-border VAT, double taxation).",
      },
      {
        title: "We qualify the issue",
        description:
          "I explain the key principles so you arrive prepared, and I identify the right adviser profile: corporate taxation, personal taxation, or both.",
      },
      {
        title: "I make the introduction",
        description:
          "I direct you to the partner tax adviser suited to your situation, who provides the regulated, personalised analysis. I facilitate the first contact and the sharing of documents.",
      },
      {
        title: "I coordinate everything",
        description:
          "Company formation, partner Contabilista Certificado for accounting, tax adviser for advice: I make sure it all fits together, so you don't manage several contacts alone.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What people ask me about taxation",
    faq: [
      {
        q: "Are you a tax adviser?",
        a: "No. Audrey Marques is a consultant in company formation and setup in Portugal, not a tax adviser, accountant or lawyer. On taxation, my role is to understand your needs and connect you with a partner tax adviser who provides the regulated analysis of your case.",
      },
      {
        q: "What is the IRC rate in Portugal in 2026?",
        a: "The general IRC (corporate income tax) rate is 19% in 2026, with a reduced 15% rate for SMEs on the first €50,000 of taxable profit. The exact calculation depends on your situation and falls to the partner tax adviser and Contabilista Certificado.",
      },
      {
        q: "What is the IVA (VAT) rate?",
        a: "The standard IVA rate is 23%. A small-business exemption exists below certain turnover thresholds, and the OSS scheme frames intra-EU sales for e-commerce. The precise terms depend on your activity.",
      },
      {
        q: "Can retirees benefit from IFICI?",
        a: "No. The IFICI (nicknamed “NHR 2.0”) excludes retirees and their foreign pensions: that is the major change from the former NHR. A private pension is in principle taxed under the Portuguese IRS scale, while a public pension remains taxed in France (1971 treaty). For your case, a partner tax adviser is essential.",
      },
      {
        q: "Do you need a resident manager in Portugal?",
        a: "No, it is not a legal requirement, that is a widespread myth. The real issue is not the manager's residence but where the company is actually run, which can create a tax reclassification risk in France. This must be handled case by case with a tax adviser.",
      },
      {
        q: "How do you avoid double taxation between France and Portugal?",
        a: "The 1971 France-Portugal tax treaty allocates taxing rights by type of income. There is no single rule: the answer depends on your tax residence and the nature of your income. I connect you with a partner tax adviser for a personalised analysis.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised tax, legal or accounting advice. Business Portugal is not a tax practice: we make introductions to partner tax advisers. The figures quoted are current as of 2026 and subject to change with each Finance Act (Orçamento do Estado). Your situation depends on your individual case and on the 1971 France-Portugal tax treaty. For an analysis of your project, book a meeting.",

    ctaTitle: "Let's talk about your taxation",
    ctaBody:
      "A first free conversation, with no commitment, to frame your tax issues and direct you to the right partner tax adviser. We look at your situation, identify the right contact, and move forward together.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Introduction · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Taxation",
    serviceName: "Company taxation introductions in Portugal",
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

export default async function FiscalitePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.serviceName,
    serviceType: c.serviceName,
    description: c.metaDesc,
    inLanguage: locale,
    url: urlFor(locale, PATH),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Portugal" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                  href="#sujets"
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
                <p className="eyebrow">{c.honestyEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.honestyPoints.map((it, i) => (
                    <div key={it} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem] leading-relaxed">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Cadre honnête : mise en relation, pas conseil */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.honestyEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.honestyTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.honestyBody}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sujets fiscaux courants */}
      <section id="sujets" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.topicsEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.topicsTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.topicsSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.topics.map((t, i) => (
                  <Reveal key={t.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{t.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">
                        {t.value}
                        {t.href && t.linkLabel ? (
                          <Link
                            href={t.href}
                            className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                          >
                            {t.linkLabel}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </Link>
                        ) : null}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Comment je vous mets en relation */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.processEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.processTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.processSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-8">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl">{s.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
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

      {/* Disclaimer YMYL renforcé */}
      <section className="border-t border-border bg-card">
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
