/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chess: {
          board: {
            light: '#eeeed2',
            dark: '#769656',
          },
          bg: '#312e2b',
          sidebar: '#262421',
          button: '#363432',
          'button-hover': '#464442',
          'primary-button': '#7fa650',
          'primary-button-hover': '#6d9343',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};