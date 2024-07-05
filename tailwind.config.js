/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'custom-bg': "url('/home/iwebsteraudio/iwebstermusic/img/LivePic.jpg')",
      },
      fontFamily: {
        righteous: ['"Righteous"','cursive'],
      },
      colors: {
        primary: "#030712"
      }
    },
  },
  plugins: [],
}

