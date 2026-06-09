import type { Metadata } from "next";
import { EB_Garamond, Schibsted_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import "@/platform/platform.css";

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
    default: "Plateforme, Business Portugal",
    template: "%s · Plateforme",
  },
  description: "CRM, missions, documents et portail client, plateforme Propul'SEO.",
  robots: { index: false, follow: false },
};

// Thème (dark) + activation JS avant le premier paint. Pas d'animation d'arrivée ici.
const initScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');}catch(e){}})();`;

export default function PlatformRootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${ebGaramond.variable} ${schibsted.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: init synchrone (thème) anti-FOUC */}
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        {children}
      </body>
    </html>
  );
}
