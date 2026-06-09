"use client";

import { ArrowRight, Check, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LEAD_STATUS, LEAD_STATUS_ORDER } from "@/platform/lib/constants";
import type { LeadStatus } from "@/platform/types";

export function LeadActionsPanel({
  leadId,
  initialStatus,
  alreadyConverted,
}: {
  leadId: string;
  initialStatus: LeadStatus;
  alreadyConverted: boolean;
}) {
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [note, setNote] = useState("");
  const [addedNotes, setAddedNotes] = useState<string[]>([]);

  return (
    <div className="space-y-5">
      {/* Statut */}
      <div>
        <p className="mb-2 font-sans text-xs font-semibold text-foreground">Statut du lead</p>
        <div className="flex flex-wrap gap-1.5">
          {LEAD_STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-sans text-xs font-medium transition-colors",
                status === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/30",
              )}
            >
              {status === s ? <Check className="h-3 w-3" /> : null}
              {LEAD_STATUS[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Convertir */}
      {!alreadyConverted ? (
        <Link
          href={`/app/documents/new?lead=${leadId}`}
          className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}
        >
          Convertir → lettre de mission
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-2 rounded-sm border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <Check className="h-4 w-4 text-accent" /> Lead déjà converti en client.
        </div>
      )}

      {/* Note rapide */}
      <div>
        <p className="mb-2 font-sans text-xs font-semibold text-foreground">Ajouter une note</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Compte-rendu d'appel, prochaine action…"
          className="min-h-[70px] w-full resize-y rounded-sm border border-input bg-background px-3 py-2 font-sans text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="button"
          disabled={!note.trim()}
          onClick={() => {
            if (!note.trim()) return;
            setAddedNotes((n) => [note.trim(), ...n]);
            setNote("");
          }}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-2 w-full")}
        >
          <Send className="h-3.5 w-3.5" />
          Enregistrer la note
        </button>
        {addedNotes.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {addedNotes.map((n) => (
              <li
                key={n}
                className="rounded-sm border border-border bg-card px-3 py-2 text-xs text-muted-foreground"
              >
                {n}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
