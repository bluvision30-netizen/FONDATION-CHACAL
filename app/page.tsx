"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Heart, Users, Star, ArrowUpRight, CheckCircle2, 
  Menu, X, Play, Quote, Globe, HandHeart,
  ChevronDown, Target, TrendingUp, Calendar, 
  MapPin, Share2, Facebook, Twitter, Instagram, 
  Mail, Phone, ExternalLink, ArrowRight
} from 'lucide-react';

// --- ANIMATIONS VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const NAV_LINKS = [
  { 
    name: "La Fondation", 
    submenu: [
      { name: "Notre Histoire", href: "/notre-histoire" },
      { name: "Le Mot du Président", href: "/president" },
      { name: "Gouvernance", href: "/gouvernance" },
      { name: "Rapports Financiers", href: "/rapports" }
    ] 
  },
  { name: "Missions", href: "/missions" },
  { name: "Projets", href: "/projets" },
  { name: "Impact", href: "/impact" },
  { name: "Actualités", href: "/actualites" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Centre Chacal Horizon",
    status: "En cours",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000",
    collected: 32000,
    goal: 50000,
    desc: "Construction d'un centre de santé gériatrique à Bandja."
  },
  {
    id: 2,
    title: "Cantine Solidaire",
    status: "À venir",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
    collected: 4500,
    goal: 12000,
    desc: "Distribution de repas équilibrés pour les seniors isolés."
  }
];

const NEWS = [
  { date: "12 Jan 2026", title: "Inauguration du puits de Loum", cat: "Infrastructure" },
  { date: "05 Jan 2026", title: "Don de matériel médical", cat: "Santé" },
  { date: "28 Dec 2025", title: "Gala de charité annuel", cat: "Événement" }
];

