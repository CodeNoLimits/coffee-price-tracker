/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6F00', // Burnt Orange
        'accent-gold': '#FFB300',
        'text-primary': '#3E2723', // Rich Brown
        'text-secondary': '#6D4C41', // Lighter Brown
        'background-light': '#FFF8E1', // Cream
        'background-dark': '#1a1412', // Dark mode equivalent
        'surface-light': '#FFFFFF', // Card background light
        'surface-dark': '#2a221f', // Card background dark
        'border-light': '#EFEBE9',
        'border-dark': '#4a3c35',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(62, 39, 35, 0.08)',
        'soft-hover': '0 8px 20px rgba(62, 39, 35, 0.12)',
      },
    },
  },
  plugins: [],
}
