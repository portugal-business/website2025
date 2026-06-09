// Libellés d'enums, valeurs par défaut métier (honoraires réels), définition du tracker.

import type {
  DocumentStatus,
  DocumentType,
  FileKind,
  HonoraireLine,
  LeadSegment,
  LeadSource,
  LeadStatus,
  MissionStatus,
  MissionStep,
  PaymentSchedule,
  PlanKey,
  StepKey,
} from "@/platform/types";

// --- Leads -----------------------------------------------------------

export const LEAD_STATUS: Record<LeadStatus, { label: string; tone: BadgeTone }> = {
  new: { label: "Nouveau", tone: "info" },
  contacted: { label: "Contacté", tone: "neutral" },
  qualified: { label: "Qualifié", tone: "accent" },
  proposal: { label: "Proposition", tone: "warning" },
  won: { label: "Gagné", tone: "success" },
  lost: { label: "Perdu", tone: "danger" },
};

export const LEAD_STATUS_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

export const LEAD_SOURCE: Record<LeadSource, { label: string; short: string }> = {
  site_form: { label: "Formulaire du site", short: "Formulaire" },
  tool_ifici: { label: "Test d'éligibilité IFICI", short: "Outil IFICI" },
  tool_simulator: { label: "Simulateur coût salarié", short: "Simulateur" },
  calendly: { label: "RDV Calendly", short: "Calendly" },
  manual: { label: "Saisie manuelle", short: "Manuel" },
  other: { label: "Autre", short: "Autre" },
};

export const LEAD_SEGMENT: Record<LeadSegment, string> = {
  actif_eligible: "Actif · éligible probable",
  actif_a_verifier: "Actif · à vérifier",
  non_eligible: "Non éligible",
  retraite: "Retraité",
  employeur: "Employeur",
  inconnu: "Inconnu",
};

export const IFICI_RESULT_LABEL: Record<string, { label: string; tone: BadgeTone }> = {
  R1: { label: "Éligible probable", tone: "success" },
  R2: { label: "Non éligible", tone: "danger" },
  R3: { label: "À vérifier", tone: "warning" },
  R4: { label: "Retraité · non éligible", tone: "neutral" },
};

// --- Missions / tracker ---------------------------------------------

export const MISSION_STATUS: Record<MissionStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: "Brouillon", tone: "neutral" },
  active: { label: "En cours", tone: "info" },
  completed: { label: "Terminée", tone: "success" },
  cancelled: { label: "Annulée", tone: "danger" },
};

/** Les 5 étapes réelles (page service) → tracker. */
export const TRACKER_STEPS: { key: StepKey; label: string; description: string }[] = [
  {
    key: "echange",
    label: "Échange gratuit",
    description: "Point sur le projet, choix du statut (Unipessoal Lda / Lda), devis.",
  },
  {
    key: "nif",
    label: "NIF à distance",
    description: "Obtention du numéro fiscal portugais, sans déplacement.",
  },
  {
    key: "constitution",
    label: "Constitution (NIPC)",
    description: "Constitution de la société : elle existe et reçoit son NIPC.",
  },
  {
    key: "certidao_rcbe_statuts",
    label: "Certidão · RCBE · Statuts",
    description: "Certidão Permanente sous 24-48 h, puis RCBE et statuts. Dossier société complet.",
  },
  {
    key: "bancaire",
    label: "Accompagnement bancaire",
    description: "Ouverture du compte professionnel avec le partenaire Millennium.",
  },
  {
    key: "compta",
    label: "Mise en relation comptable",
    description: "Présentation au Contabilista Certificado partenaire (Raly / Joongle).",
  },
];

export function buildTrackerSteps(
  statuses: Partial<Record<StepKey, MissionStep["status"]>>,
  doneAt: Partial<Record<StepKey, string>> = {},
): MissionStep[] {
  return TRACKER_STEPS.map((s, i) => ({
    key: s.key,
    label: s.label,
    description: s.description,
    order: i,
    status: statuses[s.key] ?? "pending",
    doneAt: doneAt[s.key],
  }));
}

// --- Documents -------------------------------------------------------

export const DOCUMENT_TYPE: Record<DocumentType, string> = {
  lettre_mission: "Lettre de mission",
  contrat: "Contrat",
  facture: "Facture",
};

export const DOCUMENT_STATUS: Record<DocumentStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: "Brouillon", tone: "neutral" },
  sent: { label: "Envoyé", tone: "info" },
  signed: { label: "Signé", tone: "success" },
  paid: { label: "Payé", tone: "success" },
  void: { label: "Annulé", tone: "danger" },
};

