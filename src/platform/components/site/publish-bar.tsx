"use client";

// Barre de publication du CMS : état brouillon vs publié, bouton Publier,
// annulation des modifications. Phase mock : la publication alimente
// l'aperçu interne (le câblage du site public arrive avec Supabase).

import { CloudUpload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publishSiteAction, revertSiteDraftAction } from "@/platform/cms/actions";
import { SITE_SECTION_META } from "@/platform/cms/constants";
import { Badge } from "@/platform/components/ui/badge";
import type { SiteSectionKey } from "@/platform/types";
import { ConfirmButton, useEditorSave } from "./editor-bits";

export function PublishBar({
  dirtySections,
  publishedAtLabel,
}: {
  dirtySections: SiteSectionKey[];
  publishedAtLabel?: string;
}) {
  const { pending, result, run } = useEditorSave();
  const dirty = dirtySections.length > 0;

  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
        {dirty ? (
          <Badge tone="warning" dot>
            {dirtySections.length} section{dirtySections.length > 1 ? "s" : ""} modifiée
            {dirtySections.length > 1 ? "s" : ""} non publiée{dirtySections.length > 1 ? "s" : ""}
          </Badge>
        ) : (
          <Badge tone="success" dot>
            Site à jour
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">
          {dirty
            ? dirtySections.map((k) => SITE_SECTION_META[k].label).join(" · ")
            : publishedAtLabel
              ? `Dernière publication : ${publishedAtLabel}`
              : "Aucune publication pour le moment"}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {dirty ? (
            <ConfirmButton
              label="Annuler les modifs"
              confirmLabel="Revenir au publié ?"
              disabled={pending}
              variant="ghost"
              onConfirm={() => run(() => revertSiteDraftAction())}
            />
          ) : null}
          <Button
            type="button"
            size="sm"
            disabled={!dirty || pending}
            onClick={() => run(() => publishSiteAction())}
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CloudUpload className="h-4 w-4" />
            )}
            Publier les modifications
          </Button>
        </div>
      </div>
      {result && !result.ok ? (
        <p className="border-border border-t px-5 py-2 font-sans text-xs font-semibold text-[color:var(--tone-danger-fg)]">
          {result.error}
        </p>
      ) : null}
      <p className="border-border border-t px-5 py-2 text-xs text-muted-foreground">
        Démo : la publication met à jour l'aperçu interne. La mise en ligne réelle sur le site
        public sera branchée avec Supabase.
      </p>
    </div>
  );
}
