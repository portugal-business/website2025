import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Évite l'ambiguïté de racine (un lockfile legacy existe dans le dossier parent).
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Conformité Propul'SEO : pas de header "X-Powered-By"
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
