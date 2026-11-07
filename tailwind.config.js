/** @type {import('tailwindcss').Config} */
// MAFTH design tokens — "Emerald & Marigold"
// brand  = deep emerald (primary: header, buttons, links)
// marigold = warm saffron-yellow accent (deals, badges, highlights)
// mist   = cool green-tinted neutrals (surfaces, borders)
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#0D1B16',
        brand: {
          50: '#EBF6F1',
          100: '#D2ECE0',
          200: '#A6D8C2',
          300: '#6DBE9C',
          400: '#2F9D74',
          500: '#11825C',
          600: '#0B6B4C',
          700: '#0A5A41',
          800: '#084A36',
          900: '#05342A',
          950: '#03231C',
        },
        marigold: {
          50: '#FFF9E8',
          100: '#FFF0C2',
          200: '#FFE08A',
          300: '#FFD154',
          400: '#FFC21F',
          500: '#F0A800',
          600: '#C98A00',
          700: '#9A6900',
        },
        mist: {
          50: '#F6F9F7',
          100: '#EEF3F0',
          200: '#E3EBE7',
          300: '#D2DDD8',
          400: '#A8B8B1',
          500: '#6F8279',
        },
        grey: {
          50: '#F8FAF9',
          100: '#F1F4F2',
          200: '#E4E8E6',
          300: '#CFD5D2',
          400: '#9AA39F',
          500: '#6E7773',
          600: '#525A56',
          700: '#3A413E',
          800: '#252B28',
          900: '#141917',
        },
        status: {
          success: '#15803D',
          error: '#DC2626',
          rating: '#F0A800',
          info: '#2563EB',
          warning: '#D97706',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(13, 27, 22, 0.05), 0 1px 2px rgba(13, 27, 22, 0.03)',
        card: '0 6px 20px -6px rgba(10, 90, 65, 0.12), 0 2px 6px -1px rgba(13, 27, 22, 0.04)',
        lift: '0 18px 40px -12px rgba(10, 90, 65, 0.22), 0 8px 12px -6px rgba(13, 27, 22, 0.06)',
      },
      screens: { xs: '380px' },
    },
  },
  plugins: [],
};
