import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Positioning() {
  const t = await getTranslations("positioning");
  const points = t.raw("points") as string[];

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 text-3xl sm:text-4xl">{t("title")}</h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">{t("body")}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
