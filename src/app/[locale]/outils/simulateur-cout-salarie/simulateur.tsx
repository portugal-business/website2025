"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  type CoutSalarieInput,
  computeCoutSalarie,
  DEFAULT_INPUT,
  PARAMS_PAIE_PT_2026 as P,
  type RepasMode,
} from "@/lib/outils/cout-salarie";
import { cn } from "@/lib/utils";
import { type SimulateurLeadState, submitSimulateurLead } from "./actions";

type Loc = "fr" | "en";

const COPY = {
  fr: {
    inputsTitle: "Vos paramètres",
    brut: "Salaire brut mensuel",
    brutMin: "En dessous du salaire minimum portugais 2026 (≈ 920 €).",
    mois: "Mois de salaire / an",
    moisNote: "14 = standard légal (12 + subsídio de férias + subsídio de Natal).",
    repas: "Subsídio de alimentação",
    repasCarte: "Carte repas",
    repasEspeces: "Espèces",
    repasAucune: "Aucune",
    joursRepas: "Jours de repas / mois",
    accident: "Secteur (assurance accident)",
    accidents: [
      { v: 0.01, label: "Bureau / services (~1 %)" },
      { v: 0.012, label: "Commerce (~1,2 %)" },
      { v: 0.015, label: "Restauration (~1,5 %)" },
      { v: 0.025, label: "BTP / industrie (~2,5 %)" },
    ],
    nb: "Nombre de salariés",
    comparer: "Comparer avec la France (indicatif)",
    resultTitle: "Coût total annuel employeur",
    mensuel: "Coût mensuel lissé / salarié",
    surcout: "Surcoût vs brut",
    ventilation: "Où part l'argent (par salarié, /an)",
    ventBrut: "Salaire brut",
    ventTsu: "TSU employeur (23,75 %)",
    ventRepas: "Repas",
    ventAssurance: "Assurance AT",
    subsidiosNote: "dont mois 13 & 14 :",
    tableTitle: "Détail",
    tableCol: ["Poste", "Annuel", "Mensuel"],
    rowBrut: "Salaire brut",
    rowTsu: "TSU employeur",
    rowRepas: "Subsídio alimentação",
    rowAssurance: "Assurance accident",
    rowTotal: "Coût total / salarié",
    rowTotalN: "Coût total (× salariés)",
    franceTitle: "Comparatif France (indicatif)",
    franceCost: "Coût employeur France (indicatif)",
    franceEcart: "Écart indicatif (France - Portugal)",
    franceNote:
      "Comparaison simplifiée, ne reflète pas votre situation réelle : taux moyen (≈ +42 %), hors exonérations, conventions collectives et fiscalité personnelle.",
    methodTitle: "Méthode, constantes et sources (2026)",
    methodFormulas: "Formules",
    methodSources: "Sources",
    sources: [
      { label: "TSU 23,75 %, Segurança Social", url: "https://www.seg-social.pt" },
      { label: "14 mois & subsídios, Código do Trabalho", url: "https://www.cite.gov.pt" },
      {
        label: "Subsídio de alimentação, Portal das Finanças (AT)",
        url: "https://www.portaldasfinancas.gov.pt",
      },
    ],
    disclaimer:
      "Estimation indicative à vocation informative, ne constitue pas un conseil comptable, fiscal ou social personnalisé. Les paramètres 2026 sont susceptibles d'évoluer (Orçamento do Estado) et doivent être validés par un Contabilista Certificado partenaire.",
    leadTitle: "Recevez l'estimation détaillée + un échange gratuit",
    leadBody:
      "Recevez une version détaillée par e-mail et un premier échange gratuit pour valider votre projet de recrutement.",
    leadEmail: "Votre adresse e-mail",
    leadConsent:
      "J'accepte d'être recontacté(e) et de recevoir l'estimation par e-mail. Désinscription à tout moment.",
    leadSubmit: "Recevoir l'estimation",
    leadSuccess:
      "C'est noté. Vous recevrez l'estimation détaillée et nous reviendrons vers vous rapidement.",
    leadError: "L'envoi n'a pas abouti. Réessayez, ou réservez directement un échange ci-dessous.",
    leadPrivacy:
      "Vos données sont traitées par Lovelyparallel, Lda et ne servent qu'aux finalités indiquées.",
    ctaTitle: "Vous prévoyez d'embaucher au Portugal ?",
    ctaBody:
      "Recruter au Portugal, c'est aussi un contrat conforme, la Segurança Social, la paie et le bon profil. Je vous mets en relation avec mes partenaires recrutement et comptable, et je coordonne votre implantation. Premier échange gratuit et sans engagement.",
    ctaButton: "Se faire accompagner pour recruter",
    residenceTitle: "Et depuis quel pays dirigez-vous ?",
    residenceHelp:
      "Le coût d'un salarié au Portugal est le même quel que soit votre pays. Mais pour embaucher, votre société doit être réellement établie au Portugal, pas seulement immatriculée. Indiquez d'où vous dirigez pour un repère sur ce point (informatif, non stocké).",
    residencePlaceholder: "Sélectionnez votre pays",
    residenceOptions: [
      { code: "FR", label: "France" },
      { code: "BE", label: "Belgique" },
      { code: "CH", label: "Suisse" },
      { code: "LU", label: "Luxembourg" },
      { code: "MA", label: "Maroc" },
      { code: "TN", label: "Tunisie" },
      { code: "DZ", label: "Algérie" },
      { code: "OTHER", label: "Autre pays" },
    ],
    residenceNotes: {
      FR: {
        text: "Embaucher au Portugal suppose une société réellement établie sur place. Si vous dirigez depuis la France sans substance, l'activité peut être rattachée à la France (établissement stable). Le coût ci-dessus n'a de sens que pour un employeur portugais réel.",
        link: "Société au Portugal & vie en France",
        href: "/guides/societe-portugal-sans-risque-france",
      },
      BE: {
        text: "Le coût est le même, mais votre société doit être réellement établie au Portugal pour employer. Depuis la Belgique, pensez aussi à votre propre situation (résidence, taxe Caïman).",
        link: "Créer depuis la Belgique",
        href: "/depuis/belgique",
      },
      CH: {
        text: "Le coût ne dépend pas de votre pays, mais l'employeur doit être réellement portugais. Depuis la Suisse, attention au siège de direction effective si vous pilotez tout de chez vous.",
        link: "Créer depuis la Suisse",
        href: "/depuis/suisse",
      },
      LU: {
        text: "Même coût quel que soit votre pays, mais une société réellement établie au Portugal est requise pour embaucher. Depuis le Luxembourg, anticipez direction effective et règles ATAD.",
        link: "Créer depuis le Luxembourg",
        href: "/depuis/luxembourg",
      },
      MA: {
        text: "Le coût d'un salarié reste le même. Mais depuis le Maroc, le préalable est ailleurs : contrôle des changes et, le cas échéant, visa pour détenir et diriger une société au Portugal.",
        link: "Créer depuis le Maroc",
        href: "/depuis/maroc",
      },
      TN: {
        text: "Coût identique, mais depuis la Tunisie le point déterminant est le contrôle des changes pour investir et détenir une société à l'étranger, à vérifier avant tout recrutement.",
        link: "Créer depuis la Tunisie",
        href: "/depuis/tunisie",
      },
      DZ: {
        text: "Coût identique, mais depuis l'Algérie le contrôle des changes strict est le préalable à cadrer avant de détenir une société au Portugal et d'y embaucher.",
        link: "Créer depuis l'Algérie",
        href: "/depuis/algerie",
      },
      OTHER: {
        text: "Le coût d'un salarié au Portugal ne dépend pas de votre pays. Le point à cadrer en premier reste votre propre situation et la réalité de l'établissement au Portugal.",
        link: "Créer depuis l'étranger",
        href: "/creer-societe-portugal-depuis-letranger",
      },
    },
  },
  en: {
    inputsTitle: "Your parameters",
    brut: "Monthly gross salary",
    brutMin: "Below the 2026 Portuguese minimum wage (≈ €920).",
    mois: "Months of salary / year",
    moisNote: "14 = legal standard (12 + subsídio de férias + subsídio de Natal).",
    repas: "Meal allowance (subsídio de alimentação)",
    repasCarte: "Meal card",
    repasEspeces: "Cash",
    repasAucune: "None",
    joursRepas: "Meal days / month",
    accident: "Sector (work-accident insurance)",
    accidents: [
      { v: 0.01, label: "Office / services (~1%)" },
      { v: 0.012, label: "Retail (~1.2%)" },
      { v: 0.015, label: "Hospitality (~1.5%)" },
      { v: 0.025, label: "Construction / industry (~2.5%)" },
    ],
    nb: "Number of employees",
    comparer: "Compare with France (indicative)",
    resultTitle: "Total annual employer cost",
    mensuel: "Smoothed monthly cost / employee",
    surcout: "Markup vs gross",
    ventilation: "Where the money goes (per employee, /year)",
    ventBrut: "Gross salary",
    ventTsu: "Employer TSU (23.75%)",
    ventRepas: "Meal allowance",
    ventAssurance: "Accident insurance",
    subsidiosNote: "incl. months 13 & 14:",
    tableTitle: "Breakdown",
    tableCol: ["Item", "Annual", "Monthly"],
    rowBrut: "Gross salary",
    rowTsu: "Employer TSU",
    rowRepas: "Meal allowance",
    rowAssurance: "Accident insurance",
    rowTotal: "Total cost / employee",
    rowTotalN: "Total cost (× employees)",
    franceTitle: "France comparison (indicative)",
    franceCost: "France employer cost (indicative)",
    franceEcart: "Indicative gap (France - Portugal)",
    franceNote:
      "Simplified comparison, does not reflect your real situation: average rate (≈ +42%), excluding exemptions, collective agreements and personal taxation.",
    methodTitle: "Method, constants and sources (2026)",
    methodFormulas: "Formulas",
    methodSources: "Sources",
    sources: [
      { label: "TSU 23.75%, Segurança Social", url: "https://www.seg-social.pt" },
      { label: "14 months & subsídios, Código do Trabalho", url: "https://www.cite.gov.pt" },
      {
        label: "Meal allowance, Portal das Finanças (AT)",
        url: "https://www.portaldasfinancas.gov.pt",
      },
    ],
    disclaimer:
      "Indicative estimate for information only, not personalised accounting, tax or social advice. The 2026 parameters are subject to change (Orçamento do Estado) and must be validated by a partner Contabilista Certificado.",
    leadTitle: "Get the detailed estimate + a free conversation",
    leadBody:
      "Receive a detailed version by email and a first free conversation to validate your recruitment project.",
    leadEmail: "Your email address",
    leadConsent:
      "I agree to be contacted and to receive the estimate by email. Unsubscribe anytime.",
    leadSubmit: "Get the estimate",
    leadSuccess: "Noted. You'll receive the detailed estimate and we'll get back to you shortly.",
    leadError: "Sending failed. Try again, or book a conversation directly below.",
    leadPrivacy:
      "Your data is processed by Lovelyparallel, Lda and used only for the stated purposes.",
    ctaTitle: "Planning to hire in Portugal?",
    ctaBody:
      "Hiring in Portugal also means a compliant contract, Segurança Social, payroll and the right profile. I connect you with my recruitment and accounting partners and coordinate your setup. First conversation free, no commitment.",
    ctaButton: "Get support to recruit",
    residenceTitle: "And from which country do you run things?",
    residenceHelp:
      "The cost of an employee in Portugal is the same whatever your country. But to hire, your company must be genuinely established in Portugal, not merely registered. Indicate where you run things for guidance on this point (informative, not stored).",
    residencePlaceholder: "Select your country",
    residenceOptions: [
      { code: "FR", label: "France" },
      { code: "BE", label: "Belgium" },
      { code: "CH", label: "Switzerland" },
      { code: "LU", label: "Luxembourg" },
      { code: "MA", label: "Morocco" },
      { code: "TN", label: "Tunisia" },
      { code: "DZ", label: "Algeria" },
      { code: "OTHER", label: "Another country" },
    ],
    residenceNotes: {
      FR: {
        text: "Hiring in Portugal assumes a company genuinely established there. If you run things from France without substance, the activity may be attached to France (permanent establishment). The cost above only makes sense for a real Portuguese employer.",
        link: "Portuguese company & living in France",
        href: "/guides/societe-portugal-sans-risque-france",
      },
      BE: {
        text: "The cost is the same, but your company must be genuinely established in Portugal to employ. From Belgium, also consider your own situation (residence, Cayman tax).",
        link: "Set up from Belgium",
        href: "/depuis/belgique",
      },
      CH: {
        text: "The cost does not depend on your country, but the employer must be genuinely Portuguese. From Switzerland, mind the place of effective management if you run everything from home.",
        link: "Set up from Switzerland",
        href: "/depuis/suisse",
      },
      LU: {
        text: "Same cost whatever your country, but a company genuinely established in Portugal is required to hire. From Luxembourg, anticipate effective management and ATAD rules.",
        link: "Set up from Luxembourg",
        href: "/depuis/luxembourg",
      },
      MA: {
        text: "The employee cost stays the same. But from Morocco, the prerequisite is elsewhere: exchange controls and, where relevant, a visa to hold and run a company in Portugal.",
        link: "Set up from Morocco",
        href: "/depuis/maroc",
      },
      TN: {
        text: "Same cost, but from Tunisia the decisive point is exchange controls to invest in and hold a company abroad, to check before any hiring.",
        link: "Set up from Tunisia",
        href: "/depuis/tunisie",
      },
      DZ: {
        text: "Same cost, but from Algeria strict exchange controls are the prerequisite to frame before holding a company in Portugal and hiring there.",
        link: "Set up from Algeria",
        href: "/depuis/algerie",
      },
      OTHER: {
        text: "The cost of an employee in Portugal does not depend on your country. The point to frame first remains your own situation and the reality of establishment in Portugal.",
        link: "Set up from abroad",
        href: "/creer-societe-portugal-depuis-letranger",
      },
    },
  },
} as const;

