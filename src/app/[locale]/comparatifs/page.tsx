import { ArrowRight, Globe2, Scale } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { languagesFor, urlFor } from "@/lib/site";

const PATH = "/comparatifs";

type Props = { params: Promise<{ locale: string }> };

type IconKey = "scale" | "globe";
type Comparison = {
  icon: IconKey;
  index: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
};

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  comparisons: Comparison[];
  discover: string;
  disclaimer: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  itemListName: string;
};

const ICONS: Record<IconKey, typeof Scale> = { scale: Scale, globe: Globe2 };

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Comparatifs : statuts juridiques et pays pour créer au Portugal (2026)",
    metaDesc:
      "Comparatifs honnêtes pour décider : statuts juridiques portugais (ENI, Unipessoal Lda, Lda) et Portugal vs France, Espagne, Dubaï. Tableaux clairs, terminologie exacte, alerte CFC.",
    eyebrow: "Comparatifs",
    title: "Comparer pour décider,",
    titleAccent: "sans promesse trompeuse",
    lead: "Des comparatifs au format clair (tableaux, réponses directes) pour trancher sur une base juste. Le ton est honnête : le bon statut dépend de votre activité, et le bon pays dépend surtout de l'endroit où vous vivez et gérez réellement votre société, avec l'alerte CFC qui s'impose pour les résidents fiscaux français.",
    comparisons: [
      {
        icon: "scale",
        index: "01",
        kicker: "Statuts juridiques",
        title: "ENI, Unipessoal Lda, Lda : quel statut ?",
        description:
          "ENI, Trabalhador Independente, Unipessoal Lda ou Lda : responsabilité, capital, comptabilité et fiscalité comparés, en terminologie portugaise exacte (jamais « EURL » ni « SARL »).",
        href: "/comparatifs/statuts-lda-eni-unipessoal",
      },
      {
        icon: "globe",
        index: "02",
        kicker: "Comparatif pays",
        title: "Portugal vs France, Espagne, Dubaï",
        description:
          "Où créer sa société en 2026 ? Impôt sociétés, charges, substance requise, et pourquoi le vrai critère reste le lieu de direction réel, avec alerte CFC pour les résidents français.",
        href: "/comparatifs/portugal-vs-france-espagne-dubai",
      },
    ],
    discover: "Voir le comparatif",
    disclaimer:
      "Ces comparatifs ont une vocation informative et ne constituent pas un conseil juridique, comptable ou fiscal personnalisé. Les chiffres pour les juridictions hors Portugal sont des ordres de grandeur indicatifs, à valider avec un fiscaliste. Informations à jour en 2026, susceptibles d'évoluer.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Comparatifs",
    itemListName: "Comparatifs Business Portugal",
  },
  en: {
    metaTitle: "Comparisons: legal forms and countries to set up in Portugal (2026)",
    metaDesc:
      "Honest comparisons to decide: Portuguese legal forms (ENI, Unipessoal Lda, Lda) and Portugal vs France, Spain, Dubai. Clear tables, accurate terminology, CFC warning.",
    eyebrow: "Comparisons",
    title: "Compare to decide,",
    titleAccent: "with no misleading promise",
    lead: "Clear-format comparisons (tables, direct answers) to decide on a sound basis. The tone is honest: the right status depends on your activity, and the right country depends above all on where you actually live and run your company, with the CFC warning that applies to French tax residents.",
    comparisons: [
      {
        icon: "scale",
        index: "01",
        kicker: "Legal forms",
        title: "ENI, Unipessoal Lda, Lda: which status?",
        description:
          "ENI, Trabalhador Independente, Unipessoal Lda or Lda: liability, capital, accounting and taxation compared, in accurate Portuguese terminology (never «EURL» nor «SARL»).",
        href: "/comparatifs/statuts-lda-eni-unipessoal",
      },
      {
        icon: "globe",
        index: "02",
        kicker: "Country comparison",
        title: "Portugal vs France, Spain, Dubai",
        description:
          "Where to set up in 2026? Corporate tax, charges, substance required, and why the real criterion remains where management actually happens, with a CFC warning for French residents.",
        href: "/comparatifs/portugal-vs-france-espagne-dubai",
      },
    ],
    discover: "See the comparison",
    disclaimer:
      "These comparisons are for information only and do not constitute personalised legal, accounting or tax advice. Figures for non-Portugal jurisdictions are indicative orders of magnitude, to validate with a tax adviser. Information up to date in 2026, subject to change.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Comparisons",
    itemListName: "Business Portugal comparisons",
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

export default async function ComparatifsPage({ params }: Props) {
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
    numberOfItems: c.comparisons.length,
    itemListElement: c.comparisons.map((cmp, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cmp.title,
      url: urlFor(locale, cmp.href),
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
          {c.comparisons.map((cmp, i) => {
            const Icon = ICONS[cmp.icon];
            return (
              <Reveal key={cmp.href} delay={i * 70} className="bg-card">
                <Link href={cmp.href} className="group flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-accent" aria-hidden />
                    <span className="index-num text-sm text-accent">{cmp.index}</span>
                  </div>
                  <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {cmp.kicker}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl transition-colors group-hover:text-accent">
                    {cmp.title}
                  </h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{cmp.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                    {c.discover}
                    <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
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
