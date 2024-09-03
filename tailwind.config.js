/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/index.jsx",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: { 
      colors: {
        'main-green': '#47A538',
        'azul-azulado': '#0066dd',
        'input-gray': "#959595"
      },
    },
  },
  plugins: [],
}

