import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { Target, Heart, Users, Home, Stethoscope, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Nos Missions - Fondation Chacal",
  description: "Découvrez nos engagements pour améliorer le quotidien des seniors. Santé, logement, inclusion sociale.",
  keywords: ["missions", "actions humanitaires", "seniors", "solidarité", "Cameroun"],
};

export default function MissionsPage() {
  const missions = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Santé & Soins",
      description: "Accès aux soins médicaux spécialisés",
      features: ["Consultations gratuites", "Médicaments essentiels", "Suivi nutritionnel", "Prévention santé"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Logement Digne",
      description: "Amélioration des conditions de vie",
      features: ["Réhabilitation", "Accès eau potable", "Sécurité", "Confort adapté"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusion Sociale",
      description: "Lutte contre l'isolement",
      features: ["Activités sociales", "Groupes de parole", "Événements", "Transmission"],
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Autonomisation",
      description: "Soutien à l'indépendance",
      features: ["Micro-crédits", "Formation", "Activités génératrices", "Coopératives"],
      color: "from-rose-500 to-rose-600"
    }
  ];

  return (
    <ModernPageTemplate
      heroTitle="Nos Missions"
      heroSubtitle="Notre engagement"
      heroDescription="Découvrez comment nous transformons chaque jour la vie des seniors à travers des actions concrètes et durables."
      heroImage="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2000"
    >
      {/* Introduction */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-6 py-2 rounded-full font-bold mb-6">
          <Target className="w-5 h-5" />
          Notre Vision
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-8">
          Un avenir meilleur pour <span className="text-amber-600">chaque senior</span>
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Notre approche holistique combine santé, logement, inclusion sociale et autonomie économique 
          pour offrir des solutions durables et adaptées aux besoins spécifiques de chaque bénéficiaire.
        </p>
      </div>

      {/* Missions Grid - Style moderne */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {missions.map((mission, index) => (
          <div 
            key={index}
            className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mission.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <div className="text-white">
                {mission.icon}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
              {mission.title}
            </h3>
            <p className="text-slate-600 mb-6">{mission.description}</p>
            
            <ul className="space-y-3">
              {mission.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Stats - Style moderne */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-center text-white mb-20 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "1,200+", label: "Seniors accompagnés" },
            { value: "85%", label: "Satisfaction" },
            { value: "25", label: "Communautés" },
            { value: "15", label: "Années d'action" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Approach */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">Notre Approche Innovante</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Sur Mesure", desc: "Chaque solution est adaptée aux besoins spécifiques" },
            { title: "Durable", desc: "Nous créons des impacts à long terme" },
            { title: "Participative", desc: "Les bénéficiaires sont acteurs du changement" }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors">
                <div className="text-amber-600 font-bold text-2xl">{index + 1}</div>
              </div>
              <h4 className="font-bold text-xl mb-3 text-blue-900 group-hover:text-amber-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 bg-gradient-to-r from-blue-50 to-amber-50 rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Vous souhaitez nous soutenir ?</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Rejoignez notre mission et participez à la transformation de vies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/faire-un-don"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            Faire un don
          </a>
          <a
            href="/devenir-benevole"
            className="bg-white border-2 border-blue-900 hover:border-amber-500 text-blue-900 hover:text-amber-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Devenir bénévole
          </a>
        </div>
      </div>
    </ModernPageTemplate>
  );
}