import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type SpokeCopy, SpokePage } from "@/components/seo/spoke-page";
import { languagesFor, ogLocaleFor, urlFor } from "@/lib/site";

// Spoke « créer au Portugal depuis le Luxembourg ». Faits = SOCLE plan SEO/GEO,
// niveaux de confiance affichés, à valider par un fiscaliste avant mise en ligne.
const PATH = "/depuis/luxembourg";
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

const COPY: { fr: SpokeCopy; en: SpokeCopy } = {
  fr: {
    metaTitle: "Créer sa société au Portugal depuis le Luxembourg : convention, CFC ATAD (2026)",
    metaDesc:
      "Résident luxembourgeois ? Créer une société au Portugal à distance, comprendre la convention Luxembourg-Portugal, les règles CFC issues de l'ATAD et la résidence fiscale luxembourgeoise. Le vrai risque n'est pas portugais, il est luxembourgeois. Service en français.",
    countryName: "Luxembourg",

    eyebrow: "Depuis le Luxembourg · À distance",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis le Luxembourg",
    lead: "Vous résidez au Luxembourg et vous envisagez une société au Portugal ? La création se fait à distance, en français. Mais le sujet décisif n'est pas portugais : c'est votre situation luxembourgeoise (résidence, règles CFC issues de l'ATAD, siège de direction effective) qui détermine si l'opération est saine ou risquée. Voici les repères, datés 2026, à valider avec un fiscaliste.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le vrai risque",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    conventionEyebrow: "Double imposition",
    conventionTitle: "Convention Luxembourg-Portugal",
    conventionDate: "Signée le 25 mai 1999",
    conventionConfidence: "Niveau de confiance : élevé",
    conventionBody: [
      "Une convention préventive de la double imposition lie le Luxembourg et le Portugal. Elle répartit le droit d'imposer entre les deux États et prévoit les mécanismes pour éviter qu'un même revenu soit taxé deux fois.",
      "Elle ne dispense jamais d'une analyse au cas par cas : son application dépend de votre résidence réelle et de la nature de vos revenus.",
    ],

    riskEyebrow: "À lire avant tout",
    riskTitle: "Le vrai risque n'est pas au Portugal, il est au Luxembourg",
    riskBody: [
      "Si vous restez résident fiscal luxembourgeois, créer une société au Portugal ne vous sort pas du champ de l'impôt luxembourgeois. Le Luxembourg impose ses résidents sur leurs revenus mondiaux et dispose, comme tous les États de l'Union, de règles dites CFC (sociétés étrangères contrôlées) issues de la directive ATAD.",
      "Les règles CFC issues de l'ATAD visent surtout les sociétés : elles permettent, sous conditions, de réintégrer dans le résultat luxembourgeois certains revenus d'une filiale étrangère peu taxée et dépourvue de substance. Elles touchent rarement le particulier lambda, mais elles méritent d'être anticipées dès qu'une structure portugaise est interposée.",
    ],
    riskBullets: [
      "Les règles CFC issues de l'ATAD visent surtout les sociétés contrôlées peu taxées et sans substance réelle ; leur application à une société portugaise réellement opérationnelle s'apprécie au cas par cas, à valider avec un fiscaliste.",
      "Le siège de direction effective compte : une société portugaise dirigée depuis le Luxembourg peut y être rattachée fiscalement.",
      "La seule façon saine de relever de la fiscalité portugaise est d'y transférer réellement sa résidence et son activité, avec une substance réelle.",
      "Aucune adresse ni coquille ne remplace une présence réelle : c'est la réalité économique qui est regardée.",
    ],

    factsEyebrow: "Les repères luxembourgeois",
    factsTitle: "Résidence et spécificité, en bref",
    facts: [
      {
        term: "Critère de résidence fiscale luxembourgeoise",
        value:
          "Vous êtes résident fiscal luxembourgeois si vous y avez votre domicile fiscal ou votre séjour habituel (en pratique, plus de six mois sur place) — auquel cas vous êtes imposable sur vos revenus mondiaux.",
      },
      {
        term: "Spécificité : les règles CFC issues de l'ATAD",
        value:
          "C'est le dispositif anti-évitement européen transposé au Luxembourg : il vise surtout les sociétés contrôlées étrangères peu taxées et sans substance, dont certains revenus peuvent être réintégrés. Le sujet à clarifier en amont dès qu'une société portugaise est détenue ou interposée.",
      },
      {
        term: "Convention et double imposition",
        value:
          "La convention du 25 mai 1999 évite la double imposition, mais ne neutralise ni les règles CFC ni le risque de requalification si la direction reste luxembourgeoise.",
      },
    ],

    remoteEyebrow: "Votre parcours",
    remoteTitle: "Créer à distance depuis le Luxembourg",
    remoteBody:
      "En tant que résident d'un État de l'Union européenne, vos démarches portugaises se font à distance, en français. Nous les coordonnons depuis le Portugal ; les modalités exactes (notamment bancaires) dépendent de votre profil.",
    remoteSteps: [
      {
        term: "Obtenir le NIF",
        value:
          "Le NIF (numéro fiscal portugais du particulier) s'obtient sans déplacement. À ne pas confondre avec le NIPC, le numéro fiscal de la future société.",
      },
      {
        term: "Donner procuration",
        value:
          "Une procuration permet d'accomplir les formalités d'immatriculation en votre nom ; signature électronique qualifiée ou légalisation, sans voyage.",
      },
      {
        term: "Cadrer la structure en visio",
        value:
          "Choix entre ENI, Unipessoal Lda ou Lda (capital à partir de 1 € par associé) et cohérence avec votre situation luxembourgeoise, lors d'un échange en français.",
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
        desc: "Le mécanisme du siège de direction effective et de l'établissement stable, transposable au cas luxembourgeois.",
      },
      {
        label: "Simulateur de coût d'un salarié",
        href: "/outils/simulateur-cout-salarie",
        desc: "Un ordre de grandeur chiffré du coût d'une embauche au Portugal, sans engagement.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Résident luxembourgeois : ce qu'on me demande",
    faq: [
      {
        q: "Puis-je créer une société au Portugal en restant résident luxembourgeois ?",
        a: "Oui, c'est possible et la création se fait à distance. Mais tant que vous restez résident fiscal luxembourgeois, vous demeurez imposable au Luxembourg sur vos revenus mondiaux, et une structure portugaise contrôlée peut, sous conditions, être visée par les règles CFC issues de l'ATAD. L'opération n'est saine que si elle est cadrée en amont avec un fiscaliste.",
      },
      {
        q: "Les règles CFC s'appliquent-elles à ma société portugaise ?",
        a: "Cela dépend de la nature de la société. Les règles CFC issues de l'ATAD visent surtout les sociétés contrôlées peu taxées et dépourvues de substance ; une société portugaise réellement opérationnelle, avec une substance économique, n'est pas dans la même situation. Ce point relève d'une analyse au cas par cas et doit être validé par un fiscaliste : c'est un sujet d'entreprise plus que de particulier.",
      },
      {
        q: "La convention Luxembourg-Portugal évite-t-elle la double imposition ?",
        a: "Oui, c'est son objet : la convention du 25 mai 1999 répartit le droit d'imposer et prévient la double imposition. Elle ne neutralise pas pour autant les règles CFC ni le risque que la société soit rattachée au Luxembourg si elle y est réellement dirigée.",
      },
      {
        q: "Dois-je m'installer au Portugal pour que ce soit propre ?",
        a: "La façon la plus sûre de relever de la fiscalité portugaise est d'y transférer réellement votre résidence et votre activité, avec une présence réelle. Une société portugaise pilotée depuis le Luxembourg, sans substance sur place, expose à une requalification au titre du siège de direction effective. Mieux vaut cadrer ce point avant de créer.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Les éléments luxembourgeois (règles CFC issues de l'ATAD, résidence, convention) sont donnés avec un niveau de confiance indicatif et susceptibles d'évoluer ; ils doivent être validés par un fiscaliste avant toute décision. Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : nous vous orientons et vous mettons en relation avec le bon partenaire. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis le Luxembourg",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création au Portugal et, surtout, votre situation luxembourgeoise. Si un fiscaliste est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbHub: "Créer depuis l'étranger",
    breadcrumbCurrent: "Depuis le Luxembourg",
  },
  en: {
    metaTitle: "Setting up a Portuguese company from Luxembourg: treaty, CFC ATAD (2026)",
    metaDesc:
      "Luxembourg resident? Set up a company in Portugal remotely, understand the Luxembourg-Portugal treaty, the ATAD-based CFC rules and Luxembourg tax residence. The real risk is not Portuguese, it is Luxembourgish. Service in French.",
    countryName: "Luxembourg",

    eyebrow: "From Luxembourg · Remotely",
    title: "Set up your company in Portugal",
    titleAccent: "from Luxembourg",
    lead: "You live in Luxembourg and are considering a company in Portugal? Incorporation is done remotely, in French. But the decisive issue is not Portuguese: it is your Luxembourg situation (residence, ATAD-based CFC rules, place of effective management) that determines whether the operation is sound or risky. Here are the markers, dated 2026, to validate with a tax adviser.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real risk",
    trust: "75+ entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    conventionEyebrow: "Double taxation",
    conventionTitle: "Luxembourg-Portugal treaty",
    conventionDate: "Signed 25 May 1999",
    conventionConfidence: "Confidence level: high",
    conventionBody: [
      "A double-taxation treaty binds Luxembourg and Portugal. It allocates taxing rights between the two States and provides the mechanisms to prevent the same income being taxed twice.",
      "It never replaces a case-by-case analysis: its application depends on your actual residence and the nature of your income.",
    ],

    riskEyebrow: "Read this first",
    riskTitle: "The real risk is not in Portugal, it is in Luxembourg",
    riskBody: [
      "If you remain a Luxembourg tax resident, setting up a company in Portugal does not take you out of the Luxembourg tax net. Luxembourg taxes its residents on their worldwide income and has, like all EU States, so-called CFC rules (controlled foreign companies) derived from the ATAD directive.",
      "The ATAD-based CFC rules mainly target companies: under conditions, they allow certain income of a low-taxed foreign subsidiary that lacks substance to be reattributed to the Luxembourg result. They rarely affect the ordinary individual, but they deserve to be anticipated as soon as a Portuguese structure is interposed.",
    ],
    riskBullets: [
      "The ATAD-based CFC rules mainly target low-taxed controlled companies without real substance; their application to a genuinely operational Portuguese company is assessed case by case, to be validated with a tax adviser.",
      "Place of effective management matters: a Portuguese company run from Luxembourg may be attached there for tax purposes.",
      "The only sound way to come under Portuguese taxation is to genuinely move your residence and activity there, with real substance.",
      "No address or shell replaces a real presence: it is the economic reality that is examined.",
    ],

    factsEyebrow: "The Luxembourg markers",
    factsTitle: "Residence and specificity, in brief",
    facts: [
      {
        term: "Luxembourg tax-residence test",
        value:
          "You are a Luxembourg tax resident if your tax domicile or your habitual abode (in practice, more than six months on the ground) is there — in which case you are taxable on your worldwide income.",
      },
      {
        term: "Specificity: the ATAD-based CFC rules",
        value:
          "It is the European anti-avoidance device transposed in Luxembourg: it mainly targets low-taxed controlled foreign companies without substance, certain income of which may be reattributed. The point to clarify upfront as soon as a Portuguese company is held or interposed.",
      },
      {
        term: "Treaty and double taxation",
        value:
          "The treaty of 25 May 1999 avoids double taxation, but neutralises neither the CFC rules nor the reclassification risk if management stays in Luxembourg.",
      },
    ],

    remoteEyebrow: "Your process",
    remoteTitle: "Setting up remotely from Luxembourg",
    remoteBody:
      "As a resident of a European Union State, your Portuguese formalities are done remotely, in French. We coordinate them from Portugal; the exact terms (banking in particular) depend on your profile.",
    remoteSteps: [
      {
        term: "Obtain the NIF",
        value:
          "The NIF (individual Portuguese tax number) is obtained without travelling. Not to be confused with the NIPC, the future company's tax number.",
      },
      {
        term: "Grant a power of attorney",
        value:
          "A power of attorney allows the registration formalities to be carried out in your name; qualified electronic signature or legalisation, with no trip.",
      },
      {
        term: "Frame the structure by video",
        value:
          "Choice between ENI, Unipessoal Lda or Lda (capital from €1 per partner) and consistency with your Luxembourg situation, during a call in French.",
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
        desc: "The place-of-effective-management and permanent-establishment mechanism, transposable to the Luxembourg case.",
      },
      {
        label: "Employee-cost simulator",
        href: "/outils/simulateur-cout-salarie",
        desc: "An order-of-magnitude figure for the cost of a hire in Portugal, no commitment.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Luxembourg resident: what people ask me",
    faq: [
      {
        q: "Can I set up a company in Portugal while remaining a Luxembourg resident?",
        a: "Yes, it is possible and incorporation is done remotely. But as long as you remain a Luxembourg tax resident, you stay taxable in Luxembourg on your worldwide income, and a controlled Portuguese structure may, under conditions, be caught by the ATAD-based CFC rules. The operation is only sound if framed upfront with a tax adviser.",
      },
      {
        q: "Do the CFC rules apply to my Portuguese company?",
        a: "It depends on the nature of the company. The ATAD-based CFC rules mainly target low-taxed controlled companies that lack substance; a genuinely operational Portuguese company with economic substance is not in the same situation. This calls for a case-by-case analysis and must be validated by a tax adviser: it is a company matter more than an individual one.",
      },
      {
        q: "Does the Luxembourg-Portugal treaty avoid double taxation?",
        a: "Yes, that is its purpose: the treaty of 25 May 1999 allocates taxing rights and prevents double taxation. It does not, however, neutralise the CFC rules or the risk that the company is attached to Luxembourg if it is genuinely run there.",
      },
      {
        q: "Do I need to move to Portugal for this to be clean?",
        a: "The safest way to come under Portuguese taxation is to genuinely move your residence and activity there, with a real presence. A Portuguese company run from Luxembourg, with no substance on the ground, exposes you to reclassification on the basis of the place of effective management. Better to settle this before setting up.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting or tax advice. The Luxembourg elements (ATAD-based CFC rules, residence, treaty) are given with an indicative confidence level and are subject to change; they must be validated by a tax adviser before any decision. Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: we guide you and connect you with the right partner. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from Luxembourg",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your Portuguese incorporation and, above all, your Luxembourg situation. If a tax adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbHub: "Setting up from abroad",
    breadcrumbCurrent: "From Luxembourg",
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

export default async function DepuisLuxembourgPage({ params }: Props) {
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
