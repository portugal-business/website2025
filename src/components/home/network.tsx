import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";

export async function Network() {
  const t = await getTranslations("network");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="reseau" className="scroll-mt-24">
      <div className="site-frame py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 70} className="bg-card">
              <div className="h-full p-7">
                <span className="index-num text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl">{it.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted-foreground">{it.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground">
            {t("note")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
