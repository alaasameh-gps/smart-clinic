/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 16px 40px rgba(15, 50, 92, 0.08)',
      },
      colors: {
        clinic: {
          50: '#f3f8ff',
          100: '#e8f1ff',
          200: '#d7e5ff',
          500: '#2f6ce0',
          600: '#2558c9',
          700: '#1f4ba1',
        },
      },
    },
  },
  plugins: [],
};
