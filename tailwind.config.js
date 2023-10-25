/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js

module.exports = {
  content: ["./src/*.html"],
  content: ["./App.{js,jsx,ts,tsx}", "./<gameify>/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }