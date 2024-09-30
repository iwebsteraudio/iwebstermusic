/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/home/iwebsteraudio/iwebstermusic/img/LivePic.jpg')",
      },
      fontFamily: {
        righteous: ['"Righteous"', "cursive"],
        monaSans: ["Mona Sans", "sans-serif"],
      },
      fontWeight: {
        light: 200,
        normal: 400,
        bold: 700,
      },
      fontStretch: {
        normal: "100%",
        expanded: "125%",
        condensed: "75%",
      },
      colors: {
        primary: "#030712",
      },
    },
  },
  plugins: [],
};
