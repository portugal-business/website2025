"use client";

import { useState } from "react";
import { saveIdentityAction } from "@/platform/cms/actions";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field, Input } from "@/platform/components/ui/field";
import type { SiteIdentity } from "@/platform/types";
import { type EditorLang, LangTabs, LocInput, SaveRow, useEditorSave } from "./editor-bits";

export function IdentityForm({ initial }: { initial: SiteIdentity }) {
  const [value, setValue] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();

  const set = <K extends keyof SiteIdentity>(key: K, v: SiteIdentity[K]) =>
    setValue((prev) => ({ ...prev, [key]: v }));

  return (
    <Card>
      <CardHeader
        title="Identité & coordonnées"
        description="Affichées dans l'en-tête, le pied de page et la page contact"
        action={<LangTabs lang={lang} onChange={setLang} />}
      />
      <CardBody className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Marque">
            <Input value={value.brandName} onChange={(e) => set("brandName", e.target.value)} />
          </Field>
          <Field label={`Tagline (${lang.toUpperCase()})`}>
            <LocInput value={value.tagline} lang={lang} onChange={(v) => set("tagline", v)} />
          </Field>
          <Field label="Raison sociale" hint="Société de droit portugais">
            <Input value={value.legalName} onChange={(e) => set("legalName", e.target.value)} />
          </Field>
          <Field label="NIPC">
            <Input value={value.nipc} onChange={(e) => set("nipc", e.target.value)} />
          </Field>
          <Field label="Téléphone">
            <Input value={value.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field label="E-mail de contact">
            <Input
              type="email"
              value={value.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Lien Calendly">
            <Input value={value.calendlyUrl} onChange={(e) => set("calendlyUrl", e.target.value)} />
          </Field>
          <Field label="Profil LinkedIn">
            <Input value={value.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
          </Field>
        </div>
        <SaveRow
          pending={pending}
          result={result}
          onSave={() => run(() => saveIdentityAction(value))}
        />
      </CardBody>
    </Card>
  );
}
