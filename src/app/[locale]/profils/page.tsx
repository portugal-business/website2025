import { ArrowRight, Bitcoin, Code2, Cpu, ShoppingCart, Video } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { languagesFor, urlFor } from "@/lib/site";

const PATH = "/profils";

type Props = { params: Promise<{ locale: string }> };

type IconKey = "crypto" | "ecom" | "freelance" | "creator" | "saas";
type Profile = {
  icon: IconKey;
  index: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
};

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  profiles: Profile[];
  discover: string;
  disclaimer: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  itemListName: string;
};

const ICONS: Record<IconKey, typeof Bitcoin> = {
  crypto: Bitcoin,
  ecom: ShoppingCart,
  freelance: Code2,
  creator: Video,
  saas: Cpu,
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Profils : crypto, e-commerce, freelance IT, créateurs, SaaS au Portugal",
    metaDesc:
      "Des pages dédiées à chaque profil d'entrepreneur francophone au Portugal : trader crypto, e-commerce & Amazon FBA, freelance IT, créateur de contenu, éditeur SaaS. Fiscalité 2026 et bonne structure.",
    eyebrow: "Profils",
    title: "Votre activité a ses règles.",
    titleAccent: "Voici la vôtre, au Portugal.",
    lead: "Chaque activité a sa fiscalité et sa bonne structure au Portugal. Plutôt qu'un discours général, voici une page par profil : les faits 2026 en terminologie portugaise exacte, les pièges à éviter, et la manière dont je crée votre société et vous oriente vers les bons partenaires.",
    profiles: [
      {
        icon: "crypto",
        index: "01",
        kicker: "Crypto & trading",
        title: "Trader & investisseur crypto",
        description:
          "Investisseur particulier (exonération au-delà de 365 jours) ou trader professionnel requalifié : la distinction qui change tout, plus DAC8 en 2026.",
        href: "/profils/crypto-trader",
      },
      {
        icon: "ecom",
        index: "02",
        kicker: "E-commerce",
        title: "E-commerce & Amazon FBA",
        description:
          "TVA transfrontalière (OSS/IOSS) et le piège du stockage Amazon FBA, immatriculation à l'IVA dès le 1ᵉʳ euro. IRC PME et Unipessoal Lda.",
        href: "/profils/e-commerce-amazon-fba",
      },
      {
        icon: "freelance",
        index: "03",
        kicker: "Tech & conseil",
        title: "Consultant IT & développeur freelance",
        description:
          "Facturer ses clients FR/UE en conformité, régime simplifié IRS, recibos verdes, et la vérité sur l'éligibilité IFICI des freelances.",
        href: "/profils/freelance-it",
      },
      {
        icon: "creator",
        index: "04",
        kicker: "Création de contenu",
        title: "YouTubeur, streamer, influenceur",
        description:
          "Déclarer la monétisation internationale (AdSense, Twitch, sponsoring) en catégorie B, et choisir entre recibos verdes et société Unipessoal Lda.",
        href: "/profils/createur-contenu",
      },
      {
        icon: "saas",
        index: "05",
        kicker: "Logiciel & tech",
        title: "Éditeur SaaS & fondateur tech",
        description:
          "TVA des services électroniques (B2B reverse charge, B2C OSS), IRC PME et IFICI fondateur, souvent éligible pour les profils tech.",
        href: "/profils/saas",
      },
    ],
    discover: "Découvrir le profil",
    disclaimer:
      "Ces pages ont une vocation informative et ne constituent pas un conseil juridique, comptable ou fiscal personnalisé. Les chiffres sont à jour en 2026 et susceptibles d'évoluer. Pour votre situation précise, réservez un échange gratuit.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Profils",
    itemListName: "Profils d'entrepreneurs accompagnés au Portugal",
  },
  en: {
    metaTitle: "Profiles: crypto, e-commerce, freelance IT, creators, SaaS in Portugal",
    metaDesc:
      "Dedicated pages for each French-speaking entrepreneur profile in Portugal: crypto trader, e-commerce & Amazon FBA, freelance IT, content creator, SaaS founder. 2026 taxation and the right structure.",
    eyebrow: "Profiles",
    title: "Your activity has its own rules.",
    titleAccent: "Here's yours, in Portugal.",
    lead: "Every activity has its own taxation and its right structure in Portugal. Rather than a generic pitch, here is one page per profile: the 2026 facts in accurate Portuguese terminology, the pitfalls to avoid, and how I set up your company and connect you with the right partners.",
    profiles: [
      {
        icon: "crypto",
        index: "01",
        kicker: "Crypto & trading",
        title: "Crypto trader & investor",
        description:
          "Private investor (exemption beyond 365 days) or reclassified professional trader: the distinction that changes everything, plus DAC8 in 2026.",
        href: "/profils/crypto-trader",
      },
      {
        icon: "ecom",
        index: "02",
        kicker: "E-commerce",
        title: "E-commerce & Amazon FBA",
        description:
          "Cross-border VAT (OSS/IOSS) and the Amazon FBA storage trap, IVA registration from the very first euro. SME IRC and Unipessoal Lda.",
        href: "/profils/e-commerce-amazon-fba",
      },
      {
        icon: "freelance",
        index: "03",
        kicker: "Tech & consulting",
        title: "IT consultant & freelance developer",
        description:
          "Invoice your FR/EU clients compliantly, the simplified IRS regime, recibos verdes, and the truth about freelancers' IFICI eligibility.",
        href: "/profils/freelance-it",
      },
      {
        icon: "creator",
        index: "04",
        kicker: "Content creation",
        title: "YouTuber, streamer, influencer",
        description:
          "Declare international monetisation (AdSense, Twitch, sponsorship) under category B, and choose between recibos verdes and a Unipessoal Lda.",
        href: "/profils/createur-contenu",
      },
      {
        icon: "saas",
        index: "05",
        kicker: "Software & tech",
        title: "SaaS founder & tech editor",
        description:
          "VAT on electronic services (B2B reverse charge, B2C OSS), SME IRC and founder IFICI, often eligible for tech profiles.",
        href: "/profils/saas",
      },
    ],
    discover: "Discover the profile",
    disclaimer:
      "These pages are for information only and do not constitute personalised legal, accounting or tax advice. Figures are up to date in 2026 and subject to change. For your specific situation, book a free conversation.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Profiles",
    itemListName: "Entrepreneur profiles supported in Portugal",
  },
};

const pick = (l: string): Copy => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: urlFor(locale, PATH), languages: languagesFor(PATH) },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function ProfilsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: urlFor(locale, "/") },
      { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: urlFor(locale, PATH) },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.itemListName,
    numberOfItems: c.profiles.length,
    itemListElement: c.profiles.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: urlFor(locale, p.href),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="site-frame py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]">
            <span className="block">{c.title}</span>
            <span className="block italic text-accent">{c.titleAccent}</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {c.profiles.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <Reveal key={p.href} delay={i * 60} className="bg-card">
                <Link href={p.href} className="group flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-accent" aria-hidden />
                    <span className="index-num text-sm text-accent">{p.index}</span>
                  </div>
                  <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {p.kicker}
                  </p>
                  <h2 className="mt-2 font-serif text-xl transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{p.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                    {c.discover}
                    <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
            {c.disclaimer}
          </p>
        </Reveal>
      </section>
    </>
  );
}
