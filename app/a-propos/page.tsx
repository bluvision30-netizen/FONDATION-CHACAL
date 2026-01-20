import { Metadata } from 'next';
import { Users, Target, Heart, Award, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "À Propos - Fondation Chacal",
  description: "Découvrez notre histoire, notre équipe et notre vision",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Notre <span className="text-amber-400">Histoire</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Depuis 2010, nous nous engageons pour le bien-être et la dignité des seniors.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Qui sommes-nous ?</h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              La Fondation Chacal est une organisation à but non lucratif créée pour répondre 
              aux besoins spécifiques des personnes âgées vulnérables. Notre mission est de 
              garantir leur dignité, leur santé et leur bien-être social.
            </p>
            <p className="text-slate-700 text-lg leading-relaxed">
              À travers des programmes innovants et des partenariats stratégiques, nous 
              transformons la vie des seniors dans plus de 25 communautés à travers le Cameroun.
            </p>
          </div>
          <div className="bg-blue-50 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <Clock className="w-8 h-8 text-amber-500" />
              <div>
                <h3 className="text-xl font-bold text-blue-900">15 ans daction</h3>
                <p className="text-slate-600">Depuis notre création</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-amber-500" />
              <div>
                <h3 className="text-xl font-bold text-blue-900">250+ bénévoles</h3>
                <p className="text-slate-600">Engagés à nos côtés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="w-8 h-8" />, title: "Empathie", desc: "Écoute active et compréhension" },
              { icon: <Target className="w-8 h-8" />, title: "Excellence", desc: "Qualité dans chaque action" },
              { icon: <Award className="w-8 h-8" />, title: "Intégrité", desc: "Transparence et honnêteté" },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-blue-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Rejoignez notre mission</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ensemble, construisons un avenir meilleur pour nos aînés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faire-un-don"
              className="bg-white text-amber-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              Faire un don
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}