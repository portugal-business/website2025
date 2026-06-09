// =====================================================================
//  Schémas Zod, contrats d'entrée des Server Actions de la plateforme.
//  Source de vérité de validation (UX client + serveur). Sans dépendance
//  Supabase : utilisables dès maintenant, branchés aux actions à la migration.
// =====================================================================

import { z } from "zod";

// --- Enums (miroir des types/colonnes) ------------------------------
export const zLeadSource = z.enum([
  "site_form",
  "tool_ifici",
  "tool_simulator",
  "calendly",
  "manual",
  "other",
]);
export const zLeadStatus = z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]);
export const zCompanyForm = z.enum(["unipessoal_lda", "lda", "sa"]);
export const zStepKey = z.enum([
  "echange",
  "nif",
  "constitution",
  "certidao_rcbe_statuts",
  "bancaire",
  "compta",
]);
export const zStepStatus = z.enum(["pending", "in_progress", "done", "blocked"]);
export const zFileKind = z.enum([
  "piece_identite",
  "justif_domicile",
  "objet_activite",
  "capital",
  "identite_associes",
  "nom_societe",
  "nif_gerant",
  "autre",
]);

const uuid = z.string().uuid();

// --- Lead ingestion (API publique : formulaire + outils gratuits) ----
// L'attribution n'est PAS un input : elle est dérivée du `source` par trigger DB.
export const ingestLeadSchema = z.object({
  orgId: uuid,
  fullName: z.string().min(1).max(160),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  locale: z.enum(["fr", "en"]).default("fr"),
  source: zLeadSource,
  context: z.record(z.string(), z.unknown()).default({}),
  consentMarketing: z.boolean().default(false),
});
export type IngestLeadInput = z.infer<typeof ingestLeadSchema>;

// --- CRM consultant --------------------------------------------------
export const createLeadSchema = z.object({
  fullName: z.string().min(1).max(160),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  // saisie manuelle → attribution own_network (posée par trigger)
  source: z.literal("manual").default("manual"),
  context: z.object({ projet: z.string().max(2000).optional() }).default({}),
});

export const updateLeadStatusSchema = z.object({
  leadId: uuid,
  status: zLeadStatus,
});

export const addLeadNoteSchema = z.object({
  leadId: uuid,
  body: z.string().min(1).max(4000),
});

export const convertLeadSchema = z.object({
  leadId: uuid,
  companyForm: zCompanyForm,
  companyNameWanted: z.string().max(160).optional(),
});

// --- Documents -------------------------------------------------------
export const honoraireLineSchema = z.object({
  label: z.string().min(1).max(240),
  amountCents: z.number().int().min(0),
  vatRate: z.number().min(0).max(1),
});

export const generateDocumentSchema = z.object({
  missionId: uuid,
  type: z.enum(["lettre_mission", "contrat", "facture"]),
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  companyForm: zCompanyForm,
  lines: z.array(honoraireLineSchema).min(1),
  vatRate: z.number().min(0).max(1).default(0.23),
});

export const sendDocumentSchema = z.object({ documentId: uuid });

// Signature électronique à valeur probante (ip/ua ajoutés côté serveur)
export const signDocumentSchema = z.object({
  documentId: uuid,
  signerName: z.string().min(1).max(160),
  consent: z.literal(true), // case obligatoirement cochée
});

// --- Missions / tracker ----------------------------------------------
export const updateStepSchema = z.object({
  missionId: uuid,
  stepKey: zStepKey,
  status: zStepStatus,
});

// --- Pièces client (upload portail) ----------------------------------
export const uploadClientFileSchema = z.object({
  fileId: uuid,
  fileName: z.string().min(1).max(240),
  storagePath: z.string().min(1),
});

export const reviewClientFileSchema = z.object({
  fileId: uuid,
  status: z.enum(["validated", "rejected"]),
});

// --- Réglages org (consultant : colonnes éditables seulement) ---------
export const updateOrgSchema = z.object({
  brandName: z.string().min(1).max(160),
  name: z.string().min(1).max(160),
  vatId: z.string().max(40).optional(),
  location: z.string().max(160).optional(),
});

// --- Invitations -----------------------------------------------------
export const inviteSchema = z.object({
  email: z.string().email(),
  appRole: z.enum(["consultant", "client"]),
  clientId: uuid.optional(),
});
