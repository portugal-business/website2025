-- =====================================================================
--  RLS — Row Level Security (100 % des tables)
--  Helpers SECURITY DEFINER STABLE SET search_path='' (anti-récursion).
--  Principe : isolation par org_id (consultant) + atteignabilité client
--  (le client lit SES missions/documents/pièces). Écritures sensibles
--  (signature, ingestion lead inbound, facturation) = service role / Server Action.
-- =====================================================================

-- ---------------------------------------------------------------------
--  Helpers (lisent profiles SANS déclencher la RLS → SECURITY DEFINER)
-- ---------------------------------------------------------------------
create or replace function public.is_platform_admin()
returns boolean language sql security definer stable set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and app_role = 'platform_admin'
  );
$$;

create or replace function public.current_org_id()
returns uuid language sql security definer stable set search_path = '' as $$
  select org_id from public.profiles where id = auth.uid();
$$;

create or replace function public.current_client_id()
returns uuid language sql security definer stable set search_path = '' as $$
  select client_id from public.profiles where id = auth.uid();
$$;

-- Org visible par le viewer (consultant = sa propre org ; client = l'org de son dossier)
create or replace function public.current_client_org_id()
returns uuid language sql security definer stable set search_path = '' as $$
  select c.org_id from public.clients c where c.id = public.current_client_id();
$$;

-- ---------------------------------------------------------------------
--  Activation RLS
-- ---------------------------------------------------------------------
alter table orgs            enable row level security;
alter table profiles        enable row level security;
alter table clients         enable row level security;
alter table org_members     enable row level security;
alter table leads           enable row level security;
alter table lead_activities enable row level security;
alter table missions        enable row level security;
alter table mission_steps   enable row level security;
alter table documents       enable row level security;
alter table signatures      enable row level security;
alter table client_files    enable row level security;
alter table billing_events  enable row level security;
alter table invitations     enable row level security;
alter table audit_log       enable row level security;

-- ---------------------------------------------------------------------
--  PROFILES
-- ---------------------------------------------------------------------
create policy profiles_admin_all on profiles for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy profiles_self_read on profiles for select
  using (id = auth.uid());
create policy profiles_org_read on profiles for select
  using (org_id is not null and org_id = current_org_id());
create policy profiles_self_update on profiles for update
  using (id = auth.uid()) with check (id = auth.uid());  -- escalade bloquée par trigger

-- ---------------------------------------------------------------------
--  ORGS — écriture réservée à l'admin plateforme (réglages consultant via Server Action)
-- ---------------------------------------------------------------------
create policy orgs_admin_all on orgs for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy orgs_consultant_read on orgs for select
  using (id = current_org_id());
create policy orgs_client_read on orgs for select
  using (id = current_client_org_id());

-- ---------------------------------------------------------------------
--  ORG_MEMBERS
-- ---------------------------------------------------------------------
create policy org_members_admin_all on org_members for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy org_members_read on org_members for select
  using (org_id = current_org_id());

-- ---------------------------------------------------------------------
--  CLIENTS
-- ---------------------------------------------------------------------
create policy clients_admin_all on clients for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy clients_consultant_all on clients for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy clients_self_read on clients for select
  using (id = current_client_id());

-- ---------------------------------------------------------------------
--  LEADS — inbound créés par l'ingestion (service role) ; manuel par le consultant
-- ---------------------------------------------------------------------
create policy leads_admin_all on leads for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy leads_consultant_all on leads for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());

-- ---------------------------------------------------------------------
--  LEAD_ACTIVITIES
-- ---------------------------------------------------------------------
create policy lead_activities_admin_all on lead_activities for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy lead_activities_consultant_all on lead_activities for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());

-- ---------------------------------------------------------------------
--  MISSIONS — atteignabilité : le client lit SES missions
-- ---------------------------------------------------------------------
create policy missions_admin_all on missions for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy missions_consultant_all on missions for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy missions_client_read on missions for select
  using (client_id = current_client_id());

-- ---------------------------------------------------------------------
--  MISSION_STEPS
-- ---------------------------------------------------------------------
create policy mission_steps_admin_all on mission_steps for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy mission_steps_consultant_all on mission_steps for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy mission_steps_client_read on mission_steps for select
  using (exists (
    select 1 from missions m
    where m.id = mission_steps.mission_id and m.client_id = current_client_id()
  ));

-- ---------------------------------------------------------------------
--  DOCUMENTS — client : lecture seule (signature via Server Action/service role)
-- ---------------------------------------------------------------------
create policy documents_admin_all on documents for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy documents_consultant_all on documents for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy documents_client_read on documents for select
  using (client_id = current_client_id());

-- ---------------------------------------------------------------------
--  SIGNATURES — insert via Server Action (service role) ; lecture par les parties
-- ---------------------------------------------------------------------
create policy signatures_admin_all on signatures for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy signatures_consultant_read on signatures for select
  using (org_id = current_org_id());
create policy signatures_client_read on signatures for select
  using (exists (
    select 1 from documents d
    where d.id = signatures.document_id and d.client_id = current_client_id()
  ));

-- ---------------------------------------------------------------------
--  CLIENT_FILES — le client dépose SES pièces (insert/update) + lecture
-- ---------------------------------------------------------------------
create policy client_files_admin_all on client_files for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy client_files_consultant_all on client_files for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy client_files_client_read on client_files for select
  using (exists (
    select 1 from missions m
    where m.id = client_files.mission_id and m.client_id = current_client_id()
  ));
create policy client_files_client_write on client_files for update
  using (exists (
    select 1 from missions m
    where m.id = client_files.mission_id and m.client_id = current_client_id()
  ))
  with check (exists (
    select 1 from missions m
    where m.id = client_files.mission_id and m.client_id = current_client_id()
  ));

-- ---------------------------------------------------------------------
--  BILLING_EVENTS — création/maj par l'admin ; consultant lit sa facturation
-- ---------------------------------------------------------------------
create policy billing_events_admin_all on billing_events for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy billing_events_consultant_read on billing_events for select
  using (org_id = current_org_id());

-- ---------------------------------------------------------------------
--  INVITATIONS
-- ---------------------------------------------------------------------
create policy invitations_admin_all on invitations for all
  using (is_platform_admin()) with check (is_platform_admin());
create policy invitations_consultant_all on invitations for all
  using (org_id = current_org_id()) with check (org_id = current_org_id());

-- ---------------------------------------------------------------------
--  AUDIT_LOG — insert via service role ; lecture admin + consultant (son org)
-- ---------------------------------------------------------------------
create policy audit_log_admin_read on audit_log for select
  using (is_platform_admin());
create policy audit_log_consultant_read on audit_log for select
  using (org_id = current_org_id());
