/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          indigo: '#818cf8',
          cyan: '#22d3ee',
          violet: '#a78bfa',
        },
        surface: {
          DEFAULT: '#12121e',
          elevated: '#1a1a2e',
          card: '#16162a',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #818cf8 0%, #22d3ee 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(129,140,248,0.15) 0%, rgba(34,211,238,0.15) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(129, 140, 248, 0.3)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.3)',
        'glow-lg': '0 0 60px rgba(129, 140, 248, 0.2)',
      },
    },
  },
  plugins: [],
}
