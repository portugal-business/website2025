// Types partagés du blog. Extraits de articles.ts pour permettre des modules
// d'article disjoints (un fichier par article) sans dépendance circulaire :
// articles.ts ET chaque module d'article importent leurs types d'ici.

export type Locale = "fr" | "en";

/** Une section d'article : titre optionnel + paragraphes. */
export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

/** Lien de maillage interne (label bilingue, href sans préfixe de locale). */
export interface ArticleRelatedLink {
  href: string;
  label: Record<Locale, string>;
}

export interface Article {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** ISO 8601. */
  datePublished: string;
  dateModified: string;
  content: Record<Locale, ArticleSection[]>;
  /** Maillage interne « Pour aller plus loin » (optionnel), rendu sous l'article. */
  relatedLinks?: ArticleRelatedLink[];
}
