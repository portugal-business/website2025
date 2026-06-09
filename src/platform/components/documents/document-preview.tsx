import { ShieldCheck } from "lucide-react";
import { companyFormLabel } from "@/platform/components/bits";
import { formatCents2, formatDateLong } from "@/platform/lib/format";
import { computeTotals } from "@/platform/lib/honoraires";
import type { BusinessDocument } from "@/platform/types";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-foreground">
      {children}
    </h3>
  );
}

/** Rendu « papier » d'un document (lettre de mission, contrat, facture). */
export function DocumentPreview({ doc }: { doc: BusinessDocument }) {
  const p = doc.payload;
  const totals = computeTotals(p.lines);

  return (
    <div className="mx-auto max-w-2xl rounded-md border border-border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-12">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary text-primary-foreground">
            <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden />
          </span>
          <div>
            <div className="display text-base font-medium leading-tight text-foreground">
              Business Portugal
            </div>
            <div className="font-sans text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              Lovelyparallel, Lda · NIF 518354750
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-sans text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            {doc.type === "facture"
              ? "Facture"
              : doc.type === "contrat"
                ? "Contrat"
                : "Lettre de mission"}
          </div>
          <div className="font-sans text-sm font-semibold text-foreground">{doc.number}</div>
          <div className="font-sans text-xs text-muted-foreground">
            {formatDateLong(doc.createdAt)}
          </div>
        </div>
      </div>

      <h1 className="display mt-6 text-xl text-foreground">{doc.title}</h1>

      {/* Parties */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-border bg-background px-3 py-2.5">
          <div className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Prestataire
          </div>
          <div className="mt-0.5 text-sm text-foreground">Lovelyparallel, Lda</div>
          <div className="text-xs text-muted-foreground">
            Représentée par Audrey Marques · Lisbonne
          </div>
        </div>
        <div className="rounded-sm border border-border bg-background px-3 py-2.5">
          <div className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Client
          </div>
          <div className="mt-0.5 text-sm text-foreground">{p.clientName}</div>
          <div className="text-xs text-muted-foreground">
            {p.clientEmail} · Société {companyFormLabel(p.companyForm)}
          </div>
        </div>
      </div>

      {/* Objet (lettre / contrat) */}
      {doc.type !== "facture" ? (
        <>
          {p.intro ? (
            <p className="mt-6 text-sm leading-relaxed text-foreground">{p.intro}</p>
          ) : null}
          <SectionTitle>1 · Objet de la mission</SectionTitle>
          <div className="space-y-3">
            {p.scopeSections?.map((s) => (
              <div key={s.title}>
                <p className="font-sans text-sm font-semibold text-foreground">{s.title}</p>
                <ul className="mt-1 space-y-0.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {/* Honoraires / facture */}
      <SectionTitle>{doc.type === "facture" ? "Détail" : "2 · Honoraires"}</SectionTitle>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left font-sans text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">
            <th className="py-1.5 font-semibold">Prestation</th>
            <th className="py-1.5 text-right font-semibold">HT</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {p.lines.map((l) => (
            <tr key={l.label}>
              <td className="py-2 pr-3 text-foreground">{l.label}</td>
              <td className="py-2 text-right tnum text-foreground">
                {formatCents2(l.amountCents)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-border border-t">
            <td className="py-1.5 text-right font-sans text-xs text-muted-foreground">Total HT</td>
            <td className="py-1.5 text-right tnum text-foreground">
              {formatCents2(totals.totalHtCents)}
            </td>
          </tr>
          <tr>
            <td className="py-1.5 text-right font-sans text-xs text-muted-foreground">
              TVA {Math.round(p.vatRate * 100)} %
            </td>
            <td className="py-1.5 text-right tnum text-muted-foreground">
              {formatCents2(totals.totalVatCents)}
            </td>
          </tr>
          <tr className="border-border border-t">
            <td className="py-2 text-right font-sans text-sm font-bold text-foreground">
              Total TTC
            </td>
            <td className="py-2 text-right tnum text-sm font-bold text-accent">
              {formatCents2(totals.totalTtcCents)}
            </td>
          </tr>
        </tfoot>
      </table>
      <p className="mt-2 text-xs text-muted-foreground italic">
        Le NIF n'est pas facturé (déjà obtenu).
      </p>

      {/* Échéancier */}
      <SectionTitle>{doc.type === "facture" ? "Règlement" : "3 · Règlement"}</SectionTitle>
      <ul className="space-y-1.5">
        {p.schedule.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between rounded-sm border border-border bg-background px-3 py-2 text-sm"
          >
            <span className="text-foreground">{s.label}</span>
            <span className="tnum font-semibold text-foreground">
              {Math.round(s.pct * 100)} % · {formatCents2(Math.round(totals.totalTtcCents * s.pct))}
            </span>
          </li>
        ))}
      </ul>

      {/* Obligations + durée (lettre / contrat) */}
      {doc.type !== "facture" ? (
        <>
          {p.clientObligations?.length ? (
            <>
              <SectionTitle>4 · Obligations du client</SectionTitle>
              <ul className="space-y-0.5">
                {p.clientObligations.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {p.durationNote ? (
            <>
              <SectionTitle>5 · Durée de la mission</SectionTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.durationNote}</p>
            </>
          ) : null}

          {/* Signature */}
          <SectionTitle>6 · Acceptation</SectionTitle>
          {doc.signature ? (
            <div className="flex items-start gap-3 rounded-sm border border-[color:var(--tone-success-fg)]/30 bg-[color:var(--tone-success-bg)] px-4 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-[color:var(--tone-success-fg)]" />
              <div className="text-xs">
                <p className="font-sans font-semibold text-foreground">
                  Signé électroniquement par {doc.signature.signerName}
                </p>
                <p className="mt-0.5 text-muted-foreground">
                  {formatDateLong(doc.signature.signedAt)} · IP {doc.signature.ip}
                </p>
                <p className="mt-1 text-muted-foreground italic">« {doc.signature.consentText} »</p>
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-border px-4 py-4 text-center text-xs text-muted-foreground">
              En attente de signature électronique du client.
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
