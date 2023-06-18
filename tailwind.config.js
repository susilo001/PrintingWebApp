/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/**/*.{jsx,js}",
    "./resources/js/**/*.{jsx,js}",
  ],

  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    themes: [
      {
        cmyk: {
          ...require("daisyui/src/theming/themes")["[data-theme=cmyk]"],
          primary: "#0079FF",
          secondary: "#FF0060",
          accent: "#F6FA70",
          info: "#7dd3fc",
          success: "#00DFA2",
          warning: "#fbbf24",
          error: "#dc2626",
        },
      },
    ],
  },
  theme: {
    fontFamily: {
      "open-sans": ["Open Sans", "sans-serif"],
    },
  },
};
