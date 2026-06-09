import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  FOUNDER_ID,
  languagesFor,
  ORGANIZATION_ID,
  ogLocaleFor,
  SITE_URL,
  urlFor,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/comparatifs/portugal-vs-france-espagne-dubai";
const CREATION_PATH = "/creation-societe";
const REQUALIF_PATH = "/guides/societe-portugal-sans-risque-france";
const FISCALITE_PATH = "/services/fiscalite";
const FAQ_PATH = "/faq";

const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

type Table = { head: string[]; rows: string[][] };
type CountryCard = { country: string; tag: string; points: { term: string; value: string }[] };
type RelatedLink = { label: string; href: string; desc: string };
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

  criterionEyebrow: string;
  criterionTitle: string;
  criterionBody: string;
  criterionPoints: string[];

  tableEyebrow: string;
  tableTitle: string;
  tableSubtitle: string;
  table: Table;
  tableNote: string;
  cards: CountryCard[];

  cfcEyebrow: string;
  cfcTitle: string;
  cfcBody: string[];
  cfcBullets: string[];
  cfcLink: { label: string; href: string };

  whyPtEyebrow: string;
  whyPtTitle: string;
  whyPtBody: string;
  whyPtPoints: string[];

  relatedEyebrow: string;
  relatedTitle: string;
  related: RelatedLink[];

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
  breadcrumbComparatifs: string;
  breadcrumbCurrent: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Portugal vs France, Espagne, Dubaï : où créer sa société en 2026 ?",
    metaDesc:
      "Comparatif honnête Portugal, France, Espagne, Dubaï pour créer sa société en 2026. Le vrai critère n'est pas le taux d'impôt mais où vous vivez et dirigez l'activité. Alerte CFC et établissement stable expliquée.",
    eyebrow: "Comparatif pays · 2026",
    title: "Portugal vs France, Espagne, Dubaï :",
    titleAccent: "où créer sa société en 2026 ?",
    lead: "Le Portugal a durci sa fiscalité ces dernières années : il n'est plus le « paradis » qu'on vous vend parfois. Mais la vraie question n'est pas de courir après le taux d'impôt le plus bas. Le critère qui décide de tout, c'est où vous vivez réellement et d'où vous dirigez l'activité. Voici un comparatif honnête, chiffres donnés en ordres de grandeur, à valider avec un fiscaliste, et l'alerte que peu de prestataires vous donnent.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le comparatif",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    criterionEyebrow: "Avant de comparer les taux",
    criterionTitle: "Le vrai critère : où vivez-vous ?",
    criterionBody:
      "On vous vendra toujours un taux d'impôt attractif quelque part. Mais une société n'est imposable « là-bas » que si elle y est réellement dirigée et y dispose d'une substance économique. Pour un résident fiscal français, l'adresse du siège ne change rien si les décisions, le travail et la valeur sont produits depuis la France : le fisc regarde la réalité, pas le papier. Avant de choisir un pays, posez-vous d'abord ces questions.",
    criterionPoints: [
      "Où vivez-vous plus de 183 jours par an, et où se trouve votre foyer (famille, logement principal) ?",
      "D'où prenez-vous réellement les décisions de gestion et signez-vous les contrats ?",
      "Où sont vos clients, vos salariés, vos moyens de production, la « substance » de l'activité ?",
      "Êtes-vous prêt·e à organiser une présence réelle dans le pays choisi, ou cherchez-vous juste une adresse ?",
    ],

    tableEyebrow: "Le comparatif",
    tableTitle: "Quatre destinations, quatre logiques différentes",
    tableSubtitle:
      "Les chiffres ci-dessous sont des ordres de grandeur indicatifs pour 2026, à confirmer avec un fiscaliste selon votre cas. Ils ne disent pas « où payer le moins » : ils éclairent le type de profil pour lequel chaque pays a du sens.",
    table: {
      head: ["Pays", "Impôt sociétés", "Charges / TVA", "Substance requise", "Pour qui"],
      rows: [
        [
          "Portugal (UE)",
          "IRC 19 % (15 % PME sur les premiers 50 000 €)",
          "IVA 23 % · charges patronales modérées",
          "Substance réelle nécessaire (direction, activité)",
          "Qui s'installe vraiment au Portugal et y vit",
        ],
        [
          "France (UE)",
          "IS 25 %",
          "TVA 20 % · charges patronales élevées (≈ +42 % indicatif)",
          "Marché et activité domestiques",
          "Qui vit, travaille et vend en France",
        ],
        [
          "Espagne (UE)",
          "IS 25 % (taux réduit 15 % pour les nouvelles sociétés, ~2 premières années)",
          "IVA 21 %",
          "Substance réelle nécessaire",
          "Qui s'installe en Espagne ou y a son marché",
        ],
        [
          "Dubaï / EAU (hors UE)",
          "Corporate Tax 9 % au-delà d'un seuil (~375 000 AED)",
          "Pas d'équivalent TVA UE (VAT 5 %)",
          "Substance réelle exigée, et hors UE",
          "Qui s'expatrie réellement aux EAU (risque CFC fort pour un résident français)",
        ],
      ],
    },
    tableNote:
      "Lecture honnête : un taux bas ne « gagne » pas la comparaison. Une société à 9 % à Dubaï pilotée depuis Paris peut finir imposée en France, majorée d'intérêts et de pénalités. Le bon pays est celui où votre vie et votre activité sont réellement implantées.",
    cards: [
      {
        country: "Portugal",
        tag: "UE · IRC 19 %",
        points: [
          {
            term: "Impôt sociétés",
            value:
              "IRC 19 %, taux réduit 15 % pour les PME sur les premiers 50 000 € de bénéfice imposable.",
          },
          { term: "TVA", value: "IVA standard à 23 %." },
          {
            term: "Substance",
            value:
              "Substance réelle nécessaire : direction et activité sur place. Membre de l'UE, conventions fiscales étendues.",
          },
        ],
      },
      {
        country: "France",
        tag: "UE · IS 25 %",
        points: [
          { term: "Impôt sociétés", value: "IS à 25 %." },
          {
            term: "Charges & TVA",
            value: "Charges patronales élevées (≈ +42 % indicatif sur le brut), TVA à 20 %.",
          },
          {
            term: "Pertinence",
            value:
              "Logique pour un marché et une activité domestiques : vos clients et votre vie sont en France.",
          },
        ],
      },
      {
        country: "Espagne",
        tag: "UE · IS 25 %",
        points: [
          {
            term: "Impôt sociétés",
            value:
              "IS à 25 %, avec un taux réduit de 15 % pour les nouvelles sociétés sur leurs ~2 premières années bénéficiaires.",
          },
          { term: "TVA", value: "IVA à 21 %." },
          {
            term: "Substance",
            value:
              "Substance réelle nécessaire. Membre de l'UE, proche logistiquement du marché ibérique.",
          },
        ],
      },
      {
        country: "Dubaï / EAU",
        tag: "Hors UE · CT 9 %",
        points: [
          {
            term: "Impôt sociétés",
            value: "Corporate Tax à 9 % au-delà d'un seuil de bénéfice (~375 000 AED).",
          },
          {
            term: "TVA",
            value: "Pas d'équivalent à la TVA UE ; une VAT locale de 5 % s'applique.",
          },
          {
            term: "Le point critique",
            value:
              "Substance réelle exigée et juridiction hors UE. Pour un résident fiscal français, le risque de société étrangère contrôlée et d'établissement stable est majeur (voir l'alerte ci-dessous).",
          },
        ],
      },
    ],

    cfcEyebrow: "À lire avant tout",
    cfcTitle: "Alerte CFC & établissement stable",
    cfcBody: [
      "C'est le point que beaucoup de vendeurs de « société offshore » passent sous silence. Si vous êtes résident fiscal français et que vous créez une société à l'étranger pilotée depuis la France, vous vous exposez à deux mécanismes qui peuvent ramener l'imposition en France, quel que soit le taux affiché ailleurs.",
      "Le premier : le régime des sociétés étrangères contrôlées (CFC), prévu à l'article 209 B du CGI, qui vise les structures établies dans des pays à fiscalité privilégiée et contrôlées depuis la France. Le second : la notion d'établissement stable et de siège de direction effective, si les décisions sont réellement prises en France, l'activité peut y être rattachée et imposée.",
    ],
    cfcBullets: [
      "Une société à 9 % à Dubaï dirigée depuis la France peut être requalifiée et imposée en France, avec intérêts de retard et pénalités.",
      "La « substance réelle » (bureaux, salariés, décisions, présence) est exigée, à Dubaï particulièrement. Une simple adresse ne suffit pas.",
      "Le montage « je vis en France mais ma société est ailleurs » est précisément ce que ces règles visent à neutraliser.",
      "La seule façon saine de bénéficier d'une fiscalité étrangère est d'y transférer réellement sa résidence fiscale et son activité.",
    ],
    cfcLink: {
      label: "Société à l'étranger & vie en France : le guide complet",
      href: REQUALIF_PATH,
    },

    whyPtEyebrow: "Sans survente",
    whyPtTitle: "Pourquoi le Portugal reste pertinent (pour les bonnes raisons)",
    whyPtBody:
      "Le Portugal n'est plus un paradis fiscal, et c'est tant mieux : la pertinence vient aujourd'hui de la cohérence du projet, pas d'un taux miracle. Pour qui s'installe réellement à Lisbonne ou Porto, y vit, y dirige son activité, y a sa substance, le Portugal offre un cadre solide et lisible.",
    whyPtPoints: [
      "Membre de l'UE : libre circulation, marché unique, conventions fiscales étendues, pas de problématique « hors UE ».",
      "IRC à 19 %, avec 15 % pour les PME sur les premiers 50 000 €, compétitif sans être un montage agressif.",
      "Capital social d'une Unipessoal Lda ou d'une Lda à partir de 1 € par associé : création accessible.",
      "Qualité de vie, langue accessible, communauté francophone : la « substance » réelle s'y installe sans douleur.",
      "Le bon réflexe : choisir le Portugal parce qu'on y vit, pas parce qu'on cherche à échapper au fisc de son pays de résidence.",
    ],

    relatedEyebrow: "Pour aller plus loin",
    relatedTitle: "Les pages utiles avant de décider",
    related: [
      {
        label: "Créer sa société au Portugal",
        href: CREATION_PATH,
        desc: "Le déroulé concret : Unipessoal Lda, Lda, NIF/NIPC, capital, banque et accompagnement.",
      },
      {
        label: "Société portugaise & vie en France",
        href: REQUALIF_PATH,
        desc: "Le guide de fond sur le risque de requalification, l'établissement stable et le siège de direction effective.",
      },
      {
        label: "Fiscalité d'entreprise au Portugal",
        href: FISCALITE_PATH,
        desc: "IRC, IVA, double imposition : mise en relation avec le fiscaliste partenaire adapté à votre cas.",
      },
      {
        label: "Foire aux questions",
        href: FAQ_PATH,
        desc: "Les réponses honnêtes aux questions qui reviennent le plus sur la création et l'implantation.",
      },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce qu'on me demande sur le choix du pays",
    faq: [
      {
        q: "Quel est le meilleur pays de l'UE pour créer sa société en 2026 ?",
        a: "Il n'y a pas de « meilleur » pays dans l'absolu : le bon pays est celui où vous vivez et dirigez réellement l'activité. Au sein de l'UE, le Portugal (IRC 19 %, 15 % pour les PME sur les premiers 50 000 €) est compétitif face à la France et l'Espagne (IS 25 %), mais ce taux n'a de sens que si votre substance est sur place. Le critère décisif reste votre résidence fiscale, pas le taux affiché.",
      },
      {
        q: "Peut-on créer une société à Dubaï tout en vivant en France ?",
        a: "C'est juridiquement possible, mais c'est précisément le montage le plus risqué pour un résident fiscal français. Une société à Dubaï pilotée depuis la France expose au régime des sociétés étrangères contrôlées (article 209 B du CGI) et à la requalification en établissement stable ou siège de direction effective : l'activité peut alors être imposée en France, avec intérêts et pénalités. Dubaï n'a de sens que si vous y transférez réellement votre résidence et votre activité, avec une substance réelle. À valider impérativement avec un fiscaliste.",
      },
      {
        q: "Portugal ou France : que choisir ?",
        a: "Si votre vie, vos clients et votre activité sont en France, la France reste la réponse logique malgré l'IS à 25 % et des charges élevées : créer ailleurs ne ferait que créer du risque. Si vous vous installez réellement au Portugal, y vivre, y diriger, y produire la valeur, le Portugal devient cohérent, avec un IRC à 19 % et l'appartenance à l'UE. Ce n'est pas un arbitrage de taux, c'est un choix de lieu de vie.",
      },
      {
        q: "Un taux d'impôt plus bas suffit-il à justifier le choix d'un pays ?",
        a: "Non. Un taux bas affiché ailleurs ne vous protège pas si l'activité est réellement dirigée depuis votre pays de résidence : elle peut y être rattachée et imposée. Le coût total intègre aussi la substance à mettre en place, la conformité, le risque de contrôle et la double imposition. Le taux n'est qu'un paramètre parmi d'autres.",
      },
      {
        q: "Le Portugal est-il encore intéressant fiscalement en 2026 ?",
        a: "Le Portugal a durci sa fiscalité (fin du RNH classique, IFICI plus restrictif qui exclut les retraités et n'est souvent pas ouvert aux nomades à clientèle 100 % étrangère). Il reste pertinent pour qui s'y installe vraiment : IRC à 19 %, 15 % pour les PME sur les premiers 50 000 €, appartenance à l'UE, qualité de vie. Mais ce n'est plus un paradis fiscal, et c'est une bonne nouvelle pour la sécurité juridique de votre projet.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et de comparaison générale ; elle ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Les taux et seuils cités (IRC, IS, IVA/TVA, Corporate Tax, charges) sont des ordres de grandeur indicatifs, à jour en 2026 et susceptibles d'évoluer selon les lois de finances de chaque pays. La situation d'un résident fiscal français créant une société à l'étranger dépend de règles complexes (article 209 B du CGI, établissement stable, conventions fiscales) qui s'apprécient au cas par cas. Business Portugal est consultante en création et implantation, et non cabinet d'avocats ou de fiscalité : pour toute décision, faites valider votre cas par un fiscaliste. Prenez rendez-vous pour cadrer votre projet.",

    ctaTitle: "Parlons de votre projet, pas d'un taux",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer où vous vivez, où vous dirigez l'activité et quelle structure tient la route. On regarde votre situation honnêtement, et si un fiscaliste est nécessaire, on vous met en relation avec le bon partenaire.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Mise en relation · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbComparatifs: "Comparatifs",
    breadcrumbCurrent: "Portugal vs France, Espagne, Dubaï",
  },
  en: {
    metaTitle: "Portugal vs France, Spain, Dubai: where to set up in 2026?",
    metaDesc:
      "An honest comparison of Portugal, France, Spain and Dubai for setting up a company in 2026. The real criterion is not the tax rate but where you live and run the business. CFC and permanent-establishment alert explained.",
    eyebrow: "Country comparison · 2026",
    title: "Portugal vs France, Spain, Dubai:",
    titleAccent: "where to set up in 2026?",
    lead: "Portugal has tightened its taxation in recent years: it is no longer the « paradise » sometimes sold to you. But the real question is not chasing the lowest tax rate. The criterion that decides everything is where you actually live and from where you run the business. Here is an honest comparison, figures given as orders of magnitude, to be validated with a tax adviser, and the alert few providers give you.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the comparison",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    criterionEyebrow: "Before comparing rates",
    criterionTitle: "The real criterion: where do you live?",
    criterionBody:
      "Someone will always sell you an attractive tax rate somewhere. But a company is only taxable « over there » if it is genuinely run there and has economic substance there. For a French tax resident, the registered address changes nothing if decisions, work and value are produced from France: the tax authority looks at reality, not paper. Before choosing a country, ask yourself these questions first.",
    criterionPoints: [
      "Where do you live more than 183 days a year, and where is your home (family, main residence)?",
      "From where do you actually make management decisions and sign contracts?",
      "Where are your clients, your staff, your means of production, the « substance » of the activity?",
      "Are you ready to organise a real presence in the chosen country, or are you just after an address?",
    ],

    tableEyebrow: "The comparison",
    tableTitle: "Four destinations, four different logics",
    tableSubtitle:
      "The figures below are indicative orders of magnitude for 2026, to be confirmed with a tax adviser for your case. They do not say « where to pay the least »: they show the type of profile for which each country makes sense.",
    table: {
      head: ["Country", "Corporate tax", "Charges / VAT", "Substance required", "Who it suits"],
      rows: [
        [
          "Portugal (EU)",
          "IRC 19% (15% SMEs on the first €50,000)",
          "IVA 23% · moderate employer charges",
          "Real substance needed (management, activity)",
          "Those genuinely relocating to and living in Portugal",
        ],
        [
          "France (EU)",
          "IS 25%",
          "VAT 20% · high employer charges (≈ +42% indicative)",
          "Domestic market and activity",
          "Those living, working and selling in France",
        ],
        [
          "Spain (EU)",
          "IS 25% (reduced 15% for new companies, ~first 2 years)",
          "IVA 21%",
          "Real substance needed",
          "Those relocating to Spain or whose market is there",
        ],
        [
          "Dubai / UAE (non-EU)",
          "Corporate Tax 9% above a threshold (~AED 375,000)",
          "No EU-style VAT (VAT 5%)",
          "Real substance required, and outside the EU",
          "Those genuinely emigrating to the UAE (strong CFC risk for a French resident)",
        ],
      ],
    },
    tableNote:
      "Honest reading: a low rate does not « win » the comparison. A 9% company in Dubai run from Paris may end up taxed in France, with interest and penalties on top. The right country is the one where your life and activity are genuinely based.",
    cards: [
      {
        country: "Portugal",
        tag: "EU · IRC 19%",
        points: [
          {
            term: "Corporate tax",
            value: "IRC 19%, reduced 15% rate for SMEs on the first €50,000 of taxable profit.",
          },
          { term: "VAT", value: "Standard IVA at 23%." },
          {
            term: "Substance",
            value:
              "Real substance needed: management and activity on the ground. EU member, extensive tax treaties.",
          },
        ],
      },
      {
        country: "France",
        tag: "EU · IS 25%",
        points: [
          { term: "Corporate tax", value: "IS at 25%." },
          {
            term: "Charges & VAT",
            value: "High employer charges (≈ +42% indicative on gross), VAT at 20%.",
          },
          {
            term: "Relevance",
            value:
              "Logical for a domestic market and activity: your clients and your life are in France.",
          },
        ],
      },
      {
        country: "Spain",
        tag: "EU · IS 25%",
        points: [
          {
            term: "Corporate tax",
            value:
              "IS at 25%, with a reduced 15% rate for new companies over their ~first 2 profitable years.",
          },
          { term: "VAT", value: "IVA at 21%." },
          {
            term: "Substance",
            value: "Real substance needed. EU member, logistically close to the Iberian market.",
          },
        ],
      },
      {
        country: "Dubai / UAE",
        tag: "Non-EU · CT 9%",
        points: [
          {
            term: "Corporate tax",
            value: "Corporate Tax at 9% above a profit threshold (~AED 375,000).",
          },
          { term: "VAT", value: "No equivalent to EU VAT; a local 5% VAT applies." },
          {
            term: "The critical point",
            value:
              "Real substance required and a non-EU jurisdiction. For a French tax resident, the controlled-foreign-company and permanent-establishment risk is major (see the alert below).",
          },
        ],
      },
    ],

    cfcEyebrow: "Read this first",
    cfcTitle: "CFC & permanent-establishment alert",
    cfcBody: [
      "This is what many sellers of « offshore companies » keep quiet. If you are a French tax resident and you set up a company abroad run from France, you expose yourself to two mechanisms that can bring taxation back to France, whatever rate is advertised elsewhere.",
      "The first: the controlled-foreign-company (CFC) regime, set out in Article 209 B of the French tax code, which targets structures established in low-tax countries and controlled from France. The second: the notion of permanent establishment and place of effective management, if decisions are actually made in France, the activity can be attached there and taxed.",
    ],
    cfcBullets: [
      "A 9% company in Dubai run from France can be reclassified and taxed in France, with late-payment interest and penalties.",
      "Real « substance » (offices, staff, decisions, presence) is required, especially in Dubai. A mere address is not enough.",
      "The « I live in France but my company is elsewhere » setup is precisely what these rules are designed to neutralise.",
      "The only sound way to benefit from foreign taxation is to genuinely move your tax residence and activity there.",
    ],
    cfcLink: { label: "Company abroad & living in France: the full guide", href: REQUALIF_PATH },

    whyPtEyebrow: "Without overselling",
    whyPtTitle: "Why Portugal stays relevant (for the right reasons)",
    whyPtBody:
      "Portugal is no longer a tax haven, and that is for the best: its relevance today comes from the coherence of the project, not from a miracle rate. For those genuinely relocating to Lisbon or Porto, living there, running their activity there, having their substance there, Portugal offers a solid, readable framework.",
    whyPtPoints: [
      "EU member: free movement, single market, extensive tax treaties, no « non-EU » complications.",
      "IRC at 19%, with 15% for SMEs on the first €50,000, competitive without being an aggressive setup.",
      "Share capital for a Unipessoal Lda or a Lda from €1 per partner: accessible to incorporate.",
      "Quality of life, accessible language, a French-speaking community: real « substance » settles there without pain.",
      "The right instinct: choose Portugal because you live there, not to escape the tax authority of your country of residence.",
    ],

    relatedEyebrow: "To go further",
    relatedTitle: "Useful pages before you decide",
    related: [
      {
        label: "Set up your company in Portugal",
        href: CREATION_PATH,
        desc: "The concrete process: Unipessoal Lda, Lda, NIF/NIPC, capital, banking and support.",
      },
      {
        label: "Portuguese company & living in France",
        href: REQUALIF_PATH,
        desc: "The in-depth guide on reclassification risk, permanent establishment and place of effective management.",
      },
      {
        label: "Company taxation in Portugal",
        href: FISCALITE_PATH,
        desc: "IRC, IVA, double taxation: introduction to the partner tax adviser suited to your case.",
      },
      {
        label: "Frequently asked questions",
        href: FAQ_PATH,
        desc: "Honest answers to the questions that come up most about formation and setup.",
      },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What people ask me about choosing a country",
    faq: [
      {
        q: "What is the best EU country to set up a company in 2026?",
        a: "There is no « best » country in the abstract: the right country is the one where you genuinely live and run the activity. Within the EU, Portugal (IRC 19%, 15% for SMEs on the first €50,000) is competitive against France and Spain (IS 25%), but that rate only makes sense if your substance is on the ground. The decisive criterion remains your tax residence, not the advertised rate.",
      },
      {
        q: "Can you set up a company in Dubai while living in France?",
        a: "It is legally possible, but it is precisely the riskiest setup for a French tax resident. A Dubai company run from France triggers exposure to the controlled-foreign-company regime (Article 209 B of the French tax code) and to reclassification as a permanent establishment or place of effective management: the activity can then be taxed in France, with interest and penalties. Dubai only makes sense if you genuinely move your residence and activity there, with real substance. To be validated with a tax adviser without fail.",
      },
      {
        q: "Portugal or France: which to choose?",
        a: "If your life, your clients and your activity are in France, France remains the logical answer despite IS at 25% and high charges: setting up elsewhere would only create risk. If you genuinely relocate to Portugal, living, running and producing value there, Portugal becomes coherent, with IRC at 19% and EU membership. It is not a rate trade-off, it is a choice of where to live.",
      },
      {
        q: "Is a lower tax rate enough to justify the choice of a country?",
        a: "No. A low rate advertised elsewhere does not protect you if the activity is actually run from your country of residence: it can be attached and taxed there. The total cost also includes the substance to put in place, compliance, audit risk and double taxation. The rate is only one parameter among many.",
      },
      {
        q: "Is Portugal still attractive tax-wise in 2026?",
        a: "Portugal has tightened its taxation (end of the classic NHR, a more restrictive IFICI that excludes retirees and is often not open to nomads with a 100% foreign client base). It remains relevant for those who genuinely settle there: IRC at 19%, 15% for SMEs on the first €50,000, EU membership, quality of life. But it is no longer a tax haven, and that is good news for the legal security of your project.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information and general comparison only; it does not constitute personalised legal, accounting or tax advice. The rates and thresholds quoted (IRC, IS, IVA/VAT, Corporate Tax, charges) are indicative orders of magnitude, current as of 2026 and subject to change with each country's finance acts. The situation of a French tax resident setting up a company abroad depends on complex rules (Article 209 B of the French tax code, permanent establishment, tax treaties) assessed case by case. Business Portugal is a consultant in company formation and setup, not a law or tax firm: for any decision, have your case validated by a tax adviser. Book a meeting to frame your project.",

    ctaTitle: "Let's talk about your project, not a rate",
    ctaBody:
      "A first free conversation, with no commitment, to frame where you live, where you run the activity and which structure holds up. We look at your situation honestly, and if a tax adviser is needed, we connect you with the right partner.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Introduction · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbComparatifs: "Comparisons",
    breadcrumbCurrent: "Portugal vs France, Spain, Dubai",
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
      ...ogLocaleFor(locale),
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

function DataTable({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-[0.95rem]">
        <thead>
          <tr>
            {table.head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-foreground/20 py-3 pr-5 align-bottom font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join("|")} className="align-top">
              {row.map((cell, ci) => (
                <td
                  key={cell}
                  className={cn(
                    "border-b border-border py-4 pr-5 leading-relaxed last:pr-0",
                    ci === 0 ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ComparatifPaysPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const canonical = urlFor(locale, PATH);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.metaTitle,
    description: c.metaDesc,
    inLanguage: locale,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: [
      "Création de société au Portugal",
      "Comparatif fiscal Portugal France Espagne Dubaï",
      "Société étrangère contrôlée (article 209 B du CGI)",
      "Établissement stable et siège de direction effective",
    ],
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
        name: c.breadcrumbComparatifs,
        item: `${SITE_URL}/${locale}/comparatifs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.breadcrumbCurrent,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
                  href="#comparatif"
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
                <p className="eyebrow">{c.criterionEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.criterionPoints.map((it, i) => (
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

      {/* Le vrai critère : où vivez-vous ? */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.criterionEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.criterionTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.criterionBody}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Tableau comparatif pays */}
      <section id="comparatif" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{c.tableEyebrow}</p>
            <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-[1.1] sm:text-4xl">
              {c.tableTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {c.tableSubtitle}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12">
              <DataTable table={c.table} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl border-l-2 border-accent pl-5 text-[0.97rem] italic leading-relaxed text-muted-foreground">
              {c.tableNote}
            </p>
          </Reveal>

          {/* Cartes détaillées par pays */}
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.cards.map((card, i) => (
              <Reveal key={card.country} delay={i * 60}>
                <div className="h-full bg-card p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl">{card.country}</h3>
                    <span className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {card.tag}
                    </span>
                  </div>
                  <dl className="mt-6 divide-y divide-border">
                    {card.points.map((p) => (
                      <div key={p.term} className="py-3.5">
                        <dt className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          {p.term}
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-foreground">{p.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alerte CFC & établissement stable */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <div className="border border-accent bg-background">
              <div className="rule-brass" />
              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4">
                  <TriangleAlert className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {c.cfcEyebrow}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-[1.1] sm:text-4xl">
                      {c.cfcTitle}
                    </h2>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  {c.cfcBody.map((p) => (
                    <p key={p} className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="mt-8 space-y-3.5 border-t border-border pt-8">
                  {c.cfcBullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-foreground">
                      <span
                        className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={c.cfcLink.href}
                  className="mt-8 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
                >
                  {c.cfcLink.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pourquoi le Portugal reste pertinent */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.whyPtEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.whyPtTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.whyPtBody}</p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.whyPtPoints.map((p, i) => (
                <Reveal key={p} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-6">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-foreground">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pour aller plus loin (maillage) */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{c.relatedEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.relatedTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.related.map((r, i) => (
              <Reveal key={r.href} delay={i * 60}>
                <Link href={r.href} className="group block h-full bg-card p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl leading-tight">{r.label}</h3>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{r.desc}</p>
                </Link>
              </Reveal>
            ))}
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

      {/* Disclaimer YMYL renforcé */}
      <section className="border-t border-border bg-card">
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
