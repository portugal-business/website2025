// =====================================================================
//  Données mock, réalistes, référentielles, déterministes.
//  Source de vérité temporaire avant Supabase. IDs stables.
// =====================================================================

import {
  buildTrackerSteps,
  DEFAULT_CLIENT_OBLIGATIONS,
  DEFAULT_HONORAIRES,
  DEFAULT_SCHEDULE,
  DEFAULT_SCOPE_SECTIONS,
  DEFAULT_VAT_RATE,
  FILE_REQUIREMENTS,
} from "@/platform/lib/constants";
import { computeTotals } from "@/platform/lib/honoraires";
import type {
  BillingEvent,
  BusinessDocument,
  Client,
  ClientFile,
  DocumentPayload,
  HonoraireLine,
  Lead,
  LeadActivity,
  Mission,
  Org,
  OrgMember,
  PlatformUser,
} from "@/platform/types";

// ---------------------------------------------------------------------
//  Utilisateurs plateforme
// ---------------------------------------------------------------------

export const USER_ETIENNE: PlatformUser = {
  id: "user-etienne",
  fullName: "Étienne Guimbard",
  email: "etienne@propulseo-site.com",
};

export const USER_AUDREY: PlatformUser = {
  id: "user-audrey",
  fullName: "Audrey Marques",
  email: "audrey@portugal-business.com",
};

export const USER_CONSULTANT_2: PlatformUser = {
  id: "user-marc",
  fullName: "Marc Lefèvre",
  email: "marc@expat-malta.com",
};

// ---------------------------------------------------------------------
//  Orgs (tenants)
// ---------------------------------------------------------------------

export const ORGS: Org[] = [
  {
    id: "org-bp",
    name: "Lovelyparallel, Lda",
    brandName: "Business Portugal",
    vatId: "518354750",
    location: "Lisbonne, Portugal",
    branding: { logoText: "Business Portugal" },
    plan: "pro",
    perClientFeeCents: 15000, // 150 € / client signé
    monthlyFeeCents: 19900, // 199 € / mois
    status: "active",
    createdAt: "2026-02-01T09:00:00Z",
  },
  {
    id: "org-malta",
    name: "Expat Malta Consulting",
    brandName: "Expat Malta",
    vatId: "MT24882910",
    location: "La Valette, Malte",
    branding: { logoText: "Expat Malta" },
    plan: "starter",
    perClientFeeCents: 12000,
    monthlyFeeCents: 9900,
    status: "trial",
    createdAt: "2026-05-20T09:00:00Z",
  },
  {
    id: "org-cyprus",
    name: "Cyprus Setup Partners",
    brandName: "Cyprus Setup",
    vatId: "CY10398472X",
    location: "Limassol, Chypre",
    branding: { logoText: "Cyprus Setup" },
    plan: "scale",
    perClientFeeCents: 18000,
    monthlyFeeCents: 29900,
    status: "active",
    createdAt: "2026-03-10T09:00:00Z",
  },
];

export const ORG_MEMBERS: OrgMember[] = [
  { id: "m-1", orgId: "org-bp", user: USER_AUDREY, role: "owner" },
  { id: "m-2", orgId: "org-malta", user: USER_CONSULTANT_2, role: "owner" },
];

export const PLATFORM_ADMIN_IDS = ["user-etienne"];

// ---------------------------------------------------------------------
//  Leads (org Business Portugal)
// ---------------------------------------------------------------------

