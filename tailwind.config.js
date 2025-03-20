/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)', // Dark Mode Elements
        'very-dark-blue': 'hsl(207, 26%, 17%)', // Dark Mode Background
        'very-dark-blue-bg': 'hsl(207, 26%, 17%)', // Dark Mode Background (alias)
        'very-dark-blue-text': 'hsl(200, 15%, 8%)', // Light Mode Text
        'dark-gray': 'hsl(0, 0%, 52%)', // Light Mode Input
        'very-light-gray': 'hsl(0, 0%, 98%)', // Light Mode Background
      },
      fontFamily: {
        'nunito-sans': ['"Nunito Sans"', 'sans-serif'],
      },
      fontSize: {
        'home': '14px',
        'detail': '16px',
      },
    },
  },
  plugins: [],
}
