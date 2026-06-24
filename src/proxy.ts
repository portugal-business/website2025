import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 : convention "proxy" (ex-"middleware"). Gère le routage i18n next-intl.
const intlMiddleware = createMiddleware(routing);

// Préfixes de la plateforme SaaS (encore mockée, front-first). Servis UNIQUEMENT
// si NEXT_PUBLIC_ENABLE_PLATFORM === "true" (dev / preview SaaS). En production
// vitrine, ces routes renvoient 404 — réversible en 1 variable d'env, sans
// toucher au code de la plateforme.
const PLATFORM_PREFIXES = ["/app", "/portal", "/launch"];
const PLATFORM_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PLATFORM === "true";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPlatform = PLATFORM_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isPlatform) {
    // Plateforme désactivée (prod vitrine) : 404 avant tout rendu (aucune
    // session mock ni fausse donnée n'est servie).
    if (!PLATFORM_ENABLED) {
      return new NextResponse(null, { status: 404 });
    }
    // Plateforme activée : on laisse passer SANS l'i18n next-intl.
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // On NE retire plus app|portal|launch du matcher : le proxy doit les voir
  // pour pouvoir les bloquer. On garde l'exclusion API / internes / fichiers.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
