import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/profils/saas";
const CREATION_PATH = "/creation-societe";
const IFICI_TOOL_PATH = "/outils/test-eligibilite-ifici";
const FISCALITE_PATH = "/services/fiscalite";
const FAQ_PATH = "/faq";

type Props = { params: Promise<{ locale: string }> };

type VatRow = { scenario: string; rule: string; invoicing: string };
type Point = { term: string; value: string };
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

  reframeEyebrow: string;
  reframeTitle: string;
  reframeBody: string;
  reframePoints: string[];

  vatEyebrow: string;
  vatTitle: string;
  vatSubtitle: string;
  vatColScenario: string;
  vatColRule: string;
  vatColInvoicing: string;
  vatRows: VatRow[];
  vatNote: string;

  ircEyebrow: string;
  ircTitle: string;
  ircSubtitle: string;
  ircPoints: Point[];
  ircLinkLabel: string;

  ificiEyebrow: string;
  ificiTitle: string;
  ificiBody: string;
  ificiHonesty: string;
  ificiToolLabel: string;

  motEyebrow: string;
  motTitle: string;
  motBody: string;

  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];
  faqLinkLabel: string;

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
    metaTitle: "Éditeurs SaaS & fondateurs tech au Portugal : domicilier votre société logicielle",
    metaDesc:
      "SaaS, dev, fondateurs tech : créer et domicilier votre société logicielle au Portugal. TVA des services électroniques (reverse charge B2B, OSS B2C), IRC PME 19/15 %, IFICI fondateur. Repères 2026 honnêtes + diagnostic gratuit.",
    eyebrow: "Profil · Éditeurs SaaS & tech",
    title: "Éditeurs SaaS & fondateurs tech :",
    titleAccent: "domicilier votre société logicielle au Portugal",
    lead: "Vous éditez un SaaS, vendez des licences ou facturez du développement à des clients dans toute l'Europe ? Le Portugal offre un cadre clair pour une société logicielle : structure souple, IRC PME compétitif, et un régime d'incitation souvent pertinent pour les profils tech. Je suis consultante en création et implantation, je monte votre société, je vous accompagne à la banque, et je vous mets en relation avec un Contabilista Certificado et un fiscaliste partenaires pour le déclaratif TVA et l'IRC.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir la TVA des services électroniques",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    reframeEyebrow: "Ce que je fais, et ce que je ne fais pas",
    reframeTitle: "Je crée la société, j'oriente pour le reste",
    reframeBody:
      "Un éditeur SaaS a trois sujets sensibles : la structure, la TVA transfrontalière et la fiscalité du fondateur. Je traite la partie création et coordination ; je ne suis ni fiscaliste, ni comptable. Le déclaratif TVA (OSS, reverse charge) et l'IRC relèvent du Contabilista Certificado inscrit à l'OCC et du fiscaliste partenaires, vers qui je vous mets en relation.",
    reframePoints: [
      "Je crée votre Unipessoal Lda ou Lda (capital 1 € par associé) et obtiens NIF puis NIPC",
      "Je vous accompagne à l'ouverture du compte bancaire professionnel",
      "Je vous mets en relation avec un Contabilista Certificado pour la TVA et la compta",
      "Je vous oriente vers un fiscaliste partenaire pour l'IRC, l'OSS et l'IFICI fondateur",
    ],

    vatEyebrow: "TVA des services électroniques",
    vatTitle: "Un SaaS est un service électronique",
    vatSubtitle:
      "Un SaaS, une licence en ligne ou un accès API sont des services fournis par voie électronique. La règle d'IVA dépend de qui est votre client et où il se trouve. Voici les grands cas, des repères, pas le traitement de votre cas, que le Contabilista Certificado partenaire établit.",
    vatColScenario: "Votre client",
    vatColRule: "Règle d'IVA / TVA",
    vatColInvoicing: "Facturation",
    vatRows: [
      {
        scenario: "Entreprise dans l'UE (B2B intra-UE)",
        rule: "Autoliquidation (reverse charge) : c'est le client professionnel qui déclare la TVA dans son pays.",
        invoicing:
          "Facture HT (sans IVA), mention « autoliquidation », NIF/numéro de TVA intracommunautaire du client validé (VIES).",
      },
      {
        scenario: "Particulier dans l'UE (B2C intra-UE)",
        rule: "TVA du pays de consommation. Le guichet OSS centralise la déclaration au-delà de 10 000 € de ventes B2C intra-UE par an.",
        invoicing:
          "Facture avec le taux de TVA du pays du consommateur ; déclaration via l'OSS portugais.",
      },
      {
        scenario: "Client (pro ou particulier) au Portugal",
        rule: "IVA portugaise au taux standard de 23 %.",
        invoicing: "Facture avec IVA à 23 % ; déclaration périodique habituelle.",
      },
      {
        scenario: "Client hors UE (pays tiers)",
        rule: "En principe hors champ de l'IVA portugaise pour un service électronique fourni à l'étranger ; règles locales possibles dans le pays du client.",
        invoicing: "Facture HT le plus souvent ; à confirmer selon le pays de destination.",
      },
    ],
    vatNote:
      "Le seuil de 10 000 € s'apprécie sur l'ensemble de vos ventes B2C intra-UE, pas pays par pays. En dessous, vous pouvez en principe appliquer l'IVA portugaise ; au-dessus, l'OSS devient la voie pratique. C'est exactement le type d'arbitrage que le Contabilista Certificado partenaire cale avec vous.",

    ircEyebrow: "IRC PME & structure",
    ircTitle: "Une structure adaptée à une société logicielle",
    ircSubtitle:
      "Pour un éditeur SaaS, la forme la plus courante est l'Unipessoal Lda (associé unique) ou la Lda à plusieurs cofondateurs. Le capital social est de 1 € par associé. Voici les repères d'imposition des bénéfices en 2026.",
    ircPoints: [
      {
        term: "Unipessoal Lda",
        value:
          "Société à responsabilité limitée à associé unique : la structure type du fondateur SaaS solo. Capital social de 1 €.",
      },
      {
        term: "Lda (plusieurs associés)",
        value:
          "Pour plusieurs cofondateurs : capital de 1 € par associé, répartition des parts au pacte. Permet d'accueillir des co-fondateurs ou des investisseurs.",
      },
      {
        term: "IRC, impôt sur les sociétés",
        value:
          "Taux général de 19 % en 2026, avec un taux réduit de 15 % pour les PME sur les premiers 50 000 € de bénéfice imposable. Au-delà, le taux général s'applique.",
      },
      {
        term: "Dividendes & rémunération",
        value:
          "L'arbitrage entre salaire de gérant et distribution de dividendes a un impact fiscal réel. C'est un point à chiffrer avec le fiscaliste partenaire, pas une règle unique.",
      },
    ],
    ircLinkLabel: "Voir le détail de la création de société",

    ificiEyebrow: "IFICI fondateur",
    ificiTitle: "Le régime d'incitation pour les profils tech",
    ificiBody:
      "L'IFICI (le régime qui a succédé au RNH) réserve un taux d'IRS de 20 % pendant 10 ans à des profils actifs et qualifiés. Les métiers tech, R&D et certaines fonctions de fondateur figurent parmi les activités visées (Anexo I). Un fondateur de société logicielle qui s'installe au Portugal est donc souvent un profil éligible, sous conditions.",
    ificiHonesty:
      "Souvent éligible ne veut pas dire automatiquement éligible. Les conditions incluent notamment le fait de ne pas avoir été résident fiscal au Portugal au cours des 5 années précédentes, l'exercice d'une activité visée et un dépôt de demande dans les délais. Votre éligibilité réelle se vérifie au cas par cas avec un fiscaliste partenaire.",
    ificiToolLabel: "Faire le test d'éligibilité IFICI",

    motEyebrow: "Le bon mot",
    motTitle: "Le piège n'est pas la TVA, c'est l'oubli de l'OSS",
    motBody:
      "Beaucoup de fondateurs SaaS pensent « je facture HT, tout le monde est en reverse charge ». Vrai pour le B2B intra-UE, faux dès que vous vendez à des particuliers européens. Passé 10 000 € de ventes B2C intra-UE, vous devez la TVA du pays de chaque client, via l'OSS. Le sujet n'est pas de payer plus, c'est de paramétrer la facturation et l'OSS dès le départ, pour ne pas régulariser un an d'IVA sous stress.",

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce qu'on me demande sur le SaaS au Portugal",
    faq: [
      {
        q: "Mon SaaS facturé HT à des entreprises de l'UE : dois-je facturer la TVA ?",
        a: "Non, en règle générale. Une vente B2B intra-UE de service électronique relève de l'autoliquidation (reverse charge) : vous facturez HT et c'est le client professionnel qui déclare la TVA dans son pays. Vous devez valider son numéro de TVA intracommunautaire (VIES) et porter la mention « autoliquidation » sur la facture. Le Contabilista Certificado partenaire cale le paramétrage exact.",
      },
      {
        q: "Et si je vends mon SaaS à des particuliers en Europe (B2C) ?",
        a: "C'est la TVA du pays de consommation qui s'applique. Tant que vos ventes B2C intra-UE restent sous 10 000 € par an, vous pouvez en principe appliquer l'IVA portugaise ; au-delà, vous passez par le guichet OSS pour déclarer la TVA de chaque pays. Le seuil s'apprécie sur l'ensemble de vos ventes B2C intra-UE, pas pays par pays.",
      },
      {
        q: "Quelle structure pour un éditeur SaaS : Unipessoal Lda ou Lda ?",
        a: "Une Unipessoal Lda (associé unique) convient au fondateur solo ; une Lda permet d'accueillir plusieurs cofondateurs ou des investisseurs. Dans les deux cas le capital social est de 1 € par associé. Le choix dépend de votre tour de table et de vos projets : on en parle lors du diagnostic gratuit.",
      },
      {
        q: "Quel impôt sur les bénéfices pour ma société logicielle ?",
        a: "L'IRC (impôt sur les sociétés) est de 19 % en 2026, avec un taux réduit de 15 % pour les PME sur les premiers 50 000 € de bénéfice imposable. Le calcul exact, et l'arbitrage salaire/dividendes, relèvent du Contabilista Certificado et du fiscaliste partenaires.",
      },
      {
        q: "En tant que fondateur dev, suis-je éligible à l'IFICI ?",
        a: "Souvent, mais pas automatiquement. Les métiers tech et R&D figurent parmi les activités visées par l'IFICI (taux d'IRS de 20 % sur 10 ans), ce qui rend les fondateurs de sociétés logicielles fréquemment éligibles. Mais il faut notamment ne pas avoir été résident fiscal au Portugal lors des 5 dernières années et déposer la demande dans les délais. Faites le test d'éligibilité, puis vérifiez votre cas avec un fiscaliste partenaire.",
      },
    ],
    faqLinkLabel: "Voir toutes les questions fréquentes",

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Business Portugal n'est pas un cabinet de comptabilité ni de fiscalité : nous créons la société et orientons vers un Contabilista Certificado et un fiscaliste partenaires. Le traitement TVA d'un service électronique, les seuils OSS, l'IRC et l'éligibilité IFICI dépendent de votre situation précise. Les informations sont à jour en 2026 et susceptibles d'évoluer (notamment à chaque Orçamento do Estado). Pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Domicilions votre SaaS au Portugal",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer la structure de votre société logicielle, votre TVA transfrontalière et votre éligibilité IFICI. Je crée la société, je vous accompagne à la banque, et je vous mets en relation avec les bons partenaires.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Mise en relation · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbProfiles: "Profils",
    breadcrumbCurrent: "Éditeurs SaaS & tech",
    serviceName: "Création de société pour éditeurs SaaS et fondateurs tech au Portugal",
  },
  en: {
    metaTitle: "SaaS founders & tech editors in Portugal: base your software company",
    metaDesc:
      "SaaS, developers, tech founders: form and base your software company in Portugal. Electronic services VAT (B2B reverse charge, B2C OSS), SME IRC 19/15%, founder IFICI. Honest 2026 pointers plus a free assessment.",
    eyebrow: "Profile · SaaS & tech editors",
    title: "SaaS founders & tech editors:",
    titleAccent: "base your software company in Portugal",
    lead: "Editing a SaaS, selling licences or invoicing development to clients across Europe? Portugal offers a clear framework for a software company: a flexible structure, a competitive SME IRC, and an incentive regime often relevant to tech profiles. I am a consultant in company formation and setup, I form your company, support you at the bank, and connect you with a partner Contabilista Certificado and tax adviser for VAT reporting and IRC.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the electronic services VAT",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    reframeEyebrow: "What I do, and what I don't",
    reframeTitle: "I form the company, I guide for the rest",
    reframeBody:
      "A SaaS editor has three sensitive topics: the structure, cross-border VAT and the founder's taxation. I handle formation and coordination; I am neither a tax adviser nor an accountant. VAT reporting (OSS, reverse charge) and IRC fall to the partner Contabilista Certificado registered with the OCC and the partner tax adviser, to whom I introduce you.",
    reframePoints: [
      "I form your Unipessoal Lda or Lda (capital of €1 per partner) and obtain the NIF then the NIPC",
      "I support you in opening the business bank account",
      "I connect you with a Contabilista Certificado for VAT and accounting",
      "I direct you to a partner tax adviser for IRC, OSS and the founder's IFICI",
    ],

    vatEyebrow: "Electronic services VAT",
    vatTitle: "A SaaS is an electronic service",
    vatSubtitle:
      "A SaaS, an online licence or API access are electronically supplied services. The IVA rule depends on who your client is and where they are. Here are the main cases, pointers, not the treatment of your case, which the partner Contabilista Certificado establishes.",
    vatColScenario: "Your client",
    vatColRule: "IVA / VAT rule",
    vatColInvoicing: "Invoicing",
    vatRows: [
      {
        scenario: "Business in the EU (B2B intra-EU)",
        rule: "Reverse charge: the business client declares the VAT in their own country.",
        invoicing:
          "Invoice without IVA, marked “reverse charge”, with the client's intra-EU VAT/NIF number validated (VIES).",
      },
      {
        scenario: "Consumer in the EU (B2C intra-EU)",
        rule: "VAT of the country of consumption. The OSS scheme centralises reporting above €10,000 of intra-EU B2C sales per year.",
        invoicing: "Invoice with the consumer's country VAT rate; declared via the Portuguese OSS.",
      },
      {
        scenario: "Client (business or consumer) in Portugal",
        rule: "Portuguese IVA at the standard 23% rate.",
        invoicing: "Invoice with 23% IVA; usual periodic reporting.",
      },
      {
        scenario: "Client outside the EU (third country)",
        rule: "In principle outside the scope of Portuguese IVA for an electronic service supplied abroad; local rules may apply in the client's country.",
        invoicing: "Usually invoiced without VAT; to be confirmed per destination country.",
      },
    ],
    vatNote:
      "The €10,000 threshold is assessed across all your intra-EU B2C sales, not country by country. Below it, you can in principle apply Portuguese IVA; above it, the OSS becomes the practical route. This is exactly the kind of trade-off the partner Contabilista Certificado sets up with you.",

    ircEyebrow: "SME IRC & structure",
    ircTitle: "A structure suited to a software company",
    ircSubtitle:
      "For a SaaS editor, the most common form is the Unipessoal Lda (single partner) or the Lda with several co-founders. The share capital is €1 per partner. Here are the 2026 pointers on taxation of profits.",
    ircPoints: [
      {
        term: "Unipessoal Lda",
        value:
          "Single-member limited liability company: the typical structure for a solo SaaS founder. Share capital of €1.",
      },
      {
        term: "Lda (several partners)",
        value:
          "For several co-founders: capital of €1 per partner, share split set in the agreement. Allows for co-founders or investors.",
      },
      {
        term: "IRC, corporate income tax",
        value:
          "General rate of 19% in 2026, with a reduced 15% rate for SMEs on the first €50,000 of taxable profit. Above that, the general rate applies.",
      },
      {
        term: "Dividends & remuneration",
        value:
          "The trade-off between a manager's salary and dividend distribution has a real tax impact. It is a point to quantify with the partner tax adviser, not a single rule.",
      },
    ],
    ircLinkLabel: "See the company formation detail",

    ificiEyebrow: "Founder IFICI",
    ificiTitle: "The incentive regime for tech profiles",
    ificiBody:
      "The IFICI (the regime that succeeded the NHR) reserves a 20% IRS rate for 10 years to active, qualified profiles. Tech and R&D occupations and certain founder roles are among the targeted activities (Anexo I). A software-company founder relocating to Portugal is therefore often an eligible profile, subject to conditions.",
    ificiHonesty:
      "Often eligible does not mean automatically eligible. The conditions notably include not having been a Portuguese tax resident in the previous 5 years, carrying out a targeted activity, and filing the application on time. Your actual eligibility is checked case by case with a partner tax adviser.",
    ificiToolLabel: "Take the IFICI eligibility test",

    motEyebrow: "The right word",
    motTitle: "The trap isn't VAT, it's forgetting the OSS",
    motBody:
      "Many SaaS founders think “I invoice without VAT, everyone is reverse charge”. True for intra-EU B2B, false the moment you sell to European consumers. Past €10,000 of intra-EU B2C sales, you owe the VAT of each client's country, via the OSS. The point is not to pay more, it is to set up invoicing and the OSS from the start, to avoid regularising a year of IVA under stress.",

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What people ask me about SaaS in Portugal",
    faq: [
      {
        q: "My SaaS invoiced without VAT to EU businesses: do I have to charge VAT?",
        a: "No, as a general rule. An intra-EU B2B sale of an electronic service is subject to reverse charge: you invoice without VAT and the business client declares the VAT in their own country. You must validate their intra-EU VAT number (VIES) and mark the invoice “reverse charge”. The partner Contabilista Certificado sets up the exact configuration.",
      },
      {
        q: "What if I sell my SaaS to consumers in Europe (B2C)?",
        a: "The VAT of the country of consumption applies. As long as your intra-EU B2C sales stay below €10,000 per year, you can in principle apply Portuguese IVA; above that you use the OSS scheme to declare each country's VAT. The threshold is assessed across all your intra-EU B2C sales, not country by country.",
      },
      {
        q: "Which structure for a SaaS editor: Unipessoal Lda or Lda?",
        a: "A Unipessoal Lda (single partner) suits the solo founder; an Lda allows several co-founders or investors. In both cases the share capital is €1 per partner. The choice depends on your cap table and your plans: we discuss it during the free assessment.",
      },
      {
        q: "What tax on profits for my software company?",
        a: "IRC (corporate income tax) is 19% in 2026, with a reduced 15% rate for SMEs on the first €50,000 of taxable profit. The exact calculation, and the salary/dividend trade-off, fall to the partner Contabilista Certificado and tax adviser.",
      },
      {
        q: "As a developer-founder, am I eligible for the IFICI?",
        a: "Often, but not automatically. Tech and R&D occupations are among the activities targeted by the IFICI (20% IRS rate over 10 years), which makes software-company founders frequently eligible. But you notably must not have been a Portuguese tax resident in the previous 5 years and must file on time. Take the eligibility test, then check your case with a partner tax adviser.",
      },
    ],
    faqLinkLabel: "See all the frequently asked questions",

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Business Portugal is neither an accounting nor a tax practice: we form the company and make introductions to a partner Contabilista Certificado and tax adviser. The VAT treatment of an electronic service, the OSS thresholds, IRC and IFICI eligibility depend on your specific situation. The information is current as of 2026 and subject to change (notably with each Orçamento do Estado). For an analysis of your project, book a meeting.",

    ctaTitle: "Let's base your SaaS in Portugal",
    ctaBody:
      "A first free conversation, with no commitment, to frame your software company's structure, your cross-border VAT and your IFICI eligibility. I form the company, support you at the bank, and connect you with the right partners.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Introduction · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbProfiles: "Profiles",
    breadcrumbCurrent: "SaaS & tech editors",
    serviceName: "Company formation for SaaS editors and tech founders in Portugal",
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

export default async function ProfilSaasPage({ params }: Props) {
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
    audience: { "@type": "Audience", audienceType: c.breadcrumbCurrent },
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
        name: c.breadcrumbProfiles,
        item: `${SITE_URL}/${locale}/profils`,
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
              <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
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
                  href="#tva"
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
                <p className="eyebrow">{c.reframeEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.reframePoints.map((it, i) => (
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

      {/* Cadre : ce que je fais / ne fais pas */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.reframeEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.reframeTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.reframeBody}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TVA des services électroniques */}
      <section id="tva" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.vatEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.vatTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.vatSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="grid gap-px border border-border bg-border">
                  <div className="hidden bg-card sm:grid sm:grid-cols-[0.9fr_1.3fr_1.3fr]">
                    <span className="px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {c.vatColScenario}
                    </span>
                    <span className="px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {c.vatColRule}
                    </span>
                    <span className="px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {c.vatColInvoicing}
                    </span>
                  </div>
                  {c.vatRows.map((row) => (
                    <div
                      key={row.scenario}
                      className="grid gap-3 bg-card p-5 sm:grid-cols-[0.9fr_1.3fr_1.3fr] sm:gap-0 sm:p-0"
                    >
                      <div className="sm:px-5 sm:py-4">
                        <span className="font-serif text-base leading-snug">{row.scenario}</span>
                      </div>
                      <p className="leading-relaxed text-muted-foreground sm:px-5 sm:py-4">
                        {row.rule}
                      </p>
                      <p className="leading-relaxed text-muted-foreground sm:px-5 sm:py-4">
                        {row.invoicing}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.vatNote}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* IRC PME & structure */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.ircEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.ircTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.ircSubtitle}
                </p>
                <Reveal delay={80}>
                  <Link
                    href={CREATION_PATH}
                    className="mt-7 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {c.ircLinkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Reveal>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.ircPoints.map((p, i) => (
                  <Reveal key={p.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{p.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{p.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* IFICI fondateur */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.ificiEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.ificiTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.ificiBody}</p>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 border-l-2 border-accent pl-5 text-base italic leading-relaxed text-muted-foreground">
                  {c.ificiHonesty}
                </p>
              </Reveal>
              <Reveal delay={160}>
                <Link
                  href={IFICI_TOOL_PATH}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group mt-8")}
                >
                  {c.ificiToolLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Encadré « Le bon mot » */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <div className="border border-border bg-background">
              <div className="rule-brass" />
              <div className="p-8 lg:p-12">
                <p className="eyebrow">{c.motEyebrow}</p>
                <h2 className="mt-5 font-serif text-2xl leading-[1.15] sm:text-3xl">
                  {c.motTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.motBody}</p>
              </div>
            </div>
          </Reveal>
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
                <Reveal delay={80}>
                  <Link
                    href={FAQ_PATH}
                    className="mt-7 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                  >
                    {c.faqLinkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Reveal>
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
            <p className="mt-6">
              <Link
                href={FISCALITE_PATH}
                className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
              >
                {locale === "en" ? "Taxation introductions" : "Mise en relation fiscalité"}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
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