export const LEADS: Lead[] = [
  {
    id: "lead-001",
    orgId: "org-bp",
    fullName: "Julien Mercier",
    email: "j.mercier@protonmail.com",
    phone: "+33 6 12 44 90 31",
    locale: "fr",
    source: "tool_ifici",
    attribution: "inbound",
    status: "qualified",
    segment: "actif_eligible",
    leadScore: 88,
    context: {
      ificiResult: "R1",
      ificiResultLabel: "Éligible probable",
      ificiHorizon: "Dans les 12 mois",
      projet: "Ingénieur TIC, entreprise exportatrice, veut structurer une Lda.",
    },
    ownerId: "user-audrey",
    createdAt: "2026-06-02T08:21:00Z",
    lastActivityAt: "2026-06-08T15:40:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-002",
    orgId: "org-bp",
    fullName: "Camille Besson",
    email: "camille.besson@gmail.com",
    phone: "+33 7 81 22 17 05",
    locale: "fr",
    source: "site_form",
    attribution: "inbound",
    status: "proposal",
    segment: "actif_a_verifier",
    leadScore: 74,
    context: {
      message: "Je veux créer ma société de conseil au Portugal, seule. Délai ?",
      projet: "Consultante indépendante, Unipessoal Lda.",
    },
    ownerId: "user-audrey",
    createdAt: "2026-05-28T10:02:00Z",
    lastActivityAt: "2026-06-07T09:12:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-003",
    orgId: "org-bp",
    fullName: "Hélène Rousseau",
    email: "helene.rousseau@orange.fr",
    locale: "fr",
    source: "tool_ifici",
    attribution: "inbound",
    status: "contacted",
    segment: "retraite",
    leadScore: 35,
    context: {
      ificiResult: "R4",
      ificiResultLabel: "Retraité · non éligible",
      ificiHorizon: "Je me renseigne",
      projet: "Retraitée secteur privé, veut comparaison France/Portugal.",
    },
    ownerId: "user-audrey",
    createdAt: "2026-06-05T18:44:00Z",
    lastActivityAt: "2026-06-06T11:05:00Z",
    consentMarketing: false,
  },
  {
    id: "lead-004",
    orgId: "org-bp",
    fullName: "Thomas Garnier",
    email: "thomas@garnier-trade.com",
    phone: "+33 6 70 11 88 42",
    locale: "fr",
    source: "tool_simulator",
    attribution: "inbound",
    status: "new",
    segment: "employeur",
    leadScore: 67,
    context: {
      simBrutMensuel: 2200,
      simNbSalaries: 3,
      simCoutAnnuel: 116000,
      simSurcoutPct: 26.4,
      projet: "Veut implanter une équipe de 3 personnes au Portugal.",
    },
    createdAt: "2026-06-09T07:15:00Z",
    lastActivityAt: "2026-06-09T07:15:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-005",
    orgId: "org-bp",
    fullName: "Sofia Almeida",
    email: "sofia.almeida@me.com",
    phone: "+351 91 555 21 09",
    locale: "fr",
    source: "calendly",
    attribution: "inbound",
    status: "won",
    segment: "actif_eligible",
    leadScore: 92,
    context: {
      projet: "Import-export hors UE, dossier bancaire complexe, déjà convertie.",
    },
    ownerId: "user-audrey",
    clientId: "client-001",
    createdAt: "2026-05-10T14:30:00Z",
    lastActivityAt: "2026-05-22T16:00:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-006",
    orgId: "org-bp",
    fullName: "Pierre Lacombe",
    email: "pierre.lacombe@free.fr",
    locale: "fr",
    source: "tool_ifici",
    attribution: "inbound",
    status: "lost",
    segment: "non_eligible",
    leadScore: 18,
    context: {
      ificiResult: "R2",
      ificiResultLabel: "Non éligible",
      projet: "Freelance e-commerce, < 50 % export, pas d'avantage IFICI.",
    },
    ownerId: "user-audrey",
    createdAt: "2026-05-15T12:00:00Z",
    lastActivityAt: "2026-05-19T10:00:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-007",
    orgId: "org-bp",
    fullName: "Nadia Cherif",
    email: "nadia.cherif@gmail.com",
    phone: "+33 6 33 90 12 76",
    locale: "fr",
    source: "manual",
    attribution: "own_network",
    status: "qualified",
    segment: "actif_a_verifier",
    leadScore: 60,
    context: {
      projet: "Recommandée par une cliente. Restauratrice, projet Lisbonne.",
    },
    ownerId: "user-audrey",
    createdAt: "2026-05-30T09:00:00Z",
    lastActivityAt: "2026-06-04T14:20:00Z",
  },
  {
    id: "lead-008",
    orgId: "org-bp",
    fullName: "David Okonkwo",
    email: "david.okonkwo@outlook.com",
    phone: "+44 7700 900321",
    locale: "en",
    source: "site_form",
    attribution: "inbound",
    status: "contacted",
    segment: "inconnu",
    leadScore: 52,
    context: {
      message: "Non-EU founder, import/export. Need help with bank compliance.",
    },
    ownerId: "user-audrey",
    createdAt: "2026-06-06T20:11:00Z",
    lastActivityAt: "2026-06-08T08:30:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-009",
    orgId: "org-bp",
    fullName: "Léa Fontaine",
    email: "lea.fontaine@gmail.com",
    locale: "fr",
    source: "tool_simulator",
    attribution: "inbound",
    status: "new",
    segment: "employeur",
    leadScore: 49,
    context: {
      simBrutMensuel: 1500,
      simNbSalaries: 1,
      simCoutAnnuel: 26500,
      simSurcoutPct: 26.1,
    },
    createdAt: "2026-06-09T06:02:00Z",
    lastActivityAt: "2026-06-09T06:02:00Z",
    consentMarketing: false,
  },
  {
    id: "lead-010",
    orgId: "org-bp",
    fullName: "Marc Antoine Dubreuil",
    email: "ma.dubreuil@gmail.com",
    phone: "+33 6 88 45 23 19",
    locale: "fr",
    source: "calendly",
    attribution: "inbound",
    status: "won",
    segment: "actif_eligible",
    leadScore: 81,
    context: { projet: "Consultant SaaS, Unipessoal Lda, converti, mission en cours." },
    ownerId: "user-audrey",
    clientId: "client-002",
    createdAt: "2026-04-28T11:00:00Z",
    lastActivityAt: "2026-05-12T09:00:00Z",
    consentMarketing: true,
  },
  {
    id: "lead-011",
    orgId: "org-bp",
    fullName: "Inès Bouhaddi",
    email: "ines.bouhaddi@gmail.com",
    locale: "fr",
    source: "manual",
    attribution: "own_network",
    status: "won",
    segment: "actif_a_verifier",
    leadScore: 70,
    context: { projet: "Bouche-à-oreille LinkedIn. Commerce de détail." },
    ownerId: "user-audrey",
    clientId: "client-003",
    createdAt: "2026-04-15T10:00:00Z",
    lastActivityAt: "2026-04-30T10:00:00Z",
  },
  {
    id: "lead-012",
    orgId: "org-bp",
    fullName: "Romain Vasseur",
    email: "romain.vasseur@protonmail.com",
    phone: "+33 7 60 14 88 02",
    locale: "fr",
    source: "site_form",
    attribution: "inbound",
    status: "new",
    segment: "inconnu",
    leadScore: 44,
    context: { message: "Bonjour, je veux ouvrir une société au Portugal, par où commencer ?" },
    createdAt: "2026-06-09T09:05:00Z",
    lastActivityAt: "2026-06-09T09:05:00Z",
    consentMarketing: true,
  },
];

