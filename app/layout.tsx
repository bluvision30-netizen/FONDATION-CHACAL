import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fondation Chacal - Soutien aux Seniors',
  description: 'Fondation humanitaire dédiée au bien-être des personnes âgées',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-[#FCFAFA] text-[#1A1A1B]`}>
        <LanguageProvider>
          {/* SUPPRIMEZ Navbar et Footer d'ici */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}