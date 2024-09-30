/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'add-circle-icon': "url('src/assets/icons/add-circle.svg')",
        'back-icon': "url('src/assets/icons/back.svg')",
        'calendar-icon': "url('src/assets/icons/calendar.svg')",
        'close-blue-icon': "url('src/assets/icons/close-blue.svg')",
        'dark-mode-icon': "url('src/assets/icons/dark-mode.svg')",
        'en-icon': "url('src/assets/icons/flag-uk.svg')",
        'es-icon': "url('src/assets/icons/flag-es.svg')",
        'expand-icon': "url('src/assets/icons/expand.svg')",
        'light-mode-icon': "url('src/assets/icons/light-mode.svg')",
        'minimize-icon': "url('src/assets/icons/minimize.svg')",
        'more-options-icon': "url('src/assets/icons/more-options.svg')",
        'trash-icon': "url('src/assets/icons/trash.svg')",
      },
    },
  },
  plugins: [],
}

