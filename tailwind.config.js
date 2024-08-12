/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, TSX files in src
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        darkBlue: "#1d323b",
      },
      boxShadow: {
        offset: "6px 6px rgba(242, 235, 189, 1)",
        offsetDark: "6px 6px rgba(29, 50, 59, 1)",
      },
    },
  },
  plugins: [],
};
