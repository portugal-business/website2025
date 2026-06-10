"use client";

import { useState } from "react";
import { saveHeroAction } from "@/platform/cms/actions";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field } from "@/platform/components/ui/field";
import type { SiteHero } from "@/platform/types";
import {
  type EditorLang,
  LangTabs,
  LocInput,
  LocTextarea,
  SaveRow,
  useEditorSave,
} from "./editor-bits";

export function HeroForm({ initial }: { initial: SiteHero }) {
  const [value, setValue] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();

  const set = <K extends keyof SiteHero>(key: K, v: SiteHero[K]) =>
    setValue((prev) => ({ ...prev, [key]: v }));

  const L = lang.toUpperCase();

  return (
    <Card id="hero">
      <CardHeader
        title="Accueil (hero)"
        description="Premier écran de la page d'accueil : titre, sous-titre, appels à l'action"
        action={<LangTabs lang={lang} onChange={setLang} />}
      />
      <CardBody className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label={`Surtitre (${L})`} className="sm:col-span-2">
            <LocInput value={value.eyebrow} lang={lang} onChange={(v) => set("eyebrow", v)} />
          </Field>
          <Field label={`Titre (${L})`}>
            <LocInput value={value.title} lang={lang} onChange={(v) => set("title", v)} />
          </Field>
          <Field label={`Fin du titre, en accent (${L})`} hint="Affichée en italique doré">
            <LocInput
              value={value.titleAccent}
              lang={lang}
              onChange={(v) => set("titleAccent", v)}
            />
          </Field>
          <Field label={`Sous-titre (${L})`} className="sm:col-span-2">
            <LocTextarea
              value={value.subtitle}
              lang={lang}
              rows={3}
              onChange={(v) => set("subtitle", v)}
            />
          </Field>
          <Field label={`Bouton principal (${L})`}>
            <LocInput value={value.ctaPrimary} lang={lang} onChange={(v) => set("ctaPrimary", v)} />
          </Field>
          <Field label={`Lien secondaire (${L})`}>
            <LocInput
              value={value.ctaSecondary}
              lang={lang}
              onChange={(v) => set("ctaSecondary", v)}
            />
          </Field>
          <Field
            label={`Ligne de confiance (${L})`}
            hint="Seule statistique autorisée : « 75+ entrepreneurs accompagnés depuis 2025 »"
            className="sm:col-span-2"
          >
            <LocInput value={value.trustLine} lang={lang} onChange={(v) => set("trustLine", v)} />
          </Field>
        </div>
        <SaveRow
          pending={pending}
          result={result}
          onSave={() => run(() => saveHeroAction(value))}
        />
      </CardBody>
    </Card>
  );
}
