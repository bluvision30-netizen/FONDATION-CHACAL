import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { CheckCircle, Award, TrendingUp, Users, Home, Droplets } from 'lucide-react';

export const metadata: Metadata = {
  title: "Nos Réalisations - Fondation Chacal",
  description: "Découvrez nos projets réalisés et leur impact sur la vie des seniors.",
};

export default function RealisationsPage() {
  const realisations = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Puits de Loum",
      year: "2023",
      description: "Construction d'un puits d'eau potable desservant 500 personnes",
      impact: "500 bénéficiaires",
      investment: "25,000€",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Réhabilitation de Logements",
      year: "2022-2023",
      description: "Rénovation de 50 habitations pour seniors vulnérables",
      impact: "50 familles",
      investment: "75,000€",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Clubs Seniors",
      year: "2024",
      description: "Création de 10 clubs sociaux intergénérationnels",
      impact: "300 participants",
      investment: "30,000€",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000"
    }
  ];

  return (
    <ModernPageTemplate
      heroTitle="Nos Réalisations"
      heroSubtitle="Notre Héritage"
      heroDescription="Des projets concrets qui ont transformé la vie de centaines de bénéficiaires."
      heroImage="https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2000"
    >
      {/* Introduction */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-6 py-2 rounded-full font-bold mb-6">
          <Award className="w-5 h-5" />
          Projets Accomplis
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-8">
          Un impact <span className="text-amber-600">mesurable</span>
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Chaque réalisation témoigne de notre engagement envers l'amélioration 
          durable des conditions de vie des seniors.
        </p>
      </div>

      {/* Réalisations */}
      <div className="space-y-8 mb-20">
        {realisations.map((realisation, index) => (
          <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="lg:flex">
              <div className="lg:w-1/3 h-64 lg:h-auto">
                <img 
                  src={realisation.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={realisation.title}
                />
              </div>
              <div className="lg:w-2/3 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <div className="text-blue-600">
                        {realisation.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900 group-hover:text-amber-600 transition-colors">
                        {realisation.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                          {realisation.year}
                        </span>
                        <span className="text-slate-500 text-sm">
                          <CheckCircle className="w-4 h-4 inline mr-1 text-emerald-500" />
                          Terminé
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-6 text-lg">{realisation.description}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-sm text-slate-500 mb-1">Impact</div>
                    <div className="font-bold text-blue-900 text-lg">{realisation.impact}</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-sm text-slate-500 mb-1">Investissement</div>
                    <div className="font-bold text-amber-700 text-lg">{realisation.investment}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Globales */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-white mb-20">
        <h3 className="text-3xl font-bold text-center mb-12">Impact Global</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "25", label: "Projets réalisés", icon: <Award className="w-6 h-6" /> },
            { value: "2,500+", label: "Bénéficiaires directs", icon: <Users className="w-6 h-6" /> },
            { value: "1.5M€", label: "Investis", icon: <TrendingUp className="w-6 h-6" /> },
            { value: "95%", label: "Satisfaction", icon: <CheckCircle className="w-6 h-6" /> }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="text-amber-300">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Témoignages */}
      <div className="bg-gradient-to-r from-amber-50 to-blue-50 rounded-3xl p-12 text-center mb-20">
        <h3 className="text-3xl font-bold text-blue-900 mb-8">Ce qu'ils en disent</h3>
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-700 text-xl italic mb-6">
            "Grâce au puits de Loum, je n'ai plus à parcourir des kilomètres pour chercher de l'eau. 
            La Fondation Chacal a vraiment changé notre vie."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-blue-900 rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-blue-900">Maman Rose</p>
              <p className="text-slate-600 text-sm">Bénéficiaire, 68 ans</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Inspiré par nos réalisations ?</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Contribuez à l'élaboration de nos futurs projets ou soutenez nos actions en cours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/faire-un-don"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Soutenir nos actions
          </a>
          <a
            href="/projets"
            className="bg-white border-2 border-blue-900 hover:border-amber-500 text-blue-900 hover:text-amber-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Voir les projets en cours
          </a>
        </div>
      </div>
    </ModernPageTemplate>
  );
}