-- =====================================================================
--  Seed — données de démonstration / test (représentatif, pas exhaustif)
--  UUIDs déterministes (dictionnaire de remap ci-dessous) pour que le
--  script d'auth (seed-auth.mjs) puisse rattacher les profils.
--  Les users auth se créent via Admin API (cf. runbook), pas ici.
--
--  Remap id mock → UUID :
--    org-bp      = 11111111-1111-4111-8111-111111111111
--    org-cyprus  = 33333333-3333-4333-8333-333333333333
--    client-001  = c0000001-0000-4000-8000-000000000001  (Sofia, org-bp)
--    client-cy1  = c0000003-0000-4000-8000-000000000003  (Elena, org-cyprus)
--    mission-001 = 50000001-0000-4000-8000-000000000001
-- =====================================================================

-- Orgs --------------------------------------------------------------
insert into orgs (id, name, brand_name, vat_id, location, branding, plan, per_client_fee_cents, monthly_fee_cents, status, created_at) values
  ('11111111-1111-4111-8111-111111111111', 'Lovelyparallel, Lda', 'Business Portugal', '518354750', 'Lisbonne, Portugal', '{"logoText":"Business Portugal"}', 'pro',   15000, 19900, 'active', '2026-02-01T09:00:00Z'),
  ('33333333-3333-4333-8333-333333333333', 'Cyprus Setup Partners', 'Cyprus Setup', 'CY10398472X', 'Limassol, Chypre', '{"logoText":"Cyprus Setup"}', 'scale', 18000, 29900, 'active', '2026-03-10T09:00:00Z');

-- Clients -----------------------------------------------------------
insert into clients (id, org_id, full_name, email, phone, company_name_wanted, country_of_residence, created_at) values
  ('c0000001-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'Sofia Almeida', 'sofia.almeida@me.com', '+351 91 555 21 09', 'Almeida Global Trade', 'Portugal', '2026-05-22T16:00:00Z'),
  ('c0000003-0000-4000-8000-000000000003', '33333333-3333-4333-8333-333333333333', 'Elena Petrou', 'elena.petrou@gmail.com', null, null, null, '2026-05-20T10:00:00Z');

-- Leads (org-bp : sources variées ; org-cyprus : isolation test) -----
insert into leads (id, org_id, full_name, email, phone, locale, source, status, segment, lead_score, context, client_id, consent_marketing, created_at, last_activity_at) values
  ('1ead0001-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'Julien Mercier', 'j.mercier@protonmail.com', '+33 6 12 44 90 31', 'fr', 'tool_ifici',     'qualified', 'actif_eligible',   88, '{"ificiResult":"R1","ificiResultLabel":"Éligible probable","ificiHorizon":"Dans les 12 mois","projet":"Ingénieur TIC, entreprise exportatrice."}', null, true, '2026-06-02T08:21:00Z', '2026-06-08T15:40:00Z'),
  ('1ead0004-0000-4000-8000-000000000004', '11111111-1111-4111-8111-111111111111', 'Thomas Garnier', 'thomas@garnier-trade.com', '+33 6 70 11 88 42', 'fr', 'tool_simulator', 'new',       'employeur',        67, '{"simBrutMensuel":2200,"simNbSalaries":3,"simCoutAnnuel":116000,"simSurcoutPct":26.4}', null, true, '2026-06-09T07:15:00Z', '2026-06-09T07:15:00Z'),
  ('1ead0005-0000-4000-8000-000000000005', '11111111-1111-4111-8111-111111111111', 'Sofia Almeida', 'sofia.almeida@me.com', '+351 91 555 21 09', 'fr', 'calendly', 'won', 'actif_eligible', 92, '{"projet":"Import-export hors UE — convertie."}', 'c0000001-0000-4000-8000-000000000001', true, '2026-05-10T14:30:00Z', '2026-05-22T16:00:00Z'),
  ('1ead0007-0000-4000-8000-000000000007', '11111111-1111-4111-8111-111111111111', 'Nadia Cherif', 'nadia.cherif@gmail.com', '+33 6 33 90 12 76', 'fr', 'manual', 'qualified', 'actif_a_verifier', 60, '{"projet":"Recommandée par une cliente. Restauratrice."}', null, false, '2026-05-30T09:00:00Z', '2026-06-04T14:20:00Z'),
  ('1eadcy01-0000-4000-8000-000000000001', '33333333-3333-4333-8333-333333333333', 'Elena Petrou', 'elena.petrou@gmail.com', null, 'en', 'calendly', 'won', 'inconnu', 78, '{}', 'c0000003-0000-4000-8000-000000000003', false, '2026-05-02T10:00:00Z', '2026-05-20T10:00:00Z');

update clients set lead_id = '1ead0005-0000-4000-8000-000000000005' where id = 'c0000001-0000-4000-8000-000000000001';
update clients set lead_id = '1eadcy01-0000-4000-8000-000000000001' where id = 'c0000003-0000-4000-8000-000000000003';

insert into lead_activities (org_id, lead_id, type, body, author, created_at) values
  ('11111111-1111-4111-8111-111111111111', '1ead0001-0000-4000-8000-000000000001', 'system', 'Lead créé depuis le Test IFICI — résultat R1.', 'Système', '2026-06-02T08:21:00Z'),
  ('11111111-1111-4111-8111-111111111111', '1ead0001-0000-4000-8000-000000000001', 'call',   'Échange gratuit effectué. Demande un devis Lda.', 'Audrey Marques', '2026-06-05T16:00:00Z');

-- Mission Sofia + tracker -------------------------------------------
insert into missions (id, org_id, client_id, lead_id, ref, status, company_form, company_name_wanted, nipc, started_at, created_at) values
  ('50000001-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'c0000001-0000-4000-8000-000000000001', '1ead0005-0000-4000-8000-000000000005', 'BP-2026-014', 'active', 'lda', 'Almeida Global Trade', '517998421', '2026-05-22T16:00:00Z', '2026-05-22T16:00:00Z');

insert into mission_steps (org_id, mission_id, step_key, label, description, status, ordinal, done_at) values
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'echange',               'Échange gratuit',          'Point sur le projet, choix du statut, devis.',               'done',        0, '2026-05-22T16:00:00Z'),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'nif',                   'NIF à distance',           'Obtention du numéro fiscal portugais.',                      'done',        1, '2026-05-26T10:00:00Z'),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'constitution',          'Constitution (NIPC)',      'La société existe et reçoit son NIPC.',                      'done',        2, '2026-06-01T11:00:00Z'),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'certidao_rcbe_statuts', 'Certidão · RCBE · Statuts','Certidão 24-48 h, puis RCBE et statuts.',                    'in_progress', 3, null),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'bancaire',              'Accompagnement bancaire',  'Ouverture du compte pro (Millennium).',                      'pending',     4, null),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'compta',                'Mise en relation comptable','Contabilista Certificado partenaire (Raly / Joongle).',     'pending',     5, null);

