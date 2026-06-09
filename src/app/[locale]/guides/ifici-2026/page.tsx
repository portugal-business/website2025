import { ArrowRight, CalendarClock } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FOUNDER_ID, LINKEDIN_URL, languagesFor, ORGANIZATION_ID, urlFor } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATH = "/guides/ifici-2026";

// Article millésimé 2026, à réviser à chaque Loi de Finances (Orçamento do Estado).
const DATE_PUBLISHED = "2026-06-09";
const DATE_MODIFIED = "2026-06-09";

type Props = { params: Promise<{ locale: string }> };

type Chunk = { q: string; a: string[] };
type Profile = { title: string; description: string };
type Faq = { q: string; a: string };
type Source = { label: string; href?: string };
type Aid = { profile: string; body: string };

type Copy = {
  metaTitle: string;
  metaDesc: string;

  breadcrumbHome: string;
  breadcrumbGuides: string;
  breadcrumbCurrent: string;

  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  updatedLabel: string;
  updatedDate: string;
  vintageBadge: string;
  ctaPrimary: string;
  ctaSecondary: string;
  toolCta: string;

  // À retenir
  trEyebrow: string;
  trTitle: string;
  trItems: string[];
  trLegal: string;

  // Chunks (chaque H2 = question + réponse directe)
  chunks: Chunk[];

  // Éligibles
  eligEyebrow: string;
  eligTitle: string;
  eligBaseLabel: string;
  eligBase: string;
  eligProfilesLabel: string;
  eligProfiles: Profile[];
  eligBlock: string;
  eligAdvantageLabel: string;
  eligAdvantage: string;

  // Exclus
  exclEyebrow: string;
  exclTitle: string;
  exclIntro: string;
  exclItems: string[];

  // Retraités
  retEyebrow: string;
  retTitle: string;
  retLead: string;
  retChunks: Chunk[];

  // Aide Business Portugal
  aidEyebrow: string;
  aidTitle: string;
  aidBody: string;
  aids: Aid[];
  aidClose: string;

  // FAQ
  faqEyebrow: string;
  faqTitle: string;
  faqs: Faq[];

  // Sources
  sourcesEyebrow: string;
  sourcesTitle: string;
  sources: Source[];
  sourcesLegal: string;

  // Disclaimer
  disclaimerLabel: string;
  disclaimer: string;

  // Auteur
  authorEyebrow: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorLink: string;

  headline: string;

  // CTA final
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaReassurance: string;

  inLanguage: string;
};

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    metaTitle: "IFICI 2026 (ex-RNH) : qui est éligible, pas les retraités",
    metaDesc:
      "IFICI Portugal 2026, l'ex-RNH : qui est vraiment éligible, pourquoi les retraités sont exclus, la fiscalité réelle des pensions et la deadline du 15 janvier. Sources officielles.",

    breadcrumbHome: "Accueil",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "IFICI 2026 : qui est éligible",

    eyebrow: "Guide pilier · Fiscalité",
    title: "IFICI 2026 (ex-RNH) : qui est vraiment éligible",
    titleAccent: "et pourquoi les retraités ne le sont plus",
    lead: "L'ancien régime des résidents non habituels (RNH) n'existe plus pour les nouveaux arrivants. Depuis le 1er janvier 2024, il a été remplacé par un dispositif beaucoup plus étroit : l'IFICI. Beaucoup de contenus en ligne continuent de promettre des avantages qui ont disparu, en particulier pour les retraités. Cette page dit ce qui est vrai en 2026, sources officielles à l'appui.",
    updatedLabel: "Mis à jour le",
    updatedDate: "9 juin 2026",
    vintageBadge: "Millésimé 2026 · à réviser à chaque Loi de Finances",
    ctaPrimary: "Réserver un diagnostic gratuit",
    ctaSecondary: "Aller à la FAQ",
    toolCta: "Faire le test d'éligibilité",

    trEyebrow: "À retenir en 30 secondes",
    trTitle: "L'IFICI en bref",
    trItems: [
      "L'IFICI (Incentivo Fiscal à Investigação Científica e Inovação) est réservé aux profils actifs hautement qualifiés : chercheurs, professions qualifiées dans des entreprises exportatrices, emplois en startups certifiées, R&D.",
      "Il accorde un taux d'IRS de 20 % sur les revenus de l'activité éligible (catégories A et B), pendant 10 ans non renouvelables.",
      "Il a remplacé l'ancien RNH le 1er janvier 2024. Les retraités en sont exclus : il n'existe plus aucun avantage fiscal sur les pensions étrangères.",
      "La demande se dépose avant le 15 janvier de l'année suivant votre installation fiscale au Portugal.",
    ],
    trLegal:
      "Base légale : art. 58-A du Código dos Benefícios Fiscais (CBF) · Portaria n.º 352/2024/1 du 23/12/2024. Données 2026.",

    chunks: [
      {
        q: "Qu'est-ce que l'IFICI, et en quoi diffère-t-il de l'ancien RNH ?",
        a: [
          "L'IFICI est un régime fiscal portugais qui accorde un taux d'IRS forfaitaire de 20 % sur les revenus tirés d'une activité professionnelle éligible (catégorie A, salaires ; catégorie B, indépendants), assorti d'une exonération de la plupart des revenus de source étrangère actifs, pour une durée de 10 ans non renouvelables. Il a été créé par l'article 58-A du Código dos Benefícios Fiscais, introduit par la Loi de Finances 2024 (Lei n.º 82/2023 du 29/12/2023) et précisé par la Portaria n.º 352/2024/1 du 23/12/2024.",
          "La différence avec l'ancien RNH est radicale. Le RNH s'adressait largement aux personnes qui transféraient leur résidence au Portugal, y compris les retraités (pension étrangère taxée à 10 %, voire exonérée avant 2020). L'IFICI, lui, est ciblé sur l'innovation et l'activité à haute valeur : il ne couvre que des profils précis exerçant une activité professionnelle éligible. Son périmètre est beaucoup plus étroit, et les revenus passifs comme les pensions en sont écartés.",
        ],
      },
      {
        q: "« RNH 2.0 » : pourquoi ce nom est trompeur",
        a: [
          "« RNH 2.0 » est un surnom marketing, pas le nom légal du régime. Le nom officiel est IFICI, défini à l'article 58-A du CBF.",
          "Ce surnom entretient une confusion dangereuse : il laisse croire que l'IFICI est une simple mise à jour du RNH, avec les mêmes bénéficiaires. C'est faux. Le périmètre a changé en profondeur, et certains profils qui étaient au cœur du RNH, au premier rang desquels les retraités, n'ont plus aucun avantage sous l'IFICI. Quand un site vous présente le « RNH 2.0 » comme accessible aux retraités, il s'appuie sur une information périmée.",
        ],
      },
    ],

    eligEyebrow: "Profils éligibles",
    eligTitle: "Qui est vraiment éligible à l'IFICI en 2026 ?",
    eligBaseLabel: "La condition de base, commune à tous les profils",
    eligBase:
      "Quel que soit votre profil, deux conditions socles s'appliquent : ne pas avoir été résident fiscal au Portugal au cours des 5 années précédentes, et devenir résident fiscal portugais l'année de la demande. Ce sont les mêmes conditions de non-résidence préalable que sous l'ancien RNH. Si vous avez déjà bénéficié du RNH ou de l'IFICI par le passé, vous ne pouvez pas en bénéficier de nouveau.",
    eligProfilesLabel: "Les sept catégories de profils éligibles",
    eligProfiles: [
      {
        title: "Enseignants du supérieur et chercheurs scientifiques",
        description:
          "Y compris les emplois dans les entités du système scientifique et technologique national.",
      },
      {
        title: "Emplois qualifiés et membres d'organes sociaux",
        description:
          "Dans des entités bénéficiant d'avantages contractuels à l'investissement productif (RFAI / Código Fiscal do Investimento).",
      },
      {
        title: "Professions hautement qualifiées (Anexo I)",
        description:
          "Directeurs, ingénieurs et professions assimilées, spécialistes des TIC et de l'informatique, médecins… exercées dans une entreprise à CAE éligible réalisant au moins 50 % de son chiffre d'affaires à l'export sur l'exercice d'entrée en fonction ou l'un des deux précédents.",
      },
      {
        title: "Emplois qualifiés en activités d'intérêt national",
        description:
          "Dans des entreprises menant des activités reconnues d'intérêt national par l'AICEP ou l'IAPMEI (notamment l'attraction d'investissement).",
      },
      {
        title: "Recherche et développement (SIFIDE II)",
        description: "Activités de R&D dont les coûts sont éligibles au SIFIDE II.",
      },
      {
        title: "Startups certifiées",
        description:
          "Emplois et membres d'organes sociaux de startups certifiées au sens de la Lei das Startups (n.º 21/2023).",
      },
      {
        title: "Açores et Madère",
        description:
          "Résidents fiscaux des Régions Autonomes des Açores et de Madère, selon le régime régional spécifique.",
      },
    ],
    eligBlock:
      "Point de blocage fréquent à connaître : dans la plupart des cas, l'entité employeuse ou le projet doit avoir été reconnu et inscrit sur la liste annuelle publiée par l'autorité compétente (AT, FCT, AICEP, IAPMEI, Startup Portugal selon le cas). Sans cette reconnaissance préalable, l'éligibilité tombe, d'où l'importance d'anticiper.",
    eligAdvantageLabel: "L'avantage fiscal concret (et ses limites)",
    eligAdvantage:
      "Pour un profil éligible, l'IFICI applique un taux d'IRS de 20 % sur les revenus des catégories A et B issus de l'activité éligible uniquement, pas sur l'ensemble de vos revenus. S'y ajoute une exonération de la plupart des revenus de source étrangère actifs. L'avantage court sur 10 années consécutives, non renouvelables et non prorogeables, à condition de rester résident fiscal portugais sur toute la période. Le piège classique consiste à annoncer « 20 % sur tous vos revenus » : c'est inexact. Les revenus hors activité éligible suivent les règles de droit commun.",

    exclEyebrow: "Profils exclus",
    exclTitle: "Qui est exclu de l'IFICI ?",
    exclIntro: "Sont notamment exclus du régime :",
    exclItems: [
      "Les retraités et pensionnés, sur leurs pensions de retraite étrangères, exclusion totale. C'est le changement majeur par rapport à l'ancien RNH.",
      "Les investisseurs passifs et rentiers, dont les revenus sont purement patrimoniaux, sans activité professionnelle éligible.",
      "La plupart des nomades digitaux, freelances et e-commerçants classiques, dès lors que leur profession ne figure pas à l'Anexo I, ou que leur entreprise/client n'a pas de CAE éligible et ne réalise pas 50 % d'export.",
      "Les salariés et indépendants en professions non listées ou dans des secteurs non éligibles.",
      "Toute personne ayant déjà bénéficié du RNH ou de l'IFICI, ou ayant été résidente fiscale au Portugal au cours des 5 dernières années.",
      "Les profils dont l'entité employeuse ou le projet n'a pas été reconnu sur la liste annuelle de l'autorité compétente.",
    ],

    retEyebrow: "Le cas des retraités",
    retTitle: "Non, l'IFICI ne vous concerne pas",
    retLead:
      "C'est la question qui revient le plus souvent, et la réponse honnête déçoit : si vous êtes retraité et que vous vous installez au Portugal en 2026, l'IFICI ne vous apporte aucun avantage sur votre pension. Mieux vaut le savoir avant de prendre votre décision que de le découvrir sur votre première feuille d'impôt.",
    retChunks: [
      {
        q: "Ce qui a changé : l'avantage de 10 % sur les pensions a disparu",
        a: [
          "Sous l'ancien RNH, une pension de retraite étrangère du secteur privé était taxée au Portugal à un taux forfaitaire de 10 % (et même exonérée avant 2020). Cet avantage n'existe plus. L'IFICI ne couvre que les revenus d'une activité professionnelle éligible (catégories A et B) : il ne s'applique jamais aux pensions, qui relèvent de la catégorie H. Un retraité qui s'installe au Portugal aujourd'hui voit donc sa pension imposée selon le droit commun, sans régime de faveur.",
        ],
      },
      {
        q: "Comment votre pension privée est imposée au Portugal en 2026",
        a: [
          "Selon la convention fiscale France-Portugal du 14 janvier 1971, une pension du secteur privé est imposable uniquement au Portugal, votre pays de résidence. Elle est alors soumise au barème progressif de l'IRS, catégorie H, dont les tranches 2026 vont d'environ 13 % à 48 %, avec une surtaxe de solidarité pouvant aller jusqu'à 5 % sur les très hauts revenus. Une déduction spécifique « pension » s'applique (de l'ordre de 4 100 à 4 500 € par an et par titulaire, plafonnée selon l'IAS). Ces fourchettes dépendent de la Loi de Finances annuelle et sont données à titre indicatif pour 2026, à confirmer pour votre situation.",
          "Conséquence à dire franchement : pour un retraité du privé, le Portugal a perdu son avantage fiscal différenciant. Selon le montant de votre pension, l'imposition portugaise peut même être supérieure à l'imposition française. La seule manière de trancher est une comparaison chiffrée, au cas par cas, avant de vous installer.",
        ],
      },
      {
        q: "Pension publique de fonctionnaire : elle reste imposée en France",
        a: [
          "Si votre pension provient d'un emploi public, fonctionnaires, militaires, magistrats, agents titulaires des hôpitaux ou des collectivités, la règle est différente. En application de l'article 19 de la convention de 1971, ces pensions restent imposables en France, et non au Portugal. C'est une distinction décisive : confondre pension privée et pension publique fausse entièrement le calcul de votre fiscalité future.",
        ],
      },
      {
        q: "Que faire à la place quand on est retraité",
        a: [
          "L'absence d'avantage IFICI ne signifie pas que le projet portugais n'a plus de sens, mais il doit reposer sur une analyse réelle, pas sur une promesse obsolète. Avant de décider : faites simuler votre fiscalité au Portugal (barème catégorie H, déduction pension) et comparez-la à votre situation française actuelle, montant en main ; distinguez vos sources de pension (privée vs publique), car elles ne sont pas imposées dans le même pays ; intégrez les autres dimensions du projet (coût de la vie, santé, immobilier, succession).",
          "Business Portugal ne réalise pas cette simulation elle-même : nous vous orientons vers le fiscaliste partenaire compétent, qui produit le comparatif chiffré avant que vous ne preniez votre décision.",
        ],
      },
      {
        q: "Nomades digitaux et freelances : pourquoi vous n'êtes souvent pas éligibles",
        a: [
          "C'est une autre source de malentendu. Le fait d'être qualifié, indépendant et installé au Portugal ne suffit pas à ouvrir droit à l'IFICI. Le régime exige une combinaison stricte : une profession listée à l'Anexo I, exercée dans une entreprise à CAE éligible réalisant au moins 50 % de son chiffre d'affaires à l'export, et le plus souvent une reconnaissance préalable de l'entité ou du projet.",
          "Dans la pratique, un freelance en marketing, un coach, un consultant généraliste ou un e-commerçant classique n'est généralement pas éligible : soit sa profession ne figure pas dans la liste, soit son entreprise ou son client ne remplit pas la condition de CAE éligible et d'export. Les développeurs, ingénieurs et spécialistes TIC peuvent l'être, mais uniquement si le cadre de l'entreprise est lui aussi conforme. L'éligibilité se joue donc autant sur la structure que sur le métier, ce qui rend le choix de la société et de son CAE déterminant.",
        ],
      },
      {
        q: "La deadline du 15 janvier : un délai à ne pas rater",
        a: [
          "La demande d'IFICI doit être déposée au plus tard le 15 janvier de l'année qui suit celle où vous êtes devenu résident fiscal au Portugal. Si vous devenez résident en 2026, vous avez jusqu'au 15 janvier 2027 ; résident en 2025, c'était le 15 janvier 2026. La demande s'effectue via le Portal das Finanças, selon la procédure fixée par la Portaria 352/2024.",
          "Ce délai est impératif et sec : une demande tardive ne produit effet qu'à compter de l'année de dépôt, ce qui vous fait perdre une ou plusieurs des 10 années d'avantage. À cela s'ajoute un point souvent négligé : la reconnaissance de l'entité employeuse ou du projet par l'autorité compétente doit être anticipée bien en amont du 15 janvier, car l'entité doit figurer sur la liste annuelle publiée par l'AT. Une demande IFICI ne se prépare pas la veille de l'échéance.",
        ],
      },
      {
        q: "Vous étiez déjà au RNH avant 2024 ? Vous gardez votre régime",
        a: [
          "Si vous êtes déjà inscrit au RNH avant le 31 décembre 2023, vous conservez l'ancien régime et ses avantages, y compris les 10 % sur les pensions étrangères, jusqu'à la fin de vos 10 ans (au plus tard vers 2033 selon votre date d'inscription). C'est ce qu'on appelle les direitos adquiridos (droits acquis, ou grandfathering).",
          "Autrement dit, « le RNH est fini » est vrai pour les nouveaux arrivants, mais faux pour les bénéficiaires déjà en place. Si vous êtes dans ce cas, votre situation n'est pas affectée par l'IFICI.",
        ],
      },
    ],

    aidEyebrow: "Comment Business Portugal vous aide",
    aidTitle: "Le bon expert, jamais un avantage que vous n'aurez pas",
    aidBody:
      "Business Portugal est votre point de contact francophone unique pour créer et implanter votre entreprise au Portugal. Audrey Marques est consultante en création et implantation d'entreprise, ni fiscaliste, ni comptable, ni avocate. Sur un sujet aussi sensible que l'IFICI, cela se traduit par une règle simple : nous ne faisons jamais votre montage fiscal nous-mêmes, et nous ne vous vendons pas un avantage que vous n'aurez pas.",
    aids: [
      {
        profile: "Vous êtes un profil potentiellement éligible",
        body: "Entrepreneur tech, profession qualifiée, projet startup : nous créons et structurons votre société (Unipessoal Lda ou Lda) en tenant compte des contraintes IFICI, choix du CAE, logique d'export, calendrier compatible avec le délai du 15 janvier, et nous vous mettons en relation avec le fiscaliste partenaire qui valide l'éligibilité, gère la reconnaissance de l'entité et dépose la demande au Portal das Finanças.",
      },
      {
        profile: "Vous êtes retraité",
        body: "Nous vous disons franchement que l'IFICI ne vous concerne pas, et nous vous orientons vers le bon fiscaliste pour une simulation chiffrée et une comparaison France-Portugal avant toute décision.",
      },
    ],
    aidClose:
      "Notre valeur n'est pas de remplacer l'expert, mais de vous éviter de jongler seul, dans une langue étrangère, avec dix interlocuteurs, et de vous mettre en relation avec les bons.",

    faqEyebrow: "Questions fréquentes",
    faqTitle: "FAQ IFICI 2026",
    faqs: [
      {
        q: "L'IFICI, c'est la même chose que le RNH ?",
        a: "Non. L'IFICI (art. 58-A du CBF) a remplacé le RNH le 1er janvier 2024 pour les nouveaux arrivants. « RNH 2.0 » n'est qu'un surnom : le périmètre du régime est beaucoup plus étroit et cible des profils actifs qualifiés, pas l'ensemble des nouveaux résidents.",
      },
      {
        q: "Un retraité peut-il bénéficier de l'IFICI en 2026 ?",
        a: "Non. L'IFICI ne couvre que les revenus d'une activité professionnelle éligible (catégories A et B). Les pensions de retraite (catégorie H) en sont totalement exclues. L'ancien taux de 10 % sur les pensions étrangères a disparu.",
      },
      {
        q: "Comment ma pension de retraite est-elle imposée au Portugal ?",
        a: "Une pension du secteur privé est imposable au Portugal, au barème progressif IRS catégorie H (environ 13 % à 48 % en 2026, plus une éventuelle surtaxe), après une déduction spécifique pension. Une pension publique de fonctionnaire reste, elle, imposable en France (art. 19 de la convention de 1971).",
      },
      {
        q: "Quel est l'avantage fiscal de l'IFICI ?",
        a: "Un taux d'IRS de 20 % sur les revenus de l'activité éligible (salaires ou indépendant), plus une exonération de la plupart des revenus de source étrangère actifs, pendant 10 ans non renouvelables. Le 20 % ne s'applique qu'à l'activité éligible, pas à l'ensemble de vos revenus.",
      },
      {
        q: "Suis-je éligible en tant que freelance ou nomade digital ?",
        a: "Le plus souvent non. Il faut une profession listée à l'Anexo I, exercée dans une entreprise à CAE éligible réalisant au moins 50 % d'export, et généralement une reconnaissance préalable de l'entité. Un freelance généraliste ou un e-commerçant classique n'y a généralement pas droit.",
      },
      {
        q: "Quelle est la date limite pour demander l'IFICI ?",
        a: "Le 15 janvier de l'année suivant celle où vous devenez résident fiscal portugais. Résident en 2026 → demande avant le 15 janvier 2027. Le délai est impératif : déposer en retard fait perdre des années d'avantage.",
      },
      {
        q: "J'étais déjà au RNH avant 2024, est-ce que je perds mes droits ?",
        a: "Non. Les bénéficiaires inscrits au RNH avant le 31 décembre 2023 conservent l'ancien régime (dont les 10 % sur pensions) jusqu'à la fin de leurs 10 ans. Vous n'êtes pas concerné par le passage à l'IFICI.",
      },
      {
        q: "Business Portugal s'occupe-t-il de ma demande IFICI ?",
        a: "Nous structurons votre société pour un profil éligible et nous vous mettons en relation avec le fiscaliste partenaire qui gère l'éligibilité, la reconnaissance de l'entité et le dépôt de la demande. Nous ne réalisons pas le montage fiscal nous-mêmes.",
      },
    ],

    sourcesEyebrow: "Vérifiabilité",
    sourcesTitle: "Sources officielles",
    sources: [
      {
        label: "FAQ Portal das Finanças (Autoridade Tributária), IFICI",
        href: "https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/questoes_frequentes/pages/faqs-01018.aspx",
      },
      {
        label: "Portaria n.º 352/2024/1, Diário da República",
        href: "https://diariodarepublica.pt/dr/detalhe/portaria/352-2024-901014291",
      },
      {
        label: "Texte officiel (PDF) de la Portaria 352/2024",
        href: "https://files.diariodarepublica.pt/1s/2024/12/24800/0004000045.pdf",
      },
      {
        label: "IAPMEI, IFICI",
        href: "https://www.iapmei.pt/PRODUTOS-E-SERVICOS/Incentivos-Financiamento/Beneficios-fiscais-(1)/IFICI-Incentivo-Fiscal-a-Investigacao-Cientifica.aspx",
      },
      {
        label: "Portugal Global (AICEP), IFICI",
        href: "https://www.portugalglobal.pt/internacionalizacao/incentivos/ifici/",
      },
      {
        label: "Startup Portugal, Legal bites IFICI",
        href: "https://startupportugal.com/pt/legal-bites-03-ifici-incentivo-fiscal-a-investigacao-cientifica-e-a-inovacao/",
      },
      {
        label: "Guia Prático IFICI, Ordem dos Contabilistas Certificados (03/2025)",
        href: "https://www.occ.pt/sites/default/files/public/2025-03/Guia_Pratico_IFICI.pdf",
      },
      {
        label: "EY, Fim do RNH e introdução do IFICI",
        href: "https://www.ey.com/pt_pt/technical/tax-alerts/fim-do-rnh-e-introducao-do-ifici",
      },
      {
        label: "PwC Portugal, IFICI",
        href: "https://www.pwc.pt/pt/servicos/fiscalidade/individuals-taxation/incentivo-fiscal-investigacao-cientifica-inovacao-rnh.html",
      },
      {
        label:
          "Convention fiscale France-Portugal du 14 janvier 1971 (résidence, pensions, art. 19), impots.gouv.fr / Légifrance",
      },
    ],
    sourcesLegal:
      "Base légale citée : article 58-A du Código dos Benefícios Fiscais (CBF), créé par la Lei n.º 82/2023 du 29/12/2023 ; Portaria n.º 352/2024/1 du 23/12/2024 ; convention fiscale France-Portugal du 14/01/1971.",

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "Cet article a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. La fiscalité dépend de votre situation individuelle et de la convention fiscale France-Portugal du 14 janvier 1971. Audrey Marques est consultante en création et implantation d'entreprise au Portugal, et non fiscaliste : pour une analyse de votre cas, nous vous orientons vers un professionnel compétent. Informations à jour au 9 juin 2026, susceptibles d'évoluer à chaque Loi de Finances (Orçamento do Estado). Page millésimée 2026, à réviser à chaque Loi de Finances.",

    authorEyebrow: "L'auteure",
    authorName: "Audrey Marques",
    authorRole: "Consultante en création et implantation d'entreprise au Portugal",
    authorBio:
      "Fondatrice de Business Portugal. Plus de quatre ans au Portugal, environ 75 clients accompagnés depuis janvier 2025. Point de contact francophone unique pour créer votre société, débloquer la banque et vous connecter aux bons experts.",
    authorLink: "Voir le profil LinkedIn",

    ctaTitle: "Faites le point sur votre éligibilité",
    ctaBody:
      "Un premier échange gratuit et sans engagement pour cadrer votre projet et, le cas échéant, structurer votre société en vue de l'IFICI. On regarde votre profil, on identifie les bons interlocuteurs, on avance.",
    ctaButton: "Réserver un diagnostic gratuit",
    ctaReassurance: "Sans engagement · Réponse rapide · Lisbonne, Portugal",

    headline:
      "IFICI 2026 (ex-RNH) : qui est vraiment éligible, et pourquoi les retraités ne le sont plus",

    inLanguage: "fr-FR",
  },
  en: {
    metaTitle: "IFICI 2026 (ex-NHR): who qualifies, not retirees",
    metaDesc:
      "IFICI Portugal 2026, the former NHR: who actually qualifies, why retirees are excluded, the real taxation of pensions, and the 15 January deadline. Official sources.",

    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "IFICI 2026: who qualifies",

    eyebrow: "Pillar guide · Taxation",
    title: "IFICI 2026 (ex-NHR): who actually qualifies",
    titleAccent: "and why retirees no longer do",
    lead: "The old Non-Habitual Resident (NHR) regime no longer exists for new arrivals. Since 1 January 2024, it has been replaced by a much narrower scheme: the IFICI. Much of the content online still promises benefits that have disappeared, especially for retirees. This page sets out what is true in 2026, backed by official sources.",
    updatedLabel: "Updated on",
    updatedDate: "9 June 2026",
    vintageBadge: "2026 edition · to be revised with each Budget Act",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "Go to the FAQ",
    toolCta: "Take the eligibility test",

    trEyebrow: "The 30-second takeaway",
    trTitle: "IFICI in brief",
    trItems: [
      "IFICI (Incentivo Fiscal à Investigação Científica e Inovação) is reserved for highly qualified active profiles: researchers, qualified roles in exporting companies, jobs in certified startups, R&D.",
      "It grants a 20% IRS rate on income from the eligible activity (categories A and B), for 10 non-renewable years.",
      "It replaced the old NHR on 1 January 2024. Retirees are excluded: there is no longer any tax benefit on foreign pensions.",
      "The application must be filed before 15 January of the year following your tax move to Portugal.",
    ],
    trLegal:
      "Legal basis: art. 58-A of the Código dos Benefícios Fiscais (CBF) · Portaria no. 352/2024/1 of 23/12/2024. 2026 data.",

    chunks: [
      {
        q: "What is the IFICI, and how does it differ from the old NHR?",
        a: [
          "IFICI is a Portuguese tax regime that grants a flat 20% IRS rate on income from an eligible professional activity (category A, salaries; category B, self-employed), together with an exemption for most active foreign-source income, for 10 non-renewable years. It was created by article 58-A of the Código dos Benefícios Fiscais, introduced by the 2024 Budget Act (Lei no. 82/2023 of 29/12/2023) and specified by Portaria no. 352/2024/1 of 23/12/2024.",
          "The difference from the old NHR is radical. The NHR broadly targeted people transferring their residence to Portugal, including retirees (foreign pension taxed at 10%, or even exempt before 2020). The IFICI is focused on innovation and high-value activity: it only covers specific profiles carrying out an eligible professional activity. Its scope is far narrower, and passive income such as pensions is left out.",
        ],
      },
      {
        q: "“NHR 2.0”: why that name is misleading",
        a: [
          "“NHR 2.0” is a marketing nickname, not the legal name of the regime. The official name is IFICI, defined in article 58-A of the CBF.",
          "This nickname fuels a dangerous confusion: it suggests the IFICI is a simple update of the NHR with the same beneficiaries. That is false. The scope has changed profoundly, and some profiles that were at the heart of the NHR, retirees first and foremost, no longer have any benefit under the IFICI. When a website presents “NHR 2.0” as open to retirees, it relies on outdated information.",
        ],
      },
    ],

    eligEyebrow: "Eligible profiles",
    eligTitle: "Who actually qualifies for the IFICI in 2026?",
    eligBaseLabel: "The baseline condition, common to all profiles",
    eligBase:
      "Whatever your profile, two core conditions apply: not having been a Portuguese tax resident in the previous 5 years, and becoming a Portuguese tax resident in the year of the application. These are the same prior non-residence conditions as under the old NHR. If you have already benefited from the NHR or the IFICI in the past, you cannot benefit again.",
    eligProfilesLabel: "The seven eligible profile categories",
    eligProfiles: [
      {
        title: "Higher-education teachers and scientific researchers",
        description:
          "Including roles within entities of the national scientific and technological system.",
      },
      {
        title: "Qualified roles and members of corporate bodies",
        description:
          "In entities benefiting from contractual incentives for productive investment (RFAI / Código Fiscal do Investimento).",
      },
      {
        title: "Highly qualified professions (Anexo I)",
        description:
          "Directors, engineers and related professions, ICT and computing specialists, doctors… carried out in a company with an eligible CAE that derives at least 50% of its turnover from exports in the year of taking up the role or one of the two preceding years.",
      },
      {
        title: "Qualified roles in activities of national interest",
        description:
          "In companies carrying out activities recognised as of national interest by AICEP or IAPMEI (notably attracting investment).",
      },
      {
        title: "Research and development (SIFIDE II)",
        description: "R&D activities whose costs are eligible under SIFIDE II.",
      },
      {
        title: "Certified startups",
        description:
          "Jobs and members of corporate bodies of startups certified under the Lei das Startups (no. 21/2023).",
      },
      {
        title: "Azores and Madeira",
        description:
          "Tax residents of the Autonomous Regions of the Azores and Madeira, under the specific regional regime.",
      },
    ],
    eligBlock:
      "A frequent stumbling block to know about: in most cases, the employing entity or the project must have been recognised and listed on the annual list published by the competent authority (AT, FCT, AICEP, IAPMEI, Startup Portugal depending on the case). Without this prior recognition, eligibility falls away, hence the importance of planning ahead.",
    eligAdvantageLabel: "The concrete tax benefit (and its limits)",
    eligAdvantage:
      "For an eligible profile, the IFICI applies a 20% IRS rate on category A and B income from the eligible activity only, not on all of your income. To this is added an exemption for most active foreign-source income. The benefit runs over 10 consecutive years, non-renewable and non-extendable, provided you remain a Portuguese tax resident throughout. The classic trap is to advertise “20% on all your income”: that is inaccurate. Income outside the eligible activity follows ordinary rules.",

    exclEyebrow: "Excluded profiles",
    exclTitle: "Who is excluded from the IFICI?",
    exclIntro: "Excluded from the regime are notably:",
    exclItems: [
      "Retirees and pensioners, on their foreign retirement pensions, full exclusion. This is the major change from the old NHR.",
      "Passive investors and rentiers, whose income is purely from assets, with no eligible professional activity.",
      "Most digital nomads, freelancers and classic e-commerce sellers, where their profession is not listed in Anexo I, or their company/client does not have an eligible CAE and does not achieve 50% exports.",
      "Employees and self-employed people in unlisted professions or in non-eligible sectors.",
      "Anyone who has already benefited from the NHR or the IFICI, or who has been a Portuguese tax resident in the last 5 years.",
      "Profiles whose employing entity or project has not been recognised on the competent authority's annual list.",
    ],

    retEyebrow: "The case of retirees",
    retTitle: "No, the IFICI does not concern you",
    retLead:
      "This is the question that comes up most often, and the honest answer is disappointing: if you are retired and move to Portugal in 2026, the IFICI brings you no benefit on your pension. Better to know it before making your decision than to discover it on your first tax return.",
    retChunks: [
      {
        q: "What changed: the 10% benefit on pensions has disappeared",
        a: [
          "Under the old NHR, a foreign private-sector retirement pension was taxed in Portugal at a flat 10% rate (and even exempt before 2020). That benefit no longer exists. The IFICI only covers income from an eligible professional activity (categories A and B): it never applies to pensions, which fall under category H. A retiree moving to Portugal today therefore has their pension taxed under ordinary rules, with no preferential regime.",
        ],
      },
      {
        q: "How your private pension is taxed in Portugal in 2026",
        a: [
          "Under the France-Portugal tax treaty of 14 January 1971, a private-sector pension is taxable only in Portugal, your country of residence. It is then subject to the progressive IRS scale, category H, whose 2026 brackets run from about 13% to 48%, with a solidarity surcharge of up to 5% on very high income. A specific “pension” deduction applies (in the order of €4,100 to €4,500 per year and per holder, capped according to the IAS). These ranges depend on the annual Budget Act and are given as an indication for 2026, to be confirmed for your situation.",
          "A consequence worth stating plainly: for a private-sector retiree, Portugal has lost its distinguishing tax advantage. Depending on the amount of your pension, Portuguese taxation may even be higher than French taxation. The only way to decide is a figures-based comparison, case by case, before you move.",
        ],
      },
      {
        q: "Public civil-service pension: it remains taxed in France",
        a: [
          "If your pension comes from public employment, civil servants, military, magistrates, tenured hospital or local-authority staff, the rule is different. Under article 19 of the 1971 treaty, these pensions remain taxable in France, not in Portugal. This is a decisive distinction: confusing a private pension with a public one entirely distorts the calculation of your future taxation.",
        ],
      },
      {
        q: "What to do instead when you are retired",
        a: [
          "The absence of an IFICI benefit does not mean the Portuguese project no longer makes sense, but it must rest on a real analysis, not an obsolete promise. Before deciding: have your Portuguese taxation simulated (category H scale, pension deduction) and compare it with your current French situation, net amount in hand; distinguish your pension sources (private vs public), as they are not taxed in the same country; factor in the other dimensions of the project (cost of living, healthcare, real estate, inheritance).",
          "Business Portugal does not carry out this simulation itself: we connect you with the competent partner tax adviser, who produces the figures-based comparison before you make your decision.",
        ],
      },
      {
        q: "Digital nomads and freelancers: why you are often not eligible",
        a: [
          "This is another source of misunderstanding. Being qualified, self-employed and settled in Portugal is not enough to qualify for the IFICI. The regime requires a strict combination: a profession listed in Anexo I, carried out in a company with an eligible CAE that derives at least 50% of its turnover from exports, and most often a prior recognition of the entity or the project.",
          "In practice, a marketing freelancer, a coach, a generalist consultant or a classic e-commerce seller is generally not eligible: either their profession is not on the list, or their company or client does not meet the eligible-CAE and export conditions. Developers, engineers and ICT specialists can qualify, but only if the company framework is also compliant. Eligibility therefore hinges as much on the structure as on the occupation, which makes the choice of company and its CAE decisive.",
        ],
      },
      {
        q: "The 15 January deadline: a window not to miss",
        a: [
          "The IFICI application must be filed no later than 15 January of the year following the one in which you became a Portuguese tax resident. If you become a resident in 2026, you have until 15 January 2027; resident in 2025, it was 15 January 2026. The application is made via the Portal das Finanças, under the procedure set by Portaria 352/2024.",
          "This deadline is strict and hard: a late application only takes effect from the year of filing, which makes you lose one or more of the 10 benefit years. Add to this an often overlooked point: the recognition of the employing entity or the project by the competent authority must be anticipated well ahead of 15 January, as the entity must appear on the annual list published by the AT. An IFICI application is not prepared the day before the deadline.",
        ],
      },
      {
        q: "Were you already under the NHR before 2024? You keep your regime",
        a: [
          "If you were already registered under the NHR before 31 December 2023, you keep the old regime and its benefits, including the 10% on foreign pensions, until the end of your 10 years (at the latest around 2033 depending on your registration date). These are the direitos adquiridos (acquired rights, or grandfathering).",
          "In other words, “the NHR is over” is true for new arrivals, but false for beneficiaries already in place. If this is your case, your situation is not affected by the IFICI.",
        ],
      },
    ],

    aidEyebrow: "How Business Portugal helps you",
    aidTitle: "The right expert, never a benefit you won't have",
    aidBody:
      "Business Portugal is your single French-speaking point of contact to set up and establish your company in Portugal. Audrey Marques is a company-formation and establishment consultant, neither a tax adviser, an accountant, nor a lawyer. On a subject as sensitive as the IFICI, this translates into a simple rule: we never do your tax structuring ourselves, and we do not sell you a benefit you will not have.",
    aids: [
      {
        profile: "You are a potentially eligible profile",
        body: "Tech entrepreneur, qualified profession, startup project: we set up and structure your company (Unipessoal Lda or Lda) taking the IFICI constraints into account, choice of CAE, export logic, a timeline compatible with the 15 January deadline, and we connect you with the partner tax adviser who validates eligibility, handles the recognition of the entity and files the application on the Portal das Finanças.",
      },
      {
        profile: "You are retired",
        body: "We tell you plainly that the IFICI does not concern you, and we direct you to the right tax adviser for a figures-based simulation and a France-Portugal comparison before any decision.",
      },
    ],
    aidClose:
      "Our value is not to replace the expert, but to spare you juggling alone, in a foreign language, with ten contacts, and to connect you with the right ones.",

    faqEyebrow: "Frequently asked",
    faqTitle: "IFICI 2026 FAQ",
    faqs: [
      {
        q: "Is the IFICI the same thing as the NHR?",
        a: "No. The IFICI (art. 58-A of the CBF) replaced the NHR on 1 January 2024 for new arrivals. “NHR 2.0” is only a nickname: the regime's scope is much narrower and targets qualified active profiles, not all new residents.",
      },
      {
        q: "Can a retiree benefit from the IFICI in 2026?",
        a: "No. The IFICI only covers income from an eligible professional activity (categories A and B). Retirement pensions (category H) are fully excluded. The old 10% rate on foreign pensions has disappeared.",
      },
      {
        q: "How is my retirement pension taxed in Portugal?",
        a: "A private-sector pension is taxable in Portugal, on the progressive IRS scale category H (about 13% to 48% in 2026, plus a possible surcharge), after a specific pension deduction. A public civil-service pension, however, remains taxable in France (art. 19 of the 1971 treaty).",
      },
      {
        q: "What is the IFICI tax benefit?",
        a: "A 20% IRS rate on income from the eligible activity (salaried or self-employed), plus an exemption for most active foreign-source income, for 10 non-renewable years. The 20% applies only to the eligible activity, not to all of your income.",
      },
      {
        q: "Am I eligible as a freelancer or digital nomad?",
        a: "Most often no. You need a profession listed in Anexo I, carried out in a company with an eligible CAE achieving at least 50% exports, and generally a prior recognition of the entity. A generalist freelancer or a classic e-commerce seller is usually not entitled to it.",
      },
      {
        q: "What is the deadline to apply for the IFICI?",
        a: "15 January of the year following the one in which you become a Portuguese tax resident. Resident in 2026 → application before 15 January 2027. The deadline is strict: filing late costs you benefit years.",
      },
      {
        q: "I was already under the NHR before 2024, do I lose my rights?",
        a: "No. Beneficiaries registered under the NHR before 31 December 2023 keep the old regime (including the 10% on pensions) until the end of their 10 years. You are not affected by the move to the IFICI.",
      },
      {
        q: "Does Business Portugal handle my IFICI application?",
        a: "We structure your company for an eligible profile and connect you with the partner tax adviser who handles eligibility, the recognition of the entity and the filing of the application. We do not carry out the tax structuring ourselves.",
      },
    ],

    sourcesEyebrow: "Verifiability",
    sourcesTitle: "Official sources",
    sources: [
      {
        label: "FAQ Portal das Finanças (Autoridade Tributária), IFICI",
        href: "https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/questoes_frequentes/pages/faqs-01018.aspx",
      },
      {
        label: "Portaria no. 352/2024/1, Diário da República",
        href: "https://diariodarepublica.pt/dr/detalhe/portaria/352-2024-901014291",
      },
      {
        label: "Official text (PDF) of Portaria 352/2024",
        href: "https://files.diariodarepublica.pt/1s/2024/12/24800/0004000045.pdf",
      },
      {
        label: "IAPMEI, IFICI",
        href: "https://www.iapmei.pt/PRODUTOS-E-SERVICOS/Incentivos-Financiamento/Beneficios-fiscais-(1)/IFICI-Incentivo-Fiscal-a-Investigacao-Cientifica.aspx",
      },
      {
        label: "Portugal Global (AICEP), IFICI",
        href: "https://www.portugalglobal.pt/internacionalizacao/incentivos/ifici/",
      },
      {
        label: "Startup Portugal, Legal bites IFICI",
        href: "https://startupportugal.com/pt/legal-bites-03-ifici-incentivo-fiscal-a-investigacao-cientifica-e-a-inovacao/",
      },
      {
        label: "Guia Prático IFICI, Ordem dos Contabilistas Certificados (03/2025)",
        href: "https://www.occ.pt/sites/default/files/public/2025-03/Guia_Pratico_IFICI.pdf",
      },
      {
        label: "EY, Fim do RNH e introdução do IFICI",
        href: "https://www.ey.com/pt_pt/technical/tax-alerts/fim-do-rnh-e-introducao-do-ifici",
      },
      {
        label: "PwC Portugal, IFICI",
        href: "https://www.pwc.pt/pt/servicos/fiscalidade/individuals-taxation/incentivo-fiscal-investigacao-cientifica-inovacao-rnh.html",
      },
      {
        label:
          "France-Portugal tax treaty of 14 January 1971 (residence, pensions, art. 19), impots.gouv.fr / Légifrance",
      },
    ],
    sourcesLegal:
      "Legal basis cited: article 58-A of the Código dos Benefícios Fiscais (CBF), created by Lei no. 82/2023 of 29/12/2023; Portaria no. 352/2024/1 of 23/12/2024; France-Portugal tax treaty of 14/01/1971.",

    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This article is for information only and does not constitute personalised legal, accounting or tax advice. Taxation depends on your individual situation and on the France-Portugal tax treaty of 14 January 1971. Audrey Marques is a company-formation and establishment consultant in Portugal, not a tax adviser: for an analysis of your case, we direct you to a competent professional. Information up to date as of 9 June 2026, subject to change with each Budget Act (Orçamento do Estado). Page edition 2026, to be revised with each Budget Act.",

    authorEyebrow: "The author",
    authorName: "Audrey Marques",
    authorRole: "Company-formation and establishment consultant in Portugal",
    authorBio:
      "Founder of Business Portugal. More than four years in Portugal, around 75 clients supported since January 2025. Single French-speaking point of contact to set up your company, unblock the bank and connect you with the right experts.",
    authorLink: "View LinkedIn profile",

    ctaTitle: "Check your eligibility",
    ctaBody:
      "A first free conversation, with no commitment, to frame your project and, where relevant, structure your company with the IFICI in mind. We look at your profile, identify the right contacts, and move forward.",
    ctaButton: "Book a free assessment",
    ctaReassurance: "No commitment · Quick reply · Lisbon, Portugal",

    headline: "IFICI 2026 (ex-NHR): who actually qualifies, and why retirees no longer do",

    inLanguage: "en-GB",
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
      type: "article",
      url: urlFor(locale, PATH),
      publishedTime: DATE_PUBLISHED,
      modifiedTime: DATE_MODIFIED,
    },
  };
}

