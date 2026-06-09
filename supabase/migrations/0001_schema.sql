-- =====================================================================
--  Plateforme Business Portugal — Schéma initial
--  Standards Propul'SEO : snake_case pluriel, UUID PK, timestamptz,
--  RLS activée sur 100 % des tables (policies dans 0002_rls.sql).
--  À VALIDER avant exécution. Aucune donnée ici (voir seed.sql).
-- =====================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid, gen_random_bytes
create extension if not exists "citext";      -- emails insensibles à la casse

-- ---------------------------------------------------------------------
--  Enums (miroir de src/platform/types.ts)
-- ---------------------------------------------------------------------
create type app_role           as enum ('platform_admin', 'consultant', 'client');
create type member_role        as enum ('owner', 'member');
create type org_status         as enum ('active', 'trial', 'paused');
create type plan_key           as enum ('starter', 'pro', 'scale');
create type lead_source        as enum ('site_form', 'tool_ifici', 'tool_simulator', 'calendly', 'manual', 'other');
create type lead_attribution   as enum ('inbound', 'own_network');
create type lead_status        as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');
create type lead_segment       as enum ('actif_eligible', 'actif_a_verifier', 'non_eligible', 'retraite', 'employeur', 'inconnu');
create type activity_type      as enum ('note', 'status_change', 'email', 'call', 'meeting', 'system');
create type company_form       as enum ('unipessoal_lda', 'lda', 'sa');
create type mission_status     as enum ('draft', 'active', 'completed', 'cancelled');
create type step_key           as enum ('echange', 'nif', 'constitution', 'certidao_rcbe_statuts', 'bancaire', 'compta');
create type step_status        as enum ('pending', 'in_progress', 'done', 'blocked');
create type document_type      as enum ('lettre_mission', 'contrat', 'facture');
create type document_status    as enum ('draft', 'sent', 'signed', 'paid', 'void');
create type file_kind          as enum ('piece_identite', 'justif_domicile', 'objet_activite', 'capital', 'identite_associes', 'nom_societe', 'nif_gerant', 'autre');
create type file_status        as enum ('requested', 'uploaded', 'validated', 'rejected');
create type billing_event_type as enum ('subscription', 'signed_client');
create type billing_status     as enum ('pending', 'invoiced', 'paid');

