// Client service-role, SERVEUR UNIQUEMENT. JAMAIS importé dans un Client Component.
// Usage : ingestion des leads inbound (POST API), enregistrement de signature,
// facturation Propul'SEO, création de comptes, opérations qui contournent la RLS.
// EXCLU du build front jusqu'à la migration : nécessite @supabase/supabase-js.
import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
