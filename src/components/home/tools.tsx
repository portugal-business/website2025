import { ArrowRight, Calculator, ScrollText } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";

// Section d'accueil mettant en avant les 2 outils interactifs (test IFICI + simulateur).
// Dictionnaire bilingue local (auto-suffisant), cohérent avec DESIGN-SYSTEM.md.
type IconKey = "scroll" | "calc";

type Tool = {
  icon: IconKey;
  index: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};
type Copy = { eyebrow: string; title: string; lead: string; tools: Tool[]; hubCta: string };

const ICONS: Record<IconKey, typeof Calculator> = { scroll: ScrollText, calc: Calculator };

const COPY: { fr: Copy; en: Copy } = {
  fr: {
    eyebrow: "Outils gratuits",
    title: "Avant de nous parler, testez par vous-même.",
    lead: "Deux outils interactifs, gratuits et datés 2026, pour répondre aux questions que tout le monde se pose vraiment, résultat immédiat à l'écran, sans inscription.",
    tools: [
      {
        icon: "scroll",
        index: "01",
        kicker: "Fiscalité 2026",
        title: "Test d'éligibilité IFICI",
        description:
          "En 6 questions, voyez si le régime IFICI (« RNH 2.0 ») vous concerne, réponse honnête, y compris pour les retraités et les freelances sans export.",
        href: "/outils/test-eligibilite-ifici",
        cta: "Faire le test",
      },
      {
        icon: "calc",
        index: "02",
        kicker: "Recrutement 2026",
        title: "Simulateur du coût d'un salarié",
        description:
          "Calculez le coût employeur réel au Portugal : TSU 23,75 %, 14 mois, repas, assurance. Recalcul en direct, méthode et sources affichées.",
        href: "/outils/simulateur-cout-salarie",
        cta: "Ouvrir le simulateur",
      },
    ],
    hubCta: "Voir tous les outils",
  },
  en: {
    eyebrow: "Free tools",
    title: "Before talking to us, test it for yourself.",
    lead: "Two interactive, free, 2026-dated tools answering the questions everyone really asks, instant on-screen result, no sign-up.",
    tools: [
      {
        icon: "scroll",
        index: "01",
        kicker: "Taxation 2026",
        title: "IFICI eligibility test",
        description:
          "In 6 questions, see whether the IFICI regime («NHR 2.0») applies to you, an honest answer, including for retirees and freelancers without exports.",
        href: "/outils/test-eligibilite-ifici",
        cta: "Take the test",
      },
      {
        icon: "calc",
        index: "02",
        kicker: "Recruitment 2026",
        title: "Employee cost simulator",
        description:
          "Calculate the real employer cost in Portugal: TSU 23.75%, 14 months, meal allowance, insurance. Live recalculation, method and sources shown.",
        href: "/outils/simulateur-cout-salarie",
        cta: "Open the simulator",
      },
    ],
    hubCta: "See all tools",
  },
};

export async function HomeTools() {
  const locale = await getLocale();
  const c = locale === "en" ? COPY.en : COPY.fr;

  return (
    <section className="border-t border-border bg-card">
      <div className="site-frame py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">{c.eyebrow}</p>
              <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
                {c.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
              <Reveal delay={120}>
                <Link
                  href="/outils"
                  className="mt-7 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] hover:underline"
                >
                  {c.hubCta}
                  <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                </Link>
              </Reveal>
            </Reveal>
          </div>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.tools.map((tool, i) => {
              const Icon = ICONS[tool.icon];
              return (
                <Reveal key={tool.href} delay={i * 70} className="bg-background">
                  <Link href={tool.href} className="group flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-accent" aria-hidden />
                      <span className="index-num text-sm text-accent">{tool.index}</span>
                    </div>
                    <p className="mt-6 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                      {tool.kicker}
                    </p>
                    <h3 className="mt-2 font-serif text-xl transition-colors group-hover:text-accent">
                      {tool.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground underline-offset-[6px] group-hover:underline">
                      {tool.cta}
                      <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
