"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Type pour le contexte
interface LanguageContextType {
  language: 'fr' | 'en';
  toggleLanguage: () => void;
}

// Création du contexte avec une valeur par défaut
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props pour le provider
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    // Vérifier si on est dans le navigateur
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('fondation-lang') as 'fr' | 'en' | null;
      if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
        setLanguage(savedLang);
      } else if (navigator.language.startsWith('en')) {
        setLanguage('en');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fondation-lang', newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};