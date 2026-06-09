import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { CALENDLY_URL, FOUNDER_ID, languagesFor, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { Simulateur } from "./simulateur";

const PATH = "/outils/simulateur-cout-salarie";
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
  pivot: string;
  updatedLabel: string;
  updatedDate: string;
  howToName: string;
  howToSteps: string[];
  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];
  meshTitle: string;
  meshRecrutement: string;
  meshCreation: string;
  meshOutils: string;
  breadcrumbHome: string;
  breadcrumbTools: string;
  breadcrumbCurrent: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Coût réel d'un salarié au Portugal : simulateur 2026",
    metaDesc:
      "Calculez le coût employeur total d'un salarié au Portugal en 2026 : salaire brut, TSU 23,75 %, 14 mois, repas, assurance. Estimation gratuite, méthode et sources affichées.",
    appName: "Simulateur du coût d'un salarié au Portugal",
    eyebrow: "Outil · Recrutement 2026",
    title: "Simulateur du coût réel",
    titleAccent: "d'un salarié au Portugal (2026)",
    lead: "Combien coûte vraiment un salarié au Portugal, charges patronales comprises ? Ajustez le salaire brut, le nombre de mois et les options : le coût total employeur se recalcule en direct, avec la méthode et les sources affichées.",
    pivot:
      "Au Portugal, le coût employeur d'un salarié dépasse son salaire brut d'environ +25 à +28 % une fois ajoutées les cotisations patronales (TSU 23,75 %) et l'assurance accidents du travail (~1 %). En intégrant les 14 mois de salaire (12 + subsídio de férias + subsídio de Natal) et la subsídio de alimentação, le coût annuel réel est nettement supérieur au brut mensuel × 12. À titre indicatif, les charges patronales y restent inférieures à la France (≈ +42 %). Estimation 2026, à valider avec un Contabilista Certificado.",
    updatedLabel: "Paramètres à jour le",
    updatedDate: "9 juin 2026",
    howToName: "Estimer le coût d'un salarié au Portugal en 4 étapes",
    howToSteps: [
      "Saisissez le salaire brut mensuel.",
      "Choisissez 12 ou 14 mois de salaire.",
      "Ajoutez la subsídio de alimentação et le taux d'assurance accident.",
      "Lisez le coût total employeur et sa ventilation.",
    ],
    faqEyebrow: "À savoir",
    faqTitle: "Coût d'un salarié au Portugal (2026)",
    faq: [
      {
        q: "Combien coûte un salarié au Portugal en 2026 ?",
        a: "Le coût employeur dépasse le salaire brut d'environ +25 à +28 % : on ajoute la TSU patronale (23,75 %) et l'assurance accidents du travail (~1 %), sur 14 mois de salaire, plus la subsídio de alimentação. Un salarié à 1 200 € brut revient ainsi nettement au-dessus de 1 200 € × 12.",
      },
      {
        q: "Qu'est-ce que la TSU au Portugal ?",
        a: "La Taxa Social Única est la cotisation de Segurança Social. La part patronale est de 23,75 % du salaire brut ; la part salariale (11 %) est retenue sur le salaire et n'entre pas dans le coût employeur.",
      },
      {
        q: "Pourquoi 14 mois de salaire au Portugal ?",
        a: "Le Código do Trabalho prévoit 12 mois plus deux subsídios légaux : le subsídio de férias (congés) et le subsídio de Natal (Noël). Ils peuvent être mensualisés (duodécimos), mais le coût annuel reste le même : 14 mois.",
      },
      {
        q: "La subsídio de alimentação est-elle exonérée ?",
        a: "Oui, dans une limite par jour travaillé : environ 10,20 € versés sur carte/titre repas, ou 6,00 € en espèces (paramètres 2026). Au-delà du plafond, l'excédent devient soumis à cotisations et IRS.",
      },
    ],
    meshTitle: "Pour aller plus loin",
    meshRecrutement: "Recruter et employer au Portugal",
    meshCreation: "Créer votre société au Portugal",
    meshOutils: "Tous les outils",
    breadcrumbHome: "Accueil",
    breadcrumbTools: "Outils",
    breadcrumbCurrent: "Simulateur coût salarié",
  },
  en: {
    metaTitle: "Real cost of an employee in Portugal: 2026 simulator",
    metaDesc:
      "Calculate the total employer cost of an employee in Portugal in 2026: gross salary, TSU 23.75%, 14 months, meal allowance, insurance. Free estimate, method and sources shown.",
    appName: "Portugal employee cost simulator",
    eyebrow: "Tool · Recruitment 2026",
    title: "Simulator of the real cost",
    titleAccent: "of an employee in Portugal (2026)",
    lead: "How much does an employee really cost in Portugal, employer charges included? Adjust the gross salary, the number of months and the options: the total employer cost recalculates live, with the method and sources shown.",
    pivot:
      "In Portugal, the employer cost of an employee exceeds their gross salary by about +25 to +28% once employer contributions (TSU 23.75%) and work-accident insurance (~1%) are added. Including the 14 months of salary (12 + subsídio de férias + subsídio de Natal) and the subsídio de alimentação, the real annual cost is clearly higher than gross monthly × 12. For reference, employer charges remain lower than in France (≈ +42%). 2026 estimate, to validate with a Contabilista Certificado.",
    updatedLabel: "Parameters updated on",
    updatedDate: "9 June 2026",
    howToName: "Estimate the cost of an employee in Portugal in 4 steps",
    howToSteps: [
      "Enter the monthly gross salary.",
      "Choose 12 or 14 months of salary.",
      "Add the meal allowance and the accident-insurance rate.",
      "Read the total employer cost and its breakdown.",
    ],
    faqEyebrow: "Good to know",
    faqTitle: "Cost of an employee in Portugal (2026)",
    faq: [
      {
        q: "How much does an employee cost in Portugal in 2026?",
        a: "The employer cost exceeds the gross salary by about +25 to +28%: you add the employer TSU (23.75%) and work-accident insurance (~1%), over 14 months of salary, plus the meal allowance. An employee at €1,200 gross therefore costs well above €1,200 × 12.",
      },
      {
        q: "What is the TSU in Portugal?",
        a: "The Taxa Social Única is the Segurança Social contribution. The employer share is 23.75% of gross salary; the employee share (11%) is withheld from pay and is not part of the employer cost.",
      },
      {
        q: "Why 14 months of salary in Portugal?",
        a: "The Código do Trabalho provides 12 months plus two statutory subsídios: the subsídio de férias (holiday) and the subsídio de Natal (Christmas). They can be paid monthly (duodécimos), but the annual cost stays the same: 14 months.",
      },
      {
        q: "Is the meal allowance exempt?",
        a: "Yes, up to a daily limit per worked day: about €10.20 on a meal card/voucher, or €6.00 in cash (2026 parameters). Above the cap, the excess becomes subject to contributions and IRS.",
      },
    ],
    meshTitle: "Go further",
    meshRecrutement: "Hire and employ in Portugal",
    meshCreation: "Set up your company in Portugal",
    meshOutils: "All tools",
    breadcrumbHome: "Home",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "Employee cost simulator",
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

export default async function SimulateurCoutSalariePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: c.howToName,
    inLanguage: locale,
    step: c.howToSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
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
      {[appJsonLd, howToJsonLd, faqJsonLd, breadcrumbJsonLd].map((ld, i) => (
        <script
          // biome-ignore lint/suspicious/noArrayIndexKey: liste statique de JSON-LD, ordre fixe
          key={i}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <section className="site-frame py-24 lg:py-32">
        <Reveal className="max-w-3xl">
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

        {/* Réponse-pivot citable (GEO) */}
        <Reveal delay={80}>
          <p className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-[1.05rem] leading-relaxed text-muted-foreground">
            {c.pivot}
          </p>
        </Reveal>

        <div className="mt-14">
          <Simulateur locale={locale} calendlyUrl={CALENDLY_URL} />
        </div>

        {/* FAQ visible (chunks extractibles) */}
        <div className="mt-20 max-w-3xl">
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
          <div className="mt-16 max-w-3xl border-t border-border pt-10">
            <p className="eyebrow">{c.meshTitle}</p>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/services/recrutement", label: c.meshRecrutement },
                { href: "/creation-societe", label: c.meshCreation },
                { href: "/outils", label: c.meshOutils },
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
