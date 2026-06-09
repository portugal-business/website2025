# Business Portugal — site (refonte)

Refonte du site **Business Portugal** (Lovelyparallel, Lda) sur la stack Propul'SEO. Remplace l'ancien template Vite/React situé à la racine du dépôt (conservé temporairement comme source de contenu).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript strict**
- **Tailwind v4** (CSS-first, design tokens) — voir `src/app/globals.css`
- **next-intl** — routage i18n par segment (`/fr`, `/en`), SSR
- **Biome** (lint + format) — pas ESLint/Prettier
- **pnpm** — gestionnaire de paquets
- Polices self-hosted via `next/font` : **Fraunces** (titres) + **Hanken Grotesk** (corps)

## Commandes

```bash
pnpm install        # installer
pnpm dev            # dev (http://localhost:3000 → redirige vers /fr)
pnpm build          # build production
pnpm start          # servir le build
pnpm lint           # biome check
pnpm format         # biome format --write
```

## Direction artistique

Éditorial premium ancré Portugal — **anti-template**. Tokens dans `globals.css` :
crème papier · **bleu azulejo** (`--primary`) · **terracotta** (`--accent`) · doré (`--gold`).
Dark mode = nuit azulejo (`.dark`). Motifs discrets `.calcada` / `.azulejo-rule` (remplacent les « orbes flous »). Mouvement : une seule révélation au chargement (`.reveal`), respect de `prefers-reduced-motion`.

## Structure

```
src/
├── app/
│   ├── globals.css            # design tokens + base + motifs + motion
│   └── [locale]/
│       ├── layout.tsx         # html, fonts, navbar/footer, provider i18n, skip link
│       └── page.tsx           # home (assemble les sections)
├── components/
│   ├── ui/button.tsx          # bouton (cva + tokens)
│   ├── site/                  # navbar, footer, theme-toggle, locale-switcher
│   └── home/                  # hero, trust-bar, positioning, process, network, final-cta
├── i18n/                      # routing, navigation, request (next-intl)
└── proxy.ts                   # ex-middleware (Next 16) — routage i18n
messages/                      # fr.json, en.json (contenu réel)
```

## Statut

- ✅ **Phase 1 — Fondations** : design system « Atelier », i18n /fr+/en (SSG), layout, animation d'arrivée, home premium, dark mode.
- ✅ **Phase 2 — Pages** : Accueil, À propos (Audrey + Person schema), Création de société (Service+Breadcrumb), FAQ (FAQPage), Contact (formulaire Server Action Zod + Brevo + Calendly), Blog + 6 articles migrés/corrigés (BlogPosting), Mentions légales, Confidentialité.
- ✅ **SEO** : JSON-LD global dans le layout, `sitemap.ts` (slugs réels + hreflang), `robots.ts`. Build + Biome verts (44 fichiers).
- 🔴 **À lever (Audrey)** : domaine définitif + DNS, email pro, logo HD, photo Audrey, `BREVO_API_KEY` (env) ; validation fiscale 2026 ; vrais avis. Cf. `../docs/BRIEF-CONTENU-CLIENTE.md` §13. Placeholders `TODO` en place dans le code.

> Le contenu et le positionnement suivent `../docs/BRIEF-CONTENU-CLIENTE.md` ; le SEO/GEO et la conformité YMYL suivent `../docs/SEO-GEO/`.
