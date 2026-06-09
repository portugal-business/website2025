import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BUSINESS_ID, languagesFor, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/services/recrutement";

type Props = { params: Promise<{ locale: string }> };

type Item = { title: string; description: string };
type CostLine = { label: string; value: string; note: string };
type Step = { title: string; description: string };
type Faq = { q: string; a: string };

type Copy = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trust: string;

  partnerLabel: string;
  partnerItems: string[];

  whyEyebrow: string;
  whyTitle: string;
  whyBody: string;
  whyItems: Item[];

  costEyebrow: string;
  costTitle: string;
  costSubtitle: string;
  costLines: CostLine[];
  costNote: string;
  simulatorTeaser: string;
  simulatorCta: string;

  howEyebrow: string;
  howTitle: string;
  howSubtitle: string;
  howSteps: Step[];

  scopeEyebrow: string;
  scopeTitle: string;
  scopeBody: string;
  scopeDo: string[];
  scopeDoLabel: string;
  scopePartner: string[];
  scopePartnerLabel: string;

  faqEyebrow: string;
  faqTitle: string;
  faqItems: Faq[];

  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbServices: string;
  breadcrumbCurrent: string;
  serviceName: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "Recruter au Portugal, mise en relation recrutement",
    metaDesc:
      "Recruter au Portugal : talents multilingues, coût réel d'un salarié (TSU employeur 23,75 %, 14 mois de salaire, minimum ~870 €). Je vous mets en relation avec une société de recrutement spécialisée. Premier échange gratuit et sans engagement.",
    eyebrow: "Réseau de partenaires",
    title: "Recruter au Portugal,",
    titleAccent: "avec le bon partenaire à vos côtés",
    lead: "Le Portugal offre un vivier de talents multilingues à des coûts maîtrisés, mais embaucher implique des règles locales précises (contrat, Segurança Social, 14 mois de salaire). Je ne suis pas cabinet de recrutement : je vous mets en relation avec une société portugaise spécialisée, dirigée par une Française, qui pilote la recherche et l'embauche pour vous.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le coût réel d'un salarié",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    partnerLabel: "Le partenaire recrutement",
    partnerItems: [
      "Société portugaise spécialisée",
      "Dirigée par une Française",
      "Recherche et sélection des candidats",
      "Connaissance du droit du travail local",
      "Interface francophone de bout en bout",
    ],

    whyEyebrow: "Pourquoi le Portugal",
    whyTitle: "Un vivier de talents, à coût maîtrisé",
    whyBody:
      "Le Portugal attire pour de vraies raisons : une main-d'œuvre formée et multilingue, des coûts salariaux inférieurs à ceux de la France ou de l'Allemagne, et une forte concentration de profils tech, support et relation client. C'est un atout réel pour structurer une équipe locale, à condition d'embaucher dans les règles.",
    whyItems: [
      {
        title: "Des talents multilingues",
        description:
          "Le portugais, l'anglais, le français et l'espagnol sont largement parlés. Lisbonne et Porto concentrent des profils internationaux, en particulier sur les fonctions tech, support et service client.",
      },
      {
        title: "Des coûts plus compétitifs",
        description:
          "Les niveaux de rémunération restent inférieurs à ceux de nombreux pays d'Europe de l'Ouest, à compétences comparables. Le rapport qualité de profil / coût total est l'un des arguments forts du marché portugais.",
      },
      {
        title: "Un marché tech dynamique",
        description:
          "Écosystème start-up actif, écoles d'ingénieurs reconnues, présence de hubs de grands groupes : recruter un développeur, un profil data ou un agent support y est plus accessible qu'ailleurs en Europe.",
      },
      {
        title: "Un cadre européen",
        description:
          "Embaucher au Portugal, c'est rester dans l'Union européenne : liberté d'établissement, monnaie unique, normes de protection sociale connues. Pas de zone grise réglementaire.",
      },
    ],

    costEyebrow: "Le coût réel",
    costTitle: "Ce qu'un salarié coûte vraiment",
    costSubtitle:
      "Le salaire brut n'est qu'une partie de l'équation. Au Portugal, l'employeur paie des cotisations sociales et la rémunération s'étale sur 14 mois. Voici les repères chiffrés pour calculer un coût total réaliste.",
    costLines: [
      {
        label: "TSU employeur",
        value: "23,75 %",
        note: "Taxa Social Única, la cotisation patronale à la Segurança Social, calculée sur le salaire brut (le salarié cotise 11 % de son côté).",
      },
      {
        label: "Nombre de mois",
        value: "14 mois",
        note: "Le salaire annuel se verse sur 14 mois : 12 mensualités + un subsídio de férias (congés) et un subsídio de Natal (Noël). À intégrer dans le coût annuel.",
      },
      {
        label: "Salaire minimum",
        value: "~870 €/mois",
        note: "Salário mínimo nacional 2026, sur 14 mois. Plancher légal de référence pour un temps plein ; les salaires réels du marché sont souvent supérieurs.",
      },
      {
        label: "Coût total employeur",
        value: "Brut × 14 + TSU",
        note: "Coût annuel ≈ (salaire brut mensuel × 14) majoré de la TSU à 23,75 %, hors frais annexes (assurance accidents du travail, médecine du travail, équipement).",
      },
    ],
    costNote:
      "Chiffres datés 2026, à confirmer avec le partenaire recrutement et votre Contabilista Certificado selon la convention collective applicable. Ils donnent un ordre de grandeur, pas un devis.",
    simulatorTeaser:
      "Notre simulateur du coût réel d'un salarié au Portugal (2026) est disponible : entrez un salaire brut, obtenez le coût total employeur annuel, avec la ventilation détaillée et les sources.",
    simulatorCta: "Ouvrir le simulateur de coût",

    howEyebrow: "Comment je procède",
    howTitle: "Comment je vous mets en relation",
    howSubtitle:
      "Mon rôle est de qualifier votre besoin et de vous connecter au bon partenaire, puis de coordonner pour que tout s'enchaîne. Vous gardez un seul interlocuteur de confiance.",
    howSteps: [
      {
        title: "On cadre votre besoin",
        description:
          "Lors du premier échange gratuit, on précise le poste, le profil recherché, le budget et le calendrier. C'est la base d'une mise en relation utile, pas un simple renvoi de contact.",
      },
      {
        title: "Je vous présente le partenaire",
        description:
          "Je vous mets en relation avec la société de recrutement portugaise spécialisée, dirigée par une Française. Vous échangez en français, avec une interlocutrice qui connaît le marché et le droit du travail local.",
      },
      {
        title: "Le partenaire pilote le recrutement",
        description:
          "La recherche, la présélection et les entretiens sont menés par le partenaire. Vous décidez ; il sécurise le cadre légal du contrat de travail et l'inscription à la Segurança Social.",
      },
      {
        title: "Je coordonne avec votre structure",
        description:
          "J'assure le lien avec la création de société, le compte bancaire et la comptabilité (Contabilista Certificado partenaire) pour que l'embauche s'intègre proprement à votre implantation.",
      },
    ],

    scopeEyebrow: "Qui fait quoi",
    scopeTitle: "Mise en relation, pas cabinet de recrutement",
    scopeBody:
      "Soyons clairs sur les rôles. Je suis consultante en création et implantation d'entreprise : je coordonne et je vous oriente. Le recrutement lui-même est exécuté par un partenaire spécialisé. Cette honnêteté vous protège : chacun fait ce qu'il maîtrise.",
    scopeDoLabel: "Ce que je fais",
    scopeDo: [
      "Qualifier votre besoin en recrutement",
      "Vous mettre en relation avec le partenaire spécialisé",
      "Coordonner avec votre société et votre comptabilité",
      "Rester votre interlocuteur de confiance",
    ],
    scopePartnerLabel: "Ce que le partenaire fait",
    scopePartner: [
      "Recherche et sélection des candidats",
      "Conseil sur la convention collective et le contrat",
      "Cadre légal de l'embauche et Segurança Social",
      "Accompagnement RH local francophone",
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Recruter au Portugal : vos questions",
    faqItems: [
      {
        q: "Combien coûte vraiment un salarié au Portugal ?",
        a: "Au coût du salaire brut s'ajoutent la TSU employeur de 23,75 % (cotisation patronale à la Segurança Social) et le fait que la rémunération se verse sur 14 mois (12 mensualités + subsídio de férias + subsídio de Natal). Un repère : coût annuel ≈ (brut mensuel × 14) majoré de 23,75 %, hors assurances et frais annexes. Le salaire minimum 2026 est d'environ 870 € par mois sur 14 mois.",
      },
      {
        q: "Pourquoi recruter au Portugal plutôt qu'ailleurs ?",
        a: "Le Portugal combine des talents multilingues (portugais, anglais, français, espagnol), un marché tech dynamique et des coûts salariaux inférieurs à ceux de la France ou de l'Allemagne à compétences comparables, le tout dans le cadre de l'Union européenne. C'est un bon équilibre entre qualité de profil et coût total.",
      },
      {
        q: "Faites-vous le recrutement vous-même ?",
        a: "Non. Business Portugal n'est pas un cabinet de recrutement. Je vous mets en relation avec une société portugaise spécialisée, dirigée par une Française, qui pilote la recherche, la sélection et le cadre légal de l'embauche. Je qualifie votre besoin et je coordonne avec votre société et votre comptabilité.",
      },
      {
        q: "Le partenaire gère-t-il le contrat de travail et la Segurança Social ?",
        a: "Oui. Le partenaire vous conseille sur la convention collective applicable, rédige le contrat de travail dans les règles portugaises et sécurise l'inscription du salarié à la Segurança Social. La paie est ensuite suivie par votre Contabilista Certificado partenaire.",
      },
      {
        q: "Faut-il avoir déjà créé sa société pour embaucher ?",
        a: "Pour employer un salarié au Portugal, il faut une structure qui porte l'emploi (société immatriculée, NIPC, inscription employeur à la Segurança Social). Si votre société n'est pas encore créée, je coordonne les deux chantiers, création et préparation au recrutement, pour qu'ils s'enchaînent proprement.",
      },
    ],

    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Les chiffres (TSU 23,75 %, 14 mois, salaire minimum ~870 €) sont datés 2026 et à confirmer avec le partenaire recrutement et un Contabilista Certificado selon la convention collective applicable. Pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Un besoin de recrutement au Portugal ?",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre besoin. Je vous mets ensuite en relation avec le bon partenaire et je coordonne avec votre implantation.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Recrutement",
    serviceName: "Mise en relation recrutement au Portugal",
  },
  en: {
    metaTitle: "Hiring in Portugal, recruitment introductions",
    metaDesc:
      "Hiring in Portugal: multilingual talent, the real cost of an employee (employer's TSU 23.75%, 14 months of salary, minimum ~€870). I connect you with a specialist recruitment firm. First conversation free, no commitment.",
    eyebrow: "Partner network",
    title: "Hiring in Portugal,",
    titleAccent: "with the right partner by your side",
    lead: "Portugal offers a pool of multilingual talent at controlled costs, but hiring involves precise local rules (contract, Segurança Social, 14 months of pay). I am not a recruitment agency: I connect you with a specialist Portuguese firm, run by a French manager, that handles the search and the hiring for you.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the real cost of an employee",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    partnerLabel: "The recruitment partner",
    partnerItems: [
      "Specialist Portuguese firm",
      "Run by a French manager",
      "Candidate search and selection",
      "Knowledge of local labour law",
      "French-speaking interface throughout",
    ],

    whyEyebrow: "Why Portugal",
    whyTitle: "A talent pool, at a controlled cost",
    whyBody:
      "Portugal attracts for real reasons: a trained, multilingual workforce, lower payroll costs than France or Germany, and a strong concentration of tech, support and customer-relations profiles. It's a genuine advantage for building a local team, provided you hire by the book.",
    whyItems: [
      {
        title: "Multilingual talent",
        description:
          "Portuguese, English, French and Spanish are widely spoken. Lisbon and Porto concentrate international profiles, especially in tech, support and customer-service roles.",
      },
      {
        title: "More competitive costs",
        description:
          "Pay levels remain below those of many Western European countries for comparable skills. The profile-quality to total-cost ratio is one of the Portuguese market's strongest arguments.",
      },
      {
        title: "A dynamic tech market",
        description:
          "An active start-up ecosystem, recognised engineering schools and hubs of major groups: hiring a developer, a data profile or a support agent is more accessible here than elsewhere in Europe.",
      },
      {
        title: "A European framework",
        description:
          "Hiring in Portugal means staying within the European Union: freedom of establishment, single currency, familiar social-protection standards. No regulatory grey zone.",
      },
    ],

    costEyebrow: "The real cost",
    costTitle: "What an employee really costs",
    costSubtitle:
      "Gross salary is only part of the equation. In Portugal, the employer pays social contributions and pay is spread over 14 months. Here are the figures to calculate a realistic total cost.",
    costLines: [
      {
        label: "Employer's TSU",
        value: "23.75%",
        note: "Taxa Social Única, the employer's contribution to Segurança Social, calculated on gross salary (the employee contributes a further 11%).",
      },
      {
        label: "Number of months",
        value: "14 months",
        note: "Annual pay is spread over 14 months: 12 monthly payments + a subsídio de férias (holiday) and a subsídio de Natal (Christmas). To be built into the annual cost.",
      },
      {
        label: "Minimum wage",
        value: "~€870/month",
        note: "Salário mínimo nacional 2026, over 14 months. The legal floor for a full-time role; real market salaries are often higher.",
      },
      {
        label: "Total employer cost",
        value: "Gross × 14 + TSU",
        note: "Annual cost ≈ (monthly gross × 14) increased by the 23.75% TSU, excluding extras (work-accident insurance, occupational medicine, equipment).",
      },
    ],
    costNote:
      "Figures dated 2026, to be confirmed with the recruitment partner and your Contabilista Certificado depending on the applicable collective agreement. They give an order of magnitude, not a quote.",
    simulatorTeaser:
      "Our simulator of the real cost of an employee in Portugal (2026) is available: enter a gross salary, get the annual total employer cost, with the detailed breakdown and sources.",
    simulatorCta: "Open the cost simulator",

    howEyebrow: "How I work",
    howTitle: "How I connect you",
    howSubtitle:
      "My role is to qualify your need and connect you with the right partner, then coordinate so everything flows. You keep a single, trusted point of contact.",
    howSteps: [
      {
        title: "We frame your need",
        description:
          "During the free first conversation, we define the role, the profile sought, the budget and the timeline. That's the basis for a useful introduction, not just a handed-over contact.",
      },
      {
        title: "I introduce the partner",
        description:
          "I connect you with the specialist Portuguese recruitment firm, run by a French manager. You speak in French, with someone who knows the market and local labour law.",
      },
      {
        title: "The partner runs the recruitment",
        description:
          "The search, shortlisting and interviews are run by the partner. You decide; they secure the legal framework of the employment contract and the Segurança Social registration.",
      },
      {
        title: "I coordinate with your structure",
        description:
          "I keep the link with company formation, the bank account and accounting (partner Contabilista Certificado) so the hire fits cleanly into your setup.",
      },
    ],

    scopeEyebrow: "Who does what",
    scopeTitle: "Introductions, not a recruitment agency",
    scopeBody:
      "Let's be clear on the roles. I am a company-formation and setup consultant: I coordinate and guide you. The recruitment itself is carried out by a specialist partner. This honesty protects you: each does what they master.",
    scopeDoLabel: "What I do",
    scopeDo: [
      "Qualify your recruitment need",
      "Connect you with the specialist partner",
      "Coordinate with your company and accounting",
      "Stay your trusted point of contact",
    ],
    scopePartnerLabel: "What the partner does",
    scopePartner: [
      "Candidate search and selection",
      "Advice on the collective agreement and contract",
      "Legal framework of the hire and Segurança Social",
      "Local French-speaking HR support",
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "Hiring in Portugal: your questions",
    faqItems: [
      {
        q: "What does an employee really cost in Portugal?",
        a: "On top of the gross salary come the employer's TSU of 23.75% (employer contribution to Segurança Social) and the fact that pay is spread over 14 months (12 monthly payments + subsídio de férias + subsídio de Natal). A guide: annual cost ≈ (monthly gross × 14) increased by 23.75%, excluding insurance and extras. The 2026 minimum wage is around €870 per month over 14 months.",
      },
      {
        q: "Why hire in Portugal rather than elsewhere?",
        a: "Portugal combines multilingual talent (Portuguese, English, French, Spanish), a dynamic tech market and payroll costs below those of France or Germany for comparable skills, all within the European Union. It's a good balance between profile quality and total cost.",
      },
      {
        q: "Do you handle the recruitment yourself?",
        a: "No. Business Portugal is not a recruitment agency. I connect you with a specialist Portuguese firm, run by a French manager, that handles the search, selection and legal framework of the hire. I qualify your need and coordinate with your company and accounting.",
      },
      {
        q: "Does the partner handle the employment contract and Segurança Social?",
        a: "Yes. The partner advises you on the applicable collective agreement, drafts the employment contract under Portuguese rules and secures the employee's registration with Segurança Social. Payroll is then handled by your partner Contabilista Certificado.",
      },
      {
        q: "Do you need to have set up your company already to hire?",
        a: "To employ someone in Portugal, you need a structure to carry the employment (a registered company, NIPC, employer registration with Segurança Social). If your company isn't set up yet, I coordinate both workstreams, formation and hiring preparation, so they flow cleanly.",
      },
    ],

    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. The figures (TSU 23.75%, 14 months, minimum wage ~€870) are dated 2026 and to be confirmed with the recruitment partner and a Contabilista Certificado depending on the applicable collective agreement. For an analysis of your project, book a meeting.",

    ctaTitle: "A hiring need in Portugal?",
    ctaBody:
      "A free first conversation, with no commitment, to frame your need. I then connect you with the right partner and coordinate with your setup.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Recruitment",
    serviceName: "Recruitment introductions in Portugal",
  },
};

