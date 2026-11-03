/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        beige: {
          50: '#FAF7F2',
          100: '#F3EDE3',
          200: '#ECE3D5',
          300: '#E3D8C6',
          400: '#D0C1AB',
          500: '#B9A68A',
        },
        black: '#0B0B0B',
        grey: {
          50: '#F9F9F8',
          100: '#F2F1EE',
          200: '#E5E4E0',
          300: '#D1CFC9',
          400: '#A3A099',
          500: '#7B7770',
          600: '#5E5A54',
          700: '#43403B',
          800: '#2B2925',
          900: '#181715',
        },
        status: {
          success: '#1B873F',
          error: '#D32F2F',
          rating: '#F59E0B',
          info: '#3B82F6',
        },
        brand: {
          pink: '#FF007A',
          yellow: '#FFDF00',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'sm': '3px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(11, 11, 11, 0.04), 0 1px 2px rgba(11, 11, 11, 0.02)',
        'card': '0 4px 16px -2px rgba(11, 11, 11, 0.05), 0 2px 6px -1px rgba(11, 11, 11, 0.03)',
        'lift': '0 10px 25px -5px rgba(11, 11, 11, 0.08), 0 8px 10px -6px rgba(11, 11, 11, 0.04)',
      },
      screens: {
        'xs': '380px',
      }
    },
  },
  plugins: [],
}

