// app/admin/projets/page.tsx — Liste des projets

import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { deleteProjet } from '@/lib/actions';
import DeleteButton from '@/app/admin/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminProjetsPage() {
  const { data: projets, error } = await supabaseAdmin
    .from('projets')
    .select('*')
    .order('ordre');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Projets</h1>
          <p className="text-sm text-gray-500 mt-1">{projets?.length ?? 0} projet(s) au total</p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus size={15} />
          Nouveau projet
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
          Erreur de chargement : {error.message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Projet</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Statut</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Collecte</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Lieu</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projets && projets.length > 0 ? projets.map((p) => {
              const pct = p.goal > 0 ? Math.round((p.collected / p.goal) * 100) : 0;
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.titre}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[260px]">{p.description_courte}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">{pct}%</span>
                        <span className="text-xs text-gray-400">{p.collected.toLocaleString()} / {p.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{p.lieu}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projets/${p.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <Edit size={14} />
                      </Link>
                      <DeleteButton
                        action={async () => { 'use server'; await deleteProjet(p.id); }}
                        message="Supprimer ce projet ?"
                      />
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-400">
                  Aucun projet. <Link href="/admin/projets/nouveau" className="text-blue-700 hover:underline">Créer le premier</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'En cours': 'bg-blue-50 text-blue-700',
    'À venir': 'bg-amber-50 text-amber-700',
    'Terminé': 'bg-green-50 text-green-700',
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-md ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}