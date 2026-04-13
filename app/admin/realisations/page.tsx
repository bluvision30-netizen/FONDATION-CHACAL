// app/admin/realisations/page.tsx

import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { deleteRealisation } from '@/lib/actions';
import DeleteButton from '@/app/admin/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminRealisationsPage() {
  const { data: realisations, error } = await supabaseAdmin
    .from('realisations')
    .select('*')
    .order('ordre');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Réalisations</h1>
          <p className="text-sm text-gray-500 mt-1">{realisations?.length ?? 0} réalisation(s)</p>
        </div>
        <Link href="/admin/realisations/nouvelle"
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus size={15} />
          Nouvelle réalisation
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
          Erreur : {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {realisations && realisations.length > 0 ? realisations.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.image_url} alt="" className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{r.titre}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{r.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-400">📍 {r.lieu}</span>
                <span className="text-gray-200">·</span>
                <span className="text-xs text-gray-400">📅 {r.date_fr}</span>
                {r.beneficiaires && <>
                  <span className="text-gray-200">·</span>
                  <span className="text-xs text-gray-400">👥 {r.beneficiaires}</span>
                </>}
              </div>
              {r.stats && r.stats.length > 0 && (
                <div className="flex items-center gap-3 mt-2">
                  {r.stats.map((s: {label:string;valeur:string}, i: number) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-md">
                      {s.label}: {s.valeur}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link href={`/admin/realisations/${r.id}`}
                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                <Edit size={14} />
              </Link>
              <DeleteButton
                action={async () => { 'use server'; await deleteRealisation(r.id); }}
                message="Supprimer cette réalisation ?"
              />
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 py-20 text-center">
            <p className="text-gray-400 text-sm">Aucune réalisation.</p>
            <Link href="/admin/realisations/nouvelle" className="text-blue-700 text-sm hover:underline mt-1 block">
              Ajouter la première
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}