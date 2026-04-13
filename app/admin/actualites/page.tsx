// app/admin/actualites/page.tsx

import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { deleteActualite, togglePublierActualite } from '@/lib/actions';
import DeleteButton from '@/app/admin/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminActualitesPage() {
  const { data: actualites, error } = await supabaseAdmin
    .from('actualites')
    .select('*')
    .order('date_publication', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Actualités</h1>
          <p className="text-sm text-gray-500 mt-1">{actualites?.length ?? 0} article(s)</p>
        </div>
        <Link
          href="/admin/actualites/nouvelle"
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus size={15} />
          Nouvelle actualité
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
          Erreur : {error.message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Article</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Catégorie</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Statut</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {actualites && actualites.length > 0 ? actualites.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {a.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.image_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-300 text-lg">📰</span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{a.titre}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[300px]">{a.resume}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{a.categorie}</span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{a.date_publication}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    a.publie ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {a.publie ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* Toggle publier */}
                    <form action={async () => {
                      'use server';
                      await togglePublierActualite(a.id, !a.publie);
                    }}>
                      <button type="submit"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        title={a.publie ? 'Dépublier' : 'Publier'}>
                        {a.publie ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </form>
                    <Link href={`/admin/actualites/${a.id}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                      <Edit size={14} />
                    </Link>
                    <DeleteButton
                      action={async () => { 'use server'; await deleteActualite(a.id); }}
                      message="Supprimer cet article ?"
                    />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-400">
                  Aucune actualité. <Link href="/admin/actualites/nouvelle" className="text-blue-700 hover:underline">Créer la première</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}