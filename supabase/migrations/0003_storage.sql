-- =====================================================================
--  Storage — buckets privés + policies sur storage.objects
--  Convention de chemin : <org_id>/<mission_id>/<fichier>
--  (la RLS des tables ne protège PAS les buckets : système séparé)
-- =====================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('documents',    'documents',    false, 10485760, array['application/pdf']),
  ('client-files', 'client-files', false, 10485760,
     array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- helper local : 1er segment = org_id, 2e = mission_id
-- (storage.foldername(name) renvoie un text[] des dossiers du chemin)

-- ---------------------------------------------------------------------
--  Bucket `documents` (PDF lettres/contrats/factures)
-- ---------------------------------------------------------------------
create policy documents_admin_all on storage.objects for all
  using (bucket_id = 'documents' and is_platform_admin())
  with check (bucket_id = 'documents' and is_platform_admin());

create policy documents_consultant_all on storage.objects for all
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = current_org_id()::text
  )
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = current_org_id()::text
  );

create policy documents_client_read on storage.objects for select
  using (
    bucket_id = 'documents'
    and exists (
      select 1 from missions m
      where m.id::text = (storage.foldername(name))[2]
        and m.client_id = current_client_id()
    )
  );

-- ---------------------------------------------------------------------
--  Bucket `client-files` (pièces déposées par le client)
-- ---------------------------------------------------------------------
create policy client_files_admin_all on storage.objects for all
  using (bucket_id = 'client-files' and is_platform_admin())
  with check (bucket_id = 'client-files' and is_platform_admin());

create policy client_files_consultant_all on storage.objects for all
  using (
    bucket_id = 'client-files'
    and (storage.foldername(name))[1] = current_org_id()::text
  )
  with check (
    bucket_id = 'client-files'
    and (storage.foldername(name))[1] = current_org_id()::text
  );

-- Le client lit ET dépose les pièces de SES missions
create policy client_files_client_rw on storage.objects for all
  using (
    bucket_id = 'client-files'
    and exists (
      select 1 from missions m
      where m.id::text = (storage.foldername(name))[2]
        and m.client_id = current_client_id()
    )
  )
  with check (
    bucket_id = 'client-files'
    and exists (
      select 1 from missions m
      where m.id::text = (storage.foldername(name))[2]
        and m.client_id = current_client_id()
    )
  );
