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

- ✅ **Phase 1 — Fondations** : scaffold, design system, i18n /fr+/en (SSG), layout, home de démonstration, dark mode, build + Biome verts.
- ⏳ **Phase 2** : pages À propos (Audrey), Création de société, Réseau partenaires, FAQ, Contact (formulaire qualif → Brevo + Calendly), Blog (migration des 6 articles corrigés), pages légales (cf. `../docs/legal/`).
- 🔴 **Bloquants** : domaine définitif + DNS, email pro, logo HD, photo Audrey (cf. `../docs/BRIEF-CONTENU-CLIENTE.md` §13).

> Le contenu et le positionnement suivent `../docs/BRIEF-CONTENU-CLIENTE.md` ; le SEO/GEO et la conformité YMYL suivent `../docs/SEO-GEO/`.
