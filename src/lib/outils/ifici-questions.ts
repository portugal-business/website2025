// Contenu CLIENT-SAFE du test d'éligibilité IFICI : types des réponses +
// libellés bilingues des questions/options. Le MAPPING réponses → verdict
// (R1..R4) vit UNIQUEMENT côté serveur (voir le Server Action de la page) :
// rien ici ne révèle quel chemin produit quel résultat.
//
// Données millésimées 2026 (art. 58-A CBF · Portaria 352/2024). YMYL :
// pré-qualification informative, jamais un conseil fiscal personnalisé.

export const IFICI_TREE_VERSION = "2026.1";

export type IficiCode = "R1" | "R2" | "R3" | "R4";

export type Q1 = "R5_NON" | "R5_OUI" | "R5_DOUTE";
export type Q2 = "REV_SALAIRE" | "REV_INDEP" | "REV_PENSION" | "REV_PASSIF" | "REV_DOUTE";
export type Q2b = "PENS_PRIVE" | "PENS_PUBLIC" | "PENS_MIXTE";
export type Q3 =
  | "PROF_RECHERCHE"
  | "PROF_QUALIFIEE"
  | "PROF_RD"
  | "PROF_STARTUP"
  | "PROF_FREELANCE"
  | "PROF_AUTRE";
export type Q4 = "EXP_OUI" | "EXP_NON" | "EXP_DOUTE";
export type Q5 = "CERT_OUI" | "CERT_NON" | "CERT_DOUTE";
export type Q6 = "ANT_NON" | "ANT_RNH" | "ANT_IFICI";
export type Horizon = "DEJA" | "M12" | "PLUS_TARD" | "RENSEIGNE";

export interface IficiAnswers {
  q1?: Q1;
  q2?: Q2;
  q2b?: Q2b;
  q3?: Q3;
  q4?: Q4;
  q5?: Q5;
  q6?: Q6;
  horizon?: Horizon;
}

export type IficiReason =
  | "residencePT"
  | "dejaBeneficiaire"
  | "secteurNonEligible"
  | "revenusPassifs";

export type IficiResult = {
  code: IficiCode;
  /** Pour R4 (retraité) : nature de la pension. */
  variant?: Q2b;
  /** Pour R2 (non éligible) : motif précis du knock-out. */
  reasonKey?: IficiReason;
  treeVersion: string;
};

export type StepId = "q1" | "q2" | "q2b" | "q3" | "q4" | "q5" | "q6" | "horizon";

export type Option = { code: string; label: string };
export type Question = { id: StepId; title: string; help?: string; options: Option[] };

type Loc = "fr" | "en";

