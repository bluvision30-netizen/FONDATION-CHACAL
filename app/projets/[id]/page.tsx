// app/projets/[id]/page.tsx  — Server Component
import { projets, getProjet } from '@/data/projets';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjetClient from './ProjetClient';

// ─── Génère les routes statiques au build : /projets/1, /projets/2 ───
export async function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

// ─── SEO automatique par projet (bilingue) ───────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const projet = getProjet(id);
  if (!projet) return { title: 'Projet introuvable — Fondation Le Chacal' };

  return {
    title: `${projet.titre} / ${projet.titreEn} — Fondation Le Chacal`,
    description: projet.descriptionCourte,
    openGraph: {
      title: `${projet.titre} — Fondation Le Chacal`,
      description: projet.descriptionCourte,
      images: [{ url: projet.image, width: 1200, height: 630, alt: projet.titre }],
      url: `https://fondationlechacal.org/projets/${projet.id}`,
      type: 'article',
      siteName: 'Fondation Le Chacal',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${projet.titre} — Fondation Le Chacal`,
      description: projet.descriptionCourte,
      images: [projet.image],
    },
  };
}

// ─── Page — passe les données au Client Component ─────────────────────
export default async function PageProjet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projet = getProjet(id);
  if (!projet) notFound();

  return <ProjetClient projet={projet} />;
}
