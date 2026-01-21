"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: "La Fondation", 
      href: "/a-propos",
      submenu: [
        { name: "Notre Histoire", href: "/a-propos#histoire" },
        { name: "Notre Équipe", href: "/a-propos#equipe" },
        { name: "Gouvernance", href: "/a-propos#gouvernance" },
        { name: "Rapports", href: "/a-propos#rapports" }
      ]
    },
    { name: "Missions", href: "/missions" },
    { name: "Projets", href: "/projets" },
    { name: "Réalisations", href: "/realisations" },
    { name: "Galerie", href: "/galerie" },
    { name: "Impact", href: "/impact" },
    { name: "Actualités", href: "/actualites" },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl italic">C</span>
          </div>
          <span className={`text-xl font-bold tracking-tighter ${!isScrolled ? 'text-white' : 'text-blue-900'}`}>
            FONDATION <span className="text-amber-500 uppercase">Chacal</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-widest ${!isScrolled ? 'text-white/90' : 'text-slate-600'}`}>
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={item.href}
                className="hover:text-amber-500 transition-colors flex items-center gap-1"
              >
                {item.name} {item.submenu && <ChevronDown size={14} />}
              </Link>
              
              {/* Menu déroulant */}
              <AnimatePresence>
                {item.submenu && activeDropdown === item.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-4 w-56 bg-white shadow-2xl rounded-2xl p-4 border border-slate-100"
                  >
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block p-3 text-sm text-slate-500 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition-all"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <Link 
            href="/faire-un-don"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
          >
            Faire un Don
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <details className="group">
                        <summary className="flex items-center justify-between p-3 text-slate-700 hover:text-blue-900 font-semibold text-sm uppercase cursor-pointer">
                          {item.name}
                          <ChevronDown className="group-open:rotate-180 transition-transform" size={16} />
                        </summary>
                        <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-4">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-3 py-3 text-sm text-slate-600 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        className="block p-3 text-slate-700 hover:text-blue-900 font-semibold text-sm uppercase rounded-lg hover:bg-blue-50/50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href="/faire-un-don"
                    className="block w-full bg-amber-500 text-white text-center py-4 rounded-xl font-bold text-sm uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Faire un don
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}