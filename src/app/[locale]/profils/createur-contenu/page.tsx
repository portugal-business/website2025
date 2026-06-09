import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/profils/createur-contenu";
const CREATION_PATH = "/creation-societe";
const COMPTA_PATH = "/services/comptabilite";
const COMPARATIF_PATH = "/comparatifs/statuts-lda-eni-unipessoal";
const FAQ_PATH = "/faq";

type Props = { params: Promise<{ locale: string }> };

type Topic = {
  term: string;
  value: string;
  href?: string;
  linkLabel?: string;
};
type DecisionRow = { criterion: string; recibos: string; lda: string };
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
  honestyPoints: string[];

  declareEyebrow: string;
  declareTitle: string;
  declareSubtitle: string;
  declareBody: string;
  declareTopics: Topic[];

  decisionEyebrow: string;
  decisionTitle: string;
  decisionSubtitle: string;
  decisionColRecibos: string;
  decisionColLda: string;
  decisionColCriterion: string;
  decisionRows: DecisionRow[];
  decisionFootnote: string;
  decisionLinkLabel: string;

  simplifiedEyebrow: string;
  simplifiedTitle: string;
  simplifiedSubtitle: string;
  simplifiedSteps: Step[];

  motEyebrow: string;
  motTitle: string;
  motBody: string;
  motPoints: { wrong: string; right: string }[];

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
  breadcrumbProfils: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Créateurs de contenu au Portugal : déclarer YouTube, Twitch & sponsoring en 2026",
    metaDesc:
      "YouTubeurs, streamers et influenceurs : comment déclarer vos revenus AdSense, Twitch, sponsoring et affiliation au Portugal en 2026. Recibos verdes ou Unipessoal Lda ? On cadre votre situation et on coordonne le bon partenaire. Premier échange gratuit.",
    eyebrow: "Profil · Créateurs de contenu",
    title: "YouTubeurs, streamers & influenceurs :",
    titleAccent: "installer et déclarer votre activité au Portugal",
    lead: "Vous vivez de YouTube, Twitch, du sponsoring ou de l'affiliation, et vous envisagez le Portugal ? Je suis consultante en création et implantation d'entreprise. Je cadre votre projet, je vous explique en terminologie portugaise exacte comment déclarer vos revenus de plateformes internationales, je crée votre structure (Trabalhador Independente ou Unipessoal Lda) et je vous mets en relation avec un Contabilista Certificado partenaire pour la comptabilité et la fiscalité.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir comment déclarer",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    honestyEyebrow: "Ce que je fais pour vous",
    honestyPoints: [
      "Je cadre votre activité de créateur et le statut adapté à votre volume",
      "Je vous explique catégorie B, recibos verdes et revenus mondiaux, sans jargon",
      "Je crée votre Trabalhador Independente ou votre Unipessoal Lda",
      "Je vous mets en relation avec un Contabilista Certificado partenaire pour la compta",
    ],

    declareEyebrow: "Déclarer ses revenus",
    declareTitle: "YouTube, Twitch, sponsoring : comment ça se déclare au Portugal",
    declareSubtitle:
      "Un repère honnête sur le cadre 2026, en terminologie portugaise. Ce sont des grands principes, pas une analyse de votre cas : le chiffrage précis relève du Contabilista Certificado partenaire.",
    declareBody:
      "AdSense, abonnements Twitch, dons, sponsoring de marques, affiliation : pour un résident fiscal au Portugal, ces revenus relèvent en principe de la catégorie B (revenus d'activité indépendante) et se déclarent via les recibos verdes, le système de facturation des Trabalhadores Independentes. Point essentiel et souvent mal compris : un résident fiscal portugais est imposé sur ses revenus mondiaux. Les versements de plateformes internationales (Google Irlande, Twitch, régies de pub, plateformes d'affiliation hors Portugal) entrent dans l'assiette portugaise, même s'ils arrivent en devises ou sur un compte étranger.",
    declareTopics: [
      {
        term: "Revenus catégorie B",
        value:
          "AdSense, Twitch, sponsoring, affiliation, ventes de formations : ce sont des revenus d'activité indépendante (catégorie B de l'IRS). Vous facturez via les recibos verdes en tant que Trabalhador Independente, ou via votre Unipessoal Lda si vous êtes en société.",
      },
      {
        term: "Recibos verdes",
        value:
          "Le « reçu vert » électronique émis sur le Portal das Finanças à chaque encaissement. C'est l'outil de facturation du Trabalhador Independente : chaque paiement de plateforme ou de marque y est tracé, avec la retenue et l'IVA quand elles s'appliquent.",
      },
      {
        term: "Revenus mondiaux",
        value:
          "Une fois résident fiscal au Portugal, vos revenus mondiaux y sont imposables, pas seulement ce qui vient du Portugal. Un paiement AdSense versé depuis l'Irlande ou un sponsoring d'une marque française restent à déclarer au Portugal.",
      },
      {
        term: "NIF et début d'activité",
        value:
          "Avant de facturer, il faut un NIF (numéro fiscal du particulier) et l'ouverture de l'activité indépendante auprès des Finanças, avec le bon code d'activité (CAE / CIRS). C'est l'une des premières étapes que je coordonne avec vous.",
      },
      {
        term: "IVA et clients étrangers",
        value:
          "L'IVA (TVA portugaise, taux standard 23 %) dépend de la nature et de la localisation de vos clients. Les règles diffèrent pour un sponsor UE, une plateforme hors UE ou un client particulier. Les modalités précises sont établies avec le Contabilista Certificado partenaire.",
        href: COMPTA_PATH,
        linkLabel: "Voir la comptabilité partenaire",
      },
    ],

    decisionEyebrow: "Le bon statut",
    decisionTitle: "Recibos verdes ou Unipessoal Lda ?",
    decisionSubtitle:
      "Beaucoup de créateurs démarrent en Trabalhador Independente (recibos verdes) et basculent en Unipessoal Lda quand le volume, la protection du patrimoine ou l'image l'imposent. Voici les critères qui font pencher d'un côté ou de l'autre.",
    decisionColCriterion: "Critère",
    decisionColRecibos: "Recibos verdes (Trabalhador Independente)",
    decisionColLda: "Unipessoal Lda (société)",
    decisionRows: [
      {
        criterion: "Démarrage / lancement",
        recibos: "Simple et rapide : ouverture d'activité aux Finanças, vous facturez aussitôt.",
        lda: "Création d'une société : statuts, NIPC, gérance. Plus structurant dès le départ.",
      },
      {
        criterion: "Volume de revenus",
        recibos: "Adapté tant que le chiffre d'affaires reste modéré.",
        lda: "Pertinent quand le CA monte et que la fiscalité d'une société devient plus avantageuse.",
      },
      {
        criterion: "Protection du patrimoine",
        recibos: "Pas de séparation : vous répondez sur votre patrimoine personnel.",
        lda: "Responsabilité limitée au capital social (1 € minimum/associé) : votre patrimoine personnel est distingué.",
      },
      {
        criterion: "Image / crédibilité",
        recibos: "Statut d'indépendant, suffisant pour beaucoup de partenariats.",
        lda: "Une société rassure certaines marques, régies et annonceurs sur les contrats importants.",
      },
      {
        criterion: "Comptabilité",
        recibos: "Régime simplifié possible sous seuil ; obligations allégées.",
        lda: "Comptabilité organisée avec un Contabilista Certificado : plus d'obligations, plus de leviers.",
      },
      {
        criterion: "Quand basculer",
        recibos: "Tant que l'activité est jeune et le risque limité.",
        lda: "Quand le volume grimpe, que vous embauchez, ou que vous voulez protéger votre patrimoine.",
      },
    ],
    decisionFootnote:
      "Aucune règle universelle : le bon choix dépend de votre chiffre d'affaires, de vos charges, de vos projets et de votre tolérance au risque. On en parle au diagnostic, et le chiffrage fiscal est confirmé par le Contabilista Certificado partenaire.",
    decisionLinkLabel: "Comparer Lda, ENI & Unipessoal Lda",

    simplifiedEyebrow: "Régime simplifié & coefficient",
    simplifiedTitle: "Comment l'IRS s'applique à vos revenus de créateur",
    simplifiedSubtitle:
      "Le régime simplifié de l'IRS concerne la plupart des Trabalhadores Independentes sous un seuil de chiffre d'affaires. Au-delà, c'est la comptabilité organisée. Voici les repères, à confirmer avec le partenaire.",
    simplifiedSteps: [
      {
        title: "Régime simplifié (CA < 200 000 €)",
        description:
          "Sous ce seuil de chiffre d'affaires, l'imposition se calcule sur une fraction de vos recettes via un coefficient, sans tenue de comptabilité complète. C'est le régime le plus courant pour démarrer.",
      },
      {
        title: "Le coefficient de services (~0,75)",
        description:
          "Pour une prestation de services, l'administration retient en principe un coefficient d'environ 0,75 : seule cette part des recettes est intégrée au revenu imposable, le reste étant réputé couvrir les charges. Le coefficient exact dépend de l'activité déclarée.",
      },
      {
        title: "Au-delà du seuil : comptabilité organisée",
        description:
          "Si le chiffre d'affaires dépasse le plafond du régime simplifié, vous passez en comptabilité organisée : un Contabilista Certificado tient les comptes et le résultat imposable se calcule sur les recettes diminuées des charges réelles.",
      },
      {
        title: "Retenue à la source & acomptes",
        description:
          "Selon vos clients et votre situation, des retenues à la source et des acomptes d'IRS peuvent s'appliquer. Le suivi de ces obligations est l'un des rôles du Contabilista Certificado partenaire.",
      },
    ],

    motEyebrow: "Le bon mot",
    motTitle: "Parler portugais, pas franco-français",
    motBody:
      "La moitié des erreurs vient du vocabulaire. Au Portugal, on ne dit pas « auto-entrepreneur » ni « expert-comptable » : les termes ont un sens juridique précis. Utiliser le bon mot vous évite de chercher un statut qui n'existe pas et de mal interpréter votre situation.",
    motPoints: [
      {
        wrong: "Auto-entrepreneur / micro-entreprise",
        right: "Trabalhador Independente (recibos verdes)",
      },
      { wrong: "EURL / SARL unipersonnelle", right: "Unipessoal Lda" },
      { wrong: "Expert-comptable", right: "Contabilista Certificado (inscrit à l'OCC)" },
      { wrong: "Numéro fiscal / SIRET", right: "NIF (particulier) · NIPC (société)" },
      { wrong: "TVA / impôt sur les sociétés", right: "IVA · IRC · IRS" },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce qu'on me demande quand on est créateur",
    faq: [
      {
        q: "Mes revenus YouTube et Twitch versés depuis l'étranger sont-ils imposables au Portugal ?",
        a: "Oui, en principe. Une fois résident fiscal au Portugal, vous êtes imposé sur vos revenus mondiaux : les paiements AdSense (Google Irlande), les abonnements et dons Twitch, le sponsoring de marques étrangères et l'affiliation entrent dans l'assiette portugaise, même versés en devises ou sur un compte étranger. La déclaration se fait via les recibos verdes en catégorie B. Le chiffrage relève du Contabilista Certificado partenaire.",
      },
      {
        q: "Recibos verdes ou Unipessoal Lda : que choisir pour démarrer ?",
        a: "Beaucoup de créateurs démarrent en Trabalhador Independente (recibos verdes), simple et rapide, puis basculent en Unipessoal Lda quand le volume grimpe, qu'ils veulent protéger leur patrimoine ou renforcer leur image auprès des marques. Il n'y a pas de réponse unique : on regarde votre chiffre d'affaires, vos charges et vos projets au diagnostic, et le volet fiscal est confirmé par le partenaire.",
      },
      {
        q: "Comment fonctionne le régime simplifié de l'IRS pour un créateur ?",
        a: "Sous un seuil de chiffre d'affaires (200 000 €), le Trabalhador Independente peut relever du régime simplifié : l'impôt se calcule sur une fraction des recettes via un coefficient (de l'ordre de 0,75 pour une prestation de services), sans comptabilité complète. Au-delà du seuil, on passe en comptabilité organisée avec un Contabilista Certificado. Le coefficient exact dépend de l'activité déclarée.",
      },
      {
        q: "Faut-il créer une société pour vivre de la création de contenu au Portugal ?",
        a: "Non, ce n'est pas obligatoire. On peut tout à fait exercer en Trabalhador Independente avec recibos verdes. La société (Unipessoal Lda) devient intéressante avec le volume, la volonté de protéger son patrimoine personnel ou l'image vis-à-vis des annonceurs. C'est une décision à prendre au cas par cas.",
      },
      {
        q: "Le sponsoring d'une marque française se déclare-t-il en France ou au Portugal ?",
        a: "Si vous êtes résident fiscal au Portugal, ce revenu est en principe à déclarer au Portugal, au titre de vos revenus mondiaux, via les recibos verdes. La convention fiscale France-Portugal de 1971 et votre résidence fiscale déterminent la répartition exacte : c'est un point à valider avec le partenaire. Cette page ne remplace pas un conseil personnalisé.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Business Portugal n'est pas un cabinet comptable ou fiscal : la comptabilité et la fiscalité sont assurées par un Contabilista Certificado partenaire inscrit à l'OCC. Les chiffres cités (coefficients, seuils, IVA à 23 %) sont à jour en 2026 et susceptibles d'évoluer à chaque Loi de Finances (Orçamento do Estado). Votre situation dépend de votre cas individuel, de votre résidence fiscale et de la convention France-Portugal de 1971. Pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Posons les bases de votre activité de créateur",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre situation : recibos verdes ou Unipessoal Lda, déclaration de vos revenus de plateformes, mise en relation avec le Contabilista Certificado partenaire. On regarde votre cas, on choisit le bon statut, on avance ensemble.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Création & coordination · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbProfils: "Profils",
    breadcrumbCurrent: "Créateurs de contenu",
    serviceName: "Accompagnement des créateurs de contenu au Portugal",
  },
  en: {
    metaTitle: "Content creators in Portugal: declaring YouTube, Twitch & sponsorship in 2026",
    metaDesc:
      "YouTubers, streamers and influencers: how to declare your AdSense, Twitch, sponsorship and affiliate income in Portugal in 2026. Recibos verdes or Unipessoal Lda? We frame your situation and coordinate the right partner. First conversation free.",
    eyebrow: "Profile · Content creators",
    title: "YouTubers, streamers & influencers:",
    titleAccent: "set up and declare your activity in Portugal",
    lead: "You make a living from YouTube, Twitch, sponsorship or affiliate marketing, and you're considering Portugal? I am a consultant in company formation and setup. I frame your project, explain in accurate Portuguese terminology how to declare your income from international platforms, set up your structure (Trabalhador Independente or Unipessoal Lda) and connect you with a partner Contabilista Certificado for accounting and taxation.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See how to declare",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    honestyEyebrow: "What I do for you",
    honestyPoints: [
      "I frame your creator activity and the status suited to your volume",
      "I explain category B, recibos verdes and worldwide income, without jargon",
      "I set up your Trabalhador Independente or your Unipessoal Lda",
      "I connect you with a partner Contabilista Certificado for the accounting",
    ],

    declareEyebrow: "Declaring your income",
    declareTitle: "YouTube, Twitch, sponsorship: how it's declared in Portugal",
    declareSubtitle:
      "An honest overview of the 2026 framework, in Portuguese terminology. These are broad principles, not an analysis of your case: the precise figures fall to the partner Contabilista Certificado.",
    declareBody:
      "AdSense, Twitch subscriptions, donations, brand sponsorship, affiliate marketing: for a Portuguese tax resident, this income falls in principle under category B (self-employment income) and is declared through the recibos verdes, the invoicing system for Trabalhadores Independentes. A key, often misunderstood point: a Portuguese tax resident is taxed on worldwide income. Payments from international platforms (Google Ireland, Twitch, ad networks, non-Portuguese affiliate platforms) fall within the Portuguese tax base, even if received in foreign currency or into a foreign account.",
    declareTopics: [
      {
        term: "Category B income",
        value:
          "AdSense, Twitch, sponsorship, affiliate marketing, course sales: this is self-employment income (IRS category B). You invoice through the recibos verdes as a Trabalhador Independente, or through your Unipessoal Lda if you operate as a company.",
      },
      {
        term: "Recibos verdes",
        value:
          "The electronic “green receipt” issued on the Portal das Finanças for each payment received. It is the invoicing tool of the Trabalhador Independente: each platform or brand payment is recorded there, with withholding and IVA where they apply.",
      },
      {
        term: "Worldwide income",
        value:
          "Once you are a Portuguese tax resident, your worldwide income is taxable there, not only what comes from Portugal. An AdSense payment from Ireland or a sponsorship from a French brand must still be declared in Portugal.",
      },
      {
        term: "NIF and starting activity",
        value:
          "Before invoicing, you need a NIF (individual tax number) and to open self-employed activity with the Finanças, under the correct activity code (CAE / CIRS). It is one of the first steps I coordinate with you.",
      },
      {
        term: "IVA and foreign clients",
        value:
          "IVA (Portuguese VAT, standard rate 23%) depends on the nature and location of your clients. The rules differ for an EU sponsor, a non-EU platform or a private client. The precise terms are set with the partner Contabilista Certificado.",
        href: COMPTA_PATH,
        linkLabel: "See partner accounting",
      },
    ],

    decisionEyebrow: "The right status",
    decisionTitle: "Recibos verdes or Unipessoal Lda?",
    decisionSubtitle:
      "Many creators start as a Trabalhador Independente (recibos verdes) and switch to a Unipessoal Lda when volume, asset protection or image call for it. Here are the criteria that tip the balance one way or the other.",
    decisionColCriterion: "Criterion",
    decisionColRecibos: "Recibos verdes (Trabalhador Independente)",
    decisionColLda: "Unipessoal Lda (company)",
    decisionRows: [
      {
        criterion: "Getting started",
        recibos: "Simple and fast: open activity with the Finanças, you invoice straight away.",
        lda: "Forming a company: articles, NIPC, management. More structured from the outset.",
      },
      {
        criterion: "Income volume",
        recibos: "Suitable as long as turnover stays moderate.",
        lda: "Relevant as turnover rises and company taxation becomes more advantageous.",
      },
      {
        criterion: "Asset protection",
        recibos: "No separation: you are liable on your personal assets.",
        lda: "Liability limited to the share capital (€1 minimum per shareholder): your personal assets are kept separate.",
      },
      {
        criterion: "Image / credibility",
        recibos: "Self-employed status, sufficient for many partnerships.",
        lda: "A company reassures some brands, networks and advertisers on major contracts.",
      },
      {
        criterion: "Accounting",
        recibos: "Simplified regime possible below a threshold; lighter obligations.",
        lda: "Organised accounting with a Contabilista Certificado: more obligations, more levers.",
      },
      {
        criterion: "When to switch",
        recibos: "While the activity is young and risk is limited.",
        lda: "When volume climbs, you hire, or you want to protect your personal assets.",
      },
    ],
    decisionFootnote:
      "No universal rule: the right choice depends on your turnover, your costs, your plans and your risk tolerance. We discuss it at the assessment, and the tax figures are confirmed by the partner Contabilista Certificado.",
    decisionLinkLabel: "Compare Lda, ENI & Unipessoal Lda",

    simplifiedEyebrow: "Simplified regime & coefficient",
    simplifiedTitle: "How IRS applies to your creator income",
    simplifiedSubtitle:
      "The simplified IRS regime applies to most Trabalhadores Independentes below a turnover threshold. Above it, organised accounting applies. Here are the markers, to confirm with the partner.",
    simplifiedSteps: [
      {
        title: "Simplified regime (turnover < €200,000)",
        description:
          "Below this turnover threshold, taxation is calculated on a fraction of your revenue via a coefficient, without full bookkeeping. It is the most common regime to start with.",
      },
      {
        title: "The services coefficient (~0.75)",
        description:
          "For a service, the tax authority generally applies a coefficient of around 0.75: only that share of revenue is included in taxable income, the rest being deemed to cover expenses. The exact coefficient depends on the declared activity.",
      },
      {
        title: "Above the threshold: organised accounting",
        description:
          "If turnover exceeds the simplified-regime ceiling, you move to organised accounting: a Contabilista Certificado keeps the books and taxable profit is computed on revenue less actual expenses.",
      },
      {
        title: "Withholding & instalments",
        description:
          "Depending on your clients and situation, withholding at source and IRS instalments may apply. Tracking these obligations is one of the roles of the partner Contabilista Certificado.",
      },
    ],

    motEyebrow: "The right word",
    motTitle: "Speak Portuguese, not Franco-French",
    motBody:
      "Half the mistakes come from vocabulary. In Portugal, there is no “auto-entrepreneur” or “expert-comptable”: the terms have a precise legal meaning. Using the right word stops you chasing a status that doesn't exist and misreading your situation.",
    motPoints: [
      {
        wrong: "Auto-entrepreneur / micro-enterprise",
        right: "Trabalhador Independente (recibos verdes)",
      },
      { wrong: "Single-member LLC", right: "Unipessoal Lda" },
      {
        wrong: "Chartered accountant",
        right: "Contabilista Certificado (registered with the OCC)",
      },
      { wrong: "Tax number / company registration", right: "NIF (individual) · NIPC (company)" },
      { wrong: "VAT / corporate tax", right: "IVA · IRC · IRS" },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What creators ask me",
    faq: [
      {
        q: "Is my YouTube and Twitch income paid from abroad taxable in Portugal?",
        a: "Yes, in principle. Once you are a Portuguese tax resident, you are taxed on your worldwide income: AdSense payments (Google Ireland), Twitch subscriptions and donations, sponsorship from foreign brands and affiliate income all fall within the Portuguese tax base, even when received in foreign currency or into a foreign account. It is declared through the recibos verdes under category B. The figures fall to the partner Contabilista Certificado.",
      },
      {
        q: "Recibos verdes or Unipessoal Lda: which to choose to start?",
        a: "Many creators start as a Trabalhador Independente (recibos verdes), which is simple and fast, then switch to a Unipessoal Lda when volume climbs, they want to protect their assets, or strengthen their image with brands. There is no single answer: we look at your turnover, your costs and your plans at the assessment, and the tax side is confirmed by the partner.",
      },
      {
        q: "How does the simplified IRS regime work for a creator?",
        a: "Below a turnover threshold (€200,000), the Trabalhador Independente can fall under the simplified regime: tax is calculated on a fraction of revenue via a coefficient (around 0.75 for a service), without full bookkeeping. Above the threshold, you move to organised accounting with a Contabilista Certificado. The exact coefficient depends on the declared activity.",
      },
      {
        q: "Do I need to form a company to make a living from content creation in Portugal?",
        a: "No, it is not mandatory. You can perfectly well operate as a Trabalhador Independente with recibos verdes. A company (Unipessoal Lda) becomes attractive with volume, the wish to protect your personal assets or your image with advertisers. It is a case-by-case decision.",
      },
      {
        q: "Is sponsorship from a French brand declared in France or in Portugal?",
        a: "If you are a Portuguese tax resident, this income is in principle to be declared in Portugal, as part of your worldwide income, through the recibos verdes. The 1971 France-Portugal tax treaty and your tax residence determine the exact allocation: this is a point to validate with the partner. This page does not replace personalised advice.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Business Portugal is not an accounting or tax practice: accounting and taxation are handled by a partner Contabilista Certificado registered with the OCC. The figures quoted (coefficients, thresholds, IVA at 23%) are current as of 2026 and subject to change with each Finance Act (Orçamento do Estado). Your situation depends on your individual case, your tax residence and the 1971 France-Portugal treaty. For an analysis of your project, book a meeting.",

    ctaTitle: "Let's set up your creator activity",
    ctaBody:
      "A first free conversation, with no commitment, to frame your situation: recibos verdes or Unipessoal Lda, declaring your platform income, an introduction to the partner Contabilista Certificado. We look at your case, choose the right status, and move forward together.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Setup & coordination · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbProfils: "Profiles",
    breadcrumbCurrent: "Content creators",
    serviceName: "Support for content creators in Portugal",
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

export default async function CreateurContenuPage({ params }: Props) {
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
    audience: {
      "@type": "Audience",
      audienceType:
        locale === "en"
          ? "YouTubers, streamers and influencers"
          : "YouTubeurs, streamers et influenceurs",
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
      {
        "@type": "ListItem",
        position: 1,
        name: c.breadcrumbHome,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbProfils,
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
                  href="#declarer"
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

      {/* Déclarer ses revenus YouTube/Twitch/sponsoring */}
      <section id="declarer" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.declareEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.declareTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.declareSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.declareBody}</p>
              </Reveal>
              <dl className="mt-10 border-t border-border">
                {c.declareTopics.map((t, i) => (
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

      {/* Recibos verdes ou Unipessoal Lda ?, tableau de décision */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.decisionEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.decisionTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.decisionSubtitle}
                </p>
                <Link
                  href={COMPARATIF_PATH}
                  className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                >
                  {c.decisionLinkLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
                  {/* En-tête de tableau */}
                  <div className="bg-card p-4 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.decisionColCriterion}
                  </div>
                  <div className="bg-card p-4 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.decisionColRecibos}
                  </div>
                  <div className="bg-card p-4 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.decisionColLda}
                  </div>
                  {/* Lignes */}
                  {c.decisionRows.map((row) => (
                    <div key={row.criterion} className="contents">
                      <div className="bg-card p-4 font-serif text-base leading-snug">
                        {row.criterion}
                      </div>
                      <div className="bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                        {row.recibos}
                      </div>
                      <div className="bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                        {row.lda}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.decisionFootnote}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Régime simplifié & coefficient */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.simplifiedEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.simplifiedTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.simplifiedSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.simplifiedSteps.map((s, i) => (
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
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.motEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.motTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.motBody}</p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="border border-border bg-card">
                  <div className="rule-brass" />
                  <dl className="divide-y divide-border">
                    {c.motPoints.map((p) => (
                      <div key={p.right} className="grid gap-2 px-6 py-5 sm:grid-cols-2 sm:gap-8">
                        <dt className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground line-through decoration-border">
                          {p.wrong}
                        </dt>
                        <dd className="flex items-baseline gap-2 font-serif text-base">
                          <span
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                            aria-hidden
                          />
                          <span>{p.right}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-card">
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
                  {locale === "en" ? "See all questions" : "Voir toutes les questions"}
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
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
              >
                {c.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={CREATION_PATH}
                className="font-sans text-xs uppercase tracking-[0.14em] text-primary-foreground underline-offset-[6px] hover:underline"
              >
                {locale === "en" ? "Company formation" : "Création de société"}
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