const FR: Record<StepId, Question> = {
  q1: {
    id: "q1",
    title: "Avez-vous été résident(e) fiscal(e) au Portugal au cours des 5 dernières années ?",
    help: "L'IFICI exige de ne pas avoir été résident fiscal au Portugal lors des 5 années précédant votre installation, et de le devenir l'année de la demande.",
    options: [
      { code: "R5_NON", label: "Non, pas résident fiscal portugais ces 5 dernières années" },
      { code: "R5_OUI", label: "Oui, j'ai été résident fiscal portugais durant cette période" },
      { code: "R5_DOUTE", label: "Je ne suis pas sûr(e)" },
    ],
  },
  q2: {
    id: "q2",
    title: "Quelle sera votre principale source de revenus une fois installé(e) au Portugal ?",
    options: [
      { code: "REV_SALAIRE", label: "Un emploi salarié (catégorie A)" },
      { code: "REV_INDEP", label: "Une activité indépendante / ma propre société (catégorie B)" },
      { code: "REV_PENSION", label: "Une pension de retraite" },
      {
        code: "REV_PASSIF",
        label: "Des revenus de placements / location / patrimoine (sans activité)",
      },
      { code: "REV_DOUTE", label: "Je ne sais pas encore" },
    ],
  },
  q2b: {
    id: "q2b",
    title:
      "Votre pension est-elle une pension du secteur privé ou une pension publique (fonction publique, militaire, magistrat, agent titulaire) ?",
    help: "L'IFICI ne couvre que les revenus d'une activité professionnelle éligible. Les pensions étrangères en sont exclues, quelle que soit leur nature. La distinction privé/public détermine seulement OÙ votre pension est imposée.",
    options: [
      { code: "PENS_PRIVE", label: "Pension du secteur privé" },
      { code: "PENS_PUBLIC", label: "Pension publique (fonctionnaire, militaire, etc.)" },
      { code: "PENS_MIXTE", label: "Les deux / je ne sais pas" },
    ],
  },
  q3: {
    id: "q3",
    title: "Comment décririez-vous votre profession ou votre secteur d'activité ?",
    help: "L'IFICI vise une liste limitative de professions hautement qualifiées (Anexo I de la Portaria 352/2024). La plupart des freelances, nomades digitaux et e-commerçants classiques n'y figurent pas.",
    options: [
      { code: "PROF_RECHERCHE", label: "Enseignant-chercheur / recherche scientifique" },
      {
        code: "PROF_QUALIFIEE",
        label: "Profession hautement qualifiée (TIC, ingénieur, médecin, direction…)",
      },
      { code: "PROF_RD", label: "Activité de R&D" },
      { code: "PROF_STARTUP", label: "Startup (création / emploi dans une startup)" },
      {
        code: "PROF_FREELANCE",
        label: "Freelance / nomade digital / e-commerce / coaching / marketing",
      },
      { code: "PROF_AUTRE", label: "Autre / profession non technique" },
    ],
  },
  q4: {
    id: "q4",
    title:
      "L'entreprise dans laquelle vous exercerez réalise-t-elle au moins 50 % de son chiffre d'affaires à l'export (hors Portugal) ?",
    help: "Pour les professions qualifiées, l'entreprise doit avoir un CAE éligible (Anexo II) et réaliser ≥ 50 % de son chiffre d'affaires à l'export sur l'exercice d'entrée en fonction ou l'un des deux précédents.",
    options: [
      { code: "EXP_OUI", label: "Oui, ≥ 50 % à l'export" },
      { code: "EXP_NON", label: "Non, < 50 % à l'export" },
      { code: "EXP_DOUTE", label: "Je ne sais pas / pas encore décidé" },
    ],
  },
  q5: {
    id: "q5",
    title:
      "Votre structure d'accueil bénéficie-t-elle d'une reconnaissance officielle (startup certifiée, projet R&D SIFIDE, entité reconnue AICEP/IAPMEI, RFAI) ?",
    help: "L'éligibilité suppose presque toujours que l'entité employeuse ou le projet figure sur la liste annuelle publiée par l'autorité compétente (AT, FCT, AICEP, IAPMEI, Startup Portugal). C'est un point de blocage fréquent.",
    options: [
      { code: "CERT_OUI", label: "Oui, une reconnaissance officielle existe" },
      { code: "CERT_NON", label: "Non, pas de reconnaissance" },
      { code: "CERT_DOUTE", label: "Je ne sais pas" },
    ],
  },
  q6: {
    id: "q6",
    title: "Avez-vous déjà bénéficié, par le passé, du RNH ou de l'IFICI au Portugal ?",
    help: "Le régime ne peut pas être accordé deux fois. Si vous êtes déjà bénéficiaire du RNH inscrit avant fin 2023, vous conservez l'ancien régime jusqu'au terme de vos 10 ans, c'est un sujet différent.",
    options: [
      { code: "ANT_NON", label: "Non, jamais" },
      { code: "ANT_RNH", label: "Oui, j'ai déjà bénéficié du RNH (ancien régime)" },
      { code: "ANT_IFICI", label: "Oui, j'ai déjà bénéficié de l'IFICI" },
    ],
  },
  horizon: {
    id: "horizon",
    title: "Quand prévoyez-vous votre installation au Portugal ?",
    help: "Cette information n'influence pas votre éligibilité. Elle nous permet de vous alerter sur la date limite de demande (15 janvier).",
    options: [
      { code: "DEJA", label: "Je suis déjà résident(e) en 2025/2026" },
      { code: "M12", label: "Dans les 12 mois" },
      { code: "PLUS_TARD", label: "Plus tard" },
      { code: "RENSEIGNE", label: "Je me renseigne" },
    ],
  },
};

