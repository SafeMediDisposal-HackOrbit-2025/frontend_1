/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#5CC9E0',
        'teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#66d9e0',
          500: '#50c2c9',
          600: '#47b1b8',
          700: '#3e9fa6',
          800: '#358d94',
          900: '#2c7b82',
        }
      }
    },
  },
  plugins: [],
};
