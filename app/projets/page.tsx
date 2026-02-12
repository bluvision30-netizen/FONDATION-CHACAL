import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { CheckCircle, Clock, Target, TrendingUp, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: "Nos Projets - Fondation Chacal",
  description: "Découvrez nos projets en cours et réalisés pour le bien-être des seniors.",
};

export default function ProjetsPage() {
  const projects = {
    enCours: [
      {
        title: 'Centre Chacal Horizon',
        description: 'Construction d\'un centre médical gériatrique moderne',
        progress: 65,
        amount: '32,000€ / 50,000€',
        image: 'https://res.cloudinary.com/dkuciagop/image/upload/v1770897204/senior-woman-nurse-holding-hands-portrait-support-healthcare-happiness-retirement-home-elderly-black-person-caregiver-together-trust-elderly-care-help-with-homecare_ejp0jo.jpg'
      },

    ],
    realises: [
      {
        title: 'Puits Communautaire de Loum',
        description: 'Accès à l\'eau potable pour 500 personnes',
        year: '2023',
        impact: '500 bénéficiaires',
        image: 'https://res.cloudinary.com/dkuciagop/image/upload/v1770897163/health-support-nurse-black-woman-with-tablet-medical-information-advice-online-smile-conversation-african-nurse-helping-senior-patient-with-healthcare-app-house_vsfeg4.jpg'
      },
      {
        title: 'Ateliers d\'Artisanat Senior',
        description: 'Formation de 150 seniors aux métiers artisanaux',
        year: '2024',
        impact: '150 formés',
        image: 'https://res.cloudinary.com/dkuciagop/image/upload/v1770897163/health-support-nurse-black-woman-with-tablet-medical-information-advice-online-smile-conversation-african-nurse-helping-senior-patient-with-healthcare-app-house_vsfeg4.jpg'
      }
    ]
  };

  return (
    <ModernPageTemplate
      heroTitle="Nos Projets"
      heroSubtitle="Actions concrètes"
      heroDescription="Découvrez nos initiatives qui transforment la vie des seniors chaque jour."
      heroImage="https://res.cloudinary.com/dkuciagop/image/upload/v1770897316/scene-from-care-job-with-senior-patient-being-take-care_on9yip.jpg"
    >
      {/* En cours */}
      <div id="en-cours" className="scroll-mt-24 mb-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-6 py-2 rounded-full font-bold mb-4">
              <Clock className="w-5 h-5" />
              En cours
            </div>
            <h2 className="text-4xl font-serif text-blue-900">Projets Actifs</h2>
          </div>
          <Target className="w-8 h-8 text-blue-900" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.enCours.map((project, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <div className="h-48 overflow-hidden">
                <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-6">{project.description}</p>
                
                <div className="mb-6">
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
                  <p className="text-sm text-slate-500 mt-2">{project.amount}</p>
                </div>
                
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition-colors">
                  Soutenir ce projet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Réalisés */}
      <div id="realises" className="scroll-mt-24 mb-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-6 py-2 rounded-full font-bold mb-4">
              <CheckCircle className="w-5 h-5" />
              Réalisés
            </div>
            <h2 className="text-4xl font-serif text-blue-900">Projets Accomplis</h2>
          </div>
          <TrendingUp className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.realises.map((project, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-slate-100">
              <div className="h-48 overflow-hidden">
                <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-blue-900 group-hover:text-amber-600 transition-colors">
                    {project.title}
                  </h3>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                    {project.year}
                  </span>
                </div>
                <p className="text-slate-600 mb-6">{project.description}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Heart className="w-5 h-5" />
                  <span>{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-white text-center mb-20">
        <h3 className="text-3xl font-bold mb-12">Notre Impact Collectif</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "15", label: "Projets menés" },
            { value: "85%", label: "Taux de réussite" },
            { value: "50+", label: "Partenaires" },
            { value: "1.2M€", label: "Investis" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Vous avez un projet en tête ?</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Partagez-nous vos idées ou proposez un partenariat pour soutenir nos actions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Proposer un projet
          </a>
          <a
            href="/faire-un-don"
            className="bg-white border-2 border-blue-900 hover:border-amber-500 text-blue-900 hover:text-amber-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Soutenir tous les projets
          </a>
        </div>
      </div>
    </ModernPageTemplate>
  );
}