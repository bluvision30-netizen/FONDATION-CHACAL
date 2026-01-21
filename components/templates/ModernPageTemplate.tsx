"use client";
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ModernPageTemplateProps {
  children: ReactNode;
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: string;
  showHero?: boolean;
}

export default function ModernPageTemplate({
  children,
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000',
  showHero = true
}: ModernPageTemplateProps) {
  return (
    <div className="bg-[#FCFAFA] text-[#1A1A1B] min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      {showHero && (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src={heroImage} 
              className="w-full h-full object-cover opacity-60"
              alt={heroTitle}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
          </motion.div>
          
          <div className="relative z-10 max-w-5xl text-center px-6">
            {heroSubtitle && (
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-amber-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm"
              >
                {heroSubtitle}
              </motion.span>
            )}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-8"
            >
              {heroTitle}
            </motion.h1>
            {heroDescription && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 max-w-2xl mx-auto"
              >
                {heroDescription}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 py-16 md:py-24"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}