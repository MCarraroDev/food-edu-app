/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#264653',
        secondary: '#2a9d8f',
        accent1: '#e9c46a',
        accent2: '#f4a261',
        accent3: '#e76f51',
      },
    },
  },
  plugins: [],
}
