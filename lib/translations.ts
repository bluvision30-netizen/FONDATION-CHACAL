// Type pour les traductions
interface TranslationsType {
  [key: string]: {
    nav: {
      foundation: string;
      missions: string;
      about: string;
      projects: string;
      achievements: string;
      gallery: string;
      impact: string;
      news: string;
      donate: string;
    };
    hero: {
      subtitle: string;
      title: string;
      subTitle: string;
      cta1: string;
      cta2: string;
    };
  };
}

export const translations: TranslationsType = {
  fr: {
    nav: {
      foundation: "La Fondation",
      missions: "Missions",
      about: "À Propos",
      projects: "Projets",
      achievements: "Réalisations",
      gallery: "Galerie",
      impact: "Impact",
      news: "Actualités",
      donate: "Faire un Don"
    },
    hero: {
      subtitle: "Soutenir • Protéger • Élever",
      title: "Redonner le Sourire",
      subTitle: "à nos Sages.",
      cta1: "Rejoindre la Cause",
      cta2: "Voir notre film 2024"
    }
  },
  en: {
    nav: {
      foundation: "Foundation",
      missions: "Missions",
      about: "About",
      projects: "Projects",
      achievements: "Achievements",
      gallery: "Gallery",
      impact: "Impact",
      news: "News",
      donate: "Make a Donation"
    },
    hero: {
      subtitle: "Support • Protect • Elevate",
      title: "Restoring Smiles",
      subTitle: "to our Elders.",
      cta1: "Join the Cause",
      cta2: "Watch our 2024 Film"
    }
  }
};

export const defaultLang: 'fr' | 'en' = 'fr';