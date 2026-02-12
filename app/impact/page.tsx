import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { TrendingUp, Users, Heart, Home, Droplets, Stethoscope } from 'lucide-react';

export const metadata: Metadata = {
  title: "Notre Impact - Fondation Chacal",
  description: "Mesurez l'impact de nos actions sur la vie des seniors.",
};

export default function ImpactPage() {
  const impactStats = [
    { icon: <Users className="w-6 h-6" />, value: "1,200+", label: "Seniors accompagnés", color: "bg-blue-500" },
    { icon: <Home className="w-6 h-6" />, value: "50", label: "Logements rénovés", color: "bg-emerald-500" },
    { icon: <Droplets className="w-6 h-6" />, value: "500", label: "Accès à l'eau", color: "bg-cyan-500" },
    { icon: <Stethoscope className="w-6 h-6" />, value: "2,400", label: "Consultations", color: "bg-amber-500" },
    { icon: <Heart className="w-6 h-6" />, value: "85%", label: "Satisfaction", color: "bg-rose-500" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "95%", label: "Projets réussis", color: "bg-indigo-500" }
  ];

  const impactAreas = [
    {
      title: "Santé améliorée",
      description: "Réduction de 60% des maladies liées à l'âge grâce à nos programmes de prévention",
      icon: <Stethoscope className="w-8 h-8" />
    },
    {
      title: "Isolement réduit",
      description: "80% des participants à nos clubs sociaux rapportent une meilleure intégration",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Autonomie renforcée",
      description: "150 seniors formés à des activités génératrices de revenus",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  return (
    <ModernPageTemplate
      heroTitle="Notre Impact"
      heroSubtitle="Chiffres & Résultats"
      heroDescription="Des données concrètes qui témoignent de la transformation de vies."
      heroImage="https://res.cloudinary.com/dkuciagop/image/upload/v1770897316/scene-from-care-job-with-senior-patient-being-take-care_on9yip.jpg"
    >
      {/* Stats */}
      <div className="mb-20">
        <h2 className="text-4xl font-serif text-center text-blue-900 mb-12">
          Impact en <span className="text-amber-600">chiffres</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
              <div className="text-slate-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Domaines d'impact */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">Domaines de Transformation</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {impactAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors">
                <div className="text-blue-600 group-hover:text-amber-600">
                  {area.icon}
                </div>
              </div>
              <h4 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-amber-600 transition-colors">
                {area.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Graphique d'évolution */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-white mb-20">
        <h3 className="text-3xl font-bold text-center mb-12">Évolution 2020-2024</h3>
        <div className="space-y-8">
          {[
            { label: "Bénéficiaires", values: [400, 600, 800, 1200] },
            { label: "Projets", values: [8, 12, 18, 25] },
            { label: "Communautés", values: [10, 15, 20, 25] }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span>{item.label}</span>
                <span className="font-bold">{item.values[3]}</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                  style={{ width: `${(item.values[3] / 1500) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/60 mt-1">
                <span>2020: {item.values[0]}</span>
                <span>2024: {item.values[3]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Témoignages */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">Témoignages</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "Grâce à la fondation, j'ai retrouvé une raison de sourire chaque matin.",
              author: "Maman Rose",
              role: "72 ans, bénéficiaire"
            },
            {
              quote: "Les soins médicaux gratuits m'ont sauvé la vie. Je leur serai éternellement reconnaissant.",
              author: "Papa Jean",
              role: "68 ans, patient"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <p className="text-slate-700 text-lg italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
                <div>
                  <p className="font-bold text-blue-900">{testimonial.author}</p>
                  <p className="text-slate-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Contribuez à cet impact</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Chaque contribution, grande ou petite, nous aide à étendre notre impact 
          et à toucher plus de vies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/faire-un-don"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Contribuer maintenant
          </a>
          <a
            href="/projets"
            className="bg-white border-2 border-blue-900 hover:border-amber-500 text-blue-900 hover:text-amber-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Voir nos projets
          </a>
        </div>
      </div>
    </ModernPageTemplate>
  );
}