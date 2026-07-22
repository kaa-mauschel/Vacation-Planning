-- ============================================================
-- Urlaubsplaner: Datenbankschema für Supabase
-- Diese komplette Datei im Supabase SQL-Editor ausführen
-- (Dashboard -> SQL Editor -> New query -> einfügen -> Run)
-- ============================================================

-- Erweiterung für UUIDs
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabelle: projects (ein "Urlaub" / ein Projekt)
-- ------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text default '🧳',
  created_by uuid references auth.users(id) not null,
  invite_code text unique not null default substr(md5(random()::text), 1, 8),
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Tabelle: project_members (wer ist Teil welches Projekts)
-- ------------------------------------------------------------
create table if not exists project_members (
  project_id uuid references projects(id) on delete cascade not null,
  user_id uuid references auth.users(id) not null,
  joined_at timestamptz default now(),
  primary key (project_id, user_id)
);

-- ------------------------------------------------------------
-- Tabelle: items (alle Inhalte aller Reiter, generisch)
-- section = z.B. 'packliste', 'route', 'unterkunft', 'kosten',
--           'essen', 'aktivitaet', 'mustdo', 'tagesplan', 'tipp',
--           'vorabreise', 'favorit'
-- data    = beliebiges JSON-Objekt, je nach section unterschiedlich
-- ------------------------------------------------------------
create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade not null,
  section text not null,
  data jsonb not null default '{}'::jsonb,
  position int default 0,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists items_project_section_idx on items (project_id, section);

-- ------------------------------------------------------------
-- Automatisch: Ersteller wird Mitglied seines eigenen Projekts
-- ------------------------------------------------------------
create or replace function add_creator_as_member()
returns trigger as $$
begin
  insert into project_members (project_id, user_id)
  values (new.id, new.created_by)
  on conflict do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_add_creator_as_member on projects;
create trigger trg_add_creator_as_member
  after insert on projects
  for each row execute function add_creator_as_member();

-- ------------------------------------------------------------
-- updated_at automatisch aktualisieren
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_items_updated_at on items;
create trigger trg_items_updated_at
  before update on items
  for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security aktivieren
-- ------------------------------------------------------------
alter table projects enable row level security;
alter table project_members enable row level security;
alter table items enable row level security;

-- Hilfsfunktion: ist der aktuelle Nutzer Mitglied des Projekts?
create or replace function is_project_member(pid uuid)
returns boolean as $$
  select exists (
    select 1 from project_members
    where project_id = pid and user_id = auth.uid()
  );
$$ language sql security definer stable;

-- projects: sehen & bearbeiten, wenn Mitglied
drop policy if exists "projects_select" on projects;
create policy "projects_select" on projects
  for select using (is_project_member(id));

drop policy if exists "projects_insert" on projects;
create policy "projects_insert" on projects
  for insert with check (auth.uid() = created_by);

drop policy if exists "projects_update" on projects;
create policy "projects_update" on projects
  for update using (is_project_member(id));

drop policy if exists "projects_delete" on projects;
create policy "projects_delete" on projects
  for delete using (created_by = auth.uid());

-- project_members: sehen, wenn selbst Mitglied dieses Projekts
drop policy if exists "members_select" on project_members;
create policy "members_select" on project_members
  for select using (is_project_member(project_id));

-- Beitreten per Einladungscode passiert über eine Funktion (siehe unten),
-- daher kein direktes insert-Policy für normale Nutzer nötig.

-- items: lesen/schreiben, wenn Mitglied des zugehörigen Projekts
drop policy if exists "items_select" on items;
create policy "items_select" on items
  for select using (is_project_member(project_id));

drop policy if exists "items_insert" on items;
create policy "items_insert" on items
  for insert with check (is_project_member(project_id));

drop policy if exists "items_update" on items;
create policy "items_update" on items
  for update using (is_project_member(project_id));

drop policy if exists "items_delete" on items;
create policy "items_delete" on items
  for delete using (is_project_member(project_id));

-- ------------------------------------------------------------
-- Funktion zum Beitreten per Einladungscode
-- (wird sicher server-seitig ausgeführt, umgeht RLS gezielt)
-- ------------------------------------------------------------
create or replace function join_project_by_code(code text)
returns uuid as $$
declare
  pid uuid;
begin
  select id into pid from projects where invite_code = code;
  if pid is null then
    raise exception 'Ungültiger Einladungscode';
  end if;
  insert into project_members (project_id, user_id)
  values (pid, auth.uid())
  on conflict do nothing;
  return pid;
end;
$$ language plpgsql security definer;