export default function FondationChacalUnifie() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FCFAFA] text-[#1A1A1B] selection:bg-amber-200">
      
      {/* Barre de progression */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[110] origin-left" style={{ scaleX }} />

      {/* 1. NAVBAR DYNAMIQUE (Style premier hero) */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className={`text-xl font-bold tracking-tighter ${!isScrolled ? 'text-white' : 'text-blue-900'}`}>
              FONDATION <span className="text-amber-500 uppercase">Chacal</span>
            </span>
          </div>
          
          <div className={`hidden lg:flex items-center gap-10 font-medium text-sm uppercase tracking-widest ${!isScrolled ? 'text-white/90' : 'text-slate-600'}`}>
            {NAV_LINKS.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href || '#'} 
                  className="hover:text-amber-500 transition-colors flex items-center gap-1"
                >
                  {link.name} {link.submenu && <ChevronDown size={14} />}
                </a>
                <AnimatePresence>
  {link.submenu && activeDropdown === link.name && (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full left-0 mt-4 w-56 bg-white shadow-2xl rounded-2xl p-4 border border-slate-50"
    >
      {link.submenu.map((sub) => (
        <a 
          key={sub.name} // <-- CORRECTION ICI : Utilisez sub.name au lieu de sub
          href={sub.href} 
          className="block p-3 text-sm text-slate-500 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition-all"
        >
          {sub.name}
        </a>
      ))}
    </motion.div>
  )}
</AnimatePresence>
              </div>
            ))}
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full transition-transform active:scale-95 shadow-lg shadow-amber-500/20">
              Faire un Don
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Premier design conservé) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: yRange }} className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop" 
            className="w-full h-full object-cover scale-110"
            alt="Humanitarian Hero"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-black/40" />
        
        <div className="relative z-10 max-w-5xl text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-amber-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm"
          >
            Soutenir • Protéger • Élever
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif text-white leading-[1.1] mb-8"
          >
            Redonner le Sourire <br /> <span className="italic text-amber-100">à nos Sages.</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="group relative bg-white text-blue-900 px-10 py-5 rounded-full font-bold overflow-hidden transition-all">
              <span className="relative z-10 flex items-center gap-2">Rejoindre la Cause <ArrowUpRight size={20}/></span>
              <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="flex items-center gap-3 text-white border-b-2 border-white/30 pb-2 hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center"><Play size={18} fill="white"/></div>
              Voir notre film 2024
            </button>
          </motion.div>
        </div>
      </section>
{/* SECTION À PROPOS */}
<section id="apropos" className="py-32 px-6 max-w-7xl mx-auto">
  <div className="grid lg:grid-cols-2 gap-20 items-center">
    <div className="relative">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <img 
        src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000" 
        className="relative rounded-[3rem] shadow-2xl z-10 w-full h-[500px] object-cover"
        alt="Équipe Fondation Chacal" 
      />
      <div className="absolute -bottom-10 -right-10 bg-blue-900 text-white p-10 rounded-[2rem] shadow-2xl z-20 max-w-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">15+</p>
            <p className="text-sm text-white/70">Années d'expérience</p>
          </div>
        </div>
        <p className="text-lg font-serif italic">"Le respect de l'âge est le socle d'une nation forte."</p>
      </div>
    </div>
    
    <div>
      <span className="text-amber-600 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Notre Histoire</span>
      <h2 className="text-5xl font-serif text-blue-900 mb-8 leading-tight">
        Une mission ancrée dans le <span className="text-amber-700 italic">cœur.</span>
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed mb-8">
        Fondée en 2010 avec la vision d'un monde où chaque senior vit ses vieux jours dans la dignité, 
        la Fondation Chacal œuvre chaque jour sur le terrain pour transformer la vie des aînés vulnérables.
      </p>
      <div className="space-y-6 mb-10">
        {[
          { 
            title: "Notre Vision", 
            desc: "Un monde où chaque senior vit dans la dignité et le bien-être." 
          },
          { 
            title: "Notre Mission", 
            desc: "Soutenir, protéger et autonomiser les personnes âgées vulnérables." 
          },
          { 
            title: "Nos Valeurs", 
            desc: "Empathie, Respect, Intégrité et Innovation sociale." 
          }
        ].map((item, index) => (
          <div key={index} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-amber-600" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-lg mb-1">{item.title}</h4>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="group flex items-center gap-3 text-blue-900 font-bold hover:text-amber-600 transition-colors">
        <span>Lire notre histoire complète</span>
        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
      </button>
    </div>
  </div>
</section>
      {/* 3. CHAMPS D'ACTION (Premier design) */}
      <section id="missions" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <div>
            <h2 className="text-amber-600 font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <div className="w-10 h-[2px] bg-amber-600" /> Nos Champs d'action
            </h2>
            <p className="text-4xl md:text-5xl font-serif text-blue-900 leading-tight">
              Une approche holistique pour le <span className="text-amber-700">bien-être social.</span>
            </p>
          </div>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md">
            Inspirés par le modèle de la Fondation Coeur de Mère, nous agissons sur plusieurs piliers stratégiques pour transformer durablement la vie des seniors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Santé & Gériatrie", img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000", color: "bg-blue-50" },
            { title: "Insertion Sociale", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000", color: "bg-amber-50" },
            { title: "Agriculture Durable", img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000", color: "bg-emerald-50" }
          ].map((action, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img src={action.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity">Accompagnement personnalisé et suivi nutritionnel quotidien.</p>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <ArrowUpRight className="text-blue-900 group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SECTION RÉALISATIONS (Galerie du deuxième design adaptée) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-amber-600 font-black tracking-[0.2em] uppercase text-xs">Notre Impact Visuel</span>
            <h2 className="text-5xl md:text-6xl font-serif text-blue-950 mt-4 leading-[1.1]">
              Nos réalisations qui <span className="italic text-slate-400 font-light">changent des vies.</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 font-bold text-blue-900 group">
            Voir tout l'album <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
          <div className="md:col-span-8 relative rounded-[2.5rem] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs uppercase mb-4 inline-block">Décembre 2023</span>
              <h3 className="text-3xl font-bold">Inauguration du forage de Loum</h3>
            </div>
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="relative rounded-[2.5rem] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden group bg-amber-500 flex items-center justify-center p-10 text-center">
              <p className="text-2xl font-serif text-white italic">"Offrir de l'eau, c'est offrir la vie."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LE CENTRE MULTIFONCTIONNEL (Section Expert) */}
      <section id="projets" className="bg-blue-950 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" 
              className="rounded-[3rem] shadow-2xl border-4 border-white/10"
              alt="Center"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl max-w-[240px]">
              <p className="text-blue-900 font-bold text-lg leading-tight">Centre Chacal-Horizon</p>
              <p className="text-slate-500 text-sm mt-2 font-medium">Ouverture prévue : Septembre 2025 à Bandja.</p>
            </div>
          </motion.div>

          <div className="text-white">
            <h3 className="text-amber-500 font-bold tracking-widest mb-6">PROJET PHARE</h3>
            <h2 className="text-5xl font-serif mb-8 leading-tight">Un Centre <span className="italic text-amber-200">Multifonctionnel</span> d'Excellence.</h2>
            <div className="space-y-6">
              {[
                { t: "Formation & Mentorat", d: "Ateliers de transmission intergénérationnelle." },
                { t: "Pôle Médical", d: "Unité de gériatrie moderne et soins d'urgence." },
                { t: "Espace Coworking", d: "Soutien aux projets d'entreprenariat des familles." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                  <CheckCircle2 className="text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xl">{item.t}</h4>
                    <p className="text-white/60">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* SECTION PROJETS RÉALISÉS */}
<section className="py-32 px-6 max-w-7xl mx-auto">
  <div className="text-center mb-20">
    <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Notre Héritage</span>
    <h2 className="text-5xl font-serif text-blue-950 mt-6 mb-4">
      Projets <span className="text-amber-700">Réalisés</span>
    </h2>
    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
      Découvrez nos réalisations concrètes qui ont transformé la vie de centaines de bénéficiaires.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Projet 1 */}
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Puits de Loum"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
          Terminé
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <span className="text-white text-sm font-medium">Février 2023</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
          Puits Communautaire de Loum
        </h3>
        <p className="text-slate-500 mb-6">
          Construction d'un puits d'eau potable desservant 500 personnes dans le village de Loum.
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-400">Bénéficiaires</p>
            <p className="text-lg font-bold text-blue-900">500+</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Investissement</p>
            <p className="text-lg font-bold text-amber-600">25,000€</p>
          </div>
          <button className="text-blue-900 hover:text-amber-600 font-medium flex items-center gap-2">
            Détails <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>

    {/* Projet 2 */}
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Cantine Solidaire"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
          Terminé
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <span className="text-white text-sm font-medium">Novembre 2023</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
          Cantine Solidaire Phase 1
        </h3>
        <p className="text-slate-500 mb-6">
          Mise en place d'une cantine quotidienne pour 200 seniors isolés pendant 6 mois.
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-400">Repas servis</p>
            <p className="text-lg font-bold text-blue-900">36,000</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Investissement</p>
            <p className="text-lg font-bold text-amber-600">18,500€</p>
          </div>
          <button className="text-blue-900 hover:text-amber-600 font-medium flex items-center gap-2">
            Détails <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>

    {/* Projet 3 */}
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Ateliers Formation"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
          Terminé
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <span className="text-white text-sm font-medium">Août 2024</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
          Ateliers d'Artisanat Senior
        </h3>
        <p className="text-slate-500 mb-6">
          Formation de 150 seniors aux métiers de l'artisanat pour générer des revenus autonomes.
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-400">Participants</p>
            <p className="text-lg font-bold text-blue-900">150</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Investissement</p>
            <p className="text-lg font-bold text-amber-600">32,000€</p>
          </div>
          <button className="text-blue-900 hover:text-amber-600 font-medium flex items-center gap-2">
            Détails <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="text-center mt-16">
    <button className="group bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-amber-600 transition-all flex items-center gap-2 mx-auto">
      Voir tous les projets réalisés
      <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
    </button>
  </div>
</section>
      {/* 6. PROJETS EN COURS (Système de don amélioré) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950">Projets en cours & à venir</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {PROJECTS.map((project) => {
              const progress = (project.collected / project.goal) * 100;
              return (
                <motion.div 
                  key={project.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <img src={project.image} className="absolute inset-0 w-full h-full object-cover" />
                    <div className={`absolute top-6 left-6 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white ${project.status === 'En cours' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                      {project.status}
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-10 flex flex-col">
                    <h3 className="text-2xl font-bold text-blue-950 mb-4">{project.title}</h3>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">{project.desc}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                        <span className="text-slate-400">Collecté: <span className="text-blue-900">{project.collected}€</span></span>
                        <span className="text-slate-400">Objectif: <span className="text-amber-600">{project.goal}€</span></span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-900 to-amber-500"
                        />
                      </div>
                      
                      <div className="mt-8 flex items-center justify-between gap-4">
                        <button className="flex-1 bg-blue-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-800 transition shadow-lg shadow-blue-900/10">
                          Soutenir ce projet
                        </button>
                        <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-amber-50 hover:text-amber-600 transition">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SECTION ACTUALITÉS */}
      <section id="actualites" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="mb-8">
            <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Presse</span>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 mt-4">Dernières Actualités</h2>
          </div>
          <button className="font-bold text-blue-900 flex items-center gap-2">Voir tout le blog <ArrowRight size={18}/></button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {NEWS.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img src={`https://images.unsplash.com/photo-${1550000000000 + i * 5000}?q=80&w=600`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">{item.cat} — {item.date}</span>
              <h4 className="text-xl font-bold text-blue-950 mt-3 group-hover:text-amber-600 transition-colors">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>
{/* SECTION GALERIE MULTIMÉDIA */}
<section className="py-32 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-20">
      <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Mémoire Visuelle</span>
      <h2 className="text-5xl font-serif text-blue-950 mt-6 mb-4">
        Galerie <span className="text-amber-700">Photo & Vidéo</span>
      </h2>
      <p className="text-slate-500 max-w-2xl mx-auto text-lg">
        Captures d'instants de joie, de solidarité et de transformation.
      </p>
    </div>

    {/* Filtres */}
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {['Tous', 'Photos', 'Vidéos', 'Événements', 'Projets'].map((filter, i) => (
        <button 
          key={i}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            i === 0 
              ? 'bg-blue-900 text-white shadow-lg' 
              : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Grille Galerie */}
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Photo 1 (Grande) */}
      <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000" 
          className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Cérémonie d'inauguration"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-sm font-medium">PHOTO</span>
          </div>
          <h3 className="text-xl font-bold">Inauguration Centre Médical</h3>
          <p className="text-white/80 text-sm">Mai 2024</p>
        </div>
      </div>

      {/* Photo 2 */}
      <div className="relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000" 
          className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Distribution alimentaire"
        />
        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Photo 3 */}
      <div className="relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000" 
          className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Atelier de formation"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
      </div>

      {/* Vidéo */}
      <div className="relative rounded-3xl overflow-hidden group bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-amber-900/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Play className="text-white ml-1" size={28} fill="white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Documentaire 2024</h3>
          <p className="text-white/70 mb-6">Regardez notre film "Sourires Retrouvés"</p>
          <span className="text-amber-300 text-sm font-medium uppercase tracking-widest">VIDÉO</span>
        </div>
      </div>

      {/* Photo 4 */}
      <div className="relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w-1000" 
          className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Activités sociales"
        />
      </div>

      {/* Photo 5 */}
      <div className="relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000" 
          className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Visites à domicile"
        />
      </div>

      {/* Photo 6 */}
      <div className="relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1513483460609-1c8a505ea990?q=80&w=1000" 
          className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Jardin thérapeutique"
        />
      </div>

      {/* Photo 7 */}
      <div className="relative rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1000" 
          className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Célébration communautaire"
        />
      </div>
    </div>

    <div className="text-center mt-16">
      <button className="group bg-white border-2 border-slate-200 text-blue-900 px-10 py-4 rounded-full font-bold hover:border-amber-500 hover:text-amber-600 transition-all flex items-center gap-2 mx-auto">
        Voir toute la galerie
        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
      </button>
    </div>
  </div>
</section>
      {/* 8. TÉMOIGNAGES (UI Elégante du premier) */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Quote className="mx-auto text-amber-500 mb-8" size={60} />
          <h2 className="text-3xl md:text-5xl font-serif italic text-blue-900 leading-snug">
            "La Fondation Chacal ne se contente pas de donner des vivres, elle nous redonne une place dans la société. Je me sens à nouveau utile."
          </h2>
          <div className="mt-12 flex items-center justify-center gap-4">
            <img src="https://i.pravatar.cc/100?u=1" className="w-16 h-16 rounded-full border-4 border-amber-50" />
            <div className="text-left">
              <p className="font-bold text-blue-950 text-xl">Maman Pascaline</p>
              <p className="text-slate-400">Bénéficiaire, 72 ans</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. IMPACT & CHIFFRES */}
      <section id="impact" className="py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { n: "1.2k", label: "Aînés Soutenus" },
            { n: "15", label: "Projets Actifs" },
            { n: "85%", label: "Taux de Réussite" },
            { n: "50+", label: "Partenaires" }
          ].map((stat, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" variants={itemVariants}>
              <div className="text-5xl font-black text-blue-900 mb-2">{stat.n}</div>
              <div className="text-amber-600 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. SECTION S'ENGAGER (CTA Premium amélioré) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-blue-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
                Devenez un maillon de la <span className="text-amber-400 italic">solidarité.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Heart size={20}/>, t: "Devenir Bénévole", d: "Donnez de votre temps." },
                  { icon: <Target size={20}/>, t: "Partenariat", d: "Pour les entreprises." }
                ].map((box, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition cursor-pointer">
                    <div className="text-amber-400 mb-4">{box.icon}</div>
                    <h4 className="text-white font-bold mb-1">{box.t}</h4>
                    <p className="text-white/60 text-xs">{box.d}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-blue-950 mb-6">Don Rapide</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {['20€', '50€', '100€'].map(v => (
                  <button key={v} className="border-2 border-slate-100 py-3 rounded-xl font-bold hover:border-blue-900 hover:text-blue-900 transition">{v}</button>
                ))}
              </div>
              <input type="number" placeholder="Autre montant (€)" className="w-full bg-slate-50 border-none rounded-xl p-4 mb-6 focus:ring-2 ring-blue-900" />
              <button className="w-full bg-amber-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition">
                Confirmer le don
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer className="bg-slate-950 pt-24 pb-12 text-white/80">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">FONDATION <span className="text-amber-500">CHACAL</span></h2>
            <p className="max-w-sm text-lg leading-relaxed text-slate-400">
              Engagés pour l'autonomisation et le respect de la dignité humaine. Rejoignez-nous pour bâtir un futur inclusif.
            </p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#missions" className="hover:text-amber-500">Nos Missions</a></li>
              <li><a href="#projets" className="hover:text-amber-500">Nos Projets</a></li>
              <li><a href="#actualites" className="hover:text-amber-500">Actualités</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <div className="space-y-4 text-white/60 text-sm">
              <p className="flex items-center gap-3"><MapPin size={16} className="text-amber-500"/> Siège Social, Bandja, Cameroun</p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-amber-500"/> +237 600 000 000</p>
              <p className="flex items-center gap-3"><Mail size={16} className="text-amber-500"/> contact@fondationchacal.org</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-amber-500" />
              <button className="bg-amber-500 p-2 rounded-lg hover:bg-amber-600 transition"><ArrowUpRight/></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 text-center text-sm">
          © 2026 Fondation Chacal — Design by Expert Fullstack.
        </div>
      </footer>

    </div>
  );
}