"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveFaqsAction } from "@/platform/cms/actions";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field } from "@/platform/components/ui/field";
import type { SiteFaqItem } from "@/platform/types";
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

function emptyFaq(): SiteFaqItem {
  return { id: crypto.randomUUID(), question: { fr: "", en: "" }, answer: { fr: "", en: "" } };
}

export function FaqEditor({ initial }: { initial: SiteFaqItem[] }) {
  const [items, setItems] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();
  const ops = listOps(items, setItems);
  const L = lang.toUpperCase();

  return (
    <Card id="faq">
      <CardHeader
        title="FAQ"
        description="Sujet fiscal sensible : faits datés, pas de promesse (« 0 impôt », « garanti », « sans risque » sont interdits)"
        action={<LangTabs lang={lang} onChange={setLang} />}
      />
      <CardBody className="space-y-4">
        {items.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-3 rounded-sm border border-border bg-background p-4"
          >
            <div className="grid flex-1 grid-cols-1 gap-3">
              <Field label={`Question (${L})`}>
                <LocInput
                  value={f.question}
                  lang={lang}
                  onChange={(v) => ops.update(i, { question: v })}
                />
              </Field>
              <Field label={`Réponse (${L})`}>
                <LocTextarea
                  value={f.answer}
                  lang={lang}
                  rows={3}
                  onChange={(v) => ops.update(i, { answer: v })}
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
        <Button type="button" variant="outline" size="sm" onClick={() => ops.append(emptyFaq())}>
          <Plus className="h-4 w-4" /> Ajouter une question
        </Button>
        <SaveRow
          pending={pending}
          result={result}
          onSave={() => run(() => saveFaqsAction(items))}
        />
      </CardBody>
    </Card>
  );
}
