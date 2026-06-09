// =====================================================================
//  Plateforme SaaS, types domaine
//  Ces types SONT le futur schéma Supabase. La couche mock (src/platform/mock)
//  les implémente ; la migration remplacera les accesseurs par des requêtes,
//  à types conservés. Toute table métier porte `orgId` (→ org_id, RLS).
// =====================================================================

export type ID = string;
export type ISODate = string; // ISO 8601

// ---------------------------------------------------------------------
//  Rôles & identité
// ---------------------------------------------------------------------

export type AppRole = "platform_admin" | "consultant" | "client";
export type MemberRole = "owner" | "member";

export interface PlatformUser {
  id: ID;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

// ---------------------------------------------------------------------
//  Org (tenant)
// ---------------------------------------------------------------------

export type PlanKey = "starter" | "pro" | "scale";

export interface OrgBranding {
  logoText: string;
  /** token de couleur de marque (réservé white-label v2) */
  primary?: string;
  accent?: string;
}

export interface Org {
  id: ID;
  name: string; // raison sociale (ex. Lovelyparallel, Lda)
  brandName: string; // marque (ex. Business Portugal)
  vatId?: string; // NIF/NIPC
  location?: string;
  branding: OrgBranding;
  plan: PlanKey;
  /** fee par client signé (centimes), facturé par Propul'SEO */
  perClientFeeCents: number;
  /** abonnement mensuel (centimes) facturé par Propul'SEO */
  monthlyFeeCents: number;
  status: "active" | "trial" | "paused";
  createdAt: ISODate;
}

export interface OrgMember {
  id: ID;
  orgId: ID;
  user: PlatformUser;
  role: MemberRole;
}

// ---------------------------------------------------------------------
//  Leads (CRM)
// ---------------------------------------------------------------------

export type LeadSource =
  | "site_form"
  | "tool_ifici"
  | "tool_simulator"
  | "calendly"
  | "manual"
  | "other";

/** Dérivé du source : tout sauf `manual` = inbound (attribué Propul'SEO). */
export type LeadAttribution = "inbound" | "own_network";

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";

export type LeadSegment =
  | "actif_eligible"
  | "actif_a_verifier"
  | "non_eligible"
  | "retraite"
  | "employeur"
  | "inconnu";

/** Contexte riche apporté par les outils-leads (IFICI / simulateur). */
export interface LeadContext {
  // Test d'éligibilité IFICI
  ificiResult?: "R1" | "R2" | "R3" | "R4";
  ificiResultLabel?: string;
  ificiHorizon?: string;
  // Simulateur coût salarié
  simBrutMensuel?: number;
  simNbSalaries?: number;
  simCoutAnnuel?: number;
  simSurcoutPct?: number;
  // Formulaire / divers
  message?: string;
  projet?: string;
}

export interface Lead {
  id: ID;
  orgId: ID;
  fullName: string;
  email: string;
  phone?: string;
  locale: "fr" | "en";
  source: LeadSource;
  attribution: LeadAttribution;
  status: LeadStatus;
  segment: LeadSegment;
  leadScore: number; // 0-100
  context: LeadContext;
  ownerId?: ID; // membre assigné
  /** rempli quand converti en client */
  clientId?: ID;
  createdAt: ISODate;
  lastActivityAt: ISODate;
  consentMarketing?: boolean;
}

export type ActivityType = "note" | "status_change" | "email" | "call" | "meeting" | "system";

export interface LeadActivity {
  id: ID;
  leadId: ID;
  type: ActivityType;
  body: string;
  author: string;
  createdAt: ISODate;
}

// ---------------------------------------------------------------------
//  Clients & missions
// ---------------------------------------------------------------------

export interface Client {
  id: ID;
  orgId: ID;
  leadId?: ID;
  fullName: string;
  email: string;
  phone?: string;
  companyNameWanted?: string;
  countryOfResidence?: string;
  createdAt: ISODate;
}

export type CompanyForm = "unipessoal_lda" | "lda" | "sa";
export type MissionStatus = "draft" | "active" | "completed" | "cancelled";

export type StepKey =
  | "echange"
  | "nif"
  | "constitution"
  | "certidao_rcbe_statuts"
  | "bancaire"
  | "compta";

export type StepStatus = "pending" | "in_progress" | "done" | "blocked";

export interface MissionStep {
  key: StepKey;
  label: string;
  description: string;
  status: StepStatus;
  order: number;
  doneAt?: ISODate;
}

export interface Mission {
  id: ID;
  orgId: ID;
  clientId: ID;
  leadId?: ID;
  ref: string; // ex. BP-2026-014
  type: "creation_societe";
  status: MissionStatus;
  companyForm: CompanyForm;
  companyNameWanted?: string;
  nipc?: string;
  steps: MissionStep[];
  startedAt?: ISODate;
  completedAt?: ISODate;
  createdAt: ISODate;
}

// ---------------------------------------------------------------------
//  Documents (lettre de mission / contrat / facture)
// ---------------------------------------------------------------------

export type DocumentType = "lettre_mission" | "contrat" | "facture";
export type DocumentStatus = "draft" | "sent" | "signed" | "paid" | "void";

export interface HonoraireLine {
  label: string;
  amountCents: number;
  vatRate: number; // ex. 0.23
  note?: string;
}

export interface PaymentSchedule {
  label: string;
  pct: number; // 0-1
  trigger: string; // ex. "à l'acceptation"
}

export interface DocumentPayload {
  // En-tête
  clientName: string;
  clientEmail: string;
  companyForm: CompanyForm;
  // Honoraires
  lines: HonoraireLine[];
  vatRate: number;
  schedule: PaymentSchedule[];
  // Corps (sections de la lettre de mission)
  scopeSections?: { title: string; items: string[] }[];
  clientObligations?: string[];
  durationNote?: string;
  intro?: string;
}

export interface SignatureRecord {
  signerName: string;
  signerEmail: string;
  signedAt: ISODate;
  ip: string;
  userAgent: string;
  consentText: string;
}

export interface BusinessDocument {
  id: ID;
  orgId: ID;
  missionId: ID;
  clientId: ID;
  type: DocumentType;
  status: DocumentStatus;
  number: string; // séquence par org (ex. LM-2026-014, FA-2026-031)
  title: string;
  payload: DocumentPayload;
  totalHtCents: number;
  totalTtcCents: number;
  signature?: SignatureRecord;
  createdAt: ISODate;
  sentAt?: ISODate;
  signedAt?: ISODate;
}

// ---------------------------------------------------------------------
//  Upload des pièces (portail client)
// ---------------------------------------------------------------------

export type FileKind =
  | "piece_identite"
  | "justif_domicile"
  | "objet_activite"
  | "capital"
  | "identite_associes"
  | "nom_societe"
  | "nif_gerant"
  | "autre";

export type FileStatus = "requested" | "uploaded" | "validated" | "rejected";

export interface ClientFile {
  id: ID;
  orgId: ID;
  missionId: ID;
  kind: FileKind;
  label: string;
  hint?: string;
  status: FileStatus;
  fileName?: string;
  uploadedAt?: ISODate;
}

// ---------------------------------------------------------------------
//  Facturation Propul'SEO → consultant
// ---------------------------------------------------------------------

export type BillingEventType = "subscription" | "signed_client";

export interface BillingEvent {
  id: ID;
  orgId: ID;
  type: BillingEventType;
  missionId?: ID;
  label: string;
  amountCents: number;
  period: string; // ex. 2026-06
  status: "pending" | "invoiced" | "paid";
  createdAt: ISODate;
}
