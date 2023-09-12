/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      scale: {
        '101': '1.01'
      },
      backgroundColor: {
        np: {
          fill: 'var(--color-fill)',
          accent: 'var(--color-fill-hover)'
        }
      },
      textColor: {
        np: {
          base: 'var(--color-text-base)',
          inverted: 'var(--color-text-inverted)',
          light: 'var(--color-text-base-dark)'
        }
      },
      borderColor: {
        np: {
          base: 'var(--color-border-base)'
        }
      }
    },
    plugins: [require('@tailwindcss/forms')],
  }
}
