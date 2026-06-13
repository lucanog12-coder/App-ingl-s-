/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wizard: {
          blue: '#1e3a8a',
          gold: '#f59e0b',
          green: '#16a34a',
          red: '#dc2626',
        }
      }
    },
  },
  plugins: [],
}
