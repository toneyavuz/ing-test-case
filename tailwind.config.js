/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: ({ colors }) => {
        return {
          ...colors,
          ing: {
            50:  "#fff3e9",
            100: "#ffe3d1",
            200: "#ffc4a3",
            300: "#ffa06f",
            400: "#ff7f44",
            500: "#f37021",
            600: "#d8601d",
            700: "#b24e18",
            800: "#8c3e13",
            900: "#6b300f",
            A100: "#ffd6bf",
            A200: "#ffb18a",
            A400: "#ff8c55",
            A700: "#ff7a3b",
          },
        };
      },
    },

  },
  plugins: [],
};
