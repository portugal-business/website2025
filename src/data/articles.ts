/**
 * Données du blog, Business Portugal.
 *
 * Migration des 6 articles historiques, CORRIGÉS pour conformité YMYL/E-E-A-T
 * (cf. docs/SEO-GEO/08-YMYL-EEAT-CONFORMITE.md) AVANT publication :
 *  - Terminologie portugaise exclusive : ENI / Unipessoal Lda / Lda / SA (jamais EI/EURL/SARL).
 *  - Capital Lda / Unipessoal = 1 €/associé (l'ancienne valeur « 5 000 € » était FAUSSE).
 *  - Fiscalité : l'ancien RNH est terminé → IFICI (ex-« RNH 2.0 »). Les RETRAITÉS sont EXCLUS.
 *    Aucune promesse « 0 impôt / 0 risque / garanti ».
 *  - Étude de cas Alénia : salaire minimum PT 2026 ≈ 870 €/mois (et non 820 €).
 *  - Audrey = consultante en implantation/création (jamais comptable/fiscaliste/avocate) ;
 *    la comptabilité réglementée est assurée par un Contabilista Certificado partenaire ;
 *    la fiscalité fine relève d'une mise en relation avec un fiscaliste partenaire.
 *
 * Dates : provisoires et cohérentes (datePublished 2025, dateModified 2026-06).
 * TODO(à valider) : remplacer par les dates de publication/MAJ réelles fournies par la cliente.
 *
 * Images : NE PAS hotlinker Unsplash. Le rendu utilise un placeholder `bg-muted aspect-[16/9]`.
 * TODO : remplacer par des visuels authentiques (Portugal / bureau) optimisés et hébergés en propre.
 */

import type { Article, ArticleSection, Locale } from "@/data/article-types";
import { francophoneArticles } from "@/data/articles-francophone";

// Réexport pour compatibilité (d'anciens imports pointent vers @/data/articles).
export type { Article, ArticleSection, Locale };

