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
        "responsive": "repeat(auto-fit, minmax(min(100%, 310px), 1fr));"
      },
      boxShadow:{
        "card": "4px 4px #323232",
        "cardD": "4px 4px #94A3B8"
      },
    },
  },
  plugins: [],  
}

