// =====================================================================
//  Seed auth — crée les utilisateurs de démonstration via l'Admin API.
//  À lancer APRÈS `0001..0003` + `seed.sql`, avec env Supabase en place :
//    node supabase/seed-auth.mjs
//  Les metadata (app_role/org_id/client_id) sont lues par le trigger
//  handle_new_user() À L'INSERT → profils créés (contourne le guard d'UPDATE).
// =====================================================================
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.SEED_PASSWORD || "DemoBP2026!";

if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis.");
  process.exit(1);
}

const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

// UUIDs alignés sur seed.sql
const ORG_BP = "11111111-1111-4111-8111-111111111111";
const CLIENT_SOFIA = "c0000001-0000-4000-8000-000000000001";

const users = [
  {
    email: "etienne@propulseo-site.com",
    meta: { app_role: "platform_admin", full_name: "Étienne Guimbard" },
  },
  {
    email: "audrey@portugal-business.com",
    meta: { app_role: "consultant", org_id: ORG_BP, full_name: "Audrey Marques" },
  },
  {
    email: "sofia.almeida@me.com",
    meta: { app_role: "client", client_id: CLIENT_SOFIA, full_name: "Sofia Almeida" },
  },
];

for (const u of users) {
  const { error } = await sb.auth.admin.createUser({
    email: u.email,
    password,
    email_confirm: true,
    user_metadata: u.meta,
  });
  if (error && !/already/i.test(error.message)) {
    console.error(`✗ ${u.email}: ${error.message}`);
  } else {
    console.log(`✓ ${u.email} (${u.meta.app_role})`);
  }
}

console.log(`\nMot de passe de démo : ${password} (ou magic link).`);
