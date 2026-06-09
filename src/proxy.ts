import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 : convention "proxy" (ex-"middleware"). Gère le routage i18n next-intl.
export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf API, fichiers internes Next et fichiers statiques.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
