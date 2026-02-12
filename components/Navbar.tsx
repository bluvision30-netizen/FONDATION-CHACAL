"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { 
    name: "La Fondation", 
    submenu: [
      { name: "Notre Histoire", href: "/notre-histoire" },
      { name: "Le Mot du Président", href: "/president" },

    ] 
  },
  { name: "Missions", href: "/missions" },
  { name: "Projets", href: "/projets" },
  { name: "Impact", href: "/impact" },

];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-white/95 backdrop-blur-sm py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-xl italic">C</span>
          </div>
          <span className="text-base sm:text-xl font-bold tracking-tighter text-blue-900">
            FONDATION <span className="text-amber-500 uppercase">Le Chacal</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-medium text-sm uppercase tracking-widest text-slate-600">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={link.href || '#'} 
                className="hover:text-amber-500 transition-colors flex items-center gap-1"
              >
                {link.name} {link.submenu && <ChevronDown size={14} />}
              </Link>
              <AnimatePresence>
                {link.submenu && activeDropdown === link.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-4 w-56 bg-white shadow-2xl rounded-2xl p-4 border border-slate-50"
                  >
                    {link.submenu.map((sub) => (
                      <Link 
                        key={sub.name}
                        href={sub.href} 
                        className="block p-3 text-sm text-slate-500 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link href="#dons">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 xl:px-8 py-3 rounded-full transition-transform active:scale-95 shadow-lg shadow-amber-500/20 text-sm">
              Faire un Don
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors z-[110]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="text-blue-900" size={24} />
          ) : (
            <Menu className="text-blue-900" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[72px] left-0 right-0 bg-white shadow-2xl overflow-hidden z-[90]"
          >
            <div className="max-h-[calc(100vh-72px)] overflow-y-auto">
              <div className="px-4 sm:px-6 py-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.name}>
                    <Link 
                      href={link.href || '#'} 
                      onClick={() => !link.submenu && setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                    >
                      {link.name}
                    </Link>
                    {link.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100">
                <Link href="#dons" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-amber-500 text-white py-3 rounded-2xl font-bold hover:bg-amber-600 transition">
                    Faire un Don
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}