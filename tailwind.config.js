/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:             '#F5FBF5',
        'bg-alt':       '#C1E1C1',
        'bg-dark':      '#1C3028',
        'bg-card':      '#FFFFFF',
        text:           '#162318',
        muted:          '#527A60',
        light:          '#8AAE96',
        accent:         '#3A9A87',
        'accent-dark':  '#2D8070',
        'accent-light': '#72C4B6',
        border:         '#B5D8B8',
        'border-dark':  '#2A4238',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(64px, 10vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(48px, 7vw, 80px)',   { lineHeight: '0.95' }],
        'display-sm': ['clamp(36px, 5vw, 56px)',   { lineHeight: '1.0' }],
        'heading-lg': ['clamp(32px, 4vw, 48px)',   { lineHeight: '1.1' }],
        'heading-md': ['clamp(24px, 3vw, 36px)',   { lineHeight: '1.1' }],
        'heading-sm': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.2' }],
      },
      transitionTimingFunction: {
        'ease-custom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
      animation: {
        scroll: 'scroll 28s linear infinite',
      },
    },
  },
  plugins: [],
};
