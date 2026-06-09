import { ArrowRight, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, LEGAL_NAME, languagesFor, NIPC, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/avis-et-garanties";

type Props = { params: Promise<{ locale: string }> };

type Item = { title: string; description: string };
type Fact = { term: string; value: string };
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

  checklistEyebrow: string;
  checklistTitle: string;
  checklistBody: string;
  checklist: Item[];

  pitfallsEyebrow: string;
  pitfallsTitle: string;
  pitfallsBody: string;
  pitfalls: Item[];
  pitfallsNote: string;

  proofEyebrow: string;
  proofTitle: string;
  proofBody: string;
  proofFacts: Fact[];
  occNote: string;

  commitEyebrow: string;
  commitTitle: string;
  commitBody: string;
  commitLabel: string;
  commitments: string[];

  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsBody: string;
  reviewsPlaceholder: string;

  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: Faq[];

  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbCurrent: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Avis & garanties, créer sa société au Portugal de façon fiable",
    metaDesc:
      "Comment reconnaître un accompagnement sérieux au Portugal, les pièges à éviter et pourquoi Business Portugal est une entité vérifiable (Lovelyparallel Lda, NIPC 518354750). Échange gratuit et sans engagement.",

    eyebrow: "Réassurance",
    title: "Créer votre société au Portugal",
    titleAccent: "sereinement, sur des bases vérifiables",
    lead: "Choisir à qui confier son implantation au Portugal est une décision sensible. Cette page vous donne des repères concrets pour reconnaître un accompagnement sérieux, repérer les pratiques douteuses, et vérifier par vous-même qui est derrière Business Portugal. Pas de promesse magique : des faits que vous pouvez contrôler.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir la checklist",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    checklistEyebrow: "Le repère utile",
    checklistTitle: "Comment reconnaître un accompagnement sérieux au Portugal",
    checklistBody:
      "Avant de signer, vérifiez quelques points simples. Un accompagnement fiable n'a aucun mal à les démontrer, un prestataire qui les esquive doit vous alerter. Voici la checklist que vous pouvez utiliser avec n'importe quel cabinet, y compris le nôtre.",
    checklist: [
      {
        title: "Une entité juridique vérifiable",
        description:
          "Un NIPC (numéro de société portugaise) ou un SIREN consultable, une dénomination claire, une adresse. Vous devez pouvoir identifier qui vous engage, pas un simple compte de réseau social.",
      },
      {
        title: "La comptabilité confiée à un Contabilista Certificado inscrit à l'OCC",
        description:
          "Toute société portugaise doit désigner un Contabilista Certificado inscrit à l'Ordem dos Contabilistas Certificados. Son inscription est consultable dans un registre public. Demandez le nom : il est vérifiable en quelques minutes.",
      },
      {
        title: "Un périmètre annoncé clairement",
        description:
          "Ce qui est réalisé en interne et ce qui passe par des partenaires (comptabilité, fiscalité, juridique). Un cabinet honnête distingue ce qu'il fait lui-même de ce qu'il coordonne, sans s'attribuer des titres réglementés qu'il n'a pas.",
      },
      {
        title: "La bonne terminologie portugaise",
        description:
          "Unipessoal Lda et Lda (pas « EURL » ni « SARL »), NIF pour le particulier, NIPC pour la société, IRS/IRC/IVA. Un interlocuteur qui emploie le jargon français approximatif maîtrise rarement le terrain portugais.",
      },
      {
        title: "Un devis écrit, sans frais cachés",
        description:
          "Le périmètre, les honoraires et ce qui n'est pas inclus, par écrit, avant tout engagement. Les coûts administratifs (immatriculation, registres) doivent être distingués des honoraires d'accompagnement.",
      },
      {
        title: "Des délais et des chances présentés honnêtement",
        description:
          "L'ouverture d'un compte bancaire dépend toujours de la compliance de la banque ; aucun délai administratif ne se commande. Méfiez-vous des « garanti » et des « en 2 heures ».",
      },
    ],

    pitfallsEyebrow: "À garder en tête",
    pitfallsTitle: "Les pièges et arnaques à éviter",
    pitfallsBody:
      "Ces pratiques sont documentées sur le marché de l'expatriation et de la création de société au Portugal. Les citer n'accuse personne en particulier : ce sont des signaux à connaître pour décider en confiance, quel que soit le prestataire que vous choisissez.",
    pitfalls: [
      {
        title: "Les fausses factures « officielles »",
        description:
          "Des courriers type « Registre des Sociétés Européennes » réclament un paiement en se faisant passer pour une formalité obligatoire. L'inscription officielle d'une société est gratuite : ces sollicitations sont des offres commerciales facultatives, pas des obligations.",
      },
      {
        title: "Les promesses fiscales trop belles",
        description:
          "« Zéro impôt », « 0 risque garanti », IFICI (ex-RNH) « pour tout le monde ». L'IFICI exclut notamment les retraités sur leurs pensions et vise des profils précis. Une promesse de résultat fiscal sans étude de votre cas est un signal d'alerte.",
      },
      {
        title: "La coquille « créée en 2 heures »",
        description:
          "Une société constituée à la va-vite et pilotée depuis la France sans substance réelle expose à des frictions bancaires et à un risque de requalification fiscale française. La vitesse seule n'est pas un gage de sécurité.",
      },
      {
        title: "Le « comptable » non inscrit à l'OCC",
        description:
          "Seul un Contabilista Certificado inscrit à l'OCC peut assurer légalement la comptabilité réglementée d'une société portugaise. Confier ses comptes à un intervenant non inscrit expose à des erreurs et à des sanctions.",
      },
      {
        title: "Le mandat sans contrat ni périmètre écrit",
        description:
          "Verser une somme sans devis détaillé ni description précise de la prestation rend tout recours difficile en cas de désaccord. Exigez toujours un écrit avant de payer.",
      },
      {
        title: "La domiciliation purement fictive",
        description:
          "Une adresse « boîte aux lettres » sans réalité économique peut exposer à une requalification. Une domiciliation conforme et substantielle est préférable à un siège purement fictif.",
      },
    ],
    pitfallsNote:
      "Note : nommer ces pratiques ne vise aucun prestataire en particulier. La plupart des cabinets francophones au Portugal sont sérieux. Notre objectif est de vous donner des critères objectifs pour comparer, pas de jeter le discrédit sur quiconque.",

    proofEyebrow: "Ce que vous pouvez vérifier",
    proofTitle: "Pourquoi Business Portugal est une base fiable",
    proofBody:
      "Nous appliquons à nous-mêmes la checklist ci-dessus. Voici les éléments que vous pouvez contrôler avant même de nous parler, c'est la meilleure réassurance que l'on puisse offrir.",
    proofFacts: [
      {
        term: "Une entité réelle et vérifiable",
        value: `${LEGAL_NAME}, société de droit portugais immatriculée sous le NIPC ${NIPC}. Le numéro est consultable publiquement.`,
      },
      {
        term: "Comptabilité via un Contabilista Certificado OCC",
        value:
          "La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'Ordem dos Contabilistas Certificados, dont l'inscription figure au registre public de l'OCC.",
      },
      {
        term: "Des partenaires nommés, pas anonymes",
        value:
          "Ouverture bancaire avec Millennium ; comptabilité et conseil via des partenaires identifiés tels que Raly Conseils et Joongle. Vous savez qui intervient et à quel titre.",
      },
      {
        term: "Une expérience concrète",
        value:
          "Plus de 75 entrepreneurs accompagnés depuis 2025 dans la création de société et le déblocage bancaire au Portugal.",
      },
      {
        term: "Un positionnement honnête",
        value:
          "Audrey Marques est consultante en création et implantation d'entreprise, ni comptable, ni fiscaliste, ni avocate. Pour ces métiers réglementés, elle met en relation avec des spécialistes inscrits.",
      },
    ],
    occNote:
      "Le titre de Contabilista Certificado est protégé et régulé par l'OCC, dont le registre est public. C'est un point que vous pouvez vérifier en quelques minutes, pour notre partenaire comme pour n'importe quel cabinet.",

    commitEyebrow: "Mes engagements",
    commitTitle: "Ce sur quoi vous pouvez compter",
    commitBody:
      "Pas de garantie de résultat impossible à tenir : des engagements simples, tenables, que vous pouvez constater dès le premier échange.",
    commitLabel: "Mes engagements concrets",
    commitments: [
      "Un premier échange 100 % gratuit et sans engagement",
      "De la transparence : périmètre, partenaires et ce qui n'est pas inclus, dits clairement",
      "De la réactivité et un interlocuteur unique du premier contact à la mise en relation",
      "Aucune promesse de « 0 impôt » ni de délai garanti : les administrations et la compliance bancaire ne se commandent pas",
      "Une mise en relation avec des spécialistes inscrits pour tout ce qui est réglementé",
    ],

    reviewsEyebrow: "Les avis",
    reviewsTitle: "Des avis clients, honnêtement",
    reviewsBody:
      "Nous accompagnons des entrepreneurs depuis 2025. Plutôt que de publier des témoignages anonymes invérifiables, nous préférons attendre et afficher de vrais avis nominatifs.",
    reviewsPlaceholder:
      "Les premiers avis Google vérifiables seront publiés ici prochainement. En attendant, le meilleur moyen de vous faire une idée est un premier échange gratuit, sans engagement.",

    faqEyebrow: "Vos questions",
    faqTitle: "Fiabilité, sérieux, arnaques : vos questions",
    faqSubtitle:
      "Les questions qui reviennent au moment de choisir. Des réponses factuelles, sans survente.",
    faqs: [
      {
        q: "Créer une société au Portugal à distance, est-ce une arnaque ?",
        a: "Non en soi : c'est une démarche parfaitement légale, possible sans résider au Portugal. Le risque ne vient pas de la distance mais des prestataires qui survendent, des coquilles sans substance et d'un pilotage depuis la France sans accompagnement, qui peut entraîner une requalification fiscale française. D'où l'importance d'un accompagnement réel et d'une entité vérifiable.",
      },
      {
        q: "Comment vérifier qu'un cabinet est fiable au Portugal ?",
        a: "Vérifiez son entité juridique (NIPC ou SIREN), demandez le nom du Contabilista Certificado inscrit à l'OCC qui assure la comptabilité (registre public), exigez un devis écrit sans frais cachés, et écoutez la terminologie employée. Un prestataire qui distingue ce qu'il fait lui-même de ce qu'il coordonne, et qui ne promet pas « 0 risque », est plus rassurant qu'un discours trop parfait.",
      },
      {
        q: "Business Portugal est-il une entité vérifiable ?",
        a: `Oui. Business Portugal est porté par ${LEGAL_NAME}, société de droit portugais immatriculée sous le NIPC ${NIPC}. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, et les partenaires (Millennium pour la banque, Raly Conseils et Joongle pour la comptabilité et le conseil) sont nommés.`,
      },
      {
        q: "Pourquoi n'y a-t-il pas encore d'avis affichés ?",
        a: "Par honnêteté. Nous accompagnons des entrepreneurs depuis 2025, mais nous préférons publier de vrais avis Google nominatifs et vérifiables plutôt que des témoignages anonymes invérifiables. Les premiers avis vérifiables arriveront bientôt sur cette page.",
      },
      {
        q: "Quelles garanties proposez-vous ?",
        a: "Un premier échange gratuit et sans engagement, de la transparence sur le périmètre et les partenaires, de la réactivité et un interlocuteur unique. En revanche, nous ne garantissons ni un délai administratif absolu, ni l'ouverture d'un compte bancaire, qui dépend toujours de la compliance de la banque. Promettre l'inverse serait malhonnête.",
      },
      {
        q: "Audrey Marques est-elle comptable ou fiscaliste ?",
        a: "Non. Audrey est consultante en création et implantation d'entreprise au Portugal. Elle réalise la création de société et l'accompagnement bancaire, puis met en relation avec des spécialistes inscrits (Contabilista Certificado pour la comptabilité, partenaires pour la fiscalité et le juridique). Ce positionnement honnête vous protège.",
      },
    ],

    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Chaque situation dépend de votre cas individuel et de la convention fiscale France-Portugal. Pour une analyse de votre projet, prenez rendez-vous. Informations à jour en 2026, susceptibles d'évoluer.",

    ctaTitle: "Faites-vous votre propre idée",
    ctaBody:
      "Un premier échange gratuit et sans engagement vaut mieux que tous les arguments. On regarde votre projet, on répond à vos doutes, et vous décidez en toute connaissance de cause.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Avis & garanties",
  },
  en: {
    metaTitle: "Reviews & guarantees, setting up a company in Portugal safely",
    metaDesc:
      "How to recognise serious support in Portugal, the pitfalls to avoid, and why Business Portugal is a verifiable entity (Lovelyparallel Lda, NIPC 518354750). Free conversation, no commitment.",

    eyebrow: "Reassurance",
    title: "Set up your company in Portugal",
    titleAccent: "with peace of mind, on verifiable ground",
    lead: "Choosing who to trust with your move to Portugal is a sensitive decision. This page gives you concrete markers to recognise serious support, spot questionable practices, and verify for yourself who is behind Business Portugal. No magic promises, facts you can check.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the checklist",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    checklistEyebrow: "A useful marker",
    checklistTitle: "How to recognise serious support in Portugal",
    checklistBody:
      "Before signing, check a few simple things. Reliable support has no trouble demonstrating them, a provider who dodges them should put you on alert. Here is a checklist you can use with any firm, including ours.",
    checklist: [
      {
        title: "A verifiable legal entity",
        description:
          "A NIPC (Portuguese company number) or a searchable registration number, a clear name, an address. You must be able to identify who you are committing to, not just a social media account.",
      },
      {
        title: "Accounting handled by a Contabilista Certificado registered with the OCC",
        description:
          "Every Portuguese company must appoint a Contabilista Certificado registered with the Ordem dos Contabilistas Certificados. Their registration is in a public register. Ask for the name: it can be verified in minutes.",
      },
      {
        title: "A clearly stated scope",
        description:
          "What is done in-house and what goes through partners (accounting, tax, legal). An honest firm distinguishes what it does itself from what it coordinates, without claiming regulated titles it does not hold.",
      },
      {
        title: "The right Portuguese terminology",
        description:
          "Unipessoal Lda and Lda (not “EURL” or “SARL”), NIF for the individual, NIPC for the company, IRS/IRC/IVA. Someone using loose French jargon rarely masters the Portuguese ground.",
      },
      {
        title: "A written quote, no hidden fees",
        description:
          "The scope, the fees and what is not included, in writing, before any commitment. Administrative costs (registration, registers) should be separated from advisory fees.",
      },
      {
        title: "Timelines and odds presented honestly",
        description:
          "Opening a bank account always depends on the bank's compliance; no administrative deadline can be ordered. Be wary of “guaranteed” and “in 2 hours”.",
      },
    ],

    pitfallsEyebrow: "Worth keeping in mind",
    pitfallsTitle: "Pitfalls and scams to avoid",
    pitfallsBody:
      "These practices are documented across the Portuguese expatriation and company-formation market. Naming them accuses no one in particular: they are signals to know so you can decide with confidence, whatever provider you choose.",
    pitfalls: [
      {
        title: "Fake “official” invoices",
        description:
          "Letters such as “European Company Register” demand a payment while posing as a mandatory formality. Official company registration is free: these solicitations are optional commercial offers, not obligations.",
      },
      {
        title: "Tax promises that are too good",
        description:
          "“Zero tax”, “0 risk guaranteed”, IFICI (former NHR) “for everyone”. IFICI notably excludes retirees on their pensions and targets specific profiles. A promise of a tax outcome without studying your case is a warning sign.",
      },
      {
        title: "The “set up in 2 hours” shell",
        description:
          "A company rushed into existence and run from abroad with no real substance exposes you to banking friction and to a risk of French tax requalification. Speed alone is no guarantee of safety.",
      },
      {
        title: "The “accountant” not registered with the OCC",
        description:
          "Only a Contabilista Certificado registered with the OCC can legally handle the regulated accounting of a Portuguese company. Entrusting your accounts to someone unregistered exposes you to errors and penalties.",
      },
      {
        title: "A mandate with no contract or written scope",
        description:
          "Paying without a detailed quote or a precise description of the service makes any recourse difficult in case of disagreement. Always require something in writing before paying.",
      },
      {
        title: "Purely fictitious domiciliation",
        description:
          "A “mailbox” address with no economic substance can expose you to requalification. A compliant, substantial domiciliation is preferable to a purely fictitious registered office.",
      },
    ],
    pitfallsNote:
      "Note: naming these practices targets no provider in particular. Most French-speaking firms in Portugal are serious. Our aim is to give you objective criteria to compare, not to discredit anyone.",

    proofEyebrow: "What you can verify",
    proofTitle: "Why Business Portugal is a reliable base",
    proofBody:
      "We apply the checklist above to ourselves. Here are the elements you can check before we even speak, that is the best reassurance we can offer.",
    proofFacts: [
      {
        term: "A real, verifiable entity",
        value: `${LEGAL_NAME}, a company under Portuguese law registered under NIPC ${NIPC}. The number is publicly searchable.`,
      },
      {
        term: "Accounting via an OCC-registered Contabilista Certificado",
        value:
          "Regulated accounting is handled by a Contabilista Certificado registered with the Ordem dos Contabilistas Certificados, whose registration appears in the OCC's public register.",
      },
      {
        term: "Named partners, not anonymous ones",
        value:
          "Bank account opening with Millennium; accounting and advisory through identified partners such as Raly Conseils and Joongle. You know who is involved and in what capacity.",
      },
      {
        term: "Concrete experience",
        value:
          "More than 75 entrepreneurs supported since 2025 in company formation and bank account opening in Portugal.",
      },
      {
        term: "An honest positioning",
        value:
          "Audrey Marques is a consultant in company creation and setup, not an accountant, tax adviser or lawyer. For those regulated professions, she connects you with registered specialists.",
      },
    ],
    occNote:
      "The Contabilista Certificado title is protected and regulated by the OCC, whose register is public. It is something you can verify in minutes, for our partner as for any firm.",

    commitEyebrow: "My commitments",
    commitTitle: "What you can count on",
    commitBody:
      "No impossible result guarantee: simple, achievable commitments you can observe from the very first conversation.",
    commitLabel: "My concrete commitments",
    commitments: [
      "A first conversation 100% free and with no commitment",
      "Transparency: scope, partners and what is not included, stated clearly",
      "Responsiveness and a single point of contact from first contact to introductions",
      "No “zero tax” or guaranteed-deadline promises: administrations and banking compliance cannot be ordered",
      "Introductions to registered specialists for everything regulated",
    ],

    reviewsEyebrow: "Reviews",
    reviewsTitle: "Client reviews, honestly",
    reviewsBody:
      "We have supported entrepreneurs since 2025. Rather than publishing anonymous, unverifiable testimonials, we prefer to wait and display real, named reviews.",
    reviewsPlaceholder:
      "The first verifiable Google reviews will be published here soon. In the meantime, the best way to form your own opinion is a free first conversation, with no commitment.",

    faqEyebrow: "Your questions",
    faqTitle: "Reliability, seriousness, scams: your questions",
    faqSubtitle: "The questions that come up when choosing. Factual answers, no overselling.",
    faqs: [
      {
        q: "Is setting up a company in Portugal remotely a scam?",
        a: "Not in itself: it is a perfectly legal process, possible without residing in Portugal. The risk comes not from distance but from providers who oversell, from substanceless shells, and from running the company from abroad without support, which can lead to French tax requalification. Hence the importance of real support and a verifiable entity.",
      },
      {
        q: "How do I check that a firm in Portugal is reliable?",
        a: "Check its legal entity (NIPC or registration number), ask for the name of the OCC-registered Contabilista Certificado handling the accounting (public register), require a written quote with no hidden fees, and listen to the terminology used. A provider who distinguishes what it does itself from what it coordinates, and who does not promise “0 risk”, is more reassuring than a too-perfect pitch.",
      },
      {
        q: "Is Business Portugal a verifiable entity?",
        a: `Yes. Business Portugal is run by ${LEGAL_NAME}, a company under Portuguese law registered under NIPC ${NIPC}. Regulated accounting is handled by an OCC-registered Contabilista Certificado, and the partners (Millennium for banking, Raly Conseils and Joongle for accounting and advisory) are named.`,
      },
      {
        q: "Why are there no reviews shown yet?",
        a: "Out of honesty. We have supported entrepreneurs since 2025, but we prefer to publish real, named and verifiable Google reviews rather than anonymous, unverifiable testimonials. The first verifiable reviews will appear on this page soon.",
      },
      {
        q: "What guarantees do you offer?",
        a: "A free first conversation with no commitment, transparency on scope and partners, responsiveness and a single point of contact. However, we do not guarantee an absolute administrative deadline, nor the opening of a bank account, which always depends on the bank's compliance. Promising otherwise would be dishonest.",
      },
      {
        q: "Is Audrey Marques an accountant or tax adviser?",
        a: "No. Audrey is a consultant in company creation and setup in Portugal. She handles company formation and banking support, then connects you with registered specialists (Contabilista Certificado for accounting, partners for tax and legal). This honest positioning protects you.",
      },
    ],

    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Every situation depends on your individual case and on the France-Portugal tax treaty. For an analysis of your project, book a meeting. Information up to date in 2026, subject to change.",

    ctaTitle: "Make up your own mind",
    ctaBody:
      "A free first conversation, with no commitment, is worth more than any argument. We look at your project, answer your doubts, and you decide with full knowledge of the facts.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbCurrent: "Reviews & guarantees",
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

export default async function AvisEtGarantiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: c.breadcrumbHome,
        item: urlFor(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbCurrent,
        item: urlFor(locale, PATH),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${urlFor(locale, PATH)}#faq`,
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                  href="#checklist"
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
                <p className="eyebrow">{c.commitLabel}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.commitments.map((it, i) => (
                    <div key={it} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem]">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Checklist, reconnaître un accompagnement sérieux */}
      <section id="checklist" className="scroll-mt-24 border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.checklistEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.checklistTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.checklistBody}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.checklist.map((it, i) => (
                <Reveal key={it.title} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-7">
                    <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <h3 className="font-serif text-xl">{it.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">
                        {it.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pièges & arnaques à éviter */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.pitfallsEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.pitfallsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.pitfallsBody}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.pitfalls.map((it, i) => (
              <Reveal key={it.title} delay={i * 60} className="bg-card">
                <div className="h-full p-7">
                  <span className="index-num text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl">{it.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{it.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <p className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
              {c.pitfallsNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pourquoi Business Portugal est fiable */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.proofEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.proofTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.proofBody}</p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.proofFacts.map((f, i) => (
                  <Reveal key={f.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.42fr_0.58fr] sm:gap-8">
                      <dt className="flex items-baseline gap-3 font-serif text-lg">
                        <span
                          className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                          aria-hidden
                        />
                        <span>{f.term}</span>
                      </dt>
                      <dd className="leading-relaxed text-muted-foreground">{f.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={80}>
                <div className="mt-10 flex items-start gap-4 border border-border bg-background p-6">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                    {c.occNote}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.commitEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.commitTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.commitBody}</p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.commitments.map((g, i) => (
                <Reveal key={g} delay={i * 60}>
                  <div className="flex items-baseline gap-5 border-b border-border py-4">
                    <span className="index-num text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.05rem]">{g}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avis (placeholder honnête) */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.reviewsEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.reviewsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.reviewsBody}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 border border-border bg-background">
              <div className="rule-brass" />
              <div className="flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:gap-8 lg:p-10">
                <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-5 w-5 text-accent" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {c.reviewsPlaceholder}
                </p>
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
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.faqSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 50}>
                  <div className="border-b border-border py-7">
                    <h3 className="font-serif text-xl leading-snug">{f.q}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={80}>
                <p className="mt-10 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.disclaimer}
                </p>
              </Reveal>
            </div>
          </div>
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
