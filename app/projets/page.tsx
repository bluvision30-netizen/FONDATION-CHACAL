import { Metadata } from 'next';
import { CheckCircle, Clock, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: "Nos Projets - Fondation Chacal",
  description: "Découvrez nos projets en cours et réalisés",
};

export default function ProjetsPage() {
  const projects = [
    {
      status: 'en-cours',
      title: 'Centre Chacal Horizon',
      description: 'Construction d\'un centre médical gériatrique',
      progress: 65,
      amount: '32,000€ / 50,000€',
      color: 'border-blue-500'
    },
    {
      status: 'en-cours',
      title: 'Cantine Solidaire',
      description: 'Distribution de repas pour seniors isolés',
      progress: 40,
      amount: '4,500€ / 12,000€',
      color: 'border-amber-500'
    },
    {
      status: 'realise',
      title: 'Puits de Loum',
      description: 'Accès à l\'eau potable pour 500 personnes',
      progress: 100,
      amount: 'Terminé',
      color: 'border-emerald-500'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Nos <span className="text-amber-400">Projets</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Des actions concrètes qui transforment des vies
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filtres */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {['Tous', 'En cours', 'Réalisés', 'À venir'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-3 rounded-full font-medium whitespace-nowrap bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className={`bg-white rounded-3xl p-8 shadow-lg border-t-4 ${project.color}`}>
              <div className="flex items-center justify-between mb-6">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                  project.status === 'realise' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status === 'realise' ? 'Réalisé' : 'En cours'}
                </span>
                {project.status === 'en-cours' ? (
                  <Clock className="w-5 h-5 text-blue-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{project.title}</h3>
              <p className="text-slate-600 mb-6">{project.description}</p>
              
              {project.status === 'en-cours' && (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Progression</span>
                      <span className="font-bold text-blue-900">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">{project.amount}</p>
                </>
              )}
              
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 py-3 rounded-xl font-bold transition-colors">
                {project.status === 'realise' ? 'Voir les résultats' : 'Soutenir ce projet'}
              </button>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-12">Notre Impact en Chiffres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15', label: 'Projets actifs' },
              { value: '1,200+', label: 'Bénéficiaires' },
              { value: '85%', label: 'Taux de réussite' },
              { value: '25', label: 'Partenaires' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}