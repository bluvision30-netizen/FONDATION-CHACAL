// app/admin/page.tsx — Vue d'ensemble du dashboard

import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { FolderOpen, CheckSquare, Newspaper, Image, Plus, Edit, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Récupère les compteurs depuis Supabase
  const [
    { count: nbProjets },
    { count: nbRealisations },
    { count: nbActualites },
    { count: nbGalerie },
    { data: projets },
    { data: actualites },
    { data: galerie },
  ] = await Promise.all([
    supabaseAdmin.from('projets').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('realisations').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('actualites').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('galerie').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('projets').select('id, titre, status, collected, goal').order('ordre'),
    supabaseAdmin.from('actualites').select('id, titre, date_publication, publie, categorie').order('date_publication', { ascending: false }).limit(4),
    supabaseAdmin.from('galerie').select('id, url, type').order('ordre').limit(8),
  ]);

  const stats = [
    { label: 'Projets actifs', value: nbProjets ?? 0, sub: 'en cours & à venir', icon: FolderOpen, href: '/admin/projets', color: 'blue' },
    { label: 'Réalisations', value: nbRealisations ?? 0, sub: 'projets terminés', icon: CheckSquare, href: '/admin/realisations', color: 'green' },
    { label: 'Actualités', value: nbActualites ?? 0, sub: 'articles publiés', icon: Newspaper, href: '/admin/actualites', color: 'amber' },
    { label: 'Médias galerie', value: nbGalerie ?? 0, sub: 'photos & vidéos', icon: Image, href: '/admin/galerie', color: 'purple' },
  ];

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Vue d&apos;ensemble</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez le contenu du site de la Fondation</p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus size={15} />
          Nouveau contenu
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={href} href={href} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
              <Icon size={15} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
            <p className="text-3xl font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-2 gap-6">

        {/* Projets */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">Projets</h2>
            <Link href="/admin/projets/nouveau" className="text-xs text-blue-700 hover:underline flex items-center gap-1">
              <Plus size={12} /> Ajouter
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {projets && projets.length > 0 ? projets.map((p) => {
              const pct = p.goal > 0 ? Math.round((p.collected / p.goal) * 100) : 0;
              return (
                <div key={p.id} className="px-5 py-3.5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.titre}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusBadge status={p.status} />
                      <span className="text-xs text-gray-400">{p.collected.toLocaleString()} / {p.goal.toLocaleString()} XAF</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-1 bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <Link href={`/admin/projets/${p.id}`} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-50">
                    <Edit size={14} />
                  </Link>
                </div>
              );
            }) : (
              <div className="px-5 py-8 text-center text-sm text-gray-400">Aucun projet pour l&apos;instant</div>
            )}
          </div>
        </div>

        {/* Galerie aperçu */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">Galerie</h2>
            <Link href="/admin/galerie" className="text-xs text-blue-700 hover:underline flex items-center gap-1">
              <Plus size={12} /> Uploader
            </Link>
          </div>
          <div className="p-4 grid grid-cols-4 gap-2">
            {galerie && galerie.map((item) => (
              <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {item.type === 'photo' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <span className="text-white text-xs">▶</span>
                  </div>
                )}
              </div>
            ))}
            {(!galerie || galerie.length === 0) && (
              <div className="col-span-4 py-8 text-center text-sm text-gray-400">Aucun média</div>
            )}
          </div>
        </div>

        {/* Actualités */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">Actualités récentes</h2>
            <Link href="/admin/actualites/nouvelle" className="text-xs text-blue-700 hover:underline flex items-center gap-1">
              <Plus size={12} /> Nouvelle
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {actualites && actualites.length > 0 ? actualites.map((a) => (
              <div key={a.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{a.titre}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{a.date_publication}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-500">{a.categorie}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${a.publie ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {a.publie ? 'Publié' : 'Brouillon'}
                </span>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/actualites/${a.id}`} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-50">
                    <Edit size={14} />
                  </Link>
                  <Link href={`/actualites`} target="_blank" className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-50">
                    <Eye size={14} />
                  </Link>
                </div>
              </div>
            )) : (
              <div className="px-5 py-8 text-center text-sm text-gray-400">Aucune actualité</div>
            )}
          </div>
        </div>

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
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}
