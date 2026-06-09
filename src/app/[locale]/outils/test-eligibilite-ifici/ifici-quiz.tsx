"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  type IficiAnswers,
  type IficiResult,
  ificiQuestions,
  nextStep,
  type StepId,
} from "@/lib/outils/ifici-questions";
import { CALENDLY_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getIficiResult, type IficiLeadState, submitIficiLead } from "./actions";

type Loc = "fr" | "en";

// Suivi Plausible (sans cookie), best-effort, jamais bloquant.
function track(event: string) {
  if (typeof window !== "undefined") {
    (window as unknown as { plausible?: (e: string) => void }).plausible?.(event);
  }
}

const REVEAL = {
  fr: {
    intro: {
      kicker: "Pré-qualification informative, aucun email requis pour voir votre résultat.",
      start: "Commencer le test",
    },
    progress: (n: number) => `Question ${n}`,
    back: "Précédent",
    banner: "Votre résultat · Régime IFICI 2026",
    methodTitle: "Sur quoi repose ce test ?",
    methodBody:
      "Ce résultat est calculé à partir de vos réponses et des critères de l'IFICI en vigueur en 2026 (art. 58-A du Código dos Benefícios Fiscais ; Portaria 352/2024). C'est une pré-qualification automatisée et informative, pas un conseil fiscal personnalisé ni une décision de l'administration. Votre éligibilité réelle dépend de l'examen complet de votre situation.",
    deadline:
      "La demande se dépose au Portal das Finanças avant le 15 janvier de l'année suivant votre installation. C'est un délai sec : le rater fait perdre une ou plusieurs des 10 années.",
    restart: "Refaire le test",
    cta: {
      title: "Discutons de votre cas, gratuitement.",
      body: "Audrey vérifie votre situation, vous dit franchement ce qui s'applique, et vous met en relation avec le bon fiscaliste partenaire si nécessaire. Premier échange 100 % gratuit et sans engagement.",
      button: "Réserver un échange gratuit",
    },
    email: {
      title: "Recevez votre résultat et vos prochaines étapes par e-mail",
      optional: "Facultatif, votre résultat reste affiché ci-dessus.",
      placeholder: "Votre adresse e-mail",
      consentExec: "Envoyez-moi une copie de mon résultat et mes prochaines étapes.",
      consentMkt:
        "Je souhaite recevoir les conseils et actualités fiscales de Business Portugal. Désinscription à tout moment.",
      submit: "Recevoir mon résultat",
      success:
        "C'est noté. Si vous avez coché les actualités, confirmez l'e-mail que nous venons d'envoyer.",
      error: "L'envoi n'a pas abouti. Réessayez, ou réservez directement un échange ci-dessous.",
      privacy:
        "Vos données sont traitées par Lovelyparallel, Lda et ne servent qu'aux finalités cochées.",
    },
    disclaimer:
      "Cet outil a une vocation informative et ne constitue pas un conseil juridique, comptable ou fiscal personnalisé. L'IFICI est régi par l'article 58-A du Código dos Benefícios Fiscais et la Portaria 352/2024. La fiscalité dépend de votre situation et de la convention fiscale France-Portugal du 14/01/1971. Informations à jour en 2026, susceptibles d'évoluer à chaque Orçamento do Estado.",
    residence: {
      title: "Et selon votre pays de résidence actuel ?",
      help: "Votre éligibilité à l'IFICI se joue au Portugal. Mais le vrai point de vigilance est souvent dans votre pays de résidence actuel : convention fiscale, risque de requalification, ou contrôle des changes. Indiquez-le pour un repère, ce n'est ni stocké ni un conseil personnalisé.",
      placeholder: "Sélectionnez votre pays",
      options: [
        { code: "FR", label: "France" },
        { code: "BE", label: "Belgique" },
        { code: "CH", label: "Suisse" },
        { code: "LU", label: "Luxembourg" },
        { code: "MC", label: "Monaco" },
        { code: "MA", label: "Maroc" },
        { code: "TN", label: "Tunisie" },
        { code: "DZ", label: "Algérie" },
        { code: "OTHER", label: "Autre pays" },
      ],
      notes: {
        FR: {
          text: "Convention France-Portugal de 1971. Le vrai risque : rester résident fiscal français (foyer, direction effective) et voir la société portugaise requalifiée, ou relever des règles de société étrangère contrôlée. À cadrer avant de bouger, avec un fiscaliste.",
          link: "Société au Portugal & vie en France",
          href: "/guides/societe-portugal-sans-risque-france",
        },
        BE: {
          text: "Convention belgo-portugaise de 1969. Point de vigilance : la « taxe Caïman » si vous restez résident belge, qui peut imposer par transparence certains revenus d'une structure étrangère. À valider avec un fiscaliste.",
          link: "Créer depuis la Belgique",
          href: "/depuis/belgique",
        },
        CH: {
          text: "Pas de société étrangère contrôlée classique en Suisse, mais un risque réel de siège de direction effective : une société portugaise pilotée depuis la Suisse peut y devenir imposable. À valider avec un fiscaliste.",
          link: "Créer depuis la Suisse",
          href: "/depuis/suisse",
        },
        LU: {
          text: "Convention de 1999, règles CFC issues de la directive ATAD et siège de direction effective : ce qu'un résident luxembourgeois doit anticiper avant de structurer au Portugal.",
          link: "Créer depuis le Luxembourg",
          href: "/depuis/luxembourg",
        },
        MC: {
          text: "Résident monégasque : votre situation a ses propres règles. Le mieux est d'en parler directement pour un repère adapté.",
          link: "Nous écrire",
          href: "/contact",
        },
        MA: {
          text: "Depuis le Maroc, le sujet central n'est pas la société étrangère contrôlée mais le contrôle des changes (Office des Changes) et, le cas échéant, le visa : un résident ne peut pas librement détenir une société à l'étranger sans cadre. À vérifier avant tout projet.",
          link: "Créer depuis le Maroc",
          href: "/depuis/maroc",
        },
        TN: {
          text: "Depuis la Tunisie, le contrôle des changes (en cours de libéralisation) reste déterminant : l'investissement à l'étranger est largement encadré. À dater et vérifier avec un professionnel.",
          link: "Créer depuis la Tunisie",
          href: "/depuis/tunisie",
        },
        DZ: {
          text: "Depuis l'Algérie, le contrôle des changes est strict et reste le point bloquant principal pour détenir une société à l'étranger. À cadrer en amont.",
          link: "Créer depuis l'Algérie",
          href: "/depuis/algerie",
        },
        OTHER: {
          text: "Quel que soit votre pays, le principe est le même : créer au Portugal ne règle pas votre situation dans votre pays de résidence. C'est ce point qu'il faut cadrer en premier.",
          link: "Créer depuis l'étranger",
          href: "/creer-societe-portugal-depuis-letranger",
        },
      },
    },
    results: {
      R1: {
        badge: "Votre profil semble compatible avec l'IFICI",
        tone: "ok" as const,
        verdict:
          "D'après vos réponses, votre profil correspond à l'une des voies d'éligibilité de l'IFICI. C'est une indication, pas une confirmation : l'éligibilité réelle dépend de la vérification de votre profession (Anexo I), de votre entité (CAE, export, reconnaissance officielle) et du respect de la procédure.",
        explanation:
          "L'IFICI ouvre un taux d'IRS de 20 % sur les revenus d'activité éligible pendant 10 ans non renouvelables, avec exonération de la plupart des revenus étrangers actifs. Lors d'un échange gratuit, Audrey vérifie la cohérence de votre projet et vous met en relation avec un fiscaliste partenaire pour sécuriser la demande.",
      },
      R2: {
        badge: "L'IFICI ne semble pas s'appliquer à votre situation",
        tone: "no" as const,
        reasons: {
          residencePT:
            "Vous avez été résident fiscal au Portugal au cours des 5 dernières années, la condition de non-résidence n'est pas remplie.",
          dejaBeneficiaire:
            "Vous avez déjà bénéficié du RNH ou de l'IFICI ; le régime n'est pas cumulable ni renouvelable.",
          secteurNonEligible:
            "Votre activité (freelance, e-commerce, profession non listée, ou entreprise réalisant moins de 50 % à l'export) ne relève pas des professions et secteurs éligibles.",
          revenusPassifs:
            "L'IFICI ne couvre que les revenus d'une activité professionnelle éligible, pas les revenus de placements ou de patrimoine.",
        },
        explanation:
          "Cela ne signifie pas que s'installer au Portugal n'a pas d'intérêt pour vous, mais l'avantage ne passera pas par l'IFICI. D'autres leviers existent (structuration de société, régime simplifié de la catégorie B, IRC PME à 15 % sur les premiers 50 000 €), à étudier selon votre cas.",
      },
      R3: {
        badge: "Votre éligibilité dépend de points à vérifier",
        tone: "maybe" as const,
        verdict:
          "Votre profil pourrait être éligible, mais des éléments déterminants restent à confirmer : la part d'export réelle de l'entreprise, le CAE, la reconnaissance officielle de l'entité ou du projet, ou votre statut de résidence.",
        explanation:
          "C'est précisément la situation la plus fréquente, et la plus piégeuse. La reconnaissance préalable de l'entité par l'autorité compétente et la condition d'export sont des points techniques où un accompagnement fait la différence.",
      },
      R4: {
        badge: "L'IFICI ne concerne pas les retraités, voici ce qui s'applique vraiment",
        tone: "no" as const,
        verdict:
          "Soyons clairs : contrairement à ce qu'affirment encore beaucoup de contenus en ligne, l'IFICI (souvent appelé « RNH 2.0 ») ne s'applique pas aux pensions de retraite. L'ancien avantage de 10 % sur les pensions étrangères a disparu.",
        variants: {
          PENS_PRIVE:
            "Votre pension du secteur privé devient imposable au Portugal (pays de résidence), au barème progressif de l'IRS (catégorie H). Selon le montant, l'imposition portugaise peut être supérieure ou inférieure à l'imposition française, c'est à comparer au cas par cas.",
          PENS_PUBLIC:
            "Votre pension publique (fonction publique, militaire, magistrat, agent titulaire) reste imposable en France, en application de l'article 19 de la convention fiscale France-Portugal de 1971, pas au Portugal.",
          PENS_MIXTE:
            "Vos pensions relèvent de deux régimes différents : la part privée est imposable au Portugal (barème IRS), la part publique reste imposable en France (art. 19 de la convention de 1971). La répartition mérite une analyse précise.",
        },
        conclusion:
          "L'intérêt d'une installation au Portugal pour un retraité se joue désormais sur une comparaison France/Portugal réelle, faite avant de bouger. C'est exactement ce qu'un fiscaliste partenaire peut chiffrer pour vous.",
      },
    },
  },
  en: {
    intro: {
      kicker: "Informative pre-qualification, no email required to see your result.",
      start: "Start the test",
    },
    progress: (n: number) => `Question ${n}`,
    back: "Back",
    banner: "Your result · IFICI 2026 regime",
    methodTitle: "What is this test based on?",
    methodBody:
      "This result is computed from your answers and the IFICI criteria in force in 2026 (art. 58-A of the Código dos Benefícios Fiscais; Portaria 352/2024). It is an automated, informative pre-qualification, not personalised tax advice nor an administrative decision. Your actual eligibility depends on a full review of your situation.",
    deadline:
      "The application is filed on the Portal das Finanças before 15 January of the year following your move. It is a hard deadline: missing it loses one or more of the 10 years.",
    restart: "Retake the test",
    cta: {
      title: "Let's discuss your case, free of charge.",
      body: "Audrey reviews your situation, tells you frankly what applies, and connects you with the right partner tax adviser if needed. First conversation 100% free, no commitment.",
      button: "Book a free conversation",
    },
    email: {
      title: "Get your result and next steps by email",
      optional: "Optional, your result stays displayed above.",
      placeholder: "Your email address",
      consentExec: "Send me a copy of my result and my next steps.",
      consentMkt: "I'd like to receive Business Portugal's tax tips and news. Unsubscribe anytime.",
      submit: "Get my result",
      success: "Noted. If you ticked the news option, please confirm the email we just sent.",
      error: "Sending failed. Try again, or book a conversation directly below.",
      privacy:
        "Your data is processed by Lovelyparallel, Lda and used only for the purposes you ticked.",
    },
    disclaimer:
      "This tool is for information only and does not constitute personalised legal, accounting or tax advice. The IFICI is governed by art. 58-A of the Código dos Benefícios Fiscais and Portaria 352/2024. Taxation depends on your situation and on the France-Portugal tax treaty of 14/01/1971. Information up to date in 2026, subject to change at each Orçamento do Estado.",
    residence: {
      title: "And depending on your current country of residence?",
      help: "Your IFICI eligibility plays out in Portugal. But the real point of attention is often in your current country of residence: tax treaty, reclassification risk, or exchange controls. Indicate it for guidance, it is neither stored nor personalised advice.",
      placeholder: "Select your country",
      options: [
        { code: "FR", label: "France" },
        { code: "BE", label: "Belgium" },
        { code: "CH", label: "Switzerland" },
        { code: "LU", label: "Luxembourg" },
        { code: "MC", label: "Monaco" },
        { code: "MA", label: "Morocco" },
        { code: "TN", label: "Tunisia" },
        { code: "DZ", label: "Algeria" },
        { code: "OTHER", label: "Another country" },
      ],
      notes: {
        FR: {
          text: "France-Portugal treaty of 1971. The real risk: remaining a French tax resident (home, effective management) and having the Portuguese company reclassified, or falling under controlled-foreign-company rules. To frame before moving, with a tax adviser.",
          link: "Portuguese company & living in France",
          href: "/guides/societe-portugal-sans-risque-france",
        },
        BE: {
          text: "Belgium-Portugal treaty of 1969. Point of attention: the « Cayman tax » if you remain a Belgian resident, which may tax by transparency certain income of a foreign structure. To validate with a tax adviser.",
          link: "Set up from Belgium",
          href: "/depuis/belgique",
        },
        CH: {
          text: "No classic controlled-foreign-company rule in Switzerland, but a real place-of-effective-management risk: a Portuguese company run from Switzerland may become taxable there. To validate with a tax adviser.",
          link: "Set up from Switzerland",
          href: "/depuis/suisse",
        },
        LU: {
          text: "1999 treaty, CFC rules from the ATAD directive and place of effective management: what a Luxembourg resident must anticipate before structuring in Portugal.",
          link: "Set up from Luxembourg",
          href: "/depuis/luxembourg",
        },
        MC: {
          text: "Monaco resident: your situation has its own rules. The best is to discuss it directly for tailored guidance.",
          link: "Get in touch",
          href: "/contact",
        },
        MA: {
          text: "From Morocco, the core issue is not the controlled foreign company but exchange controls (Office des Changes) and, where relevant, the visa: a resident cannot freely hold a company abroad without a framework. To check before any project.",
          link: "Set up from Morocco",
          href: "/depuis/maroc",
        },
        TN: {
          text: "From Tunisia, exchange controls (being liberalised) remain decisive: investing abroad is largely regulated. To date and verify with a professional.",
          link: "Set up from Tunisia",
          href: "/depuis/tunisie",
        },
        DZ: {
          text: "From Algeria, exchange controls are strict and remain the main blocking point for holding a company abroad. To frame upfront.",
          link: "Set up from Algeria",
          href: "/depuis/algerie",
        },
        OTHER: {
          text: "Whatever your country, the principle is the same: setting up in Portugal does not settle your situation in your country of residence. That is the point to frame first.",
          link: "Set up from abroad",
          href: "/creer-societe-portugal-depuis-letranger",
        },
      },
    },
    results: {
      R1: {
        badge: "Your profile seems compatible with the IFICI",
        tone: "ok" as const,
        verdict:
          "Based on your answers, your profile matches one of the IFICI eligibility paths. This is an indication, not a confirmation: actual eligibility depends on verifying your profession (Anexo I), your entity (CAE, exports, official recognition) and following the procedure.",
        explanation:
          "The IFICI grants a 20% IRS rate on eligible activity income for 10 non-renewable years, with most active foreign income exempt. In a free conversation, Audrey checks the consistency of your project and connects you with a partner tax adviser to secure the application.",
      },
      R2: {
        badge: "The IFICI does not seem to apply to your situation",
        tone: "no" as const,
        reasons: {
          residencePT:
            "You were a tax resident in Portugal in the last 5 years, the non-residence condition is not met.",
          dejaBeneficiaire:
            "You have already benefited from the RNH or the IFICI; the regime is neither cumulative nor renewable.",
          secteurNonEligible:
            "Your activity (freelance, e-commerce, an unlisted profession, or a company exporting less than 50%) is not among the eligible professions and sectors.",
          revenusPassifs:
            "The IFICI only covers eligible professional-activity income, not investment or wealth income.",
        },
        explanation:
          "This doesn't mean moving to Portugal isn't worthwhile for you, but the advantage won't come from the IFICI. Other levers exist (company structuring, the simplified category-B regime, SME IRC at 15% on the first €50,000), to study case by case.",
      },
      R3: {
        badge: "Your eligibility depends on points to verify",
        tone: "maybe" as const,
        verdict:
          "Your profile could be eligible, but decisive elements remain to be confirmed: the company's actual export share, the CAE, the official recognition of the entity or project, or your residence status.",
        explanation:
          "This is precisely the most common, and trickiest, situation. The prior recognition of the entity by the competent authority and the export condition are technical points where support makes the difference.",
      },
      R4: {
        badge: "The IFICI does not concern retirees, here's what really applies",
        tone: "no" as const,
        verdict:
          "Let's be clear: contrary to what much online content still claims, the IFICI (often called «NHR 2.0») does not apply to retirement pensions. The former 10% advantage on foreign pensions is gone.",
        variants: {
          PENS_PRIVE:
            "Your private-sector pension becomes taxable in Portugal (country of residence), under the progressive IRS scale (category H). Depending on the amount, Portuguese taxation may be higher or lower than French taxation, to compare case by case.",
          PENS_PUBLIC:
            "Your public pension (civil service, military, etc.) remains taxable in France, under article 19 of the 1971 France-Portugal tax treaty, not in Portugal.",
          PENS_MIXTE:
            "Your pensions fall under two regimes: the private part is taxable in Portugal (IRS scale), the public part remains taxable in France (art. 19 of the 1971 treaty). The split deserves a precise analysis.",
        },
        conclusion:
          "For a retiree, the value of moving to Portugal now hinges on a real France/Portugal comparison, done before moving. That is exactly what a partner tax adviser can quantify for you.",
      },
    },
  },
} as const;

