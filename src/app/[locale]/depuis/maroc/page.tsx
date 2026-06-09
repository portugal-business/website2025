import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type SpokeCopy, SpokePage } from "@/components/seo/spoke-page";
import { languagesFor, ogLocaleFor, urlFor } from "@/lib/site";

// Spoke « créer au Portugal depuis le Maroc » (branche MAGHREB, non-UE).
// Logique RADICALEMENT différente de l'Europe : pas de taxe Caïman ni d'ATAD.
// Le vrai obstacle = LE CONTRÔLE DES CHANGES marocain (Office des Changes) ;
// puis l'immigration (visa D2 pour vivre/diriger au Portugal). Distinction
// RÉSIDENT vs MRE/non-résident centrale. Aucune date de convention publiée :
// existence à confirmer. Chiffres visa = indicatifs 2026, à valider fiscaliste.
const PATH = "/depuis/maroc";
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

const COPY: { fr: SpokeCopy; en: SpokeCopy } = {
  fr: {
    metaTitle:
      "Créer sa société au Portugal depuis le Maroc : contrôle des changes, visa D2 (2026)",
    metaDesc:
      "Résident marocain ou MRE ? Créer une société au Portugal à distance, comprendre le contrôle des changes de l'Office des Changes, le visa D2 et la distinction résident vs non-résident. Le vrai préalable n'est pas la fiscalité portugaise, c'est le change. Service en français.",
    countryName: "Maroc",

    eyebrow: "Depuis le Maroc · À distance",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis le Maroc",
    lead: "Vous êtes au Maroc et vous envisagez une société au Portugal ? La société peut se créer à distance, en français, par procuration. Mais le sujet décisif n'est pas la fiscalité portugaise : c'est le contrôle des changes marocain et, si vous comptez vous installer, le visa de résidence. La distinction entre résident marocain et MRE (non-résident) change tout. Voici les repères 2026, à valider avec un professionnel.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le vrai obstacle",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    conventionEyebrow: "Double imposition",
    conventionTitle: "Convention Maroc-Portugal",
    conventionDate: "Convention de non-double imposition Maroc-Portugal : existence à confirmer",
    conventionConfidence: "Niveau de confiance : à vérifier (ne pas s'y fier sans validation)",
    conventionBody: [
      "L'existence et la portée d'une convention de non-double imposition entre le Maroc et le Portugal doivent être confirmées : nous ne publions aucune date tant que ce point n'est pas vérifié avec un professionnel. Ne vous appuyez sur aucune supposition à ce sujet.",
      "De toute façon, le vrai préalable n'est pas conventionnel. Pour un ressortissant marocain, les deux points à cadrer en amont sont : le visa de résidence (type D2) si vous voulez vivre et diriger au Portugal, et surtout le contrôle des changes marocain, qui encadre la détention d'une société et de comptes à l'étranger ainsi que le transfert de devises.",
    ],

    riskEyebrow: "À lire avant tout",
    riskTitle: "Le vrai obstacle est le contrôle des changes marocain",
    riskBody: [
      "Pour un ressortissant marocain, l'obstacle décisif n'est ni la fiscalité portugaise ni un dispositif de société étrangère contrôlée — ce mécanisme n'existe pas ici. L'obstacle est le contrôle des changes : au Maroc, l'Office des Changes encadre les opérations en devises, via l'Instruction Générale des Opérations de Change.",
      "Tout repose sur une distinction : RÉSIDENT contre non-résident. Un résident marocain ne peut pas librement détenir une société ou des comptes à l'étranger, ni transférer des devises, sans s'inscrire dans le cadre réglementaire — autorisations ou limites peuvent s'appliquer. Les MRE (Marocains résidant à l'étranger, non-résidents au sens du change) échappent largement à ces restrictions.",
      "Le régime se libéralise progressivement — une réforme 2026 évoque une « libéralisation maîtrisée » — mais des autorisations et des limites demeurent pour les résidents, et la situation est évolutive. C'est donc le premier point à dater et à vérifier avec un professionnel, avant toute création.",
    ],
    riskBullets: [
      "Le principe : un résident marocain doit s'inscrire dans le cadre de l'Office des Changes (Instruction Générale des Opérations de Change) pour détenir une société ou des comptes à l'étranger et transférer des devises — autorisation ou encadrement selon l'opération.",
      "La distinction RÉSIDENT vs MRE est déterminante : le non-résident (MRE) échappe largement aux restrictions de change ; le résident, non. Votre statut au regard du change doit être clarifié avant tout.",
      "Aucun plafond chiffré précis n'est publié ici : les montants et seuils évoluent et doivent être datés puis confirmés avec un professionnel.",
      "Pas de dispositif de société étrangère contrôlée (type art. 209 B) : la logique n'est pas celle de l'Europe. Le sujet est le change, pas l'anti-évitement fiscal.",
      "La résidence fiscale marocaine s'apprécie selon le CGI marocain : foyer permanent d'habitation, centre des intérêts économiques, durée de séjour.",
    ],

    factsEyebrow: "Les repères marocains",
    factsTitle: "Résidence, visa et change, en bref",
    facts: [
      {
        term: "Critère de résidence fiscale marocaine",
        value:
          "Selon le Code général des impôts marocain, vous êtes résident fiscal si vous avez au Maroc votre foyer permanent d'habitation, le centre de vos intérêts économiques, ou si votre durée de séjour y dépasse le seuil légal sur l'année.",
      },
      {
        term: "Visa D2 : pour vivre et diriger au Portugal",
        value:
          "La société peut être créée à distance par procuration AVANT toute installation. Mais vivre et diriger l'activité depuis le Portugal suppose un titre de séjour : le visa D2 (entrepreneur / indépendant non-UE). Conditions indicatives 2026 à confirmer.",
      },
      {
        term: "Spécificité : le contrôle des changes",
        value:
          "Un résident marocain ne peut pas librement détenir une société ou des comptes à l'étranger ni transférer des devises sans s'inscrire dans le cadre de l'Office des Changes. Les MRE en sont largement exemptés. C'est le point bloquant à cadrer en premier.",
      },
      {
        term: "Résident vs MRE (non-résident)",
        value:
          "Toute la faisabilité dépend de votre statut au regard du change : un MRE dispose d'une bien plus grande liberté qu'un résident. Clarifier ce statut est le préalable à toute décision.",
      },
    ],

    remoteEyebrow: "Votre parcours",
    remoteTitle: "Créer à distance depuis le Maroc",
    remoteBody:
      "En tant que ressortissant non-UE, votre parcours diffère de celui d'un Européen : la société se monte à distance par procuration, mais le change et, le cas échéant, le visa doivent être cadrés en parallèle. Nous coordonnons les démarches portugaises depuis le Portugal et vous orientons vers les bons partenaires.",
    remoteSteps: [
      {
        term: "Obtenir le NIF (non-résident, via représentant fiscal)",
        value:
          "En tant que non-résident d'un pays hors UE, le NIF (numéro fiscal portugais du particulier) s'obtient via un représentant fiscal au Portugal. À ne pas confondre avec le NIPC, le numéro fiscal de la future société.",
      },
      {
        term: "Donner procuration (création possible à distance)",
        value:
          "Une procuration permet d'accomplir les formalités d'immatriculation en votre nom, sans déplacement. La société peut ainsi être créée à distance, avant même une éventuelle installation au Portugal.",
      },
      {
        term: "Cadrer le contrôle des changes / les autorisations",
        value:
          "Si vous êtes résident marocain, vérifier comment détenir la société et transférer des fonds dans le cadre de l'Office des Changes (autorisations, limites). Si vous êtes MRE, confirmer votre statut de non-résident. Point à dater et à valider avec un professionnel avant d'engager des fonds.",
      },
      {
        term: "Visa D2 si vous voulez vivre et diriger au Portugal",
        value:
          "Pour résider et diriger l'activité depuis le Portugal, le visa D2 (entrepreneur / indépendant non-UE) est requis. Conditions indicatives 2026 à confirmer : moyens de subsistance de l'ordre du salaire minimum portugais, justificatif de dépôt / épargne, plan d'affaires crédible.",
      },
      {
        term: "Ouvrir le compte bancaire",
        value:
          "Ouverture du compte professionnel selon la banque et votre profil (résident ou MRE). La comptabilité est ensuite assurée par un Contabilista Certificado partenaire.",
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
        desc: "ENI, Unipessoal Lda, Lda, SA : les formes, le capital et la marche à suivre.",
      },
      {
        label: "Nos outils",
        href: "/outils",
        desc: "Simulateurs et repères chiffrés pour évaluer votre projet, sans engagement.",
      },
      {
        label: "Nous contacter",
        href: "/contact",
        desc: "Un premier échange gratuit, en visio et en français, pour cadrer votre projet.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ressortissant marocain : ce qu'on me demande",
    faq: [
      {
        q: "Puis-je détenir une société au Portugal en restant résident au Maroc ?",
        a: "C'est techniquement possible, mais ce n'est pas qu'une question portugaise. Si vous êtes résident marocain, l'Office des Changes encadre la détention d'une société et de comptes à l'étranger : vous devez vous inscrire dans le cadre réglementaire (Instruction Générale des Opérations de Change), avec d'éventuelles autorisations ou limites. Les MRE (non-résidents) en sont largement exemptés. Ce point doit être daté et validé avec un professionnel avant tout.",
      },
      {
        q: "Ai-je besoin d'un visa pour créer ou diriger une société au Portugal ?",
        a: "Pour créer la société à distance par procuration, non : aucun titre de séjour n'est nécessaire. En revanche, pour vivre au Portugal et y diriger l'activité, le visa D2 (entrepreneur / indépendant non-UE) est requis. Ses conditions 2026 sont indicatives et à confirmer : moyens de subsistance de l'ordre du salaire minimum portugais, justificatif de dépôt / épargne, plan d'affaires crédible.",
      },
      {
        q: "Puis-je librement transférer des fonds ou des devises vers le Portugal ?",
        a: "Pas librement si vous êtes résident marocain : le transfert de devises et la détention d'avoirs à l'étranger sont encadrés par l'Office des Changes, avec des autorisations ou des limites selon l'opération. Le régime se libéralise progressivement (réforme 2026, « libéralisation maîtrisée »), mais des restrictions demeurent pour les résidents. Les MRE disposent d'une bien plus grande liberté. Aucun montant n'est garanti ici : à dater et à vérifier avec un professionnel.",
      },
      {
        q: "La création à distance est-elle vraiment possible ?",
        a: "Oui. Via un NIF non-résident obtenu par un représentant fiscal et une procuration, la société peut être immatriculée au Portugal sans vous déplacer. Reste à cadrer en parallèle le contrôle des changes (si vous êtes résident) et, si vous comptez vous installer, le visa D2. La comptabilité est ensuite assurée par un Contabilista Certificado partenaire.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable, fiscal ou en réglementation des changes personnalisé. L'existence et la date d'une convention de non-double imposition Maroc-Portugal sont à confirmer : aucune date n'est publiée ici. Les règles du contrôle des changes (Office des Changes, Instruction Générale des Opérations de Change) sont évolutives — une libéralisation maîtrisée est annoncée pour 2026 — et doivent être datées puis vérifiées au cas par cas. Les conditions du visa D2 (revenu de l'ordre du salaire minimum portugais, dépôt de moyens de subsistance, plan d'affaires) sont indicatives 2026 et à confirmer. Tous ces points doivent être validés avec un professionnel (fiscaliste, conseil en change, juriste). Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : nous vous orientons et vous mettons en relation avec le bon partenaire. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis le Maroc",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création au Portugal et, surtout, votre situation au regard du contrôle des changes et du visa. Si un fiscaliste ou un conseil en change est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbHub: "Créer depuis l'étranger",
    breadcrumbCurrent: "Depuis le Maroc",
  },
  en: {
    metaTitle:
      "Setting up a Portuguese company from Morocco: foreign-exchange control, D2 visa (2026)",
    metaDesc:
      "Moroccan resident or MRE? Set up a company in Portugal remotely, understand the Office des Changes foreign-exchange control, the D2 visa and the resident vs non-resident distinction. The real prerequisite is not Portuguese tax, it is exchange control. Service in French.",
    countryName: "Morocco",

    eyebrow: "From Morocco · Remotely",
    title: "Set up your company in Portugal",
    titleAccent: "from Morocco",
    lead: "You are in Morocco and considering a company in Portugal? The company can be set up remotely, in French, by power of attorney. But the decisive issue is not Portuguese tax: it is Moroccan exchange control and, if you plan to settle, the residence visa. The distinction between a Moroccan resident and an MRE (non-resident) changes everything. Here are the 2026 markers, to validate with a professional.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real obstacle",
    trust: "75+ entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    conventionEyebrow: "Double taxation",
    conventionTitle: "Morocco-Portugal treaty",
    conventionDate: "Morocco-Portugal double-taxation treaty: existence to be confirmed",
    conventionConfidence: "Confidence level: to be verified (do not rely on it without validation)",
    conventionBody: [
      "The existence and scope of a double-taxation treaty between Morocco and Portugal must be confirmed: we publish no date until this point is verified with a professional. Do not rely on any assumption on this matter.",
      "In any case, the real prerequisite is not treaty-based. For a Moroccan national, the two points to settle upfront are: the residence visa (D2 type) if you want to live and run the business in Portugal, and above all Moroccan exchange control, which frames the holding of a company and accounts abroad as well as the transfer of currency.",
    ],

    riskEyebrow: "Read this first",
    riskTitle: "The real obstacle is Moroccan exchange control",
    riskBody: [
      "For a Moroccan national, the decisive obstacle is neither Portuguese tax nor a controlled-foreign-company regime — that mechanism does not exist here. The obstacle is exchange control: in Morocco, the Office des Changes frames foreign-currency operations, through the General Instruction on Foreign Exchange Operations.",
      "Everything rests on one distinction: RESIDENT versus non-resident. A Moroccan resident cannot freely hold a company or accounts abroad, nor transfer currency, without operating within the regulatory framework — authorisations or limits may apply. MREs (Moroccans residing abroad, non-resident for exchange purposes) largely escape these restrictions.",
      "The regime is gradually liberalising — a 2026 reform refers to « controlled liberalisation » — but authorisations and limits remain for residents, and the situation is evolving. It is therefore the first point to date and verify with a professional, before any incorporation.",
    ],
    riskBullets: [
      "The principle: a Moroccan resident must operate within the Office des Changes framework (General Instruction on Foreign Exchange Operations) to hold a company or accounts abroad and transfer currency — authorisation or framing depending on the operation.",
      "The RESIDENT vs MRE distinction is decisive: a non-resident (MRE) largely escapes exchange restrictions; a resident does not. Your status for exchange purposes must be clarified before anything else.",
      "No precise capped figure is published here: amounts and thresholds evolve and must be dated then confirmed with a professional.",
      "No controlled-foreign-company regime (such as art. 209 B): the logic is not the European one. The subject is exchange control, not anti-avoidance tax rules.",
      "Moroccan tax residence is assessed under the Moroccan General Tax Code: permanent home, centre of economic interests, length of stay.",
    ],

    factsEyebrow: "The Moroccan markers",
    factsTitle: "Residence, visa and exchange, in brief",
    facts: [
      {
        term: "Moroccan tax-residence test",
        value:
          "Under the Moroccan General Tax Code, you are a tax resident if you have your permanent home, the centre of your economic interests in Morocco, or if your length of stay there exceeds the legal threshold over the year.",
      },
      {
        term: "D2 visa: to live and run the business in Portugal",
        value:
          "The company can be set up remotely by power of attorney BEFORE any settlement. But living and running the activity from Portugal requires a residence permit: the D2 visa (non-EU entrepreneur / self-employed). Indicative 2026 conditions, to be confirmed.",
      },
      {
        term: "Specificity: exchange control",
        value:
          "A Moroccan resident cannot freely hold a company or accounts abroad nor transfer currency without operating within the Office des Changes framework. MREs are largely exempt. This is the blocking point to settle first.",
      },
      {
        term: "Resident vs MRE (non-resident)",
        value:
          "All feasibility depends on your status for exchange purposes: an MRE enjoys far greater freedom than a resident. Clarifying this status is the prerequisite to any decision.",
      },
    ],

    remoteEyebrow: "Your process",
    remoteTitle: "Setting up remotely from Morocco",
    remoteBody:
      "As a non-EU national, your process differs from a European's: the company is set up remotely by power of attorney, but exchange control and, where applicable, the visa must be framed in parallel. We coordinate the Portuguese formalities from Portugal and point you to the right partners.",
    remoteSteps: [
      {
        term: "Obtain the NIF (non-resident, via a tax representative)",
        value:
          "As a non-resident of a country outside the EU, the NIF (individual Portuguese tax number) is obtained via a tax representative in Portugal. Not to be confused with the NIPC, the future company's tax number.",
      },
      {
        term: "Grant a power of attorney (remote set-up possible)",
        value:
          "A power of attorney allows the registration formalities to be carried out in your name, with no trip. The company can thus be set up remotely, even before any settlement in Portugal.",
      },
      {
        term: "Frame exchange control / authorisations",
        value:
          "If you are a Moroccan resident, check how to hold the company and transfer funds within the Office des Changes framework (authorisations, limits). If you are an MRE, confirm your non-resident status. A point to date and validate with a professional before committing funds.",
      },
      {
        term: "D2 visa if you want to live and run the business in Portugal",
        value:
          "To reside and run the activity from Portugal, the D2 visa (non-EU entrepreneur / self-employed) is required. Indicative 2026 conditions, to be confirmed: means of subsistence of the order of the Portuguese minimum wage, proof of deposit / savings, a credible business plan.",
      },
      {
        term: "Open the bank account",
        value:
          "Opening the business account depends on the bank and your profile (resident or MRE). Accounting is then handled by a partner Contabilista Certificado.",
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
        desc: "ENI, Unipessoal Lda, Lda, SA: the forms, the capital and the steps to follow.",
      },
      {
        label: "Our tools",
        href: "/outils",
        desc: "Simulators and figured markers to assess your project, no commitment.",
      },
      {
        label: "Contact us",
        href: "/contact",
        desc: "A first free conversation, by video and in French, to frame your project.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Moroccan national: what people ask me",
    faq: [
      {
        q: "Can I hold a company in Portugal while remaining a resident in Morocco?",
        a: "It is technically possible, but it is not only a Portuguese question. If you are a Moroccan resident, the Office des Changes frames the holding of a company and accounts abroad: you must operate within the regulatory framework (General Instruction on Foreign Exchange Operations), with possible authorisations or limits. MREs (non-residents) are largely exempt. This point must be dated and validated with a professional first.",
      },
      {
        q: "Do I need a visa to set up or run a company in Portugal?",
        a: "To set up the company remotely by power of attorney, no: no residence permit is required. However, to live in Portugal and run the activity there, the D2 visa (non-EU entrepreneur / self-employed) is required. Its 2026 conditions are indicative and to be confirmed: means of subsistence of the order of the Portuguese minimum wage, proof of deposit / savings, a credible business plan.",
      },
      {
        q: "Can I freely transfer funds or currency to Portugal?",
        a: "Not freely if you are a Moroccan resident: the transfer of currency and the holding of assets abroad are framed by the Office des Changes, with authorisations or limits depending on the operation. The regime is gradually liberalising (2026 reform, « controlled liberalisation »), but restrictions remain for residents. MREs enjoy far greater freedom. No amount is guaranteed here: to date and verify with a professional.",
      },
      {
        q: "Is remote set-up really possible?",
        a: "Yes. Through a non-resident NIF obtained via a tax representative and a power of attorney, the company can be registered in Portugal without travelling. It remains to frame, in parallel, exchange control (if you are a resident) and, if you plan to settle, the D2 visa. Accounting is then handled by a partner Contabilista Certificado.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting, tax or exchange-regulation advice. The existence and date of a Morocco-Portugal double-taxation treaty are to be confirmed: no date is published here. The exchange-control rules (Office des Changes, General Instruction on Foreign Exchange Operations) are evolving — a controlled liberalisation is announced for 2026 — and must be dated then verified case by case. The D2 visa conditions (income of the order of the Portuguese minimum wage, deposit of means of subsistence, business plan) are indicative for 2026 and to be confirmed. All these points must be validated with a professional (tax adviser, exchange-control adviser, lawyer). Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: we guide you and connect you with the right partner. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from Morocco",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your Portuguese incorporation and, above all, your situation regarding exchange control and the visa. If a tax adviser or an exchange-control adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbHub: "Setting up from abroad",
    breadcrumbCurrent: "From Morocco",
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

export default async function DepuisMarocPage({ params }: Props) {
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
