/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './<custom-folder>/**/*.{js,jsx,ts,tsx}'],
// Change ./<custom-folder> to ./app (in my case)
  theme: {
    extend: {}
  },
  plugins: []
}


  