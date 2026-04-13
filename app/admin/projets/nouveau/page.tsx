// app/admin/projets/nouveau/page.tsx — Création d'un projet

import ProjetForm from '../ProjetForm';
import { createProjet } from '@/lib/actions';

export default function NouveauProjetPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Nouveau projet</h1>
        <p className="text-sm text-gray-500 mt-1">Remplissez les deux langues (FR + EN)</p>
      </div>
      <ProjetForm onSave={createProjet} />
    </div>
  );
}
