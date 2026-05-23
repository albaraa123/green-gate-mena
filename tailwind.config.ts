import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#003d35',
          800: '#00574d',
          700: '#00796b',
          600: '#00897b',
          500: '#26a69a',
          300: '#80cbc4',
          100: '#e0f2f1',
        },
        leaf: '#4caf50',
        lime: '#c6e94a',
        turquoise: '#5fcbc1',
        sand: {
          100: '#f6efe1',
          200: '#ecdfc4',
          300: '#d9c79f',
        },
        terracotta: '#c66a3a',
        'terracotta-soft': '#e89272',
        ink: '#0f1a14',
        'ink-soft': '#3a4a40',
        paper: '#fbf8f1',
        'paper-warm': '#f4ecdc',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        arabic: ['var(--font-thmanyah)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.6rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(1.4rem, 2.4vw, 2rem)', { lineHeight: '1.2' }],
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        container: '1320px',
      },
      spacing: {
        section: 'clamp(70px, 10vw, 140px)',
        gutter: 'clamp(20px, 4vw, 56px)',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'float-up 0.6s ease-out forwards',
        ripple: 'ripple 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.08)', opacity: '0.2' },
          '100%': { transform: 'scale(1)', opacity: '0.4' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
