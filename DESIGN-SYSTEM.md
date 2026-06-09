# Design System « Atelier » — contrat de construction

> Référence **obligatoire** pour toute nouvelle page/composant. Objectif : un site **éditorial premium, sobre, sérieux** (cabinet d'implantation), surtout PAS « template ». Tout doit ressembler à la home déjà construite (`src/components/home/*`).

## Stack & conventions

- Next.js 16 App Router · React 19 · TS strict · Tailwind v4 (tokens CSS) · next-intl (`/fr` `/en`).
- Routes sous `src/app/[locale]/<route>/page.tsx`. Pages async.
- **Toujours** au début d'une page : `const { locale } = await params; setRequestLocale(locale);`
- Icônes : `lucide-react` (jamais d'emoji). Trait fin, taille mesurée.

## Tokens — n'utiliser QUE les classes sémantiques (zéro hex en dur)

| Rôle | Classe | Sens |
|---|---|---|
| Fond page | `bg-background` | papier bone |
| Texte | `text-foreground` | encre |
| Surface/carte | `bg-card` | bone clair |
| Texte secondaire | `text-muted-foreground` | taupe |
| Marque | `bg-primary` / `text-primary-foreground` | **vert-pétrole** |
| Accent | `bg-accent` / `text-accent` / `text-accent-foreground` | **laiton/or** |
| Filets/bordures | `border-border` | hairline |
| Focus | `ring-ring` | laiton |

Opacités autorisées (ex. `text-primary-foreground/80`, `border-foreground/20`). Dark mode géré automatiquement par les tokens — **ne jamais** écrire de variantes `dark:` ni de hex.

## Typographie

- **Police par défaut = serif éditoriale (EB Garamond)** : titres ET corps. Le corps est déjà en serif via `body`.
- Titres : `font-serif` (hérité), poids 500, ex. `text-3xl sm:text-4xl lg:text-5xl`. Toujours sobres, pas de gradient de texte.
- **`.eyebrow`** (classe fournie) : sur-titre de section en petites capitales laiton espacées. À mettre au-dessus de chaque titre de section.
- **`font-sans`** (Schibsted Grotesk) : UNIQUEMENT pour labels/nav/boutons/méta, en `uppercase tracking-[0.14em] text-xs`. Jamais pour le corps.
- Accent typographique : un mot clé en `italic text-accent` dans un titre (cf. hero).
- Chiffres d'index : classe **`.index-num`** + `text-accent` (ex. `01`, `02` via `String(i+1).padStart(2,"0")`).

## Éléments de marque (au lieu de cartes « template »)

- **`.rule-brass`** : filet laiton 1px (séparateur premium, ex. haut de carte/footer).
- Petit losange laiton : `<span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />`.
- **Filets hairline** (`border-border`) plutôt qu'ombres. Listes séparées par `divide-y divide-border`. Grilles « éditoriales » : `grid gap-px border border-border bg-border` + cellules `bg-card`.
- **Beaucoup de blanc.** Pas d'ombres flottantes, pas de `hover:-translate-y`, pas de `rounded-2xl` partout (radius serré, `rounded-sm`).

## Layout

- Conteneur : **classe `site-frame`** (source unique, définie dans `globals.css` = `max-w-[1400px] mx-auto px-5 lg:px-8`). **Toujours l'utiliser** pour un cadre de contenu plein — header, footer et sections inclus. **Ne JAMAIS recopier un `max-w-*` en dur** comme cadre (sinon les largeurs re-divergent et les marges latérales redeviennent incohérentes). On garde `py-*`, `grid`, `relative` etc. à côté : `<section className="site-frame py-24 lg:py-32">`.
- Largeurs réduites volontaires (NON `site-frame`) : prose légale / article (`max-w-3xl`), en-têtes de section et mesures de lecture (`max-w-2xl`), panneaux CTA centrés (`max-w-5xl`), formulaires/quiz. À garder étroites.
- Section : `py-24 lg:py-32`. Section avec ancre : ajouter `scroll-mt-24` et un `id`.
- Compositions **asymétriques** (`lg:grid-cols-[0.82fr_1.18fr]`), colonnes sticky pour les en-têtes de section longues.

## Mouvement

- Utiliser **`<Reveal>`** de `@/components/motion/reveal` pour les entrées au scroll. Prop `delay` (ms) pour décaler (`delay={i*70}`). Enrober des blocs (titre, paragraphe, liste, carte), pas chaque mot.
- **Ne pas** ajouter de librairie d'animation. `prefers-reduced-motion` est déjà respecté (ne pas le casser).

## Boutons (`@/components/ui/button`)

- `buttonVariants({ variant, size })` appliqué à un `<Link>`/`<a>` ; `<Button>` pour les vrais boutons.
- Variants : `primary` (laiton, CTA principal), `solid` (pétrole), `outline` (filet encre), `ghost`. Tailles `sm|md|lg`.
- CTA principal du site = **« Réserver un diagnostic gratuit »** → `/contact`.

## i18n des NOUVELLES pages (important)

La home utilise next-intl. Pour les **nouvelles pages statiques**, utiliser un **dictionnaire bilingue local** (auto-suffisant, évite toute collision de fichiers entre agents) :

```tsx
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

const COPY = {
  fr: { metaTitle: "…", metaDesc: "…", title: "…", /* … */ },
  en: { metaTitle: "…", metaDesc: "…", title: "…", /* … */ },
} as const;

type Props = { params: Promise<{ locale: string }> };
const pick = (l: string) => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return { title: c.metaTitle, description: c.metaDesc };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);
  return ( /* … */ );
}
```

Pour les routes dynamiques (`/blog/[slug]`), exporter `generateStaticParams()` couvrant `fr` et `en`.

## Contenu & règles éditoriales (NON négociables)

- Source de vérité contenu : **`../docs/BRIEF-CONTENU-CLIENTE.md`**. Faits fiscaux/juridiques : **`../docs/SEO-GEO/08-YMYL-EEAT-CONFORMITE.md`** (à respecter scrupuleusement).
- **Audrey Marques = consultante en implantation/création. JAMAIS « comptable / expert-comptable / fiscaliste / avocate ».** Elle coordonne et met en relation. La compta est assurée par un Contabilista Certificado partenaire.
- **Pas de grille de prix** : fourchettes / « à partir de » uniquement (création : devis après échange gratuit ; domiciliation ~500 € HT/an ; compta ~200-250 €/mois via partenaires).
- **Aucun faux avis / aucun chiffre inventé.** Stat affichable : « 75+ entrepreneurs accompagnés depuis 2025 ». Ne PAS afficher de taux de satisfaction.
- Terminologie **portugaise** (ENI, Unipessoal Lda, Lda, SA, NIF/NIPC, IRC/IRS/IVA, IFICI). **Capital Lda = 1 €/associé** (jamais 5 000 €). **IFICI exclut les retraités.** Bannir « 0 risque », « garanti », « n°1 ».
- Sur toute page fiscale/juridique : disclaimer « ne constitue pas un conseil personnalisé » + CTA RDV.
- Coordonnées : tél `+351 937 424 708`, Calendly `https://calendly.com/businessportugal`, LinkedIn `https://www.linkedin.com/in/audrey-marques-97728114b/`, « Lisbonne, Portugal » (pas d'adresse complète). Entité : **Lovelyparallel, Lda · NIF 518354750**.

## Accessibilité

Hiérarchie des titres h1→h3 ; un seul `<h1>` par page ; `alt` sur images ; labels de formulaire visibles ; focus déjà visible globalement ; cibles tactiles ≥ 44px.
