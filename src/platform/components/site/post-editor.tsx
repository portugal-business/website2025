"use client";

import { CloudUpload, Loader2, Undo2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deletePostAction, savePostAction, setPostStatusAction } from "@/platform/cms/actions";
import { Badge } from "@/platform/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Field, Input, Select } from "@/platform/components/ui/field";
import type { SitePost } from "@/platform/types";
import {
  ConfirmButton,
  type EditorLang,
  LangTabs,
  LocInput,
  LocTextarea,
  SaveRow,
  useEditorSave,
} from "./editor-bits";

const CATEGORIES = ["Création", "Fiscalité", "Comptabilité", "Banque", "Vivre au Portugal"];

export function PostEditor({ initial }: { initial: SitePost }) {
  const [value, setValue] = useState(initial);
  const [lang, setLang] = useState<EditorLang>("fr");
  const { pending, result, run } = useEditorSave();
  const [statusPending, startStatus] = useTransition();

  const set = <K extends keyof SitePost>(key: K, v: SitePost[K]) =>
    setValue((prev) => ({ ...prev, [key]: v }));

  const published = value.status === "published";
  const L = lang.toUpperCase();

  const save = () =>
    run(() =>
      savePostAction(value.id, {
        slug: value.slug,
        title: value.title,
        excerpt: value.excerpt,
        body: value.body,
        category: value.category,
        readingMinutes: value.readingMinutes,
      }),
    );

  const toggleStatus = () =>
    startStatus(async () => {
      const res = await setPostStatusAction(value.id, published ? "draft" : "published");
      if (res.ok) set("status", published ? "draft" : "published");
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title={
            <span className="inline-flex items-center gap-2">
              Article
              <Badge tone={published ? "success" : "neutral"} dot>
                {published ? "Publié" : "Brouillon"}
              </Badge>
            </span>
          }
          description="Le contenu fiscal doit rester daté, factuel et validé (règles YMYL du site)"
          action={<LangTabs lang={lang} onChange={setLang} />}
        />
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={`Titre (${L})`} className="sm:col-span-2">
              <LocInput value={value.title} lang={lang} onChange={(v) => set("title", v)} />
            </Field>
            <Field label="Slug" hint="Adresse de l'article : /blog/<slug>">
              <Input value={value.slug} onChange={(e) => set("slug", e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Catégorie">
                <Select value={value.category} onChange={(e) => set("category", e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Lecture (min)">
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={value.readingMinutes}
                  onChange={(e) => set("readingMinutes", Number(e.target.value) || 1)}
                />
              </Field>
            </div>
            <Field label={`Extrait (${L})`} className="sm:col-span-2">
              <LocTextarea
                value={value.excerpt}
                lang={lang}
                rows={2}
                onChange={(v) => set("excerpt", v)}
              />
            </Field>
            <Field
              label={`Corps (${L})`}
              hint="Markdown simple : ## pour les titres, - pour les listes"
              className="sm:col-span-2"
            >
              <LocTextarea
                value={value.body}
                lang={lang}
                rows={14}
                className="font-mono text-xs leading-relaxed"
                onChange={(v) => set("body", v)}
              />
            </Field>
          </div>
          <SaveRow pending={pending} result={result} onSave={save} label="Enregistrer l'article" />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Publication" description="Statut de l'article sur le site" />
        <CardBody className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={published ? "outline" : "primary"}
            size="sm"
            disabled={statusPending}
            onClick={toggleStatus}
          >
            {statusPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : published ? (
              <Undo2 className="h-4 w-4" />
            ) : (
              <CloudUpload className="h-4 w-4" />
            )}
            {published ? "Repasser en brouillon" : "Publier l'article"}
          </Button>
          <ConfirmButton
            label="Supprimer l'article"
            confirmLabel="Supprimer définitivement ?"
            onConfirm={() => {
              // redirige côté serveur vers /app/site/blog
              void deletePostAction(value.id);
            }}
          />
          <span className="ml-auto text-xs text-muted-foreground">
            Pensez à enregistrer avant de publier.
          </span>
        </CardBody>
      </Card>
    </div>
  );
}
