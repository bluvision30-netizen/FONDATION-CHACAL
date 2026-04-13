'use client';
// app/admin/AdminSidebar.tsx

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  LayoutDashboard, FolderOpen, CheckSquare,
  Newspaper, Image, LogOut, User
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const navItems = [
  { href: '/admin', label: 'Vue d\'ensemble', icon: LayoutDashboard, exact: true },
  { href: '/admin/projets', label: 'Projets', icon: FolderOpen },
  { href: '/admin/realisations', label: 'Réalisations', icon: CheckSquare },
  { href: '/admin/actualites', label: 'Actualités', icon: Newspaper },
  { href: '/admin/galerie', label: 'Galerie', icon: Image },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== '/admin';
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-white border-r border-gray-100 flex flex-col py-6 px-3 z-40">
      {/* Logo */}
      <div className="px-3 pb-5 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">FC</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 leading-tight">Fondation Le Chacal</p>
            <p className="text-xs text-gray-400">Dashboard Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider px-3 py-2">
          Contenu
        </p>
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive(href, exact)
                ? 'bg-blue-50 text-blue-800 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}

        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider px-3 py-2 mt-4">
          Compte
        </p>
        <Link
          href="/admin/profil"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <User size={15} />
          Profil admin
        </Link>
      </nav>

      {/* Déconnexion */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-700 transition-colors w-full mt-2"
      >
        <LogOut size={15} />
        Déconnexion
      </button>
    </aside>
  );
}
