import { ArrowRight, Check, X } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FOUNDER_ID, LINKEDIN_URL, languagesFor, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/a-propos";

const COPY = {
  fr: {
    metaTitle: "À propos d'Audrey Marques",
    metaDesc:
      "Audrey Marques, consultante en implantation et création d'entreprise au Portugal et fondatrice de Business Portugal. Parcours, méthode et rôle : accompagnement humain, coordination et mise en relation avec les bons partenaires, à Lisbonne.",
    eyebrow: "À propos",
    title: "Audrey Marques",
    titleAccent: "le chef d'orchestre de votre implantation",
    intro:
      "Parisienne d'origine, j'accompagne les entrepreneurs francophones qui veulent créer et implanter leur société au Portugal. Mon métier : coordonner, mettre en relation, et rendre concret ce que l'administration et les banques rendent souvent opaque.",
    portraitAlt: "Audrey Marques, fondatrice de Business Portugal",
    portraitCaption: "Audrey Marques · Lisbonne, Portugal",
    storyEyebrow: "Le parcours",
    storyTitle: "Dix ans de terrain, avant le Portugal",
    story: [
      "J'ai passé plus de dix ans à Paris dans la mode et la maroquinerie, développement commercial, achats, vente, où j'ai appris ce que veut dire accompagner un client de bout en bout. J'ai ensuite travaillé dans la défiscalisation, au contact de patrimoines et de décisions à fort enjeu.",
      "Arrivée au Portugal pour trois mois, j'y fête bientôt ma quatrième année. Pendant près de deux ans, j'ai été directrice commerciale dans un cabinet de comptabilité francophone : c'est là, au quotidien, que j'ai vu où le bât blesse vraiment.",
      "Le problème n'était presque jamais l'administration portugaise en elle-même. C'était le manque d'accompagnement humain, l'absence de coordination entre les interlocuteurs, et surtout des solutions bancaires concrètes qui faisaient défaut. J'ai fondé Business Portugal pour combler exactement ce vide.",
    ],
    whyEyebrow: "Le pourquoi",
    whyTitle: "Ce qui manquait cruellement",
    why: "Les entrepreneurs que je rencontrais n'avaient pas besoin d'une coquille montée « en deux heures ». Ils avaient besoin d'une personne qui décroche le téléphone, qui parle leur langue, qui connaît les bons partenaires et qui débloque l'ouverture d'un compte bancaire. C'est précisément ce que je fais : je suis le point de contact unique qui orchestre votre implantation, de la création de la société jusqu'à la banque.",
    doEyebrow: "Mon rôle, en clair",
    doTitle: "Ce que je fais, et ce que je ne fais pas",
    doNote:
      "La transparence sur mon rôle fait partie de la qualité du service. Je suis consultante : je coordonne et je mets en relation. La comptabilité réglementée est assurée par un Contabilista Certificado inscrit à l'OCC, partenaire du cabinet.",
    doLabel: "Ce que je fais",
    dontLabel: "Ce que je ne fais pas",
    doList: [
      "Création de société (NIF à distance, statuts signés sur place, Certidão Permanente, RCBE) coordonnée de bout en bout",
      "Accompagnement en personne à l'ouverture du compte bancaire, avec une banque partenaire officielle",
      "Mise en relation avec un Contabilista Certificado et des fiscalistes partenaires",
      "Coordination de l'ensemble de votre implantation : un interlocuteur unique, en français",
    ],
    dontList: [
      "Je ne suis ni comptable, ni expert-comptable, ni Contabilista Certificada",
      "Je ne suis ni fiscaliste, ni avocate, la fiscalité passe par une mise en relation",
      "Je ne tiens pas votre comptabilité réglementée : un partenaire inscrit à l'OCC s'en charge",
      "Je ne promets jamais un résultat fiscal ni un délai « garanti » : je suis honnête sur ce qui dépend des administrations et des banques",
    ],
    valuesEyebrow: "Mes engagements",
    valuesTitle: "Trois principes, sans compromis",
    values: [
      {
        title: "Réactivité",
        description:
          "Vous avez un interlocuteur qui répond, dans votre langue. Les délais et les partenaires se sont nettement améliorés depuis le lancement.",
      },
      {
        title: "Transparence",
        description:
          "Je dis ce que je fais et ce que je ne fais pas. Périmètre clair, fourchettes honnêtes, et ce qui est inclus ou exclu, dit dès le départ.",
      },
      {
        title: "Accompagnement",
        description:
          "Je vous suis jusqu'à la mise en relation avec les bons interlocuteurs. Vous n'êtes jamais seul·e face à l'administration ou à la banque.",
      },
    ],
    factsEyebrow: "Repères",
    facts: [
      { value: "75+", label: "Entrepreneurs accompagnés depuis 2025" },
      { value: "Lisbonne", label: "Portugal, où tout se coordonne" },
      { value: "Français", label: "Langue de travail au quotidien" },
    ],
    formationNote:
      "Parcours autodidacte et de terrain (formation initiale BTS). Ma valeur tient à l'expérience opérationnelle, au réseau de partenaires de confiance et à la coordination, pas à un titre réglementé que je n'ai pas.",
    ctaTitle: "Parlons de votre projet",
    ctaSubtitle:
      "Un premier échange, gratuit et sans engagement, pour comprendre votre situation et savoir si je peux vous aider.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Premier échange 100 % gratuit · Lisbonne, Portugal",
    jobTitle: "Consultante en implantation et création d'entreprise",
    knowsAbout: [
      "Création de société au Portugal",
      "Unipessoal Lda",
      "Lda",
      "NIF",
      "NIPC",
      "Accompagnement à l'ouverture de compte bancaire au Portugal",
      "Domiciliation d'entreprise",
      "Mise en relation comptable et fiscale",
      "Implantation d'entreprise au Portugal",
    ],
  },
  en: {
    metaTitle: "About Audrey Marques",
    metaDesc:
      "Audrey Marques, business setup and company-formation consultant in Portugal and founder of Business Portugal. Background, method and role: human support, coordination and connections to the right partners, in Lisbon.",
    eyebrow: "About",
    title: "Audrey Marques",
    titleAccent: "the conductor of your move to Portugal",
    intro:
      "Originally from Paris, I help French-speaking entrepreneurs create and establish their company in Portugal. My job: to coordinate, connect, and make concrete what administrations and banks too often keep opaque.",
    portraitAlt: "Audrey Marques, founder of Business Portugal",
    portraitCaption: "Audrey Marques · Lisbon, Portugal",
    storyEyebrow: "The journey",
    storyTitle: "Ten years on the ground, before Portugal",
    story: [
      "I spent more than ten years in Paris in fashion and leather goods, business development, buying, sales, where I learned what it means to support a client from start to finish. I then worked in tax-planning, dealing with significant assets and high-stakes decisions.",
      "I came to Portugal for three months; I will soon celebrate my fourth year here. For nearly two years I was commercial director in a French-speaking accounting firm: that is where, day after day, I saw where things really go wrong.",
      "The problem was almost never the Portuguese administration itself. It was the lack of human support, the absence of coordination between the people involved, and above all the missing, concrete banking solutions. I founded Business Portugal to fill exactly that gap.",
    ],
    whyEyebrow: "The why",
    whyTitle: "What was so sorely missing",
    why: "The entrepreneurs I met did not need a shell company set up «in two hours». They needed someone who picks up the phone, speaks their language, knows the right partners and unlocks the opening of a bank account. That is exactly what I do: I am the single point of contact who orchestrates your setup, from company formation through to banking.",
    doEyebrow: "My role, plainly",
    doTitle: "What I do, and what I don't",
    doNote:
      "Being transparent about my role is part of the quality of the service. I am a consultant: I coordinate and connect. Regulated accounting is handled by a Contabilista Certificado registered with the OCC, a partner of the firm.",
    doLabel: "What I do",
    dontLabel: "What I don't do",
    doList: [
      "Company formation (remote NIF, articles signed on site, Certidão Permanente, RCBE) coordinated end to end",
      "In-person support with opening the bank account, with an official partner bank",
      "Connection to a Contabilista Certificado and to tax partners",
      "Coordination of your whole setup: a single point of contact, in French",
    ],
    dontList: [
      "I am not an accountant nor a Contabilista Certificada",
      "I am neither a tax adviser nor a lawyer, tax matters go through a connection to a partner",
      "I do not keep your regulated accounts: a partner registered with the OCC handles that",
      "I never promise a tax outcome or a «guaranteed» timeline: I am honest about what depends on administrations and banks",
    ],
    valuesEyebrow: "My commitments",
    valuesTitle: "Three principles, no compromise",
    values: [
      {
        title: "Responsiveness",
        description:
          "You have one contact who answers, in your language. Timelines and partners have improved markedly since launch.",
      },
      {
        title: "Transparency",
        description:
          "I say what I do and what I don't. Clear scope, honest ranges, and what is included or excluded, stated from the outset.",
      },
      {
        title: "Support",
        description:
          "I stay with you through to the connection with the right people. You are never alone facing the administration or the bank.",
      },
    ],
    factsEyebrow: "Key facts",
    facts: [
      { value: "75+", label: "Entrepreneurs supported since 2025" },
      { value: "Lisbon", label: "Portugal, where it all comes together" },
      { value: "French", label: "Daily working language" },
    ],
    formationNote:
      "A self-taught, hands-on background (initial BTS training). My value lies in operational experience, a network of trusted partners and coordination, not in a regulated title I do not hold.",
    ctaTitle: "Let's talk about your project",
    ctaSubtitle:
      "A first conversation, free and with no commitment, to understand your situation and see whether I can help.",
    ctaButton: "Book a free diagnostic",
    ctaReassurance: "First conversation 100% free · Lisbon, Portugal",
    jobTitle: "Business setup and company-formation consultant",
    knowsAbout: [
      "Company formation in Portugal",
      "Unipessoal Lda",
      "Lda",
      "NIF",
      "NIPC",
      "Support with opening a Portuguese bank account",
      "Business domiciliation",
      "Accounting and tax partner introductions",
      "Business establishment in Portugal",
    ],
  },
} as const;

