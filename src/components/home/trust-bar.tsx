import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";

export async function TrustBar() {
  const t = await getTranslations("trust");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="border-y border-border bg-card">
      <div className="site-frame grid sm:grid-cols-3">
        {items.map((it, i) => (
          <Reveal
            key={it.label}
            delay={i * 90}
            className={
              i > 0
                ? "border-t border-border py-10 sm:border-t-0 sm:border-l sm:py-12 sm:pl-10"
                : "py-10 sm:py-12 sm:pr-10"
            }
          >
            <div className="font-serif text-4xl lg:text-5xl">{it.value}</div>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {it.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
