import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#4A2C1F',
          light: '#5C3A2A',
          dark: '#3A2218',
        },
        coffee: {
          DEFAULT: '#6F4E37',
          light: '#8A6549',
          dark: '#5A3E2C',
        },
        caramel: {
          DEFAULT: '#C48A4A',
          light: '#D4A066',
          dark: '#A87238',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
        },
        surface: {
          DEFAULT: '#F3EEE7',
          dark: '#EBE4DA',
        },
        charcoal: {
          DEFAULT: '#2B2B2B',
        },
        muted: {
          DEFAULT: '#8A8178',
        },
        border: {
          DEFAULT: '#E7DED2',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(74, 44, 31, 0.06)',
        card: '0 8px 32px -8px rgba(74, 44, 31, 0.08)',
        elevated: '0 16px 48px -12px rgba(74, 44, 31, 0.12)',
        warm: '0 2px 16px -2px rgba(111, 78, 55, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
      },
      keyframes: {
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '40%': { opacity: '1' },
          '80%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'warm-glow':
          'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196, 138, 74, 0.08), transparent 70%)',
        'wood-grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
