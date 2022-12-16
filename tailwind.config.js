module.exports = {
  purge: {
    enabled: true,
    content: [
      '.src/layout/*.liquid',
      '.src/templates/*.liquid',
      '.src/sections/*.liquid',
      '.src/snippets/*.liquid'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}