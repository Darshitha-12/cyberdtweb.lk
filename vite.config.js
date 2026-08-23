import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Auto-detects the GitHub repo name during Pages builds,
// so the site works no matter what you name your repository.
// Locally it stays at '/' so `npm run dev` and `npm run preview` just work.
const ghBase = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/'

export default defineConfig({
  base: ghBase,
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
