// Formatage FR, montants en centimes, dates, pourcentages.

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eur2 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Centimes → "1 234 €" (arrondi). */
export function formatCents(cents: number): string {
  return eur.format(cents / 100);
}

/** Centimes → "1 234,00 €". */
export function formatCents2(cents: number): string {
  return eur2.format(cents / 100);
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateLong = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatDateLong(iso: string): string {
  return dateLong.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTimeFmt.format(new Date(iso));
}

/** "il y a 3 jours", relatif, déterministe par rapport à `now`. */
export function formatRelative(iso: string, now: Date = REFERENCE_NOW): string {
  const diff = now.getTime() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `il y a ${days} j`;
  const months = Math.round(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  return `il y a ${Math.round(months / 12)} an(s)`;
}

export function formatPct(value: number, digits = 0): string {
  return `${value.toFixed(digits).replace(".", ",")} %`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

// Référence temporelle stable pour le mock (pas de Date.now() non déterministe).
export const REFERENCE_NOW = new Date("2026-06-09T10:00:00Z");
