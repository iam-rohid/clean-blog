const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{jsx,tsx,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        gray: colors.slate,
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.600"),
            "h1,h2,h3,h4,h5,h6,strong": {
              color: theme("colors.gray.800"),
            },
            pre: null,
            code: null,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.400"),
            "h1,h2,h3,h4,h5,h6,strong": {
              color: theme("colors.gray.300"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
