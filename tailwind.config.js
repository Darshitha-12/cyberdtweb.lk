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
          cyan: '#00f2fe',
          green: '#00e676',
          red: '#ff0033',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.35), 0 0 60px rgba(0, 242, 254, 0.12)',
        'glow-green': '0 0 20px rgba(0, 230, 118, 0.35), 0 0 60px rgba(0, 230, 118, 0.12)',
        'card-hover': '0 0 0 1px rgba(0, 242, 254, 0.35), 0 0 35px rgba(0, 242, 254, 0.12)',
      },
      keyframes: {
        pageIn: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
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
        pageIn: 'pageIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        floatY: 'floatY 6s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        blink: 'blink 1s step-end infinite',
        spinSlow: 'spinSlow 14s linear infinite',
      },
    },
  },
  plugins: [],
}
