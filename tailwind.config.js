/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1e1b4b',
          primary: '#3b82f6',
          light: '#dbeafe',
          lavender: '#e0e7ff',
          olive: '#65a30d',
          oliveLight: '#ecfccb',
        },
        primary: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 27, 75, 0.1) 100%)',
        'glass-dark': 'linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 15px 35px rgba(31, 38, 135, 0.2)',
        'brand': '0 4px 6px -1px rgba(30, 27, 75, 0.1), 0 2px 4px -1px rgba(30, 27, 75, 0.06)',
      },
    },
  },
  plugins: [],
}

