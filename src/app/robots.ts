import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Plateforme SaaS (mockée) : non publique. Défense en profondeur — le
      // proxy renvoie déjà 404 sur ces préfixes en prod vitrine.
      disallow: ["/app", "/portal", "/launch"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