// Quelques leads pour les autres orgs (vue admin / agrégats)
export const LEADS_OTHER: Lead[] = [
  {
    id: "lead-m1",
    orgId: "org-malta",
    fullName: "Greg Hall",
    email: "greg.hall@gmail.com",
    locale: "en",
    source: "site_form",
    attribution: "inbound",
    status: "qualified",
    segment: "inconnu",
    leadScore: 55,
    context: {},
    createdAt: "2026-06-01T10:00:00Z",
    lastActivityAt: "2026-06-05T10:00:00Z",
  },
  {
    id: "lead-c1",
    orgId: "org-cyprus",
    fullName: "Elena Petrou",
    email: "elena.petrou@gmail.com",
    locale: "en",
    source: "calendly",
    attribution: "inbound",
    status: "won",
    segment: "inconnu",
    leadScore: 78,
    context: {},
    clientId: "client-cy1",
    createdAt: "2026-05-02T10:00:00Z",
    lastActivityAt: "2026-05-20T10:00:00Z",
  },
];

export const ALL_LEADS = [...LEADS, ...LEADS_OTHER];

// ---------------------------------------------------------------------
//  Lead activities
// ---------------------------------------------------------------------

export const LEAD_ACTIVITIES: LeadActivity[] = [
  {
    id: "act-1",
    leadId: "lead-001",
    type: "system",
    body: "Lead créé depuis le Test d'éligibilité IFICI, résultat R1 (éligible probable).",
    author: "Système",
    createdAt: "2026-06-02T08:21:00Z",
  },
  {
    id: "act-2",
    leadId: "lead-001",
    type: "email",
    body: "Email de bienvenue envoyé (copie du résultat IFICI + lien Calendly).",
    author: "Système",
    createdAt: "2026-06-02T08:22:00Z",
  },
  {
    id: "act-3",
    leadId: "lead-001",
    type: "call",
    body: "Échange gratuit effectué. Profil cohérent, projet < 12 mois. Demande un devis Lda.",
    author: "Audrey Marques",
    createdAt: "2026-06-05T16:00:00Z",
  },
  {
    id: "act-4",
    leadId: "lead-001",
    type: "status_change",
    body: "Statut : Contacté → Qualifié.",
    author: "Audrey Marques",
    createdAt: "2026-06-05T16:05:00Z",
  },
  {
    id: "act-5",
    leadId: "lead-001",
    type: "note",
    body: "Prévoir orientation fiscaliste partenaire pour sécuriser la demande IFICI (deadline 15 janvier).",
    author: "Audrey Marques",
    createdAt: "2026-06-08T15:40:00Z",
  },
  {
    id: "act-6",
    leadId: "lead-002",
    type: "system",
    body: "Lead créé depuis le formulaire du site.",
    author: "Système",
    createdAt: "2026-05-28T10:02:00Z",
  },
  {
    id: "act-7",
    leadId: "lead-002",
    type: "call",
    body: "Premier échange : Unipessoal Lda, veut avancer vite. Devis envoyé.",
    author: "Audrey Marques",
    createdAt: "2026-06-07T09:12:00Z",
  },
];

