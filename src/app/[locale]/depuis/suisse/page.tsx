import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type SpokeCopy, SpokePage } from "@/components/seo/spoke-page";
import { languagesFor, ogLocaleFor, urlFor } from "@/lib/site";

// Spoke « créer au Portugal depuis la Suisse ». Faits = SOCLE plan SEO/GEO,
// niveaux de confiance affichés, à valider par un fiscaliste avant mise en ligne.
const PATH = "/depuis/suisse";
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

const COPY: { fr: SpokeCopy; en: SpokeCopy } = {
  fr: {
    metaTitle:
      "Créer sa société au Portugal depuis la Suisse : convention, direction effective (2026)",
    metaDesc:
      "Résident suisse ? Créer une société au Portugal à distance, comprendre la convention suisse-portugaise et le risque de siège de direction effective. Le vrai risque n'est pas portugais, il est suisse. Service en français.",
    countryName: "Suisse",

    eyebrow: "Depuis la Suisse · À distance",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis la Suisse",
    lead: "Vous êtes résident suisse et vous envisagez une société au Portugal ? La création se fait à distance, en français. Mais le sujet décisif n'est pas portugais : c'est votre situation en Suisse (résidence, lieu de direction effective, double imposition) qui détermine si l'opération est saine ou risquée. Voici les repères, datés 2026, à valider avec un fiscaliste.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le vrai risque",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    conventionEyebrow: "Double imposition",
    conventionTitle: "Convention Suisse-Portugal",
    conventionDate: "Signée en 1974 (date exacte à confirmer)",
    conventionConfidence: "Niveau de confiance : moyen",
    conventionBody: [
      "Une convention préventive de la double imposition lie la Suisse et le Portugal. Elle répartit le droit d'imposer entre les deux États et prévoit les mécanismes pour éviter qu'un même revenu soit taxé deux fois.",
      "Sa date de signature (couramment indiquée comme 1974) et ses dispositions précises sont à confirmer au cas par cas : son application dépend de votre résidence réelle et de la nature de vos revenus.",
    ],

    riskEyebrow: "À lire avant tout",
    riskTitle: "Le vrai risque n'est pas au Portugal, il est en Suisse",
    riskBody: [
      "Si vous restez résident fiscal suisse, créer une société au Portugal ne vous sort pas du champ de l'impôt suisse. La Suisse n'applique pas de régime de type CFC (taxation par transparence des sociétés étrangères contrôlées) comparable à celui de pays voisins — ce point reste toutefois à confirmer selon votre situation.",
      "Le vrai risque est ailleurs : le lieu de direction effective. Une société portugaise réellement administrée et dirigée depuis la Suisse peut y être considérée comme y ayant son siège de direction effective et, à ce titre, devenir assujettie de façon illimitée à l'impôt en Suisse (loi fédérale sur l'impôt fédéral direct, LIFD). C'est le point le plus déterminant pour un résident suisse.",
    ],
    riskBullets: [
      "Pas de régime CFC classique en Suisse [confiance moyenne] : ce n'est donc pas l'angle principal, mais cela ne dispense d'aucune analyse.",
      "Siège de direction effective [confiance élevée] : une société portugaise pilotée depuis la Suisse peut y être assujettie de façon illimitée (LIFD). C'est le risque dominant à anticiper.",
      "La seule façon saine de relever de la fiscalité portugaise est d'y transférer réellement sa direction, sa résidence et son activité, avec une substance réelle.",
      "Aucune adresse ni coquille ne remplace une présence réelle : c'est la réalité économique et le lieu des décisions qui sont regardés.",
    ],

    factsEyebrow: "Les repères suisses",
    factsTitle: "Résidence et spécificité, en bref",
    facts: [
      {
        term: "Critère de résidence fiscale suisse",
        value:
          "Vous êtes résident fiscal suisse si vous y avez votre domicile ou un séjour durable (LIFD) — auquel cas vous êtes en principe assujetti de façon illimitée à l'impôt en Suisse, sur vos revenus.",
      },
      {
        term: "Spécificité : le siège de direction effective",
        value:
          "Le critère décisif pour une société. Une société portugaise réellement dirigée depuis la Suisse peut y voir reconnaître son siège de direction effective et y devenir imposable de façon illimitée (LIFD). C'est le sujet à cadrer en amont.",
      },
      {
        term: "Forfait fiscal suisse",
        value:
          "L'imposition d'après la dépense (« forfait fiscal ») est un régime spécifique qui peut modifier l'analyse selon le canton et le profil. Cas particulier : à valider avec un fiscaliste.",
      },
      {
        term: "Et pour Monaco ?",
        value:
          "Les résidents monégasques relèvent de règles propres et sont peu nombreux dans ce cas : nous n'avons pas de page dédiée. Si vous êtes concerné, écrivez-nous, nous vous orienterons au cas par cas.",
      },
    ],

    remoteEyebrow: "Votre parcours",
    remoteTitle: "Créer à distance depuis la Suisse",
    remoteBody:
      "Depuis la Suisse, vos démarches portugaises se font à distance, en français. Nous les coordonnons depuis le Portugal ; les modalités exactes (notamment bancaires) dépendent de votre profil et de votre statut de résident d'un État hors Union européenne.",
    remoteSteps: [
      {
        term: "Obtenir le NIF",
        value:
          "Le NIF (numéro fiscal portugais du particulier) s'obtient sans déplacement. En tant que résident hors UE, la désignation d'un représentant fiscal est généralement requise. À ne pas confondre avec le NIPC, le numéro fiscal de la future société.",
      },
      {
        term: "Donner procuration",
        value:
          "Une procuration permet d'accomplir les formalités d'immatriculation en votre nom ; signature électronique qualifiée ou légalisation, sans voyage.",
      },
      {
        term: "Cadrer la structure en visio",
        value:
          "Choix entre ENI, Unipessoal Lda ou Lda (capital à partir de 1 € par associé) et cohérence avec votre situation suisse, en particulier le lieu de direction effective, lors d'un échange en français.",
      },
      {
        term: "Immatriculer et ouvrir le compte",
        value:
          "Immatriculation coordonnée (statuts, RCBE, Certidão Permanente, Segurança Social) ; ouverture du compte professionnel souvent amorçable à distance selon la banque. La comptabilité est ensuite assurée par un Contabilista Certificado partenaire.",
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
        label: "IFICI 2026 : le régime ciblé",
        href: "/guides/ifici-2026",
        desc: "Qui peut prétendre à l'IFICI (ex-RNH), et qui en est exclu. Sans survente.",
      },
      {
        label: "Société au Portugal & risque de requalification",
        href: "/guides/societe-portugal-sans-risque-france",
        desc: "Le mécanisme du siège de direction effective et de l'établissement stable, directement transposable au cas suisse.",
      },
      {
        label: "Simulateur de coût d'un salarié",
        href: "/outils/simulateur-cout-salarie",
        desc: "Un ordre de grandeur chiffré du coût d'une embauche au Portugal, sans engagement.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Résident suisse : ce qu'on me demande",
    faq: [
      {
        q: "Puis-je créer une société au Portugal en restant résident suisse ?",
        a: "Oui, c'est possible et la création se fait à distance. Mais tant que vous restez résident fiscal suisse, vous demeurez assujetti à l'impôt en Suisse. Surtout, si la société portugaise est réellement dirigée depuis la Suisse, son siège de direction effective peut y être reconnu et la rendre imposable de façon illimitée en Suisse (LIFD). L'opération n'est saine que si elle est cadrée en amont avec un fiscaliste.",
      },
      {
        q: "La Suisse a-t-elle un régime CFC qui taxerait ma société portugaise ?",
        a: "La Suisse n'applique pas de régime de type CFC classique comparable à celui de certains pays voisins (ce point reste à confirmer selon votre situation). Le risque dominant pour un résident suisse n'est donc pas une taxation par transparence, mais la reconnaissance du siège de direction effective de la société en Suisse si elle y est réellement pilotée. À valider avec un fiscaliste.",
      },
      {
        q: "La convention suisse-portugaise évite-t-elle la double imposition ?",
        a: "Oui, c'est son objet : une convention préventive de la double imposition lie la Suisse et le Portugal (couramment datée de 1974, date exacte à confirmer). Elle répartit le droit d'imposer et prévient la double imposition, mais elle ne neutralise pas le risque que la société soit rattachée à la Suisse si elle y est réellement dirigée.",
      },
      {
        q: "Je suis au bénéfice d'un forfait fiscal : cela change-t-il l'analyse ?",
        a: "Potentiellement, oui. L'imposition d'après la dépense (forfait fiscal) est un régime spécifique dont les effets dépendent du canton et de votre profil ; il peut modifier l'articulation avec une société portugaise. C'est un cas particulier qui doit impérativement être validé avec un fiscaliste avant toute décision.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Les éléments suisses (convention, absence de CFC, siège de direction effective, forfait fiscal, résidence) sont donnés avec un niveau de confiance indicatif et susceptibles d'évoluer ; ils doivent être validés par un fiscaliste avant toute décision. Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : nous vous orientons et vous mettons en relation avec le bon partenaire. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis la Suisse",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création au Portugal et, surtout, votre situation suisse — à commencer par le lieu de direction effective. Si un fiscaliste est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbHub: "Créer depuis l'étranger",
    breadcrumbCurrent: "Depuis la Suisse",
  },
  en: {
    metaTitle:
      "Setting up a Portuguese company from Switzerland: treaty, effective management (2026)",
    metaDesc:
      "Swiss resident? Set up a company in Portugal remotely, understand the Switzerland-Portugal treaty and the place-of-effective-management risk. The real risk is not Portuguese, it is Swiss. Service in French.",
    countryName: "Suisse",

    eyebrow: "From Switzerland · Remotely",
    title: "Set up your company in Portugal",
    titleAccent: "from Switzerland",
    lead: "You are a Swiss resident considering a company in Portugal? Incorporation is done remotely, in French. But the decisive issue is not Portuguese: it is your situation in Switzerland (residence, place of effective management, double taxation) that determines whether the operation is sound or risky. Here are the markers, dated 2026, to validate with a tax adviser.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real risk",
    trust: "75+ entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    conventionEyebrow: "Double taxation",
    conventionTitle: "Switzerland-Portugal treaty",
    conventionDate: "Signed in 1974 (exact date to be confirmed)",
    conventionConfidence: "Confidence level: medium",
    conventionBody: [
      "A double-taxation treaty binds Switzerland and Portugal. It allocates taxing rights between the two States and provides the mechanisms to prevent the same income being taxed twice.",
      "Its date of signature (commonly stated as 1974) and its precise provisions are to be confirmed case by case: its application depends on your actual residence and the nature of your income.",
    ],

    riskEyebrow: "Read this first",
    riskTitle: "The real risk is not in Portugal, it is in Switzerland",
    riskBody: [
      "If you remain a Swiss tax resident, setting up a company in Portugal does not take you out of the Swiss tax net. Switzerland does not apply a CFC-type regime (transparency taxation of controlled foreign companies) comparable to that of neighbouring countries — a point that nonetheless remains to be confirmed for your situation.",
      "The real risk lies elsewhere: the place of effective management. A Portuguese company genuinely administered and run from Switzerland may be regarded as having its place of effective management there and, on that basis, become subject to unlimited taxation in Switzerland (Federal Act on Direct Federal Taxation, LIFD). This is the most decisive point for a Swiss resident.",
    ],
    riskBullets: [
      "No classic CFC regime in Switzerland [medium confidence]: it is therefore not the main angle, but it dispenses with no analysis.",
      "Place of effective management [high confidence]: a Portuguese company run from Switzerland may be subject to unlimited taxation there (LIFD). This is the dominant risk to anticipate.",
      "The only sound way to come under Portuguese taxation is to genuinely move your management, residence and activity there, with real substance.",
      "No address or shell replaces a real presence: it is the economic reality and the place where decisions are taken that are examined.",
    ],

    factsEyebrow: "The Swiss markers",
    factsTitle: "Residence and specificity, in brief",
    facts: [
      {
        term: "Swiss tax-residence test",
        value:
          "You are a Swiss tax resident if you have your domicile or a durable stay there (LIFD) — in which case you are in principle subject to unlimited taxation in Switzerland on your income.",
      },
      {
        term: "Specificity: place of effective management",
        value:
          "The decisive test for a company. A Portuguese company genuinely run from Switzerland may be found to have its place of effective management there and become subject to unlimited taxation (LIFD). This is the point to frame upfront.",
      },
      {
        term: "Swiss lump-sum taxation",
        value:
          "Expenditure-based taxation (« forfait fiscal », lump-sum taxation) is a specific regime that may change the analysis depending on the canton and the profile. A special case: to be validated with a tax adviser.",
      },
      {
        term: "What about Monaco?",
        value:
          "Monegasque residents fall under their own rules and are few in this situation: we have no dedicated page. If this concerns you, write to us and we will guide you case by case.",
      },
    ],

    remoteEyebrow: "Your process",
    remoteTitle: "Setting up remotely from Switzerland",
    remoteBody:
      "From Switzerland, your Portuguese formalities are done remotely, in French. We coordinate them from Portugal; the exact terms (banking in particular) depend on your profile and your status as a resident of a State outside the European Union.",
    remoteSteps: [
      {
        term: "Obtain the NIF",
        value:
          "The NIF (individual Portuguese tax number) is obtained without travelling. As a non-EU resident, appointing a tax representative is generally required. Not to be confused with the NIPC, the future company's tax number.",
      },
      {
        term: "Grant a power of attorney",
        value:
          "A power of attorney allows the registration formalities to be carried out in your name; qualified electronic signature or legalisation, with no trip.",
      },
      {
        term: "Frame the structure by video",
        value:
          "Choice between ENI, Unipessoal Lda or Lda (capital from €1 per partner) and consistency with your Swiss situation, in particular the place of effective management, during a call in French.",
      },
      {
        term: "Incorporate and open the account",
        value:
          "Coordinated incorporation (articles, RCBE, Certidão Permanente, Segurança Social); opening the business account can often be started remotely depending on the bank. Accounting is then handled by a partner Contabilista Certificado.",
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
        label: "IFICI 2026: the targeted regime",
        href: "/guides/ifici-2026",
        desc: "Who can claim IFICI (formerly NHR), and who is excluded. Without overselling.",
      },
      {
        label: "Portuguese company & reclassification risk",
        href: "/guides/societe-portugal-sans-risque-france",
        desc: "The place-of-effective-management and permanent-establishment mechanism, directly transposable to the Swiss case.",
      },
      {
        label: "Employee-cost simulator",
        href: "/outils/simulateur-cout-salarie",
        desc: "An order-of-magnitude figure for the cost of a hire in Portugal, no commitment.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Swiss resident: what people ask me",
    faq: [
      {
        q: "Can I set up a company in Portugal while remaining a Swiss resident?",
        a: "Yes, it is possible and incorporation is done remotely. But as long as you remain a Swiss tax resident, you stay liable to tax in Switzerland. Above all, if the Portuguese company is genuinely run from Switzerland, its place of effective management may be recognised there and make it subject to unlimited taxation in Switzerland (LIFD). The operation is only sound if framed upfront with a tax adviser.",
      },
      {
        q: "Does Switzerland have a CFC regime that would tax my Portuguese company?",
        a: "Switzerland does not apply a classic CFC-type regime comparable to that of some neighbouring countries (a point that remains to be confirmed for your situation). The dominant risk for a Swiss resident is therefore not transparency taxation, but the recognition of the company's place of effective management in Switzerland if it is genuinely run there. To be validated with a tax adviser.",
      },
      {
        q: "Does the Switzerland-Portugal treaty avoid double taxation?",
        a: "Yes, that is its purpose: a double-taxation treaty binds Switzerland and Portugal (commonly dated 1974, exact date to be confirmed). It allocates taxing rights and prevents double taxation, but it does not neutralise the risk that the company is attached to Switzerland if it is genuinely run there.",
      },
      {
        q: "I benefit from lump-sum taxation: does that change the analysis?",
        a: "Potentially, yes. Expenditure-based (lump-sum) taxation is a specific regime whose effects depend on the canton and your profile; it may change how it interacts with a Portuguese company. This is a special case that must imperatively be validated with a tax adviser before any decision.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting or tax advice. The Swiss elements (treaty, absence of CFC, place of effective management, lump-sum taxation, residence) are given with an indicative confidence level and are subject to change; they must be validated by a tax adviser before any decision. Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: we guide you and connect you with the right partner. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from Switzerland",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your Portuguese incorporation and, above all, your Swiss situation — starting with the place of effective management. If a tax adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbHub: "Setting up from abroad",
    breadcrumbCurrent: "From Switzerland",
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

export default async function DepuisSuissePage({ params }: Props) {
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
