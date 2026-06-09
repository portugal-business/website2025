"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocumentPreview } from "@/platform/components/documents/document-preview";
import { Field, Input, Select } from "@/platform/components/ui/field";
import {
  DEFAULT_CLIENT_OBLIGATIONS,
  DEFAULT_HONORAIRES,
  DEFAULT_SCHEDULE,
  DEFAULT_SCOPE_SECTIONS,
  DEFAULT_VAT_RATE,
} from "@/platform/lib/constants";
import { REFERENCE_NOW } from "@/platform/lib/format";
import { computeTotals } from "@/platform/lib/honoraires";
import type { BusinessDocument, CompanyForm, HonoraireLine } from "@/platform/types";

interface LineDraft {
  id: string;
  label: string;
  euros: string;
}

export function LettreGenerator({
  prefill,
}: {
  prefill: { clientName: string; clientEmail: string; companyForm: CompanyForm };
}) {
  const [clientName, setClientName] = useState(prefill.clientName);
  const [clientEmail, setClientEmail] = useState(prefill.clientEmail);
  const [companyForm, setCompanyForm] = useState<CompanyForm>(prefill.companyForm);
  const [lines, setLines] = useState<LineDraft[]>(
    DEFAULT_HONORAIRES.map((l, i) => ({
      id: `line-${i}`,
      label: l.label,
      euros: String(l.amountCents / 100),
    })),
  );
  const nextId = useRef(DEFAULT_HONORAIRES.length);
  const [generated, setGenerated] = useState(false);

  const honoraires: HonoraireLine[] = useMemo(
    () =>
      lines.map((l) => ({
        label: l.label,
        amountCents: Math.round((Number.parseFloat(l.euros) || 0) * 100),
        vatRate: DEFAULT_VAT_RATE,
      })),
    [lines],
  );

  const totals = computeTotals(honoraires);

  const draft: BusinessDocument = useMemo(
    () => ({
      id: "draft",
      orgId: "org-bp",
      missionId: "",
      clientId: "",
      type: "lettre_mission",
      status: "draft",
      number: "LM-2026-•••",
      title: "Lettre de mission, Création d'entreprise au Portugal",
      payload: {
        clientName: clientName || "-",
        clientEmail: clientEmail || "-",
        companyForm,
        lines: honoraires,
        vatRate: DEFAULT_VAT_RATE,
        schedule: DEFAULT_SCHEDULE,
        scopeSections: DEFAULT_SCOPE_SECTIONS,
        clientObligations: DEFAULT_CLIENT_OBLIGATIONS,
        durationNote:
          "La mission débute dès réception de la lettre signée et du premier acompte. Elle se termine une fois la société immatriculée, le RCBE validé, le compte bancaire ouvert et la mise en relation comptable effectuée.",
        intro:
          "La présente lettre de mission définit les modalités de l'accompagnement proposé par Lovelyparallel, Lda (Business Portugal) dans le cadre de la création de votre société au Portugal, conformément à la proposition transmise.",
      },
      totalHtCents: totals.totalHtCents,
      totalTtcCents: totals.totalTtcCents,
      createdAt: REFERENCE_NOW.toISOString(),
    }),
    [clientName, clientEmail, companyForm, honoraires, totals],
  );

  function updateLine(id: string, patch: Partial<LineDraft>) {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  if (generated) {
    return (
      <div className="mx-auto max-w-md rounded-md border border-border bg-card p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[color:var(--tone-success-bg)] text-[color:var(--tone-success-fg)]">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="display mt-4 text-xl text-foreground">Lettre de mission générée</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Le brouillon pour <span className="font-semibold text-foreground">{clientName}</span> est
          prêt. À la migration, l'envoi déclenchera l'e-mail Brevo et l'invitation au portail
          client.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Link
            href="/app/documents"
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            Voir les documents
          </Link>
          <button
            type="button"
            onClick={() => setGenerated(false)}
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            Modifier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      {/* Formulaire */}
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setGenerated(true);
        }}
      >
        <div className="rounded-md border border-border bg-card p-5">
          <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">Client</h3>
          <div className="space-y-3">
            <Field label="Nom du client" htmlFor="cn">
              <Input
                id="cn"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </Field>
            <Field label="E-mail" htmlFor="ce">
              <Input
                id="ce"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />
            </Field>
            <Field label="Forme juridique" htmlFor="cf">
              <Select
                id="cf"
                value={companyForm}
                onChange={(e) => setCompanyForm(e.target.value as CompanyForm)}
              >
                <option value="unipessoal_lda">Unipessoal Lda (associé unique)</option>
                <option value="lda">Lda (plusieurs associés)</option>
                <option value="sa">SA</option>
              </Select>
            </Field>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-sm font-semibold text-foreground">Honoraires</h3>
            <span className="font-sans text-xs text-muted-foreground">
              HT · TVA {Math.round(DEFAULT_VAT_RATE * 100)} %
            </span>
          </div>
          <div className="space-y-2.5">
            {lines.map((l) => (
              <div key={l.id} className="flex items-start gap-2">
                <div className="flex-1">
                  <Input
                    value={l.label}
                    onChange={(e) => updateLine(l.id, { label: e.target.value })}
                    aria-label="Libellé"
                  />
                </div>
                <div className="w-28">
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      step="10"
                      value={l.euros}
                      onChange={(e) => updateLine(l.id, { euros: e.target.value })}
                      aria-label="Montant en euros"
                      className="pr-7 text-right"
                    />
                    <span className="-translate-y-1/2 absolute top-1/2 right-2.5 text-xs text-muted-foreground">
                      €
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLines((ls) => ls.filter((x) => x.id !== l.id))}
                  aria-label="Supprimer la ligne"
                  className="mt-1 grid h-8 w-8 flex-none place-items-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setLines((ls) => [
                ...ls,
                { id: `line-${nextId.current++}`, label: "Nouvelle prestation", euros: "0" },
              ])
            }
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mt-3")}
          >
            <Plus className="h-4 w-4" /> Ajouter une ligne
          </button>

          <div className="mt-4 space-y-1 border-border border-t pt-3 text-sm">
            <Row label="Total HT" value={fmt(totals.totalHtCents)} />
            <Row
              label={`TVA ${Math.round(DEFAULT_VAT_RATE * 100)} %`}
              value={fmt(totals.totalVatCents)}
              muted
            />
            <Row label="Total TTC" value={fmt(totals.totalTtcCents)} strong />
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Générer la lettre de mission
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Échéancier 50 % / 50 % et clauses (objet, obligations, durée) repris du modèle Lovely
          Parallel, modifiables à la migration.
        </p>
      </form>

      {/* Aperçu live */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <p className="mb-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Aperçu en direct
        </p>
        <div className="max-h-[78vh] overflow-y-auto rounded-md">
          <DocumentPreview doc={draft} />
        </div>
      </div>
    </div>
  );
}

function fmt(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn("text-muted-foreground", strong && "font-semibold text-foreground")}>
        {label}
      </span>
      <span
        className={cn(
          "tnum",
          muted ? "text-muted-foreground" : "text-foreground",
          strong && "font-bold text-accent",
        )}
      >
        {value}
      </span>
    </div>
  );
}
