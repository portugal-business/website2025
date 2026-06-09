import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="methode" className="scroll-mt-24 border-t border-border">
      <div className="site-frame py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">{t("eyebrow")}</p>
              <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{t("title")}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("subtitle")}</p>
            </Reveal>
          </div>
          <div className="border-t border-border">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-7">
                  <span className="index-num text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl">{s.title}</h3>
                    <p className="mt-1.5 text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-lg italic text-muted-foreground">
            {t("deliverable")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