// ---------------------------------------------------------------------
//  Clients
// ---------------------------------------------------------------------

export const CLIENTS: Client[] = [
  {
    id: "client-001",
    orgId: "org-bp",
    leadId: "lead-005",
    fullName: "Sofia Almeida",
    email: "sofia.almeida@me.com",
    phone: "+351 91 555 21 09",
    companyNameWanted: "Almeida Global Trade",
    countryOfResidence: "Portugal",
    createdAt: "2026-05-22T16:00:00Z",
  },
  {
    id: "client-002",
    orgId: "org-bp",
    leadId: "lead-010",
    fullName: "Marc Antoine Dubreuil",
    email: "ma.dubreuil@gmail.com",
    phone: "+33 6 88 45 23 19",
    companyNameWanted: "MAD Studio",
    countryOfResidence: "France",
    createdAt: "2026-05-12T09:00:00Z",
  },
  {
    id: "client-003",
    orgId: "org-bp",
    leadId: "lead-011",
    fullName: "Inès Bouhaddi",
    email: "ines.bouhaddi@gmail.com",
    companyNameWanted: "Bouhaddi Retail",
    countryOfResidence: "France",
    createdAt: "2026-04-30T10:00:00Z",
  },
  {
    id: "client-cy1",
    orgId: "org-cyprus",
    leadId: "lead-c1",
    fullName: "Elena Petrou",
    email: "elena.petrou@gmail.com",
    createdAt: "2026-05-20T10:00:00Z",
  },
];

// ---------------------------------------------------------------------
//  Missions (avec tracker)
// ---------------------------------------------------------------------

export const MISSIONS: Mission[] = [
  {
    id: "mission-001",
    orgId: "org-bp",
    clientId: "client-001",
    leadId: "lead-005",
    ref: "BP-2026-014",
    type: "creation_societe",
    status: "active",
    companyForm: "lda",
    companyNameWanted: "Almeida Global Trade",
    nipc: "517998421",
    steps: buildTrackerSteps(
      {
        echange: "done",
        nif: "done",
        constitution: "done",
        certidao_rcbe_statuts: "in_progress",
        bancaire: "pending",
        compta: "pending",
      },
      {
        echange: "2026-05-22T16:00:00Z",
        nif: "2026-05-26T10:00:00Z",
        constitution: "2026-06-01T11:00:00Z",
      },
    ),
    startedAt: "2026-05-22T16:00:00Z",
    createdAt: "2026-05-22T16:00:00Z",
  },
  {
    id: "mission-002",
    orgId: "org-bp",
    clientId: "client-002",
    leadId: "lead-010",
    ref: "BP-2026-011",
    type: "creation_societe",
    status: "active",
    companyForm: "unipessoal_lda",
    companyNameWanted: "MAD Studio",
    nipc: "517865003",
    steps: buildTrackerSteps(
      {
        echange: "done",
        nif: "done",
        constitution: "in_progress",
        certidao_rcbe_statuts: "pending",
        bancaire: "pending",
        compta: "pending",
      },
      {
        echange: "2026-05-12T09:00:00Z",
        nif: "2026-05-18T10:00:00Z",
      },
    ),
    startedAt: "2026-05-12T09:00:00Z",
    createdAt: "2026-05-12T09:00:00Z",
  },
  {
    id: "mission-003",
    orgId: "org-bp",
    clientId: "client-003",
    leadId: "lead-011",
    ref: "BP-2026-006",
    type: "creation_societe",
    status: "completed",
    companyForm: "lda",
    companyNameWanted: "Bouhaddi Retail",
    nipc: "517540118",
    steps: buildTrackerSteps(
      {
        echange: "done",
        nif: "done",
        constitution: "done",
        certidao_rcbe_statuts: "done",
        bancaire: "done",
        compta: "done",
      },
      {
        echange: "2026-04-30T10:00:00Z",
        nif: "2026-05-03T10:00:00Z",
        constitution: "2026-05-08T10:00:00Z",
        certidao_rcbe_statuts: "2026-05-10T10:00:00Z",
        bancaire: "2026-05-18T10:00:00Z",
        compta: "2026-05-20T10:00:00Z",
      },
    ),
    startedAt: "2026-04-30T10:00:00Z",
    completedAt: "2026-05-20T10:00:00Z",
    createdAt: "2026-04-30T10:00:00Z",
  },
];

