/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B192C',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
        },
        royal: {
          600: '#2563EB',
          700: '#1D4ED8',
          50: '#EFF6FF',
        },
        gold: {
          500: '#F59E0B',
          600: '#D97706',
          50: '#FFFBEB',
        },
        slateCanvas: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        canvas: '36px',
        card: '24px',
        pill: '9999px',
      },
      boxShadow: {
        canvas: '0 20px 50px -12px rgba(11, 25, 44, 0.08), 0 0 40px 0 rgba(37, 99, 235, 0.04)',
        glow: '0 0 30px 0 rgba(37, 99, 235, 0.12)',
        card: '0 10px 30px -5px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
