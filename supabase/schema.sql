-- ═══════════════════════════════════════════════════════════════
-- SCHÉMA SUPABASE — Fondation Le Chacal
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ── Extensions ────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════
-- TABLE : projets
-- ═══════════════════════════════════════════════════════════════
create table if not exists projets (
  id            uuid primary key default uuid_generate_v4(),
  -- Français
  titre         text not null,
  status        text not null check (status in ('En cours', 'À venir', 'Terminé')),
  description   text not null,
  description_courte text not null,
  date_fr       text not null,
  lieu          text not null,
  objectifs     jsonb not null default '[]',
  stats         jsonb default '[]',
  -- Anglais
  titre_en      text not null,
  status_en     text not null check (status_en in ('Ongoing', 'Upcoming', 'Completed')),
  description_en text not null,
  description_courte_en text not null,
  date_en       text not null,
  lieu_en       text not null,
  objectifs_en  jsonb not null default '[]',
  stats_en      jsonb default '[]',
  -- Commun
  image_url     text not null,
  collected     integer not null default 0,
  goal          integer not null default 0,
  ordre         integer not null default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- TABLE : realisations
-- ═══════════════════════════════════════════════════════════════
create table if not exists realisations (
  id              uuid primary key default uuid_generate_v4(),
  -- Français
  titre           text not null,
  description     text not null,
  date_fr         text not null,
  lieu            text not null,
  beneficiaires   text,
  -- Anglais
  titre_en        text not null,
  description_en  text not null,
  date_en         text not null,
  lieu_en         text not null,
  beneficiaires_en text,
  -- Commun
  image_url       text not null,
  stats           jsonb default '[]',
  stats_en        jsonb default '[]',
  ordre           integer not null default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- TABLE : actualites
-- ═══════════════════════════════════════════════════════════════
create table if not exists actualites (
  id              uuid primary key default uuid_generate_v4(),
  -- Français
  titre           text not null,
  contenu         text not null,
  resume          text not null,
  categorie       text not null default 'Actualité',
  -- Anglais
  titre_en        text not null,
  contenu_en      text not null,
  resume_en       text not null,
  categorie_en    text not null default 'News',
  -- Commun
  image_url       text,
  date_publication date not null default current_date,
  publie          boolean not null default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- TABLE : galerie
-- ═══════════════════════════════════════════════════════════════
create table if not exists galerie (
  id           uuid primary key default uuid_generate_v4(),
  type         text not null check (type in ('photo', 'video')),
  url          text not null,
  legende_fr   text default '',
  legende_en   text default '',
  categorie    text default 'général',
  ordre        integer not null default 0,
  created_at   timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- TRIGGERS : updated_at auto
-- ═══════════════════════════════════════════════════════════════
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projets_updated_at
  before update on projets
  for each row execute function set_updated_at();

create trigger realisations_updated_at
  before update on realisations
  for each row execute function set_updated_at();

create trigger actualites_updated_at
  before update on actualites
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- RLS (Row Level Security)
-- Lecture publique, écriture admin uniquement
-- ═══════════════════════════════════════════════════════════════
alter table projets      enable row level security;
alter table realisations enable row level security;
alter table actualites   enable row level security;
alter table galerie      enable row level security;

-- Lecture publique pour tout le monde
create policy "lecture_publique_projets"      on projets      for select using (true);
create policy "lecture_publique_realisations" on realisations for select using (true);
create policy "lecture_publique_actualites"   on actualites   for select using (publie = true);
create policy "lecture_publique_galerie"      on galerie      for select using (true);

-- Écriture réservée aux utilisateurs authentifiés (admin)
create policy "admin_projets"      on projets      for all using (auth.role() = 'authenticated');
create policy "admin_realisations" on realisations for all using (auth.role() = 'authenticated');
create policy "admin_actualites"   on actualites   for all using (auth.role() = 'authenticated');
create policy "admin_galerie"      on galerie      for all using (auth.role() = 'authenticated');