export default async function IficiGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = pick(locale);
  const canonical = urlFor(locale, PATH);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.headline,
    description: c.metaDesc,
    inLanguage: c.inLanguage,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: canonical,
    url: canonical,
    about: "IFICI Portugal 2026",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: urlFor(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumbGuides,
        item: urlFor(locale, "/guides"),
      },
      { "@type": "ListItem", position: 3, name: c.breadcrumbCurrent, item: canonical },
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
      <section className="relative overflow-hidden border-b border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
                <span className="block">{c.title}</span>
                <span className="block italic text-accent">{c.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarClock className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {c.updatedLabel} {c.updatedDate}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
                  {c.vintageBadge}
                </span>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/outils/test-eligibilite-ifici"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {c.toolCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
                >
                  {c.ctaPrimary}
                </Link>
                <a
                  href="#faq"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* À retenir */}
      <section className="border-b border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.trEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.trTitle}</h2>
              </Reveal>
            </div>
            <div>
              <div className="border-t border-border">
                {c.trItems.map((it, i) => (
                  <Reveal key={it} delay={i * 60}>
                    <div className="flex items-baseline gap-5 border-b border-border py-4">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.05rem] leading-relaxed">{it}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <p className="mt-8 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.trLegal}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Définition & RNH 2.0 (chunks) */}
      <section className="border-b border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="mx-auto max-w-3xl space-y-16">
            {c.chunks.map((chunk, i) => (
              <Reveal key={chunk.q} delay={i * 60}>
                <article>
                  <h2 className="font-serif text-2xl leading-[1.15] sm:text-3xl">{chunk.q}</h2>
                  <div className="mt-5 space-y-4">
                    {chunk.a.map((p) => (
                      <p key={p} className="text-lg leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Éligibles */}
      <section className="border-b border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.eligEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.eligTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.eligBaseLabel}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{c.eligBase}</p>
              </Reveal>

              <Reveal delay={60}>
                <p className="mt-12 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.eligProfilesLabel}
                </p>
              </Reveal>
              <div className="mt-4 border-t border-border">
                {c.eligProfiles.map((p, i) => (
                  <Reveal key={p.title} delay={i * 50}>
                    <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-border py-5">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg">{p.title}</h3>
                        <p className="mt-1.5 leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={60}>
                <p className="mt-8 border-l-2 border-accent pl-5 text-[0.98rem] leading-relaxed text-muted-foreground">
                  {c.eligBlock}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <p className="mt-12 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                  {c.eligAdvantageLabel}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  {c.eligAdvantage}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Exclus */}
      <section className="border-b border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.exclEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.exclTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.exclIntro}</p>
              </Reveal>
              <ul className="mt-8 space-y-5">
                {c.exclItems.map((it, i) => (
                  <Reveal key={it} delay={i * 50}>
                    <li className="flex items-baseline gap-4 leading-relaxed text-muted-foreground">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      <span className="text-[1.05rem]">{it}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Retraités */}
      <section className="border-b border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{c.retEyebrow}</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.retTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.retLead}</p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl space-y-12 lg:mx-0">
            {c.retChunks.map((chunk, i) => (
              <Reveal key={chunk.q} delay={i * 50}>
                <article className="border-t border-border pt-8">
                  <h3 className="font-serif text-xl leading-[1.2] sm:text-2xl">{chunk.q}</h3>
                  <div className="mt-4 space-y-4">
                    {chunk.a.map((p) => (
                      <p key={p} className="leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comment Business Portugal vous aide */}
      <section className="border-b border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.aidEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.aidTitle}</h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">{c.aidBody}</p>
              </Reveal>
              <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
                {c.aids.map((a, i) => (
                  <Reveal key={a.profile} delay={i * 70} className="bg-card">
                    <div className="h-full p-7">
                      <span className="index-num text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-serif text-xl">{a.profile}</h3>
                      <p className="mt-2.5 leading-relaxed text-muted-foreground">{a.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <p className="mt-8 border-l-2 border-accent pl-5 leading-relaxed text-muted-foreground">
                  {c.aidClose}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-b border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.faqEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">{c.faqTitle}</h2>
              </Reveal>
            </div>
            <div className="border-t border-border">
              {c.faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 40}>
                  <div className="border-b border-border py-7">
                    <h3 className="font-serif text-xl leading-[1.2]">{f.q}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="border-b border-border">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">{c.sourcesEyebrow}</p>
                <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl">
                  {c.sourcesTitle}
                </h2>
              </Reveal>
            </div>
            <div>
              <ul className="border-t border-border">
                {c.sources.map((s, i) => (
                  <Reveal key={s.label} delay={i * 30}>
                    <li className="flex items-baseline gap-4 border-b border-border py-4">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                        aria-hidden
                      />
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-[1.02rem] leading-relaxed text-foreground underline-offset-[5px] hover:text-accent hover:underline"
                        >
                          {s.label}
                        </a>
                      ) : (
                        <span className="text-[1.02rem] leading-relaxed text-muted-foreground">
                          {s.label}
                        </span>
                      )}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={60}>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  {c.sourcesLegal}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer + auteur */}
      <section className="border-b border-border bg-card">
        <div className="site-frame py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow">{c.disclaimerLabel}</p>
                <p className="mt-6 border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
                  {c.disclaimer}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <aside className="border border-border bg-background">
                <div className="rule-brass" />
                <div className="p-8">
                  <p className="eyebrow">{c.authorEyebrow}</p>
                  <h3 className="mt-5 font-serif text-2xl">{c.authorName}</h3>
                  <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    {c.authorRole}
                  </p>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{c.authorBio}</p>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                  >
                    {c.authorLink}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </aside>
            </Reveal>
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
