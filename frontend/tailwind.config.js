/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#38bdf8',
          600: '#0284c7',
          700: '#0369a1',
        },
        danger: '#f97316',
        warning: '#facc15',
        success: '#34d399',
      },
      boxShadow: {
        glow: '0 0 30px rgba(56, 189, 248, 0.3)',
      },
    },
  },
  plugins: [],
};
