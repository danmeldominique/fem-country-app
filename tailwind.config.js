/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light Mode
        EL_DarkBlue: 'hsl(209,23%,22%)',
        TE_VeryDarkBlue: 'hsl(200,15%,8%)',
        IN_DarkGray: 'hsl(0,0%,52%)',
        BG_VeryLightGray: 'hsl(0,0%,98%)',
        // Dark Mode
        BG_VeryDarkBlue: 'hsl(207,26%,17%)',
        White: 'hsl(0,0%,100%)',
      },
      fontFamily: {
        sans: 'Nunito sans, sans-serif',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
