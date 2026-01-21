import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 text-white/80">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 mb-16">
        {/* Brand Section */}
        <div className="col-span-2">
          <h2 className="text-3xl font-bold text-white mb-6">FONDATION <span className="text-amber-500">CHACAL</span></h2>
          <p className="max-w-sm text-lg leading-relaxed text-slate-400 mb-8">
            Engagés pour l'autonomisation et le respect de la dignité humaine. 
            Rejoignez-nous pour bâtir un futur inclusif pour nos aînés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
          <ul className="space-y-4">
            <li><Link href="/missions" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">Missions <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            <li><Link href="/projets" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">Projets <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            <li><Link href="/realisations" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">Réalisations <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            <li><Link href="/galerie" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">Galerie <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Siège Social</p>
                <p className="text-slate-400 text-sm">Bandja, Ouest Cameroun</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <a href="tel:+237600000000" className="text-slate-400 hover:text-amber-500 transition-colors">+237 600 000 000</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <a href="mailto:contact@fondationchacal.org" className="text-slate-400 hover:text-amber-500 transition-colors">contact@fondationchacal.org</a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-xl mb-2">Restez informé</h4>
              <p className="text-slate-400">Recevez nos actualités et projets en avant-première.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 w-full md:w-64 focus:outline-none focus:border-amber-500"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 Fondation Chacal. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/mentions-legales" className="hover:text-amber-500 transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-amber-500 transition-colors">Confidentialité</Link>
            <Link href="/cookies" className="hover:text-amber-500 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}