-- Documents Sofia : lettre signée + contrat envoyé -------------------
insert into documents (id, org_id, mission_id, client_id, type, status, number, title, payload, total_ht_cents, total_ttc_cents, created_at, sent_at, signed_at) values
  ('d0000001-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'lettre_mission', 'signed', 'LM-2026-014', 'Lettre de mission — Création d''entreprise au Portugal', '{"vatRate":0.23}', 128000, 157440, '2026-05-22T17:00:00Z', '2026-05-22T17:05:00Z', '2026-05-24T09:32:00Z'),
  ('d0000005-0000-4000-8000-000000000005', '11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'contrat',        'sent',   'CT-2026-014', 'Contrat d''accompagnement — Création de société',      '{"vatRate":0.23}', 128000, 157440, '2026-05-22T17:10:00Z', '2026-05-22T17:12:00Z', null);

insert into signatures (org_id, document_id, signer_name, signer_email, signed_at, ip, user_agent, consent_text) values
  ('11111111-1111-4111-8111-111111111111', 'd0000001-0000-4000-8000-000000000001', 'Sofia Almeida', 'sofia.almeida@me.com', '2026-05-24T09:32:00Z', '85.240.118.44', 'Mozilla/5.0 (iPhone) Safari/605.1.15', 'En cochant cette case et en signant, j''accepte les termes de la présente lettre de mission.');

-- Pièces client (mission Sofia) -------------------------------------
insert into client_files (org_id, mission_id, kind, label, hint, status, file_name, uploaded_at) values
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'piece_identite',  'Pièce d''identité (associés)', 'Passeport ou CNI.',          'validated', 'passeport_almeida.pdf', '2026-05-25T10:00:00Z'),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'justif_domicile', 'Justificatif de domicile',    'Récent (< 3 mois).',         'validated', 'justif_domicile.pdf',   '2026-05-25T10:00:00Z'),
  ('11111111-1111-4111-8111-111111111111', '50000001-0000-4000-8000-000000000001', 'nom_societe',     'Nom souhaité',                'Disponibilité vérifiée.',    'requested', null, null);

-- Facturation Propul'SEO → consultants ------------------------------
insert into billing_events (org_id, type, mission_id, label, amount_cents, period, status, created_at) values
  ('11111111-1111-4111-8111-111111111111', 'subscription', null, 'Abonnement Pro — juin 2026', 19900, '2026-06', 'invoiced', '2026-06-01T00:00:00Z'),
  ('11111111-1111-4111-8111-111111111111', 'signed_client', '50000001-0000-4000-8000-000000000001', 'Client signé — Sofia Almeida (lead inbound · Calendly)', 15000, '2026-05', 'paid', '2026-05-24T09:32:00Z'),
  ('33333333-3333-4333-8333-333333333333', 'subscription', null, 'Abonnement Scale — juin 2026', 29900, '2026-06', 'invoiced', '2026-06-01T00:00:00Z');
