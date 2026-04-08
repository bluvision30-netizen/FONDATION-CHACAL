import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { Calendar, Tag, ArrowRight, Newspaper, Mic, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: "Actualités - Fondation Chacal",
  description: "Restez informé de nos dernières actions, événements et projets.",
};

export default function ActualitesPage() {
  const articles = [
    {
      title: "Inauguration du Centre Chacal Horizon",
      date: "15 Janvier 2026",
      category: "Événement",
      excerpt: "Cérémonie officielle d'ouverture de notre nouveau centre médical à Bandja.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Nouveau Programme Nutritionnel",
      date: "10 Janvier 2026",
      category: "Projet",
      excerpt: "Lancement d'un programme de nutrition adaptée pour 200 seniors.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000",
      icon: <Tag className="w-5 h-5" />
    },
    {
      title: "Interview Radio Nationale",
      date: "5 Janvier 2026",
      category: "Presse",
      excerpt: "Notre directeur intervient sur les enjeux du vieillissement.",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
      icon: <Mic className="w-5 h-5" />
    }
  ];

  const categories = [
    { name: "Tous", count: 12, active: true },
    { name: "Événements", count: 4 },
    { name: "Projets", count: 5 },
    { name: "Presse", count: 3 }
  ];

  return (
    <ModernPageTemplate
      heroTitle="Actualités"
      heroSubtitle="Restez informé"
      heroDescription="Suivez nos dernières actions, événements et avancées."
      heroImage="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2000"
    >
      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`px-6 py-3 rounded-full font-medium transition-all ${cat.active 
              ? 'bg-blue-900 text-white' 
              : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-900 hover:border-blue-300'
            }`}
          >
            {cat.name}
            {!cat.active && <span className="text-slate-400 ml-2">({cat.count})</span>}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {articles.map((article, index) => (
          <article key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="h-48 overflow-hidden">
              <img 
                src={article.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={article.title}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  {article.icon}
                  {article.category}
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-sm text-slate-500">{article.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-slate-600 mb-6">
                {article.excerpt}
              </p>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-blue-900 hover:text-amber-600 font-medium group/link"
              >
                Lire l'article
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-white mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <Newspaper className="w-12 h-12 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-6">Ne manquez aucune actualité</h3>
          <p className="text-blue-200 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières nouvelles directement dans votre boîte mail.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-grow bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      {/* Archives & Ressources */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-blue-900 mb-8">Ressources supplémentaires</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Rapports Annuels", description: "Consultez nos rapports d'activité", icon: <Newspaper className="w-6 h-6" /> },
            { title: "Médias", description: "Articles de presse et interviews", icon: <Mic className="w-6 h-6" /> },
            { title: "Vidéothèque", description: "Documentaires et reportages", icon: <Video className="w-6 h-6" /> }
          ].map((resource, index) => (
            <a 
              key={index} 
              href="#"
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors">
                <div className="text-blue-600 group-hover:text-amber-600">
                  {resource.icon}
                </div>
              </div>
              <h4 className="font-bold text-lg text-blue-900 mb-2 group-hover:text-amber-600 transition-colors">
                {resource.title}
              </h4>
              <p className="text-slate-600 text-sm">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Vous êtes journaliste ?</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Contactez notre service presse pour toute demande d'interview ou d'information.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
        >
          Contact presse
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </ModernPageTemplate>
  );
}