// ---------------------------------------------------------------------
//  Documents
// ---------------------------------------------------------------------

function buildPayload(
  clientName: string,
  clientEmail: string,
  companyForm: DocumentPayload["companyForm"],
  lines: HonoraireLine[] = DEFAULT_HONORAIRES,
): DocumentPayload {
  return {
    clientName,
    clientEmail,
    companyForm,
    lines,
    vatRate: DEFAULT_VAT_RATE,
    schedule: DEFAULT_SCHEDULE,
    scopeSections: DEFAULT_SCOPE_SECTIONS,
    clientObligations: DEFAULT_CLIENT_OBLIGATIONS,
    durationNote:
      "La mission débute dès réception de la lettre signée et du premier acompte. Elle se termine une fois la société immatriculée, le RCBE validé, le compte bancaire ouvert et la mise en relation comptable effectuée.",
    intro:
      "La présente lettre de mission définit les modalités de l'accompagnement proposé par Lovelyparallel, Lda (Business Portugal) dans le cadre de la création de votre société au Portugal, conformément à la proposition transmise.",
  };
}

function doc(partial: Omit<BusinessDocument, "totalHtCents" | "totalTtcCents">): BusinessDocument {
  const t = computeTotals(partial.payload.lines);
  return { ...partial, totalHtCents: t.totalHtCents, totalTtcCents: t.totalTtcCents };
}

export const DOCUMENTS: BusinessDocument[] = [
  // Mission 001, lettre de mission signée + facture acompte
  doc({
    id: "doc-001",
    orgId: "org-bp",
    missionId: "mission-001",
    clientId: "client-001",
    type: "lettre_mission",
    status: "signed",
    number: "LM-2026-014",
    title: "Lettre de mission, Création d'entreprise au Portugal",
    payload: buildPayload("Sofia Almeida", "sofia.almeida@me.com", "lda"),
    signature: {
      signerName: "Sofia Almeida",
      signerEmail: "sofia.almeida@me.com",
      signedAt: "2026-05-24T09:32:00Z",
      ip: "85.240.118.44",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) Safari/605.1.15",
      consentText:
        "En cochant cette case et en signant, j'accepte les termes de la présente lettre de mission.",
    },
    createdAt: "2026-05-22T17:00:00Z",
    sentAt: "2026-05-22T17:05:00Z",
    signedAt: "2026-05-24T09:32:00Z",
  }),
  doc({
    id: "doc-002",
    orgId: "org-bp",
    missionId: "mission-001",
    clientId: "client-001",
    type: "facture",
    status: "paid",
    number: "FA-2026-031",
    title: "Facture pro-forma, Acompte 50 %",
    payload: buildPayload("Sofia Almeida", "sofia.almeida@me.com", "lda"),
    createdAt: "2026-05-24T10:00:00Z",
    sentAt: "2026-05-24T10:05:00Z",
  }),
  // Mission 002, lettre de mission envoyée (en attente de signature)
  doc({
    id: "doc-003",
    orgId: "org-bp",
    missionId: "mission-002",
    clientId: "client-002",
    type: "lettre_mission",
    status: "sent",
    number: "LM-2026-011",
    title: "Lettre de mission, Création d'entreprise au Portugal",
    payload: buildPayload("Marc Antoine Dubreuil", "ma.dubreuil@gmail.com", "unipessoal_lda"),
    createdAt: "2026-05-12T10:00:00Z",
    sentAt: "2026-05-12T10:15:00Z",
  }),
  // Mission 003, terminée : lettre signée + 2 factures payées
  doc({
    id: "doc-004",
    orgId: "org-bp",
    missionId: "mission-003",
    clientId: "client-003",
    type: "lettre_mission",
    status: "signed",
    number: "LM-2026-006",
    title: "Lettre de mission, Création d'entreprise au Portugal",
    payload: buildPayload("Inès Bouhaddi", "ines.bouhaddi@gmail.com", "lda"),
    signature: {
      signerName: "Inès Bouhaddi",
      signerEmail: "ines.bouhaddi@gmail.com",
      signedAt: "2026-04-30T18:00:00Z",
      ip: "92.184.105.7",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/137.0",
      consentText:
        "En cochant cette case et en signant, j'accepte les termes de la présente lettre de mission.",
    },
    createdAt: "2026-04-30T11:00:00Z",
    sentAt: "2026-04-30T11:10:00Z",
    signedAt: "2026-04-30T18:00:00Z",
  }),
  // Mission 001, contrat d'accompagnement envoyé, en attente de signature client (démo portail)
  doc({
    id: "doc-005",
    orgId: "org-bp",
    missionId: "mission-001",
    clientId: "client-001",
    type: "contrat",
    status: "sent",
    number: "CT-2026-014",
    title: "Contrat d'accompagnement, Création de société",
    payload: buildPayload("Sofia Almeida", "sofia.almeida@me.com", "lda"),
    createdAt: "2026-05-22T17:10:00Z",
    sentAt: "2026-05-22T17:12:00Z",
  }),
];

