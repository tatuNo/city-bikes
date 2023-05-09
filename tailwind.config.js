/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        stationList: "505px",
        journeyList: "795px",
      },
    },
    colors: {
      orange: "#FF5500",
      lightorange: "#FF7D00",
      white: "#FFF",
      main: "#141616",
      seondary: "#1F1F1F",
      red: "#FF0000",
    },
  },
  plugins: [],
};
