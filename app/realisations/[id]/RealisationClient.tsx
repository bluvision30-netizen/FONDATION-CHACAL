'use client';
// app/realisations/[id]/RealisationClient.tsx

import Link from 'next/link';
import { MapPin, Calendar, Users, ArrowLeft, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RealisationClient({ realisation: r }: { realisation: any }) {
  const { language } = useLanguage();

  const titre        = language === 'en' ? (r.titre_en        || r.titre)        : r.titre;
  const description  = language === 'en' ? (r.description_en  || r.description)  : r.description;
  const date         = language === 'en' ? (r.date_en         || r.date_fr)      : r.date_fr;
  const lieu         = language === 'en' ? (r.lieu_en         || r.lieu)         : r.lieu;
  const beneficiaires = language === 'en' ? (r.beneficiaires_en || r.beneficiaires) : r.beneficiaires;
  const stats        = (language === 'en' ? (r.stats_en?.length ? r.stats_en : r.stats) : r.stats) || [];

  const t = {
    back:        language === 'en' ? 'Back to achievements' : 'Retour aux réalisations',
    about:       language === 'en' ? 'About this achievement' : 'À propos de cette réalisation',
    keyFigures:  language === 'en' ? 'Key figures'           : 'Chiffres clés',
    completed:   language === 'en' ? 'Completed'             : 'Réalisé',
    beneficiary: language === 'en' ? 'Beneficiaries'         : 'Bénéficiaires',
    location:    language === 'en' ? 'Location'              : 'Lieu',
    date:        language === 'en' ? 'Date'                  : 'Date',
    support:     language === 'en' ? 'Support our mission'   : 'Soutenir notre mission',
    tagline:     language === 'en' ? 'Every donation helps us reach more people in need.' : 'Chaque don nous permet d\'atteindre davantage de personnes dans le besoin.',
    whatsapp:    language === 'en' ? 'Contact via WhatsApp'  : 'Contacter via WhatsApp',
    email:       language === 'en' ? 'Contact by email'      : 'Contacter par email',
    footer:      language === 'en' ? '© 2026 Chacal Foundation • Douala, Cameroon' : '© 2026 Fondation Le Chacal • Douala, Cameroun',
    mainSite:    language === 'en' ? 'Back to main site'     : 'Retour au site principal',
  };

  return (
    <main className="bg-[#FCFAFA] min-h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
            <span className="text-lg font-bold tracking-tighter text-blue-900">
              FONDATION <span className="text-amber-500">Le Chacal</span>
            </span>
          </Link>
          <Link
            href="/#realisations"
            className="flex items-center gap-2 text-slate-600 hover:text-amber-500 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden pt-16">
        <img src={r.image_url} alt={titre} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/30 to-transparent" />

        <div className="absolute top-28 left-6 md:left-16">
          <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            {t.completed}
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
            {beneficiaires && (
              <span className="flex items-center gap-2">
                <Users size={15} className="text-amber-400" /> {beneficiaires}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid lg:grid-cols-3 gap-12">

        {/* Gauche — description + stats */}
        <div className="lg:col-span-2 space-y-12">

          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{t.about}</h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              {description.trim().split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </div>

          {/* Détails */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Calendar size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{t.date}</p>
                <p className="text-slate-700 font-semibold mt-1">{date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <MapPin size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{t.location}</p>
                <p className="text-slate-700 font-semibold mt-1">{lieu}</p>
              </div>
            </div>
            {beneficiaires && (
              <div className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Users size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{t.beneficiary}</p>
                  <p className="text-slate-700 font-semibold mt-1">{beneficiaires}</p>
                </div>
              </div>
            )}
          </div>

          {/* Chiffres clés */}
          {stats.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">{t.keyFigures}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat: { label: string; valeur: string }, i: number) => (
                  <div key={i} className="bg-blue-900 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-white mb-1">{stat.valeur}</div>
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Droite — sidebar contact/don */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="font-bold text-emerald-700 text-sm uppercase tracking-wide">{t.completed}</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">{t.support}</h3>
            <p className="text-slate-500 text-sm mb-6">{t.tagline}</p>

            <div className="space-y-3">
              <a
                href={`https://wa.me/23797069267?text=${encodeURIComponent(language === 'en' ? `Hello, I want to support Chacal Foundation: ${titre}` : `Bonjour, je souhaite soutenir la Fondation Le Chacal : ${titre}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#25D366] text-white rounded-2xl px-5 py-4 hover:bg-[#20BA5A] transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">{t.whatsapp}</span>
                <Phone size={16} />
              </a>
              <a
                href={`mailto:chacalfoundation@gmail.com?subject=${encodeURIComponent(titre)}`}
                className="flex items-center justify-between w-full bg-slate-50 text-blue-900 rounded-2xl px-5 py-4 hover:bg-slate-100 transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">{t.email}</span>
                <Mail size={16} />
              </a>
            </div>
          </div>

          <Link
            href="/#realisations"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-blue-900 text-blue-900 rounded-2xl font-bold hover:bg-blue-900 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            {t.back}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-950 text-white/60 py-8 text-center text-sm">
        <p>{t.footer}</p>
        <Link href="/" className="text-amber-400 hover:text-amber-300 transition mt-1 inline-block">
          {t.mainSite}
        </Link>
      </footer>
    </main>
  );
}