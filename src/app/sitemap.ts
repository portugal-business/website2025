import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { LOCALES, languagesFor, SITE_URL } from "@/lib/site";

// Routes statiques, chemins SANS préfixe de locale (préfixés ci-dessous).
// changeFrequency / priority : indicatifs, calés sur l'importance éditoriale.
type SitemapRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /** ISO 8601, date de fraîcheur réelle (sinon date de build). */
  lastModified?: string;
};

const STATIC_ROUTES: ReadonlyArray<SitemapRoute> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/creation-societe", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/comptabilite", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/fiscalite", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/domiciliation", changeFrequency: "monthly", priority: 0.6 },
  { path: "/services/recrutement", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guides/ifici-2026", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/guides/societe-portugal-sans-risque-france",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/creer-societe-portugal-depuis-letranger",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/depuis/belgique", changeFrequency: "monthly", priority: 0.6 },
  { path: "/depuis/suisse", changeFrequency: "monthly", priority: 0.6 },
  { path: "/depuis/luxembourg", changeFrequency: "monthly", priority: 0.6 },
  { path: "/depuis/maroc", changeFrequency: "monthly", priority: 0.6 },
  { path: "/depuis/tunisie", changeFrequency: "monthly", priority: 0.5 },
  { path: "/depuis/algerie", changeFrequency: "monthly", priority: 0.5 },
  { path: "/outils", changeFrequency: "monthly", priority: 0.7 },
  { path: "/outils/test-eligibilite-ifici", changeFrequency: "monthly", priority: 0.8 },
  { path: "/outils/simulateur-cout-salarie", changeFrequency: "monthly", priority: 0.8 },
  { path: "/profils", changeFrequency: "monthly", priority: 0.7 },
  { path: "/profils/crypto-trader", changeFrequency: "monthly", priority: 0.7 },
  { path: "/profils/e-commerce-amazon-fba", changeFrequency: "monthly", priority: 0.7 },
  { path: "/profils/freelance-it", changeFrequency: "monthly", priority: 0.7 },
  { path: "/profils/createur-contenu", changeFrequency: "monthly", priority: 0.6 },
  { path: "/profils/saas", changeFrequency: "monthly", priority: 0.6 },
  { path: "/comparatifs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/comparatifs/statuts-lda-eni-unipessoal", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/comparatifs/portugal-vs-france-espagne-dubai",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/avis-et-garanties", changeFrequency: "monthly", priority: 0.7 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.2 },
];

// Articles de blog publiés : la date de fraîcheur (lastModified) reflète la
// VRAIE date de mise à jour de chaque article (article.dateModified).
const BLOG_ROUTES: ReadonlyArray<SitemapRoute> = articles.map((a) => ({
  path: `/blog/${a.slug}`,
  changeFrequency: "yearly",
  priority: 0.5,
  lastModified: a.dateModified,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const allRoutes = [...STATIC_ROUTES, ...BLOG_ROUTES];

  return allRoutes.flatMap((route) => {
    const languages = languagesFor(route.path);
    const lastModified = route.lastModified ? new Date(route.lastModified) : buildDate;
    return LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path === "/" ? "" : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });
}