/** Honoraires réels (lettre de mission Lovely Parallel). */
export const DEFAULT_HONORAIRES: HonoraireLine[] = [
  {
    label: "Rédaction des statuts / présentation du dossier au registre",
    amountCents: 72000,
    vatRate: 0.23,
  },
  { label: "Frais d'enregistrement légal", amountCents: 36000, vatRate: 0.23 },
  { label: "Déclaration RCBE par avocat", amountCents: 20000, vatRate: 0.23 },
];

export const DEFAULT_VAT_RATE = 0.23;

export const DEFAULT_SCHEDULE: PaymentSchedule[] = [
  { label: "À l'acceptation de la mission", pct: 0.5, trigger: "à l'acceptation" },
  { label: "À l'immatriculation de la société", pct: 0.5, trigger: "à l'immatriculation" },
];

/** Sections de périmètre de la lettre de mission (objet A→E). */
export const DEFAULT_SCOPE_SECTIONS = [
  {
    title: "Accompagnement juridique",
    items: [
      "Analyse du projet et conseil sur la forme juridique (Lda / Unipessoal Lda)",
      "Rédaction des statuts",
      "Préparation de l'ensemble des documents légaux",
      "Dépôt du dossier auprès du Registo Comercial",
      "Obtention de la Certidão Permanente",
      "Préparation et dépôt du RCBE en collaboration avec un avocat",
    ],
  },
  {
    title: "Procédures administratives et fiscales",
    items: [
      "Préparation des procurations nécessaires",
      "Immatriculation complète de la société",
      "Déclaration de début d'activité via le cabinet comptable partenaire",
    ],
  },
  {
    title: "Accompagnement bancaire",
    items: [
      "Préparation et constitution du dossier bancaire",
      "Mise en relation avec le réseau bancaire (Millennium)",
      "Suivi de l'ouverture du compte professionnel",
    ],
  },
  {
    title: "Mise en relation comptable",
    items: [
      "Présentation au cabinet comptable partenaire",
      "Assistance lors des échanges initiaux",
    ],
  },
  {
    title: "Valeur ajoutée Business Portugal",
    items: [
      "Mise en relation avec les partenaires locaux (avocats, recruteurs, immobilier commercial…)",
      "Possibilité de domiciliation (sur devis)",
    ],
  },
];

export const DEFAULT_CLIENT_OBLIGATIONS = [
  "Les documents d'identité des associés",
  "Les justificatifs de domicile",
  "Les informations nécessaires à la rédaction des statuts",
  "Les signatures et procurations",
  "Les éléments demandés par la banque ou les autorités portugaises",
];

// --- Pièces à fournir (upload portail) ------------------------------

export const FILE_REQUIREMENTS: { kind: FileKind; label: string; hint: string }[] = [
  {
    kind: "piece_identite",
    label: "Pièce d'identité (associés)",
    hint: "Passeport ou carte d'identité de chaque associé.",
  },
  {
    kind: "justif_domicile",
    label: "Justificatif de domicile",
    hint: "Récent (< 3 mois), dans votre pays de résidence.",
  },
  {
    kind: "objet_activite",
    label: "Objet de l'activité",
    hint: "Activité principale (et secondaires éventuelles).",
  },
  {
    kind: "capital",
    label: "Capital social envisagé",
    hint: "Montant (légal : 1 €/associé ; recommandé ~1 000 €).",
  },
  {
    kind: "identite_associes",
    label: "Identité des associés et gérants",
    hint: "Coordonnées et répartition.",
  },
  {
    kind: "nom_societe",
    label: "Nom souhaité pour la société",
    hint: "Je vérifie la disponibilité.",
  },
  {
    kind: "nif_gerant",
    label: "NIF du gérant (pays de résidence)",
    hint: "Numéro fiscal dans votre pays.",
  },
];

export const FILE_STATUS_LABEL: Record<string, { label: string; tone: BadgeTone }> = {
  requested: { label: "Attendu", tone: "neutral" },
  uploaded: { label: "Reçu", tone: "info" },
  validated: { label: "Validé", tone: "success" },
  rejected: { label: "À refaire", tone: "danger" },
};

// --- Plans -----------------------------------------------------------

export const PLAN: Record<PlanKey, { label: string }> = {
  starter: { label: "Starter" },
  pro: { label: "Pro" },
  scale: { label: "Scale" },
};

// --- Badge tones (partagé UI) ---------------------------------------

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger" | "accent";
