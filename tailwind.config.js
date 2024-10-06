/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Prend en charge les fichiers dans le dossier "app"
    "./pages/**/*.{js,ts,jsx,tsx}", // Prend en charge les fichiers dans le dossier "pages"
    "./components/**/*.{js,ts,jsx,tsx}", // Prend en charge les fichiers dans le dossier "components"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
