// Calcul DÉTERMINISTE du coût employeur d'un salarié au Portugal, millésime 2026.
// Fonction pure, sans dépendance, testable. Toutes les constantes sont datées et
// exposées à l'utilisateur (transparence DGCCRF). YMYL : valeurs INDICATIVES,
// à valider par un Contabilista Certificado partenaire avant toute décision.

export const PARAMS_PAIE_PT_2026 = {
  annee: 2026,
  tsuEmployeur: 0.2375, // 23,75 % part patronale, Segurança Social (seg-social.pt)
  tsuSalarie: 0.11, // 11 % part salariale (info ; n'entre PAS dans le coût employeur)
  moisParAnDefaut: 14, // 12 + subsídio de férias + subsídio de Natal (Código do Trabalho)
  repasCartePlafondJour: 10.2, // €/jour exonéré, versé sur carte/titre repas (AT)
  repasEspecesPlafondJour: 6.0, // €/jour exonéré, versé en espèces (AT)
  repasMoisTravailles: 11, // mois effectivement travaillés (congés déduits)
  tauxAccidentDefaut: 0.01, // ~1 % de la masse salariale (bureau/services)
  salaireMinimumMensuel: 870, // ≈ 870 €/mois 2026 (Orçamento do Estado / Diário da República)
  chargesPatronalesFranceIndicatif: 0.42, // ≈ +42 % (estimation indicative, DGCCRF/URSSAF)
} as const;

export type RepasMode = "carte" | "especes" | "aucune";

export interface CoutSalarieInput {
  brutMensuel: number; // ≥ 870
  moisSalaire: 12 | 14;
  repas: RepasMode;
  joursRepas: number; // 0-31
  tauxAccident: number; // 0-0.05
  nbSalaries: number; // ≥ 1
  comparerFrance: boolean;
}

export interface CoutSalarieResult {
  annee: number;
  parSalarie: {
    brutAnnuel: number;
    tsuAnnuelle: number;
    repasAnnuel: number;
    assuranceAnnuelle: number;
    coutAnnuel: number;
    coutMensuelLisse: number;
    ratioCoutBrut: number; // ex. 1.26
    surcoutPct: number; // ex. 26
  };
  ventilation: {
    salaireBrut: number;
    tsuEmployeur: number;
    subsidios: number; // mois 13 & 14 isolés (déjà compris dans brutAnnuel)
    repas: number;
    assurance: number;
  };
  total: { coutAnnuel: number; coutMensuel: number; nbSalaries: number };
  comparatifFrance?: { coutFranceIndicatif: number; ecartIndicatif: number };
}

function repasValeurJour(mode: RepasMode): number {
  if (mode === "carte") return PARAMS_PAIE_PT_2026.repasCartePlafondJour;
  if (mode === "especes") return PARAMS_PAIE_PT_2026.repasEspecesPlafondJour;
  return 0;
}

export const DEFAULT_INPUT: CoutSalarieInput = {
  brutMensuel: 1200,
  moisSalaire: 14,
  repas: "carte",
  joursRepas: 22,
  tauxAccident: PARAMS_PAIE_PT_2026.tauxAccidentDefaut,
  nbSalaries: 1,
  comparerFrance: false,
};

export function computeCoutSalarie(input: CoutSalarieInput): CoutSalarieResult {
  const p = PARAMS_PAIE_PT_2026;
  const B = Math.max(0, input.brutMensuel);
  const M = input.moisSalaire;
  const Vr = input.repas === "aucune" ? 0 : repasValeurJour(input.repas);
  const Jr = input.repas === "aucune" ? 0 : Math.max(0, Math.min(31, input.joursRepas));
  const Ta = Math.max(0, Math.min(0.05, input.tauxAccident));
  const N = Math.max(1, Math.floor(input.nbSalaries));

  const brutAnnuel = B * M;
  const tsuAnnuelle = brutAnnuel * p.tsuEmployeur;
  const repasAnnuel = Jr * Vr * p.repasMoisTravailles;
  const assuranceAnnuelle = brutAnnuel * Ta;
  const coutAnnuel = brutAnnuel + tsuAnnuelle + repasAnnuel + assuranceAnnuelle;

  const ratioCoutBrut = brutAnnuel > 0 ? coutAnnuel / brutAnnuel : 0;

  const result: CoutSalarieResult = {
    annee: p.annee,
    parSalarie: {
      brutAnnuel,
      tsuAnnuelle,
      repasAnnuel,
      assuranceAnnuelle,
      coutAnnuel,
      coutMensuelLisse: coutAnnuel / 12,
      ratioCoutBrut,
      surcoutPct: (ratioCoutBrut - 1) * 100,
    },
    ventilation: {
      salaireBrut: brutAnnuel,
      tsuEmployeur: tsuAnnuelle,
      subsidios: B * Math.max(0, M - 12),
      repas: repasAnnuel,
      assurance: assuranceAnnuelle,
    },
    total: { coutAnnuel: coutAnnuel * N, coutMensuel: (coutAnnuel * N) / 12, nbSalaries: N },
  };

  if (input.comparerFrance) {
    const coutFranceIndicatif = B * 12 * (1 + p.chargesPatronalesFranceIndicatif);
    result.comparatifFrance = {
      coutFranceIndicatif,
      ecartIndicatif: coutFranceIndicatif - coutAnnuel,
    };
  }

  return result;
}
