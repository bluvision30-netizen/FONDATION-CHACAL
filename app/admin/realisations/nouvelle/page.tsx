// app/admin/realisations/nouvelle/page.tsx
import RealisationForm from '../RealisationForm';
import { createRealisation } from '@/lib/actions';

export default function NouvelleRealisationPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Nouvelle réalisation</h1>
        <p className="text-sm text-gray-500 mt-1">Documentez un projet accompli</p>
      </div>
      <RealisationForm onSave={createRealisation} />
    </div>
  );
}
