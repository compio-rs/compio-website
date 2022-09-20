/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['DM Sans Variable'],
    },

    extend: {
      colors: {
        background: 'hsl(203, 69%, 98%)',
        blue: {
          100: '#D3FBFF',
          200: '#A8F2FF',
          300: '#7CE4FF',
          400: '#5CD3FF',
          500: '#26b7ff',
          600: '#1B8FDB',
          700: '#136BB7',
          800: '#0C4C93',
          900: '#07367A',
        },
      },
    },
  },
  plugins: [],
}
