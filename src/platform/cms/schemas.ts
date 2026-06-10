// =====================================================================
//  CMS « Mon site » — schémas Zod, contrats d'entrée des Server Actions.
//  Mêmes contrats à la migration Supabase (validation avant insert/update).
// =====================================================================

import { z } from "zod";

/** Champ bilingue requis : les deux locales du site doivent être remplies. */
const zLocalized = z.object({
  fr: z.string().trim().min(1, "Texte français requis").max(2000),
  en: z.string().trim().min(1, "Texte anglais requis").max(2000),
});

/** Variante facultative (les deux locales peuvent rester vides). */
const zLocalizedOptional = z.object({
  fr: z.string().trim().max(20000),
  en: z.string().trim().max(20000),
});

export const siteIdentitySchema = z.object({
  brandName: z.string().trim().min(1).max(120),
  tagline: zLocalized,
  legalName: z.string().trim().min(1).max(160),
  nipc: z.string().trim().min(1).max(20),
  phone: z.string().trim().min(1).max(40),
  email: z.string().trim().email("E-mail invalide"),
  calendlyUrl: z.string().trim().url("URL invalide"),
  linkedinUrl: z.string().trim().url("URL invalide"),
});

export const siteHeroSchema = z.object({
  eyebrow: zLocalized,
  title: zLocalized,
  titleAccent: zLocalized,
  subtitle: zLocalized,
  ctaPrimary: zLocalized,
  ctaSecondary: zLocalized,
  trustLine: zLocalized,
});

export const siteServicesSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      name: zLocalized,
      description: zLocalized,
      priceNote: zLocalized,
      viaPartner: z.boolean(),
    }),
  )
  .max(12);

export const siteStatsSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      value: zLocalized,
      label: zLocalized,
    }),
  )
  .max(6);

export const siteTestimonialsSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      author: z.string().trim().min(1, "Avis réels et nommés uniquement").max(120),
      role: zLocalized,
      quote: zLocalized,
    }),
  )
  .max(12);

export const siteFaqsSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      question: zLocalized,
      answer: zLocalized,
    }),
  )
  .max(30);

export const sitePostPatchSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres et tirets)"),
  title: zLocalized,
  excerpt: zLocalizedOptional,
  body: zLocalizedOptional,
  category: z.string().trim().min(1).max(60),
  readingMinutes: z.number().int().min(1).max(60),
});

export type SiteIdentityInput = z.infer<typeof siteIdentitySchema>;
export type SiteHeroInput = z.infer<typeof siteHeroSchema>;
export type SiteServicesInput = z.infer<typeof siteServicesSchema>;
export type SiteStatsInput = z.infer<typeof siteStatsSchema>;
export type SiteTestimonialsInput = z.infer<typeof siteTestimonialsSchema>;
export type SiteFaqsInput = z.infer<typeof siteFaqsSchema>;
export type SitePostPatchInput = z.infer<typeof sitePostPatchSchema>;
