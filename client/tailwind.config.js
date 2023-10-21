/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'background':"#141414",
        'primary':"#3d3d3d",
        'secondary':"#1a1a1a",
        'text':"#fcfcfc",
        'accent':"#808080",
      }
    },
  },
  plugins: [],
}