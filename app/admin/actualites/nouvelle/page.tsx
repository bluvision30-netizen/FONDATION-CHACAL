// app/admin/actualites/nouvelle/page.tsx
import ActualiteForm from '../ActualiteForm';
import { createActualite } from '@/lib/actions';

export default function NouvelleActualitePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Nouvelle actualité</h1>
        <p className="text-sm text-gray-500 mt-1">Remplissez les deux langues (FR + EN)</p>
      </div>
      <ActualiteForm onSave={createActualite} />
    </div>
  );
}
