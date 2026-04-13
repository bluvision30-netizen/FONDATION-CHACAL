// types/index.ts — Types partagés Supabase / Dashboard / Site public

export type Projet = {
  id: string;
  // Français
  titre: string;
  status: 'En cours' | 'À venir' | 'Terminé';
  description: string;
  description_courte: string;
  date_fr: string;
  lieu: string;
  objectifs: string[];
  stats: { label: string; valeur: string }[];
  // Anglais
  titre_en: string;
  status_en: 'Ongoing' | 'Upcoming' | 'Completed';
  description_en: string;
  description_courte_en: string;
  date_en: string;
  lieu_en: string;
  objectifs_en: string[];
  stats_en: { label: string; valeur: string }[];
  // Commun
  image_url: string;
  collected: number;
  goal: number;
  ordre: number;
  created_at?: string;
  updated_at?: string;
};

export type Realisation = {
  id: string;
  titre: string;
  description: string;
  date_fr: string;
  lieu: string;
  beneficiaires?: string;
  titre_en: string;
  description_en: string;
  date_en: string;
  lieu_en: string;
  beneficiaires_en?: string;
  image_url: string;
  stats: { label: string; valeur: string }[];
  stats_en: { label: string; valeur: string }[];
  ordre: number;
  created_at?: string;
  updated_at?: string;
};

export type Actualite = {
  id: string;
  titre: string;
  contenu: string;
  resume: string;
  categorie: string;
  titre_en: string;
  contenu_en: string;
  resume_en: string;
  categorie_en: string;
  image_url?: string;
  date_publication: string;
  publie: boolean;
  created_at?: string;
  updated_at?: string;
};

export type GalerieItem = {
  id: string;
  type: 'photo' | 'video';
  url: string;
  legende_fr: string;
  legende_en: string;
  categorie: string;
  ordre: number;
  created_at?: string;
};
