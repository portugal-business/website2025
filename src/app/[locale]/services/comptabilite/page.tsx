import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/services/comptabilite";

type Props = { params: Promise<{ locale: string }> };

type Item = { title: string; description: string };
type Coverage = { term: string; value: string };
type Faq = { q: string; a: string };
type Tier = { label: string; price: string; note: string };

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
  honestyTitle: string;
  honestyBody: string;
  bonMotLabel: string;
  bonMot: string;

  obligEyebrow: string;
  obligTitle: string;
  obligSubtitle: string;
  oblig: Item[];

  tocEyebrow: string;
  tocTitle: string;
  tocBody: string;
  tocPoints: string[];

  coverageEyebrow: string;
  coverageTitle: string;
  coverageSubtitle: string;
  coverage: Coverage[];

  orientEyebrow: string;
  orientTitle: string;
  orientSubtitle: string;
  orient: Item[];

  priceEyebrow: string;
  priceTitle: string;
  priceSubtitle: string;
  tiers: Tier[];
  priceNote: string;

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
  breadcrumbServices: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Comptable francophone au Portugal : mise en relation",
    metaDesc:
      "Au Portugal, un Contabilista Certificado inscrit à l'OCC est obligatoire dès la constitution d'une société. Je vous oriente vers le bon partenaire comptable francophone (à partir d'environ 200 €/mois) et je coordonne. Premier échange gratuit et sans engagement.",

    eyebrow: "Réseau de partenaires",
    title: "Un comptable francophone au Portugal,",
    titleAccent: "le bon partenaire, mis en relation",
    lead: "Je ne suis pas comptable, et je ne le prétends jamais. Au Portugal, la comptabilité d'une société est réglementée : elle doit être tenue par un Contabilista Certificado inscrit à l'OCC. Mon rôle est de vous orienter vers le bon partenaire francophone, de coordonner la passation après la création de votre société, et de rester votre interlocuteur unique.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Pourquoi c'est obligatoire",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    honestyEyebrow: "Ce que je fais, et ne fais pas",
    honestyTitle: "La transparence avant tout : je coordonne, je ne tiens pas vos comptes",
    honestyBody:
      "Audrey Marques est consultante en création et implantation d'entreprise au Portugal, pas comptable ni fiscaliste. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet (Raly Conseils, Joongle selon vos besoins). Je vous mets en relation avec le profil adapté à votre activité, je facilite la passation des documents après la création, et je coordonne l'ensemble pour que vous gardiez un seul interlocuteur.",
    bonMotLabel: "Le bon mot",
    bonMot:
      "Au Portugal, on ne dit pas « expert-comptable » mais Contabilista Certificado (ex-TOC) : un professionnel agréé, inscrit à l'Ordem dos Contabilistas Certificados (OCC), dont l'inscription est publique et vérifiable. C'est ce statut réglementé que votre société doit mandater.",

    obligEyebrow: "Le cadre légal",
    obligTitle: "Pourquoi un comptable est obligatoire au Portugal",
    obligSubtitle:
      "Pour une société (Unipessoal Lda, Lda, SA), la comptabilité organisée tenue par un Contabilista Certificado n'est pas une option : c'est une obligation dès la constitution. Voici ce que cela recouvre concrètement.",
    oblig: [
      {
        title: "Obligatoire dès la constitution",
        description:
          "Toute société portugaise doit désigner un Contabilista Certificado inscrit à l'OCC pour signer et déposer ses comptes. Ce n'est pas le cas d'un simple ENI en régime simplifié, mais ça l'est pour votre Unipessoal Lda ou Lda.",
      },
      {
        title: "Comptabilité organisée",
        description:
          "Les sociétés relèvent de la comptabilité organisée (et non du régime simplifié réservé à certains indépendants sous seuil). Le passage en comptabilité organisée devient également obligatoire au-delà de 200 000 € de chiffre d'affaires.",
      },
      {
        title: "Responsabilité du Contabilista",
        description:
          "Le Contabilista Certificado engage sa responsabilité professionnelle sur les déclarations qu'il signe. C'est une garantie de sérieux que les structures « low cost » ou non agréées ne peuvent pas offrir.",
      },
      {
        title: "Vérifiable publiquement",
        description:
          "L'inscription à l'OCC est publique : on peut vérifier en quelques instants qu'un comptable est bien agréé. C'est l'un des meilleurs réflexes anti-arnaque sur le marché francophone.",
      },
    ],

    tocEyebrow: "Le bon réflexe",
    tocTitle: "Vérifier que votre comptable est bien inscrit à l'OCC",
    tocBody:
      "Le titre de Contabilista Certificado est protégé et régulé par l'Ordem dos Contabilistas Certificados. Avant de confier vos comptes à qui que ce soit, vous pouvez, et devez, vérifier son inscription. Les partenaires vers lesquels je vous oriente sont des professionnels agréés et reconnus.",
    tocPoints: [
      "Le statut est réglementé : seul un membre inscrit peut signer vos déclarations",
      "Le registre de l'OCC est public et consultable en quelques instants",
      "Une structure qui refuse de communiquer son inscription est un signal d'alerte",
      "Mes partenaires (Raly Conseils, Joongle) sont des cabinets agréés et établis",
    ],

    coverageEyebrow: "Le périmètre",
    coverageTitle: "Ce que couvre la comptabilité d'une société portugaise",
    coverageSubtitle:
      "Au-delà de la tenue des comptes, le Contabilista Certificado partenaire gère les obligations déclaratives récurrentes. Les principales, en terminologie portugaise.",
    coverage: [
      {
        term: "IRC",
        value:
          "Impôt sur les sociétés. Déclaration annuelle (Modelo 22) et paiements en cours d'exercice. Taux 2026 : 19 % en général, 15 % pour les PME sur les premiers 50 000 € de bénéfice.",
      },
      {
        term: "IVA",
        value:
          "TVA portugaise (taux standard 23 %). Déclarations périodiques (mensuelles ou trimestrielles), gestion de la franchise en base et du guichet OSS pour le e-commerce intra-UE.",
      },
      {
        term: "IES",
        value:
          "Informação Empresarial Simplificada : déclaration annuelle unique qui regroupe comptes, statistiques et dépôt légal. Échéance habituellement à la mi-juillet.",
      },
      {
        term: "SAF-T",
        value:
          "Fichier comptable et de facturation normalisé exigé par l'Autoridade Tributária, généré via un logiciel de facturation certifié AT (avec ATCUD et QR code).",
      },
      {
        term: "Segurança Social",
        value:
          "Déclarations et cotisations sociales du gérant et, le cas échéant, des salariés. La paie peut être prise en charge par le cabinet partenaire.",
      },
      {
        term: "Clôture annuelle",
        value:
          "Établissement et dépôt des comptes annuels, signés par le Contabilista Certificado qui engage sa responsabilité professionnelle.",
      },
    ],

    orientEyebrow: "Comment je vous oriente",
    orientTitle: "Vers le bon partenaire, au bon moment",
    orientSubtitle:
      "La comptabilité s'enclenche une fois la société créée. Voici comment se passe la mise en relation, sans rupture entre la création et la gestion courante.",
    orient: [
      {
        title: "On cadre votre activité",
        description:
          "Volume de factures, secteur, IVA applicable, salariés éventuels, besoin en français : on identifie le profil de cabinet le plus adapté plutôt qu'une solution unique pour tous.",
      },
      {
        title: "Je vous mets en relation",
        description:
          "Je vous oriente vers un partenaire francophone, Raly Conseils en principal, Joongle selon les besoins, déjà rompu aux dossiers d'entrepreneurs francophones installés au Portugal.",
      },
      {
        title: "Je facilite la passation",
        description:
          "Les documents issus de la création (Certidão Permanente, RCBE, statuts) sont transmis au comptable. La bascule se fait sans que vous ayez à tout réexpliquer de zéro.",
      },
      {
        title: "Je reste votre interlocuteur",
        description:
          "Vous gardez un point de contact unique pour coordonner création, banque, comptabilité et, si besoin, fiscalité ou recrutement via le réseau de partenaires.",
      },
    ],

    priceEyebrow: "Ce que ça coûte",
    priceTitle: "Des fourchettes honnêtes, pas une grille rigide",
    priceSubtitle:
      "Les honoraires comptables dépendent de votre activité (volume de factures, IVA, salariés). Je préfère vous donner des ordres de grandeur transparents plutôt qu'un tarif unique qui ne tiendrait pas la réalité de votre dossier.",
    tiers: [
      {
        label: "Comptabilité société",
        price: "à partir d'environ 200 €/mois",
        note: "Via le cabinet partenaire (environ 200 à 250 €/mois selon le volume). Honoraires facturés directement par le Contabilista Certificado.",
      },
      {
        label: "Domiciliation",
        price: "environ 500 € HT/an",
        note: "Solution de domiciliation à Lisbonne via un partenaire, si votre projet en a besoin.",
      },
      {
        label: "Mise en relation",
        price: "sur devis après échange gratuit",
        note: "Mon accompagnement et la coordination sont cadrés lors du premier échange, gratuit et sans engagement.",
      },
    ],
    priceNote:
      "Les montants comptables sont facturés directement par le cabinet partenaire et varient selon votre dossier. Je vous donne une estimation claire lors de notre échange.",

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Comptabilité au Portugal : l'essentiel",
    faq: [
      {
        q: "Êtes-vous comptable ?",
        a: "Non. Je suis consultante en création et implantation d'entreprise au Portugal. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet. Je vous mets en relation et je coordonne.",
      },
      {
        q: "Un comptable est-il vraiment obligatoire pour ma société ?",
        a: "Oui. Une société portugaise (Unipessoal Lda, Lda, SA) doit désigner un Contabilista Certificado inscrit à l'OCC dès sa constitution pour tenir sa comptabilité organisée et signer ses déclarations.",
      },
      {
        q: "Combien coûte un comptable pour une société au Portugal ?",
        a: "Comptez en général à partir d'environ 200 €/mois (souvent 200 à 250 €/mois) via le cabinet partenaire, selon votre volume de factures, votre IVA et la présence de salariés. Le tarif exact est fixé par le Contabilista Certificado.",
      },
      {
        q: "Le comptable parle-t-il français ?",
        a: "Oui : je vous oriente vers des partenaires francophones (Raly Conseils, Joongle selon les besoins), habitués aux entrepreneurs francophones installés au Portugal.",
      },
      {
        q: "Comment vérifier qu'un comptable est bien agréé ?",
        a: "Le titre de Contabilista Certificado est réglementé par l'OCC, dont l'inscription est publique et vérifiable. Un professionnel sérieux n'a aucune difficulté à communiquer son inscription.",
      },
    ],

    disclaimerLabel: "Information",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet ; les obligations dépendent de votre situation individuelle. Informations à jour en 2026, susceptibles d'évoluer (Orçamento do Estado). Pour une analyse de votre cas, prenez rendez-vous.",

    ctaTitle: "Parlons de votre comptabilité",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre besoin comptable et vous orienter vers le bon partenaire francophone. On regarde votre activité, on identifie le bon cabinet, on coordonne la mise en relation.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Comptabilité",
    serviceName: "Mise en relation avec un comptable francophone au Portugal",
  },
  en: {
    metaTitle: "French-speaking accountant in Portugal: introduction",
    metaDesc:
      "In Portugal, a Contabilista Certificado registered with the OCC is mandatory from the moment a company is incorporated. I connect you with the right French-speaking accounting partner (from around €200/month) and coordinate. First conversation free, no commitment.",

    eyebrow: "Partner network",
    title: "A French-speaking accountant in Portugal,",
    titleAccent: "the right partner, introduced to you",
    lead: "I am not an accountant, and I never claim to be. In Portugal, a company's accounting is regulated: it must be kept by a Contabilista Certificado registered with the OCC. My role is to connect you with the right French-speaking partner, coordinate the handover after your company is set up, and remain your single point of contact.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "Why it is mandatory",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    honestyEyebrow: "What I do, and don't do",
    honestyTitle: "Transparency first: I coordinate, I do not keep your books",
    honestyBody:
      "Audrey Marques is a consultant in company formation and business setup in Portugal, not an accountant or a tax adviser. Regulated accounting is handled by a Contabilista Certificado registered with the OCC, a partner of the practice (Raly Conseils, Joongle depending on your needs). I connect you with the profile suited to your activity, ease the handover of documents after incorporation, and coordinate everything so you keep a single point of contact.",
    bonMotLabel: "The right word",
    bonMot:
      "In Portugal you do not say “chartered accountant” but Contabilista Certificado (formerly TOC): a licensed professional, registered with the Ordem dos Contabilistas Certificados (OCC), whose registration is public and verifiable. This is the regulated status your company must appoint.",

    obligEyebrow: "The legal framework",
    obligTitle: "Why an accountant is mandatory in Portugal",
    obligSubtitle:
      "For a company (Unipessoal Lda, Lda, SA), organised accounting kept by a Contabilista Certificado is not optional: it is required from incorporation. Here is what that means in practice.",
    oblig: [
      {
        title: "Mandatory from incorporation",
        description:
          "Every Portuguese company must appoint a Contabilista Certificado registered with the OCC to sign and file its accounts. This does not apply to a simple ENI under the simplified regime, but it does to your Unipessoal Lda or Lda.",
      },
      {
        title: "Organised accounting",
        description:
          "Companies fall under organised accounting (not the simplified regime reserved for certain self-employed people below a threshold). Switching to organised accounting also becomes mandatory above €200,000 in turnover.",
      },
      {
        title: "The Contabilista's liability",
        description:
          "The Contabilista Certificado bears professional liability for the declarations they sign. That is a guarantee of seriousness that “low cost” or unlicensed structures cannot offer.",
      },
      {
        title: "Publicly verifiable",
        description:
          "Registration with the OCC is public: you can check in moments that an accountant is properly licensed. It is one of the best anti-scam reflexes on the French-speaking market.",
      },
    ],

    tocEyebrow: "The right reflex",
    tocTitle: "Check that your accountant is registered with the OCC",
    tocBody:
      "The title of Contabilista Certificado is protected and regulated by the Ordem dos Contabilistas Certificados. Before entrusting your accounts to anyone, you can, and should, verify their registration. The partners I direct you to are licensed, recognised professionals.",
    tocPoints: [
      "The status is regulated: only a registered member can sign your declarations",
      "The OCC register is public and can be checked in moments",
      "A structure that refuses to share its registration is a warning sign",
      "My partners (Raly Conseils, Joongle) are licensed, established firms",
    ],

    coverageEyebrow: "The scope",
    coverageTitle: "What a Portuguese company's accounting covers",
    coverageSubtitle:
      "Beyond bookkeeping, the partner Contabilista Certificado handles recurring filing obligations. The main ones, in Portuguese terminology.",
    coverage: [
      {
        term: "IRC",
        value:
          "Corporate income tax. Annual return (Modelo 22) and payments during the year. 2026 rates: 19% in general, 15% for SMEs on the first €50,000 of profit.",
      },
      {
        term: "IVA",
        value:
          "Portuguese VAT (standard rate 23%). Periodic returns (monthly or quarterly), management of the exemption threshold and of the OSS one-stop shop for intra-EU e-commerce.",
      },
      {
        term: "IES",
        value:
          "Informação Empresarial Simplificada: a single annual filing combining accounts, statistics and legal deposit. Usually due in mid-July.",
      },
      {
        term: "SAF-T",
        value:
          "Standardised accounting and invoicing file required by the Autoridade Tributária, generated through AT-certified invoicing software (with ATCUD and QR code).",
      },
      {
        term: "Segurança Social",
        value:
          "Social security filings and contributions for the manager and, where applicable, employees. Payroll can be handled by the partner firm.",
      },
      {
        term: "Annual close",
        value:
          "Preparation and filing of the annual accounts, signed by the Contabilista Certificado who bears professional liability.",
      },
    ],

    orientEyebrow: "How I direct you",
    orientTitle: "To the right partner, at the right time",
    orientSubtitle:
      "Accounting starts once the company is set up. Here is how the introduction works, with no break between formation and day-to-day management.",
    orient: [
      {
        title: "We frame your activity",
        description:
          "Invoice volume, sector, applicable VAT, possible employees, need for French: we identify the most suitable firm profile rather than a one-size-fits-all solution.",
      },
      {
        title: "I make the introduction",
        description:
          "I direct you to a French-speaking partner, Raly Conseils as the main one, Joongle as needed, already used to French-speaking entrepreneurs based in Portugal.",
      },
      {
        title: "I ease the handover",
        description:
          "The documents from incorporation (Certidão Permanente, RCBE, articles of association) are passed to the accountant. The switch happens without you having to explain everything again.",
      },
      {
        title: "I remain your contact",
        description:
          "You keep a single point of contact to coordinate formation, banking, accounting and, if needed, tax or recruitment through the partner network.",
      },
    ],

    priceEyebrow: "What it costs",
    priceTitle: "Honest ranges, not a rigid grid",
    priceSubtitle:
      "Accounting fees depend on your activity (invoice volume, VAT, employees). I would rather give you transparent orders of magnitude than a single rate that would not match the reality of your file.",
    tiers: [
      {
        label: "Company accounting",
        price: "from around €200/month",
        note: "Via the partner firm (about €200 to €250/month depending on volume). Fees billed directly by the Contabilista Certificado.",
      },
      {
        label: "Registered office",
        price: "around €500/year (excl. VAT)",
        note: "A registered-office solution in Lisbon via a partner, if your project requires it.",
      },
      {
        label: "Introduction",
        price: "quoted after a free conversation",
        note: "My support and coordination are framed during the first conversation, free and with no commitment.",
      },
    ],
    priceNote:
      "Accounting amounts are billed directly by the partner firm and vary with your file. I give you a clear estimate during our conversation.",

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Accounting in Portugal: the essentials",
    faq: [
      {
        q: "Are you an accountant?",
        a: "No. I am a consultant in company formation and business setup in Portugal. Regulated accounting is handled by a Contabilista Certificado registered with the OCC, a partner of the practice. I make the introduction and coordinate.",
      },
      {
        q: "Is an accountant really mandatory for my company?",
        a: "Yes. A Portuguese company (Unipessoal Lda, Lda, SA) must appoint a Contabilista Certificado registered with the OCC from incorporation to keep its organised accounting and sign its declarations.",
      },
      {
        q: "How much does an accountant cost for a company in Portugal?",
        a: "Generally from around €200/month (often €200 to €250/month) via the partner firm, depending on your invoice volume, your VAT and whether you have employees. The exact rate is set by the Contabilista Certificado.",
      },
      {
        q: "Does the accountant speak French?",
        a: "Yes: I direct you to French-speaking partners (Raly Conseils, Joongle as needed), used to French-speaking entrepreneurs based in Portugal.",
      },
      {
        q: "How can I check that an accountant is properly licensed?",
        a: "The title of Contabilista Certificado is regulated by the OCC, whose registration is public and verifiable. A serious professional has no difficulty sharing their registration.",
      },
    ],

    disclaimerLabel: "Information",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Regulated accounting is handled by a Contabilista Certificado registered with the OCC, a partner of the practice; obligations depend on your individual situation. Information up to date in 2026, subject to change (Orçamento do Estado). For an analysis of your case, book a meeting.",

    ctaTitle: "Let's talk about your accounting",
    ctaBody:
      "A first free conversation, with no commitment, to frame your accounting needs and direct you to the right French-speaking partner. We look at your activity, identify the right firm, and coordinate the introduction.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Accounting",
    serviceName: "Introduction to a French-speaking accountant in Portugal",
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

export default async function ComptabilitePage({ params }: Props) {
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
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Portugal" },
    url: urlFor(locale, PATH),
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
        item: urlFor(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbServices,
        item: urlFor(locale, "/services"),
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
                  href="#obligation"
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
                <p className="eyebrow">{c.bonMotLabel}</p>
                <p className="mt-6 leading-relaxed text-muted-foreground">{c.bonMot}</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Honnêteté / périmètre */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.honestyEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.honestyTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.honestyBody}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi obligatoire */}
      <section id="obligation" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.obligEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.obligTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.obligSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.oblig.map((s, i) => (
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

      {/* Vérifier OCC */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.tocEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.tocTitle}</h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.tocBody}</p>
              </Reveal>
              <div className="mt-10 border-t border-border">
                {c.tocPoints.map((p, i) => (
                  <Reveal key={p} delay={i * 60}>
                    <div className="flex items-baseline gap-5 border-b border-border py-4">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      <span className="text-[1.05rem]">{p}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que couvre la compta */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.coverageEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.coverageTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.coverageSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.coverage.map((f, i) => (
                  <Reveal key={f.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.32fr_0.68fr] sm:gap-8">
                      <dt className="font-serif text-lg text-accent">{f.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{f.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Comment je vous oriente */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.orientEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.orientTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.orientSubtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.orient.map((it, i) => (
              <Reveal key={it.title} delay={i * 70} className="bg-card">
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
        </div>
      </section>

      {/* Tarifs / fourchettes */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.priceEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.priceTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.priceSubtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {c.tiers.map((t, i) => (
              <Reveal key={t.label} delay={i * 70} className="bg-card">
                <div className="flex h-full flex-col p-7">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {t.label}
                  </p>
                  <p className="mt-4 font-serif text-2xl text-accent">{t.price}</p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={60}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {c.priceNote}
            </p>
          </Reveal>
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
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.faq.map((f, i) => (
                  <Reveal key={f.q} delay={i * 60}>
                    <div className="border-b border-border py-7">
                      <dt className="font-serif text-xl">{f.q}</dt>
                      <dd className="mt-2.5 leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={80}>
                <p className="mt-10 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.disclaimerLabel}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
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
