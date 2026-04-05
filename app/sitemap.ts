// app/sitemap.ts
// Génère automatiquement /sitemap.xml pour Google Search Console
import type { MetadataRoute } from 'next';
import { projets } from '@/data/projets';

const BASE_URL = 'https://fondationlechacal.org';

// Date de dernière mise à jour du contenu éditorial
const LAST_UPDATED = new Date('2026-04-05');

export default function sitemap(): MetadataRoute.Sitemap {

  // ── Pages principales ──────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      // Page d'accueil — priorité maximale
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // Missions de la fondation
      url: `${BASE_URL}/missions`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      // Liste de tous les projets
      url: `${BASE_URL}/projets`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      // Impact et résultats
      url: `${BASE_URL}/impact`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      // Actualités / blog
      url: `${BASE_URL}/actualites`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // À propos de la fondation
      url: `${BASE_URL}/a-propos`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      // Notre histoire
      url: `${BASE_URL}/notre-histoire`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      // Galerie photos
      url: `${BASE_URL}/galerie`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      // Réalisations passées
      url: `${BASE_URL}/realisations`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      // Page de contact
      url: `${BASE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // ── Pages dynamiques des projets ───────────────────────────────────────
  const projetPages: MetadataRoute.Sitemap = projets.map((projet) => ({
    url: `${BASE_URL}/projets/${projet.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...projetPages];
}