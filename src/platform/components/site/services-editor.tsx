"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveServicesAction } from "@/platform/cms/actions";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field } from "@/platform/components/ui/field";
import type { SiteService } from "@/platform/types";
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

function emptyService(): SiteService {
  return {
    id: crypto.randomUUID(),
    name: { fr: "", en: "" },
    description: { fr: "", en: "" },
    priceNote: { fr: "", en: "" },
    viaPartner: false,
  };
}

export function ServicesEditor({ initial }: { initial: SiteService[] }) {
  const [items, setItems] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();
  const ops = listOps(items, setItems);
  const L = lang.toUpperCase();

  return (
    <Card id="services">
      <CardHeader
        title="Services & tarifs"
        description="Mention « via partenaire » obligatoire pour les prestations réglementées (compta, fiscal, juridique)"
        action={<LangTabs lang={lang} onChange={setLang} />}
      />
      <CardBody className="space-y-4">
        {items.map((svc, i) => (
          <div key={svc.id} className="rounded-sm border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label={`Nom (${L})`}>
                  <LocInput
                    value={svc.name}
                    lang={lang}
                    onChange={(v) => ops.update(i, { name: v })}
                  />
                </Field>
                <Field label={`Tarif affiché (${L})`}>
                  <LocInput
                    value={svc.priceNote}
                    lang={lang}
                    onChange={(v) => ops.update(i, { priceNote: v })}
                  />
                </Field>
                <Field label={`Description (${L})`} className="sm:col-span-2">
                  <LocTextarea
                    value={svc.description}
                    lang={lang}
                    rows={2}
                    onChange={(v) => ops.update(i, { description: v })}
                  />
                </Field>
                <label className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={svc.viaPartner}
                    onChange={(e) => ops.update(i, { viaPartner: e.target.checked })}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  Réalisé par un partenaire (mise en relation)
                </label>
              </div>
              <RowControls
                onUp={() => ops.move(i, -1)}
                onDown={() => ops.move(i, 1)}
                onRemove={() => ops.remove(i)}
                canUp={i > 0}
                canDown={i < items.length - 1}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => ops.append(emptyService())}
        >
          <Plus className="h-4 w-4" /> Ajouter un service
        </Button>
        <SaveRow
          pending={pending}
          result={result}
          onSave={() => run(() => saveServicesAction(items))}
        />
      </CardBody>
    </Card>
  );
}
