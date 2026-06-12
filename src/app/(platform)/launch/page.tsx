import { ArrowRight, Eye, LayoutDashboard, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aperçu de la plateforme",
};

const ENTRIES = [
  {
    href: "/app",
    label: "Espace consultant",
    sub: "Audrey · Business Portugal",
    desc: "CRM des leads, qualification, missions & tracker, génération de la lettre de mission, contrat et facture.",
    icon: LayoutDashboard,
  },
  {
    href: "/portal",
    label: "Portail client",
    sub: "Le client final d'Audrey",
    desc: "Suivi d'avancement de la création de société, documents à signer, upload des pièces demandées.",
    icon: UserRound,
  },
];

export default function LaunchPage() {
  return (
    <div className="platform-root grid min-h-dvh place-items-center bg-background px-5 py-16">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
            <Eye className="h-3.5 w-3.5" /> Aperçu front · données de démonstration
          </span>
          <h1 className="display mt-5 text-3xl text-foreground sm:text-4xl">
            Plateforme Business&nbsp;Portugal
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            CRM, génération de documents et portail client pour consultants en implantation. Trois
            espaces à valider avant la migration Supabase.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {ENTRIES.map((e) => {
            const Icon = e.icon;
            return (
              <Link
                key={e.href}
                href={e.href}
                className="group flex flex-col rounded-md border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <span className="grid h-10 w-10 place-items-center rounded-sm bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="display mt-4 text-lg text-foreground">{e.label}</h2>
                <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent">
                  {e.sub}
                </p>
                <p className="mt-2 flex-1 text-xs text-muted-foreground">{e.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-foreground">
                  Entrer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Vous pourrez basculer d'un espace à l'autre via le sélecteur «&nbsp;Aperçu&nbsp;» en haut
          à droite.
        </p>
      </div>
    </div>
  );
}
