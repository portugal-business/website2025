"use client";

import { Check, PenLine, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDateLong, REFERENCE_NOW } from "@/platform/lib/format";

const CONSENT_TEXT =
  "En cochant cette case et en signant, j'accepte les termes du présent document.";

export function SignFlow({
  signerName,
  documentLabel,
}: {
  signerName: string;
  documentLabel: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const [typed, setTyped] = useState("");
  const [signed, setSigned] = useState(false);

  const nameOk = typed.trim().toLowerCase() === signerName.trim().toLowerCase();

  if (signed) {
    return (
      <div className="rounded-md border border-[color:var(--tone-success-fg)]/30 bg-[color:var(--tone-success-bg)] p-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--tone-success-fg)] text-card">
            <Check className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-sm font-semibold text-foreground">Document signé</p>
            <p className="text-xs text-muted-foreground">
              {formatDateLong(REFERENCE_NOW.toISOString())}
            </p>
          </div>
        </div>
        <dl className="mt-4 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Signataire</dt>
            <dd className="font-semibold text-foreground">{signerName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Horodatage</dt>
            <dd className="text-foreground">
              {formatDateLong(REFERENCE_NOW.toISOString())} · 10:24
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Preuve</dt>
            <dd className="text-foreground">IP + navigateur enregistrés</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          Une copie vous a été envoyée par e-mail. Votre consultante en est informée.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2.5 rounded-sm border border-accent/30 bg-accent/[0.06] px-3 py-2.5">
        <PenLine className="mt-0.5 h-4 w-4 flex-none text-accent" />
        <p className="text-xs text-muted-foreground">
          Lisez le document ci-contre, puis signez électroniquement {documentLabel}. C'est une
          signature à valeur probante (horodatage + traçabilité).
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-none accent-[color:var(--primary)]"
        />
        <span className="text-xs text-muted-foreground">{CONSENT_TEXT}</span>
      </label>

      <div>
        <label
          htmlFor="sign-name"
          className="mb-1.5 block font-sans text-xs font-semibold text-foreground"
        >
          Tapez votre nom complet pour signer
        </label>
        <input
          id="sign-name"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder={signerName}
          className="w-full rounded-sm border border-input bg-background px-3 py-2 font-serif text-lg text-foreground italic placeholder:text-muted-foreground/50 placeholder:not-italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {typed && !nameOk ? (
          <p className="mt-1 text-xs text-[color:var(--tone-danger-fg)]">
            Le nom doit correspondre à « {signerName} ».
          </p>
        ) : null}
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        disabled={!agreed || !nameOk}
        onClick={() => setSigned(true)}
        className={cn("w-full", (!agreed || !nameOk) && "opacity-50")}
      >
        <ShieldCheck className="h-4 w-4" />
        Signer le document
      </Button>
      <p className="text-center text-[0.7rem] text-muted-foreground">
        Sans engagement de délai · signature conforme eIDAS (niveau simple).
      </p>
    </div>
  );
}
