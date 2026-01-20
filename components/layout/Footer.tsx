import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6" fill="white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">FONDATION <span className="text-amber-400">CHACAL</span></h2>
                <p className="text-blue-200">Redonnons le sourire à nos sages</p>
              </div>
            </div>
            <p className="text-blue-300">
              Organisation dédiée à l'amélioration des conditions de vie des seniors
              à travers des programmes durables.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['/missions', '/a-propos', '/projets', '/contact'].map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-blue-300 hover:text-amber-400 transition-colors"
                  >
                    {path.split('/')[1].charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-blue-300">Bandja, Cameroun</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-blue-300">+237 600 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-blue-300">contact@fondationchacal.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-400 text-sm">
          <p>© {new Date().getFullYear()} Fondation Chacal. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}