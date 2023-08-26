/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        "responsive": "repeat(auto-fit, minmax(min(100%, 300px), 1fr));"
      }
    },
  },
  plugins: [],  
}

