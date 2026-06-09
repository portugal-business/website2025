// Agrégateur des articles « francophone à l'étranger » (plan SEO/GEO, Lot 4).
// Un module = un article (fichiers disjoints). L'ordre ici n'a pas d'importance :
// le tri d'affichage se fait par datePublished (cf. getSortedArticles).
import type { Article } from "@/data/article-types";
import { belgiqueVsPortugal } from "./belgique-vs-portugal-creer-entreprise";
import { conventionFiscaleFrancePortugal } from "./convention-fiscale-france-portugal";
import { aDistanceGuide } from "./creer-societe-portugal-a-distance-guide";
import { exitTaxFrancePortugal } from "./exit-tax-france-portugal";
import { facturerClientsFrancais } from "./facturer-clients-francais-depuis-portugal";
import { fiscaliteFrancePortugal } from "./fiscalite-france-portugal-entreprise";
import { ificiSelonPays } from "./ifici-2026-selon-pays-origine";
import { quitterFrancePourPortugal } from "./quitter-la-france-pour-le-portugal";
import { residenceFiscaleFrancePortugal } from "./residence-fiscale-france-portugal";
import { residentBelgeTaxeCaiman } from "./resident-belge-societe-portugal-taxe-caiman";
import { suisseVsPortugal } from "./suisse-vs-portugal-entrepreneur";

export const francophoneArticles: Article[] = [
  // Vague 1 — France
  fiscaliteFrancePortugal,
  quitterFrancePourPortugal,
  exitTaxFrancePortugal,
  facturerClientsFrancais,
  conventionFiscaleFrancePortugal,
  residenceFiscaleFrancePortugal,
  // Vague 2 + transversal — Belgique / Suisse / IFICI / à distance
  belgiqueVsPortugal,
  residentBelgeTaxeCaiman,
  suisseVsPortugal,
  ificiSelonPays,
  aDistanceGuide,
];