type Props = { params: Promise<{ locale: string }> };
const pick = (l: string) => (l === "en" ? COPY.en : COPY.fr);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: urlFor(locale, PATH),
      languages: languagesFor(PATH),
    },
  };
}

export default async function AProposPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  // JSON-LD Person, source de vérité « entité » pour le Knowledge Graph et les LLM.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Audrey Marques",
    jobTitle: c.jobTitle,
    worksFor: { "@id": ORGANIZATION_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisbonne",
      addressCountry: "PT",
    },
    knowsLanguage: ["fr", "pt"],
    knowsAbout: [...c.knowsAbout],
    sameAs: [LINKEDIN_URL],
    mainEntityOfPage: urlFor(locale, PATH),
    url: urlFor(locale, PATH),
  };
  const jsonLd = JSON.stringify(personLd);

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique rendu côté serveur (chaîne contrôlée) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Hero, présentation + portrait, asymétrique */}
      <section className="site-frame grid items-start gap-12 py-24 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:py-32">
        <div>
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[3.8rem]">
              <span className="block">{c.title}</span>
              <span className="mt-2 block text-[1.7rem] italic leading-tight text-accent sm:text-3xl lg:text-[2.4rem]">
                {c.titleAccent}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
              >
                {c.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <figure>
            {/* TODO photo HD Audrey, placeholder éditorial, ne pas hotlinker d'image externe */}
            <div
              className="aspect-[4/5] w-full border border-border bg-muted"
              role="img"
              aria-label={c.portraitAlt}
            />
            <figcaption className="mt-4 flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
              {c.portraitCaption}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Repères chiffrés */}
      <section className="border-y border-border bg-card">
        <div className="site-frame grid sm:grid-cols-3">
          {c.facts.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 90}
              className={
                i > 0
                  ? "border-t border-border py-10 sm:border-l sm:border-t-0 sm:py-12 sm:pl-10"
                  : "py-10 sm:py-12 sm:pr-10"
              }
            >
              <div className="font-serif text-4xl lg:text-5xl">{f.value}</div>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {f.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Parcours, en-tête sticky + récit */}
      <section className="site-frame py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">{c.storyEyebrow}</p>
              <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.storyTitle}</h2>
            </Reveal>
          </div>
          <div className="space-y-6">
            {c.story.map((p, i) => (
              <Reveal key={p} delay={i * 70}>
                <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={c.story.length * 70}>
              <p className="mt-2 border-l-2 border-accent pl-5 font-sans text-sm leading-relaxed text-muted-foreground">
                {c.formationNote}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Le pourquoi */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow">{c.whyEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.whyTitle}</h2>
              </Reveal>
            </div>
            <Reveal>
              <p className="text-xl leading-relaxed">{c.why}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ce que je fais / ne fais pas */}
      <section className="site-frame py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{c.doEyebrow}</p>
          <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.doTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.doNote}</p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
          <Reveal className="bg-card">
            <div className="h-full p-8">
              <div className="rule-brass mb-6 w-12" />
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-accent">
                {c.doLabel}
              </p>
              <ul className="mt-6 divide-y divide-border">
                {c.doList.map((item) => (
                  <li key={item} className="flex items-baseline gap-4 py-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span className="text-[1.02rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={90} className="bg-card">
            <div className="h-full p-8">
              <div className="mb-6 h-px w-12 bg-border" />
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {c.dontLabel}
              </p>
              <ul className="mt-6 divide-y divide-border">
                {c.dontList.map((item) => (
                  <li key={item} className="flex items-baseline gap-4 py-4">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="text-[1.02rem] leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valeurs / engagements */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.valuesEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.valuesTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-3">
            {c.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="bg-card">
                <div className="h-full p-8">
                  <span className="index-num text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl">{v.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-5xl border border-border bg-primary px-8 py-20 text-center text-primary-foreground lg:px-16 lg:py-24">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              {c.ctaSubtitle}
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
              >
                {c.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-7 font-sans text-xs uppercase tracking-[0.16em] text-primary-foreground/55">
              {c.ctaReassurance}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
