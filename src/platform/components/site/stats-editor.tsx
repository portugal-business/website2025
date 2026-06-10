"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveStatsAction } from "@/platform/cms/actions";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field } from "@/platform/components/ui/field";
import type { SiteStat } from "@/platform/types";
import {
  type EditorLang,
  LangTabs,
  LocInput,
  listOps,
  RowControls,
  SaveRow,
  useEditorSave,
} from "./editor-bits";

function emptyStat(): SiteStat {
  return { id: crypto.randomUUID(), value: { fr: "", en: "" }, label: { fr: "", en: "" } };
}

export function StatsEditor({ initial }: { initial: SiteStat[] }) {
  const [items, setItems] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();
  const ops = listOps(items, setItems);
  const L = lang.toUpperCase();

  return (
    <Card id="stats">
      <CardHeader
        title="Chiffres clés"
        description="Bandeau de confiance. Uniquement des chiffres réels et vérifiables — jamais de faux compteurs."
        action={<LangTabs lang={lang} onChange={setLang} />}
      />
      <CardBody className="space-y-4">
        {items.map((stat, i) => (
          <div
            key={stat.id}
            className="flex items-start gap-3 rounded-sm border border-border bg-background p-4"
          >
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label={`Valeur (${L})`} hint="Ex. « 75+ », « 24-48 h »">
                <LocInput
                  value={stat.value}
                  lang={lang}
                  onChange={(v) => ops.update(i, { value: v })}
                />
              </Field>
              <Field label={`Libellé (${L})`}>
                <LocInput
                  value={stat.label}
                  lang={lang}
                  onChange={(v) => ops.update(i, { label: v })}
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
        <Button type="button" variant="outline" size="sm" onClick={() => ops.append(emptyStat())}>
          <Plus className="h-4 w-4" /> Ajouter un chiffre
        </Button>
        <SaveRow
          pending={pending}
          result={result}
          onSave={() => run(() => saveStatsAction(items))}
        />
      </CardBody>
    </Card>
  );
}
