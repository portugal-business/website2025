import type { HonoraireLine } from "@/platform/types";

export interface DocTotals {
  totalHtCents: number;
  totalVatCents: number;
  totalTtcCents: number;
}

/** Calcule HT / TVA / TTC à partir des lignes (TVA par ligne). */
export function computeTotals(lines: HonoraireLine[]): DocTotals {
  let ht = 0;
  let vat = 0;
  for (const l of lines) {
    ht += l.amountCents;
    vat += Math.round(l.amountCents * l.vatRate);
  }
  return { totalHtCents: ht, totalVatCents: vat, totalTtcCents: ht + vat };
}
