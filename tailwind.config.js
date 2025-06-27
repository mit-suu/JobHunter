/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      clipPath: {
      'right-angle': 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)',
    },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        Epilogue:['Epilogue','sans-serif']
      },
    },
  },
  plugins: [require('tailwind-clip-path'),],
}
