/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          soft: '#6366f1',
          gentle: '#8b5cf6',
        },
        accent: {
          warm: '#f59e0b',
          soft: '#10b981',
        },
        neutral: {
          warm: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
} 