const toneRing: Record<"ok" | "no" | "maybe", string> = {
  ok: "border-l-accent",
  no: "border-l-primary",
  maybe: "border-l-foreground/40",
};

function LeadSubmit({ label, sending }: { label: string; sending: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => track("ifici_email_submit")}
      className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-5 disabled:opacity-50")}
    >
      {pending ? sending : label}
    </button>
  );
}

export function IficiQuiz({ locale }: { locale: string }) {
  const l: Loc = locale === "en" ? "en" : "fr";
  const Q = ificiQuestions(l);
  const t = REVEAL[l];

  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [step, setStep] = useState<StepId>("q1");
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<IficiAnswers>({});
  const [result, setResult] = useState<IficiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState<string>("");

  const leadInitial: IficiLeadState = { status: "idle" };
  const [leadState, leadAction] = useActionState(submitIficiLead, leadInitial);

  function reset() {
    setPhase("intro");
    setStep("q1");
    setHistory([]);
    setAnswers({});
    setResult(null);
    setResidence("");
  }

  async function choose(code: string) {
    const updated: IficiAnswers = { ...answers, [step]: code };
    setAnswers(updated);
    const next = nextStep(step, updated);
    if (next === "done") {
      setLoading(true);
      track("ifici_complete");
      const r = await getIficiResult(updated);
      setResult(r);
      track(`ifici_result_${r.code}`);
      setPhase("result");
      setLoading(false);
      return;
    }
    setHistory((h) => [...h, step]);
    setStep(next);
  }

  function back() {
    setHistory((h) => {
      const copy = [...h];
      const prev = copy.pop();
      if (prev) setStep(prev);
      return copy;
    });
  }

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="border border-border bg-card">
        <div className="rule-brass" />
        <div className="p-8 lg:p-10">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t.intro.kicker}
          </p>
          <button
            type="button"
            onClick={() => {
              track("ifici_start");
              setPhase("quiz");
            }}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group mt-6")}
          >
            {t.intro.start}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    );
  }

  // ── Quiz ────────────────────────────────────────────────────────────────
  if (phase === "quiz") {
    const q = Q[step];
    const num = history.length + 1;
    const pct = Math.min(100, Math.round((num / 7) * 100));
    return (
      <div className="border border-border bg-card">
        <div className="h-1 w-full bg-border">
          <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="p-8 lg:p-10">
          <div className="flex items-center justify-between">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
              {t.progress(num)}
            </p>
            {history.length > 0 ? (
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                {t.back}
              </button>
            ) : null}
          </div>
          <h2 className="mt-5 font-serif text-2xl leading-snug sm:text-[1.7rem]">{q.title}</h2>
          {q.help ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{q.help}</p>
          ) : null}
          <div className="mt-7 space-y-3">
            {q.options.map((o) => (
              <button
                key={o.code}
                type="button"
                disabled={loading}
                onClick={() => choose(o.code)}
                className="flex min-h-[3.25rem] w-full items-center gap-4 border border-border bg-background px-5 py-3 text-left leading-relaxed transition-colors hover:border-accent hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
              >
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                  aria-hidden
                />
                <span>{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Reveal ────────────────────────────────────────────────────────────────
  if (!result) return null;
  const r = result;
  const res = t.results[r.code];
  const showDeadline =
    (r.code === "R1" || r.code === "R3") &&
    (answers.horizon === "DEJA" || answers.horizon === "M12");

  let verdict = "";
  let explanation = "";
  if (r.code === "R2") {
    const r2 = res as { reasons: Record<string, string>; explanation: string };
    verdict = r2.reasons[r.reasonKey ?? "secteurNonEligible"];
    explanation = r2.explanation;
  } else if (r.code === "R4") {
    const r4 = res as { verdict: string; variants: Record<string, string>; conclusion: string };
    verdict = `${r4.verdict} ${r4.variants[r.variant ?? "PENS_MIXTE"]}`;
    explanation = r4.conclusion;
  } else {
    const r13 = res as { verdict: string; explanation: string };
    verdict = r13.verdict;
    explanation = r13.explanation;
  }

  return (
    <div className="space-y-8">
      {/* Résultat */}
      <div className={cn("border border-border border-l-2 bg-card", toneRing[res.tone])}>
        <div className="p-8 lg:p-10">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t.banner}
          </p>
          <h2 className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">{res.badge}</h2>
          <p className="mt-5 text-lg leading-relaxed">{verdict}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{explanation}</p>
          {showDeadline ? (
            <p className="mt-6 border-l-2 border-accent bg-background py-3 pl-4 pr-4 text-sm leading-relaxed text-muted-foreground">
              {t.deadline}
            </p>
          ) : null}
        </div>
      </div>

      {/* Méthode (DGCCRF) */}
      <div className="border border-border p-7">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">{t.methodTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.methodBody}</p>
      </div>

      {/* Contextualisation par pays de résidence (informatif, n'affecte pas le verdict) */}
      <div className="border border-border p-7">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
          {t.residence.title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.residence.help}</p>
        <select
          value={residence}
          aria-label={t.residence.title}
          onChange={(e) => {
            setResidence(e.target.value);
            if (e.target.value) track(`ifici_residence_${e.target.value}`);
          }}
          className="mt-5 block h-12 w-full max-w-sm rounded-sm border border-border bg-background px-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <option value="">{t.residence.placeholder}</option>
          {t.residence.options.map((o) => (
            <option key={o.code} value={o.code}>
              {o.label}
            </option>
          ))}
        </select>
        {residence ? (
          <div className="mt-5 border-l-2 border-accent pl-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.residence.notes[residence as keyof typeof t.residence.notes].text}
            </p>
            <Link
              href={t.residence.notes[residence as keyof typeof t.residence.notes].href}
              className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-accent underline-offset-[6px] hover:underline"
            >
              {t.residence.notes[residence as keyof typeof t.residence.notes].link}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>

      {/* Capture email, non bloquante */}
      {leadState.status === "success" ? (
        <div className="border border-border bg-card p-7">
          <span
            className="inline-grid h-10 w-10 place-items-center rounded-sm border border-accent text-accent"
            aria-hidden
          >
            <Check className="h-5 w-5" />
          </span>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t.email.success}</p>
        </div>
      ) : (
        <form action={leadAction} className="border border-border bg-card p-7">
          <h3 className="font-serif text-xl">{t.email.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{t.email.optional}</p>
          {/* Honeypot anti-spam */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0"
          />
          <input type="hidden" name="locale" value={l} />
          <input type="hidden" name="resultCode" value={r.code} />
          <input
            type="email"
            name="email"
            required
            placeholder={t.email.placeholder}
            className="mt-5 block h-12 w-full rounded-sm border border-border bg-background px-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <input type="checkbox" name="consentExecution" className="mt-1 h-4 w-4 accent-accent" />
            <span>{t.email.consentExec}</span>
          </label>
          <label className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <input type="checkbox" name="consentMarketing" className="mt-1 h-4 w-4 accent-accent" />
            <span>{t.email.consentMkt}</span>
          </label>
          {leadState.status === "error" ? (
            <p className="mt-4 font-sans text-sm text-primary" role="alert">
              {t.email.error}
            </p>
          ) : null}
          <LeadSubmit label={t.email.submit} sending="…" />
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.email.privacy}</p>
        </form>
      )}

      {/* CTA échange gratuit */}
      <div className="border border-border bg-primary px-7 py-10 text-center text-primary-foreground lg:px-12">
        <h3 className="font-serif text-2xl sm:text-3xl">{t.cta.title}</h3>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/80">
          {t.cta.body}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("ifici_cta_calendly")}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
          >
            {t.cta.button}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={reset}
            className="font-sans text-xs uppercase tracking-[0.14em] text-primary-foreground/70 underline-offset-[6px] hover:underline"
          >
            {t.restart}
          </button>
        </div>
      </div>

      <p className="border-l-2 border-accent pl-5 text-sm italic leading-relaxed text-muted-foreground">
        {t.disclaimer}
      </p>
    </div>
  );
}
