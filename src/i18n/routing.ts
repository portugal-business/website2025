import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Français = langue principale (clientèle francophone). EN disponible, /fr et /en réels et crawlables.
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
