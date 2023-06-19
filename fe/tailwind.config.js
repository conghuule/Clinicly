/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'primary-100': '#6CC9A8',
      'primary-200': '#47BB92',
      'primary-300': '#00855f',
      gray: '#D9D9D9',
      blue: '#004DB6',
      white: '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
};
