"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Heart, Users, Star, ArrowUpRight, CheckCircle2, 
  Menu, X, Play, Quote, Globe,
  ChevronDown, Target, TrendingUp, Calendar, 
  MapPin, Share2, Facebook, Twitter, Instagram, 
  Mail, Phone, ExternalLink, ArrowRight
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2, 
      delayChildren: 0.3 
    } as const
  }
} as const;

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const NAV_LINKS = [
  { name: "Foundation", href: "#preface" },
  { name: "Mission", href: "#mission" },
  { name: "Values", href: "#values" },
  { name: "Founders", href: "#equipe" },
  { name: "Gallery", href: "#galerie" },
  { name: "Impact", href: "#impact" },
  { name: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    id: "1",
    title: "Free Medical Consultations",
    status: "Upcoming",
    image: "https://res.cloudinary.com/dkuciagop/image/upload/v1769027102/WhatsApp_Image_2026-01-20_at_13.21.35_s6m8at.jpg",
    collected: 8500,
    goal: 15000,
    desc: "Day of free medical consultations on May 23, 2026 at École Publique Newbell Bamiléké, Douala."
  },
  {
    id: "2",
    title: "Material Donations for Seniors",
    status: "Ongoing",
    image: "https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.33_fmzfs6.jpg",
    collected: 4500,
    goal: 10000,
    desc: "Distribution of care kits and material assistance to vulnerable elderly people in Douala."
  }
];

const NEWS = [
  { date: "24 Dec 2025", title: "Announcement of the 2nd edition of free consultations", cat: "Health" },
  { date: "15 Dec 2025", title: "Partnership with volunteer physicians", cat: "Partnership" },
  { date: "10 Dec 2025", title: "Preparation for the May 23, 2026 event", cat: "Event" }
];

