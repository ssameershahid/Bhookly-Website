/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bhk: {
          ink:     '#1a1410',
          cream:   '#fdf8f1',
          saffron: '#f59e0b',
          ember:   '#ea580c',
          rose:    '#e11d48',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Iowan Old Style"', '"Apple Garamond"', 'Georgia', 'serif'],
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        'bhk-cta':       '0 1px 0 rgba(255,255,255,.35) inset, 0 0 0 1px rgba(124,45,18,.4), 0 12px 24px -8px rgba(234,88,12,.55)',
        'bhk-cta-hover': '0 1px 0 rgba(255,255,255,.4)  inset, 0 0 0 1px rgba(124,45,18,.5), 0 18px 32px -10px rgba(234,88,12,.65)',
      },
    },
  },
  plugins: [],
}
