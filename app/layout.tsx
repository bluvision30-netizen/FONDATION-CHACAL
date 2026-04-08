import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

// ─── URL de base du site ───────────────────────────────────────────────────
const BASE_URL = 'https://fondationlechacal.org';

// ─── Métadonnées globales (héritées par toutes les pages) ──────────────────
export const metadata: Metadata = {
  // ── Général ──
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Fondation Le Chacal — Santé et Dignité pour nos Aînés',
    template: '%s — Fondation Le Chacal',
  },
  description:
    'La Fondation Le Chacal œuvre pour la santé et la dignité des personnes âgées vulnérables au Cameroun. Consultations médicales gratuites, dons matériels et soutien aux seniors de Douala.',
  keywords: [
    // ── Français ──
    'fondation humanitaire Cameroun',
    'santé seniors Douala',
    'aide personnes âgées Cameroun',
    'consultations médicales gratuites',
    'Fondation Le Chacal',
    'solidarité Douala',
    'bénévolat médical Cameroun',
    'association humanitaire diaspora',
    'donation ONG Cameroun',
    // ── English (public américain / diaspora) ──
    'Cameroon humanitarian foundation',
    'elderly care Cameroon',
    'African NGO donation',
    'Douala senior health',
    'Cameroon charity organization',
    'donate Cameroon nonprofit',
    'African diaspora fundraising USA',
  ],
  authors: [{ name: 'Fondation Le Chacal', url: BASE_URL }],
  creator: 'Fondation Le Chacal',
  publisher: 'Fondation Le Chacal',

  // ── Open Graph (Facebook, WhatsApp, LinkedIn) ──
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US'], // ← public américain
    url: BASE_URL,
    siteName: 'Fondation Le Chacal',
    title: 'Fondation Le Chacal — Santé et Dignité pour nos Aînés',
    description:
      'Consultations médicales gratuites et soutien aux seniors vulnérables de Douala, Cameroun. Free medical consultations for vulnerable elderly in Cameroon.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fondation Le Chacal — Santé et Dignité pour nos Aînés',
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: 'summary_large_image',
    title: 'Fondation Le Chacal — Santé et Dignité pour nos Aînés',
    description:
      'Consultations médicales gratuites et soutien aux seniors vulnérables de Douala, Cameroun.',
    images: ['/og-image.jpg'],
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Icônes (favicons) ──
  icons: {
    icon: [
      { url: '/favicon.ico', rel: 'shortcut icon' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // ── Manifest PWA ──
  manifest: '/site.webmanifest',

  // ── Canonique + hreflang ──
  alternates: {
    canonical: BASE_URL,
    languages: {
      'fr-FR': BASE_URL, // Cameroun / France
      'fr-US': BASE_URL, // Diaspora francophone aux États-Unis
      'x-default': BASE_URL, // Fallback universel
    },
  },
};

// ─── JSON-LD Schema.org (données structurées pour Google) ─────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Fondation Le Chacal',
  alternateName: 'Fondation LE CHACAL',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'Fondation humanitaire dédiée à la santé et la dignité des personnes âgées vulnérables au Cameroun.',
  foundingDate: '2024',
  // ── Zone d'action : Cameroun ──
  areaServed: [
    {
      '@type': 'City',
      name: 'Douala',
      addressCountry: 'CM',
    },
    {
      '@type': 'Country',
      name: 'Cameroun',
    },
  ],
  // ── Lieu des événements de collecte : États-Unis ──
  event: {
    '@type': 'Event',
    name: 'Événements de collecte de fonds — Diaspora USA',
    location: {
      '@type': 'Country',
      name: 'United States',
    },
  },
  // ── Contact ── (remplace +237-6XX-XXX-XXX par le vrai numéro)
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+237-6XX-XXX-XXX',
    email: 'contact@fondationlechacal.org',
    contactType: 'customer service',
    availableLanguage: ['French', 'English'],
  },
  sameAs: [
    'https://www.facebook.com/fondationlechacal',
    'https://www.instagram.com/fondationlechacal',
    'https://twitter.com/fondationlechacal',
  ],
  nonprofit501c3: false,
  knowsAbout: [
    'Senior care',
    'Medical assistance',
    'Humanitarian aid',
    'Cameroon',
    'African diaspora',
    'Elderly health',
  ],
};

// ─── Layout racine ────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* JSON-LD données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Thème couleur navigateur mobile */}
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-title" content="LE CHACAL" />
        {/* Manifest explicite pour compatibilité maximale */}
        <link rel="manifest" href="/site.webmanifest" />
        {/* Géolocalisation du contenu */}
        <meta name="geo.region" content="CM-LT" />
        <meta name="geo.placename" content="Douala, Cameroun" />
        <meta name="language" content="fr" />
      </head>
      <body className={`${inter.className} bg-[#FCFAFA] text-[#1A1A1B]`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}