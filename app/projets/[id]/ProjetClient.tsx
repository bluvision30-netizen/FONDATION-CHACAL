'use client';

import Link from 'next/link';
import { CheckCircle2, MapPin, Calendar, ArrowLeft, ExternalLink, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Projet } from '@/data/projets';

export default function ProjetClient({ projet }: { projet: Projet }) {
  const { language } = useLanguage();

  // ── Données selon la langue ──
  const titre       = language === 'en' ? projet.titreEn       : projet.titre;
  const status      = language === 'en' ? projet.statusEn      : projet.status;
  const description = language === 'en' ? projet.descriptionEn : projet.description;
  const date        = language === 'en' ? projet.dateEn        : projet.date;
  const lieu        = language === 'en' ? projet.lieuEn        : projet.lieu;
  const objectifs   = language === 'en' ? projet.objectifsEn   : projet.objectifs;
  const stats       = language === 'en' ? projet.statsEn       : projet.stats;

  const progress = Math.min(Math.round((projet.collected / projet.goal) * 100), 100);

  const statusColor =
    projet.status === 'En cours' ? 'bg-emerald-500' :
    projet.status === 'À venir'  ? 'bg-blue-600'    : 'bg-slate-400';

  const t = {
    back:        language === 'en' ? 'Back to projects'     : 'Retour aux projets',
    about:       language === 'en' ? 'About this project'   : 'À propos du projet',
    goals:       language === 'en' ? 'Our objectives'       : 'Nos objectifs',
    keyFigures:  language === 'en' ? 'Key figures'          : 'Chiffres clés',
    support:     language === 'en' ? 'Support this project' : 'Soutenir ce projet',
    objective:   language === 'en' ? 'Goal'                 : 'Objectif',
    donate:      language === 'en' ? 'Donate via PayPal'    : 'Faire un don via PayPal',
    whatsapp:    language === 'en' ? 'Contact via WhatsApp' : 'Contacter via WhatsApp',
    email:       language === 'en' ? 'Contact by email'     : 'Contacter par email',
    tagline:     language === 'en' ? 'Every donation, big or small, contributes to our mission.' : 'Chaque don, petit ou grand, contribue à notre mission.',
    footer:      language === 'en' ? '© 2026 Chacal Foundation • Douala, Cameroon' : '© 2026 Fondation Le Chacal • Douala, Cameroun',
    mainSite:    language === 'en' ? 'Back to main site'    : 'Retour au site principal',
    waMsg:       language === 'en'
      ? `Hello, I would like to support the project: ${titre}`
      : `Bonjour, je souhaite soutenir le projet : ${titre}`,
  };

  return (
    <main className="bg-[#FCFAFA] min-h-screen">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo Fondation Le Chacal" className="h-9 w-auto object-contain" />
            <span className="text-lg font-bold tracking-tighter text-blue-900">
              FONDATION <span className="text-amber-500">Le Chacal</span>
            </span>
          </Link>
          <Link
            href="/#projets"
            className="flex items-center gap-2 text-slate-600 hover:text-amber-500 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>
        </div>
      </nav>

      {/* ── Hero image ── */}
      <div className="relative h-[55vh] overflow-hidden pt-16">
        <img src={projet.image} alt={titre} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/30 to-transparent" />

        <div className="absolute top-28 left-6 md:left-16">
          <span className={`${statusColor} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest`}>
            {status}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-16 pb-10">
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight max-w-3xl">{titre}</h1>
          <div className="flex flex-wrap gap-6 mt-4 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-amber-400" /> {date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-amber-400" /> {lieu}
            </span>
          </div>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid lg:grid-cols-3 gap-12">

        {/* Gauche */}
        <div className="lg:col-span-2 space-y-12">

          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{t.about}</h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              {description.trim().split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{t.goals}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {objectifs.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-medium text-sm">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {stats && (
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">{t.keyFigures}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-blue-900 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-white mb-1">{stat.valeur}</div>
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Droite */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sticky top-24">
            <h3 className="text-xl font-bold text-blue-900 mb-6">{t.support}</h3>

            <div className="mb-6">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-blue-900">{projet.collected.toLocaleString('fr-FR')} FCFA</span>
                <span className="text-slate-400">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-900 to-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {t.objective} : {projet.goal.toLocaleString('fr-FR')} FCFA
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#0070BA] text-white rounded-2xl px-5 py-4 hover:bg-[#005EA6] transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">{t.donate}</span>
                <ExternalLink size={16} />
              </a>
              <a
                href={`https://wa.me/23797069267?text=${encodeURIComponent(t.waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#25D366] text-white rounded-2xl px-5 py-4 hover:bg-[#20BA5A] transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">{t.whatsapp}</span>
                <Phone size={16} />
              </a>
              <a
                href={`mailto:chacalfoundation@gmail.com?subject=Don — ${titre}`}
                className="flex items-center justify-between w-full bg-slate-50 text-blue-900 rounded-2xl px-5 py-4 hover:bg-slate-100 transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">{t.email}</span>
                <Mail size={16} />
              </a>
            </div>

            <p className="text-xs text-slate-400 text-center mt-5">{t.tagline}</p>
          </div>

          <Link
            href="/#projets"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-blue-900 text-blue-900 rounded-2xl font-bold hover:bg-blue-900 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            {t.back}
          </Link>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-blue-950 text-white/60 py-8 text-center text-sm">
        <p>{t.footer}</p>
        <Link href="/" className="text-amber-400 hover:text-amber-300 transition mt-1 inline-block">
          {t.mainSite}
        </Link>
      </footer>
    </main>
  );
}
