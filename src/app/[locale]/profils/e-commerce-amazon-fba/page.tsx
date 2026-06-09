import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/profils/e-commerce-amazon-fba";
const CREATION_PATH = "/creation-societe";
const COMPTA_PATH = "/services/comptabilite";
const FISCALITE_PATH = "/services/fiscalite";
const FAQ_PATH = "/faq";

type Props = { params: Promise<{ locale: string }> };

type RegimeRow = {
  scheme: string;
  scope: string;
  trigger: string;
};
type Reason = { title: string; description: string };
type LexItem = { term: string; value: string };
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

  pitfallEyebrow: string;
  pitfallTitle: string;
  pitfallBody: string;
  pitfallPoints: string[];

  regimeEyebrow: string;
  regimeTitle: string;
  regimeSubtitle: string;
  regimeHeadScheme: string;
  regimeHeadScope: string;
  regimeHeadTrigger: string;
  regimes: RegimeRow[];

  dropEyebrow: string;
  dropTitle: string;
  dropBody: string;
  dropPoints: string[];

  whyEyebrow: string;
  whyTitle: string;
  whySubtitle: string;
  reasons: Reason[];

  lexEyebrow: string;
  lexTitle: string;
  lexBody: string;
  lexicon: LexItem[];

  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];

  disclaimerLabel: string;
  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  relatedEyebrow: string;
  relatedTitle: string;
  relatedLinks: { label: string; href: string }[];

  breadcrumbHome: string;
  breadcrumbProfiles: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "E-commerce & Amazon FBA au Portugal : TVA OSS/IOSS et société Unipessoal Lda",
    metaDesc:
      "Lancer une activité e-commerce ou Amazon FBA depuis le Portugal : maîtriser la TVA transfrontalière (OSS, IOSS, seuil 10 000 €, stockage), comprendre le piège FBA et structurer en Unipessoal Lda. Premier échange gratuit.",
    eyebrow: "Profil · E-commerce & Amazon FBA",
    title: "E-commerce & Amazon FBA :",
    titleAccent: "lancer et piloter votre société depuis le Portugal",
    lead: "Vendre en ligne dans l'UE, ce n'est pas un seul taux de TVA : c'est une mécanique de seuils, de guichets et d'obligations qui se déclenchent selon où sont vos clients et, surtout, où dort votre stock. Je crée votre société portugaise, je vous accompagne pour l'ouverture bancaire, et je vous mets en relation avec un Contabilista Certificado partenaire qui pilote vos déclarations OSS/IOSS et votre IVA. L'objectif : une structure propre, IRC réduit PME, et zéro mauvaise surprise transfrontalière.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Comprendre le piège FBA",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    pitfallEyebrow: "Le point que personne ne vous explique",
    pitfallTitle: "Le piège Amazon FBA : la TVA dès le 1ᵉʳ euro",
    pitfallBody:
      "Avec Amazon FBA, vos marchandises sont stockées dans les entrepôts d'Amazon, et le stockage change tout. Dès lors que votre stock est physiquement présent dans un pays de l'UE, vous devez vous y immatriculer à la TVA locale dès le premier euro de vente, sans aucun seuil. Le guichet OSS, conçu pour les ventes à distance, ne couvre PAS le stockage : il ne vous dispense pas d'une immatriculation locale là où vos produits sont entreposés. Et avec Pan-EU FBA, Amazon répartit automatiquement vos stocks dans plusieurs pays, multipliant d'autant vos obligations d'immatriculation. C'est l'erreur la plus coûteuse des vendeurs francophones qui s'installent.",
    pitfallPoints: [
      "Le stockage dans un pays = immatriculation IVA locale dès le 1ᵉʳ euro, sans seuil",
      "L'OSS couvre les ventes à distance, PAS le stockage de marchandises",
      "Pan-EU FBA répartit vos stocks → obligations d'immatriculation multiples",
      "On cartographie d'abord où dort votre stock, avant de parler de chiffre d'affaires",
    ],

    regimeEyebrow: "Les régimes de TVA, sans jargon",
    regimeTitle: "OSS, IOSS, seuil 10 000 € et stockage",
    regimeSubtitle:
      "Quatre mécaniques distinctes que l'on confond souvent. Ce sont les principes 2026 en terminologie exacte : votre déclaratif réel est piloté par le Contabilista Certificado partenaire selon votre flux.",
    regimeHeadScheme: "Régime / seuil",
    regimeHeadScope: "Ce que ça couvre",
    regimeHeadTrigger: "Ce qui le déclenche",
    regimes: [
      {
        scheme: "Seuil unique UE, 10 000 €",
        scope:
          "Un seul seuil annuel pour le cumul de vos ventes B2C à distance intra-UE, tous pays confondus.",
        trigger:
          "En dessous : TVA de votre pays. Au-delà : TVA du pays de destination, pour chaque vente.",
      },
      {
        scheme: "OSS, guichet unique",
        scope:
          "Déclarer et payer en une seule fois la TVA due dans les autres pays de l'UE sur vos ventes à distance.",
        trigger:
          "Activé une fois le seuil de 10 000 € dépassé. Déclaration trimestrielle via un guichet unique.",
      },
      {
        scheme: "IOSS, imports ≤ 150 €",
        scope:
          "Régime simplifié pour la TVA sur les biens importés de pays tiers dont la valeur ne dépasse pas 150 €.",
        trigger:
          "Depuis juillet 2021, plus aucune exonération de TVA sur les petits colis : tout import est taxé.",
      },
      {
        scheme: "Stockage (FBA & entrepôts)",
        scope:
          "L'immatriculation IVA dans le pays où vos marchandises sont physiquement entreposées.",
        trigger:
          "Dès le 1ᵉʳ euro, sans seuil. NON couvert par l'OSS : c'est une obligation distincte et locale.",
      },
    ],

    dropEyebrow: "Le cas dropshipping",
    dropTitle: "Dropshipping : vous êtes redevable, pas votre fournisseur",
    dropBody:
      "En dropshipping, beaucoup pensent que la TVA à l'import est l'affaire du fournisseur hors UE. C'est faux, et c'est dangereux. Sur les ventes à distance de biens importés, le dropshipper est redevable de la TVA sur la valeur totale de la commande, y compris si le fournisseur étranger a mal déclaré ou sous-évalué le colis. Résultat possible : double taxation, blocage ou saisie du colis en douane, et un client mécontent. La seule protection, c'est un flux propre, des régimes (IOSS notamment) correctement paramétrés, et un Contabilista Certificado qui suit le tout.",
    dropPoints: [
      "Le dropshipper est redevable de la TVA sur la valeur totale de la vente",
      "Une erreur du fournisseur hors UE retombe sur vous, pas sur lui",
      "Risque concret : double taxation, blocage ou saisie du colis en douane",
      "Un paramétrage IOSS propre et un suivi comptable réduisent ce risque",
    ],

    whyEyebrow: "La structure conseillée",
    whyTitle: "Pourquoi une Unipessoal Lda pour e-commerce",
    whySubtitle:
      "Pour un projet e-commerce ou FBA porté seul, la Unipessoal Lda (société par quotas à associé unique) est en général la structure la plus adaptée. Voici pourquoi, sans promesse de résultat, chaque cas étant validé avec le partenaire fiscaliste.",
    reasons: [
      {
        title: "IRC réduit PME",
        description:
          "L'IRC (impôt sur les sociétés) est à 19 % en 2026, avec un taux réduit de 15 % pour les PME sur les premiers 50 000 € de bénéfice imposable, un cadre lisible pour une marge e-commerce qui monte.",
      },
      {
        title: "Responsabilité limitée",
        description:
          "Votre patrimoine personnel est distinct de celui de la société. Sur une activité avec stock, fournisseurs et risque douanier, cette séparation est un filet de sécurité essentiel.",
      },
      {
        title: "Capital social de 1 €",
        description:
          "Le capital social d'une Unipessoal Lda est de 1 € par associé, pas de 5 000 €. La barrière d'entrée n'est pas le capital, mais une structuration TVA et comptable correcte dès le départ.",
      },
      {
        title: "Crédibilité & NIPC",
        description:
          "Une société immatriculée dispose d'un NIPC, facilite l'ouverture des comptes Amazon/marketplaces pro et la relation bancaire, là où une activité non structurée plafonne vite.",
      },
    ],

    lexEyebrow: "Le bon mot",
    lexTitle: "Dites-le juste, dès le départ",
    lexBody:
      "La terminologie portugaise n'est pas un détail : utiliser le bon mot face à la banque, à l'Autoridade Tributária ou à Amazon évite des malentendus coûteux. Quelques repères que l'on remettra à jour ensemble.",
    lexicon: [
      {
        term: "Unipessoal Lda",
        value:
          "Société par quotas à associé unique. Ce n'est PAS une « EURL » : on n'utilise jamais l'équivalent français, qui n'a pas la même base légale ni le même régime.",
      },
      {
        term: "IVA",
        value:
          "La TVA portugaise (Imposto sobre o Valor Acrescentado), taux standard 23 %. On ne parle pas de « TVA » dans les démarches locales, mais d'IVA.",
      },
      {
        term: "NIPC",
        value:
          "Numéro d'identification de la personne morale (la société). À ne pas confondre avec le NIF, qui identifie une personne physique (le particulier).",
      },
      {
        term: "Contabilista Certificado",
        value:
          "Le comptable certifié inscrit à l'OCC, obligatoire pour une société. C'est lui, pas la consultante, qui produit et signe vos déclarations IVA, OSS et IRC.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "E-commerce & FBA : ce qu'on me demande",
    faq: [
      {
        q: "Je vends sur Amazon FBA : dois-je m'immatriculer à la TVA dans chaque pays ?",
        a: "Dès que votre stock est physiquement entreposé dans un pays de l'UE, oui : vous devez vous immatriculer à l'IVA (TVA) locale de ce pays dès le premier euro de vente, sans aucun seuil. L'OSS ne couvre pas le stockage. Avec Pan-EU FBA, Amazon répartit vos stocks dans plusieurs pays, ce qui multiplie ces immatriculations. C'est un point à cartographier dès le départ avec le Contabilista Certificado partenaire.",
      },
      {
        q: "À quoi sert le seuil unique de 10 000 € dans l'UE ?",
        a: "C'est un seuil annuel unique pour le cumul de vos ventes B2C à distance intra-UE, tous pays confondus. En dessous, vous appliquez la TVA de votre pays ; au-delà, vous appliquez la TVA du pays de destination de chaque vente, que vous déclarez trimestriellement via le guichet unique OSS. Attention : ce seuil ne concerne pas le stockage, qui a ses propres règles.",
      },
      {
        q: "Qu'est-ce que l'IOSS et qui est concerné ?",
        a: "L'IOSS est le régime simplifié pour la TVA sur les biens importés de pays tiers dont la valeur ne dépasse pas 150 €. Depuis juillet 2021, l'exonération de TVA sur les petits colis a disparu : tout import est désormais taxé. L'IOSS permet de collecter la TVA au moment de la vente et de fluidifier le passage en douane.",
      },
      {
        q: "En dropshipping, qui paie la TVA si mon fournisseur hors UE se trompe ?",
        a: "Vous. Sur les ventes à distance de biens importés, le dropshipper est redevable de la TVA sur la valeur totale de la commande, même si le fournisseur étranger a mal déclaré le colis. Le risque est concret : double taxation, blocage ou saisie en douane. Un paramétrage IOSS propre et un suivi comptable réduisent fortement ce risque.",
      },
      {
        q: "Quelle structure pour un projet e-commerce solo, et quel capital ?",
        a: "Pour un projet porté seul, la Unipessoal Lda est en général la plus adaptée : responsabilité limitée, IRC à 19 % (15 % PME sur les premiers 50 000 €) et capital social de 1 € par associé, jamais 5 000 €. Je crée la société et vous accompagne à la banque ; la comptabilité et la fiscalité sont pilotées par mes partenaires. Le bon montage dépend de votre cas, validé avec le fiscaliste partenaire.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Business Portugal est un service d'accompagnement à la création et à l'implantation : les déclarations IVA, OSS, IOSS et IRC sont assurées par un Contabilista Certificado partenaire inscrit à l'OCC, et la fiscalité par un fiscaliste partenaire. Les régimes et chiffres cités (IRC 19 %, taux PME 15 % sur les premiers 50 000 €, IVA 23 %, seuil UE 10 000 €, IOSS ≤ 150 €, capital social 1 €) sont à jour en 2026 et susceptibles d'évoluer. Votre situation dépend de votre flux réel et de la localisation de vos stocks. Pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Lançons votre société e-commerce au Portugal",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cartographier vos flux, vos stocks et vos obligations TVA, puis structurer proprement votre Unipessoal Lda. On regarde votre cas, on identifie les bons partenaires, on avance ensemble.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Création + mise en relation · Lisbonne, Portugal",

    relatedEyebrow: "Pour aller plus loin",
    relatedTitle: "Les étapes connexes",
    relatedLinks: [
      { label: "Création de société", href: CREATION_PATH },
      { label: "Comptabilité (Contabilista Certificado)", href: COMPTA_PATH },
      { label: "Fiscalité d'entreprise", href: FISCALITE_PATH },
      { label: "Foire aux questions", href: FAQ_PATH },
    ],

    breadcrumbHome: "Accueil",
    breadcrumbProfiles: "Profils",
    breadcrumbCurrent: "E-commerce & Amazon FBA",
    serviceName: "Accompagnement e-commerce & Amazon FBA au Portugal",
  },
  en: {
    metaTitle: "E-commerce & Amazon FBA in Portugal: OSS/IOSS VAT and an Unipessoal Lda",
    metaDesc:
      "Launch an e-commerce or Amazon FBA business from Portugal: master cross-border VAT (OSS, IOSS, the €10,000 threshold, storage), understand the FBA trap, and structure as an Unipessoal Lda. First conversation free.",
    eyebrow: "Profile · E-commerce & Amazon FBA",
    title: "E-commerce & Amazon FBA:",
    titleAccent: "launch and run your company from Portugal",
    lead: "Selling online across the EU is not a single VAT rate: it is a mechanism of thresholds, one-stop shops and obligations that trigger depending on where your customers are and, above all, where your stock sits. I set up your Portuguese company, support you through opening the bank account, and connect you with a partner Contabilista Certificado who runs your OSS/IOSS and IVA filings. The goal: a clean structure, a reduced SME IRC rate, and zero cross-border surprises.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "Understand the FBA trap",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    pitfallEyebrow: "The point no one explains to you",
    pitfallTitle: "The Amazon FBA trap: VAT from the very first euro",
    pitfallBody:
      "With Amazon FBA, your goods are stored in Amazon's warehouses, and storage changes everything. As soon as your stock is physically present in an EU country, you must register for local VAT there from the very first euro of sale, with no threshold at all. The OSS scheme, designed for distance selling, does NOT cover storage: it does not exempt you from a local registration where your products are warehoused. And with Pan-EU FBA, Amazon automatically spreads your stock across several countries, multiplying your registration obligations accordingly. It is the most costly mistake made by French-speaking sellers who relocate.",
    pitfallPoints: [
      "Storage in a country = local IVA registration from the first euro, no threshold",
      "OSS covers distance selling, NOT the storage of goods",
      "Pan-EU FBA spreads your stock → multiple registration obligations",
      "We first map where your stock sits, before talking about turnover",
    ],

    regimeEyebrow: "VAT schemes, without the jargon",
    regimeTitle: "OSS, IOSS, the €10,000 threshold and storage",
    regimeSubtitle:
      "Four distinct mechanisms that are often confused. These are the 2026 principles in exact terminology: your actual filing is run by the partner Contabilista Certificado according to your flow.",
    regimeHeadScheme: "Scheme / threshold",
    regimeHeadScope: "What it covers",
    regimeHeadTrigger: "What triggers it",
    regimes: [
      {
        scheme: "Single EU threshold, €10,000",
        scope:
          "A single annual threshold for the combined total of your intra-EU B2C distance sales, all countries together.",
        trigger:
          "Below: VAT of your own country. Above: VAT of the destination country, for each sale.",
      },
      {
        scheme: "OSS, one-stop shop",
        scope:
          "Declare and pay in one go the VAT due in other EU countries on your distance sales.",
        trigger:
          "Activated once the €10,000 threshold is exceeded. Quarterly filing via a single one-stop shop.",
      },
      {
        scheme: "IOSS, imports ≤ €150",
        scope:
          "Simplified scheme for VAT on goods imported from third countries whose value does not exceed €150.",
        trigger:
          "Since July 2021, no VAT exemption remains on low-value parcels: every import is taxed.",
      },
      {
        scheme: "Storage (FBA & warehouses)",
        scope: "VAT registration in the country where your goods are physically warehoused.",
        trigger:
          "From the first euro, no threshold. NOT covered by OSS: it is a separate, local obligation.",
      },
    ],

    dropEyebrow: "The dropshipping case",
    dropTitle: "Dropshipping: you are liable, not your supplier",
    dropBody:
      "In dropshipping, many believe import VAT is the non-EU supplier's problem. That is wrong, and dangerous. On distance sales of imported goods, the dropshipper is liable for VAT on the full value of the order, even if the foreign supplier mis-declared or undervalued the parcel. The possible outcome: double taxation, customs hold or seizure of the parcel, and an unhappy customer. The only protection is a clean flow, correctly configured schemes (IOSS in particular), and a Contabilista Certificado who follows it all.",
    dropPoints: [
      "The dropshipper is liable for VAT on the full value of the sale",
      "A non-EU supplier's mistake lands on you, not on them",
      "Concrete risk: double taxation, customs hold or seizure of the parcel",
      "A clean IOSS setup and accounting follow-up reduce this risk",
    ],

    whyEyebrow: "The recommended structure",
    whyTitle: "Why an Unipessoal Lda for e-commerce",
    whySubtitle:
      "For an e-commerce or FBA project run solo, the Unipessoal Lda (single-member private limited company) is generally the most suitable structure. Here is why, with no promise of results, each case being validated with the partner tax adviser.",
    reasons: [
      {
        title: "Reduced SME IRC",
        description:
          "IRC (corporate income tax) is 19% in 2026, with a reduced 15% rate for SMEs on the first €50,000 of taxable profit, a clear framework for an e-commerce margin that is scaling up.",
      },
      {
        title: "Limited liability",
        description:
          "Your personal assets are separate from the company's. For an activity with stock, suppliers and customs risk, this separation is an essential safety net.",
      },
      {
        title: "€1 share capital",
        description:
          "The share capital of an Unipessoal Lda is €1 per partner, not €5,000. The entry barrier is not the capital, but proper VAT and accounting structuring from the start.",
      },
      {
        title: "Credibility & NIPC",
        description:
          "A registered company holds a NIPC, eases opening professional Amazon/marketplace accounts and the banking relationship, where an unstructured activity quickly hits a ceiling.",
      },
    ],

    lexEyebrow: "The right word",
    lexTitle: "Get it right from the start",
    lexBody:
      "Portuguese terminology is not a detail: using the right word with the bank, the Autoridade Tributária or Amazon avoids costly misunderstandings. A few markers we will keep updated together.",
    lexicon: [
      {
        term: "Unipessoal Lda",
        value:
          "A single-member private limited company by quotas. It is NOT an “EURL”: we never use the French equivalent, which has neither the same legal basis nor the same regime.",
      },
      {
        term: "IVA",
        value:
          "Portuguese VAT (Imposto sobre o Valor Acrescentado), standard rate 23%. In local procedures we do not say “VAT” but IVA.",
      },
      {
        term: "NIPC",
        value:
          "The legal entity's identification number (the company). Not to be confused with the NIF, which identifies an individual (a private person).",
      },
      {
        term: "Contabilista Certificado",
        value:
          "The certified accountant registered with the OCC, mandatory for a company. It is they, not the consultant, who produce and sign your IVA, OSS and IRC filings.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "E-commerce & FBA: what people ask me",
    faq: [
      {
        q: "I sell on Amazon FBA: do I need to register for VAT in every country?",
        a: "As soon as your stock is physically warehoused in an EU country, yes: you must register for that country's local IVA (VAT) from the very first euro of sale, with no threshold. OSS does not cover storage. With Pan-EU FBA, Amazon spreads your stock across several countries, which multiplies these registrations. This is a point to map from the start with the partner Contabilista Certificado.",
      },
      {
        q: "What is the single €10,000 EU threshold for?",
        a: "It is a single annual threshold for the combined total of your intra-EU B2C distance sales, all countries together. Below it, you apply your own country's VAT; above it, you apply the destination country's VAT on each sale, declared quarterly via the OSS one-stop shop. Note: this threshold does not concern storage, which has its own rules.",
      },
      {
        q: "What is IOSS and who is concerned?",
        a: "IOSS is the simplified scheme for VAT on goods imported from third countries whose value does not exceed €150. Since July 2021, the VAT exemption on low-value parcels has gone: every import is now taxed. IOSS lets you collect VAT at the point of sale and smooth the customs clearance.",
      },
      {
        q: "In dropshipping, who pays the VAT if my non-EU supplier makes a mistake?",
        a: "You do. On distance sales of imported goods, the dropshipper is liable for VAT on the full value of the order, even if the foreign supplier mis-declared the parcel. The risk is real: double taxation, customs hold or seizure. A clean IOSS setup and accounting follow-up sharply reduce this risk.",
      },
      {
        q: "Which structure for a solo e-commerce project, and what capital?",
        a: "For a project run solo, the Unipessoal Lda is generally the most suitable: limited liability, IRC at 19% (15% for SMEs on the first €50,000) and share capital of €1 per partner, never €5,000. I set up the company and support you at the bank; accounting and taxation are run by my partners. The right setup depends on your case, validated with the partner tax adviser.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Business Portugal is a company formation and setup support service: IVA, OSS, IOSS and IRC filings are handled by a partner Contabilista Certificado registered with the OCC, and taxation by a partner tax adviser. The schemes and figures quoted (IRC 19%, SME rate 15% on the first €50,000, IVA 23%, EU threshold €10,000, IOSS ≤ €150, share capital €1) are current as of 2026 and subject to change. Your situation depends on your actual flow and on where your stock is located. For an analysis of your project, book a meeting.",

    ctaTitle: "Let's launch your e-commerce company in Portugal",
    ctaBody:
      "A first free conversation, with no commitment, to map your flows, your stock and your VAT obligations, then cleanly structure your Unipessoal Lda. We look at your case, identify the right partners, and move forward together.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Formation + introductions · Lisbon, Portugal",

    relatedEyebrow: "To go further",
    relatedTitle: "Related steps",
    relatedLinks: [
      { label: "Company formation", href: CREATION_PATH },
      { label: "Accounting (Contabilista Certificado)", href: COMPTA_PATH },
      { label: "Company taxation", href: FISCALITE_PATH },
      { label: "Frequently asked questions", href: FAQ_PATH },
    ],

    breadcrumbHome: "Home",
    breadcrumbProfiles: "Profiles",
    breadcrumbCurrent: "E-commerce & Amazon FBA",
    serviceName: "E-commerce & Amazon FBA support in Portugal",
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

export default async function EcommerceAmazonFbaPage({ params }: Props) {
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
                  href="#piege-fba"
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
                <p className="eyebrow">{c.pitfallEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.pitfallPoints.map((it, i) => (
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

      {/* Le piège Amazon FBA */}
      <section id="piege-fba" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.pitfallEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.pitfallTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.pitfallBody}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Tableau OSS / IOSS / seuil / stockage */}
      <section id="regimes" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.regimeEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.regimeTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.regimeSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="hidden grid-cols-[0.9fr_1.1fr_1.1fr] gap-px border border-border bg-border sm:grid">
                  <div className="bg-card px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.regimeHeadScheme}
                  </div>
                  <div className="bg-card px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.regimeHeadScope}
                  </div>
                  <div className="bg-card px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.regimeHeadTrigger}
                  </div>
                </div>
              </Reveal>
              <div className="mt-px grid gap-px border-x border-b border-border bg-border sm:border-x sm:border-t-0">
                {c.regimes.map((r, i) => (
                  <Reveal key={r.scheme} delay={i * 60}>
                    <div className="grid gap-3 bg-card px-5 py-6 sm:grid-cols-[0.9fr_1.1fr_1.1fr] sm:gap-px sm:gap-x-8">
                      <div className="font-serif text-lg">{r.scheme}</div>
                      <div className="leading-relaxed text-muted-foreground">{r.scope}</div>
                      <div className="leading-relaxed text-muted-foreground">{r.trigger}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropshipping & TVA */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.dropEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.dropTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.dropBody}</p>
              </Reveal>
              <div className="mt-8 divide-y divide-border border-t border-border">
                {c.dropPoints.map((it, i) => (
                  <Reveal key={it} delay={i * 60}>
                    <div className="flex items-baseline gap-4 py-4">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{it}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi une Unipessoal Lda */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.whyEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.whyTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.whySubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.reasons.map((s, i) => (
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

      {/* Encadré « Le bon mot » */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.lexEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.lexTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.lexBody}</p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.lexicon.map((t, i) => (
                  <Reveal key={t.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{t.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{t.value}</dd>
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

      {/* Maillage interne */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-20 lg:py-24">
          <Reveal>
            <p className="eyebrow">{c.relatedEyebrow}</p>
            <h2 className="mt-6 font-serif text-2xl sm:text-3xl">{c.relatedTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.relatedLinks.map((l, i) => (
              <Reveal key={l.href} delay={i * 60}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-4 bg-card px-6 py-6 transition-colors hover:bg-background"
                >
                  <span className="font-serif text-lg">{l.label}</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            ))}
          </div>
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
