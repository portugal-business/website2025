import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/creation-societe";

type Props = { params: Promise<{ locale: string }> };

type Step = { title: string; description: string; docsLabel: string; docs: string[] };
type Fact = { term: string; value: string };
type Item = { title: string; description: string };

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

  scopeEyebrow: string;
  scopeTitle: string;
  scopeBody: string;
  scopeItems: string[];
  deliverableLabel: string;
  deliverables: string[];

  stepsEyebrow: string;
  stepsTitle: string;
  stepsSubtitle: string;
  steps: Step[];

  timingEyebrow: string;
  timingTitle: string;
  timingSubtitle: string;
  timing: Item[];

  factsEyebrow: string;
  factsTitle: string;
  factsSubtitle: string;
  facts: Fact[];

  honestyEyebrow: string;
  honestyTitle: string;
  honestyBody: string;
  guaranteesLabel: string;
  guarantees: string[];

  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Création de société au Portugal",
    metaDesc:
      "Accompagnement humain de bout en bout pour créer votre société au Portugal : du NIF à distance au compte bancaire, en passant par Certidão Permanente, RCBE et statuts. Premier échange gratuit et sans engagement.",
    eyebrow: "Service cœur",
    title: "Créer votre société au Portugal,",
    titleAccent: "accompagné·e du NIF au compte bancaire",
    lead: "Un accompagnement humain et coordonné, de bout en bout. J'obtiens votre NIF à distance et prépare tout le dossier ; puis, lors de votre venue à Lisbonne, je constitue la société (signature des statuts) et vous accompagne en personne à l'ouverture du compte bancaire avec un partenaire officiel. Vous gardez un seul interlocuteur, du premier échange à la mise en relation avec les bons spécialistes.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir les étapes",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    scopeEyebrow: "Le périmètre exact",
    scopeTitle: "Ce que je réalise et coordonne moi-même",
    scopeBody:
      "La création de société est le service que j'exécute de bout en bout. Pas une coquille « en 2 h » : une implantation réelle, documentée, avec un accompagnement bancaire concret. Voici précisément les étapes prises en charge.",
    scopeItems: [
      "Obtention du NIF à distance",
      "Préparation du dossier et des éléments nécessaires",
      "Création de la société sur place",
      "Certidão Permanente sous 24/48 h après immatriculation",
      "RCBE, registre des bénéficiaires effectifs",
      "Rédaction et dépôt des statuts",
      "Accompagnement à l'ouverture du compte bancaire (partenaire Millennium)",
    ],
    deliverableLabel: "Ce que vous repartez avec",
    deliverables: [
      "Votre NIF",
      "La société constituée (NIPC)",
      "La Certidão Permanente",
      "Le RCBE",
      "Les statuts",
      "L'accompagnement bancaire",
    ],

    stepsEyebrow: "Étape par étape",
    stepsTitle: "Le déroulé et les documents requis",
    stepsSubtitle:
      "Chaque étape a ses justificatifs. Vous savez à l'avance ce qui est demandé, sans frais cachés ni mauvaise surprise. Les documents de société (étape banque) vous sont fournis par mes soins une fois la création terminée.",
    steps: [
      {
        title: "NIF à distance",
        description:
          "On obtient votre numéro fiscal de particulier sans que vous ayez à vous déplacer. C'est la première brique de tout le dossier.",
        docsLabel: "Documents requis",
        docs: ["Passeport ou pièce d'identité", "Justificatif de domicile récent"],
      },
      {
        title: "Préparation & création de la société",
        description:
          "On cadre la structure (Unipessoal Lda, Lda ou SA selon votre projet), puis je constitue la société sur place. La société est immatriculable rapidement une fois les éléments réunis.",
        docsLabel: "Informations à fournir",
        docs: [
          "Dénomination et adresse de la société",
          "Capital social et répartition entre associés",
          "Objet principal et activités secondaires éventuelles",
          "Identité des associés et des gérants",
        ],
      },
      {
        title: "Documents officiels",
        description:
          "Après immatriculation, j'obtiens la Certidão Permanente (sous 24/48 h) ; le RCBE est déclaré par notre avocat partenaire juste après, et je vous transmets les statuts. Ce sont les pièces dont la banque aura besoin.",
        docsLabel: "Livrés par mes soins",
        docs: ["Certidão Permanente", "RCBE", "Statuts"],
      },
      {
        title: "Accompagnement bancaire (sur place)",
        description:
          "Je vous accompagne en personne à l'ouverture du compte professionnel, en agence, avec un partenaire officiel (Millennium), lors de votre venue au Portugal. L'ouverture dépend toujours de la compliance de la banque ; je prépare le dossier en amont pour maximiser vos chances.",
        docsLabel: "Documents requis",
        docs: [
          "Certidão Permanente, RCBE et statuts (fournis après création)",
          "Numéro fiscal du gérant dans son pays",
          "Justificatifs complémentaires demandés par la banque",
        ],
      },
    ],

    timingEyebrow: "Les délais réels",
    timingTitle: "Des fourchettes honnêtes, pas des promesses",
    timingSubtitle:
      "Les délais dépendent des administrations et des banques. Je m'engage sur la réactivité et la transparence, pas sur une date couperet impossible à tenir.",
    timing: [
      {
        title: "Dossier complet : ~3 semaines en moyenne",
        description: "Variable selon les cas et la disponibilité de vos justificatifs.",
      },
      {
        title: "Certidão Permanente : 24/48 h",
        description: "Délivrée rapidement une fois la société immatriculée.",
      },
      {
        title: "NIF à distance : délais variables",
        description: "Dépend du traitement administratif au moment de la demande.",
      },
      {
        title: "Compte bancaire : selon la compliance",
        description:
          "Peut être rapide avec les bons partenaires, mais dépend toujours de la compliance bancaire.",
      },
    ],

    factsEyebrow: "Les faits, sans détour",
    factsTitle: "Ce qu'il faut savoir avant de se lancer",
    factsSubtitle:
      "La terminologie portugaise et les chiffres exacts, pour décider sur une base juste. On utilise les bons mots : Unipessoal Lda (pas « EURL »), Lda (pas « SARL »), NIF pour le particulier, NIPC pour la société.",
    facts: [
      {
        term: "Résidence au Portugal",
        value:
          "Non requise pour créer une société. Vous n'avez pas besoin d'être résident ni de vivre sur place.",
      },
      {
        term: "Ouverture du compte bancaire",
        value:
          "En personne, en agence, lors de votre venue au Portugal (en même temps que la signature des statuts). Le dossier se prépare à distance ; l'ouverture dépend toujours de la compliance de la banque et n'est jamais présentée comme garantie.",
      },
      {
        term: "Capital social Unipessoal Lda / Lda",
        value:
          "1 € légal par associé. Je recommande ~1 000 € pour la cohérence et la crédibilité du dossier.",
      },
      {
        term: "Capital social SA",
        value: "50 000 €, pour les projets qui justifient une Sociedade Anónima.",
      },
    ],

    honestyEyebrow: "Pourquoi cet accompagnement",
    honestyTitle: "L'inverse d'une coquille vendue « en 2 heures »",
    honestyBody:
      "Une société créée à la va-vite, pilotée à distance sans accompagnement, expose à des frictions bancaires et à des risques en France. Mon rôle est de protéger et de coordonner : une implantation réelle, des documents en règle, les bons interlocuteurs au bon moment. La comptabilité réglementée est ensuite assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet.",
    guaranteesLabel: "Mes engagements",
    guarantees: [
      "Premier échange 100 % gratuit et sans engagement",
      "Réactivité et transparence à chaque étape",
      "Accompagnement jusqu'à la mise en relation avec les bons spécialistes",
      "Pas de garantie de délai absolue, les administrations et la compliance bancaire ne se commandent pas",
    ],

    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Chaque situation dépend de votre cas individuel et de la convention fiscale France-Portugal. Pour une analyse de votre projet, prenez rendez-vous. Informations à jour en 2026, susceptibles d'évoluer.",

    ctaTitle: "Parlons de votre projet",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre création de société et l'accompagnement bancaire. On regarde votre situation, on identifie la bonne structure, on avance.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Création de société",
    serviceName: "Création de société au Portugal",
  },
  en: {
    metaTitle: "Setting up a company in Portugal",
    metaDesc:
      "End-to-end, human support to set up your company in Portugal: from the remote NIF to the bank account, including Certidão Permanente, RCBE and articles of association. First conversation free, no commitment.",
    eyebrow: "Core service",
    title: "Set up your company in Portugal,",
    titleAccent: "guided from the NIF to the bank account",
    lead: "Human, coordinated support from start to finish. I obtain your NIF remotely and prepare the whole file; then, during your trip to Lisbon, I incorporate the company (signing the articles) and support you in person at the opening of the bank account with an official partner. You keep a single point of contact, from the first conversation to being connected with the right specialists.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the steps",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    scopeEyebrow: "The exact scope",
    scopeTitle: "What I handle and coordinate myself",
    scopeBody:
      "Company formation is the service I run end to end. Not a shell company set up “in 2 hours”: a real, documented incorporation with concrete banking support. Here is exactly what is covered.",
    scopeItems: [
      "Obtaining the NIF remotely",
      "Preparing the file and required elements",
      "Incorporating the company on site",
      "Certidão Permanente within 24/48 h after registration",
      "RCBE, beneficial ownership register",
      "Drafting and filing the articles of association",
      "Support opening the bank account (Millennium partner)",
    ],
    deliverableLabel: "What you walk away with",
    deliverables: [
      "Your NIF",
      "The incorporated company (NIPC)",
      "The Certidão Permanente",
      "The RCBE",
      "The articles of association",
      "Banking support",
    ],

    stepsEyebrow: "Step by step",
    stepsTitle: "The process and the documents required",
    stepsSubtitle:
      "Each step has its supporting documents. You know in advance what is requested, no hidden fees, no surprises. The company documents (banking step) are provided by me once the incorporation is complete.",
    steps: [
      {
        title: "Remote NIF",
        description:
          "We obtain your personal tax number without you having to travel. It is the first building block of the whole file.",
        docsLabel: "Documents required",
        docs: ["Passport or ID document", "Recent proof of address"],
      },
      {
        title: "Preparation & incorporation",
        description:
          "We frame the structure (Unipessoal Lda, Lda or SA depending on your project), then I incorporate the company on site. The company can be registered quickly once the elements are gathered.",
        docsLabel: "Information to provide",
        docs: [
          "Company name and address",
          "Share capital and distribution among partners",
          "Main object and any secondary activities",
          "Identity of partners and managers",
        ],
      },
      {
        title: "Official documents",
        description:
          "After registration, I obtain the Certidão Permanente (within 24/48 h); the RCBE is filed by our partner lawyer right after, and I send you the articles of association. These are the documents the bank will need.",
        docsLabel: "Provided by me",
        docs: ["Certidão Permanente", "RCBE", "Articles of association"],
      },
      {
        title: "Banking support (on site)",
        description:
          "I support you in person at the opening of the business account, at the branch, with an official partner (Millennium), during your trip to Portugal. Opening always depends on the bank's compliance; I prepare the file beforehand to maximise your chances.",
        docsLabel: "Documents required",
        docs: [
          "Certidão Permanente, RCBE and articles (provided after incorporation)",
          "Manager's tax number in their home country",
          "Additional supporting documents requested by the bank",
        ],
      },
    ],

    timingEyebrow: "Real timelines",
    timingTitle: "Honest ranges, not promises",
    timingSubtitle:
      "Timelines depend on the administrations and the banks. I commit to responsiveness and transparency, not to an impossible hard deadline.",
    timing: [
      {
        title: "Complete file: ~3 weeks on average",
        description: "Varies by case and by how quickly your documents are ready.",
      },
      {
        title: "Certidão Permanente: 24/48 h",
        description: "Issued quickly once the company is registered.",
      },
      {
        title: "Remote NIF: variable timing",
        description: "Depends on administrative processing at the time of the request.",
      },
      {
        title: "Bank account: subject to compliance",
        description:
          "Can be fast with the right partners, but always depends on banking compliance.",
      },
    ],

    factsEyebrow: "The facts, plainly",
    factsTitle: "What to know before you start",
    factsSubtitle:
      "The Portuguese terminology and the exact figures, so you decide on a sound basis. We use the right words: Unipessoal Lda (not “EURL”), Lda (not “SARL”), NIF for the individual, NIPC for the company.",
    facts: [
      {
        term: "Residence in Portugal",
        value:
          "Not required to set up a company. You do not need to be a resident or live on site.",
      },
      {
        term: "Opening the bank account",
        value:
          "In person, at the branch, during your trip to Portugal (at the same time as signing the articles). The file is prepared remotely; opening always depends on the bank's compliance and is never presented as guaranteed.",
      },
      {
        term: "Share capital Unipessoal Lda / Lda",
        value:
          "€1 legal minimum per partner. I recommend ~€1,000 for the coherence and credibility of the file.",
      },
      {
        term: "Share capital SA",
        value: "€50,000, for projects that justify a Sociedade Anónima.",
      },
    ],

    honestyEyebrow: "Why this support",
    honestyTitle: "The opposite of a shell sold “in 2 hours”",
    honestyBody:
      "A company set up in a rush, run remotely with no support, exposes you to banking friction and to risks back home. My role is to protect and coordinate: a real incorporation, documents in order, the right people at the right time. Regulated accounting is then handled by a Contabilista Certificado registered with the OCC, a partner of the practice.",
    guaranteesLabel: "My commitments",
    guarantees: [
      "First conversation 100% free and with no commitment",
      "Responsiveness and transparency at every step",
      "Support all the way to being connected with the right specialists",
      "No absolute deadline guarantee, administrations and banking compliance cannot be rushed",
    ],

    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Every situation depends on your individual case and on the France-Portugal tax treaty. For an analysis of your project, book a meeting. Information up to date in 2026, subject to change.",

    ctaTitle: "Let's talk about your project",
    ctaBody:
      "A first free conversation, with no commitment, to frame your company formation and banking support. We look at your situation, identify the right structure, and move forward.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbCurrent: "Company formation",
    serviceName: "Company formation in Portugal",
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

export default async function CreationSocietePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.serviceName,
    serviceType: c.serviceName,
    description: c.metaDesc,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Portugal" },
    url: urlFor(locale, PATH),
  };

  // HowTo : les étapes réelles de la création (extractible par les moteurs/IA).
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: c.stepsTitle,
    description: c.stepsSubtitle,
    inLanguage: locale,
    step: c.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
      url: `${urlFor(locale, PATH)}#etapes`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
                  href="#etapes"
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
                <p className="eyebrow">{c.deliverableLabel}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.deliverables.map((it, i) => (
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

      {/* Périmètre exact */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.scopeEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.scopeTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.scopeBody}</p>
              </Reveal>
              <div className="mt-10 border-t border-border">
                {c.scopeItems.map((p, i) => (
                  <Reveal key={p} delay={i * 60}>
                    <div className="flex items-baseline gap-5 border-b border-border py-4">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.05rem]">{p}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes détaillées + documents */}
      <section id="etapes" className="scroll-mt-24">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.stepsEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.stepsTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.stepsSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.steps.map((s, i) => (
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
                      <p className="mt-5 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                        {s.docsLabel}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {s.docs.map((d) => (
                          <li key={d} className="flex items-baseline gap-3 text-[1.02rem]">
                            <span
                              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                              aria-hidden
                            />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Délais réels */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.timingEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.timingTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.timingSubtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.timing.map((it, i) => (
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

      {/* Faits */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.factsEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.factsTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.factsSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.facts.map((f, i) => (
                  <Reveal key={f.term} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{f.term}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{f.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Honnêteté / anti-commodité + engagements */}
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
              <Reveal delay={80}>
                <p className="mt-10 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.guaranteesLabel}
                </p>
              </Reveal>
              <div className="mt-4 border-t border-border">
                {c.guarantees.map((g, i) => (
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