// Articles historiques (migrés + corrigés YMYL). Les articles « francophone à
// l'étranger » (Lot 4 du plan SEO/GEO) vivent en modules disjoints, agrégés plus bas.
const legacyArticles: Article[] = [
  /* ------------------------------------------------------------------ */
  /*  1. Avantages fiscaux (CORRIGÉ : RNH → IFICI ; retraités exclus)    */
  /* ------------------------------------------------------------------ */
  {
    id: "avantages-fiscaux-portugal",
    slug: "avantages-fiscaux-portugal",
    title: {
      fr: "Les principaux leviers fiscaux pour entreprendre au Portugal en 2026",
      en: "The Main Tax Levers for Doing Business in Portugal in 2026",
    },
    excerpt: {
      fr: "Le Portugal attire les entrepreneurs par un cadre fiscal lisible et plusieurs régimes incitatifs. Tour d'horizon honnête des leviers réels en 2026, IRC, IVA, régions, IFICI, et de ceux qui ne s'appliquent pas (notamment aux retraités).",
      en: "Portugal attracts entrepreneurs with a readable tax framework and several incentive schemes. An honest overview of the real levers in 2026, IRC, IVA, regions, IFICI, and of those that do not apply (notably to retirees).",
    },
    datePublished: "2025-03-18",
    dateModified: "2026-06-01",
    content: {
      fr: [
        {
          paragraphs: [
            "Le Portugal est devenu une destination prisée par les entrepreneurs grâce à un cadre fiscal lisible et à plusieurs régimes incitatifs. Mais l'information disponible en ligne est souvent obsolète. Voici, datés 2026, les leviers réellement applicables, et leurs limites, car une information fiscale fausse coûte cher.",
          ],
        },
        {
          heading: "L'IRC : un impôt sur les sociétés compétitif",
          paragraphs: [
            "L'impôt sur les sociétés (IRC) s'établit à 19 % au taux standard sur le continent. Les PME bénéficient d'un taux réduit de 15 % sur les premiers 50 000 € de bénéfice, le surplus étant imposé à 19 %. Les régions autonomes de Madère et des Açores appliquent des taux régionaux plus bas.",
            "Ce barème place le Portugal dans la moyenne basse européenne, sans être un paradis fiscal : la lisibilité et la stabilité du cadre comptent autant que le taux.",
          ],
        },
        {
          heading: "L'IFICI (ex-« RNH 2.0 ») : un régime ciblé, pas universel",
          paragraphs: [
            "L'ancien régime des résidents non habituels (RNH) est fermé aux nouvelles demandes. Il a été remplacé par l'IFICI (Incentivo Fiscal à Investigação Científica e Inovação), parfois surnommé « RNH 2.0 », un surnom marketing qui n'est pas son nom légal.",
            "L'IFICI offre un taux d'IRS forfaitaire de 20 % sur les revenus d'activité éligible (salaires et indépendant), pendant 10 ans non renouvelables. Mais il est réservé à des profils actifs qualifiés : chercheurs et enseignants du supérieur, professions hautement qualifiées dans des entreprises éligibles fortement exportatrices, R&D, startups certifiées, entre autres.",
            "Point essentiel et trop souvent ignoré : les retraités sont exclus de l'IFICI. L'ancien avantage de 10 % sur les pensions étrangères a disparu. La plupart des freelances, nomades digitaux et e-commerçants classiques ne sont pas non plus éligibles. L'éligibilité dépend de la reconnaissance préalable de l'activité par l'autorité compétente : ce n'est jamais automatique.",
          ],
        },
        {
          heading: "L'IVA : un taux standard à 23 %, des taux réduits ciblés",
          paragraphs: [
            "Le Portugal applique un taux d'IVA (TVA portugaise) standard de 23 %. Des taux réduits existent pour certains secteurs, alimentation, livres, médicaments, généralement à 6 % ou 13 %, et varient selon les régions. On parle d'IVA, jamais de « TVA », pour le Portugal.",
            "La gestion de l'IVA mérite d'être anticipée dès la création, notamment pour les activités de e-commerce et de stockage transfrontalier, où les obligations peuvent se cumuler (OSS, immatriculation locale).",
          ],
        },
        {
          heading: "Les régimes régionaux : Madère et Açores",
          paragraphs: [
            "Les régions autonomes de Madère et des Açores disposent de régimes fiscaux propres, avec des taux d'IRC réduits. La zone franche de Madère (Centro Internacional de Negócios) prévoit un taux d'IRC de 5 % sous conditions strictes de substance et d'activité internationale.",
            "Ces régimes ne sont pas des solutions « clé en main » : ils supposent une activité réelle et un respect rigoureux des conditions, sous peine de requalification. Ils relèvent d'une analyse au cas par cas.",
          ],
        },
        {
          heading: "Ce que ces leviers ne sont pas",
          paragraphs: [
            "Aucun de ces dispositifs ne promet « 0 impôt » ni un montage « garanti ». Piloter une société portugaise depuis la France, par exemple, expose à un risque de requalification fiscale (direction effective, établissement stable) : l'implantation réelle prime sur l'adresse du siège.",
            "Notre rôle est de vous orienter vers la structure adaptée et de vous mettre en relation avec un Contabilista Certificado et, pour la fiscalité fine, un fiscaliste partenaire. La décision se prend toujours sur votre situation individuelle.",
          ],
        },
      ],
      en: [
        {
          paragraphs: [
            "Portugal has become a sought-after destination for entrepreneurs thanks to a readable tax framework and several incentive schemes. But much of the information online is outdated. Here, dated 2026, are the levers that actually apply, and their limits, because incorrect tax information is costly.",
          ],
        },
        {
          heading: "IRC: a competitive corporate tax",
          paragraphs: [
            "Corporate income tax (IRC) is 19% at the standard rate on the mainland. SMEs benefit from a reduced 15% rate on the first €50,000 of profit, with the surplus taxed at 19%. The autonomous regions of Madeira and the Azores apply lower regional rates.",
            "This places Portugal in the lower-middle range in Europe, without being a tax haven: the readability and stability of the framework matter as much as the rate.",
          ],
        },
        {
          heading: "IFICI (formerly “NHR 2.0”): a targeted scheme, not a universal one",
          paragraphs: [
            "The former Non-Habitual Residents regime (NHR) is closed to new applications. It has been replaced by IFICI (Incentivo Fiscal à Investigação Científica e Inovação), sometimes nicknamed “NHR 2.0”, a marketing nickname that is not its legal name.",
            "IFICI offers a flat 20% IRS rate on eligible activity income (employment and self-employment), for 10 non-renewable years. But it is reserved for qualified active profiles: researchers and higher-education teachers, highly qualified professions in eligible, strongly export-oriented companies, R&D, certified startups, among others.",
            "A key point too often ignored: retirees are excluded from IFICI. The former 10% advantage on foreign pensions has disappeared. Most freelancers, digital nomads and ordinary e-commerce sellers are not eligible either. Eligibility depends on the activity being recognised beforehand by the competent authority: it is never automatic.",
          ],
        },
        {
          heading: "IVA: a 23% standard rate, with targeted reduced rates",
          paragraphs: [
            "Portugal applies a standard IVA (Portuguese VAT) rate of 23%. Reduced rates exist for certain sectors, food, books, medicines, generally at 6% or 13%, and vary by region. For Portugal we say IVA, never “VAT”.",
            "IVA management deserves to be anticipated from incorporation, particularly for e-commerce and cross-border storage, where obligations can stack up (OSS, local registration).",
          ],
        },
        {
          heading: "Regional regimes: Madeira and the Azores",
          paragraphs: [
            "The autonomous regions of Madeira and the Azores have their own tax regimes, with reduced IRC rates. The Madeira Free Zone (Centro Internacional de Negócios) provides a 5% IRC rate under strict conditions of substance and international activity.",
            "These regimes are not turnkey solutions: they assume real activity and rigorous compliance with the conditions, on pain of reclassification. They require a case-by-case analysis.",
          ],
        },
        {
          heading: "What these levers are not",
          paragraphs: [
            "None of these schemes promises “zero tax” or a “guaranteed” arrangement. Running a Portuguese company from France, for instance, exposes you to a tax-reclassification risk (effective management, permanent establishment): real establishment prevails over the registered-office address.",
            "Our role is to point you towards the appropriate structure and to connect you with a Contabilista Certificado and, for fine-grained tax matters, a partner tax adviser. The decision is always made on your individual situation.",
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  2. Recruter au Portugal                                           */
  /* ------------------------------------------------------------------ */
  {
    id: "recruter-portugal",
    slug: "recruter-au-portugal",
    title: {
      fr: "Pourquoi recruter au Portugal : un choix stratégique",
      en: "Why Recruit in Portugal: A Strategic Choice",
    },
    excerpt: {
      fr: "Le Portugal s'impose comme une destination de choix pour le recrutement international. Main-d'œuvre qualifiée et multilingue, cadre de vie attractif, environnement business favorable : tour d'horizon des atouts réels.",
      en: "Portugal is establishing itself as a destination of choice for international recruitment. A qualified, multilingual workforce, an attractive living environment, a favourable business environment: an overview of the real strengths.",
    },
    datePublished: "2025-04-22",
    dateModified: "2026-06-01",
    content: {
      fr: [
        {
          paragraphs: [
            "Le Portugal s'affirme comme une destination de choix pour les entreprises internationales en quête de talents. Voici les principaux atouts du recrutement au Portugal, sans surpromesse.",
          ],
        },
        {
          heading: "Une main-d'œuvre qualifiée et multilingue",
          paragraphs: [
            "Le Portugal bénéficie d'un système éducatif performant qui forme chaque année de nombreux diplômés dans des domaines variés comme l'ingénierie, les technologies de l'information et les sciences sociales. La maîtrise de l'anglais y est particulièrement élevée (le pays figure parmi les plus à l'aise en anglais en Europe) ; le français reste un atout plus ciblé, porté par la diaspora et les centres de services francophones.",
          ],
        },
        {
          heading: "Un cadre de vie attractif",
          paragraphs: [
            "Avec un ensoleillement généreux et un coût de la vie modéré au regard d'autres capitales européennes, le Portugal offre une qualité de vie qui attire les talents. Lisbonne et Porto combinent dynamisme économique et douceur de vivre, ce qui facilite l'attraction et la rétention des collaborateurs.",
          ],
        },
        {
          heading: "Des coûts salariaux compétitifs",
          paragraphs: [
            "Les coûts salariaux au Portugal restent attractifs au regard d'autres pays d'Europe de l'Ouest. Des charges sociales mesurées permettent d'offrir des packages compétitifs tout en maîtrisant les coûts. Ces niveaux évoluent chaque année : ils sont à vérifier au moment du recrutement.",
          ],
        },
        {
          heading: "Un environnement business favorable",
          paragraphs: [
            "Le Portugal a mis en place de nombreuses mesures pour attirer les entreprises étrangères : simplification administrative, incitations ciblées et soutien à l'innovation. Le pays bénéficie d'une stabilité macroéconomique (appartenance à la zone euro, finances publiques redressées), même si la scène politique a connu des changements de gouvernement fréquents ces dernières années.",
          ],
        },
        {
          heading: "Une culture d'entreprise moderne",
          paragraphs: [
            "Les entreprises portugaises adoptent des pratiques de travail modernes et flexibles, favorisant l'équilibre entre vie professionnelle et personnelle. Cette approche contribue à attirer et retenir les talents.",
            "Le recrutement local suppose toutefois de maîtriser le droit du travail et les obligations sociales portugaises. Business Portugal vous met en relation avec un partenaire spécialisé dans le recrutement au Portugal pour sécuriser ces étapes.",
          ],
        },
      ],
      en: [
        {
          paragraphs: [
            "Portugal is establishing itself as a destination of choice for international companies seeking talent. Here are the main strengths of recruiting in Portugal, without over-promising.",
          ],
        },
        {
          heading: "A qualified and multilingual workforce",
          paragraphs: [
            "Portugal benefits from an effective education system that trains numerous graduates each year in fields such as engineering, information technology and social sciences. Command of English is particularly high (the country ranks among the most English-proficient in Europe); French remains a more targeted asset, driven by the diaspora and French-speaking service centres.",
          ],
        },
        {
          heading: "An attractive living environment",
          paragraphs: [
            "With generous sunshine and a moderate cost of living compared with other European capitals, Portugal offers a quality of life that attracts talent. Lisbon and Porto combine economic dynamism with a pleasant lifestyle, which helps to attract and retain staff.",
          ],
        },
        {
          heading: "Competitive labour costs",
          paragraphs: [
            "Labour costs in Portugal remain attractive compared with other Western European countries. Measured social charges make it possible to offer competitive packages while keeping costs under control. These levels change every year: they should be checked at the time of hiring.",
          ],
        },
        {
          heading: "A favourable business environment",
          paragraphs: [
            "Portugal has implemented numerous measures to attract foreign companies: administrative simplification, targeted incentives and support for innovation. The country benefits from macroeconomic stability (eurozone membership, improved public finances), even if the political scene has seen frequent changes of government in recent years.",
          ],
        },
        {
          heading: "A modern corporate culture",
          paragraphs: [
            "Portuguese companies adopt modern, flexible working practices that promote work-life balance. This approach helps to attract and retain talent.",
            "Local recruitment nonetheless requires a command of Portuguese labour law and social obligations. Business Portugal connects you with a partner specialised in recruitment in Portugal to secure these steps.",
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  3. Erreurs à éviter à l'immatriculation                           */
  /* ------------------------------------------------------------------ */
  {
    id: "erreurs-immatriculation",
    slug: "erreurs-immatriculation-societe",
    title: {
      fr: "Les erreurs à éviter lors de l'immatriculation de votre société",
      en: "Mistakes to Avoid When Registering Your Company",
    },
    excerpt: {
      fr: "Immatriculer sa société au Portugal est une étape clé. Certains pièges ralentissent ou compliquent le processus. Voici les erreurs les plus fréquentes, disponibilité du nom, NIF, choix du statut, formalités, et comment les éviter.",
      en: "Registering your company in Portugal is a key step. Certain pitfalls slow down or complicate the process. Here are the most common mistakes, name availability, NIF, choice of structure, formalities, and how to avoid them.",
    },
    datePublished: "2025-05-27",
    dateModified: "2026-06-01",
    content: {
      fr: [
        {
          paragraphs: [
            "L'immatriculation de votre société au Portugal est une étape clé dans la création de votre entreprise. Certains pièges peuvent toutefois ralentir ou compliquer le processus. Voici les erreurs les plus fréquentes à éviter.",
          ],
        },
        {
          heading: "Choisir un nom d'entreprise indisponible",
          paragraphs: [
            "Avant de lancer les démarches, il est crucial de vérifier la disponibilité du nom de votre société. Beaucoup commencent le processus sans cette vérification, ce qui entraîne retards et coûts supplémentaires. La disponibilité se contrôle via les services officiels portugais (RNPC / Empresa na Hora).",
          ],
        },
        {
          heading: "Oublier d'obtenir un NIF",
          paragraphs: [
            "Le NIF (numéro fiscal du particulier) est indispensable aux démarches administratives et fiscales au Portugal. Il doit être obtenu en amont. À ne pas confondre avec le NIPC, qui est le numéro fiscal de la société, attribué lors de l'immatriculation. Cette distinction NIF / NIPC est essentielle.",
          ],
        },
        {
          heading: "Mal choisir son statut juridique",
          paragraphs: [
            "Le choix entre ENI, Unipessoal Lda, Lda ou SA a des conséquences fiscales, sociales et patrimoniales. Un statut inadapté peut entraîner des problèmes de responsabilité et de gestion. Prenez le temps d'analyser votre situation, et faites-vous accompagner plutôt que de copier un modèle français (les statuts FR comme EURL ou SARL n'existent pas au Portugal).",
          ],
        },
        {
          heading: "Négliger les formalités post-création",
          paragraphs: [
            "Certaines formalités, rédaction des statuts, déclaration des bénéficiaires effectifs (RCBE), obtention de la Certidão Permanente, inscription auprès de la Segurança Social, sont parfois sous-estimées. Les ignorer expose à des retards ou des pénalités. Chaque étape mérite d'être préparée. La comptabilité, une fois la société créée, est assurée par un Contabilista Certificado partenaire.",
          ],
        },
      ],
      en: [
        {
          paragraphs: [
            "Registering your company in Portugal is a key step in creating your business. Certain pitfalls can, however, slow down or complicate the process. Here are the most common mistakes to avoid.",
          ],
        },
        {
          heading: "Choosing an unavailable company name",
          paragraphs: [
            "Before starting the procedures, it is crucial to check the availability of your company name. Many people begin the process without this check, which leads to delays and additional costs. Availability is checked through the official Portuguese services (RNPC / Empresa na Hora).",
          ],
        },
        {
          heading: "Forgetting to obtain a NIF",
          paragraphs: [
            "The NIF (individual tax number) is essential for administrative and tax procedures in Portugal. It must be obtained beforehand. Do not confuse it with the NIPC, which is the company's tax number, assigned at registration. This NIF / NIPC distinction is essential.",
          ],
        },
        {
          heading: "Choosing the wrong legal structure",
          paragraphs: [
            "The choice between ENI, Unipessoal Lda, Lda or SA has tax, social and asset-protection consequences. An unsuitable structure can lead to liability and management problems. Take time to analyse your situation, and get support rather than copying a French model (French structures such as EURL or SARL do not exist in Portugal).",
          ],
        },
        {
          heading: "Neglecting post-incorporation formalities",
          paragraphs: [
            "Some formalities, drafting the articles, declaring the beneficial owners (RCBE), obtaining the Certidão Permanente, registering with the Segurança Social, are sometimes underestimated. Ignoring them risks delays or penalties. Each step deserves to be prepared. Accounting, once the company is created, is handled by a partner Contabilista Certificado.",
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  4. Optimisation fiscale (CORRIGÉ : pas de promesse, IFICI cadré)  */
  /* ------------------------------------------------------------------ */
  {
    id: "optimisation-fiscale",
    slug: "optimisation-fiscale-portugal",
    title: {
      fr: "Structurer sa fiscalité au Portugal : repères et limites en 2026",
      en: "Structuring Your Taxation in Portugal: Markers and Limits in 2026",
    },
    excerpt: {
      fr: "Bien structurer sa fiscalité au Portugal, c'est d'abord comprendre le cadre et ses limites. Planification, crédits d'impôt, structuration des revenus, IVA : des repères honnêtes, et pourquoi la fiscalité fine relève d'un fiscaliste partenaire.",
      en: "Structuring your taxation in Portugal starts with understanding the framework and its limits. Planning, tax credits, income structuring, IVA: honest markers, and why fine-grained tax matters belong to a partner tax adviser.",
    },
    datePublished: "2025-07-15",
    dateModified: "2026-06-01",
    content: {
      fr: [
        {
          paragraphs: [
            "Bien gérer sa fiscalité au Portugal commence par une compréhension claire du cadre, et de ses limites. Il n'existe ni recette magique ni « 0 impôt » : seulement des repères, et des choix à valider sur votre situation. Cet article est informatif et ne constitue pas un conseil fiscal personnalisé.",
          ],
        },
        {
          heading: "Anticiper plutôt que subir",
          paragraphs: [
            "Une bonne organisation fiscale est avant tout une affaire d'anticipation : connaître ses échéances déclaratives (IRC, IVA), prévoir ses investissements et structurer son activité dès la création. L'approche proactive évite les mauvaises surprises. C'est l'inverse d'un montage opportuniste de dernière minute.",
          ],
        },
        {
          heading: "Crédits d'impôt et dispositifs ciblés",
          paragraphs: [
            "Le Portugal propose des dispositifs ciblés, notamment pour la R&D (SIFIDE) et l'investissement productif (RFAI). Le régime IFICI (ex-« RNH ») peut concerner certains profils actifs qualifiés, mais il exclut les retraités et suppose une reconnaissance préalable de l'activité. Ces dispositifs ne sont ni automatiques ni cumulables librement : leur éligibilité s'apprécie au cas par cas.",
          ],
        },
        {
          heading: "Structuration des revenus : un arbitrage, pas une astuce",
          paragraphs: [
            "La répartition entre rémunération du gérant et distribution de dividendes a un impact réel sur l'imposition globale. Cet arbitrage dépend de votre situation, de votre résidence fiscale et de la convention France-Portugal. Il doit être posé avec un professionnel, jamais sur la base d'un schéma « tout fait » trouvé en ligne.",
          ],
        },
        {
          heading: "Substance et résidence : la limite à ne pas franchir",
          paragraphs: [
            "Créer une société au Portugal mais en piloter la direction effective depuis la France crée un risque de requalification (siège de direction effective, établissement stable). La résidence fiscale ne se résume pas à « moins de 183 jours en France ». La sécurité vient d'une implantation réelle et documentée, pas d'une coquille vide.",
          ],
        },
        {
          heading: "L'IVA : un poste de trésorerie à piloter",
          paragraphs: [
            "Une gestion rigoureuse de l'IVA (taux standard 23 %) améliore la trésorerie : choix du régime adapté, respect des échéances déclaratives, attention particulière au e-commerce transfrontalier (OSS, stockage). La fiscalité fine, montages, IFICI, structuration internationale, relève d'un fiscaliste partenaire : Business Portugal vous y oriente.",
          ],
        },
      ],
      en: [
        {
          paragraphs: [
            "Managing your taxation well in Portugal starts with a clear understanding of the framework, and its limits. There is no magic recipe and no “zero tax”: only markers, and choices to validate against your situation. This article is informative and does not constitute personalised tax advice.",
          ],
        },
        {
          heading: "Anticipate rather than react",
          paragraphs: [
            "Good tax organisation is first and foremost a matter of anticipation: knowing your filing deadlines (IRC, IVA), planning your investments and structuring your activity from incorporation. A proactive approach avoids nasty surprises. It is the opposite of a last-minute opportunistic arrangement.",
          ],
        },
        {
          heading: "Tax credits and targeted schemes",
          paragraphs: [
            "Portugal offers targeted schemes, notably for R&D (SIFIDE) and productive investment (RFAI). The IFICI regime (formerly “NHR”) may concern certain qualified active profiles, but it excludes retirees and requires prior recognition of the activity. These schemes are neither automatic nor freely combinable: eligibility is assessed case by case.",
          ],
        },
        {
          heading: "Income structuring: a trade-off, not a trick",
          paragraphs: [
            "The split between manager's remuneration and dividend distribution has a real impact on overall taxation. This trade-off depends on your situation, your tax residence and the France-Portugal treaty. It must be set with a professional, never on the basis of a ready-made scheme found online.",
          ],
        },
        {
          heading: "Substance and residence: the line not to cross",
          paragraphs: [
            "Creating a company in Portugal but running its effective management from France creates a reclassification risk (place of effective management, permanent establishment). Tax residence is not just about “fewer than 183 days in France”. Security comes from a real, documented establishment, not from an empty shell.",
          ],
        },
        {
          heading: "IVA: a cash-flow item to manage",
          paragraphs: [
            "Rigorous IVA management (standard rate 23%) improves cash flow: choosing the right regime, meeting filing deadlines, paying particular attention to cross-border e-commerce (OSS, storage). Fine-grained taxation, arrangements, IFICI, international structuring, belongs to a partner tax adviser: Business Portugal points you towards one.",
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  5. Étude de cas Alénia (CORRIGÉ : salaire min. ≈ 870 €)           */
  /* ------------------------------------------------------------------ */
  {
    id: "success-story-alenia",
    slug: "etude-de-cas-alenia",
    title: {
      fr: "Étude de cas : l'implantation d'Alénia Consulting au Portugal",
      en: "Case Study: Alénia Consulting's Establishment in Portugal",
    },
    excerpt: {
      fr: "Comment Alénia Consulting, société de conseil IT, a structuré son implantation au Portugal. Un cas concret de coordination, recrutement, cadre social, bons interlocuteurs locaux, accompagné par Audrey.",
      en: "How Alénia Consulting, an IT consultancy, structured its establishment in Portugal. A concrete case of coordination, recruitment, social framework, the right local contacts, supported by Audrey.",
    },
    datePublished: "2025-09-09",
    dateModified: "2026-06-01",
    content: {
      fr: [
        {
          paragraphs: [
            "De nombreuses entreprises françaises s'implantent avec succès au Portugal. Parmi elles, Alénia Consulting, société de conseil IT créée en 2019, spécialisée dans la production IT. Cet accompagnement a été mené du temps où Audrey était chez Joongle ; il est publié avec l'accord de Skander Oueslati.",
          ],
        },
        {
          paragraphs: [
            "Grâce à un modèle opérationnel fondé sur une gouvernance horizontale et collaborative, Alénia associe l'ensemble de ses collaborateurs à sa croissance, quel que soit leur niveau d'ancienneté. Son expertise se concentre sur trois domaines : la transformation digitale, le support applicatif IT et la formation via son Académie.",
          ],
        },
        {
          heading: "L'implantation au Portugal",
          paragraphs: [
            "Avec un siège à Paris et des filiales au Royaume-Uni et en Espagne (Madrid et Malaga), Alénia Iberia, dirigée par Skander Oueslati, s'est implantée au Portugal en 2023. En moins d'un an, elle a recruté une cinquantaine de talents locaux et structuré son activité, avec l'objectif d'ouvrir un second bureau à Porto pour répondre à une demande croissante.",
          ],
        },
        {
          heading: "Un cadre social et de recrutement à comprendre",
          paragraphs: [
            "Le Portugal offre un cadre social qui permet une gestion maîtrisée des effectifs, avec des cotisations généralement plus basses que dans d'autres pays d'Europe de l'Ouest. Le salaire minimum national s'établit autour de 920 €/mois en 2026 (montant indicatif, revu chaque année).",
            "L'État portugais encourage par ailleurs la formation continue. Ces éléments doivent toujours être vérifiés au moment de l'embauche : ils évoluent à chaque exercice budgétaire.",
          ],
        },
        {
          heading: "La valeur de la coordination",
          paragraphs: [
            "Au-delà des chiffres, l'enseignement de ce cas est la valeur d'une coordination locale : identifier les bons interlocuteurs, sécuriser le recrutement, articuler création, banque et comptabilité. C'est précisément le rôle de Business Portugal, non pas exécuter la comptabilité ou le conseil fiscal réglementé, mais orchestrer et mettre en relation avec les bons partenaires.",
            "Le Portugal n'est pas qu'un lieu de délocalisation : bien accompagnée, une implantation y devient un véritable levier de croissance européenne.",
          ],
        },
      ],
      en: [
        {
          paragraphs: [
            "Many French companies establish themselves successfully in Portugal. Among them is Alénia Consulting, an IT consultancy founded in 2019, specialising in IT production. This support was provided while Audrey was at Joongle; it is published with the agreement of Skander Oueslati.",
          ],
        },
        {
          paragraphs: [
            "Thanks to an operating model based on horizontal, collaborative governance, Alénia involves all its employees in its growth, regardless of seniority. Its expertise focuses on three areas: digital transformation, IT application support and training through its Academy.",
          ],
        },
        {
          heading: "Establishment in Portugal",
          paragraphs: [
            "With headquarters in Paris and subsidiaries in the UK and Spain (Madrid and Malaga), Alénia Iberia, led by Skander Oueslati, established itself in Portugal in 2023. In less than a year, it recruited around fifty local talents and structured its activity, with the aim of opening a second office in Porto to meet growing demand.",
          ],
        },
        {
          heading: "A social and recruitment framework to understand",
          paragraphs: [
            "Portugal offers a social framework that allows for controlled workforce management, with contributions generally lower than in other Western European countries. The national minimum wage is around €920/month in 2026 (an indicative figure, reviewed each year).",
            "The Portuguese state also encourages continuing training. These elements should always be checked at the time of hiring: they change with each budget year.",
          ],
        },
        {
          heading: "The value of coordination",
          paragraphs: [
            "Beyond the figures, the lesson of this case is the value of local coordination: identifying the right contacts, securing recruitment, articulating incorporation, banking and accounting. This is precisely Business Portugal's role, not to carry out regulated accounting or tax advice, but to orchestrate and connect you with the right partners.",
            "Portugal is not just a relocation destination: with the right support, establishing there becomes a genuine lever for European growth.",
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /*  6. Choisir son statut juridique (CORRIGÉ : terminologie PT,       */
  /*     capital Lda/Unipessoal = 1 €/associé)                          */
  /* ------------------------------------------------------------------ */
  {
    id: "choisir-statut-juridique",
    slug: "choisir-statut-juridique",
    title: {
      fr: "Quel statut juridique pour votre société au Portugal ?",
      en: "Which Legal Structure for Your Company in Portugal?",
    },
    excerpt: {
      fr: "ENI, Unipessoal Lda, Lda ou SA : le choix du statut a des implications fiscales, sociales et patrimoniales. Un guide en terminologie portugaise, sans confusion avec les statuts français, pour faire le bon choix.",
      en: "ENI, Unipessoal Lda, Lda or SA: the choice of structure has tax, social and asset-protection implications. A guide in Portuguese terminology, without confusion with French structures, to make the right choice.",
    },
    datePublished: "2025-11-04",
    dateModified: "2026-06-01",
    content: {
      fr: [
        {
          paragraphs: [
            "Choisir le statut juridique de votre entreprise est une étape cruciale lors de sa création : il aura des implications fiscales, sociales et patrimoniales. Premier réflexe d'expertise : raisonner en terminologie portugaise, jamais en équivalents français. Les statuts FR (EI, EURL, SARL) n'existent pas au Portugal.",
          ],
        },
        {
          heading: "L'ENI (Empresário em Nome Individual)",
          paragraphs: [
            "L'ENI, l'entrepreneur en nom propre, est la forme la plus simple à créer. Elle convient aux indépendants (travailleurs sous le régime des recibos verdes) et aux toutes petites activités. Avantage : simplicité administrative et coûts faibles. Inconvénient majeur : l'entrepreneur est responsable sur son patrimoine personnel, sans séparation entre biens privés et professionnels.",
          ],
        },
        {
          heading: "L'Unipessoal Lda",
          paragraphs: [
            "L'Unipessoal Lda est une société unipersonnelle à responsabilité limitée : un seul associé, mais une personnalité morale distincte qui protège le patrimoine personnel. Le capital social légal est de 1 € par associé. C'est souvent la structure de référence pour un entrepreneur seul qui veut limiter sa responsabilité tout en gardant de la souplesse.",
            "Note : si la loi autorise 1 €, un capital plus cohérent avec l'activité est souvent recommandé pour la crédibilité du dossier (banque, partenaires).",
          ],
        },
        {
          heading: "La Lda (Sociedade por Quotas)",
          paragraphs: [
            "La Lda est la société à responsabilité limitée à partir de deux associés. La responsabilité est limitée aux apports et le capital social légal est de 1 € par associé (et non 5 000 €, une valeur erronée souvent reprise par erreur). Elle offre davantage de souplesse d'organisation qu'une ENI et convient bien aux PME.",
          ],
        },
        {
          heading: "La SA (Sociedade Anónima)",
          paragraphs: [
            "La SA s'adresse aux structures plus importantes ou aux projets nécessitant un capital significatif et une ouverture à l'investissement. Le capital social minimum est de 50 000 € et la responsabilité des actionnaires est limitée à leurs apports. Sa gouvernance est plus exigeante : elle se justifie pour lever des fonds ou viser une dimension plus institutionnelle.",
          ],
        },
        {
          heading: "Comment choisir ?",
          paragraphs: [
            "Le bon statut dépend du nombre d'associés, du niveau de protection patrimoniale recherché, de l'ambition de croissance et du régime social du gérant. Business Portugal vous oriente vers la structure adaptée et coordonne la création de bout en bout ; la comptabilité est ensuite assurée par un Contabilista Certificado partenaire.",
          ],
        },
      ],
      en: [
        {
          paragraphs: [
            "Choosing your company's legal structure is a crucial step at creation: it will have tax, social and asset-protection implications. The first mark of expertise: reason in Portuguese terminology, never in French equivalents. French structures (EI, EURL, SARL) do not exist in Portugal.",
          ],
        },
        {
          heading: "ENI (Empresário em Nome Individual)",
          paragraphs: [
            "The ENI, the sole trader, is the simplest form to set up. It suits the self-employed (those under the recibos verdes regime) and very small activities. Advantage: administrative simplicity and low costs. Major drawback: the entrepreneur is liable with their personal assets, with no separation between private and professional property.",
          ],
        },
        {
          heading: "Unipessoal Lda",
          paragraphs: [
            "The Unipessoal Lda is a single-member private limited company: one partner, but a distinct legal entity that protects personal assets. The legal share capital is €1 per partner. It is often the go-to structure for a sole entrepreneur who wants to limit liability while keeping flexibility.",
            "Note: while the law allows €1, a share capital more consistent with the activity is often recommended for the credibility of the file (bank, partners).",
          ],
        },
        {
          heading: "Lda (Sociedade por Quotas)",
          paragraphs: [
            "The Lda is the private limited company with two or more partners. Liability is limited to contributions and the legal share capital is €1 per partner (not €5,000, an incorrect figure often repeated by mistake). It offers more organisational flexibility than an ENI and suits SMEs well.",
          ],
        },
        {
          heading: "SA (Sociedade Anónima)",
          paragraphs: [
            "The SA is aimed at larger structures or projects requiring significant capital and openness to investment. The minimum share capital is €50,000 and shareholders' liability is limited to their contributions. Its governance is more demanding: it is justified to raise funds or aim for a more institutional scale.",
          ],
        },
        {
          heading: "How to choose?",
          paragraphs: [
            "The right structure depends on the number of partners, the level of asset protection sought, growth ambitions and the manager's social regime. Business Portugal points you towards the appropriate structure and coordinates incorporation end to end; accounting is then handled by a partner Contabilista Certificado.",
          ],
        },
      ],
    },
  },
];

// Tous les articles publiés : historiques + francophone-à-l'étranger.
export const articles: Article[] = [...legacyArticles, ...francophoneArticles];

/** Retourne un article par son slug, ou undefined. */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien (par date de publication). */
export function getSortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
