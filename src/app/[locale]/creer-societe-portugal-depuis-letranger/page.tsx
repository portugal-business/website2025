import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  BUSINESS_ID,
  FOUNDER_ID,
  languagesFor,
  ORGANIZATION_ID,
  ogLocaleFor,
  SITE_URL,
  urlFor,
} from "@/lib/site";
import { cn } from "@/lib/utils";

// Hub transversal « à distance » : le tronc commun de toutes les pages pays.
// Intention = « comment créer ma société au Portugal depuis chez moi, sans me
// déplacer ». Oriente ensuite vers les spokes pays (Lot 3) et le pilier France.
const PATH = "/creer-societe-portugal-depuis-letranger";
const CREATION_PATH = "/creation-societe";
const REQUALIF_PATH = "/guides/societe-portugal-sans-risque-france";
const IFICI_PATH = "/guides/ifici-2026";
const OUTILS_PATH = "/outils";
const COMPARATIF_PATH = "/comparatifs/portugal-vs-france-espagne-dubai";

const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

type Step = { term: string; value: string };
type CountryCard = { country: string; tag: string; desc: string; href: string; cta: string };
type RelatedLink = { label: string; href: string; desc: string };
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

  stepsEyebrow: string;
  stepsTitle: string;
  stepsBody: string;
  steps: Step[];

  countriesEyebrow: string;
  countriesTitle: string;
  countriesBody: string;
  countries: CountryCard[];

  relatedEyebrow: string;
  relatedTitle: string;
  related: RelatedLink[];

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
  breadcrumbCurrent: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Créer sa société au Portugal depuis l'étranger : le guide à distance",
    metaDesc:
      "Vous vivez en France, en Belgique, en Suisse, au Luxembourg ou au Maghreb ? Créez votre société au Portugal à distance : NIF par représentant fiscal, procuration, signature électronique, accompagnement bancaire. Service en français, depuis chez vous.",
    eyebrow: "À distance · Depuis l'étranger",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis l'étranger, à distance",
    lead: "La plupart des entrepreneurs que nous accompagnons ne vivent pas (encore) au Portugal : ils nous écrivent de France, de Belgique, de Suisse, du Luxembourg ou du Maghreb. La bonne nouvelle, c'est que l'essentiel des démarches se fait à distance, en français. Voici le tronc commun, valable où que vous soyez, puis l'orientation propre à votre pays, car le vrai sujet n'est pas « comment créer au Portugal », c'est « que devient ma situation dans mon pays de résidence ».",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir les étapes à distance",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    stepsEyebrow: "Le tronc commun",
    stepsTitle: "Ce qui se fait à distance, sans vous déplacer",
    stepsBody:
      "Créer une société portugaise depuis l'étranger ne suppose pas, en règle générale, de venir sur place. Les étapes ci-dessous sont la colonne vertébrale du parcours, quel que soit votre pays. Les modalités exactes (notamment bancaires) dépendent de votre situation et de l'établissement choisi : nous les cadrons ensemble.",
    steps: [
      {
        term: "Obtenir le NIF",
        value:
          "Le NIF (numéro fiscal portugais du particulier) est le préalable à tout. Un non-résident l'obtient via un représentant fiscal au Portugal, sans déplacement. À ne pas confondre avec le NIPC, le numéro fiscal de la future société, attribué à l'immatriculation.",
      },
      {
        term: "Donner procuration",
        value:
          "Une procuration permet de faire réaliser les formalités d'immatriculation en votre nom, à distance. Selon les cas, une signature électronique qualifiée ou une légalisation auprès d'un notaire / consulat suffit, sans voyage.",
      },
      {
        term: "Cadrer le projet en visio",
        value:
          "Le choix de la structure (ENI, Unipessoal Lda, Lda), de l'objet social et du capital se cadre lors d'un échange en visioconférence, en français. C'est là qu'on vérifie aussi la cohérence avec votre situation dans votre pays de résidence.",
      },
      {
        term: "Immatriculer la société",
        value:
          "L'immatriculation (statuts, RCBE des bénéficiaires effectifs, Certidão Permanente, inscription Segurança Social) est coordonnée pour vous. La comptabilité, une fois la société créée, est assurée par un Contabilista Certificado partenaire.",
      },
      {
        term: "Ouvrir le compte bancaire",
        value:
          "L'ouverture d'un compte professionnel portugais peut souvent s'amorcer à distance ; certaines banques demandent une vérification d'identité (visio ou, parfois, un passage). Nous vous orientons vers les interlocuteurs adaptés à un dossier de non-résident.",
      },
    ],

    countriesEyebrow: "Selon votre pays",
    countriesTitle: "D'où nous écrivez-vous ?",
    countriesBody:
      "Le parcours à distance est commun, mais le risque, lui, dépend de votre pays de résidence : c'est là, et non au Portugal, que se joue l'essentiel (rester imposable chez vous, société étrangère contrôlée, siège de direction effective, contrôle des changes pour le Maghreb). Chaque page pays traite ce point honnêtement.",
    countries: [
      {
        country: "France",
        tag: "Cas le plus fréquent",
        desc: "Le vrai risque n'est pas portugais mais français : direction effective, établissement stable, sociétés étrangères contrôlées. Notre guide de fond évite le redressement.",
        href: REQUALIF_PATH,
        cta: "Société au Portugal depuis la France",
      },
      {
        country: "Belgique",
        tag: "UE · taxe Caïman",
        desc: "Convention belgo-portugaise, « taxe Caïman » et résidence fiscale belge : ce qui change si vous restez résident belge.",
        href: "/depuis/belgique",
        cta: "Depuis la Belgique",
      },
      {
        country: "Suisse",
        tag: "AELE · direction effective",
        desc: "Le risque suisse n'est pas la CFC mais le siège de direction effective : une société portugaise pilotée depuis la Suisse peut y être assujettie.",
        href: "/depuis/suisse",
        cta: "Depuis la Suisse",
      },
      {
        country: "Luxembourg",
        tag: "UE · CFC ATAD",
        desc: "Convention, règles CFC ATAD et siège de direction effective : ce qu'un résident luxembourgeois doit anticiper.",
        href: "/depuis/luxembourg",
        cta: "Depuis le Luxembourg",
      },
      {
        country: "Maghreb",
        tag: "Maroc · Tunisie · Algérie",
        desc: "Vous écrivez depuis le Maroc, la Tunisie ou l'Algérie ? Le sujet central est différent : visa, contrôle des changes, transfert de devises. On commence par le Maroc, qui maille vers la Tunisie et l'Algérie.",
        href: "/depuis/maroc",
        cta: "Depuis le Maghreb",
      },
    ],

    relatedEyebrow: "Pour aller plus loin",
    relatedTitle: "Les pages utiles avant de vous lancer",
    related: [
      {
        label: "Créer sa société au Portugal",
        href: CREATION_PATH,
        desc: "Le déroulé concret : ENI, Unipessoal Lda, Lda, NIF/NIPC, capital, banque et accompagnement.",
      },
      {
        label: "IFICI 2026 : le régime ciblé",
        href: IFICI_PATH,
        desc: "Qui peut prétendre à l'IFICI (ex-RNH), et qui en est exclu. Sans survente.",
      },
      {
        label: "Où créer ? Portugal vs France, Espagne, Dubaï",
        href: COMPARATIF_PATH,
        desc: "Le comparatif honnête : le bon critère n'est pas le taux, c'est où vous vivez et dirigez.",
      },
      {
        label: "Nos outils gratuits",
        href: OUTILS_PATH,
        desc: "Test d'éligibilité IFICI et simulateur de coût d'un salarié : des repères chiffrés, sans engagement.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Créer à distance : ce qu'on me demande",
    faq: [
      {
        q: "Peut-on vraiment créer une société au Portugal à distance, depuis l'étranger ?",
        a: "Oui, dans la très grande majorité des cas, sans vous déplacer. L'obtention du NIF, la procuration, le cadrage en visio et l'immatriculation se font à distance, en français. Seule l'ouverture du compte bancaire peut, selon la banque, demander une vérification d'identité (souvent en visio). Nous coordonnons l'ensemble depuis le Portugal.",
      },
      {
        q: "Faut-il un représentant fiscal pour obtenir le NIF ?",
        a: "Pour un non-résident d'un pays hors UE, un représentant fiscal au Portugal est en principe requis pour obtenir le NIF. Pour un résident de l'UE, les modalités sont plus souples mais un accompagnement local reste utile pour aller vite et éviter les erreurs. Nous organisons cette étape pour vous.",
      },
      {
        q: "Peut-on ouvrir le compte bancaire portugais sans venir au Portugal ?",
        a: "Souvent, l'ouverture peut s'amorcer à distance, mais cela dépend de l'établissement et de votre profil : certaines banques acceptent une vérification d'identité en visioconférence, d'autres demandent un passage. Pour un dossier de non-résident, le choix de la bonne banque change tout : c'est précisément ce sur quoi nous vous orientons.",
      },
      {
        q: "Le service et l'accompagnement sont-ils en français ?",
        a: "Oui. L'accompagnement est délivré en français de bout en bout (et en anglais si besoin). La terminologie reste portugaise (NIF, NIPC, Unipessoal Lda, IRC, IVA) car c'est elle qui fait foi dans les démarches.",
      },
      {
        q: "Si je crée au Portugal mais que je reste vivre dans mon pays, suis-je en règle ?",
        a: "C'est la vraie question, et elle ne se règle pas au Portugal mais dans votre pays de résidence. Piloter une société portugaise depuis chez vous peut exposer à une requalification (siège de direction effective, établissement stable) ou à des règles de type société étrangère contrôlée, selon votre pays. Nous cadrons ce point honnêtement et vous mettons en relation avec un fiscaliste si votre cas le demande. Mieux vaut le poser avant de créer qu'après un contrôle.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Les modalités à distance (NIF, représentant fiscal, ouverture bancaire) dépendent de votre pays de résidence, de votre profil et des établissements concernés, et peuvent évoluer. La question de votre imposition dans votre pays relève de règles complexes appréciées au cas par cas. Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : pour toute décision, faites valider votre situation par un professionnel compétent. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis là où vous êtes",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création à distance et, surtout, votre situation dans votre pays de résidence. Si un fiscaliste est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Créer depuis l'étranger",
  },
  en: {
    metaTitle: "Setting up a Portuguese company from abroad: the remote guide",
    metaDesc:
      "Living in France, Belgium, Switzerland, Luxembourg or the Maghreb? Set up your company in Portugal remotely: NIF via a tax representative, power of attorney, electronic signature, banking support. Service in French, from where you are.",
    eyebrow: "Remotely · From abroad",
    title: "Set up your company in Portugal",
    titleAccent: "from abroad, remotely",
    lead: "Most of the entrepreneurs we support do not (yet) live in Portugal: they write to us from France, Belgium, Switzerland, Luxembourg or the Maghreb. The good news is that most of the process can be done remotely, in French. Here is the common backbone, valid wherever you are, then the orientation specific to your country, because the real issue is not « how to set up in Portugal », it is « what happens to my situation in my country of residence ».",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the remote steps",
    trust: "75+ entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    stepsEyebrow: "The common backbone",
    stepsTitle: "What can be done remotely, without travelling",
    stepsBody:
      "Setting up a Portuguese company from abroad does not, as a rule, require coming on site. The steps below are the backbone of the process, whatever your country. The exact terms (banking in particular) depend on your situation and the chosen institution: we frame them together.",
    steps: [
      {
        term: "Obtain the NIF",
        value:
          "The NIF (individual Portuguese tax number) is the prerequisite for everything. A non-resident obtains it through a tax representative in Portugal, without travelling. Not to be confused with the NIPC, the future company's tax number, assigned at incorporation.",
      },
      {
        term: "Grant a power of attorney",
        value:
          "A power of attorney allows the registration formalities to be carried out in your name, remotely. Depending on the case, a qualified electronic signature or a legalisation before a notary / consulate is enough, with no trip required.",
      },
      {
        term: "Frame the project by video call",
        value:
          "The choice of structure (ENI, Unipessoal Lda, Lda), business object and capital is framed during a video call, in French. This is also where we check consistency with your situation in your country of residence.",
      },
      {
        term: "Incorporate the company",
        value:
          "Incorporation (articles, RCBE beneficial-owner declaration, Certidão Permanente, Segurança Social registration) is coordinated for you. Accounting, once the company is created, is handled by a partner Contabilista Certificado.",
      },
      {
        term: "Open the bank account",
        value:
          "Opening a Portuguese business account can often be started remotely; some banks require identity verification (by video or, sometimes, an in-person visit). We point you towards the right contacts for a non-resident file.",
      },
    ],

    countriesEyebrow: "Depending on your country",
    countriesTitle: "Where are you writing from?",
    countriesBody:
      "The remote process is common, but the risk depends on your country of residence: that is where the essentials play out, not in Portugal (remaining taxable at home, controlled foreign company, place of effective management, exchange controls for the Maghreb). Each country page addresses this honestly.",
    countries: [
      {
        country: "France",
        tag: "Most frequent case",
        desc: "The real risk is not Portuguese but French: place of effective management, permanent establishment, controlled foreign companies. Our in-depth guide avoids reassessment.",
        href: REQUALIF_PATH,
        cta: "Portuguese company from France",
      },
      {
        country: "Belgium",
        tag: "EU · Cayman tax",
        desc: "The Belgium-Portugal treaty, the « Cayman tax » and Belgian tax residence: what changes if you remain a Belgian resident.",
        href: "/depuis/belgique",
        cta: "From Belgium",
      },
      {
        country: "Switzerland",
        tag: "EFTA · effective management",
        desc: "The Swiss risk is not CFC but place of effective management: a Portuguese company run from Switzerland may become taxable there.",
        href: "/depuis/suisse",
        cta: "From Switzerland",
      },
      {
        country: "Luxembourg",
        tag: "EU · CFC ATAD",
        desc: "Treaty, CFC ATAD rules and place of effective management: what a Luxembourg resident must anticipate.",
        href: "/depuis/luxembourg",
        cta: "From Luxembourg",
      },
      {
        country: "Maghreb",
        tag: "Morocco · Tunisia · Algeria",
        desc: "Writing from Morocco, Tunisia or Algeria? The core issue is different: visa, exchange controls, currency transfer. We start with Morocco, which links to Tunisia and Algeria.",
        href: "/depuis/maroc",
        cta: "From the Maghreb",
      },
    ],

    relatedEyebrow: "To go further",
    relatedTitle: "Useful pages before you start",
    related: [
      {
        label: "Set up your company in Portugal",
        href: CREATION_PATH,
        desc: "The concrete process: ENI, Unipessoal Lda, Lda, NIF/NIPC, capital, banking and support.",
      },
      {
        label: "IFICI 2026: the targeted regime",
        href: IFICI_PATH,
        desc: "Who can claim IFICI (formerly NHR), and who is excluded. Without overselling.",
      },
      {
        label: "Where to set up? Portugal vs France, Spain, Dubai",
        href: COMPARATIF_PATH,
        desc: "The honest comparison: the right criterion is not the rate, it is where you live and run the activity.",
      },
      {
        label: "Our free tools",
        href: OUTILS_PATH,
        desc: "IFICI eligibility test and employee-cost simulator: figures to work with, no commitment.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Setting up remotely: what people ask me",
    faq: [
      {
        q: "Can you really set up a company in Portugal remotely, from abroad?",
        a: "Yes, in the vast majority of cases, without travelling. Obtaining the NIF, the power of attorney, the video framing call and the incorporation are done remotely, in French. Only opening the bank account may, depending on the bank, require identity verification (often by video). We coordinate the whole thing from Portugal.",
      },
      {
        q: "Do you need a tax representative to obtain the NIF?",
        a: "For a non-resident from a non-EU country, a tax representative in Portugal is generally required to obtain the NIF. For an EU resident, the rules are more flexible, but local support still helps to move fast and avoid mistakes. We arrange this step for you.",
      },
      {
        q: "Can you open the Portuguese bank account without coming to Portugal?",
        a: "Often, opening can be started remotely, but it depends on the institution and your profile: some banks accept identity verification by video call, others require a visit. For a non-resident file, choosing the right bank changes everything: that is precisely what we guide you on.",
      },
      {
        q: "Are the service and support in French?",
        a: "Yes. Support is delivered in French from end to end (and in English if needed). The terminology stays Portuguese (NIF, NIPC, Unipessoal Lda, IRC, IVA) because that is what counts in the procedures.",
      },
      {
        q: "If I set up in Portugal but keep living in my country, am I compliant?",
        a: "That is the real question, and it is settled not in Portugal but in your country of residence. Running a Portuguese company from home may expose you to reclassification (place of effective management, permanent establishment) or to controlled-foreign-company rules, depending on your country. We frame this honestly and connect you with a tax adviser if your case requires it. Better to settle it before setting up than after an audit.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting or tax advice. The remote terms (NIF, tax representative, bank-account opening) depend on your country of residence, your profile and the institutions involved, and may change. The question of your taxation in your country depends on complex rules assessed case by case. Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: for any decision, have your situation validated by a competent professional. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from where you are",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your remote incorporation and, above all, your situation in your country of residence. If a tax adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbCurrent: "Setting up from abroad",
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
      ...ogLocaleFor(locale),
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function DepuisLetrangerHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const canonical = urlFor(locale, PATH);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.metaTitle,
    description: c.metaDesc,
    serviceType: "Création de société au Portugal à distance",
    inLanguage: locale,
    provider: { "@id": BUSINESS_ID },
    url: canonical,
    areaServed: ["France", "Belgique", "Suisse", "Luxembourg", "Maroc", "Tunisie", "Algérie"].map(
      (name) => ({ "@type": "Country", name }),
    ),
    audience: {
      "@type": "Audience",
      audienceType: "Entrepreneurs et indépendants francophones à l'étranger",
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
      { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: canonical },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.metaTitle,
    description: c.metaDesc,
    inLanguage: locale,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
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
                  href="#etapes"
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
                <p className="eyebrow">{c.stepsEyebrow}</p>
                <ol className="mt-6 divide-y divide-border">
                  {c.steps.map((s, i) => (
                    <li key={s.term} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem] leading-relaxed">{s.term}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Étapes à distance (tronc commun) */}
      <section id="etapes" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.stepsEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.stepsTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.stepsBody}</p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.steps.map((s, i) => (
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

      {/* Orientation par pays */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{c.countriesEyebrow}</p>
            <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-[1.1] sm:text-4xl">
              {c.countriesTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {c.countriesBody}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.countries.map((card, i) => (
              <Reveal key={card.country} delay={i * 60}>
                <Link href={card.href} className="group flex h-full flex-col bg-card p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl">{card.country}</h3>
                    <span className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {card.tag}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{card.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                    {card.cta}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pour aller plus loin (maillage) */}
      <section className="border-t border-border bg-card">
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

      {/* Disclaimer YMYL */}
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
