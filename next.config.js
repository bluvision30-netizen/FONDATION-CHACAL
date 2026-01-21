/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Important pour Netlify
  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc'],
    unoptimized: true, // Nécessaire pour le déploiement statique
  },
  trailingSlash: true,
}

module.exports = nextConfig