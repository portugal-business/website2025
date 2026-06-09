// Source UNIQUE d'URL et d'identité du site. Tout fichier (sitemap, robots,
// JSON-LD, metadata, pages) importe d'ici, ne jamais coder le domaine en dur.
//
// Domaine : surchargé par la variable d'env NEXT_PUBLIC_SITE_URL.
// Domaine retenu (validé par la cliente, juin 2026) : portugal-business.com.
// Pour ajouter le www ou basculer : définir NEXT_PUBLIC_SITE_URL (1 ligne).
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portugal-business.com";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = "Business Portugal";
export const LEGAL_NAME = "Lovelyparallel, Lda";
export const NIPC = "518354750";
export const PHONE = "+351 937 424 708";
export const PHONE_E164 = "+351937424708";
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@portugal-business.com";
export const CALENDLY_URL = "https://calendly.com/businessportugal";
export const LINKEDIN_URL = "https://www.linkedin.com/in/audrey-marques-97728114b/";

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// Pays SERVIS (audience francophone à l'étranger vis-à-vis du Portugal) : Europe
// francophone + Maghreb francophone. NB : c'est l'aire de SERVICE (areaServed),
// distincte de l'ADRESSE du cabinet, qui reste Lisboa/PT (ancrage local).
// Liste par défaut raisonnable ; à confirmer avec la cliente (Monaco = petit marché).
export const AREA_SERVED_COUNTRIES = [
  "Portugal",
  "France",
  "Belgique",
  "Suisse",
  "Luxembourg",
  "Monaco",
  "Maroc",
  "Tunisie",
  "Algérie",
] as const;

// og:locale + og:locale:alternate pour une page localisée (FR ↔ EN). À étaler
// dans l'`openGraph` d'une page : `openGraph: { ...ogLocaleFor(locale), ... }`.
export function ogLocaleFor(locale: string): { locale: string; alternateLocale: string } {
  return locale === "en"
    ? { locale: "en_GB", alternateLocale: "fr_FR" }
    : { locale: "fr_FR", alternateLocale: "en_GB" };
}

// Identifiants @id du graphe d'entité (réutilisés par les JSON-LD de page
// pour pointer vers les nœuds canoniques au lieu de dupliquer l'entité).
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const FOUNDER_ID = `${SITE_URL}/#audrey-marques`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Construit les alternates hreflang d'un chemin (sans préfixe de locale),
// en incluant x-default → /fr (clientèle francophone par défaut).
export function languagesFor(path: string): Record<string, string> {
  const clean = path === "/" ? "" : path;
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[locale] = `${SITE_URL}/${locale}${clean}`;
  }
  map["x-default"] = `${SITE_URL}/fr${clean}`;
  return map;
}

// URL absolue d'une page localisée (pour canonical / og:url / JSON-LD).
export function urlFor(locale: string, path: string): string {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${clean}`;
}
