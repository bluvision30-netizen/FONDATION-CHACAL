/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Optionnel pour ignorer les erreurs ESLint
  },
}

module.exports = nextConfig