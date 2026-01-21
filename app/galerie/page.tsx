import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { Camera, Video, Image as ImageIcon, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: "Galerie - Fondation Chacal",
  description: "Découvrez nos photos et vidéos des moments forts de nos actions.",
};

export default function GaleriePage() {
  const gallery = [
    {
      type: 'photo',
      title: 'Inauguration Centre Médical',
      date: 'Mai 2024',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000'
    },
    {
      type: 'photo',
      title: 'Distribution Alimentaire',
      date: 'Mars 2024',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000'
    },
    {
      type: 'video',
      title: 'Documentaire 2023',
      date: 'Décembre 2023',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000'
    },
    {
      type: 'photo',
      title: 'Atelier Artisanat',
      date: 'Novembre 2023',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000'
    },
    {
      type: 'photo',
      title: 'Visites à Domicile',
      date: 'Octobre 2023',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000'
    },
    {
      type: 'photo',
      title: 'Célébration Communautaire',
      date: 'Septembre 2023',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1000'
    }
  ];

  return (
    <ModernPageTemplate
      heroTitle="Galerie"
      heroSubtitle="Mémoire Visuelle"
      heroDescription="Captures d'instants de joie, de solidarité et de transformation."
      heroImage="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000"
    >
      {/* Filtres */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <button className="px-6 py-3 bg-blue-900 text-white rounded-full font-medium flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Tous
        </button>
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:text-blue-900 rounded-full font-medium flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Photos
        </button>
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:text-blue-900 rounded-full font-medium flex items-center gap-2">
          <Video className="w-4 h-4" />
          Vidéos
        </button>
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:text-blue-900 rounded-full font-medium flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Événements
        </button>
      </div>

      {/* Grille Galerie */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {gallery.map((item, index) => (
          <div key={index} className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-square overflow-hidden">
              <img 
                src={item.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={item.title}
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-2"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${item.type === 'video' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                <span className="text-white text-sm font-medium uppercase">
                  {item.type === 'video' ? 'VIDÉO' : 'PHOTO'}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Plus de contenu à venir</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Suivez-nous sur les réseaux sociaux pour découvrir nos dernières actions en temps réel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Voir notre Instagram
          </a>
          <a
            href="#"
            className="bg-white border-2 border-blue-900 hover:border-amber-500 text-blue-900 hover:text-amber-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" />
            Notre chaîne YouTube
          </a>
        </div>
      </div>
    </ModernPageTemplate>
  );
}