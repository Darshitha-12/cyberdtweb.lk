import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoPages } from './vite-plugin-seo-pages.mjs'

// Relative asset paths so the exact same build works on:
//  - GitHub Pages project URL: https://darshitha-12.github.io/cyberdtweb.lk/
//  - Custom domain root:       https://cyberdt.is-a.dev/
// No repo-name guessing needed, and switching domains won't break assets.
//
// The seoPages() plugin generates a real, crawlable HTML document for every
// route (/, /about/, /services/, /youtube/, /contact/) with its own title,
// description, canonical URL, Open Graph tags and JSON-LD, so search engines
// can index each page instead of a single empty SPA shell.
export default defineConfig({
  base: './',
  plugins: [react(), seoPages()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
