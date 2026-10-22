/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080b10',
        panel: '#0f172a',
        panel2: '#111c33',
        neon: {
          cyan: '#22d3ee',
          green: '#10b981',
          red: '#ef4444',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 0 1px rgba(34, 211, 238, 0.18), 0 22px 45px -28px rgba(34, 211, 238, 0.55)',
        'glow-green': '0 0 0 1px rgba(16, 185, 129, 0.18), 0 22px 45px -28px rgba(16, 185, 129, 0.55)',
        'card-hover': '0 0 0 1px rgba(34, 211, 238, 0.2), 0 24px 48px -30px rgba(0, 0, 0, 0.9)',
      },
      keyframes: {
        pageIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pageIn: 'pageIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        floatY: 'floatY 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 7s linear infinite',
        spinSlow: 'spinSlow 14s linear infinite',
      },
    },
  },
  plugins: [],
}
