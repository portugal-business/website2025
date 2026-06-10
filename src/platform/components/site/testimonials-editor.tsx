"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveTestimonialsAction } from "@/platform/cms/actions";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field, Input } from "@/platform/components/ui/field";
import type { SiteTestimonial } from "@/platform/types";
import {
  type EditorLang,
  LangTabs,
  LocInput,
  LocTextarea,
  listOps,
  RowControls,
  SaveRow,
  useEditorSave,
} from "./editor-bits";

function emptyTestimonial(): SiteTestimonial {
  return {
    id: crypto.randomUUID(),
    author: "",
    role: { fr: "", en: "" },
    quote: { fr: "", en: "" },
  };
}

export function TestimonialsEditor({ initial }: { initial: SiteTestimonial[] }) {
  const [items, setItems] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();
  const ops = listOps(items, setItems);
  const L = lang.toUpperCase();

  return (
    <Card id="avis">
      <CardHeader
        title="Avis clients"
        description="Règle d'honnêteté du site : uniquement des avis réels, nommés et vérifiables. Pas de témoignage anonyme ou inventé."
        action={<LangTabs lang={lang} onChange={setLang} />}
      />
      <CardBody className="space-y-4">
        {items.length === 0 ? (
          <p className="rounded-sm border border-border border-dashed bg-background px-4 py-5 text-sm text-muted-foreground">
            Aucun avis publié pour le moment — le site l'assume plutôt que d'afficher des
            témoignages invérifiables. Ajoutez ici vos premiers avis Google réels et nommés.
          </p>
        ) : null}
        {items.map((t, i) => (
          <div
            key={t.id}
            className="flex items-start gap-3 rounded-sm border border-border bg-background p-4"
          >
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Auteur (nom réel)">
                <Input
                  value={t.author}
                  onChange={(e) => ops.update(i, { author: e.target.value })}
                />
              </Field>
              <Field label={`Contexte (${L})`} hint="Ex. « Freelance IT, installé à Porto »">
                <LocInput value={t.role} lang={lang} onChange={(v) => ops.update(i, { role: v })} />
              </Field>
              <Field label={`Citation (${L})`} className="sm:col-span-2">
                <LocTextarea
                  value={t.quote}
                  lang={lang}
                  rows={3}
                  onChange={(v) => ops.update(i, { quote: v })}
                />
              </Field>
            </div>
            <RowControls
              onUp={() => ops.move(i, -1)}
              onDown={() => ops.move(i, 1)}
              onRemove={() => ops.remove(i)}
              canUp={i > 0}
              canDown={i < items.length - 1}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => ops.append(emptyTestimonial())}
        >
          <Plus className="h-4 w-4" /> Ajouter un avis
        </Button>
        <SaveRow
          pending={pending}
          result={result}
          onSave={() => run(() => saveTestimonialsAction(items))}
        />
      </CardBody>
    </Card>
  );
}
