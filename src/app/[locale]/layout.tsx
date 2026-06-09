import type { Metadata } from "next";
import { EB_Garamond, Schibsted_Grotesk } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { IntroCurtain } from "@/components/site/intro-curtain";
import { Navbar } from "@/components/site/navbar";
import { routing } from "@/i18n/routing";
import "../globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Business Portugal — Créer sa société au Portugal, accompagné·e",
    template: "%s · Business Portugal",
  },
  description:
    "Cabinet d'accompagnement à la création et l'implantation d'entreprise au Portugal : NIF, société, compte bancaire, réseau de partenaires comptables et fiscaux. Par Audrey Marques, à Lisbonne.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Avant le premier paint : active les animations (.js), le thème, et décide
// si l'animation d'arrivée doit être jouée (sautée si reduced-motion ou déjà vue).
const initScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('bp-intro-seen'))d.classList.add('bp-intro-skip');}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${ebGaramond.variable} ${schibsted.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: init synchrone (thème + animations) anti-FOUC */}
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <NextIntlClientProvider messages={messages}>
          <IntroCurtain />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Aller au contenu
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
