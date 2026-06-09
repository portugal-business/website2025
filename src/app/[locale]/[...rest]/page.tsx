import { notFound } from "next/navigation";

// Catch-all : toute route localisée non reconnue déclenche la 404 LOCALISÉE
// (src/app/[locale]/not-found.tsx), rendue à l'intérieur du layout [locale]
//, donc avec navbar + footer + maillage interne conservés.
export default function CatchAllNotFound() {
  notFound();
}
