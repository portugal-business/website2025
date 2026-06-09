"use client";

import { BellRing, Check, Download, Send } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DocumentStatus, DocumentType } from "@/platform/types";

export function DocumentActions({ status, type }: { status: DocumentStatus; type: DocumentType }) {
  const [toast, setToast] = useState<string | null>(null);

  function fire(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }

  const isLettre = type === "lettre_mission";

  return (
    <div className="space-y-2.5">
      {status === "draft" && isLettre ? (
        <button
          type="button"
          onClick={() => fire("Lettre de mission envoyée au client (e-mail Brevo simulé).")}
          className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}
        >
          <Send className="h-4 w-4" /> Envoyer au client
        </button>
      ) : null}

      {status === "sent" && isLettre ? (
        <button
          type="button"
          onClick={() => fire("Relance envoyée au client.")}
          className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}
        >
          <BellRing className="h-4 w-4" /> Relancer le client
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => fire("Génération du PDF (sera branchée à @react-pdf à la migration).")}
        className={cn(buttonVariants({ variant: "outline", size: "md" }), "w-full")}
      >
        <Download className="h-4 w-4" /> Télécharger le PDF
      </button>

      {toast ? (
        <div className="flex items-center gap-2 rounded-sm border border-[color:var(--tone-success-fg)]/30 bg-[color:var(--tone-success-bg)] px-3 py-2 text-xs text-foreground">
          <Check className="h-3.5 w-3.5 text-[color:var(--tone-success-fg)]" />
          {toast}
        </div>
      ) : null}
    </div>
  );
}