function LeadSubmit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-5 disabled:opacity-50")}
    >
      {pending ? "…" : label}
    </button>
  );
}

export function Simulateur({ locale, calendlyUrl }: { locale: string; calendlyUrl: string }) {
  const l: Loc = locale === "en" ? "en" : "fr";
  const t = COPY[l];
  const [input, setInput] = useState<CoutSalarieInput>(DEFAULT_INPUT);
  const [residence, setResidence] = useState<string>("");
  const result = useMemo(() => computeCoutSalarie(input), [input]);

  const leadInitial: SimulateurLeadState = { status: "idle" };
  const [leadState, leadAction] = useActionState(submitSimulateurLead, leadInitial);

  const nf = new Intl.NumberFormat(l === "en" ? "en-GB" : "fr-FR", { maximumFractionDigits: 0 });
  const euro = (n: number) => `${nf.format(Math.round(n))} €`;
  const pct = (n: number) => `${n.toFixed(1).replace(".", l === "en" ? "." : ",")} %`;

  const set = <K extends keyof CoutSalarieInput>(k: K, v: CoutSalarieInput[K]) =>
    setInput((s) => ({ ...s, [k]: v }));

  const v = result.ventilation;
  const segments = [
    { label: t.ventBrut, value: v.salaireBrut, cls: "bg-primary" },
    { label: t.ventTsu, value: v.tsuEmployeur, cls: "bg-accent" },
    { label: t.ventRepas, value: v.repas, cls: "bg-foreground/40" },
    { label: t.ventAssurance, value: v.assurance, cls: "bg-foreground/20" },
  ];
  const totalUnit = result.parSalarie.coutAnnuel;

  const inputCls =
    "mt-2 block h-11 w-full rounded-sm border border-border bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const labelCls = "font-sans text-xs uppercase tracking-[0.14em] text-foreground";

  const leadSummary = `${t.resultTitle}: ${euro(result.total.coutAnnuel)}, ${input.brutMensuel}€ × ${input.moisSalaire} mois, ${input.nbSalaries} sal., +${result.parSalarie.surcoutPct.toFixed(1)}%`;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      {/* Inputs */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-border bg-card">
          <div className="rule-brass" />
          <div className="space-y-6 p-7">
            <p className="eyebrow">{t.inputsTitle}</p>

            <div>
              <label htmlFor="brut" className={labelCls}>
                {t.brut}
              </label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  id="brut"
                  type="range"
                  min={P.salaireMinimumMensuel}
                  max={10000}
                  step={50}
                  value={input.brutMensuel}
                  onChange={(e) => set("brutMensuel", Number(e.target.value))}
                  className="h-1.5 flex-1 accent-accent"
                />
                <input
                  type="number"
                  aria-label={t.brut}
                  min={0}
                  value={input.brutMensuel}
                  onChange={(e) => set("brutMensuel", Number(e.target.value))}
                  className="h-11 w-28 rounded-sm border border-border bg-background px-3 text-right text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
              {input.brutMensuel < P.salaireMinimumMensuel ? (
                <p className="mt-2 font-sans text-xs text-primary">{t.brutMin}</p>
              ) : null}
            </div>

            <fieldset>
              <span className={labelCls}>{t.mois}</span>
              <div className="mt-2 grid grid-cols-2 gap-px border border-border bg-border">
                {([12, 14] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => set("moisSalaire", m)}
                    className={cn(
                      "h-11 bg-card font-sans text-sm transition-colors",
                      input.moisSalaire === m
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{t.moisNote}</p>
            </fieldset>

            <div>
              <label htmlFor="repas" className={labelCls}>
                {t.repas}
              </label>
              <select
                id="repas"
                value={input.repas}
                onChange={(e) => set("repas", e.target.value as RepasMode)}
                className={inputCls}
              >
                <option value="carte">{t.repasCarte}</option>
                <option value="especes">{t.repasEspeces}</option>
                <option value="aucune">{t.repasAucune}</option>
              </select>
            </div>

            {input.repas !== "aucune" ? (
              <div>
                <label htmlFor="joursRepas" className={labelCls}>
                  {t.joursRepas}
                </label>
                <input
                  id="joursRepas"
                  type="number"
                  min={0}
                  max={31}
                  value={input.joursRepas}
                  onChange={(e) => set("joursRepas", Number(e.target.value))}
                  className={inputCls}
                />
              </div>
            ) : null}

            <div>
              <label htmlFor="accident" className={labelCls}>
                {t.accident}
              </label>
              <select
                id="accident"
                value={input.tauxAccident}
                onChange={(e) => set("tauxAccident", Number(e.target.value))}
                className={inputCls}
              >
                {t.accidents.map((a) => (
                  <option key={a.v} value={a.v}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nb" className={labelCls}>
                {t.nb}
              </label>
              <input
                id="nb"
                type="number"
                min={1}
                max={500}
                value={input.nbSalaries}
                onChange={(e) => set("nbSalaries", Number(e.target.value))}
                className={inputCls}
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={input.comparerFrance}
                onChange={(e) => set("comparerFrance", e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              <span>{t.comparer}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Résultat */}
      <div className="space-y-8">
        <div className="border border-border bg-card p-7 lg:p-8">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t.resultTitle}
          </p>
          <p className="mt-2 font-serif text-4xl text-accent lg:text-5xl">
            {euro(result.total.coutAnnuel)}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {t.mensuel}
              </p>
              <p className="mt-1 font-serif text-xl">{euro(result.parSalarie.coutMensuelLisse)}</p>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {t.surcout}
              </p>
              <p className="mt-1 font-serif text-xl">
                +{pct(result.parSalarie.surcoutPct)}{" "}
                <span className="text-muted-foreground">
                  (×
                  {result.parSalarie.ratioCoutBrut.toFixed(2).replace(".", l === "en" ? "." : ",")})
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Ventilation */}
        <div className="border border-border p-7">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
            {t.ventilation}
          </p>
          <div className="mt-5 flex h-4 w-full overflow-hidden rounded-sm border border-border">
            {segments.map((s) => (
              <div
                key={s.label}
                className={s.cls}
                style={{ width: `${totalUnit > 0 ? (s.value / totalUnit) * 100 : 0}%` }}
                title={`${s.label}, ${euro(s.value)}`}
              />
            ))}
          </div>
          <dl className="mt-5 divide-y divide-border">
            {segments.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <dt className="flex items-center gap-2.5 text-muted-foreground">
                  <span
                    className={cn("inline-block h-2.5 w-2.5 rounded-[1px]", s.cls)}
                    aria-hidden
                  />
                  {s.label}
                </dt>
                <dd className="font-serif">{euro(s.value)}</dd>
              </div>
            ))}
          </dl>
          {v.subsidios > 0 ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {t.subsidiosNote} {euro(v.subsidios)}
            </p>
          ) : null}
        </div>

        {/* Tableau détaillé */}
        <div className="overflow-x-auto border border-border p-7">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
            {t.tableTitle}
          </p>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {t.tableCol.map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "border-b border-foreground/20 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground",
                      i > 0 && "text-right",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: t.rowBrut, a: result.parSalarie.brutAnnuel },
                { label: t.rowTsu, a: result.parSalarie.tsuAnnuelle },
                { label: t.rowRepas, a: result.parSalarie.repasAnnuel },
                { label: t.rowAssurance, a: result.parSalarie.assuranceAnnuelle },
              ].map((row) => (
                <tr key={row.label} className="align-top">
                  <td className="border-b border-border py-2.5 text-muted-foreground">
                    {row.label}
                  </td>
                  <td className="border-b border-border py-2.5 text-right font-serif">
                    {euro(row.a)}
                  </td>
                  <td className="border-b border-border py-2.5 text-right font-serif text-muted-foreground">
                    {euro(row.a / 12)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2.5 font-medium">{t.rowTotal}</td>
                <td className="py-2.5 text-right font-serif">
                  {euro(result.parSalarie.coutAnnuel)}
                </td>
                <td className="py-2.5 text-right font-serif">
                  {euro(result.parSalarie.coutMensuelLisse)}
                </td>
              </tr>
              {result.total.nbSalaries > 1 ? (
                <tr>
                  <td className="py-2.5 font-medium text-accent">{t.rowTotalN}</td>
                  <td className="py-2.5 text-right font-serif text-accent">
                    {euro(result.total.coutAnnuel)}
                  </td>
                  <td className="py-2.5 text-right font-serif text-accent">
                    {euro(result.total.coutMensuel)}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* Comparatif France */}
        {result.comparatifFrance ? (
          <div className="border border-border border-l-2 border-l-foreground/40 p-7">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
              {t.franceTitle}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">{t.franceCost}</span>
                <span className="font-serif">
                  {euro(result.comparatifFrance.coutFranceIndicatif)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">{t.franceEcart}</span>
                <span className="font-serif">{euro(result.comparatifFrance.ecartIndicatif)}</span>
              </div>
            </div>
            <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground">
              {t.franceNote}
            </p>
          </div>
        ) : null}

        {/* Méthode (DGCCRF) */}
        <details className="border border-border p-7">
          <summary className="cursor-pointer font-sans text-xs uppercase tracking-[0.14em] text-accent">
            {t.methodTitle}
          </summary>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.12em] text-foreground">
                {t.methodFormulas}
              </p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                {`brut annuel        = brut × ${input.moisSalaire} mois
TSU employeur      = brut annuel × ${(P.tsuEmployeur * 100).toString().replace(".", l === "en" ? "." : ",")} %
repas              = jours × valeur/jour × ${P.repasMoisTravailles} mois
assurance accident = brut annuel × taux secteur
coût total         = brut + TSU + repas + assurance`}
              </pre>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.12em] text-foreground">
                {t.methodSources}
              </p>
              <ul className="mt-2 space-y-1.5">
                {t.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-[4px] hover:text-foreground hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>

        <p className="border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
          {t.disclaimer}
        </p>

        {/* Contextualisation par pays du dirigeant (informatif, n'affecte pas le calcul) */}
        <div className="border border-border p-7">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
            {t.residenceTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.residenceHelp}</p>
          <select
            value={residence}
            aria-label={t.residenceTitle}
            onChange={(e) => setResidence(e.target.value)}
            className="mt-5 block h-12 w-full max-w-sm rounded-sm border border-border bg-background px-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <option value="">{t.residencePlaceholder}</option>
            {t.residenceOptions.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label}
              </option>
            ))}
          </select>
          {residence ? (
            <div className="mt-5 border-l-2 border-accent pl-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t.residenceNotes[residence as keyof typeof t.residenceNotes].text}
              </p>
              <Link
                href={t.residenceNotes[residence as keyof typeof t.residenceNotes].href}
                className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
              >
                {t.residenceNotes[residence as keyof typeof t.residenceNotes].link}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>

        {/* Capture lead, non bloquante */}
        {leadState.status === "success" ? (
          <div className="border border-border bg-card p-7">
            <span
              className="inline-grid h-10 w-10 place-items-center rounded-sm border border-accent text-accent"
              aria-hidden
            >
              <Check className="h-5 w-5" />
            </span>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.leadSuccess}</p>
          </div>
        ) : (
          <form action={leadAction} className="border border-border bg-card p-7">
            <h3 className="font-serif text-xl">{t.leadTitle}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.leadBody}</p>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0"
            />
            <input type="hidden" name="locale" value={l} />
            <input type="hidden" name="summary" value={leadSummary} />
            <input
              type="email"
              name="email"
              required
              placeholder={t.leadEmail}
              className="mt-5 block h-12 w-full rounded-sm border border-border bg-background px-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
            <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                name="consentMarketing"
                className="mt-1 h-4 w-4 accent-accent"
              />
              <span>{t.leadConsent}</span>
            </label>
            {leadState.status === "error" ? (
              <p className="mt-4 font-sans text-sm text-primary" role="alert">
                {t.leadError}
              </p>
            ) : null}
            <LeadSubmit label={t.leadSubmit} />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.leadPrivacy}</p>
          </form>
        )}

        {/* CTA recrutement */}
        <div className="border border-border bg-primary px-7 py-10 text-primary-foreground lg:px-10">
          <h3 className="font-serif text-2xl">{t.ctaTitle}</h3>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">{t.ctaBody}</p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-7")}
          >
            {t.ctaButton}
          </a>
        </div>
      </div>
    </div>
  );
}
