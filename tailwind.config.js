/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, TSX files in src
  ],
  theme: {
    extend: {
      // Customize your theme here
    },
  },
  plugins: [],
};