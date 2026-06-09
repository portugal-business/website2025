// Client Supabase côté navigateur (Client Components).
// EXCLU du build front jusqu'à la migration : nécessite @supabase/ssr.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  );
}
