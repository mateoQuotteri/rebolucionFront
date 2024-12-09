/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir todos los archivos de React
  ],
  theme: {
    extend: {
      colors: {
        naranja: '#ff9002',
        violeta: '#390d40',
        blanco: '#e3e3e3',
      },
    },
  },
  plugins: [],
};
