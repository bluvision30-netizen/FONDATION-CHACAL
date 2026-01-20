"use client";
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTemplateProps {
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: string;
  heroHeight?: 'small' | 'medium' | 'large' | 'full';
  children: ReactNode;
  backgroundColor?: string;
}

export default function PageTemplate({
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage,
  heroHeight = 'medium',
  children,
  backgroundColor = 'bg-[#FCFAFA]'
}: PageTemplateProps) {
  const heightClasses = {
    small: 'h-[50vh]',
    medium: 'h-[60vh]',
    large: 'h-[70vh]',
    full: 'h-screen'
  };

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      {/* Hero Section */}
      <div className={`relative ${heightClasses[heroHeight]} flex items-center justify-center overflow-hidden`}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage || 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000'})` }}
            />
          </motion.div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent" />
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroSubtitle && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block text-amber-300 font-bold tracking-[0.3em] uppercase mb-6 text-sm"
              >
                {heroSubtitle}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[0.9]"
            >
              {heroTitle}
            </motion.h1>

            {heroDescription && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
              >
                {heroDescription}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[#FCFAFA]"
      >
        {children}
      </motion.div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ensemble, faisons la différence
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Votre soutien permet de transformer concrètement la vie des seniors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faire-un-don"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-amber-500/20"
            >
              Faire un don
            </a>
            <a
              href="/devenir-benevole"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white/30 hover:border-white transition-all duration-300"
            >
              Devenir bénévole
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}