const EN: Record<StepId, Question> = {
  q1: {
    id: "q1",
    title: "Have you been a tax resident in Portugal in the last 5 years?",
    help: "The IFICI requires that you were not a tax resident in Portugal during the 5 years before moving, and that you become one in the year of the application.",
    options: [
      { code: "R5_NON", label: "No, not a Portuguese tax resident in the last 5 years" },
      { code: "R5_OUI", label: "Yes, I was a Portuguese tax resident during that period" },
      { code: "R5_DOUTE", label: "I'm not sure" },
    ],
  },
  q2: {
    id: "q2",
    title: "What will be your main source of income once settled in Portugal?",
    options: [
      { code: "REV_SALAIRE", label: "Employment income (category A)" },
      { code: "REV_INDEP", label: "Self-employment / my own company (category B)" },
      { code: "REV_PENSION", label: "A retirement pension" },
      { code: "REV_PASSIF", label: "Investment / rental / wealth income (no activity)" },
      { code: "REV_DOUTE", label: "I don't know yet" },
    ],
  },
  q2b: {
    id: "q2b",
    title:
      "Is your pension a private-sector pension or a public one (civil service, military, etc.)?",
    help: "The IFICI only covers eligible professional-activity income. Foreign pensions are excluded, whatever their nature. The private/public distinction only determines WHERE your pension is taxed.",
    options: [
      { code: "PENS_PRIVE", label: "Private-sector pension" },
      { code: "PENS_PUBLIC", label: "Public pension (civil servant, military, etc.)" },
      { code: "PENS_MIXTE", label: "Both / I don't know" },
    ],
  },
  q3: {
    id: "q3",
    title: "How would you describe your profession or sector?",
    help: "The IFICI targets a limited list of highly qualified professions (Anexo I of Portaria 352/2024). Most freelancers, digital nomads and classic e-commerce sellers are not on it.",
    options: [
      { code: "PROF_RECHERCHE", label: "Academic / scientific research" },
      {
        code: "PROF_QUALIFIEE",
        label: "Highly qualified profession (ICT, engineer, doctor, management…)",
      },
      { code: "PROF_RD", label: "R&D activity" },
      { code: "PROF_STARTUP", label: "Startup (founding / employment in a startup)" },
      {
        code: "PROF_FREELANCE",
        label: "Freelance / digital nomad / e-commerce / coaching / marketing",
      },
      { code: "PROF_AUTRE", label: "Other / non-technical profession" },
    ],
  },
  q4: {
    id: "q4",
    title:
      "Does the company you'll work for generate at least 50% of its turnover from exports (outside Portugal)?",
    help: "For qualified professions, the company must have an eligible CAE (Anexo II) and generate ≥ 50% of its turnover from exports in the year of entry or one of the two prior years.",
    options: [
      { code: "EXP_OUI", label: "Yes, ≥ 50% exported" },
      { code: "EXP_NON", label: "No, < 50% exported" },
      { code: "EXP_DOUTE", label: "I don't know / not yet decided" },
    ],
  },
  q5: {
    id: "q5",
    title:
      "Does your host structure have official recognition (certified startup, SIFIDE R&D project, AICEP/IAPMEI-recognised entity, RFAI)?",
    help: "Eligibility almost always requires the employing entity or project to be on the annual list published by the competent authority (AT, FCT, AICEP, IAPMEI, Startup Portugal). This is a frequent blocking point.",
    options: [
      { code: "CERT_OUI", label: "Yes, official recognition exists" },
      { code: "CERT_NON", label: "No recognition" },
      { code: "CERT_DOUTE", label: "I don't know" },
    ],
  },
  q6: {
    id: "q6",
    title: "Have you ever benefited from the RNH or the IFICI in Portugal?",
    help: "The regime cannot be granted twice. If you are already an RNH beneficiary registered before the end of 2023, you keep the former regime until the end of your 10 years, that is a different matter.",
    options: [
      { code: "ANT_NON", label: "No, never" },
      { code: "ANT_RNH", label: "Yes, I already benefited from the RNH (former regime)" },
      { code: "ANT_IFICI", label: "Yes, I already benefited from the IFICI" },
    ],
  },
  horizon: {
    id: "horizon",
    title: "When do you plan to settle in Portugal?",
    help: "This does not affect your eligibility. It lets us flag the application deadline (15 January) for you.",
    options: [
      { code: "DEJA", label: "I'm already a resident in 2025/2026" },
      { code: "M12", label: "Within 12 months" },
      { code: "PLUS_TARD", label: "Later" },
      { code: "RENSEIGNE", label: "Just researching" },
    ],
  },
};

export function ificiQuestions(locale: string): Record<StepId, Question> {
  return (locale === "en" ? EN : FR) as Record<StepId, Question>;
}

// Ordre/branchement du parcours (côté client). Le branchement n'expose AUCUN
// verdict : il décide seulement quelle question afficher ensuite.
export function nextStep(current: StepId, a: IficiAnswers): StepId | "done" {
  switch (current) {
    case "q1":
      return "q2";
    case "q2":
      if (a.q2 === "REV_PENSION") return "q2b";
      return "q3";
    case "q2b":
      return "horizon"; // la branche retraité court-circuite Q3→Q6
    case "q3":
      if (a.q3 === "PROF_QUALIFIEE" || a.q3 === "PROF_FREELANCE") return "q4";
      if (a.q3 === "PROF_RECHERCHE" || a.q3 === "PROF_RD" || a.q3 === "PROF_STARTUP") return "q5";
      return "q6"; // PROF_AUTRE
    case "q4":
      return "q6";
    case "q5":
      return "q6";
    case "q6":
      return "horizon";
    case "horizon":
      return "done";
    default:
      return "done";
  }
}

export type Loc_ = Loc;
