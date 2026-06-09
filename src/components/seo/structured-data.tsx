// Composant SERVER (pas de "use client") : émet le graphe d'entité GLOBAL
// (Organization + ProfessionalService/LocalBusiness + Person fondatrice)
// sous forme de JSON-LD. À intégrer dans le layout séparément, ne pas importer ici.

import {
  AREA_SERVED_COUNTRIES,
  BUSINESS_ID,
  CONTACT_EMAIL,
  FOUNDER_ID,
  LINKEDIN_URL,
  ORGANIZATION_ID,
  PHONE_E164,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site";

// areaServed = aire de SERVICE (les francophones à l'étranger), distincte de
// l'address (le cabinet, Lisboa/PT). Tableau de Country plutôt qu'un seul "Portugal".
const AREA_SERVED = AREA_SERVED_COUNTRIES.map((name) => ({ "@type": "Country", name }));

// Audience : QUI est servi (francophones) — distinct de OÙ (areaServed).
const AUDIENCE = {
  "@type": "Audience",
  audienceType: "Entrepreneurs et indépendants francophones",
  geographicArea: AREA_SERVED,
};

// ContactPoint : dit explicitement que le service est délivré EN FRANÇAIS (et PT).
const CONTACT_POINT = {
  "@type": "ContactPoint",
  contactType: "customer support",
  telephone: PHONE_E164,
  email: CONTACT_EMAIL,
  availableLanguage: ["fr", "pt"],
};

// Graphe unique : entités liées via @id (Schema.org @graph).
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Business Portugal",
      legalName: "Lovelyparallel, Lda",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      // NIPC de l'entité juridique (cf. brief : Lovelyparallel, Lda · NIF 518354750).
      taxID: "518354750",
      email: CONTACT_EMAIL,
      areaServed: AREA_SERVED,
      audience: AUDIENCE,
      contactPoint: CONTACT_POINT,
      knowsLanguage: ["fr", "pt"],
      founder: { "@id": FOUNDER_ID },
      sameAs: [LINKEDIN_URL],
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": BUSINESS_ID,
      name: "Business Portugal",
      url: SITE_URL,
      image: `${SITE_URL}/logo.png`,
      // Consultante en implantation/création (jamais comptable/fiscaliste/avocate).
      description:
        "Accompagnement à la création et à l'implantation d'entreprise au Portugal : NIF, société, accompagnement bancaire et coordination d'un réseau de partenaires comptables et fiscaux.",
      telephone: PHONE_E164,
      priceRange: "€€",
      areaServed: AREA_SERVED,
      audience: AUDIENCE,
      knowsLanguage: ["fr", "pt"],
      // L'address reste Lisboa/PT : l'ancrage LOCAL est porté ici, pas par areaServed.
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lisboa",
        addressCountry: "PT",
      },
      parentOrganization: { "@id": ORGANIZATION_ID },
      founder: { "@id": FOUNDER_ID },
      sameAs: [LINKEDIN_URL],
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Audrey Marques",
      jobTitle: "Consultante en implantation et création d'entreprise au Portugal",
      worksFor: { "@id": ORGANIZATION_ID },
      url: `${SITE_URL}/fr/a-propos`,
      knowsLanguage: ["fr", "pt"],
      knowsAbout: [
        "Création de société au Portugal",
        "Unipessoal Lda",
        "Lda",
        "NIF / NIPC",
        "Accompagnement bancaire",
        "Domiciliation",
        "Mise en relation comptable et fiscale",
        "Implantation d'entreprise au Portugal",
      ],
      sameAs: [LINKEDIN_URL],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Business Portugal",
      inLanguage: ["fr", "en"],
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique, aucune donnée utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
