// app/projets/[id]/page.tsx
import { projets, getProjet } from '@/data/projets';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, MapPin, Calendar, ArrowLeft, ExternalLink, Phone, Mail } from 'lucide-react';

// ─── Génère les routes statiques au build : /projets/1, /projets/2 ───
export async function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

// ─── SEO automatique par projet ───────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const projet = getProjet(id);
  if (!projet) return { title: 'Projet introuvable — Fondation Le Chacal' };

  return {
    title: `${projet.titre} — Fondation Le Chacal`,
    description: projet.descriptionCourte,
    openGraph: {
      title: `${projet.titre} — Fondation Le Chacal`,
      description: projet.descriptionCourte,
      images: [{ url: projet.image, width: 1200, height: 630, alt: projet.titre }],
      url: `https://fondationlechacal.org/projets/${projet.id}`,
      type: 'article',
      siteName: 'Fondation Le Chacal',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${projet.titre} — Fondation Le Chacal`,
      description: projet.descriptionCourte,
      images: [projet.image],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────
export default async function PageProjet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projet = getProjet(id);
  if (!projet) notFound();

  const progress = Math.min(Math.round((projet.collected / projet.goal) * 100), 100);

  const statusColor =
    projet.status === 'En cours'
      ? 'bg-emerald-500'
      : projet.status === 'À venir'
      ? 'bg-blue-600'
      : 'bg-slate-400';

  return (
    <main className="bg-[#FCFAFA] min-h-screen">

      {/* ── Navbar simplifiée ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg italic">C</span>
            </div>
            <span className="text-lg font-bold tracking-tighter text-blue-900">
              FONDATION <span className="text-amber-500">Le Chacal</span>
            </span>
          </Link>
          <Link
            href="/#projets"
            className="flex items-center gap-2 text-slate-600 hover:text-amber-500 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </Link>
        </div>
      </nav>

      {/* ── Hero image ── */}
      <div className="relative h-[55vh] overflow-hidden pt-16">
        <img
          src={projet.image}
          alt={projet.titre}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/30 to-transparent" />

        {/* Badge statut */}
        <div className="absolute top-28 left-6 md:left-16">
          <span
            className={`${statusColor} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest`}
          >
            {projet.status}
          </span>
        </div>

        {/* Titre sur le hero */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-16 pb-10">
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight max-w-3xl">
            {projet.titre}
          </h1>
          <div className="flex flex-wrap gap-6 mt-4 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-amber-400" />
              {projet.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-amber-400" />
              {projet.lieu}
            </span>
          </div>
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid lg:grid-cols-3 gap-12">

        {/* Colonne gauche : description + objectifs */}
        <div className="lg:col-span-2 space-y-12">

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">À propos du projet</h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              {projet.description.trim().split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </div>

          {/* Objectifs */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Nos objectifs</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {projet.objectifs.map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
                >
                  <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-medium text-sm">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats si disponibles */}
          {projet.stats && (
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Chiffres clés</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projet.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-blue-900 rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl font-black text-white mb-1">{stat.valeur}</div>
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colonne droite : don + partage */}
        <div className="space-y-6">

          {/* Carte collecte */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sticky top-24">
            <h3 className="text-xl font-bold text-blue-900 mb-6">Soutenir ce projet</h3>

            {/* Barre de progression */}
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
                Objectif : {projet.goal.toLocaleString('fr-FR')} FCFA
              </p>
            </div>

            {/* Boutons de don */}
            <div className="space-y-3">
              {/* PayPal */}
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#0070BA] text-white rounded-2xl px-5 py-4 hover:bg-[#005EA6] transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">Faire un don via PayPal</span>
                <ExternalLink size={16} />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/237XXXXXXXXX?text=Bonjour, je souhaite soutenir le projet : ${encodeURIComponent(projet.titre)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#25D366] text-white rounded-2xl px-5 py-4 hover:bg-[#20BA5A] transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">Contacter via WhatsApp</span>
                <Phone size={16} />
              </a>

              {/* Email */}
              <a
                href={`mailto:contact@fondationlechacal.org?subject=Don — ${projet.titre}`}
                className="flex items-center justify-between w-full bg-slate-50 text-blue-900 rounded-2xl px-5 py-4 hover:bg-slate-100 transition-all hover:scale-[1.02]"
              >
                <span className="font-bold">Contacter par email</span>
                <Mail size={16} />
              </a>
            </div>

            <p className="text-xs text-slate-400 text-center mt-5">
              Chaque don, petit ou grand, contribue à notre mission.
            </p>
          </div>

          {/* Retour */}
          <Link
            href="/#projets"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-blue-900 text-blue-900 rounded-2xl font-bold hover:bg-blue-900 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            Voir tous les projets
          </Link>
        </div>
      </div>

      {/* ── Footer minimal ── */}
      <footer className="bg-blue-950 text-white/60 py-8 text-center text-sm">
        <p>© 2026 Fondation Le Chacal • Douala, Cameroun</p>
        <Link href="/" className="text-amber-400 hover:text-amber-300 transition mt-1 inline-block">
          Retour au site principal
        </Link>
      </footer>
    </main>
  );
}