import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FOUNDER_ID, languagesFor, ORGANIZATION_ID, SITE_URL, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/comparatifs/statuts-lda-eni-unipessoal";
const CREATION_PATH = "/creation-societe";
const FAQ_PATH = "/faq";
const FREELANCE_PATH = "/profils/freelance-it";

type Props = { params: Promise<{ locale: string }> };

type StatusTable = { head: string[]; rows: string[][] };
type Answer = { q: string; a: string };
type Caveat = { wrong: string; right: string };
type Faq = { q: string; a: string };
type Link3 = { label: string; href: string };

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

  quickEyebrow: string;
  quickTitle: string;
  quickSubtitle: string;
  answers: Answer[];

  tableEyebrow: string;
  tableTitle: string;
  tableSubtitle: string;
  statusTable: StatusTable;
  tableNote: string;

  motEyebrow: string;
  motTitle: string;
  motBody: string;
  caveats: Caveat[];

  linksEyebrow: string;
  linksTitle: string;
  links: Link3[];

  faqEyebrow: string;
  faqTitle: string;
  faq: Faq[];

  disclaimerLabel: string;
  disclaimer: string;

  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  breadcrumbHome: string;
  breadcrumbComparatifs: string;
  breadcrumbCurrent: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "ENI, Trabalhador Independente, Unipessoal Lda, Lda : quel statut au Portugal ?",
    metaDesc:
      "Comparatif clair des statuts pour créer ou s'installer au Portugal : ENI, Trabalhador Independente, Unipessoal Lda, Lda. Responsabilité, capital, comptabilité, régime fiscal et quand choisir chacun, en terminologie portugaise exacte.",
    eyebrow: "Comparatif · Statuts juridiques",
    title: "ENI, Trabalhador Independente, Unipessoal Lda, Lda :",
    titleAccent: "quel statut pour créer au Portugal ?",
    lead: "Quatre statuts reviennent sans cesse quand on veut entreprendre au Portugal, et la confusion vient surtout des réflexes français. Voici un comparatif honnête, en terminologie portugaise exacte, pour comprendre la responsabilité, le capital, la comptabilité et le régime fiscal de chacun. L'objectif n'est pas de remplacer un échange sur votre cas, mais de vous faire arriver préparé·e.",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Voir le tableau comparatif",
    trust: "75+ entrepreneurs accompagnés depuis 2025 · Lisbonne, Portugal",

    quickEyebrow: "Réponses directes",
    quickTitle: "L'essentiel en quelques phrases",
    quickSubtitle:
      "Des repères clairs avant le tableau détaillé. Ce sont des principes généraux 2026 : le choix adapté dépend de votre activité, de vos revenus et de votre exposition au risque.",
    answers: [
      {
        q: "ENI ou société : la vraie question ?",
        a: "La ligne de partage n'est pas le chiffre d'affaires, c'est la responsabilité. En ENI (Empresário em Nome Individual), votre patrimoine personnel est engagé sans limite. Une Unipessoal Lda crée une personne morale distincte qui protège ce patrimoine. Dès qu'il y a un vrai risque (dettes, clients importants, investissement), la société se justifie.",
      },
      {
        q: "Indépendant solo à faible volume ?",
        a: "Le statut de Trabalhador Independente (recibos verdes) ou l'ENI permettent de démarrer vite, avec des obligations allégées et le régime simplifié de l'IRS catégorie B si le chiffre d'affaires reste sous 200 000 €. C'est souple, mais sans séparation du patrimoine.",
      },
      {
        q: "Société à un seul associé ?",
        a: "C'est l'Unipessoal Lda : responsabilité limitée, un associé unique, capital social de 1 €/associé (on recommande souvent ~1 000 € pour la crédibilité bancaire). Un Contabilista Certificado inscrit à l'OCC est alors obligatoire.",
      },
      {
        q: "À plusieurs ?",
        a: "C'est la Lda (Sociedade por Quotas) : même logique que l'Unipessoal Lda mais à partir de 2 associés, capital de 1 €/associé. La gouvernance et la répartition des parts se décident dès le départ.",
      },
    ],

    tableEyebrow: "Le tableau comparatif",
    tableTitle: "ENI, Trabalhador Independente, Unipessoal Lda, Lda",
    tableSubtitle:
      "Une lecture critère par critère, en terminologie portugaise. Les statuts sont en colonnes, les critères en lignes. Aucun équivalent français : on raisonne avec les notions portugaises réelles.",
    statusTable: {
      head: [
        "Statut",
        "Responsabilité",
        "Associés",
        "Capital",
        "Comptabilité",
        "Régime fiscal",
        "Quand le choisir",
      ],
      rows: [
        [
          "ENI (Empresário em Nome Individual)",
          "Illimitée, patrimoine personnel engagé",
          "1 personne",
          "Pas de capital social",
          "Obligations comptables allégées",
          "IRS catégorie B",
          "Démarrage solo à faible volume, risque limité",
        ],
        [
          "Trabalhador Independente (recibos verdes)",
          "Sur le patrimoine personnel",
          "1 personne (prestataire indépendant)",
          "Pas de capital social",
          "Régime simplifié IRS si CA < 200 000 €",
          "IRS catégorie B (coefficient ~0,75 sur les services)",
          "Freelances et prestataires de services",
        ],
        [
          "Unipessoal Lda",
          "Limitée, la société protège le patrimoine",
          "Associé unique",
          "1 €/associé (recommandé ~1 000 € pour la crédibilité)",
          "Contabilista Certificado obligatoire",
          "IRC 19 % (15 % PME sur les premiers 50 000 €)",
          "Protéger son patrimoine, structurer une vraie activité",
        ],
        [
          "Lda (Sociedade por Quotas)",
          "Limitée, la société protège le patrimoine",
          "≥ 2 associés",
          "1 €/associé",
          "Contabilista Certificado obligatoire",
          "IRC 19 % (15 % PME sur les premiers 50 000 €)",
          "Projet à plusieurs associés",
        ],
      ],
    },
    tableNote:
      "Chiffres à jour en 2026, susceptibles d'évoluer à chaque Loi de Finances (Orçamento do Estado). Le régime simplifié, les coefficients de l'IRS catégorie B et l'éligibilité au taux PME de l'IRC dépendent de votre situation : c'est le Contabilista Certificado partenaire qui chiffre votre cas.",

    motEyebrow: "Le bon mot",
    motTitle: "Ne raisonnez pas avec les sigles français",
    motBody:
      "La plus grosse source d'erreur, c'est de traduire mentalement les statuts portugais en équivalents français. Ils ne se superposent pas : le capital, la responsabilité et la fiscalité diffèrent. Utilisez les notions portugaises réelles, pas les raccourcis.",
    caveats: [
      {
        wrong: "« L'Unipessoal Lda, c'est l'EURL portugaise »",
        right:
          "Non. L'Unipessoal Lda a son propre régime (capital de 1 €/associé, IRC, Contabilista Certificado obligatoire). On ne raisonne pas en EURL, on raisonne en Unipessoal Lda.",
      },
      {
        wrong: "« La Lda, c'est la SARL portugaise »",
        right:
          "Non. La Lda (Sociedade por Quotas) suit le droit portugais : capital de 1 €/associé, IRC, parts (quotas), pas les règles d'une SARL française.",
      },
      {
        wrong: "« Le freelance, c'est l'auto-entrepreneur portugais »",
        right:
          "Non. On parle de Trabalhador Independente avec recibos verdes et IRS catégorie B, pas d'« auto-entrepreneur ». Le régime simplifié et ses coefficients sont propres au Portugal.",
      },
    ],

    linksEyebrow: "Pour aller plus loin",
    linksTitle: "Les pages liées à votre choix de statut",
    links: [
      { label: "Création de société (Unipessoal Lda, Lda)", href: CREATION_PATH },
      { label: "Profil freelance / IT au Portugal", href: FREELANCE_PATH },
      { label: "Toutes les questions fréquentes", href: FAQ_PATH },
    ],

    faqEyebrow: "Questions fréquentes",
    faqTitle: "Ce qu'on me demande sur le choix du statut",
    faq: [
      {
        q: "Quel est l'équivalent de la SARL au Portugal ?",
        a: "Il n'y a pas d'« équivalent » strict, et c'est justement le piège. La forme la plus proche d'une société à responsabilité limitée à plusieurs associés est la Lda (Sociedade por Quotas) ; avec un associé unique, c'est l'Unipessoal Lda. Mais leur régime est portugais : capital de 1 €/associé, IRC, parts appelées quotas. Mieux vaut raisonner avec ces notions plutôt qu'avec le sigle « SARL ».",
      },
      {
        q: "Quel est le capital minimum d'une Unipessoal Lda ?",
        a: "Le capital social minimum est de 1 € par associé, donc 1 € pour une Unipessoal Lda (associé unique). Dans la pratique, on recommande souvent un montant plus crédible, de l'ordre de 1 000 €, notamment pour faciliter l'ouverture du compte bancaire professionnel et la confiance des partenaires. Ce n'est pas 5 000 €, contrairement à une idée reçue.",
      },
      {
        q: "ENI ou société : que choisir ?",
        a: "La question clé est la responsabilité. En ENI (Empresário em Nome Individual), votre patrimoine personnel est engagé sans limite ; les obligations comptables sont allégées et vous relevez de l'IRS catégorie B. Une Unipessoal Lda protège votre patrimoine mais impose un Contabilista Certificado et relève de l'IRC. L'ENI convient à un démarrage solo à faible volume ; la société se justifie dès qu'il y a un vrai risque ou une volonté de structurer.",
      },
      {
        q: "Quelle différence entre une Lda et une Unipessoal Lda ?",
        a: "C'est avant tout le nombre d'associés. L'Unipessoal Lda a un associé unique ; la Lda (Sociedade por Quotas) en compte au moins deux. Pour le reste, la logique est la même : responsabilité limitée, capital de 1 €/associé, Contabilista Certificado obligatoire et imposition à l'IRC (19 %, avec 15 % pour les PME sur les premiers 50 000 €).",
      },
      {
        q: "Le statut de Trabalhador Independente, c'est pour qui ?",
        a: "Pour les prestataires et freelances qui facturent en recibos verdes. On relève de l'IRS catégorie B, avec le régime simplifié tant que le chiffre d'affaires reste sous 200 000 € (un coefficient d'environ 0,75 s'applique sur les revenus de services). C'est souple et rapide à mettre en place, mais sans séparation entre patrimoine professionnel et personnel.",
      },
    ],

    disclaimerLabel: "Avertissement",
    disclaimer:
      "Cette page a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. Audrey Marques est consultante en création et implantation d'entreprise, ni avocate, ni comptable, ni fiscaliste : elle crée la société, accompagne l'ouverture du compte bancaire et vous met en relation avec un Contabilista Certificado inscrit à l'OCC et, au besoin, un fiscaliste partenaire. Les chiffres cités sont à jour en 2026 et susceptibles d'évoluer. Le choix d'un statut dépend de votre situation individuelle ; pour une analyse de votre projet, prenez rendez-vous.",

    ctaTitle: "Parlons du bon statut pour votre projet",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre activité, votre exposition au risque et le statut adapté. On regarde votre situation, on évite les réflexes français, on avance ensemble vers la bonne structure.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Mise en relation · Lisbonne, Portugal",

    breadcrumbHome: "Accueil",
    breadcrumbComparatifs: "Comparatifs",
    breadcrumbCurrent: "Statuts juridiques",
  },
  en: {
    metaTitle: "ENI, Trabalhador Independente, Unipessoal Lda, Lda: which status in Portugal?",
    metaDesc:
      "Clear comparison of the legal statuses for starting or settling in Portugal: ENI, Trabalhador Independente, Unipessoal Lda, Lda. Liability, capital, accounting, tax regime and when to choose each, in accurate Portuguese terminology.",
    eyebrow: "Comparison · Legal statuses",
    title: "ENI, Trabalhador Independente, Unipessoal Lda, Lda:",
    titleAccent: "which status in Portugal?",
    lead: "Four statuses keep coming up when you want to do business in Portugal, and the confusion mostly comes from French reflexes. Here is an honest comparison, in accurate Portuguese terminology, to understand the liability, capital, accounting and tax regime of each. The goal is not to replace a discussion about your case, but to help you arrive prepared.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See the comparison table",
    trust: "75+ entrepreneurs supported since 2025 · Lisbon, Portugal",

    quickEyebrow: "Direct answers",
    quickTitle: "The essentials in a few sentences",
    quickSubtitle:
      "Clear markers before the detailed table. These are general 2026 principles: the right choice depends on your activity, your income and your exposure to risk.",
    answers: [
      {
        q: "ENI or a company: the real question?",
        a: "The dividing line is not turnover, it is liability. As an ENI (Empresário em Nome Individual), your personal assets are engaged without limit. An Unipessoal Lda creates a separate legal person that protects those assets. As soon as there is real risk (debts, major clients, investment), the company makes sense.",
      },
      {
        q: "Solo independent, low volume?",
        a: "The Trabalhador Independente status (recibos verdes) or the ENI let you start quickly, with lighter obligations and the simplified IRS Category B regime as long as turnover stays below €200,000. It is flexible, but with no separation of assets.",
      },
      {
        q: "A single-shareholder company?",
        a: "That is the Unipessoal Lda: limited liability, a sole shareholder, share capital of €1/shareholder (around €1,000 is often recommended for banking credibility). A Contabilista Certificado registered with the OCC is then mandatory.",
      },
      {
        q: "Several partners?",
        a: "That is the Lda (Sociedade por Quotas): same logic as the Unipessoal Lda but from 2 shareholders, capital of €1/shareholder. Governance and the split of shares are decided from the start.",
      },
    ],

    tableEyebrow: "The comparison table",
    tableTitle: "ENI, Trabalhador Independente, Unipessoal Lda, Lda",
    tableSubtitle:
      "A criterion-by-criterion reading, in Portuguese terminology. Statuses are in columns, criteria in rows. No French equivalent: we reason with the actual Portuguese notions.",
    statusTable: {
      head: [
        "Status",
        "Liability",
        "Shareholders",
        "Capital",
        "Accounting",
        "Tax regime",
        "When to choose it",
      ],
      rows: [
        [
          "ENI (Empresário em Nome Individual)",
          "Unlimited, personal assets engaged",
          "1 person",
          "No share capital",
          "Lighter accounting obligations",
          "IRS Category B",
          "Solo start, low volume, limited risk",
        ],
        [
          "Trabalhador Independente (recibos verdes)",
          "On personal assets",
          "1 person (independent provider)",
          "No share capital",
          "Simplified IRS regime if turnover < €200,000",
          "IRS Category B (coefficient ~0.75 on services)",
          "Freelancers and service providers",
        ],
        [
          "Unipessoal Lda",
          "Limited, the company protects your assets",
          "Sole shareholder",
          "€1/shareholder (~€1,000 recommended for credibility)",
          "Contabilista Certificado mandatory",
          "IRC 19% (15% for SMEs on the first €50,000)",
          "Protect your assets, structure a real activity",
        ],
        [
          "Lda (Sociedade por Quotas)",
          "Limited, the company protects your assets",
          "≥ 2 shareholders",
          "€1/shareholder",
          "Contabilista Certificado mandatory",
          "IRC 19% (15% for SMEs on the first €50,000)",
          "Project with several partners",
        ],
      ],
    },
    tableNote:
      "Figures current as of 2026, subject to change with each Finance Act (Orçamento do Estado). The simplified regime, the IRS Category B coefficients and eligibility for the reduced SME IRC rate depend on your situation: it is the partner Contabilista Certificado who quantifies your case.",

    motEyebrow: "The right wording",
    motTitle: "Don't reason with French acronyms",
    motBody:
      "The biggest source of error is mentally translating Portuguese statuses into French equivalents. They do not overlap: capital, liability and taxation differ. Use the real Portuguese notions, not the shortcuts.",
    caveats: [
      {
        wrong: "“An Unipessoal Lda is the Portuguese EURL”",
        right:
          "No. The Unipessoal Lda has its own regime (capital of €1/shareholder, IRC, a mandatory Contabilista Certificado). You don't reason as an EURL, you reason as an Unipessoal Lda.",
      },
      {
        wrong: "“An Lda is the Portuguese SARL”",
        right:
          "No. The Lda (Sociedade por Quotas) follows Portuguese law: capital of €1/shareholder, IRC, shares (quotas), not the rules of a French SARL.",
      },
      {
        wrong: "“A freelancer is the Portuguese auto-entrepreneur”",
        right:
          "No. We speak of a Trabalhador Independente with recibos verdes and IRS Category B, not an “auto-entrepreneur”. The simplified regime and its coefficients are specific to Portugal.",
      },
    ],

    linksEyebrow: "Going further",
    linksTitle: "Pages related to your choice of status",
    links: [
      { label: "Company formation (Unipessoal Lda, Lda)", href: CREATION_PATH },
      { label: "Freelance / IT profile in Portugal", href: FREELANCE_PATH },
      { label: "All frequently asked questions", href: FAQ_PATH },
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "What people ask me about choosing a status",
    faq: [
      {
        q: "What is the equivalent of the French SARL in Portugal?",
        a: "There is no strict “equivalent”, and that is exactly the trap. The closest form to a limited-liability company with several shareholders is the Lda (Sociedade por Quotas); with a sole shareholder, it is the Unipessoal Lda. But their regime is Portuguese: capital of €1/shareholder, IRC, shares called quotas. It is better to reason with these notions than with the “SARL” acronym.",
      },
      {
        q: "What is the minimum capital of an Unipessoal Lda?",
        a: "The minimum share capital is €1 per shareholder, so €1 for an Unipessoal Lda (sole shareholder). In practice, a more credible amount, around €1,000, is often recommended, in particular to ease opening the business bank account and build partner trust. It is not €5,000, contrary to a common belief.",
      },
      {
        q: "ENI or a company: which to choose?",
        a: "The key question is liability. As an ENI (Empresário em Nome Individual), your personal assets are engaged without limit; accounting obligations are lighter and you fall under IRS Category B. An Unipessoal Lda protects your assets but requires a Contabilista Certificado and falls under IRC. The ENI suits a solo start at low volume; a company makes sense as soon as there is real risk or a desire to structure.",
      },
      {
        q: "What is the difference between an Lda and an Unipessoal Lda?",
        a: "It is mainly the number of shareholders. The Unipessoal Lda has a sole shareholder; the Lda (Sociedade por Quotas) has at least two. Otherwise the logic is the same: limited liability, capital of €1/shareholder, a mandatory Contabilista Certificado and IRC taxation (19%, with 15% for SMEs on the first €50,000).",
      },
      {
        q: "Who is the Trabalhador Independente status for?",
        a: "For service providers and freelancers who invoice via recibos verdes. You fall under IRS Category B, with the simplified regime as long as turnover stays below €200,000 (a coefficient of around 0.75 applies to service income). It is flexible and quick to set up, but with no separation between business and personal assets.",
      },
    ],

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This page is for information only and does not constitute personalised legal, accounting or tax advice. Audrey Marques is a consultant in company formation and setup, not a lawyer, accountant or tax adviser: she sets up the company, supports opening the bank account and connects you with a Contabilista Certificado registered with the OCC and, where needed, a partner tax adviser. The figures quoted are current as of 2026 and subject to change. The choice of a status depends on your individual situation; for an analysis of your project, book a meeting.",

    ctaTitle: "Let's talk about the right status for your project",
    ctaBody:
      "A first free conversation, with no commitment, to frame your activity, your exposure to risk and the right status. We look at your situation, avoid French reflexes, and move forward together toward the right structure.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Introduction · Lisbon, Portugal",

    breadcrumbHome: "Home",
    breadcrumbComparatifs: "Comparisons",
    breadcrumbCurrent: "Legal statuses",
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

function StatusTable({ table }: { table: StatusTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[64rem] border-collapse text-left text-[0.92rem]">
        <thead>
          <tr>
            {table.head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-foreground/20 py-3 pr-5 align-bottom font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]} className="align-top">
              {row.map((cell, ci) => (
                <td
                  key={cell}
                  className={cn(
                    "border-b border-border py-4 pr-5 leading-relaxed last:pr-0",
                    ci === 0 ? "font-serif text-[1rem] text-foreground" : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function StatutsComparatifPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.metaTitle,
    description: c.metaDesc,
    inLanguage: locale,
    url: urlFor(locale, PATH),
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: urlFor(locale, PATH),
    about: ["ENI", "Trabalhador Independente", "Unipessoal Lda", "Lda"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faq.map((item) => ({
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
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbComparatifs,
        item: `${SITE_URL}/${locale}/comparatifs`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              <h1 className="mt-6 font-serif text-[2.3rem] leading-[1.08] sm:text-[2.9rem] lg:text-[3.3rem]">
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
                  href="#tableau"
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
                <p className="eyebrow">{c.quickEyebrow}</p>
                <div className="mt-6 divide-y divide-border">
                  {c.answers.map((a, i) => (
                    <div key={a.q} className="flex items-baseline gap-4 py-3">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem] leading-relaxed">{a.q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Réponses directes */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.quickEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.quickTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {c.quickSubtitle}
                </p>
              </Reveal>
            </div>
            <div>
              <dl className="border-t border-border">
                {c.answers.map((a, i) => (
                  <Reveal key={a.q} delay={i * 60}>
                    <div className="grid gap-2 border-b border-border py-6 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
                      <dt className="font-serif text-lg">{a.q}</dt>
                      <dd className="leading-relaxed text-muted-foreground">{a.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section id="tableau" className="scroll-mt-24 border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{c.tableEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.tableTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {c.tableSubtitle}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10">
              <StatusTable table={c.statusTable} />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-3xl border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
              {c.tableNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Le bon mot */}
      <section className="border-t border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.motEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.motTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.motBody}</p>
              </Reveal>
            </div>
            <div className="grid gap-px border border-border bg-border">
              {c.caveats.map((cav, i) => (
                <Reveal key={cav.wrong} delay={i * 60}>
                  <div className="bg-card p-7">
                    <p className="font-serif text-lg leading-snug text-muted-foreground line-through decoration-accent/60 decoration-1">
                      {cav.wrong}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      <p className="leading-relaxed text-foreground">{cav.right}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pages liées (maillage) */}
      <section className="border-t border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.linksEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.linksTitle}
                </h2>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.links.map((l, i) => (
                <Reveal key={l.href} delay={i * 60}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-6 border-b border-border py-6"
                  >
                    <span className="font-serif text-lg">{l.label}</span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </Reveal>
              ))}
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
                {c.faq.map((f, i) => (
                  <Reveal key={f.q} delay={i * 50}>
                    <div className="border-b border-border py-6">
                      <dt className="font-serif text-lg">{f.q}</dt>
                      <dd className="mt-2.5 leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer YMYL */}
      <section className="border-t border-border">
        <div className="site-frame py-16 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
              {c.disclaimerLabel}
            </p>
            <p className="mt-4 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
              {c.disclaimer}
            </p>
          </Reveal>
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