-- ---------------------------------------------------------------------
--  Orgs (tenants) — la clé de cloisonnement multi-tenant
-- ---------------------------------------------------------------------
create table orgs (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,                 -- raison sociale (Lovelyparallel, Lda)
  brand_name           text not null,                 -- marque (Business Portugal)
  vat_id               text,                          -- NIF/NIPC
  location             text,
  branding             jsonb not null default '{}'::jsonb,  -- { logoText, primary, accent }
  plan                 plan_key not null default 'starter',
  per_client_fee_cents integer not null default 0,    -- fee par client signé (Propul'SEO)
  monthly_fee_cents    integer not null default 0,    -- abonnement mensuel (Propul'SEO)
  status               org_status not null default 'trial',
  created_at           timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Clients (lead converti) — déclaré avant profiles (FK profiles.client_id)
-- ---------------------------------------------------------------------
create table clients (
  id                   uuid primary key default gen_random_uuid(),
  org_id               uuid not null references orgs(id) on delete cascade,
  lead_id              uuid,                           -- FK ajoutée après création de leads
  full_name            text not null,
  email                citext not null,
  phone                text,
  company_name_wanted  text,
  country_of_residence text,
  created_at           timestamptz not null default now()
);
create index idx_clients_org on clients(org_id);

-- ---------------------------------------------------------------------
--  Profiles — hub d'identité lié à auth.users
--  consultant → org_id ; client → client_id ; platform_admin → ni l'un ni l'autre
-- ---------------------------------------------------------------------
create table profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           citext unique not null,
  full_name       text,
  avatar_url      text,
  app_role        app_role not null default 'client',
  org_id          uuid references orgs(id) on delete set null,
  client_id       uuid references clients(id) on delete set null,
  locale          text not null default 'fr',
  is_active       boolean not null default true,
  last_sign_in_at timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index idx_profiles_org on profiles(org_id);
create index idx_profiles_client on profiles(client_id);

-- ---------------------------------------------------------------------
--  Membres d'org (équipe d'un consultant)
-- ---------------------------------------------------------------------
create table org_members (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid not null references orgs(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       member_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (org_id, user_id)
);
create index idx_org_members_org on org_members(org_id);

-- ---------------------------------------------------------------------
--  Leads (CRM)
-- ---------------------------------------------------------------------
create table leads (
  id                uuid primary key default gen_random_uuid(),
  org_id            uuid not null references orgs(id) on delete cascade,
  full_name         text not null,
  email             citext not null,
  phone             text,
  locale            text not null default 'fr',
  source            lead_source not null,
  attribution       lead_attribution not null default 'inbound',  -- posée par trigger (cf. set_lead_attribution)
  status            lead_status not null default 'new',
  segment           lead_segment not null default 'inconnu',
  lead_score        smallint not null default 0 check (lead_score between 0 and 100),
  context           jsonb not null default '{}'::jsonb,  -- verdict IFICI, inputs simulateur, message, projet
  owner_id          uuid references auth.users(id) on delete set null,
  client_id         uuid references clients(id) on delete set null,
  consent_marketing boolean not null default false,
  created_at        timestamptz not null default now(),
  last_activity_at  timestamptz not null default now()
);
create index idx_leads_org on leads(org_id);
create index idx_leads_org_status on leads(org_id, status);
create index idx_leads_attribution on leads(org_id, attribution);

-- FK différée clients.lead_id → leads.id
alter table clients
  add constraint clients_lead_fk foreign key (lead_id) references leads(id) on delete set null;

create table lead_activities (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid not null references orgs(id) on delete cascade,
  lead_id    uuid not null references leads(id) on delete cascade,
  type       activity_type not null,
  body       text not null,
  author     text not null,
  created_at timestamptz not null default now()
);
create index idx_lead_activities_lead on lead_activities(lead_id, created_at desc);

-- ---------------------------------------------------------------------
--  Missions (l'engagement) + tracker
-- ---------------------------------------------------------------------
create table missions (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null references orgs(id) on delete cascade,
  client_id           uuid not null references clients(id) on delete cascade,
  lead_id             uuid references leads(id) on delete set null,
  ref                 text not null,                  -- ex. BP-2026-014
  type                text not null default 'creation_societe',
  status              mission_status not null default 'draft',
  company_form        company_form not null,
  company_name_wanted text,
  nipc                text,
  started_at          timestamptz,
  completed_at        timestamptz,
  created_at          timestamptz not null default now(),
  unique (org_id, ref)
);
create index idx_missions_org on missions(org_id);
create index idx_missions_client on missions(client_id);

create table mission_steps (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references orgs(id) on delete cascade,
  mission_id  uuid not null references missions(id) on delete cascade,
  step_key    step_key not null,
  label       text not null,
  description text not null default '',
  status      step_status not null default 'pending',
  ordinal     smallint not null default 0,
  done_at     timestamptz,
  unique (mission_id, step_key)
);
create index idx_mission_steps_mission on mission_steps(mission_id);

-- ---------------------------------------------------------------------
--  Documents (lettre de mission / contrat / facture) + signatures
-- ---------------------------------------------------------------------
create table documents (
  id               uuid primary key default gen_random_uuid(),
  org_id           uuid not null references orgs(id) on delete cascade,
  mission_id       uuid not null references missions(id) on delete cascade,
  client_id        uuid not null references clients(id) on delete cascade,
  type             document_type not null,
  status           document_status not null default 'draft',
  number           text not null,                     -- séquence par org (LM-2026-014…)
  title            text not null,
  payload          jsonb not null default '{}'::jsonb, -- lignes honoraires, TVA, échéancier, sections
  total_ht_cents   integer not null default 0,
  total_ttc_cents  integer not null default 0,
  pdf_storage_path text,                              -- bucket `documents` (privé)
  created_at       timestamptz not null default now(),
  sent_at          timestamptz,
  signed_at        timestamptz,
  unique (org_id, number)
);
create index idx_documents_org on documents(org_id);
create index idx_documents_mission on documents(mission_id);

create table signatures (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references orgs(id) on delete cascade,
  document_id  uuid not null unique references documents(id) on delete cascade,
  signer_name  text not null,
  signer_email citext not null,
  signed_at    timestamptz not null default now(),
  ip           inet,
  user_agent   text,
  consent_text text not null,
  audit        jsonb not null default '{}'::jsonb,    -- piste d'audit immuable
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Pièces client (upload portail) — bucket `client-files` (privé)
-- ---------------------------------------------------------------------
create table client_files (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references orgs(id) on delete cascade,
  mission_id   uuid not null references missions(id) on delete cascade,
  kind         file_kind not null,
  label        text not null,
  hint         text,
  status       file_status not null default 'requested',
  file_name    text,
  storage_path text,
  uploaded_at  timestamptz,
  created_at   timestamptz not null default now()
);
create index idx_client_files_mission on client_files(mission_id);

-- ---------------------------------------------------------------------
--  Facturation Propul'SEO → consultant
-- ---------------------------------------------------------------------
create table billing_events (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references orgs(id) on delete cascade,
  type        billing_event_type not null,
  mission_id  uuid references missions(id) on delete set null,
  label       text not null,
  amount_cents integer not null default 0,
  period      text not null,                          -- ex. 2026-06
  status      billing_status not null default 'pending',
  created_at  timestamptz not null default now()
);
create index idx_billing_events_org on billing_events(org_id);

-- ---------------------------------------------------------------------
--  Invitations (consultant team + client portail) & audit log
-- ---------------------------------------------------------------------
create table invitations (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid references orgs(id) on delete cascade,
  email       citext not null,
  app_role    app_role not null,
  client_id   uuid references clients(id) on delete set null,
  token       text unique not null default encode(gen_random_bytes(32), 'hex'),
  expires_at  timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  invited_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table audit_log (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid references orgs(id) on delete set null,
  user_id    uuid references auth.users(id) on delete set null,
  event      text not null,                           -- document_signed, role_change, billing_created…
  entity     text,
  entity_id  uuid,
  ip         inet,
  user_agent text,
  metadata   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index idx_audit_org on audit_log(org_id, created_at desc);

-- =====================================================================
--  Triggers
-- =====================================================================

-- updated_at automatique
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated
  before update on profiles
  for each row execute function set_updated_at();

-- Profil auto-créé à l'inscription (lit app_role/org_id/client_id depuis user_metadata)
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email, full_name, app_role, org_id, client_id, locale)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce((new.raw_user_meta_data->>'app_role')::public.app_role, 'client'),
    nullif(new.raw_user_meta_data->>'org_id', '')::uuid,
    nullif(new.raw_user_meta_data->>'client_id', '')::uuid,
    coalesce(new.raw_user_meta_data->>'locale', 'fr')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Anti-escalade : un non-admin ne peut pas modifier app_role / org_id / client_id de son profil
create or replace function prevent_profile_escalation()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if public.is_platform_admin() then
    return new;  -- l'admin plateforme peut tout
  end if;
  if new.app_role is distinct from old.app_role
     or new.org_id is distinct from old.org_id
     or new.client_id is distinct from old.client_id then
    raise exception 'Modification de app_role/org_id/client_id interdite';
  end if;
  return new;
end;
$$;

create trigger trg_profiles_no_escalation
  before update on profiles
  for each row execute function prevent_profile_escalation();

-- Attribution incontestable : dérivée du source (tout sauf manual = inbound)
create or replace function set_lead_attribution()
returns trigger language plpgsql as $$
begin
  new.attribution := case when new.source = 'manual' then 'own_network'::lead_attribution
                          else 'inbound'::lead_attribution end;
  return new;
end;
$$;

create trigger trg_leads_attribution
  before insert or update of source on leads
  for each row execute function set_lead_attribution();
