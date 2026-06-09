import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { getSortedArticles } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { languagesFor, urlFor } from "@/lib/site";

const PATH = "/blog";

const COPY = {
  fr: {
    metaTitle: "Blog, Créer et développer son entreprise au Portugal",
    metaDesc:
      "Articles, repères et études de cas sur la création de société, la fiscalité (IRC, IVA, IFICI) et l'implantation d'entreprise au Portugal. Par Business Portugal.",
    eyebrow: "Le journal",
    title: "Repères pour entreprendre au Portugal",
    intro:
      "Des articles clairs et datés sur la création de société, la fiscalité et l'implantation au Portugal. Une information utile, jamais une promesse de résultat. Pour votre cas précis, parlons-en.",
    readMore: "Lire l'article",
    locale: "fr-FR",
  },
  en: {
    metaTitle: "Blog, Starting and Growing a Business in Portugal",
    metaDesc:
      "Articles, markers and case studies on company formation, taxation (IRC, IVA, IFICI) and business establishment in Portugal. By Business Portugal.",
    eyebrow: "The journal",
    title: "Markers for doing business in Portugal",
    intro:
      "Clear, dated articles on company formation, taxation and establishment in Portugal. Useful information, never a promise of results. For your specific case, let's talk.",
    readMore: "Read the article",
    locale: "en-GB",
  },
} as const;

type Props = { params: Promise<{ locale: string }> };
type Loc = "fr" | "en";
const norm = (l: string): Loc => (l === "en" ? "en" : "fr");
const pick = (l: string) => COPY[norm(l)];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: urlFor(norm(locale), PATH),
      languages: languagesFor(PATH),
    },
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(pick(locale).locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = norm(locale);
  const c = pick(locale);
  const posts = getSortedArticles();

  return (
    <section className="site-frame py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
              {c.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
          </Reveal>
        </header>

        <div className="border-t border-border">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              <article className="border-b border-border py-9">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-baseline gap-5">
                    <span className="index-num text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <time
                        dateTime={post.datePublished}
                        className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {formatDate(post.datePublished, locale)}
                      </time>
                      <h2 className="mt-3 font-serif text-2xl leading-snug transition-colors group-hover:text-accent sm:text-[1.7rem]">
                        {post.title[l]}
                      </h2>
                      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                        {post.excerpt[l]}
                      </p>
                      <span className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                        {c.readMore}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
