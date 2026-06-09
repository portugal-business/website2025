import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function FinalCta() {
  const t = await getTranslations("cta");

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <div className="mx-auto max-w-5xl border border-border bg-primary px-8 py-20 text-center text-primary-foreground lg:px-16 lg:py-24">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">{t("title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
            >
              {t("button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-7 font-sans text-xs uppercase tracking-[0.16em] text-primary-foreground/55">
            {t("reassurance")}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
