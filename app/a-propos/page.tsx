import { Metadata } from 'next';
import ModernPageTemplate from '@/components/templates/ModernPageTemplate';
import { Users, Target, Heart, Award, Clock, Globe, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: "À Propos - Fondation Chacal",
  description: "Découvrez notre histoire, notre équipe et notre vision pour le bien-être des seniors.",
};

export default function AboutPage() {
  const sections = [
    {
      id: 'histoire',
      title: 'Notre Histoire',
      content: 'Fondée en 2010, la Fondation Chacal est née d\'un constat simple : les personnes âgées sont souvent les grandes oubliées des programmes de développement. Depuis, nous avons transformé la vie de milliers de seniors à travers le Cameroun.',
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      id: 'equipe',
      title: 'Notre Équipe',
      content: 'Une équipe de 50 professionnels dévoués et plus de 200 bénévoles passionnés travaillent chaque jour pour améliorer les conditions de vie des seniors. Notre équipe pluridisciplinaire comprend des médecins, travailleurs sociaux, et experts en développement.',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 'gouvernance',
      title: 'Gouvernance',
      content: 'Nous fonctionnons avec une gouvernance transparente et participative. Notre conseil d\'administration est composé d\'experts reconnus dans les domaines de la santé, du social et du développement durable.',
      icon: <Award className="w-8 h-8" />
    }
  ];

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: "Empathie", desc: "Écoute active et compréhension" },
    { icon: <Target className="w-6 h-6" />, title: "Excellence", desc: "Qualité dans chaque action" },
    { icon: <Users className="w-6 h-6" />, title: "Solidarité", desc: "Ensemble, nous sommes plus forts" },
    { icon: <Globe className="w-6 h-6" />, title: "Durabilité", desc: "Impact à long terme" }
  ];

  return (
    <ModernPageTemplate
      heroTitle="À Propos de Nous"
      heroSubtitle="Notre Histoire"
      heroDescription="Depuis 2010, nous nous engageons pour le bien-être et la dignité des seniors."
      heroImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000"
    >
      {/* Introduction */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-6 py-2 rounded-full font-bold mb-6">
          <Clock className="w-5 h-5" />
          15 ans d'engagement
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-8">
          Une mission ancrée dans le <span className="text-amber-600">cœur</span>
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Nous croyons en un monde où chaque senior peut vieillir dans la dignité, 
          entouré de soins adaptés et intégré à sa communauté.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-16 mb-20">
        {sections.map((section, index) => (
          <div key={section.id} id={section.id} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <div className="text-amber-600">
                  {section.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-blue-900">{section.title}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <p className="text-slate-700 text-lg leading-relaxed">{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Valeurs */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">Nos Valeurs Fondamentales</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors">
                <div className="text-blue-600 group-hover:text-amber-600">
                  {value.icon}
                </div>
              </div>
              <h4 className="font-bold text-lg text-blue-900 mb-2">{value.title}</h4>
              <p className="text-slate-600 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-12 text-white text-center mb-20 shadow-2xl">
        <h3 className="text-3xl font-bold mb-12">Notre Impact en Chiffres</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "1,200+", label: "Seniors accompagnés" },
            { value: "50+", label: "Professionnels" },
            { value: "25", label: "Communautés" },
            { value: "15", label: "Années d'action" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-blue-50 rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Rejoignez notre mission</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Ensemble, construisons un avenir meilleur pour nos aînés.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/faire-un-don"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            Faire un don
          </a>
          <a
            href="/contact"
            className="bg-white border-2 border-blue-900 hover:border-amber-500 text-blue-900 hover:text-amber-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </ModernPageTemplate>
  );
}