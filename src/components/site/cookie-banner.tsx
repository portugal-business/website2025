"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

// Bannière de consentement MAISON, conforme aux recommandations CNIL / position CNPD.
// - Choix : tout accepter / tout refuser / personnaliser.
// - Conservation du choix 6 mois (au-delà, re-demande).
// - Conditionne les tiers (Calendly et tout futur embed) au consentement via
//   getConsent()/onConsentChange(), Plausible reste hors champ (sans cookie).
// Aligné sur ce que déclare la page « Politique de confidentialité » (§ cookies).

const STORAGE_KEY = "bp-cookie-consent";
const VERSION = 1;
const TTL_MS = 1000 * 60 * 60 * 24 * 180; // 6 mois
const OPEN_EVENT = "bp-open-cookie-settings";
const CHANGE_EVENT = "bp-consent-change";

export type Consent = { v: number; ts: number; calendly: boolean };

// ── API de consentement (réutilisable par d'éventuels embeds tiers) ─────────
export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.v !== VERSION || typeof c.ts !== "number" || Date.now() - c.ts > TTL_MS) return null;
    return c;
  } catch {
    return null;
  }
}

function saveConsent(calendly: boolean) {
  const c: Consent = { v: VERSION, ts: Date.now(), calendly };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    // ignore (mode privé / quota)
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: c }));
}

// Lien « Gérer mes cookies » (pied de page) : rouvre la bannière.
export function ManageCookiesLink({ className }: { className?: string }) {
  const locale = useLocale();
  const label = locale === "en" ? "Manage cookies" : "Gérer mes cookies";
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className ?? "transition-colors hover:text-foreground"}
    >
      {label}
    </button>
  );
}

const COPY = {
  fr: {
    title: "Cookies & vie privée",
    body: "Nous utilisons des traceurs strictement nécessaires et, avec votre accord, des services tiers (ex. réservation Calendly). Notre mesure d'audience (Plausible) ne dépose aucun cookie. Vous pouvez accepter, refuser ou personnaliser.",
    privacy: "Politique de confidentialité",
    acceptAll: "Tout accepter",
    refuseAll: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    necessaryLabel: "Strictement nécessaires",
    necessaryDesc:
      "Indispensables au fonctionnement du site (mémorisation de votre choix). Toujours actifs.",
    calendlyLabel: "Réservation en ligne (Calendly)",
    calendlyDesc:
      "Autorise le service tiers Calendly et ses cookies lors de la prise de rendez-vous.",
    always: "Toujours actifs",
  },
  en: {
    title: "Cookies & privacy",
    body: "We use strictly necessary trackers and, with your consent, third-party services (e.g. Calendly booking). Our analytics (Plausible) sets no cookie. You can accept, refuse or customise.",
    privacy: "Privacy policy",
    acceptAll: "Accept all",
    refuseAll: "Refuse all",
    customize: "Customise",
    save: "Save my choices",
    necessaryLabel: "Strictly necessary",
    necessaryDesc: "Essential for the site to work (storing your choice). Always on.",
    calendlyLabel: "Online booking (Calendly)",
    calendlyDesc: "Allows the Calendly third-party service and its cookies when booking a meeting.",
    always: "Always on",
  },
} as const;

export function CookieBanner({ locale }: { locale: string }) {
  const c = locale === "en" ? COPY.en : COPY.fr;
  const privacyHref = `/${locale === "en" ? "en" : "fr"}/confidentialite`;
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [calendly, setCalendly] = useState(false);

  useEffect(() => {
    // Affiche la bannière si aucun choix valide n'est enregistré.
    if (!getConsent()) setOpen(true);
    const reopen = () => {
      const existing = getConsent();
      setCalendly(existing?.calendly ?? false);
      setShowDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (value: boolean) => {
    saveConsent(value);
    setOpen(false);
    setShowDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={c.title}
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-border bg-card/95 backdrop-blur-md"
    >
      <div className="rule-brass" />
      <div className="mx-auto max-w-6xl px-5 py-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.16em] text-accent">{c.title}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {c.body}{" "}
              <a
                href={privacyHref}
                className="text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                {c.privacy}
              </a>
              .
            </p>

            {showDetails ? (
              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.necessaryLabel}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {c.necessaryDesc}
                    </p>
                  </div>
                  <span className="shrink-0 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.always}
                  </span>
                </div>
                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {c.calendlyLabel}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {c.calendlyDesc}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={calendly}
                    onChange={(e) => setCalendly(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-accent"
                  />
                </label>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            {showDetails ? (
              <button
                type="button"
                onClick={() => decide(calendly)}
                className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-6 font-sans text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {c.save}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => decide(true)}
                className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-6 font-sans text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {c.acceptAll}
              </button>
            )}
            <button
              type="button"
              onClick={() => decide(false)}
              className="inline-flex h-11 items-center justify-center rounded-sm border border-border px-6 font-sans text-sm text-foreground transition-colors hover:bg-muted"
            >
              {c.refuseAll}
            </button>
            {!showDetails ? (
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="inline-flex h-11 items-center justify-center px-3 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
              >
                {c.customize}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
