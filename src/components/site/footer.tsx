import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="azulejo-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div className="font-display text-lg font-semibold">Business Portugal</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("legalTitle")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/mentions-legales" className="transition-colors hover:text-foreground">
                {t("legal.notice")}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="transition-colors hover:text-foreground">
                {t("legal.privacy")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("contactTitle")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="tel:+351937424708" className="transition-colors hover:text-foreground">
                +351 937 424 708
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/audrey-marques-97728114b/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t("entity")}</p>
          <p>
            © {year} Business Portugal. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
