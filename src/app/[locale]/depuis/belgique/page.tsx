import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type SpokeCopy, SpokePage } from "@/components/seo/spoke-page";
import { languagesFor, ogLocaleFor, urlFor } from "@/lib/site";

// Spoke « créer au Portugal depuis la Belgique ». Faits = SOCLE plan SEO/GEO,
// niveaux de confiance affichés, à valider par un fiscaliste avant mise en ligne.
const PATH = "/depuis/belgique";
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

const COPY: { fr: SpokeCopy; en: SpokeCopy } = {
  fr: {
    metaTitle: "Créer sa société au Portugal depuis la Belgique : convention, taxe Caïman (2026)",
    metaDesc:
      "Résident belge ? Créer une société au Portugal à distance, comprendre la convention belgo-portugaise, la taxe Caïman et la résidence fiscale belge. Le vrai risque n'est pas portugais, il est belge. Service en français.",
    countryName: "Belgique",

    eyebrow: "Depuis la Belgique · À distance",
    title: "Créer sa société au Portugal",
    titleAccent: "depuis la Belgique",
    lead: "Vous êtes résident belge et vous envisagez une société au Portugal ? La création se fait à distance, en français. Mais le sujet décisif n'est pas portugais : c'est votre situation en Belgique (résidence, taxe Caïman, double imposition) qui détermine si l'opération est saine ou risquée. Voici les repères, datés 2026, à valider avec un fiscaliste.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le vrai risque",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Service en français · Lisbonne, Portugal",

    conventionEyebrow: "Double imposition",
    conventionTitle: "Convention Belgique-Portugal",
    conventionDate: "Signée le 16 juillet 1969, avenant en 1995",
    conventionConfidence: "Niveau de confiance : élevé",
    conventionBody: [
      "Une convention préventive de la double imposition lie la Belgique et le Portugal. Elle répartit le droit d'imposer entre les deux États et prévoit les mécanismes pour éviter qu'un même revenu soit taxé deux fois.",
      "Elle ne dispense jamais d'une analyse au cas par cas : son application dépend de votre résidence réelle et de la nature de vos revenus.",
    ],

    riskEyebrow: "À lire avant tout",
    riskTitle: "Le vrai risque n'est pas au Portugal, il est en Belgique",
    riskBody: [
      "Si vous restez résident fiscal belge, créer une société au Portugal ne vous sort pas du champ de l'impôt belge. La Belgique impose ses résidents sur leurs revenus mondiaux, et dispose d'un dispositif visant les structures étrangères faiblement taxées : la « taxe Caïman ».",
      "La taxe Caïman (articles 5/1 et 220/1 du Code des impôts sur les revenus 1992) impose, par transparence, certains revenus de « constructions juridiques » étrangères dans le chef du fondateur résident belge. L'administration a précisé que la convention belgo-portugaise n'y fait en principe pas obstacle (circulaire 2024/C/79).",
    ],
    riskBullets: [
      "La taxe Caïman vise surtout les structures patrimoniales ou passives, faiblement imposées ; son application à une société portugaise réellement opérationnelle s'apprécie au cas par cas, à valider avec un fiscaliste.",
      "Le siège de direction effective compte : une société portugaise dirigée depuis la Belgique peut y être rattachée fiscalement.",
      "La seule façon saine de relever de la fiscalité portugaise est d'y transférer réellement sa résidence et son activité, avec une substance réelle.",
      "Aucune adresse ni coquille ne remplace une présence réelle : c'est la réalité économique qui est regardée.",
    ],

    factsEyebrow: "Les repères belges",
    factsTitle: "Résidence et spécificité, en bref",
    facts: [
      {
        term: "Critère de résidence fiscale belge",
        value:
          "Vous êtes « habitant du Royaume », donc résident fiscal belge, si votre domicile ou le siège de votre fortune se trouve en Belgique — auquel cas vous êtes imposable sur vos revenus mondiaux.",
      },
      {
        term: "Spécificité : la taxe Caïman",
        value:
          "C'est l'équivalent belge d'un dispositif anti-évitement : elle impose par transparence les revenus de certaines constructions juridiques étrangères à faible fiscalité. Le sujet à clarifier en amont, surtout pour une activité de holding ou patrimoniale.",
      },
      {
        term: "Convention et double imposition",
        value:
          "La convention de 1969 (avenant 1995) évite la double imposition, mais ne neutralise ni la taxe Caïman ni le risque de requalification si la direction reste belge.",
      },
    ],

    remoteEyebrow: "Votre parcours",
    remoteTitle: "Créer à distance depuis la Belgique",
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
          "Choix entre ENI, Unipessoal Lda ou Lda (capital à partir de 1 € par associé) et cohérence avec votre situation belge, lors d'un échange en français.",
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
        desc: "Le mécanisme du siège de direction effective et de l'établissement stable, transposable au cas belge.",
      },
      {
        label: "Simulateur de coût d'un salarié",
        href: "/outils/simulateur-cout-salarie",
        desc: "Un ordre de grandeur chiffré du coût d'une embauche au Portugal, sans engagement.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Résident belge : ce qu'on me demande",
    faq: [
      {
        q: "Puis-je créer une société au Portugal en restant résident belge ?",
        a: "Oui, c'est possible et la création se fait à distance. Mais tant que vous restez résident fiscal belge, vous demeurez imposable en Belgique sur vos revenus mondiaux, et certains revenus d'une structure portugaise peuvent être visés par la taxe Caïman. L'opération n'est saine que si elle est cadrée en amont avec un fiscaliste.",
      },
      {
        q: "La taxe Caïman s'applique-t-elle à ma société portugaise ?",
        a: "Cela dépend de la nature de la société. La taxe Caïman vise surtout les constructions patrimoniales ou passives faiblement imposées ; une société portugaise réellement opérationnelle, avec une substance économique, n'est pas dans la même situation. L'administration considère toutefois que la convention belgo-portugaise n'y fait pas obstacle (circulaire 2024/C/79) : ce point doit être validé au cas par cas par un fiscaliste.",
      },
      {
        q: "La convention belgo-portugaise évite-t-elle la double imposition ?",
        a: "Oui, c'est son objet : la convention de 1969 (avenant 1995) répartit le droit d'imposer et prévient la double imposition. Elle ne neutralise pas pour autant la taxe Caïman ni le risque que la société soit rattachée à la Belgique si elle y est réellement dirigée.",
      },
      {
        q: "Dois-je m'installer au Portugal pour que ce soit propre ?",
        a: "La façon la plus sûre de relever de la fiscalité portugaise est d'y transférer réellement votre résidence et votre activité, avec une présence réelle. Une société portugaise pilotée depuis la Belgique, sans substance sur place, expose à une requalification. Mieux vaut cadrer ce point avant de créer.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et générale ; elle ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Les éléments belges (taxe Caïman, résidence, convention) sont donnés avec un niveau de confiance indicatif et susceptibles d'évoluer ; ils doivent être validés par un fiscaliste avant toute décision. Business Portugal est consultante en création et implantation, et non cabinet comptable, fiscal ou d'avocats : nous vous orientons et vous mettons en relation avec le bon partenaire. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, depuis la Belgique",
    ctaBody:
      "Un premier échange gratuit et sans engagement, en visio et en français, pour cadrer votre création au Portugal et, surtout, votre situation belge. Si un fiscaliste est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · En visio · Service en français · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbHub: "Créer depuis l'étranger",
    breadcrumbCurrent: "Depuis la Belgique",
  },
  en: {
    metaTitle: "Setting up a Portuguese company from Belgium: treaty, Cayman tax (2026)",
    metaDesc:
      "Belgian resident? Set up a company in Portugal remotely, understand the Belgium-Portugal treaty, the Cayman tax and Belgian tax residence. The real risk is not Portuguese, it is Belgian. Service in French.",
    countryName: "Belgique",

    eyebrow: "From Belgium · Remotely",
    title: "Set up your company in Portugal",
    titleAccent: "from Belgium",
    lead: "You are a Belgian resident considering a company in Portugal? Incorporation is done remotely, in French. But the decisive issue is not Portuguese: it is your situation in Belgium (residence, Cayman tax, double taxation) that determines whether the operation is sound or risky. Here are the markers, dated 2026, to validate with a tax adviser.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real risk",
    trust: "75+ entrepreneurs supported since 2025 · Service in French · Lisbon, Portugal",

    conventionEyebrow: "Double taxation",
    conventionTitle: "Belgium-Portugal treaty",
    conventionDate: "Signed 16 July 1969, amended in 1995",
    conventionConfidence: "Confidence level: high",
    conventionBody: [
      "A double-taxation treaty binds Belgium and Portugal. It allocates taxing rights between the two States and provides the mechanisms to prevent the same income being taxed twice.",
      "It never replaces a case-by-case analysis: its application depends on your actual residence and the nature of your income.",
    ],

    riskEyebrow: "Read this first",
    riskTitle: "The real risk is not in Portugal, it is in Belgium",
    riskBody: [
      "If you remain a Belgian tax resident, setting up a company in Portugal does not take you out of the Belgian tax net. Belgium taxes its residents on their worldwide income and has a regime targeting low-taxed foreign structures: the « Cayman tax ».",
      "The Cayman tax (articles 5/1 and 220/1 of the 1992 Income Tax Code) taxes, by transparency, certain income of foreign « legal constructions » in the hands of the Belgian-resident founder. The administration has clarified that the Belgium-Portugal treaty does not, in principle, stand in its way (circular 2024/C/79).",
    ],
    riskBullets: [
      "The Cayman tax mainly targets low-taxed patrimonial or passive structures; its application to a genuinely operational Portuguese company is assessed case by case, to be validated with a tax adviser.",
      "Place of effective management matters: a Portuguese company run from Belgium may be attached there for tax purposes.",
      "The only sound way to come under Portuguese taxation is to genuinely move your residence and activity there, with real substance.",
      "No address or shell replaces a real presence: it is the economic reality that is examined.",
    ],

    factsEyebrow: "The Belgian markers",
    factsTitle: "Residence and specificity, in brief",
    facts: [
      {
        term: "Belgian tax-residence test",
        value:
          "You are an « inhabitant of the Kingdom », hence a Belgian tax resident, if your home or the seat of your wealth is in Belgium — in which case you are taxable on your worldwide income.",
      },
      {
        term: "Specificity: the Cayman tax",
        value:
          "It is Belgium's anti-avoidance device: it taxes, by transparency, the income of certain low-taxed foreign legal constructions. The point to clarify upfront, especially for a holding or patrimonial activity.",
      },
      {
        term: "Treaty and double taxation",
        value:
          "The 1969 treaty (amended 1995) avoids double taxation, but neutralises neither the Cayman tax nor the reclassification risk if management stays Belgian.",
      },
    ],

    remoteEyebrow: "Your process",
    remoteTitle: "Setting up remotely from Belgium",
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
          "Choice between ENI, Unipessoal Lda or Lda (capital from €1 per partner) and consistency with your Belgian situation, during a call in French.",
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
        desc: "The place-of-effective-management and permanent-establishment mechanism, transposable to the Belgian case.",
      },
      {
        label: "Employee-cost simulator",
        href: "/outils/simulateur-cout-salarie",
        desc: "An order-of-magnitude figure for the cost of a hire in Portugal, no commitment.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Belgian resident: what people ask me",
    faq: [
      {
        q: "Can I set up a company in Portugal while remaining a Belgian resident?",
        a: "Yes, it is possible and incorporation is done remotely. But as long as you remain a Belgian tax resident, you stay taxable in Belgium on your worldwide income, and some income from a Portuguese structure may be caught by the Cayman tax. The operation is only sound if framed upfront with a tax adviser.",
      },
      {
        q: "Does the Cayman tax apply to my Portuguese company?",
        a: "It depends on the nature of the company. The Cayman tax mainly targets low-taxed patrimonial or passive constructions; a genuinely operational Portuguese company with economic substance is not in the same situation. The administration considers, however, that the Belgium-Portugal treaty does not stand in its way (circular 2024/C/79): this must be validated case by case by a tax adviser.",
      },
      {
        q: "Does the Belgium-Portugal treaty avoid double taxation?",
        a: "Yes, that is its purpose: the 1969 treaty (amended 1995) allocates taxing rights and prevents double taxation. It does not, however, neutralise the Cayman tax or the risk that the company is attached to Belgium if it is genuinely run there.",
      },
      {
        q: "Do I need to move to Portugal for this to be clean?",
        a: "The safest way to come under Portuguese taxation is to genuinely move your residence and activity there, with a real presence. A Portuguese company run from Belgium, with no substance on the ground, exposes you to reclassification. Better to settle this before setting up.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for general information only; it does not constitute personalised legal, accounting or tax advice. The Belgian elements (Cayman tax, residence, treaty) are given with an indicative confidence level and are subject to change; they must be validated by a tax adviser before any decision. Business Portugal is a consultant in company formation and setup, not an accounting, tax or law firm: we guide you and connect you with the right partner. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, from Belgium",
    ctaBody:
      "A first free conversation, with no commitment, by video and in French, to frame your Portuguese incorporation and, above all, your Belgian situation. If a tax adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · By video · Service in French · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbHub: "Setting up from abroad",
    breadcrumbCurrent: "From Belgium",
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

export default async function DepuisBelgiquePage({ params }: Props) {
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
