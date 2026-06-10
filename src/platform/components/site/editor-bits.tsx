"use client";

// Primitives partagées des éditeurs CMS : onglet de langue, champs
// bilingues, feedback d'enregistrement, contrôles de liste, confirmation.

import { ArrowDown, ArrowUp, Check, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/platform/cms/actions";
import { Input, Textarea } from "@/platform/components/ui/field";
import type { Localized } from "@/platform/types";

export type EditorLang = "fr" | "en";

// --- Langue ------------------------------------------------------------

export function LangTabs({
  lang,
  onChange,
  className,
}: {
  lang: EditorLang;
  onChange: (lang: EditorLang) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex rounded-sm border border-border bg-background p-0.5 font-sans text-xs font-semibold",
        className,
      )}
      role="tablist"
      aria-label="Langue du contenu"
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          role="tab"
          aria-selected={lang === l}
          onClick={() => onChange(l)}
          className={cn(
            "rounded-[3px] px-3 py-1 uppercase tracking-[0.08em] transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// --- Champs bilingues ----------------------------------------------------

export function LocInput({
  value,
  lang,
  onChange,
  placeholder,
}: {
  value: Localized;
  lang: EditorLang;
  onChange: (next: Localized) => void;
  placeholder?: string;
}) {
  return (
    <Input
      value={value[lang]}
      placeholder={placeholder}
      onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
    />
  );
}

export function LocTextarea({
  value,
  lang,
  onChange,
  rows,
  className,
}: {
  value: Localized;
  lang: EditorLang;
  onChange: (next: Localized) => void;
  rows?: number;
  className?: string;
}) {
  return (
    <Textarea
      value={value[lang]}
      rows={rows}
      className={className}
      onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
    />
  );
}

// --- Enregistrement -------------------------------------------------------

/** Lance une Server Action et garde son résultat pour le feedback UI. */
export function useEditorSave() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const run = (fn: () => Promise<ActionResult>) => {
    setResult(null);
    startTransition(async () => {
      setResult(await fn());
    });
  };
  return { pending, result, run };
}

export function SaveRow({
  pending,
  result,
  onSave,
  label = "Enregistrer le brouillon",
}: {
  pending: boolean;
  result: ActionResult | null;
  onSave: () => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-border border-t pt-4">
      <Button type="button" variant="solid" size="sm" disabled={pending} onClick={onSave}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {label}
      </Button>
      {result?.ok ? (
        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-foreground">
          <Check className="h-3.5 w-3.5 text-accent" /> Brouillon enregistré
        </span>
      ) : null}
      {result && !result.ok ? (
        <span className="font-sans text-xs font-semibold text-[color:var(--tone-danger-fg)]">
          {result.error}
        </span>
      ) : null}
      <span className="ml-auto text-xs text-muted-foreground">
        Visible sur le site après publication
      </span>
    </div>
  );
}

// --- Listes (repeaters) ----------------------------------------------------

export function RowControls({
  onUp,
  onDown,
  onRemove,
  canUp,
  canDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  canUp: boolean;
  canDown: boolean;
}) {
  const btn =
    "grid h-7 w-7 place-items-center rounded-sm border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35 disabled:hover:text-muted-foreground";
  return (
    <div className="flex flex-none items-center gap-1">
      <button type="button" className={btn} onClick={onUp} disabled={!canUp} aria-label="Monter">
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        className={btn}
        onClick={onDown}
        disabled={!canDown}
        aria-label="Descendre"
      >
        <ArrowDown className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        className={cn(btn, "hover:text-[color:var(--tone-danger-fg)]")}
        onClick={onRemove}
        aria-label="Supprimer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/** Mutations immuables de liste pour les éditeurs (état local React). */
export function listOps<T>(items: T[], setItems: (next: T[]) => void) {
  return {
    update(index: number, patch: Partial<T>) {
      setItems(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
    },
    remove(index: number) {
      setItems(items.filter((_, i) => i !== index));
    },
    move(index: number, dir: -1 | 1) {
      const j = index + dir;
      if (j < 0 || j >= items.length) return;
      const next = [...items];
      [next[index], next[j]] = [next[j], next[index]];
      setItems(next);
    },
    append(item: T) {
      setItems([...items, item]);
    },
  };
}

// --- Confirmation 2 temps ---------------------------------------------------

export function ConfirmButton({
  label,
  confirmLabel = "Confirmer ?",
  onConfirm,
  disabled,
  variant = "outline",
}: {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  disabled?: boolean;
  variant?: "outline" | "ghost";
}) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      disabled={disabled}
      className={cn(
        armed && "border-[color:var(--tone-danger-fg)] text-[color:var(--tone-danger-fg)]",
      )}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
          return;
        }
        setArmed(true);
        timer.current = setTimeout(() => setArmed(false), 3000);
      }}
    >
      {armed ? confirmLabel : label}
    </Button>
  );
}
