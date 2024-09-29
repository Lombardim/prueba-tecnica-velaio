/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'es-icon': "url('src/assets/icons/flag-es.svg')",
        'en-icon': "url('src/assets/icons/flag-uk.svg')",
        'expand-icon': "url('src/assets/icons/expand.svg')",
        'minimize-icon': "url('src/assets/icons/minimize.svg')",
        'light-mode-icon': "url('src/assets/icons/light-mode.svg')",
        'dark-mode-icon': "url('src/assets/icons/dark-mode.svg')",
      },
    },
  },
  plugins: [],
}

