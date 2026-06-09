import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ManageCookiesLink } from "./cookie-banner";

const headCls = "font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground";
const linkCls = "text-foreground/75 transition-colors hover:text-foreground";
const metaLinkCls = "transition-colors hover:text-foreground";

export async function Footer() {
  const t = await getTranslations("footer");

  const groups = [
    {
      title: t("expertiseTitle"),
      links: [
        { href: "/services", label: t("nav.services") },
        { href: "/creation-societe", label: t("nav.creation") },
        { href: "/creer-societe-portugal-depuis-letranger", label: t("nav.depuisLetranger") },
        { href: "/outils", label: t("nav.tools") },
        { href: "/avis-et-garanties", label: t("nav.guarantees") },
      ],
    },
    {
      title: t("resourcesTitle"),
      links: [
        { href: "/guides/ifici-2026", label: t("nav.ifici") },
        { href: "/comparatifs", label: t("nav.comparatifs") },
        { href: "/profils", label: t("nav.profils") },
        { href: "/faq", label: t("nav.faq") },
        { href: "/blog", label: t("nav.blog") },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="rule-brass" />

      {/* Corps : marque + colonnes de navigation regroupées + contact humain */}
      <div className="site-frame grid gap-x-8 gap-y-14 py-20 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.15fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-serif text-2xl tracking-tight"
          >
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
            Business Portugal
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed text-muted-foreground">{t("tagline")}</p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-7")}
          >
            {t("bookCall")}
          </Link>
        </div>

        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h4 className={headCls}>{group.title}</h4>
            <ul className="mt-5 space-y-3">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact : visage humain + ligne directe (réassurance) */}
        <div>
          <h4 className={headCls}>{t("contactTitle")}</h4>
          <p className="mt-5 font-serif text-lg leading-snug">Audrey Marques</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("contactRole")}</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href="tel:+351937424708" className={linkCls}>
                +351 937 424 708
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/audrey-marques-97728114b/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                LinkedIn
              </a>
            </li>
            <li className="text-muted-foreground">{t("location")}</li>
          </ul>
        </div>
      </div>

      {/* Colophon : entité légale + NIF · liens légaux + crédit sur une ligne */}
      <div className="border-t border-border">
        <div className="grid gap-4 px-5 py-7 font-sans text-xs text-muted-foreground md:grid-cols-3 md:items-center lg:px-8">
          <p className="leading-relaxed md:justify-self-start">{t("entity")}</p>
          <p className="md:justify-self-center md:text-center">
            <a
              href="https://propulseo-site.com"
              target="_blank"
              rel="noopener noreferrer"
              className={metaLinkCls}
            >
              {t("madeBy")}
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-self-end">
            <Link href="/mentions-legales" className={metaLinkCls}>
              {t("legal.notice")}
            </Link>
            <Link href="/confidentialite" className={metaLinkCls}>
              {t("legal.privacy")}
            </Link>
            <ManageCookiesLink className={cn("text-left", metaLinkCls)} />
          </div>
        </div>
      </div>
    </footer>
  );
}
