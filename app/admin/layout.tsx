// app/admin/layout.tsx — Layout du dashboard avec sidebar

import type { Metadata } from 'next';
import AdminSidebar from './AdminSidebar';

export const metadata: Metadata = {
  title: 'Dashboard — Fondation Le Chacal',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F4F0] flex">
      <AdminSidebar />
      <main className="flex-1 ml-[220px] p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
