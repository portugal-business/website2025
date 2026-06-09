import { ArrowRight, Calculator, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { languagesFor, urlFor } from "@/lib/site";

const PATH = "/outils";

type Props = { params: Promise<{ locale: string }> };

type IconKey = "scroll" | "calc";
type Tool = {
  icon: IconKey;
  index: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  tools: Tool[];
  disclaimer: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  itemListName: string;
};

const ICONS: Record<IconKey, typeof Calculator> = { scroll: ScrollText, calc: Calculator };

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Outils gratuits : éligibilité IFICI & coût d'un salarié au Portugal",
    metaDesc:
      "Des outils gratuits et datés 2026 pour décider sur une base juste : test d'éligibilité IFICI et simulateur du coût réel d'un salarié au Portugal. Méthode et sources affichées.",
    eyebrow: "Outils",
    title: "Des outils gratuits pour décider",
    titleAccent: "sur une base juste",
    lead: "Deux outils interactifs, gratuits et millésimés 2026, pour répondre aux questions que tout le monde se pose vraiment : suis-je concerné par l'IFICI, et combien coûte vraiment un salarié au Portugal ? Résultat immédiat à l'écran, méthode et sources affichées, jamais une promesse chiffrée individuelle.",
    tools: [
      {
        icon: "scroll",
        index: "01",
        kicker: "Fiscalité 2026",
        title: "Test d'éligibilité IFICI",
        description:
          "En 6 questions, voyez si le régime IFICI (« RNH 2.0 ») vous concerne, résultat honnête à l'écran, y compris quand la réponse est non (retraités, freelances sans export).",
        href: "/outils/test-eligibilite-ifici",
        linkLabel: "Faire le test",
      },
      {
        icon: "calc",
        index: "02",
        kicker: "Recrutement 2026",
        title: "Simulateur du coût d'un salarié",
        description:
          "Calculez le coût employeur total au Portugal : TSU 23,75 %, 14 mois, repas, assurance. Recalcul en direct, ventilation visuelle, méthode et sources affichées.",
        href: "/outils/simulateur-cout-salarie",
        linkLabel: "Ouvrir le simulateur",
      },
    ],
    disclaimer:
      "Ces outils ont une vocation informative et ne constituent pas un conseil juridique, comptable ou fiscal personnalisé. Données à jour en 2026, susceptibles d'évoluer. Pour votre situation précise, réservez un échange gratuit.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Outils",
    itemListName: "Outils interactifs Business Portugal",
  },
  en: {
    metaTitle: "Free tools: IFICI eligibility & cost of an employee in Portugal",
    metaDesc:
      "Free, 2026-dated tools to decide on a sound basis: an IFICI eligibility test and a simulator of the real cost of an employee in Portugal. Method and sources shown.",
    eyebrow: "Tools",
    title: "Free tools to decide",
    titleAccent: "on a sound basis",
    lead: "Two interactive, free, 2026-dated tools answering the questions everyone really asks: am I concerned by the IFICI, and how much does an employee really cost in Portugal? Instant on-screen result, method and sources shown, never an individual figure promise.",
    tools: [
      {
        icon: "scroll",
        index: "01",
        kicker: "Taxation 2026",
        title: "IFICI eligibility test",
        description:
          "In 6 questions, see whether the IFICI regime («NHR 2.0») applies to you, an honest on-screen result, including when the answer is no (retirees, freelancers without exports).",
        href: "/outils/test-eligibilite-ifici",
        linkLabel: "Take the test",
      },
      {
        icon: "calc",
        index: "02",
        kicker: "Recruitment 2026",
        title: "Employee cost simulator",
        description:
          "Calculate the total employer cost in Portugal: TSU 23.75%, 14 months, meal allowance, insurance. Live recalculation, visual breakdown, method and sources shown.",
        href: "/outils/simulateur-cout-salarie",
        linkLabel: "Open the simulator",
      },
    ],
    disclaimer:
      "These tools are for information only and do not constitute personalised legal, accounting or tax advice. Information up to date in 2026, subject to change. For your specific situation, book a free conversation.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Tools",
    itemListName: "Business Portugal interactive tools",
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

export default async function OutilsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: urlFor(locale, "/") },
      { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: urlFor(locale, PATH) },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.itemListName,
    numberOfItems: c.tools.length,
    itemListElement: c.tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.title,
      url: urlFor(locale, tool.href),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="site-frame py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]">
            <span className="block">{c.title}</span>
            <span className="block italic text-accent">{c.titleAccent}</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
          {c.tools.map((tool, i) => {
            const Icon = ICONS[tool.icon];
            return (
              <Reveal key={tool.href} delay={i * 70} className="bg-card">
                <Link href={tool.href} className="group flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-accent" aria-hidden />
                    <span className="index-num text-sm text-accent">{tool.index}</span>
                  </div>
                  <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {tool.kicker}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl transition-colors group-hover:text-accent">
                    {tool.title}
                  </h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{tool.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                    {tool.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
            {c.disclaimer}
          </p>
        </Reveal>
      </section>
    </>
  );
}
