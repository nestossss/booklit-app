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
        "streak-made-green": "#62DC4E",
        'azul-azulado': '#0066dd',
        'input-gray': "#959595",
        "yellow-green": "#C1D9A9",
        "screen-black": "#101010"  
      },
    },
  },
  plugins: [],
}

