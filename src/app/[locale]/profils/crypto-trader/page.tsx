import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/profils/crypto-trader";
const CREATION_PATH = "/creation-societe";
const COMPTA_PATH = "/services/comptabilite";
const IFICI_TEST_PATH = "/outils/test-eligibilite-ifici";
const FAQ_PATH = "/faq";

type Props = { params: Promise<{ locale: string }> };

type Case = {
  scenario: string;
  treatment: string;
  declaration: string;
};
type Pillar = { title: string; description: string };
type Choice = { title: string; description: string; points: string[] };
type WordItem = { wrong: string; right: string; note: string };
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

  heroAsideEyebrow: string;
  heroAsidePoints: string[];

  pivotEyebrow: string;
  pivotTitle: string;
  pivotBody: string;
  pivotPrivate: Pillar;
  pivotPro: Pillar;

  casesEyebrow: string;
  casesTitle: string;
  casesSubtitle: string;
  casesColScenario: string;
  casesColTreatment: string;
  casesColDeclaration: string;
  cases: Case[];

  dacEyebrow: string;
  dacTitle: string;
  dacSubtitle: string;
  dacPoints: string[];

  choiceEyebrow: string;
  choiceTitle: string;
  choiceSubtitle: string;
  choiceEni: Choice;
  choiceCompany: Choice;
  choiceCreationLabel: string;
  choiceComptaLabel: string;

  wordEyebrow: string;
  wordTitle: string;
  wordSubtitle: string;
  words: WordItem[];
  wordColWrong: string;
  wordColRight: string;

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
  breadcrumbProfiles: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Trader & investisseur crypto au Portugal : votre structure (fiscalité 2026)",
    metaDesc:
      "Investisseur particulier ou trader professionnel ? Au Portugal en 2026 : exonération des plus-values crypto détenues ≥ 365 jours, 28 % en dessous, crypto↔crypto non imposable, DAC8. On clarifie votre cas et on structure ENI ou société.",
    eyebrow: "Profils accompagnés · Crypto",
    title: "Trader & investisseur crypto :",
    titleAccent: "votre structure au Portugal",
    lead: "Le Portugal reste l'une des juridictions les plus lisibles d'Europe pour la crypto, mais tout dépend d'une distinction que peu de contenus francophones expliquent : êtes-vous un investisseur particulier ou un trader professionnel ? La réponse change tout : exonération ou imposition, déclaration personnelle ou société. Je clarifie votre situation, je vous explique les chiffres 2026 en terminologie portugaise exacte, puis je vous mets en relation avec un Contabilista Certificado partenaire pour la partie réglementée.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Particulier ou professionnel ?",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    heroAsideEyebrow: "Les chiffres 2026, sans détour",
    heroAsidePoints: [
      "Détention ≥ 365 jours, revente contre € : plus-value exonérée (0 %)",
      "Détention < 365 jours : 28 %, taux libératoire, catégorie G",
      "Échange crypto↔crypto : non imposable, pas de fait générateur",
      "Staking / lending / DeFi : 28 %, catégorie E, quel que soit le délai",
    ],

    pivotEyebrow: "Le cœur du sujet",
    pivotTitle: "Investisseur particulier ou trader professionnel ?",
    pivotBody:
      "C'est la question qui détermine toute votre fiscalité crypto au Portugal. Le régime favorable des plus-values (exonération à partir de 365 jours de détention) s'adresse au particulier qui gère son propre patrimoine. Dès que l'activité devient habituelle, organisée et orientée vers le profit, day-trading constant, market-making, mining à grande échelle, l'Autoridade Tributária (AT) peut la requalifier en activité commerciale. Le régime des plus-values ne s'applique alors plus : on bascule en catégorie B ou en société. Identifier honnêtement de quel côté vous êtes, c'est éviter une mauvaise surprise plus tard.",
    pivotPrivate: {
      title: "Investisseur particulier",
      description:
        "Vous gérez votre propre portefeuille, sans organisation de type entreprise. Vos gains relèvent des plus-values (catégorie G) : exonérés au-delà de 365 jours de détention et revente contre fiat, 28 % en dessous. Profil majoritaire des particuliers qui investissent en buy-and-hold.",
    },
    pivotPro: {
      title: "Trader professionnel",
      description:
        "Activité habituelle, structurée, orientée profit : day-trading quasi quotidien, market-making, mining à grande échelle. L'AT peut requalifier en activité commerciale (catégorie B) : régime simplifié avec un coefficient d'environ 0,15 appliqué au chiffre d'affaires, puis barème IRS progressif, ou exploitation via une société (IRC 19 %).",
    },

    casesEyebrow: "Le tableau des cas",
    casesTitle: "Ce que dit le régime du particulier en 2026",
    casesSubtitle:
      "Ces traitements visent l'investisseur particulier (catégorie G/E). Ils ne s'appliquent pas au trader professionnel requalifié en catégorie B. Ce sont des principes généraux, pas une analyse de votre situation : le chiffrage relève du Contabilista Certificado et, si besoin, d'un fiscaliste partenaire.",
    casesColScenario: "Opération",
    casesColTreatment: "Traitement 2026",
    casesColDeclaration: "Déclaration",
    cases: [
      {
        scenario: "Détention ≥ 365 jours, revente contre € (fiat)",
        treatment: "Plus-value exonérée, 0 %",
        declaration: "Anexo G1",
      },
      {
        scenario: "Détention < 365 jours, revente contre € (fiat)",
        treatment: "28 % (taux libératoire, catégorie G)",
        declaration: "Anexo G",
      },
      {
        scenario: "Échange crypto↔crypto (BTC→ETH, →USDT)",
        treatment:
          "Non imposable : pas de fait générateur. La période de détention reste cumulative à travers les échanges (méthode FIFO imposée par l'AT).",
        declaration: "Suivi du coût et des dates en FIFO",
      },
      {
        scenario: "Staking / lending / DeFi",
        treatment: "28 %, revenus de capital (catégorie E), quel que soit le délai de détention",
        declaration: "Anexo E",
      },
      {
        scenario: "Mining professionnel",
        treatment: "Activité (catégorie B), pas un revenu de capital",
        declaration: "Anexo B / déclaration d'activité",
      },
    ],

    dacEyebrow: "Transparence 2026",
    dacTitle: "DAC8 / CARF : l'optimisation se fait désormais en pleine lumière",
    dacSubtitle:
      "Le cadre européen de reporting automatique (DAC8, aligné sur le CARF de l'OCDE) entre en vigueur. À retenir, présenté prudemment :",
    dacPoints: [
      "À partir du 1ᵉʳ janvier 2026, les plateformes crypto (CASP, Crypto-Asset Service Providers) déclarent automatiquement les opérations de leurs utilisateurs.",
      "Le premier échange automatique d'informations entre administrations est attendu autour du 31 janvier 2027.",
      "Le Portugal accuse un retard de transposition de la directive, un point à suivre, et une raison de plus de tenir une comptabilité crypto rigoureuse dès maintenant.",
      "La résidence fiscale portugaise reste avantageuse pour le particulier, mais l'optimisation se fait désormais en pleine lumière : la traçabilité et une déclaration propre deviennent la norme, pas l'exception.",
    ],

    choiceEyebrow: "Structurer votre activité",
    choiceTitle: "En nom propre (ENI) ou en société ?",
    choiceSubtitle:
      "Si votre activité crypto bascule du côté professionnel, deux voies existent. Le bon choix dépend de votre volume, de vos charges, de votre besoin de réinvestir et de votre situation personnelle. C'est précisément ce qu'on cadre ensemble lors du premier échange, avant de chiffrer avec un partenaire.",
    choiceEni: {
      title: "En nom propre, ENI / Trabalhador Independente",
      description:
        "Empresário em Nome Individual : activité exercée par une personne physique, sans personnalité morale distincte. Simple à ouvrir, adapté pour démarrer ou pour des volumes modérés.",
      points: [
        "Régime simplifié possible : un coefficient d'environ 0,15 s'applique au chiffre d'affaires retenu",
        "Le résultat est ensuite soumis au barème IRS progressif",
        "Pas de capital social ; obligations comptables allégées selon le régime",
        "Le patrimoine personnel n'est pas séparé de l'activité",
      ],
    },
    choiceCompany: {
      title: "En société, Unipessoal Lda / Lda",
      description:
        "Société à responsabilité limitée (Sociedade por Quotas). Capital social de 1 € par associé. Pertinent pour un volume soutenu, du réinvestissement, ou pour séparer patrimoine personnel et activité.",
      points: [
        "Bénéfice imposé à l'IRC : 19 % en 2026 (15 % pour les PME sur les premiers 50 000 € de bénéfice imposable)",
        "Responsabilité limitée aux apports ; patrimoine personnel protégé",
        "Comptabilité organisée obligatoire, tenue par un Contabilista Certificado",
        "Dividendes et rémunération du gérant à arbitrer au cas par cas",
      ],
    },
    choiceCreationLabel: "Voir la création de société",
    choiceComptaLabel: "Voir la comptabilité",

    wordEyebrow: "Le bon mot",
    wordTitle: "Dire juste, pour rester crédible",
    wordSubtitle:
      "La crypto attire son lot d'approximations. Quelques termes à employer correctement, ce sont les notions portugaises exactes, pas leurs équivalents français.",
    words: [
      {
        wrong: "« Numéro fiscal » indifférencié",
        right: "NIF (particulier) vs NIPC (société)",
        note: "Le NIF identifie la personne physique ; le NIPC identifie la personne morale (la Lda). Deux numéros, deux périmètres.",
      },
      {
        wrong: "« Expert-comptable »",
        right: "Contabilista Certificado",
        note: "Au Portugal, la comptabilité réglementée est tenue par un Contabilista Certificado inscrit à l'OCC. Le terme « expert-comptable » n'est pas l'équivalent portugais.",
      },
      {
        wrong: "« Auto-entrepreneur / micro-entreprise »",
        right: "ENI, Empresário em Nome Individual",
        note: "L'activité en nom propre au Portugal s'appelle ENI / Trabalhador Independente. Pas d'« auto-entrepreneur » : le régime et les seuils diffèrent.",
      },
    ],
    wordColWrong: "À éviter",
    wordColRight: "Le terme exact",

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce qu'on me demande sur la crypto",
    faq: [
      {
        q: "Les plus-values crypto sont-elles vraiment exonérées au Portugal ?",
        a: "Pour l'investisseur particulier, oui sous condition : une plus-value sur des crypto-actifs détenus au moins 365 jours et revendus contre une monnaie fiat (€) est exonérée d'impôt (0 %), à déclarer en Anexo G1. En dessous de 365 jours de détention, la plus-value est imposée à 28 % (taux libératoire, catégorie G, Anexo G). Cette exonération ne vise pas le trader professionnel.",
      },
      {
        q: "Échanger une crypto contre une autre, est-ce imposable ?",
        a: "Non. Un échange crypto↔crypto (par exemple BTC vers ETH ou vers USDT) n'est pas un fait générateur d'imposition pour le particulier : l'impôt se déclenche lors de la conversion en monnaie fiat. La période de détention reste cumulative à travers les échanges, et l'Autoridade Tributária impose la méthode FIFO (premier entré, premier sorti) pour le calcul.",
      },
      {
        q: "Comment sont imposés le staking, le lending et la DeFi ?",
        a: "Ces revenus sont traités comme des revenus de capital (catégorie E) et imposés à 28 %, quel que soit le délai de détention, ils ne bénéficient pas de l'exonération des plus-values à 365 jours. Le mining exercé de façon professionnelle relève, lui, de la catégorie B (activité). Le détail dépend de votre cas et relève d'un partenaire réglementé.",
      },
      {
        q: "Quand devient-on « trader professionnel » aux yeux de l'AT ?",
        a: "Il n'y a pas de seuil chiffré unique : l'Autoridade Tributária apprécie le caractère habituel, organisé et lucratif de l'activité. Day-trading quasi quotidien, market-making, mining à grande échelle pointent vers une activité commerciale, requalifiable en catégorie B (régime simplifié avec un coefficient d'environ 0,15, puis barème IRS progressif) ou en société (IRC 19 %). C'est une analyse au cas par cas qu'il faut sécuriser avec un fiscaliste partenaire.",
      },
      {
        q: "DAC8 change-t-il ma fiscalité crypto en 2026 ?",
        a: "DAC8 ne change pas les taux : c'est un cadre de reporting. À partir du 1ᵉʳ janvier 2026, les plateformes (CASP) déclarent automatiquement les opérations, avec un premier échange entre administrations attendu vers le 31 janvier 2027. Le Portugal est en retard de transposition. Concrètement, la résidence portugaise reste avantageuse pour le particulier, mais l'optimisation se fait désormais en pleine lumière : tenez une comptabilité crypto traçable dès maintenant.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Business Portugal n'est ni cabinet comptable ni cabinet de fiscalité : Audrey Marques est consultante en création et implantation d'entreprise, et oriente vers un Contabilista Certificado et des fiscalistes partenaires. La fiscalité des crypto-actifs est mouvante : les chiffres cités sont à jour en 2026 et susceptibles d'évoluer (Loi de Finances / Orçamento do Estado, transposition de DAC8). La distinction investisseur particulier / trader professionnel s'apprécie au cas par cas. Pour une analyse de votre situation, prenez rendez-vous.",

    ctaTitle: "Parlons de votre situation crypto",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour situer votre activité, investisseur ou professionnel, et déterminer la bonne structure (ENI ou société). On clarifie votre cas, on vous met en relation avec le bon partenaire réglementé, on avance ensemble.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Mise en relation · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbProfiles: "Profils",
    breadcrumbCurrent: "Trader crypto",
    serviceName: "Accompagnement crypto : structuration au Portugal pour traders et investisseurs",
  },
  en: {
    metaTitle: "Crypto trader & investor in Portugal: your setup (2026 tax guide)",
    metaDesc:
      "Private investor or professional trader? In Portugal in 2026: crypto gains exempt after ≥ 365 days, 28% below, crypto↔crypto not taxable, DAC8. We clarify your case and structure it as an ENI or a company.",
    eyebrow: "Profiles we support · Crypto",
    title: "Crypto trader & investor:",
    titleAccent: "your setup in Portugal",
    lead: "Portugal remains one of Europe's clearest jurisdictions for crypto, but everything hinges on a distinction few French-language resources explain: are you a private investor or a professional trader? The answer changes everything: exemption or taxation, personal return or company. I clarify your situation, explain the 2026 figures in accurate Portuguese terminology, then connect you with a partner Contabilista Certificado for the regulated part.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "Private or professional?",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    heroAsideEyebrow: "The 2026 figures, plainly",
    heroAsidePoints: [
      "Held ≥ 365 days, sold for € : capital gain exempt (0%)",
      "Held < 365 days : 28%, flat rate, category G",
      "Crypto↔crypto swap : not taxable, no taxable event",
      "Staking / lending / DeFi : 28%, category E, regardless of holding period",
    ],

    pivotEyebrow: "The heart of the matter",
    pivotTitle: "Private investor or professional trader?",
    pivotBody:
      "This is the question that determines your entire crypto taxation in Portugal. The favourable capital-gains regime (exemption from 365 days of holding) applies to the individual managing their own assets. As soon as the activity becomes habitual, organised and profit-driven, constant day-trading, market-making, large-scale mining, the Autoridade Tributária (AT) may reclassify it as a commercial activity. The capital-gains regime no longer applies: you move to category B or a company. Honestly identifying which side you are on is how you avoid a nasty surprise later.",
    pivotPrivate: {
      title: "Private investor",
      description:
        "You manage your own portfolio, with no business-like organisation. Your gains fall under capital gains (category G): exempt beyond 365 days of holding and sale for fiat, 28% below. The majority profile of individuals investing buy-and-hold.",
    },
    pivotPro: {
      title: "Professional trader",
      description:
        "A habitual, structured, profit-driven activity: near-daily day-trading, market-making, large-scale mining. The AT may reclassify it as a commercial activity (category B): a simplified regime applying a coefficient of around 0.15 to turnover, then the progressive IRS scale, or operating through a company (IRC 19%).",
    },

    casesEyebrow: "The case table",
    casesTitle: "What the private regime says in 2026",
    casesSubtitle:
      "These treatments concern the private investor (category G/E). They do not apply to a professional trader reclassified into category B. These are general principles, not an analysis of your situation: the figures fall to the Contabilista Certificado and, where needed, a partner tax adviser.",
    casesColScenario: "Operation",
    casesColTreatment: "2026 treatment",
    casesColDeclaration: "Declaration",
    cases: [
      {
        scenario: "Held ≥ 365 days, sold for € (fiat)",
        treatment: "Capital gain exempt, 0%",
        declaration: "Anexo G1",
      },
      {
        scenario: "Held < 365 days, sold for € (fiat)",
        treatment: "28% (flat rate, category G)",
        declaration: "Anexo G",
      },
      {
        scenario: "Crypto↔crypto swap (BTC→ETH, →USDT)",
        treatment:
          "Not taxable: no taxable event. The holding period remains cumulative across swaps (FIFO method imposed by the AT).",
        declaration: "FIFO tracking of cost and dates",
      },
      {
        scenario: "Staking / lending / DeFi",
        treatment: "28%, capital income (category E), regardless of holding period",
        declaration: "Anexo E",
      },
      {
        scenario: "Professional mining",
        treatment: "Activity (category B), not capital income",
        declaration: "Anexo B / activity registration",
      },
    ],

    dacEyebrow: "Transparency 2026",
    dacTitle: "DAC8 / CARF: optimisation now happens in plain sight",
    dacSubtitle:
      "The European automatic-reporting framework (DAC8, aligned with the OECD's CARF) comes into force. The key points, presented cautiously:",
    dacPoints: [
      "From 1 January 2026, crypto platforms (CASPs, Crypto-Asset Service Providers) automatically report their users' transactions.",
      "The first automatic exchange of information between tax administrations is expected around 31 January 2027.",
      "Portugal is behind on transposing the directive, a point to watch, and one more reason to keep rigorous crypto bookkeeping starting now.",
      "Portuguese tax residence remains advantageous for the private investor, but optimisation now happens in plain sight: traceability and a clean return become the norm, not the exception.",
    ],

    choiceEyebrow: "Structuring your activity",
    choiceTitle: "Sole trader (ENI) or a company?",
    choiceSubtitle:
      "If your crypto activity tips onto the professional side, two routes exist. The right choice depends on your volume, your costs, your need to reinvest and your personal situation. That is exactly what we frame together during the first conversation, before any figures are run with a partner.",
    choiceEni: {
      title: "Sole trader, ENI / Trabalhador Independente",
      description:
        "Empresário em Nome Individual: an activity carried out by a natural person, with no separate legal personality. Simple to open, suited to starting out or to moderate volumes.",
      points: [
        "Simplified regime possible: a coefficient of around 0.15 applies to the assessed turnover",
        "The result is then subject to the progressive IRS scale",
        "No share capital; lighter accounting obligations depending on the regime",
        "Personal assets are not separated from the activity",
      ],
    },
    choiceCompany: {
      title: "Company, Unipessoal Lda / Lda",
      description:
        "Limited-liability company (Sociedade por Quotas). Share capital of €1 per partner. Relevant for sustained volume, reinvestment, or to separate personal assets from the activity.",
      points: [
        "Profit taxed under IRC: 19% in 2026 (15% for SMEs on the first €50,000 of taxable profit)",
        "Liability limited to contributions; personal assets protected",
        "Organised accounting required, kept by a Contabilista Certificado",
        "Dividends and manager's remuneration to be weighed case by case",
      ],
    },
    choiceCreationLabel: "See company formation",
    choiceComptaLabel: "See accounting",

    wordEyebrow: "The right word",
    wordTitle: "Say it right, to stay credible",
    wordSubtitle:
      "Crypto attracts its share of loose talk. A few terms to use correctly, these are the exact Portuguese notions, not their French equivalents.",
    words: [
      {
        wrong: "An undifferentiated “tax number”",
        right: "NIF (individual) vs NIPC (company)",
        note: "The NIF identifies the natural person; the NIPC identifies the legal person (the Lda). Two numbers, two scopes.",
      },
      {
        wrong: "“Expert-comptable” (French chartered accountant)",
        right: "Contabilista Certificado",
        note: "In Portugal, regulated accounting is kept by a Contabilista Certificado registered with the OCC. The French term “expert-comptable” is not the Portuguese equivalent.",
      },
      {
        wrong: "“Auto-entrepreneur / micro-enterprise”",
        right: "ENI, Empresário em Nome Individual",
        note: "Sole-trader activity in Portugal is called ENI / Trabalhador Independente. No “auto-entrepreneur”: the regime and thresholds differ.",
      },
    ],
    wordColWrong: "Avoid",
    wordColRight: "The exact term",

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What people ask me about crypto",
    faq: [
      {
        q: "Are crypto capital gains really exempt in Portugal?",
        a: "For the private investor, yes, conditionally: a gain on crypto-assets held for at least 365 days and sold for fiat currency (€) is tax-exempt (0%), to be reported on Anexo G1. Below 365 days of holding, the gain is taxed at 28% (flat rate, category G, Anexo G). This exemption does not apply to the professional trader.",
      },
      {
        q: "Is swapping one crypto for another taxable?",
        a: "No. A crypto↔crypto swap (for example BTC to ETH or to USDT) is not a taxable event for the individual: tax is triggered on conversion to fiat currency. The holding period remains cumulative across swaps, and the Autoridade Tributária imposes the FIFO method (first in, first out) for the calculation.",
      },
      {
        q: "How are staking, lending and DeFi taxed?",
        a: "These are treated as capital income (category E) and taxed at 28%, regardless of holding period, they do not benefit from the 365-day capital-gains exemption. Mining carried out professionally falls under category B (activity). The detail depends on your case and falls to a regulated partner.",
      },
      {
        q: "When do you become a “professional trader” in the AT's eyes?",
        a: "There is no single numerical threshold: the Autoridade Tributária assesses how habitual, organised and profit-driven the activity is. Near-daily day-trading, market-making and large-scale mining point to a commercial activity, reclassifiable into category B (simplified regime with a coefficient of around 0.15, then the progressive IRS scale) or a company (IRC 19%). This is a case-by-case analysis to secure with a partner tax adviser.",
      },
      {
        q: "Does DAC8 change my crypto taxation in 2026?",
        a: "DAC8 does not change the rates: it is a reporting framework. From 1 January 2026, platforms (CASPs) automatically report transactions, with a first exchange between administrations expected around 31 January 2027. Portugal is behind on transposition. In practice, Portuguese residence remains advantageous for the individual, but optimisation now happens in plain sight: keep traceable crypto bookkeeping starting now.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Business Portugal is neither an accounting practice nor a tax practice: Audrey Marques is a consultant in company formation and setup, and makes introductions to a Contabilista Certificado and partner tax advisers. Crypto-asset taxation is fast-moving: the figures quoted are current as of 2026 and subject to change (Finance Act / Orçamento do Estado, DAC8 transposition). The private investor / professional trader distinction is assessed case by case. For an analysis of your situation, book a meeting.",

    ctaTitle: "Let's talk about your crypto situation",
    ctaBody:
      "A first free conversation, with no commitment, to place your activity, investor or professional, and determine the right structure (ENI or company). We clarify your case, connect you with the right regulated partner, and move forward together.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Introduction · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbProfiles: "Profiles",
    breadcrumbCurrent: "Crypto trader",
    serviceName: "Crypto support: structuring in Portugal for traders and investors",
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

export default async function CryptoTraderPage({ params }: Props) {
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
        item: urlFor(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbProfiles,
        item: urlFor(locale, "/profils"),
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
                  href="#particulier-professionnel"
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
                <p className="eyebrow">{c.heroAsideEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.heroAsidePoints.map((it, i) => (
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

      {/* Particulier vs trader professionnel, le cœur */}
      <section
        id="particulier-professionnel"
        className="scroll-mt-24 border-t border-border bg-card"
      >
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.pivotEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.pivotTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.pivotBody}</p>
              </Reveal>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {[c.pivotPrivate, c.pivotPro].map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="h-full bg-card p-8">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-serif text-xl">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tableau des cas */}
      <section id="cas" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.casesEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.casesTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.casesSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="hidden border-b border-border pb-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground sm:grid sm:grid-cols-[0.38fr_0.42fr_0.2fr] sm:gap-6">
                  <span>{c.casesColScenario}</span>
                  <span>{c.casesColTreatment}</span>
                  <span>{c.casesColDeclaration}</span>
                </div>
              </Reveal>
              <dl>
                {c.cases.map((row, i) => (
                  <Reveal key={row.scenario} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.38fr_0.42fr_0.2fr] sm:gap-6">
                      <dt className="font-serif text-lg">{row.scenario}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{row.treatment}</dd>
                      <dd className="font-sans text-xs uppercase tracking-[0.12em] text-accent">
                        {row.declaration}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* DAC8 / CARF */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.dacEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.dacTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.dacSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.dacPoints.map((point, i) => (
                <Reveal key={point} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-7">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-muted-foreground">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* En nom propre (ENI) ou en société ? */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.choiceEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.choiceTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.choiceSubtitle}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href={CREATION_PATH}
                    className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {c.choiceCreationLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                  <Link
                    href={COMPTA_PATH}
                    className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {c.choiceComptaLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {[c.choiceEni, c.choiceCompany].map((choice, i) => (
                <Reveal key={choice.title} delay={i * 60}>
                  <div className="flex h-full flex-col bg-card p-8">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-serif text-xl">{choice.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {choice.description}
                    </p>
                    <ul className="mt-5 space-y-3 border-t border-border pt-5">
                      {choice.points.map((pt) => (
                        <li key={pt} className="flex items-baseline gap-3">
                          <span
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                            aria-hidden
                          />
                          <span className="leading-relaxed text-muted-foreground">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Le bon mot, terminologie */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.wordEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.wordTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.wordSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="hidden border-b border-border pb-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground sm:grid sm:grid-cols-2 sm:gap-8">
                  <span>{c.wordColWrong}</span>
                  <span>{c.wordColRight}</span>
                </div>
              </Reveal>
              <dl>
                {c.words.map((w, i) => (
                  <Reveal key={w.right} delay={i * 60}>
                    <div className="border-b border-border py-6">
                      <div className="grid gap-2 sm:grid-cols-2 sm:gap-8">
                        <dt className="text-muted-foreground line-through decoration-border">
                          {w.wrong}
                        </dt>
                        <dd className="font-serif text-lg text-accent">{w.right}</dd>
                      </div>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{w.note}</p>
                    </div>
                  </Reveal>
                ))}
              </dl>
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
                <Link
                  href={FAQ_PATH}
                  className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                >
                  {locale === "en" ? "See the full FAQ" : "Voir toutes les questions"}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
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

      {/* Outil, test d'éligibilité IFICI */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-16 lg:py-20">
          <Reveal>
            <Link
              href={IFICI_TEST_PATH}
              className="group flex flex-col gap-4 border border-border bg-background p-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="eyebrow">{locale === "en" ? "Free tool" : "Outil gratuit"}</p>
                <p className="mt-3 font-serif text-xl">
                  {locale === "en"
                    ? "Could the IFICI regime apply to you?"
                    : "L'IFICI peut-il vous concerner ?"}
                </p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {locale === "en"
                    ? "A free 6-question test, with an honest answer on screen, no sign-up. Note: full-time crypto activity for 100% foreign clients is often not eligible."
                    : "Un test gratuit en 6 questions, avec une réponse honnête à l'écran, sans inscription. À noter : une activité crypto à temps plein pour des clients 100 % étrangers n'y est souvent pas éligible."}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] group-hover:underline">
                {locale === "en" ? "Take the test" : "Faire le test"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Disclaimer YMYL */}
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
