// =====================================================================
//  Façade d'accès aux données de la plateforme, POINT DE SWAP UNIQUE.
//
//  PHASE FRONT (actuelle) : délègue à la couche mock typée.
//  MIGRATION SUPABASE : remplacer la ligne d'export ci-dessous par
//      export * from "./supabase";
//  (après : `pnpm add @supabase/supabase-js @supabase/ssr`, retrait de
//   l'exclusion `src/platform/data/supabase` dans tsconfig, env en place).
//
//  Les pages importent UNIQUEMENT depuis "@/platform/data", jamais
//  directement la couche mock, pour que ce swap soit en une ligne.
// =====================================================================

// CMS « Mon site » : store mock écrivable (brouillon → publication).
// Reste mocké même après le swap Supabase du bloc ci-dessus, jusqu'à la
// migration dédiée du CMS (tables site_contents / site_publications /
// site_posts) — voir src/platform/cms/store.ts.
export * from "@/platform/cms/store";
export * from "@/platform/mock/db";
