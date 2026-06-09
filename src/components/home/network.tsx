import { getTranslations } from "next-intl/server";

export async function Network() {
  const t = await getTranslations("network");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="reseau" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
            >
              <div className="h-1 w-8 rounded-full bg-accent" />
              <h3 className="mt-4 text-lg">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">{t("note")}</p>
      </div>
    </section>
  );
}
