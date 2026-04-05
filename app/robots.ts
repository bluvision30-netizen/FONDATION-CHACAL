// app/robots.ts
// Génère automatiquement /robots.txt
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://fondationlechacal.org/sitemap.xml',
    host: 'https://fondationlechacal.org',
  };
}