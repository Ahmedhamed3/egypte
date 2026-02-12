import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#f8d89e',
        nile: '#20b9d2',
        papyrus: '#f3f4cf'
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseSlow: 'pulse 2.6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
