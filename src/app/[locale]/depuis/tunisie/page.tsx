import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type SpokeCopy, SpokePage } from "@/components/seo/spoke-page";
import { languagesFor, ogLocaleFor, urlFor } from "@/lib/site";

// Spoke « créer au Portugal depuis la Tunisie » (branche MAGHREB, non-UE).
// Le sujet n'est PAS la fiscalité portugaise ni la CFC : c'est (1) l'immigration
// (visa D2 pour vivre/diriger au Portugal) et SURTOUT (2) le contrôle des changes
// tunisien (investir à l'étranger reste soumis à autorisation BCT, mi-2026).
// Situation ÉVOLUTIVE → datée et renvoyée systématiquement au professionnel.
const PATH = "/depuis/tunisie";
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

const COPY: { fr: SpokeCopy; en: SpokeCopy } = {
  fr: {
    metaTitle:
      "Créer sa société au Portugal depuis la Tunisie : visa D2, contrôle des changes (2026)",
    metaDesc:
      "Ressortissant tunisien ? Créer une société au Portugal à distance, comprendre le visa D2, le contrôle des changes de la BCT et la convention Tunisie-Portugal. Le vrai préalable n'est pas fiscal, il est le change et le visa. Service en français.",
    countryName: "Tunisie",

    eyebrow: "Depuis la Tunisie · À distance",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis la Tunisie",
    lead: "Vous êtes résident tunisien et vous envisagez une société au Portugal ? La société peut se créer à distance, en français. Mais le sujet décisif n'est pas la fiscalité portugaise : c'est le contrôle des changes tunisien (transférer des devises et investir à l'étranger restent encadrés) et, si vous voulez vivre et diriger sur place, le visa de résidence. Voici les repères, datés mi-2026 et à valider impérativement avec un professionnel.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le vrai obstacle",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    conventionEyebrow: "Double imposition",
    conventionTitle: "Convention Tunisie-Portugal",
    conventionDate: "Convention Tunisie-Portugal signée le 24/02/1999, en vigueur le 21/08/2000",
    conventionConfidence: "Niveau de confiance : élevé",
    conventionBody: [
      "Une convention préventive de la double imposition lie la Tunisie et le Portugal. Elle répartit le droit d'imposer entre les deux États et limite le risque qu'un même revenu soit taxé deux fois.",
      "Mais pour un ressortissant tunisien, la convention n'est pas le vrai préalable. Avant la fiscalité, deux questions priment : le visa de résidence (si vous voulez vivre et diriger au Portugal) et surtout le contrôle des changes tunisien, qui encadre la détention d'avoirs à l'étranger et le transfert de devises.",
      "Ces points doivent être validés en amont avec un professionnel : la situation du change est évolutive (mi-2026) et s'apprécie au cas par cas selon votre statut de résident ou de non-résident.",
    ],

    riskEyebrow: "À lire avant tout",
    riskTitle: "Le vrai obstacle, c'est le contrôle des changes tunisien",
    riskBody: [
      "Pour un résident tunisien, la difficulté principale n'est ni l'IRC portugais ni un dispositif d'imposition des sociétés étrangères contrôlées (il n'y a pas de CFC classique ici) : c'est le contrôle des changes. En Tunisie, la détention d'avoirs à l'étranger et le transfert de devises sont encadrés par le code des changes, et l'investissement à l'étranger par un résident reste, à la mi-2026, largement soumis à autorisation de la Banque Centrale de Tunisie (BCT).",
      "Le code des changes est en cours de refonte et de libéralisation, mais au moment de la rédaction (mi-2026) le principe reste celui de l'encadrement et de l'autorisation préalable. C'est une situation évolutive : les règles applicables doivent être datées et vérifiées impérativement avant toute opération, et validées avec un professionnel.",
      "La distinction entre résident et non-résident au sens du change est déterminante : un Tunisien résident à l'étranger (au sens de la réglementation des changes) n'est pas soumis aux mêmes contraintes qu'un résident en Tunisie. Votre statut conditionne donc ce que vous pouvez transférer et détenir hors de Tunisie.",
    ],
    riskBullets: [
      "Investir à l'étranger ou détenir une participation dans une société portugaise depuis la Tunisie peut nécessiter une autorisation préalable de la BCT : le principe est l'encadrement, pas la libre circulation des capitaux.",
      "Le transfert de devises (apport de capital, alimentation d'un compte au Portugal) obéit à ce même cadre : à vérifier avant d'engager des fonds.",
      "Statut au sens du change : résident en Tunisie vs non-résident (Tunisien établi à l'étranger) — les obligations diffèrent fortement, ce point doit être clarifié en premier.",
      "Le code des changes étant en libéralisation, les règles peuvent avoir évolué : ne vous fiez pas à une information non datée, faites valider la version applicable par un professionnel.",
    ],

    factsEyebrow: "Les repères tunisiens",
    factsTitle: "Résidence, visa et change, en bref",
    facts: [
      {
        term: "Résidence fiscale tunisienne",
        value:
          "Votre résidence fiscale s'apprécie selon le droit tunisien (foyer permanent, séjour principal en Tunisie). Tant que vous y êtes résident, vos obligations tunisiennes demeurent : la création d'une société portugaise ne les efface pas.",
      },
      {
        term: "Visa D2 si vous vous installez",
        value:
          "La société peut être créée à distance, mais vivre et diriger depuis le Portugal en tant que non-UE suppose un titre de séjour : le visa D2 (entrepreneur/indépendant). Conditions indicatives 2026, à confirmer.",
      },
      {
        term: "Spécificité : le contrôle des changes",
        value:
          "C'est le point déterminant. Détenir des avoirs à l'étranger et transférer des devises sont encadrés par le code des changes ; l'investissement à l'étranger reste, mi-2026, largement soumis à autorisation de la BCT. Situation évolutive, à dater et vérifier.",
      },
      {
        term: "Résident vs non-résident (au sens du change)",
        value:
          "La réglementation des changes distingue le résident en Tunisie du non-résident (Tunisien établi à l'étranger). Les contraintes de transfert et de détention diffèrent selon ce statut : c'est la première chose à clarifier.",
      },
    ],

    remoteEyebrow: "Votre parcours",
    remoteTitle: "Créer à distance depuis la Tunisie",
    remoteBody:
      "En tant que ressortissant non-UE, votre parcours combine des démarches portugaises (NIF, procuration, immatriculation) et, en amont, le cadrage du change tunisien et, le cas échéant, du visa. Nous coordonnons le volet portugais depuis le Portugal et vous orientons vers les bons interlocuteurs pour le reste.",
    remoteSteps: [
      {
        term: "Obtenir un NIF non-résident",
        value:
          "Le NIF (numéro fiscal portugais du particulier) s'obtient sans déplacement, via un représentant fiscal au Portugal puisque vous résidez hors UE. À ne pas confondre avec le NIPC, le numéro fiscal de la future société.",
      },
      {
        term: "Donner procuration (création possible à distance)",
        value:
          "Une procuration permet d'accomplir l'immatriculation en votre nom, sans voyage : la société peut être créée à distance avant toute installation. Signature légalisée ou apostillée selon le cas.",
      },
      {
        term: "Cadrer le contrôle des changes",
        value:
          "Avant tout transfert de fonds, faites vérifier ce que la réglementation tunisienne autorise selon votre statut (résident ou non-résident) : apport de capital, alimentation d'un compte, autorisation BCT éventuelle. Situation évolutive, à dater et valider avec un professionnel.",
      },
      {
        term: "Visa D2 si vous voulez vivre et diriger sur place",
        value:
          "Si l'objectif est de vous installer au Portugal et d'y diriger la société, le visa D2 (entrepreneur/indépendant non-UE) est le titre de séjour à viser. Conditions indicatives 2026 : moyens de subsistance de l'ordre du salaire minimum portugais, justificatif d'épargne/de dépôt, plan d'affaires crédible — à confirmer.",
      },
      {
        term: "Immatriculer et ouvrir le compte",
        value:
          "Immatriculation coordonnée (statuts, RCBE, Certidão Permanente, Segurança Social) puis ouverture du compte professionnel, dont les modalités dépendent de la banque et de votre profil non-résident. La comptabilité est ensuite assurée par un Contabilista Certificado partenaire.",
      },
    ],

    relatedEyebrow: "Pour aller plus loin",
    relatedTitle: "Les pages utiles avant de décider",
    related: [
      {
        label: "Créer depuis l'étranger : le guide à distance",
        href: "/creer-societe-portugal-depuis-letranger",
        desc: "Le tronc commun des démarches à distance, valable où que vous viviez.",
      },
      {
        label: "Création de société au Portugal",
        href: "/creation-societe",
        desc: "Les formes (Unipessoal Lda, Lda), le capital et les étapes d'immatriculation.",
      },
      {
        label: "Nos outils",
        href: "/outils",
        desc: "Simulateurs et repères chiffrés pour estimer votre projet, sans engagement.",
      },
      {
        label: "Nous contacter",
        href: "/contact",
        desc: "Un premier échange gratuit pour cadrer votre projet et le change tunisien.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ressortissant tunisien : ce qu'on me demande",
    faq: [
      {
        q: "Puis-je détenir une société au Portugal en restant résident tunisien ?",
        a: "Oui, la société peut être créée à distance. Mais en restant résident en Tunisie, vos obligations tunisiennes demeurent et, surtout, la détention d'avoirs à l'étranger et l'investissement hors de Tunisie sont encadrés par le contrôle des changes : à la mi-2026, cela reste largement soumis à autorisation de la BCT. Ce point, évolutif, doit être daté et validé avec un professionnel avant d'engager quoi que ce soit.",
      },
      {
        q: "Ai-je besoin d'un visa pour créer ma société au Portugal ?",
        a: "Pour créer la société à distance, non : une procuration suffit. En revanche, si vous voulez vivre au Portugal et y diriger la société, vous avez besoin d'un titre de séjour, le visa D2 (entrepreneur/indépendant non-UE). Ses conditions 2026 (moyens de subsistance de l'ordre du salaire minimum portugais, épargne, plan d'affaires) sont indicatives et à confirmer.",
      },
      {
        q: "Puis-je transférer des fonds et des devises vers le Portugal ?",
        a: "C'est le point le plus sensible. Le transfert de devises et la détention d'avoirs à l'étranger sont encadrés par le code des changes tunisien ; à la mi-2026, l'investissement à l'étranger par un résident reste largement soumis à autorisation de la BCT. Le code est en cours de libéralisation, donc la situation est évolutive : faites vérifier la règle applicable, selon votre statut de résident ou non-résident, avec un professionnel avant tout transfert.",
      },
      {
        q: "La création à distance est-elle vraiment possible ?",
        a: "Oui. Avec un NIF non-résident obtenu via un représentant fiscal et une procuration, la société portugaise peut être immatriculée sans que vous vous déplaciez. Vivre et diriger sur place est une étape distincte qui suppose, elle, le visa de résidence. Nous coordonnons le volet portugais et vous orientons pour le change et le visa.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable, fiscal ou de change personnalisé. La date de la convention et les règles du contrôle des changes sont données à titre indicatif et doivent être validées : le code des changes tunisien est en cours de libéralisation, la situation est évolutive (au moment de la rédaction, mi-2026). Les conditions du visa D2 et les seuils associés sont des chiffres indicatifs 2026, à confirmer. Tous ces éléments sont à valider avec un professionnel (fiscaliste, conseil en change) avant toute décision. Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : nous vous orientons et vous mettons en relation avec le bon partenaire. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis la Tunisie",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création au Portugal et, surtout, le contrôle des changes et le visa. Si un fiscaliste ou un conseil en change est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbHub: "Créer depuis l'étranger",
    breadcrumbCurrent: "Depuis la Tunisie",
  },
  en: {
    metaTitle: "Setting up a Portuguese company from Tunisia: D2 visa, exchange controls (2026)",
    metaDesc:
      "Tunisian national? Set up a company in Portugal remotely, understand the D2 visa, Tunisia's BCT exchange controls and the Tunisia-Portugal treaty. The real prerequisite is not tax, it is exchange controls and the visa. Service in French.",
    countryName: "Tunisia",

    eyebrow: "From Tunisia · Remotely",
    title: "Set up your company in Portugal",
    titleAccent: "from Tunisia",
    lead: "You are a Tunisian resident considering a company in Portugal? The company can be set up remotely, in French. But the decisive issue is not Portuguese tax: it is Tunisia's exchange controls (transferring currency and investing abroad remain regulated) and, if you want to live and run it on site, the residence visa. Here are the markers, dated mid-2026 and to be validated without fail with a professional.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real obstacle",
    trust: "75+ entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    conventionEyebrow: "Double taxation",
    conventionTitle: "Tunisia-Portugal treaty",
    conventionDate: "Tunisia-Portugal treaty signed 24/02/1999, in force 21/08/2000",
    conventionConfidence: "Confidence level: high",
    conventionBody: [
      "A double-taxation treaty binds Tunisia and Portugal. It allocates taxing rights between the two States and limits the risk of the same income being taxed twice.",
      "But for a Tunisian national, the treaty is not the real prerequisite. Before tax, two questions come first: the residence visa (if you want to live and run the company in Portugal) and above all Tunisia's exchange controls, which regulate holding assets abroad and transferring currency.",
      "These points must be validated upfront with a professional: the exchange-control situation is evolving (mid-2026) and is assessed case by case depending on your resident or non-resident status.",
    ],

    riskEyebrow: "Read this first",
    riskTitle: "The real obstacle is Tunisia's exchange controls",
    riskBody: [
      "For a Tunisian resident, the main difficulty is neither Portuguese IRC nor a controlled-foreign-company tax regime (there is no classic CFC here): it is exchange controls. In Tunisia, holding assets abroad and transferring currency are regulated by the exchange code, and investment abroad by a resident remains, as of mid-2026, largely subject to authorisation from the Central Bank of Tunisia (BCT).",
      "The exchange code is being overhauled and liberalised, but at the time of writing (mid-2026) the principle remains one of regulation and prior authorisation. This is an evolving situation: the applicable rules must be dated and verified without fail before any operation, and validated with a professional.",
      "The distinction between resident and non-resident in the exchange-control sense is decisive: a Tunisian living abroad (in the sense of exchange regulations) is not subject to the same constraints as a resident in Tunisia. Your status therefore determines what you may transfer and hold outside Tunisia.",
    ],
    riskBullets: [
      "Investing abroad or holding a stake in a Portuguese company from Tunisia may require prior authorisation from the BCT: the principle is regulation, not free movement of capital.",
      "Currency transfers (capital contribution, funding an account in Portugal) follow this same framework: to be checked before committing funds.",
      "Exchange-control status: resident in Tunisia vs non-resident (Tunisian established abroad) — the obligations differ greatly, this point must be clarified first.",
      "As the exchange code is being liberalised, the rules may have changed: do not rely on undated information, have the applicable version validated by a professional.",
    ],

    factsEyebrow: "The Tunisian markers",
    factsTitle: "Residence, visa and exchange, in brief",
    facts: [
      {
        term: "Tunisian tax residence",
        value:
          "Your tax residence is assessed under Tunisian law (permanent home, main stay in Tunisia). As long as you are a resident there, your Tunisian obligations remain: setting up a Portuguese company does not erase them.",
      },
      {
        term: "D2 visa if you settle in",
        value:
          "The company can be set up remotely, but living and running it from Portugal as a non-EU national requires a residence permit: the D2 visa (entrepreneur/independent). Indicative 2026 conditions, to be confirmed.",
      },
      {
        term: "Specificity: exchange controls",
        value:
          "This is the decisive point. Holding assets abroad and transferring currency are regulated by the exchange code; investment abroad remains, mid-2026, largely subject to BCT authorisation. Evolving situation, to be dated and verified.",
      },
      {
        term: "Resident vs non-resident (exchange-control sense)",
        value:
          "Exchange regulations distinguish the resident in Tunisia from the non-resident (Tunisian established abroad). Transfer and holding constraints differ by status: this is the first thing to clarify.",
      },
    ],

    remoteEyebrow: "Your process",
    remoteTitle: "Setting up remotely from Tunisia",
    remoteBody:
      "As a non-EU national, your process combines Portuguese formalities (NIF, power of attorney, incorporation) and, upfront, the framing of Tunisian exchange controls and, where relevant, the visa. We coordinate the Portuguese side from Portugal and point you to the right contacts for the rest.",
    remoteSteps: [
      {
        term: "Obtain a non-resident NIF",
        value:
          "The NIF (individual Portuguese tax number) is obtained without travelling, via a tax representative in Portugal since you reside outside the EU. Not to be confused with the NIPC, the future company's tax number.",
      },
      {
        term: "Grant a power of attorney (remote setup possible)",
        value:
          "A power of attorney allows incorporation to be carried out in your name, with no trip: the company can be set up remotely before any relocation. Legalised or apostilled signature depending on the case.",
      },
      {
        term: "Frame the exchange controls",
        value:
          "Before any transfer of funds, have it checked what Tunisian regulations allow depending on your status (resident or non-resident): capital contribution, funding an account, possible BCT authorisation. Evolving situation, to be dated and validated with a professional.",
      },
      {
        term: "D2 visa if you want to live and run it on site",
        value:
          "If the goal is to settle in Portugal and run the company there, the D2 visa (non-EU entrepreneur/independent) is the residence permit to target. Indicative 2026 conditions: means of subsistence of the order of the Portuguese minimum wage, proof of savings/deposit, a credible business plan — to be confirmed.",
      },
      {
        term: "Incorporate and open the account",
        value:
          "Coordinated incorporation (articles, RCBE, Certidão Permanente, Segurança Social) then opening the business account, whose terms depend on the bank and your non-resident profile. Accounting is then handled by a partner Contabilista Certificado.",
      },
    ],

    relatedEyebrow: "To go further",
    relatedTitle: "Useful pages before you decide",
    related: [
      {
        label: "Setting up from abroad: the remote guide",
        href: "/creer-societe-portugal-depuis-letranger",
        desc: "The common backbone of remote formalities, valid wherever you live.",
      },
      {
        label: "Company formation in Portugal",
        href: "/creation-societe",
        desc: "The forms (Unipessoal Lda, Lda), capital and the incorporation steps.",
      },
      {
        label: "Our tools",
        href: "/outils",
        desc: "Simulators and figures to estimate your project, no commitment.",
      },
      {
        label: "Contact us",
        href: "/contact",
        desc: "A first free conversation to frame your project and Tunisian exchange controls.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Tunisian national: what people ask me",
    faq: [
      {
        q: "Can I own a company in Portugal while remaining a Tunisian resident?",
        a: "Yes, the company can be set up remotely. But by remaining a resident in Tunisia, your Tunisian obligations remain and, above all, holding assets abroad and investing outside Tunisia are regulated by exchange controls: as of mid-2026, this remains largely subject to BCT authorisation. This evolving point must be dated and validated with a professional before committing anything.",
      },
      {
        q: "Do I need a visa to set up my company in Portugal?",
        a: "To set up the company remotely, no: a power of attorney is enough. However, if you want to live in Portugal and run the company there, you need a residence permit, the D2 visa (non-EU entrepreneur/independent). Its 2026 conditions (means of subsistence of the order of the Portuguese minimum wage, savings, business plan) are indicative and to be confirmed.",
      },
      {
        q: "Can I transfer funds and currency to Portugal?",
        a: "This is the most sensitive point. Currency transfers and holding assets abroad are regulated by the Tunisian exchange code; as of mid-2026, investment abroad by a resident remains largely subject to BCT authorisation. The code is being liberalised, so the situation is evolving: have the applicable rule checked, depending on your resident or non-resident status, with a professional before any transfer.",
      },
      {
        q: "Is remote setup really possible?",
        a: "Yes. With a non-resident NIF obtained via a tax representative and a power of attorney, the Portuguese company can be incorporated without you travelling. Living and running it on site is a separate step that does require the residence visa. We coordinate the Portuguese side and point you in the right direction for exchange controls and the visa.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting, tax or exchange-control advice. The treaty date and the exchange-control rules are given as an indication and must be validated: the Tunisian exchange code is being liberalised, the situation is evolving (at the time of writing, mid-2026). The D2 visa conditions and associated thresholds are indicative 2026 figures, to be confirmed. All of these elements are to be validated with a professional (tax adviser, exchange-control adviser) before any decision. Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: we guide you and connect you with the right partner. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from Tunisia",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your Portuguese incorporation and, above all, exchange controls and the visa. If a tax adviser or an exchange-control adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbHub: "Setting up from abroad",
    breadcrumbCurrent: "From Tunisia",
  },
};

const pick = (l: string): SpokeCopy => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: urlFor(locale, PATH), languages: languagesFor(PATH) },
    openGraph: {
      ...ogLocaleFor(locale),
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function DepuisTunisiePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);
  return (
    <SpokePage
      locale={locale}
      path={PATH}
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      c={c}
    />
  );
}
