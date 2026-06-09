import { ArrowRight, FileSignature, FolderUp, PartyPopper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { companyFormLabel } from "@/platform/components/bits";
import { Tracker, trackerProgress } from "@/platform/components/tracker";
import { Card, CardBody, CardHeader } from "@/platform/components/ui/card";
import { Progress } from "@/platform/components/ui/progress";
import { listClientFiles, listMissionDocuments } from "@/platform/data";
import { getClientSession } from "@/platform/lib/session";

export const metadata: Metadata = { title: "Mon dossier" };

export default async function PortalHome() {
  const { user, mission, org } = await getClientSession();
  const [docs, files] = await Promise.all([
    listMissionDocuments(mission.id),
    listClientFiles(mission.id),
  ]);

  const pct = trackerProgress(mission.steps);
  const currentStep = mission.steps.find((s) => s.status === "in_progress");
  const toSign = docs.filter((d) => d.type !== "facture" && d.status === "sent");
  const piecesRequested = files.filter((f) => f.status === "requested").length;
  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <div className="eyebrow mb-1">Votre dossier · {org.brandName}</div>
        <h1 className="display text-2xl text-foreground sm:text-[1.7rem]">Bonjour {firstName}.</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Voici où en est la création de votre société{" "}
          <span className="font-semibold text-foreground">{mission.companyNameWanted}</span> (
          {companyFormLabel(mission.companyForm)}).
        </p>
      </div>

      {/* Bandeau avancement */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Avancement global
              </div>
              <div className="display mt-1 text-3xl text-foreground tnum">{pct}%</div>
              {currentStep ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  Étape en cours :{" "}
                  <span className="font-semibold text-foreground">{currentStep.label}</span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">Dossier finalisé.</p>
              )}
            </div>
            <div className="w-full max-w-xs">
              <Progress value={pct} tone="accent" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* À faire */}
      {(toSign.length > 0 || piecesRequested > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {toSign.map((d) => (
            <Link
              key={d.id}
              href={`/portal/documents/${d.id}`}
              className="group flex items-center gap-3 rounded-md border border-accent/40 bg-accent/[0.06] p-4 transition-colors hover:border-accent"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-sm bg-accent text-accent-foreground">
                <FileSignature className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-sans text-sm font-semibold text-foreground">À signer</div>
                <div className="truncate text-xs text-muted-foreground">{d.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
          {piecesRequested > 0 ? (
            <Link
              href="/portal/pieces"
              className="group flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-colors hover:border-accent/50"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-sm bg-muted text-muted-foreground">
                <FolderUp className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-sans text-sm font-semibold text-foreground">
                  {piecesRequested} pièce(s) à fournir
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  Déposez vos documents demandés
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      )}

      {/* Tracker */}
      <Card>
        <CardHeader
          title="Le détail de votre dossier"
          description="Chaque étape, du NIF au compte bancaire"
        />
        <CardBody>
          <Tracker steps={mission.steps} />
        </CardBody>
      </Card>

      <div className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
        <PartyPopper className="mt-0.5 h-4 w-4 flex-none text-accent" />
        <p className="text-xs text-muted-foreground">
          Une question à n'importe quelle étape ? Votre consultante reste votre point de contact
          unique, en français. Les délais dépendant des administrations et de la banque ne sont pas
          garantis, mais vous êtes tenu·e informé·e à chaque étape.
        </p>
      </div>
    </div>
  );
}
