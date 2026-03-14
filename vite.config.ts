import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const isCapacitor = !!process.env.CAPACITOR

export default defineConfig({
  plugins: [
    react(),
    ...(!isCapacitor
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            manifest: {
              name: '2031: A Choose Your Own Adventure',
              short_name: '2031',
              description: 'A choose your own adventure in a world run by AI',
              start_url: '/',
              display: 'fullscreen',
              orientation: 'portrait',
              background_color: '#0a0a14',
              theme_color: '#0a0a14',
              categories: ['games', 'entertainment'],
              icons: [
                {
                  src: '/favicon.svg',
                  sizes: 'any',
                  type: 'image/svg+xml',
                  purpose: 'any',
                },
                {
                  src: '/favicon.svg',
                  sizes: 'any',
                  type: 'image/svg+xml',
                  purpose: 'maskable',
                },
                {
                  src: '/icon-192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/icon-512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
              ],
            },
          }),
        ]
      : []),
  ],
})
