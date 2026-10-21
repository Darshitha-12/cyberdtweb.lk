import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative asset paths so the exact same build works on:
//  - GitHub Pages project URL: https://darshitha-12.github.io/cyberdtweb.lk/
//  - Custom domain root:       https://cyberdt.is-a.dev/
// No repo-name guessing needed, and switching domains won't break assets.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
