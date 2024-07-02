/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        righteous: ['"Righteous"','cursive'],
      },
      colors: {
        primary: "#ff4800"
      }
    },
  },
  plugins: [],
}

