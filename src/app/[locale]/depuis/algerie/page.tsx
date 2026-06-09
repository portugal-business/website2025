import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type SpokeCopy, SpokePage } from "@/components/seo/spoke-page";
import { languagesFor, ogLocaleFor, urlFor } from "@/lib/site";

// Spoke « créer au Portugal depuis l'Algérie » (branche MAGHREB, non-UE).
// Logique RADICALEMENT différente de l'Europe : pas de CFC / taxe Caïman / ATAD.
// Le vrai obstacle = le CONTRÔLE DES CHANGES algérien (règlement 07-01) + le visa
// de résidence D2 pour vivre/diriger au Portugal. Aucune date de convention publiée
// (existence même à confirmer). Chiffres visa indicatifs 2026, à valider fiscaliste.
const PATH = "/depuis/algerie";
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

const COPY: { fr: SpokeCopy; en: SpokeCopy } = {
  fr: {
    metaTitle:
      "Créer sa société au Portugal depuis l'Algérie : visa D2 et contrôle des changes (2026)",
    metaDesc:
      "Ressortissant algérien ? Créer une société au Portugal à distance est possible, mais le sujet décisif n'est pas la fiscalité portugaise : c'est le contrôle des changes algérien et le visa de résidence D2. Repères 2026 à valider avec un professionnel. Service en français.",
    countryName: "Algérie",

    eyebrow: "Depuis l'Algérie · À distance",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis l'Algérie",
    lead: "Vous êtes ressortissant algérien et vous envisagez une société au Portugal ? La société peut se créer à distance, en français. Mais le sujet décisif n'est pas la fiscalité portugaise : ce sont le contrôle des changes algérien (détenir une société et transférer des devises à l'étranger est très encadré) et, si vous voulez vivre et diriger au Portugal, le visa de résidence D2. Voici les repères, à valider avec un professionnel avant toute démarche.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le vrai obstacle",
    trust: "Entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    conventionEyebrow: "Double imposition",
    conventionTitle: "Convention Algérie-Portugal",
    conventionDate:
      "Convention de non-double imposition Algérie-Portugal : existence et date à confirmer",
    conventionConfidence: "Niveau de confiance : à vérifier (ne pas s'y fier sans validation)",
    conventionBody: [
      "L'existence même d'une convention de non-double imposition entre l'Algérie et le Portugal doit être confirmée, et nous ne publions ici aucune date : ce point doit être vérifié au cas par cas avec un professionnel, pas présumé.",
      "Surtout, la convention n'est pas le vrai préalable de votre projet. Avant la fiscalité, deux sujets priment : le visa de résidence si vous voulez vivre et diriger au Portugal, et le contrôle des changes algérien, qui encadre fortement la détention d'avoirs et le transfert de devises à l'étranger par un résident.",
    ],

    riskEyebrow: "À lire avant tout",
    riskTitle: "Le vrai obstacle n'est pas portugais : c'est le contrôle des changes",
    riskBody: [
      "Le sujet décisif n'est pas la fiscalité portugaise (il n'y a pas ici de « société étrangère contrôlée » ni de dispositif type taxe Caïman ou ATAD). Le point bloquant central, c'est le contrôle des changes algérien : la détention d'avoirs et de sociétés à l'étranger, ainsi que le transfert de devises par un résident algérien, sont très strictement encadrés et largement restreints.",
      "Le principe (règlement 07-01 de la Banque d'Algérie et textes connexes) repose sur un régime d'encadrement et d'autorisation : un résident ne peut pas librement constituer, financer ou détenir une société à l'étranger ni transférer des devises sans respecter les procédures applicables. Nous ne publions pas de plafonds chiffrés : la situation est évolutive et doit être datée et vérifiée avec un professionnel avant toute opération.",
    ],
    riskBullets: [
      "Le principe est l'encadrement et l'autorisation : pour un résident algérien, transférer des devises et détenir des avoirs à l'étranger n'est pas libre et obéit à des procédures à vérifier au cas par cas.",
      "La distinction résident / non-résident est déterminante : un non-résident (par exemple un ressortissant algérien installé à l'étranger) n'est pas soumis aux mêmes contraintes de change qu'un résident en Algérie.",
      "La résidence fiscale algérienne s'apprécie selon le droit algérien : créer une société au Portugal ne change pas, à lui seul, votre statut de résident algérien.",
      "Nous ne donnons aucun plafond ni montant comme certain : la réglementation des changes est évolutive et doit être validée avec un professionnel avant toute démarche.",
    ],

    factsEyebrow: "Les repères algériens",
    factsTitle: "Résidence, visa et change, en bref",
    facts: [
      {
        term: "Résidence fiscale algérienne",
        value:
          "Elle s'apprécie selon le droit algérien : créer une société au Portugal ne modifie pas, à lui seul, votre statut de résident en Algérie. Tant que vous restez résident algérien, vous restez soumis à vos obligations locales.",
      },
      {
        term: "Visa de résidence D2 (Portugal)",
        value:
          "Visa de résidence pour entrepreneur ou indépendant non-UE souhaitant vivre et diriger son activité au Portugal. Conditions indicatives 2026 à confirmer : moyens de subsistance de l'ordre du salaire minimum portugais, justificatif de dépôt ou d'épargne, plan d'affaires crédible. La société peut être créée avant l'installation.",
      },
      {
        term: "Spécificité : le contrôle des changes",
        value:
          "Pour un résident algérien, détenir une société et des comptes à l'étranger et transférer des devises est très encadré et largement restreint (principe d'autorisation, règlement 07-01). C'est le point à clarifier en priorité, avant la fiscalité.",
      },
      {
        term: "Résident vs non-résident",
        value:
          "Le statut change tout : les contraintes de change visent d'abord le résident algérien. Un ressortissant déjà installé hors d'Algérie, et considéré comme non-résident, n'est pas dans la même situation. Ce point doit être validé avec un professionnel.",
      },
    ],

    remoteEyebrow: "Votre parcours",
    remoteTitle: "Créer à distance depuis l'Algérie",
    remoteBody:
      "En tant que ressortissant d'un pays hors Union européenne, votre parcours combine des démarches portugaises (réalisables à distance) et, en parallèle, le respect de la réglementation algérienne des changes. La société peut se créer à distance ; vivre et diriger depuis le Portugal suppose en revanche un titre de séjour.",
    remoteSteps: [
      {
        term: "Obtenir le NIF non-résident",
        value:
          "Le NIF (numéro fiscal portugais du particulier) s'obtient pour un non-résident via un représentant fiscal au Portugal, sans déplacement. À ne pas confondre avec le NIPC, le numéro fiscal de la future société.",
      },
      {
        term: "Donner procuration",
        value:
          "Une procuration permet d'accomplir les formalités d'immatriculation en votre nom : la création de la société est donc possible à distance, avant toute installation au Portugal.",
      },
      {
        term: "Anticiper le visa D2 si vous voulez vivre et diriger au Portugal",
        value:
          "Si l'objectif est de vous installer et de diriger l'activité depuis le Portugal, le visa de résidence D2 est le préalable. Conditions indicatives 2026 (à confirmer) : moyens de subsistance de l'ordre du salaire minimum portugais, dépôt ou épargne justifiés, plan d'affaires.",
      },
      {
        term: "Cadrer le contrôle des changes et les autorisations",
        value:
          "Avant tout transfert de fonds ou financement de la société, faites vérifier votre situation au regard de la réglementation algérienne des changes (résident / non-résident, autorisations applicables). C'est l'étape à ne pas sauter, à valider avec un professionnel.",
      },
      {
        term: "Immatriculer et ouvrir le compte",
        value:
          "Immatriculation coordonnée (statuts, RCBE, Certidão Permanente, Segurança Social) puis ouverture du compte professionnel selon la banque et votre profil. La comptabilité est ensuite assurée par un Contabilista Certificado partenaire.",
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
        label: "Créer une société au Portugal",
        href: "/creation-societe",
        desc: "Les formes (ENI, Unipessoal Lda, Lda, SA), le capital à partir de 1 € et les étapes clés.",
      },
      {
        label: "Nos outils et simulateurs",
        href: "/outils",
        desc: "Des repères chiffrés pour préparer votre projet, sans engagement.",
      },
      {
        label: "Nous contacter",
        href: "/contact",
        desc: "Un premier échange en français pour cadrer votre situation algérienne et portugaise.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ressortissant algérien : ce qu'on me demande",
    faq: [
      {
        q: "Puis-je détenir une société au Portugal en restant résident algérien ?",
        a: "C'est juridiquement envisageable côté portugais et la société peut se créer à distance. Mais en tant que résident algérien, la détention d'avoirs et de sociétés à l'étranger est très encadrée par le contrôle des changes (principe d'autorisation, règlement 07-01) ; votre résidence fiscale s'apprécie selon le droit algérien. Ce point doit impérativement être validé avec un professionnel avant toute démarche.",
      },
      {
        q: "Ai-je besoin d'un visa pour créer ou diriger ma société ?",
        a: "Pour créer la société, non : elle peut être constituée à distance via procuration, sans visa. En revanche, pour vivre et diriger l'activité depuis le Portugal, un titre de séjour est nécessaire : le visa de résidence D2 vise les entrepreneurs et indépendants non-UE. Ses conditions (moyens de subsistance, épargne, plan d'affaires) sont indicatives 2026 et à confirmer.",
      },
      {
        q: "Comment transférer des fonds ou des devises vers le Portugal ?",
        a: "C'est le point le plus sensible. Pour un résident algérien, le transfert de devises et le financement d'une société à l'étranger sont très encadrés et soumis à autorisation au titre du contrôle des changes ; nous ne publions pas de plafonds, car la situation est évolutive. La distinction résident / non-résident est déterminante. À vérifier et dater avec un professionnel avant toute opération.",
      },
      {
        q: "La création à distance est-elle vraiment possible ?",
        a: "Oui, la création est possible à distance : NIF non-résident obtenu via un représentant fiscal, puis procuration pour réaliser l'immatriculation en votre nom. Vivre et diriger depuis le Portugal suppose en revanche un visa de résidence (type D2), et tout transfert de fonds doit respecter la réglementation algérienne des changes.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. L'existence et la date d'une éventuelle convention Algérie-Portugal sont à confirmer (aucune date n'est publiée ici), et les règles algériennes de contrôle des changes sont strictes et évolutives : elles doivent être datées et vérifiées avant toute décision. Les conditions du visa D2 (revenu requis de l'ordre du salaire minimum portugais, dépôt de moyens de subsistance, plan d'affaires) sont indicatives 2026 et à confirmer. Tous ces éléments sont à valider avec un professionnel. Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : nous vous orientons et vous mettons en relation avec le bon partenaire. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis l'Algérie",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création au Portugal et, surtout, votre situation algérienne (contrôle des changes, résidence, visa). Si un professionnel est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbHub: "Créer depuis l'étranger",
    breadcrumbCurrent: "Depuis l'Algérie",
  },
  en: {
    metaTitle: "Setting up a Portuguese company from Algeria: D2 visa and exchange controls (2026)",
    metaDesc:
      "Algerian national? Setting up a company in Portugal remotely is possible, but the decisive issue is not Portuguese taxation: it is Algeria's exchange controls and the D2 residence visa. 2026 markers to validate with a professional. Service in French.",
    countryName: "Algeria",

    eyebrow: "From Algeria · Remotely",
    title: "Set up your company in Portugal",
    titleAccent: "from Algeria",
    lead: "You are an Algerian national considering a company in Portugal? The company can be set up remotely, in French. But the decisive issue is not Portuguese taxation: it is Algeria's exchange controls (holding a company and transferring currency abroad is heavily restricted) and, if you want to live and run the business from Portugal, the D2 residence visa. Here are the markers, to validate with a professional before any step.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real obstacle",
    trust: "Entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    conventionEyebrow: "Double taxation",
    conventionTitle: "Algeria-Portugal treaty",
    conventionDate: "Algeria-Portugal double-taxation treaty: existence and date to be confirmed",
    conventionConfidence: "Confidence level: to be verified (do not rely on it without validation)",
    conventionBody: [
      "The very existence of a double-taxation treaty between Algeria and Portugal must be confirmed, and we publish no date here: this point must be verified case by case with a professional, not assumed.",
      "Above all, the treaty is not the real prerequisite of your project. Before taxation, two issues come first: the residence visa if you want to live and run the business in Portugal, and Algeria's exchange controls, which heavily restrict the holding of assets and the transfer of currency abroad by a resident.",
    ],

    riskEyebrow: "Read this first",
    riskTitle: "The real obstacle is not Portuguese: it is exchange controls",
    riskBody: [
      "The decisive issue is not Portuguese taxation (there is no « controlled foreign company » here, nor any Cayman-tax or ATAD-type device). The central blocking point is Algeria's exchange controls: holding assets and companies abroad, and transferring currency by an Algerian resident, are very strictly framed and largely restricted.",
      "The principle (Bank of Algeria regulation 07-01 and related texts) rests on a regime of framing and authorisation: a resident cannot freely set up, fund or hold a company abroad, nor transfer currency, without following the applicable procedures. We publish no figures or ceilings: the situation is evolving and must be dated and verified with a professional before any operation.",
    ],
    riskBullets: [
      "The principle is framing and authorisation: for an Algerian resident, transferring currency and holding assets abroad is not free and follows procedures to be checked case by case.",
      "The resident / non-resident distinction is decisive: a non-resident (for example an Algerian national settled abroad) is not subject to the same exchange constraints as a resident in Algeria.",
      "Algerian tax residence is assessed under Algerian law: setting up a company in Portugal does not, on its own, change your status as an Algerian resident.",
      "We give no ceiling or amount as certain: exchange-control rules are evolving and must be validated with a professional before any step.",
    ],

    factsEyebrow: "The Algerian markers",
    factsTitle: "Residence, visa and exchange controls, in brief",
    facts: [
      {
        term: "Algerian tax residence",
        value:
          "It is assessed under Algerian law: setting up a company in Portugal does not, on its own, change your status as a resident in Algeria. As long as you remain an Algerian resident, you remain subject to your local obligations.",
      },
      {
        term: "D2 residence visa (Portugal)",
        value:
          "A residence visa for a non-EU entrepreneur or self-employed person wishing to live and run their activity in Portugal. Indicative 2026 conditions, to be confirmed: means of subsistence of the order of the Portuguese minimum wage, proof of deposit or savings, a credible business plan. The company can be set up before relocation.",
      },
      {
        term: "Specificity: exchange controls",
        value:
          "For an Algerian resident, holding a company and accounts abroad and transferring currency is heavily framed and largely restricted (authorisation principle, regulation 07-01). It is the point to clarify first, before taxation.",
      },
      {
        term: "Resident vs non-resident",
        value:
          "Status changes everything: the exchange constraints primarily target the Algerian resident. A national already settled outside Algeria, and treated as non-resident, is not in the same situation. This point must be validated with a professional.",
      },
    ],

    remoteEyebrow: "Your process",
    remoteTitle: "Setting up remotely from Algeria",
    remoteBody:
      "As a national of a country outside the European Union, your process combines Portuguese formalities (doable remotely) and, in parallel, compliance with Algeria's exchange-control rules. The company can be set up remotely; living and running it from Portugal, however, requires a residence permit.",
    remoteSteps: [
      {
        term: "Obtain the non-resident NIF",
        value:
          "The NIF (individual Portuguese tax number) is obtained for a non-resident through a tax representative in Portugal, without travelling. Not to be confused with the NIPC, the future company's tax number.",
      },
      {
        term: "Grant a power of attorney",
        value:
          "A power of attorney allows the registration formalities to be carried out in your name: the company can therefore be set up remotely, before any relocation to Portugal.",
      },
      {
        term: "Anticipate the D2 visa if you want to live and run the business in Portugal",
        value:
          "If the goal is to settle and run the activity from Portugal, the D2 residence visa is the prerequisite. Indicative 2026 conditions (to be confirmed): means of subsistence of the order of the Portuguese minimum wage, evidenced deposit or savings, a business plan.",
      },
      {
        term: "Frame exchange controls and authorisations",
        value:
          "Before any transfer of funds or funding of the company, have your situation checked against Algeria's exchange-control rules (resident / non-resident, applicable authorisations). This is the step not to skip, to validate with a professional.",
      },
      {
        term: "Incorporate and open the account",
        value:
          "Coordinated incorporation (articles, RCBE, Certidão Permanente, Segurança Social) then opening the business account depending on the bank and your profile. Accounting is then handled by a partner Contabilista Certificado.",
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
        label: "Setting up a company in Portugal",
        href: "/creation-societe",
        desc: "The forms (ENI, Unipessoal Lda, Lda, SA), capital from €1 and the key steps.",
      },
      {
        label: "Our tools and simulators",
        href: "/outils",
        desc: "Figures to prepare your project, with no commitment.",
      },
      {
        label: "Contact us",
        href: "/contact",
        desc: "A first conversation in French to frame your Algerian and Portuguese situation.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Algerian national: what people ask me",
    faq: [
      {
        q: "Can I hold a company in Portugal while remaining an Algerian resident?",
        a: "It is legally conceivable on the Portuguese side, and the company can be set up remotely. But as an Algerian resident, holding assets and companies abroad is heavily framed by exchange controls (authorisation principle, regulation 07-01); your tax residence is assessed under Algerian law. This point must be validated with a professional before any step.",
      },
      {
        q: "Do I need a visa to set up or run my company?",
        a: "To set up the company, no: it can be incorporated remotely through a power of attorney, without a visa. However, to live and run the activity from Portugal, a residence permit is required: the D2 residence visa targets non-EU entrepreneurs and self-employed people. Its conditions (means of subsistence, savings, business plan) are indicative for 2026 and to be confirmed.",
      },
      {
        q: "How do I transfer funds or currency to Portugal?",
        a: "This is the most sensitive point. For an Algerian resident, transferring currency and funding a company abroad are heavily framed and subject to authorisation under exchange controls; we publish no ceilings, as the situation is evolving. The resident / non-resident distinction is decisive. To be verified and dated with a professional before any operation.",
      },
      {
        q: "Is setting up remotely really possible?",
        a: "Yes, setting up remotely is possible: a non-resident NIF obtained through a tax representative, then a power of attorney to carry out the registration in your name. Living and running the business from Portugal, however, requires a residence visa (D2 type), and any transfer of funds must comply with Algeria's exchange-control rules.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting or tax advice. The existence and date of any Algeria-Portugal treaty are to be confirmed (no date is published here), and Algeria's exchange-control rules are strict and evolving: they must be dated and verified before any decision. The D2 visa conditions (required income of the order of the Portuguese minimum wage, deposit of means of subsistence, business plan) are indicative for 2026 and to be confirmed. All these elements are to be validated with a professional. Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: we guide you and connect you with the right partner. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from Algeria",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your Portuguese incorporation and, above all, your Algerian situation (exchange controls, residence, visa). If a professional is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbHub: "Setting up from abroad",
    breadcrumbCurrent: "From Algeria",
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

export default async function DepuisAlgeriePage({ params }: Props) {
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
