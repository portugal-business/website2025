import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { FOUNDER_ID, languagesFor, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { IficiQuiz } from "./ifici-quiz";

const PATH = "/outils/test-eligibilite-ifici";
const UPDATED_ISO = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

type Faq = { q: string; a: string };
type Copy = {
  metaTitle: string;
  metaDesc: string;
  appName: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  updatedLabel: string;
  updatedDate: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];
  meshTitle: string;
  meshIfici: string;
  meshCreation: string;
  meshFiscalite: string;
  breadcrumbHome: string;
  breadcrumbTools: string;
  breadcrumbCurrent: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Test d'éligibilité IFICI 2026 (ex-RNH)",
    metaDesc:
      "Le RNH n'existe plus pour les nouveaux arrivants. En 6 questions, voyez si l'IFICI 2026 (« RNH 2.0 ») vous concerne, résultat immédiat à l'écran, gratuit, sans inscription.",
    appName: "Test d'éligibilité IFICI 2026",
    eyebrow: "Outil · Fiscalité 2026",
    title: "Test d'éligibilité IFICI 2026 :",
    titleAccent: "ce régime fiscal vous concerne-t-il ?",
    lead: "Le RNH n'existe plus pour les nouveaux arrivants. Son remplaçant, l'IFICI (« RNH 2.0 »), est bien plus restrictif, et beaucoup de contenus en ligne se trompent. En 6 questions et 90 secondes, voyez où vous en êtes. Gratuit, sans inscription, résultat immédiat à l'écran.",
    updatedLabel: "Mis à jour le",
    updatedDate: "9 juin 2026",
    faqEyebrow: "À savoir",
    faqTitle: "L'IFICI en clair (2026)",
    faq: [
      {
        q: "Le RNH existe-t-il encore en 2026 ?",
        a: "Non, pas pour les nouveaux arrivants. Le RNH a été remplacé par l'IFICI (art. 58-A du Código dos Benefícios Fiscais, Portaria 352/2024). Seuls les bénéficiaires inscrits avant fin 2023 conservent l'ancien régime jusqu'au terme de leurs 10 ans.",
      },
      {
        q: "Les retraités sont-ils éligibles à l'IFICI ?",
        a: "Non. L'IFICI ne couvre que les revenus d'une activité professionnelle éligible. Les pensions de retraite étrangères en sont totalement exclues, l'ancien avantage de 10 % sur les pensions a disparu.",
      },
      {
        q: "Un freelance ou nomade digital peut-il bénéficier de l'IFICI ?",
        a: "Rarement. L'IFICI vise une liste limitative de professions hautement qualifiées (Anexo I) et exige souvent que l'entreprise réalise au moins 50 % de son chiffre d'affaires à l'export. La plupart des freelances et e-commerçants classiques n'y figurent pas.",
      },
      {
        q: "Quelle est la date limite de demande de l'IFICI ?",
        a: "La demande se dépose au Portal das Finanças avant le 15 janvier de l'année suivant celle où vous devenez résident fiscal au Portugal. Ce délai est strict : le rater fait perdre une ou plusieurs des 10 années d'avantage.",
      },
    ],
    meshTitle: "Pour aller plus loin",
    meshIfici: "Guide complet IFICI 2026",
    meshCreation: "Créer votre société au Portugal",
    meshFiscalite: "Fiscalité : mise en relation",
    breadcrumbHome: "Accueil",
    breadcrumbTools: "Outils",
    breadcrumbCurrent: "Test d'éligibilité IFICI",
  },
  en: {
    metaTitle: "IFICI 2026 eligibility test (former NHR)",
    metaDesc:
      "The NHR is gone for new arrivals. In 6 questions, see whether the 2026 IFICI («NHR 2.0») applies to you, instant on-screen result, free, no sign-up.",
    appName: "IFICI 2026 eligibility test",
    eyebrow: "Tool · Taxation 2026",
    title: "IFICI 2026 eligibility test:",
    titleAccent: "does this tax regime apply to you?",
    lead: "The NHR is gone for new arrivals. Its replacement, the IFICI («NHR 2.0»), is far more restrictive, and much online content gets it wrong. In 6 questions and 90 seconds, see where you stand. Free, no sign-up, instant on-screen result.",
    updatedLabel: "Updated on",
    updatedDate: "9 June 2026",
    faqEyebrow: "Good to know",
    faqTitle: "The IFICI, plainly (2026)",
    faq: [
      {
        q: "Does the NHR still exist in 2026?",
        a: "No, not for new arrivals. The NHR was replaced by the IFICI (art. 58-A of the Código dos Benefícios Fiscais, Portaria 352/2024). Only beneficiaries registered before the end of 2023 keep the former regime until the end of their 10 years.",
      },
      {
        q: "Are retirees eligible for the IFICI?",
        a: "No. The IFICI only covers eligible professional-activity income. Foreign retirement pensions are entirely excluded, the former 10% advantage on pensions is gone.",
      },
      {
        q: "Can a freelancer or digital nomad benefit from the IFICI?",
        a: "Rarely. The IFICI targets a limited list of highly qualified professions (Anexo I) and often requires the company to export at least 50% of its turnover. Most freelancers and classic e-commerce sellers are not on it.",
      },
      {
        q: "What is the IFICI application deadline?",
        a: "The application is filed on the Portal das Finanças before 15 January of the year following the one in which you become a tax resident in Portugal. The deadline is strict: missing it loses one or more of the 10 years of benefit.",
      },
    ],
    meshTitle: "Go further",
    meshIfici: "Full IFICI 2026 guide",
    meshCreation: "Set up your company in Portugal",
    meshFiscalite: "Tax: get connected",
    breadcrumbHome: "Home",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "IFICI eligibility test",
  },
};

const pick = (l: string): Copy => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: urlFor(locale, PATH), languages: languagesFor(PATH) },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function TestEligibiliteIficiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: c.appName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    url: urlFor(locale, PATH),
    provider: { "@id": ORGANIZATION_ID },
    author: { "@id": FOUNDER_ID },
    datePublished: UPDATED_ISO,
    dateModified: UPDATED_ISO,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: urlFor(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbTools,
        item: urlFor(locale, "/outils"),
      },
      { "@type": "ListItem", position: 3, name: c.breadcrumbCurrent, item: urlFor(locale, PATH) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
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

      <section className="mx-auto max-w-3xl px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.07] sm:text-5xl">
            <span className="block">{c.title}</span>
            <span className="block italic text-accent">{c.titleAccent}</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {c.updatedLabel} <time dateTime={UPDATED_ISO}>{c.updatedDate}</time>
          </p>
        </Reveal>

        <div className="mt-12">
          <IficiQuiz locale={locale} />
        </div>

        {/* FAQ visible (chunks extractibles) */}
        <div className="mt-20">
          <Reveal>
            <p className="eyebrow">{c.faqEyebrow}</p>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">{c.faqTitle}</h2>
          </Reveal>
          <dl className="mt-10 border-t border-border">
            {c.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-b border-border py-7">
                  <dt className="font-serif text-xl leading-snug">{f.q}</dt>
                  <dd className="mt-3 leading-relaxed text-muted-foreground">{f.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Maillage interne */}
        <Reveal>
          <div className="mt-16 border-t border-border pt-10">
            <p className="eyebrow">{c.meshTitle}</p>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/guides/ifici-2026", label: c.meshIfici },
                { href: "/creation-societe", label: c.meshCreation },
                { href: "/services/fiscalite", label: c.meshFiscalite },
              ].map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="group inline-flex items-center gap-2 text-foreground underline-offset-[6px] hover:underline"
                  >
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                    {m.label}
                    <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
