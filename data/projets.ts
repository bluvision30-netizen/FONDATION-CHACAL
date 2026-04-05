// data/projets.ts
// Source de données des projets — à remplacer par Supabase quand le dashboard sera prêt

export type Projet = {
  id: string;
  titre: string;
  status: 'En cours' | 'À venir' | 'Terminé';
  image: string;
  collected: number;
  goal: number;
  description: string;
  descriptionCourte: string;
  date: string;
  lieu: string;
  objectifs: string[];
  stats?: { label: string; valeur: string }[];
};

export const projets: Projet[] = [
  {
    id: '1',
    titre: 'Consultations Médicales Gratuites',
    status: 'À venir',
    image:
      'https://res.cloudinary.com/dkuciagop/image/upload/v1769027102/WhatsApp_Image_2026-01-20_at_13.21.35_s6m8at.jpg',
    collected: 8500,
    goal: 15000,
    descriptionCourte:
      "Journée de consultations médicales gratuites le 23 mai 2026 à l'école publique Newbell Bamiléké, Douala.",
    description: `La Fondation Le Chacal organise sa 2ème édition de consultations médicales gratuites 
le 23 mai 2026 à l'école publique Newbell Bamiléké de Douala. Cet événement phare 
réunira plus de 10 médecins bénévoles qualifiés pour offrir des soins gratuits aux 
personnes âgées vulnérables de la ville.

Les consultations couvriront la médecine générale, la cardiologie, l'ophtalmologie 
et la nutrition. Des médicaments essentiels seront également distribués gratuitement 
à chaque bénéficiaire.

Votre soutien nous permet de couvrir les frais logistiques, l'achat de médicaments 
et le matériel médical nécessaire pour accueillir plus de 500 seniors dans les 
meilleures conditions.`,
    date: '23 Mai 2026',
    lieu: 'École Publique Newbell Bamiléké, Douala',
    objectifs: [
      '500+ consultations médicales gratuites',
      '10+ médecins bénévoles mobilisés',
      'Distribution de kits de soins',
      'Accès aux spécialistes (cardio, ophtalmo)',
    ],
    stats: [
      { label: 'Édition', valeur: '2ème' },
      { label: 'Médecins', valeur: '10+' },
      { label: 'Objectif seniors', valeur: '500+' },
      { label: 'Date', valeur: '23 Mai 2026' },
    ],
  },
  {
    id: '2',
    titre: 'Dons Matériels pour Seniors',
    status: 'En cours',
    image:
      'https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.33_fmzfs6.jpg',
    collected: 4500,
    goal: 10000,
    descriptionCourte:
      'Distribution de kits de soins et aide matérielle aux personnes âgées vulnérables de Douala.',
    description: `Ce projet continu de la Fondation Le Chacal vise à améliorer les conditions 
de vie des personnes âgées vulnérables de Douala à travers des dons matériels ciblés.

Chaque kit distribué contient des produits d'hygiène essentiels, des médicaments 
courants, des équipements de mobilité (cannes, semelles orthopédiques) et des 
produits alimentaires nutritifs adaptés aux besoins des seniors.

Les bénéficiaires sont identifiés en collaboration avec les autorités locales et 
les associations de quartier pour s'assurer que l'aide parvient aux personnes 
qui en ont le plus besoin.`,
    date: 'En continu',
    lieu: 'Douala, Cameroun',
    objectifs: [
      '200+ seniors bénéficiaires',
      'Kits hygiène et premiers soins',
      'Équipements de mobilité',
      'Soutien alimentaire nutritif',
    ],
    stats: [
      { label: 'Seniors aidés', valeur: '200+' },
      { label: 'Kits distribués', valeur: '150+' },
      { label: 'Quartiers couverts', valeur: '5' },
      { label: 'Statut', valeur: 'En cours' },
    ],
  },
];

export function getProjet(id: string): Projet | undefined {
  return projets.find((p) => p.id === id);
}

export function getProjetsActifs(): Projet[] {
  return projets.filter((p) => p.status !== 'Terminé');
}