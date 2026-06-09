import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";

export async function Positioning() {
  const t = await getTranslations("positioning");
  const points = t.raw("points") as string[];

  return (
    <section className="site-frame py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
              {t("title")}
            </h2>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">{t("body")}</p>
          </Reveal>
          <div className="mt-10 border-t border-border">
            {points.map((p, i) => (
              <Reveal key={p} delay={i * 70}>
                <div className="flex items-baseline gap-5 border-b border-border py-4">
                  <span className="index-num text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.05rem]">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
