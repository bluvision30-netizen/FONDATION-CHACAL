'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">FC</span>
              </div>
              <h3 className="text-lg font-bold text-white">Fondation Chacal</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Ensemble pour un avenir meilleur. La Fondation Chacal œuvre pour le développement communautaire et l'éducation.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                { href: '/a-propos', label: 'À Propos' },
                { href: '/programmes', label: 'Programmes' },
                { href: '/actions', label: 'Nos Actions' },
                { href: '/galerie', label: 'Galerie' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-amber-500 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Douala, Cameroun</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <a href="tel:+237123456789" className="text-sm hover:text-amber-500 transition-colors">
                  +237 123 456 789
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@fondationchacal.org" className="text-sm hover:text-amber-500 transition-colors break-all">
                  contact@fondationchacal.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Newsletter</h3>
            <p className="text-sm">Restez informé de nos actions et projets.</p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors text-sm"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-center sm:text-left">
              © {currentYear} Fondation Chacal. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
              <Link href="/mentions-legales" className="hover:text-amber-500 transition-colors">
                Mentions légales
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/politique-confidentialite" className="hover:text-amber-500 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}