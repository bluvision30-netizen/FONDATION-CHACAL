// data/projets.ts
// Source de données des projets — à remplacer par Supabase quand le dashboard sera prêt

export type Projet = {
  id: string;
  // ── Français ──
  titre: string;
  status: 'En cours' | 'À venir' | 'Terminé';
  description: string;
  descriptionCourte: string;
  date: string;
  lieu: string;
  objectifs: string[];
  stats?: { label: string; valeur: string }[];
  // ── English ──
  titreEn: string;
  statusEn: 'Ongoing' | 'Upcoming' | 'Completed';
  descriptionEn: string;
  descriptionCourteEn: string;
  dateEn: string;
  lieuEn: string;
  objectifsEn: string[];
  statsEn?: { label: string; valeur: string }[];
  // ── Commun ──
  image: string;
  collected: number;
  goal: number;
};

export const projets: Projet[] = [
  {
    id: '1',
    titre: 'Consultations Médicales Gratuites',
    status: 'À venir',
    descriptionCourte: "Journée de consultations médicales gratuites le 23 mai 2026 à l'école publique Newbell Bamiléké, Douala.",
    description: `La Fondation Le Chacal organise sa 2ème édition de consultations médicales gratuites\nle 23 mai 2026 à l'école publique Newbell Bamiléké de Douala. Cet événement phare\nréunira plus de 10 médecins bénévoles qualifiés pour offrir des soins gratuits aux\npersonnes âgées vulnérables de la ville.\n\nLes consultations couvriront la médecine générale, la cardiologie, l'ophtalmologie\net la nutrition. Des médicaments essentiels seront également distribués gratuitement\nà chaque bénéficiaire.\n\nVotre soutien nous permet de couvrir les frais logistiques, l'achat de médicaments\net le matériel médical nécessaire pour accueillir plus de 500 seniors dans les\nmeilleures conditions.`,
    date: '23 Mai 2026',
    lieu: 'École Publique Newbell Bamiléké, Douala',
    objectifs: ['500+ consultations médicales gratuites', '10+ médecins bénévoles mobilisés', 'Distribution de kits de soins', 'Accès aux spécialistes (cardio, ophtalmo)'],
    stats: [{ label: 'Édition', valeur: '2ème' }, { label: 'Médecins', valeur: '10+' }, { label: 'Objectif seniors', valeur: '500+' }, { label: 'Date', valeur: '23 Mai 2026' }],
    titreEn: 'Free Medical Consultations',
    statusEn: 'Upcoming',
    descriptionCourteEn: 'Day of free medical consultations on May 23, 2026 at École Publique Newbell Bamiléké, Douala.',
    descriptionEn: `The Chacal Foundation is organizing its 2nd edition of free medical consultations\non May 23, 2026 at the École Publique Newbell Bamiléké in Douala. This flagship event\nwill bring together more than 10 qualified volunteer physicians to provide free care to\nvulnerable elderly people in the city.\n\nConsultations will cover general medicine, cardiology, ophthalmology\nand nutrition. Essential medications will also be distributed free of charge\nto each beneficiary.\n\nYour support allows us to cover logistical costs, the purchase of medications\nand the medical equipment needed to welcome more than 500 seniors in the\nbest possible conditions.`,
    dateEn: 'May 23, 2026',
    lieuEn: 'École Publique Newbell Bamiléké, Douala',
    objectifsEn: ['500+ free medical consultations', '10+ volunteer physicians mobilized', 'Distribution of care kits', 'Access to specialists (cardio, ophthalmology)'],
    statsEn: [{ label: 'Edition', valeur: '2nd' }, { label: 'Physicians', valeur: '10+' }, { label: 'Senior target', valeur: '500+' }, { label: 'Date', valeur: 'May 23, 2026' }],
    image: 'https://res.cloudinary.com/dkuciagop/image/upload/v1769027102/WhatsApp_Image_2026-01-20_at_13.21.35_s6m8at.jpg',
    collected: 8500,
    goal: 15000,
  },
  {
    id: '2',
    titre: 'Dons Matériels pour Seniors',
    status: 'En cours',
    descriptionCourte: 'Distribution de kits de soins et aide matérielle aux personnes âgées vulnérables de Douala.',
    description: `Ce projet continu de la Fondation Le Chacal vise à améliorer les conditions\nde vie des personnes âgées vulnérables de Douala à travers des dons matériels ciblés.\n\nChaque kit distribué contient des produits d'hygiène essentiels, des médicaments\ncourants, des équipements de mobilité (cannes, semelles orthopédiques) et des\nproduits alimentaires nutritifs adaptés aux besoins des seniors.\n\nLes bénéficiaires sont identifiés en collaboration avec les autorités locales et\nles associations de quartier pour s'assurer que l'aide parvient aux personnes\nqui en ont le plus besoin.`,
    date: 'En continu',
    lieu: 'Douala, Cameroun',
    objectifs: ['200+ seniors bénéficiaires', 'Kits hygiène et premiers soins', 'Équipements de mobilité', 'Soutien alimentaire nutritif'],
    stats: [{ label: 'Seniors aidés', valeur: '200+' }, { label: 'Kits distribués', valeur: '150+' }, { label: 'Quartiers couverts', valeur: '5' }, { label: 'Statut', valeur: 'En cours' }],
    titreEn: 'Material Donations for Seniors',
    statusEn: 'Ongoing',
    descriptionCourteEn: 'Distribution of care kits and material assistance to vulnerable elderly people in Douala.',
    descriptionEn: `This ongoing project by the Chacal Foundation aims to improve the living conditions\nof vulnerable elderly people in Douala through targeted material donations.\n\nEach distributed kit contains essential hygiene products, common medications,\nmobility equipment (canes, orthopedic insoles) and nutritious food products\nadapted to the needs of seniors.\n\nBeneficiaries are identified in collaboration with local authorities and\nneighborhood associations to ensure that aid reaches the people\nwho need it most.`,
    dateEn: 'Ongoing',
    lieuEn: 'Douala, Cameroon',
    objectifsEn: ['200+ senior beneficiaries', 'Hygiene and first aid kits', 'Mobility equipment', 'Nutritious food support'],
    statsEn: [{ label: 'Seniors helped', valeur: '200+' }, { label: 'Kits distributed', valeur: '150+' }, { label: 'Districts covered', valeur: '5' }, { label: 'Status', valeur: 'Ongoing' }],
    image: 'https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.33_fmzfs6.jpg',
    collected: 4500,
    goal: 10000,
  },
];

export function getProjet(id: string): Projet | undefined {
  return projets.find((p) => p.id === id);
}

export function getProjetsActifs(): Projet[] {
  return projets.filter((p) => p.status !== 'Terminé');
}
