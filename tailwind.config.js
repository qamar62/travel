/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#03045E', // Dark Blue
          800: '#023E8A',
          700: '#0077B6', // Ocean Blue
          600: '#0096C7',
          500: '#00B4D8', // Blue
          400: '#48CAE4',
          300: '#90E0EF', // Light Blue
          200: '#ADE8F4',
          100: '#CAF0F8', // Sky Blue
          50: '#E6F8FC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}