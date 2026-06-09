import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function FinalCta() {
  const t = await getTranslations("cta");

  return (
    <section id="contact" className="scroll-mt-20 px-5 py-20 lg:py-28">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground lg:px-16">
        <div className="calcada absolute inset-0 opacity-30" aria-hidden />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t("subtitle")}
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href="https://calendly.com/businessportugal"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group bg-accent")}
            >
              {t("button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/70">{t("reassurance")}</p>
        </div>
      </div>
    </section>
  );
}