const pick = (l: string): Copy => (l === "en" ? COPY.en : COPY.fr);

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
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      type: "website",
      url: urlFor(locale, PATH),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.serviceName,
    serviceType: c.serviceName,
    description: c.metaDesc,
    url: urlFor(locale, PATH),
    areaServed: { "@type": "Country", name: "Portugal" },
    provider: { "@id": BUSINESS_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: c.breadcrumbHome,
        item: urlFor(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbServices,
        item: urlFor(locale, "/services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.breadcrumbCurrent,
        item: urlFor(locale, PATH),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique sérialisé côté serveur
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="site-frame grid items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <Reveal>
              <p className="eyebrow">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[3.6rem]">
                <span className="block">{c.title}</span>
                <span className="block italic text-accent">{c.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {c.lead}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#cout"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-9 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {c.trust}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <aside className="border border-border bg-card">
              <div className="rule-brass" />
              <div className="p-8">
                <p className="eyebrow">{c.partnerLabel}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.partnerItems.map((it, i) => (
                    <div key={it} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem]">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Pourquoi recruter au Portugal */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.whyEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.whyTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.whyBody}</p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.whyItems.map((it, i) => (
                  <Reveal key={it.title} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{it.title}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{it.description}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Le coût réel d'un salarié */}
      <section id="cout" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.costEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.costTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.costSubtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.costLines.map((line, i) => (
              <Reveal key={line.label} delay={i * 70} className="bg-card">
                <div className="h-full p-7">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {line.label}
                  </p>
                  <p className="mt-3 font-serif text-3xl text-accent sm:text-4xl">{line.value}</p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{line.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {c.costNote}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Link
              href="/outils/simulateur-cout-salarie"
              className="group mt-10 flex items-start gap-4 border border-border bg-card p-7 transition-colors hover:border-accent"
            >
              <span
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                aria-hidden
              />
              <span className="max-w-3xl">
                <span className="block leading-relaxed text-muted-foreground">
                  {c.simulatorTeaser}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                  {c.simulatorCta}
                  <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Comment je vous mets en relation */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.howEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{c.howTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.howSubtitle}
                </p>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.howSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-8">
                    <span className="index-num text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl">{s.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qui fait quoi, mise en relation, pas cabinet */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.scopeEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.scopeTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.scopeBody}</p>
              </Reveal>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              <Reveal className="bg-card">
                <div className="h-full p-7">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.scopeDoLabel}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {c.scopeDo.map((d) => (
                      <li key={d} className="flex items-baseline gap-3 text-[1.02rem]">
                        <span
                          className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                          aria-hidden
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={80} className="bg-card">
                <div className="h-full p-7">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.scopePartnerLabel}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {c.scopePartner.map((d) => (
                      <li key={d} className="flex items-baseline gap-3 text-[1.02rem]">
                        <span
                          className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                          aria-hidden
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.faqEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.faqTitle}</h2>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.faqItems.map((f, i) => (
                  <Reveal key={f.q} delay={i * 60}>
                    <div className="border-b border-border py-6">
                      <dt className="font-serif text-lg">{f.q}</dt>
                      <dd className="mt-2.5 leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={80}>
                <p className="mt-10 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.disclaimer}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-5xl border border-border bg-primary px-8 py-20 text-center text-primary-foreground lg:px-16 lg:py-24">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              {c.ctaBody}
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
