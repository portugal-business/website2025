// Méta des sections éditables (libellés UI + page d'édition). Partagé
// server/client — ne rien importer d'autre que les types ici.

import type { SiteContent, SiteSectionKey } from "@/platform/types";

export interface SiteSectionMeta {
  label: string;
  description: string;
  href: string;
  /** nombre d'éléments pour les sections-listes (— sinon) */
  count?: (content: SiteContent) => number;
}

export const SITE_SECTION_META: Record<SiteSectionKey, SiteSectionMeta> = {
  identity: {
    label: "Identité & coordonnées",
    description: "Marque, raison sociale, téléphone, e-mail, liens",
    href: "/app/site/identite",
  },
  hero: {
    label: "Accueil (hero)",
    description: "Titre, sous-titre et appels à l'action de la page d'accueil",
    href: "/app/site/identite#hero",
  },
  services: {
    label: "Services & tarifs",
    description: "Prestations affichées, avec mention « via partenaire »",
    href: "/app/site/contenu#services",
    count: (c) => c.services.length,
  },
  stats: {
    label: "Chiffres clés",
    description: "Bandeau de confiance (75+, délais, à distance)",
    href: "/app/site/contenu#stats",
    count: (c) => c.stats.length,
  },
  testimonials: {
    label: "Avis clients",
    description: "Avis réels, nommés et vérifiables uniquement",
    href: "/app/site/contenu#avis",
    count: (c) => c.testimonials.length,
  },
  faqs: {
    label: "FAQ",
    description: "Questions-réponses de la page d'accueil",
    href: "/app/site/contenu#faq",
    count: (c) => c.faqs.length,
  },
};

export const SITE_SECTION_ORDER: SiteSectionKey[] = [
  "identity",
  "hero",
  "services",
  "stats",
  "testimonials",
  "faqs",
];
