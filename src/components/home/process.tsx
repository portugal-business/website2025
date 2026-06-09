import { getTranslations } from "next-intl/server";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="methode" className="scroll-mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-card p-6">
              <div className="font-display text-2xl text-primary/30">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 rounded-lg bg-primary/5 px-5 py-4 text-sm ring-1 ring-primary/10">
          <span className="font-medium text-primary">✓ </span>
          {t("deliverable")}
        </p>
      </div>
    </section>
  );
}
