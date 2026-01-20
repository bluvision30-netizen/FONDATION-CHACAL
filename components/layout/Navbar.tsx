"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.about, href: '/a-propos' },
    { name: t.nav.missions, href: '/missions' },
    { name: t.nav.projects, href: '/projets' },
    { name: t.nav.gallery, href: '/galerie' },
    { name: t.nav.impact, href: '/impact' },
    { name: t.nav.news, href: '/actualites' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-white py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="text-white w-5 h-5" fill="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-900 leading-tight">
                FONDATION CHACAL
              </span>
              <span className="text-xs text-blue-600/70">
                Dignité • Solidarité
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-blue-900 font-medium text-sm uppercase tracking-wider transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Sélecteur de langue */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-500 transition-colors text-sm font-medium"
            >
              {language === 'fr' ? 'FR' : 'EN'}
            </button>
            
            {/* Bouton Don */}
            <Link
              href="/faire-un-don"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
            >
              {t.nav.donate}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium"
            >
              {language === 'fr' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-900"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 mt-2 py-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/faire-un-don"
                  className="block w-full bg-amber-500 text-white text-center py-3 rounded-lg font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.donate}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}