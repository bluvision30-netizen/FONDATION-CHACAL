"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { History, Target, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotreHistoire() {
  return (
    <div className="min-h-screen bg-[#FCFAFA] selection:bg-amber-200">
      {/* Header Minimaliste */}
      <nav className="p-6">
        <Link href="/" className="flex items-center gap-2 text-blue-900 font-bold hover:text-amber-600 transition-colors">
          <ArrowLeft size={20} /> Retour à l'accueil
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-4 block">Notre Héritage</span>
          <h1 className="text-5xl md:text-7xl font-serif text-blue-900 mb-10 leading-tight">
            Une Histoire de <br /> <span className="italic text-amber-700">Dignité.</span>
          </h1>
          
          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Histoire"
            />
          </div>

          <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
            <p className="font-serif italic text-2xl text-blue-950">
              "La Fondation Chacal est née d'un constat simple : la sagesse de nos aînés est le plus grand trésor du Cameroun, mais c'est aussi le plus fragile."
            </p>
            <p>
              Depuis notre création à Bandja, nous avons compris que l'aide ponctuelle ne suffisait pas. Il fallait construire un écosystème où la personne âgée retrouve sa place de pilier au sein de la famille et de la société.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-10">
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <Target className="text-amber-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-blue-900 mb-2">Notre Vision</h3>
                <p className="text-sm">Devenir la référence continentale en matière de prise en charge gériatrique communautaire.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <Eye className="text-amber-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-blue-900 mb-2">Nos Valeurs</h3>
                <p className="text-sm">Intégrité, Respect intergénérationnel et Innovation sociale durable.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}