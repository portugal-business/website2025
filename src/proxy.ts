import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 : convention "proxy" (ex-"middleware"). Gère le routage i18n next-intl.
export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf : API, fichiers internes Next, fichiers statiques,
  // et les espaces de la PLATEFORME (app/portal) qui ne passent pas par l'i18n next-intl.
  matcher: ["/((?!api|_next|_vercel|app|portal|launch|.*\\..*).*)"],
};
