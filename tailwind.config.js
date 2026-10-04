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
        // Forest + brass palette
        bg:             '#F7F3EC', // warm ivory
        'bg-alt':       '#EDE6D9', // sand
        'bg-dark':      '#14251E', // deep forest
        'bg-dark-2':    '#1B3128', // raised surface on forest
        'bg-card':      '#FFFDF9',
        text:           '#16130F',
        muted:          '#5F584E', // body copy on light backgrounds
        'muted-dark':   '#A8B4AB', // body copy on forest backgrounds
        light:          '#9A9286',
        accent:         '#9C7741', // brass — readable on ivory
        'accent-dark':  '#7A5C30',
        'accent-light': '#CDAE7A', // brass for use on forest
        border:         '#E2D9C9',
        'border-dark':  '#2A4035',
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
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 28s linear infinite',
      },
    },
  },
  plugins: [],
};
