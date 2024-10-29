import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import sitemap from 'vite-plugin-sitemap';

// URLs for sitemap
const urls = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/terms',
  '/privacy',
  '/blog',
  '/tour/1',
  '/tour/2',
  '/tour/3'
];

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://yourdomain.com',
      generateRobotsTxt: true
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'aiTours - Discover Amazing Tours Worldwide',
        short_name: 'aiTours',
        description: 'Book unforgettable tours and activities for your next adventure',
        theme_color: '#0077B6',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  }
});