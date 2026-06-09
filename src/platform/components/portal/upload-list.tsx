"use client";

import { Check, FileUp, Paperclip, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/platform/components/ui/badge";
import { Progress } from "@/platform/components/ui/progress";
import { FILE_STATUS_LABEL } from "@/platform/lib/constants";
import type { ClientFile, FileStatus } from "@/platform/types";

export function UploadList({ initial }: { initial: ClientFile[] }) {
  const [files, setFiles] = useState<ClientFile[]>(initial);

  const received = files.filter((f) => f.status !== "requested").length;
  const pct = files.length ? Math.round((received / files.length) * 100) : 0;

  function simulateUpload(id: string) {
    setFiles((fs) =>
      fs.map((f) =>
        f.id === id
          ? {
              ...f,
              status: "uploaded" as FileStatus,
              fileName: "document.pdf",
              uploadedAt: new Date().toISOString(),
            }
          : f,
      ),
    );
  }

  function remove(id: string) {
    setFiles((fs) =>
      fs.map((f) =>
        f.id === id ? { ...f, status: "requested" as FileStatus, fileName: undefined } : f,
      ),
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-md border border-border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-sans font-semibold text-foreground">
            {received} / {files.length} pièces transmises
          </span>
          <span className="tnum text-muted-foreground">{pct}%</span>
        </div>
        <Progress value={pct} tone="accent" className="mt-2" />
      </div>

      <ul className="space-y-2.5">
        {files.map((f) => {
          const done = f.status !== "requested";
          return (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3"
            >
              <span
                className={cn(
                  "grid h-9 w-9 flex-none place-items-center rounded-sm",
                  done
                    ? "bg-[color:var(--tone-success-bg)] text-[color:var(--tone-success-fg)]"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-sans text-sm font-semibold text-foreground">{f.label}</div>
                {done && f.fileName ? (
                  <div className="truncate text-xs text-muted-foreground">{f.fileName}</div>
                ) : (
                  <div className="truncate text-xs text-muted-foreground">{f.hint}</div>
                )}
              </div>
              <Badge tone={FILE_STATUS_LABEL[f.status].tone}>
                {FILE_STATUS_LABEL[f.status].label}
              </Badge>
              {f.status === "requested" ? (
                <button
                  type="button"
                  onClick={() => simulateUpload(f.id)}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 font-sans text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <FileUp className="h-3.5 w-3.5" /> Déposer
                </button>
              ) : f.status === "uploaded" ? (
                <button
                  type="button"
                  onClick={() => remove(f.id)}
                  aria-label="Retirer"
                  className="grid h-8 w-8 flex-none place-items-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-muted-foreground">
        Formats acceptés : PDF, JPG, PNG. Vos pièces sont transmises de façon sécurisée à votre
        consultante, qui les valide une à une.
      </p>
    </div>
  );
}