// ---------------------------------------------------------------------
//  Fichiers client (upload, mission 001)
// ---------------------------------------------------------------------

export const CLIENT_FILES: ClientFile[] = FILE_REQUIREMENTS.map((req, i) => {
  // mission-001 : 4 reçus/validés, le reste attendu
  const statuses = [
    "validated",
    "validated",
    "uploaded",
    "validated",
    "requested",
    "requested",
    "requested",
  ] as const;
  const names = [
    "passeport_almeida.pdf",
    "justif_domicile_almeida.pdf",
    "objet_activite.docx",
    "capital_1000.pdf",
    undefined,
    undefined,
    undefined,
  ];
  return {
    id: `file-001-${i}`,
    orgId: "org-bp",
    missionId: "mission-001",
    kind: req.kind,
    label: req.label,
    hint: req.hint,
    status: statuses[i],
    fileName: names[i],
    uploadedAt: names[i] ? "2026-05-25T10:00:00Z" : undefined,
  };
});

// ---------------------------------------------------------------------
//  Billing events (Propul'SEO → consultants)
// ---------------------------------------------------------------------

export const BILLING_EVENTS: BillingEvent[] = [
  {
    id: "be-1",
    orgId: "org-bp",
    type: "subscription",
    label: "Abonnement Pro, juin 2026",
    amountCents: 19900,
    period: "2026-06",
    status: "invoiced",
    createdAt: "2026-06-01T00:00:00Z",
  },
  {
    id: "be-2",
    orgId: "org-bp",
    type: "signed_client",
    missionId: "mission-001",
    label: "Client signé, Sofia Almeida (lead inbound · Calendly)",
    amountCents: 15000,
    period: "2026-05",
    status: "paid",
    createdAt: "2026-05-24T09:32:00Z",
  },
  {
    id: "be-3",
    orgId: "org-bp",
    type: "subscription",
    label: "Abonnement Pro, mai 2026",
    amountCents: 19900,
    period: "2026-05",
    status: "paid",
    createdAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "be-4",
    orgId: "org-cyprus",
    type: "subscription",
    label: "Abonnement Scale, juin 2026",
    amountCents: 29900,
    period: "2026-06",
    status: "invoiced",
    createdAt: "2026-06-01T00:00:00Z",
  },
  {
    id: "be-5",
    orgId: "org-cyprus",
    type: "signed_client",
    label: "Client signé, Elena Petrou (lead inbound · Calendly)",
    amountCents: 18000,
    period: "2026-05",
    status: "paid",
    createdAt: "2026-05-20T10:00:00Z",
  },
  {
    id: "be-6",
    orgId: "org-malta",
    type: "subscription",
    label: "Abonnement Starter, juin 2026 (essai)",
    amountCents: 0,
    period: "2026-06",
    status: "pending",
    createdAt: "2026-06-01T00:00:00Z",
  },
];
