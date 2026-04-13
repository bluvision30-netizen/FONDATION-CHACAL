// app/admin/galerie/page.tsx — Gestion de la galerie

import { supabaseAdmin } from '@/lib/supabase';
import GalerieClient from './GalerieClient';

export const dynamic = 'force-dynamic';

export default async function AdminGaleriePage() {
  const { data: items, error } = await supabaseAdmin
    .from('galerie')
    .select('*')
    .order('ordre');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Galerie</h1>
          <p className="text-sm text-gray-500 mt-1">{items?.length ?? 0} média(s)</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
          Erreur : {error.message}
        </div>
      )}

      <GalerieClient items={items ?? []} />
    </div>
  );
}
