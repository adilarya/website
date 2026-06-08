/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        mono:  ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Pure-white, monochrome editorial. No color accent — ink only.
        paper: {
          DEFAULT: '#ffffff', // base background
          raised:  '#ffffff', // cards (separated by hairlines / soft shadow)
          sunk:    '#f6f6f5', // faint neutral band for the rare alternating section
        },
        ink: {
          DEFAULT: '#141414', // primary text — near-black
          soft:    '#4a4a4a', // secondary text
          muted:   '#8a8a8a', // metadata / captions
        },
        // "accent" kept as a token so existing utilities resolve — but it's ink.
        accent: {
          DEFAULT: '#141414',
          soft:    '#3a3a3a',
        },
        line: 'rgba(20, 20, 20, 0.12)',
      },
      maxWidth: {
        measure: '38rem',
      },
      animation: {
        'fade-in': 'fade-in 0.7s ease-out both',
        'rise':    'rise 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        rise: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
