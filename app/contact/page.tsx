export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-blue-200">Nous sommes à votre écoute</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <p className="text-slate-700 mb-8">Page contact en construction...</p>
          <a href="/" className="text-blue-900 hover:text-amber-600">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}