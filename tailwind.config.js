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
        '101': '1.01',
        '102': '1.02'
      },
      backgroundColor: {
        np: {
          base: 'var(--color-bg-base)',
          fill: 'var(--color-fill)',
          accent: 'var(--color-fill-hover)',
          alert: 'var(--color-bg-alert)'
        }
      },
      textColor: {
        np: {
          base: 'var(--color-text-base)',
          inverted: 'var(--color-text-inverted)',
          alert: 'var(--color-text-alert)'
        }
      },
      borderColor: {
        np: {
          base: 'var(--color-border-base)',
          alert: 'var(--color-border-alert)'
        }
      }
    },
    plugins: [require('@tailwindcss/forms')],
  }
}