export default function FondationChacalUnifie() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ nom: '', email: '', phone: '', message: '' });
  
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!href || href === '#') return;
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New volunteer request:%0A%0AName: ${formData.nom}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/23797069267?text=${message}`, '_blank');
    setShowFormModal(false);
    setFormData({ nom: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-[#FCFAFA] text-[#1A1A1B] selection:bg-amber-200">
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[110] origin-left" style={{ scaleX }} />

      {/* 1. NAVBAR */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl py-3 shadow-md' : 'bg-white/10 backdrop-blur-md py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Chacal Foundation Logo"
              className="h-10 w-auto object-contain"
            />
            <span className={`text-base sm:text-xl font-bold tracking-tighter ${!isScrolled ? 'text-white' : 'text-blue-900'}`}>
              <span className="text-amber-500 uppercase">CHACAL</span> FOUNDATION
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center gap-5 xl:gap-8 font-medium text-sm uppercase tracking-widest ${!isScrolled ? 'text-white/90' : 'text-slate-600'}`}>
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="hover:text-amber-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#dons">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 xl:px-8 py-3 rounded-full transition-transform active:scale-95 shadow-lg shadow-amber-500/20 text-sm">
                Donate
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors z-[110]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={!isScrolled ? 'text-white' : 'text-blue-900'} size={24} />
            ) : (
              <Menu className={!isScrolled ? 'text-white' : 'text-blue-900'} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden fixed top-[68px] left-0 right-0 bg-white shadow-2xl overflow-hidden z-[90]"
            >
              <div className="max-h-[calc(100vh-68px)] overflow-y-auto">
                <div className="px-4 sm:px-6 py-6 space-y-2">
                  {NAV_LINKS.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavClick(link.href);
                      }}
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                
                <div className="px-4 sm:px-6 py-4 border-t border-slate-200">
                  <button 
                    onClick={() => handleMobileNavClick('#dons')}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
                  >
                    Donate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-blue-950">
        <motion.div style={{ y: yRange }} className="absolute inset-0 opacity-50">
          <img 
            src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027105/WhatsApp_Image_2026-01-20_at_13.21.36_dhnrxw.jpg" 
            className="w-full h-full object-cover scale-110"
            alt="Humanitarian Hero"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent" />
        
        <div className="relative z-10 max-w-5xl text-center px-6 mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-amber-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm"
          >
            Solidarity • Health • Dignity
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-6"
          >
            Health & Dignity <br /> <span className="italic text-amber-200">for our Elders.</span>
          </motion.h1>
          {/* SLOGAN */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl md:text-2xl text-amber-200 italic font-serif mb-10 tracking-wide"
          >
            "Just one gesture of love is enough for them."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button 
              onClick={() => setShowFormModal(true)}
              className="group relative bg-white text-blue-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">Join the Cause <ArrowUpRight size={20}/></span>
              <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-3 text-white border-b-2 border-white/30 pb-2 hover:border-amber-400 transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center"><Play size={18} fill="white"/></div>
              Watch our 2025 action
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── PREFACE SECTION - LIGHT MINIMAL DESIGN ─────────────────────────────────────────────── */}
      <section id="preface" className="py-32 bg-white text-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs"
            >
              Who We Are
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mt-4 mb-4 leading-tight text-slate-800"
            >
              Our <span className="text-slate-400 italic">Preface</span>
            </motion.h2>
            <div className="w-24 h-px bg-slate-300 mx-auto mt-4" />
          </div>

          {/* Minimal Layout with Image */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-slate-600">
                  In a world where inequalities in access to healthcare, essential resources, and human dignity continue to persist, <strong className="text-slate-800">Chacal Foundation</strong> stands as a committed force dedicated to serving the most vulnerable populations.
                </p>
                <p className="text-lg leading-relaxed text-slate-500">
                  As a non-profit organization, Chacal Foundation operates primarily in underprivileged regions of Africa, with a particular focus on the elderly — individuals who are often overlooked, isolated, and faced with significant challenges related to health, mobility, and living conditions.
                </p>
                <div className="pt-6">
                  <div className="w-16 h-px bg-slate-300 mb-6" />
                  <p className="text-slate-400 italic text-lg">
                    "Serving with dignity, acting with compassion."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://res.cloudinary.com/dkuciagop/image/upload/v1775667520/1_13_yxzht4.jpg"
                    alt="Helping elderly people"
                    className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-slate-100 rounded-2xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MISSION SECTION - SPLIT WITH IMAGE ──────────────────────────────────────── */}
      <section id="mission" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://res.cloudinary.com/dkuciagop/image/upload/v1775667782/1_11_o8jwtb.jpg"
                  alt="Medical consultation"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-slate-200 rounded-full -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">Our Purpose</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 leading-tight">
                Our <span className="text-slate-400 italic">Mission</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our mission is to provide practical and immediate support to communities in need, with special attention to the well-being of older adults.
              </p>
              
              <div className="space-y-3 mt-6">
                {[
                  "Free medical consultation campaigns",
                  "Distribution of essential medications",
                  "Provision of medical equipment (wheelchairs, walking canes, knee supports…)",
                  "Food assistance for the most disadvantaged populations"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-slate-500 italic border-l-2 border-slate-300 pl-4 mt-6">
                We act with compassion to restore dignity, independence, and comfort to those who need it most.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VISION SECTION ────────────────────────────────────────── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">Our Aspiration</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 leading-tight mt-2 mb-6">
                Our <span className="text-slate-400 italic">Vision</span>
              </h2>
              <div className="space-y-6">
                <p className="text-slate-600 text-lg leading-relaxed">
                  We envision a world where every elderly person can age with dignity, surrounded by care, respect, and support.
                </p>
                <div className="bg-slate-50 p-8 rounded-2xl">
                  <p className="text-slate-600 text-lg leading-relaxed italic">
                    "A world where the value and wisdom of older generations are recognized and protected — a more compassionate and united society."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <Globe className="text-slate-400" size={40} />
                  <div>
                    <p className="font-medium text-slate-800">Global Impact</p>
                    <p className="text-slate-400 text-sm">Creating change across communities worldwide</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://res.cloudinary.com/dkuciagop/image/upload/v1775667848/1_3_jjh06k.jpg"
                  alt="Elderly person smiling"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VALUES SECTION - VERTICAL TIMELINE STYLE (NO CARDS) ────────────────────────────────── */}
      <section id="values" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">Our Principles</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">
              What We Stand <span className="text-slate-400 italic">For</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Core values that guide every action we take</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-slate-300 hidden lg:block" />
            
            <div className="space-y-24">
              {[
                { 
                  title: "Humanity", 
                  desc: "Placing people — especially the elderly — at the heart of everything we do.",
                  image: "https://res.cloudinary.com/dkuciagop/image/upload/v1775667848/1_3_jjh06k.jpg",
                  align: "left"
                },
                { 
                  title: "Solidarity", 
                  desc: "Working together to uplift the most vulnerable in our communities.",
                  image: "https://res.cloudinary.com/dkuciagop/image/upload/v1775668010/1_8_t3eeus.jpg",
                  align: "right"
                },
                { 
                  title: "Integrity", 
                  desc: "Acting with transparency and strong ethical principles at all times.",
                  image: "https://res.cloudinary.com/dkuciagop/image/upload/v1775668037/1_10_tttlfr.jpg",
                  align: "left"
                },
                { 
                  title: "Respect", 
                  desc: "Honoring the dignity and life experience of every individual we serve.",
                  image: "https://res.cloudinary.com/dkuciagop/image/upload/v1775667782/1_11_o8jwtb.jpg",
                  align: "right"
                },
                { 
                  title: "Commitment", 
                  desc: "Serving with dedication and consistency to create lasting change.",
                  image: "https://res.cloudinary.com/dkuciagop/image/upload/v1775668157/1_12_w5onyo.jpg",
                  align: "left"
                }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    value.align === "right" ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={value.image} 
                        alt={value.title}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-block w-12 h-px bg-slate-300 mb-4 hidden lg:block" />
                    <h3 className="text-3xl font-serif text-slate-800 mb-3">{value.title}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── OBJECTIVES SECTION ──────────────────────────────────────────── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://res.cloudinary.com/dkuciagop/image/upload/v1775668183/1_14_ayvp9g.jpg"
                alt="Objectives"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">Our Goals</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-2 mb-8">
                Our <span className="text-slate-400 italic">Objectives</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Improve access to healthcare for elderly individuals in underserved areas",
                  "Reduce isolation and vulnerability among older adults",
                  "Promote independence through access to appropriate medical equipment",
                  "Combat food insecurity in vulnerable communities",
                  "Develop sustainable initiatives with local and international partners"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-100">
                    <span className="text-slate-400 font-serif text-xl">{String(i + 1).padStart(2, '0')}.</span>
                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COMMITMENT BANNER ──────────────────────────────────── */}
      <section className="py-24 bg-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-4xl md:text-5xl font-serif font-light">Our Commitment</h3>
            <div className="w-16 h-px bg-slate-500 mx-auto" />
            <p className="text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto">
              Through every action we take, we are committed to compassion, responsibility, and meaningful impact. We firmly believe that caring for our elders is a reflection of our shared humanity.
            </p>
            <p className="text-slate-400 text-lg italic max-w-2xl mx-auto">
              Chacal Foundation is more than an organization — it is a movement of compassion, a commitment to dignity, and a promise of hope.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── STORY BEHIND THE CREATION - SMOOTH DESIGN ───────────────────────────────────── */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs">The Origin</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4 leading-tight">
              The Story Behind<br /><span className="text-slate-400 italic">Chacal Foundation</span>
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027106/WhatsApp_Image_2026-01-20_at_13.21.42_hru7cx.jpg"
                  className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt="Foundation founders"
                />
              </div>
              <div className="mt-6 text-center lg:text-left">
                <p className="text-slate-500 text-sm tracking-wide">New York → Maryland, United States</p>
                <p className="text-slate-400 text-xs mt-1">A Dream Born in Exile</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <p className="text-slate-600 leading-relaxed text-lg">
                While living in exile in the United States, <strong className="text-slate-800">Rodrigue Wako</strong> never forgot his deep dream of creating a foundation dedicated to helping the elderly. Despite the distance from his homeland, this vision remained alive within him — shaped by his values, life experiences, and strong connection to his roots.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                It was during a return trip from New York to Maryland that Rodrigue shared this vision with <strong className="text-slate-800">Rosine Kwedi</strong>. He opened up about a dream he had carried for years: to support elderly individuals who are often forgotten later in life, despite the sacrifices they made for younger generations.
              </p>
              <blockquote className="border-l-2 border-slate-300 pl-6 italic text-slate-500 text-lg">
                "Although they did not have all the necessary resources at the beginning, they chose to move forward, firmly believing that every action, no matter how small, has value."
              </blockquote>
              <p className="text-slate-600 leading-relaxed text-lg">
                Moved by the sincerity and humanity of this vision, Rosine immediately embraced the idea. Very quickly, they found themselves united by a shared conviction — to take action without waiting for perfect conditions.
              </p>
              <div className="pt-4">
                <div className="inline-block px-4 py-2 bg-slate-100 rounded-full">
                  <p className="text-slate-600 text-sm">
                    <strong className="text-slate-800">Founded in 2023</strong> — Serving elderly individuals locally and internationally
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CO-FOUNDER BIOGRAPHIES WITH SOCIAL LINKS ───────────────────────────────── */}
      <section id="equipe" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs">Leadership</span>
            <h2 className="text-5xl md:text-6xl font-serif text-slate-800 mt-4 mb-2">
              Our <span className="text-slate-400 italic">Founders</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">Driven by compassion, united by a shared vision of dignity for the elderly.</p>
            <div className="w-16 h-px bg-slate-300 mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Rodrigue Wako */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dkuciagop/image/upload/v1775127589/148982837_2819608858258248_7016194942654782949_n_galsoj.jpg"
                  className="w-full h-full object-cover"
                  alt="Rodrigue Wako"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block px-3 py-1 bg-slate-700/80 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                    Co-Founder
                  </div>
                  <h3 className="text-3xl font-serif font-light">Rodrigue Wako</h3>
                  <p className="text-white/80 text-sm mt-1">Born February 18, 1980 — Douala, Cameroon</p>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Rodrigue Wako is the visionary behind the creation of Chacal Foundation. Originally from the Western region of Cameroon, he grew up with strong cultural values rooted in respect, resilience, and community.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  His career as a football player led him to travel extensively across Cameroon, witnessing firsthand the struggles faced by the most vulnerable. At 30, driven by the pursuit of a better future, he made the difficult decision to leave his home country.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  In <strong className="text-slate-800">2023</strong>, he officially founded Chacal Foundation, seeking to restore dignity and provide essential care to aging populations.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Rosine Kwedi */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dkuciagop/image/upload/v1775667520/1_13_yxzht4.jpg"
                  className="w-full h-full object-cover"
                  alt="Rosine Kwedi"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block px-3 py-1 bg-slate-700/80 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                    Co-Founder
                  </div>
                  <h3 className="text-3xl font-serif font-light">Rosine Kwedi</h3>
                  <p className="text-white/80 text-sm mt-1">Born August 9, 1987 — Douala, Cameroon</p>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Rosine Kwedi is a co-founder of Chacal Foundation. Her background from the Sanaga-Maritime region and Nkam department has deeply shaped her values, identity, and strong sense of community.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  She earned her degree in physiotherapy and worked for several years at the military garrison in Douala, Bonanjo. She eventually relocated to the United States to further her education and expand her expertise in the medical field.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  She is currently pursuing advanced studies with the goal of obtaining a <strong className="text-slate-800">doctorate in Occupational Therapy</strong> — improving the quality of life of vulnerable populations, especially the elderly.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FIELDS OF ACTION */}
      <section id="missions" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <div>
            <h2 className="text-amber-600 font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <div className="w-10 h-[2px] bg-amber-600" /> Our Fields of Action
            </h2>
            <p className="text-4xl md:text-5xl font-serif text-blue-900 leading-tight">
              A holistic approach to <span className="text-amber-700">senior well-being.</span>
            </p>
          </div>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md">
            Driven by a son of the land, our foundation carries out concrete health and solidarity actions 
            for the most vulnerable elderly people in Cameroon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Medical Consultations", img: "https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.38_b6wev3.jpg" },
            { title: "Prevention & Advice", img: "https://res.cloudinary.com/dkuciagop/image/upload/v1769027105/WhatsApp_Image_2026-01-20_at_13.21.41_xop86n.jpg" },
            { title: "Material Support", img: "https://res.cloudinary.com/dkuciagop/image/upload/v1769027102/WhatsApp_Image_2026-01-20_at_13.21.35_s6m8at.jpg" }
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
                <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  {i === 0 && "General and specialized consultations by volunteer physicians."}
                  {i === 1 && "Practical advice on prevention and care adapted to seniors."}
                  {i === 2 && "Distribution of kits and personalized accompaniment."}
                </p>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <ArrowUpRight className="text-blue-900 group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. VISUAL IMPACT SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-amber-600 font-black tracking-[0.2em] uppercase text-xs">Our Visual Impact</span>
            <h2 className="text-5xl md:text-6xl font-serif text-blue-950 mt-4 leading-[1.1]">
              Our actions that <span className="italic text-slate-400 font-light">change lives.</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 font-bold text-blue-900 group">
            View full album <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
          <div className="md:col-span-8 relative rounded-[2.5rem] overflow-hidden group">
            <img src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027105/WhatsApp_Image_2026-01-20_at_13.21.37_syduvr.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs uppercase mb-4 inline-block">May 2025</span>
              <h3 className="text-3xl font-bold">Free medical consultations in Douala</h3>
            </div>
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="relative rounded-[2.5rem] overflow-hidden group">
              <img src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027105/WhatsApp_Image_2026-01-20_at_13.21.36_dhnrxw.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden group bg-amber-500 flex items-center justify-center p-10 text-center">
              <p className="text-2xl font-serif text-white italic">"Just one gesture of love is enough for them."</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMPLETED PROJECTS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Our Legacy</span>
          <h2 className="text-5xl font-serif text-blue-950 mt-6 mb-4">
            Completed <span className="text-amber-700">Actions</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Discover our concrete achievements that have transformed the lives of hundreds of beneficiaries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Consultations 2025"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Completed
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white text-sm font-medium">May 2025</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
                1st Edition Free Consultations
              </h3>
              <p className="text-slate-500 mb-6">
                First free medical consultation campaign for 200+ seniors in Douala.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400">Beneficiaries</p>
                  <p className="text-lg font-bold text-blue-900">200+</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Consultations</p>
                  <p className="text-lg font-bold text-amber-600">250+</p>
                </div>
                <button className="text-blue-900 hover:text-amber-600 font-medium flex items-center gap-2">
                  Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027105/WhatsApp_Image_2026-01-20_at_13.21.39_ri3mn4.jpg" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Material donations"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Completed
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white text-sm font-medium">June 2025</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
                Care Kit Distribution
              </h3>
              <p className="text-slate-500 mb-6">
                Distribution of first aid kits and essential medications to vulnerable seniors.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400">Kits distributed</p>
                  <p className="text-lg font-bold text-blue-900">150</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Investment</p>
                  <p className="text-lg font-bold text-amber-600">5,500€</p>
                </div>
                <button className="text-blue-900 hover:text-amber-600 font-medium flex items-center gap-2">
                  Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027102/WhatsApp_Image_2026-01-20_at_13.21.35_s6m8at.jpg" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Health awareness"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Completed
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white text-sm font-medium">July 2025</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-amber-600 transition-colors">
                Health Prevention Workshops
              </h3>
              <p className="text-slate-500 mb-6">
                Awareness sessions on hygiene, nutrition, and appropriate care for seniors.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400">Participants</p>
                  <p className="text-lg font-bold text-blue-900">120</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Sessions</p>
                  <p className="text-lg font-bold text-amber-600">8</p>
                </div>
                <button className="text-blue-900 hover:text-amber-600 font-medium flex items-center gap-2">
                  Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="group bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-amber-600 transition-all flex items-center gap-2 mx-auto">
            View all our completed actions
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </div>
      </section>

      {/* 6. ONGOING PROJECTS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950">Ongoing & Upcoming Projects</h2>
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
                    <div className={`absolute top-6 left-6 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white ${project.status === 'Ongoing' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                      {project.status}
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-10 flex flex-col">
                    <h3 className="text-2xl font-bold text-blue-950 mb-4">{project.title}</h3>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">{project.desc}</p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                        <span className="text-slate-400">Raised: <span className="text-blue-900">{project.collected}€</span></span>
                        <span className="text-slate-400">Goal: <span className="text-amber-600">{project.goal}€</span></span>
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
                        <Link href={`/projets/${project.id}`} className="flex-1">
                          <button className="w-full bg-blue-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-amber-500 transition shadow-lg shadow-blue-900/10">
                            Support this project →
                          </button>
                        </Link>
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

      {/* 7. NEWS */}
      <section id="actualites" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="mb-8">
            <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Press</span>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 mt-4">Latest News</h2>
          </div>
          <button className="font-bold text-blue-900 flex items-center gap-2">View all <ArrowRight size={18}/></button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {NEWS.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img src={`https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.33_fmzfs6.jpg`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">{item.cat} — {item.date}</span>
              <h4 className="text-xl font-bold text-blue-950 mt-3 group-hover:text-amber-600 transition-colors">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="galerie" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Visual Memory</span>
            <h2 className="text-5xl font-serif text-blue-950 mt-6 mb-4">
              Photo & Video <span className="text-amber-700">Gallery</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Captured moments of joy, solidarity, and transformation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Photos', 'Videos', 'Events', 'Projects'].map((filter, i) => (
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

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group">
              <img 
                src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027105/WhatsApp_Image_2026-01-20_at_13.21.41_xop86n.jpg" 
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Medical consultation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm font-medium">PHOTO</span>
                </div>
                <h3 className="text-xl font-bold">Free Medical Consultations</h3>
                <p className="text-white/80 text-sm">May 2025</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group">
              <img 
                src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027106/WhatsApp_Image_2026-01-20_at_13.21.43_xktlqo.jpg" 
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Medication distribution"
              />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="relative rounded-3xl overflow-hidden group">
              <img 
                src="https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.34_ngrlue.jpg" 
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Donation distribution"
              />
              <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-transparent transition-colors" />
            </div>

            {[
              "https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.33_fmzfs6.jpg",
              "https://res.cloudinary.com/dkuciagop/image/upload/v1769027104/WhatsApp_Image_2026-01-20_at_13.21.38_b6wev3.jpg",
              "https://res.cloudinary.com/dkuciagop/image/upload/v1769027102/WhatsApp_Image_2026-01-20_at_13.21.35_s6m8at.jpg",
              "https://res.cloudinary.com/dkuciagop/image/upload/v1769027106/WhatsApp_Image_2026-01-20_at_13.21.42_hru7cx.jpg",
            ].map((src, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden group">
                <img 
                  src={src} 
                  className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={`Gallery ${i + 1}`}
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="group bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-amber-600 transition-all flex items-center gap-2 mx-auto">
              View full gallery
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="py-24 px-6 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold tracking-[0.4em] uppercase text-xs">Our Impact</span>
            <h2 className="text-5xl font-serif mt-4">Numbers that <span className="text-amber-400 italic">speak.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "500+", label: "Beneficiaries" },
              { n: "2", label: "Annual Editions" },
              { n: "200+", label: "Consultations" },
              { n: "2023", label: "Founded" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-[2rem] bg-white/5 border border-white/10"
              >
                <p className="text-5xl font-serif font-bold text-amber-400 mb-2">{stat.n}</p>
                <p className="text-white/60 uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATIONS */}
      <section id="dons" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">Support Us</span>
              <h2 className="text-5xl font-serif text-blue-950 mt-4 mb-6 leading-tight">
                Support our <span className="text-amber-600 italic">mission</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Every donation, however small, allows us to reach more seniors in need. Your generosity directly funds free medical consultations, medications, and essential equipment.
              </p>
              <blockquote className="border-l-4 border-amber-500 pl-6 italic text-blue-900 text-xl">
                "Just one gesture of love is enough for them."
              </blockquote>
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
              <h3 className="text-2xl font-bold text-blue-950 mb-8">Make a Donation</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <p className="text-sm text-slate-500 mb-2 font-medium">Bank Transfer</p>
                  <p className="font-bold text-blue-900">Chacal Foundation</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-slate-600 font-mono text-sm">XXXX XXXX XXXX XXXX</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText('XXXX XXXX XXXX XXXX');
                        alert('Copied!');
                      }}
                      className="text-blue-900 hover:text-amber-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <a 
                  href="https://wa.me/23797069267?text=Hello,%20I%20would%20like%20to%20make%20a%20donation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#25D366] text-white rounded-2xl p-5 hover:bg-[#20BA5A] transition-all transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span className="font-bold">WhatsApp</span>
                    </div>
                    <ArrowRight size={18} />
                  </div>
                </a>

                <a 
                  href="mailto:chacalfoundation@gmail.com?subject=Donation"
                  className="block bg-slate-50 text-blue-950 rounded-2xl p-5 hover:bg-slate-100 transition-all transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail size={20} />
                      <span className="font-bold">Email</span>
                    </div>
                    <ArrowRight size={18} />
                  </div>
                </a>
              </div>

              <p className="text-xs text-slate-500 text-center mt-5">
                Every donation counts for our mission
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-4">Contact <span className="text-amber-500 italic">Us</span></h2>
          <p className="text-slate-600 mb-10">A question, a partnership, an initiative? Write to us.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <a href="tel:+13019929492" className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center"><Phone size={20} className="text-white"/></div>
              <span className="font-bold text-blue-900">Phone US</span>
              <span className="text-sm text-slate-500">+1 301-992-9492</span>
            </a>
            <a href="tel:+23797069267" className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center"><Phone size={20} className="text-white"/></div>
              <span className="font-bold text-blue-900">Phone Cameroon</span>
              <span className="text-sm text-slate-500">+237 97069267</span>
            </a>
            <a href="mailto:chacalfoundation@gmail.com" className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center"><Mail size={20} className="text-white"/></div>
              <span className="font-bold text-blue-900">Email</span>
              <span className="text-sm text-slate-500">chacalfoundation@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-950 pt-16 md:pt-24 pb-8 md:pb-12 text-white/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <img src="/logo.png" alt="Chacal Foundation Logo" className="h-10 w-auto object-contain opacity-90" />
                <h2 className="text-xl font-bold text-white">
                  <span className="text-amber-500">CHACAL</span> FOUNDATION
                </h2>
              </div>
              <p className="max-w-sm text-base md:text-lg leading-relaxed text-slate-400 mb-4">
                Committed to health and dignity for the elderly in Cameroon and beyond.
              </p>
              <p className="text-amber-400 italic text-sm mb-6">"Just one gesture of love is enough for them."</p>
              <div className="flex gap-3 md:gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-widest text-xs md:text-sm">Navigation</h4>
              <ul className="space-y-3 md:space-y-4">
                <li><a href="#preface" className="text-sm md:text-base hover:text-amber-500 transition-colors">Preface</a></li>
                <li><a href="#mission" className="text-sm md:text-base hover:text-amber-500 transition-colors">Our Mission</a></li>
                <li><a href="#values" className="text-sm md:text-base hover:text-amber-500 transition-colors">Our Values</a></li>
                <li><a href="#equipe" className="text-sm md:text-base hover:text-amber-500 transition-colors">Our Team</a></li>
                <li><a href="#galerie" className="text-sm md:text-base hover:text-amber-500 transition-colors">Gallery</a></li>
                <li><a href="#impact" className="text-sm md:text-base hover:text-amber-500 transition-colors">Our Impact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-widest text-xs md:text-sm">Contact</h4>
              <div className="space-y-3 md:space-y-4 text-white/60 text-sm md:text-base">
                <p className="flex items-start gap-3">
                  <MapPin size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                  <span>Douala, Cameroon</span>
                </p>
                <p className="flex items-start gap-3">
                  <Phone size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                  <a href="tel:+13019929492" className="hover:text-amber-500 transition-colors">+1 301-992-9492</a>
                </p>
                <p className="flex items-start gap-3">
                  <Phone size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                  <a href="tel:+12024769754" className="hover:text-amber-500 transition-colors">+1 202 476 9754</a>
                </p>
                <p className="flex items-start gap-3">
                  <Phone size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                  <a href="tel:+23797069267" className="hover:text-amber-500 transition-colors">+237 97069267</a>
                </p>
                <p className="flex items-start gap-3">
                  <Mail size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                  <a href="mailto:chacalfoundation@gmail.com" className="hover:text-amber-500 transition-colors break-all">
                    chacalfoundation@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-widest text-xs md:text-sm">Newsletter</h4>
              <p className="text-sm text-white/60 mb-4">Stay informed about our actions</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-amber-500 transition-colors"
                />
                <button className="bg-amber-500 p-2.5 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 md:pt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-center md:text-left">
              <p className="text-white/60">
                © 2026 CHACAL FOUNDATION • Based in the United States • Serving Cameroon & Africa
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <a href="#" className="text-white/60 hover:text-amber-500 transition-colors">Legal Notice</a>
                <span className="text-white/20">•</span>
                <a href="#" className="text-white/60 hover:text-amber-500 transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
            className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
              >
                <X className="text-white" size={20} />
              </button>
              <video controls autoPlay className="w-full h-full">
                <source src="https://res.cloudinary.com/dkuciagop/video/upload/v1770902335/FONDATION_LE_CHACAL_VF_pi78sc.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORM MODAL */}
      <AnimatePresence>
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFormModal(false)}
            className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-900">Join the Cause</h3>
                <button onClick={() => setShowFormModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 ring-blue-900"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 ring-blue-900"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 ring-blue-900"
                />
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 ring-blue-900 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-4 rounded-2xl font-bold hover:bg-amber-600 transition shadow-lg"
                >
                  Send via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}