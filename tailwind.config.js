/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette that works well in both light and dark modes
        primary: {
          light: '#458588',
          DEFAULT: '#458588',
          dark: '#83a598',
        },
        secondary: {
          light: '#d3869b',
          DEFAULT: '#d3869b',
          dark: '#d3869b',
        },
        accent: {
          light: '#fabd2f',
          DEFAULT: '#fabd2f',
          dark: '#fabd2f',
        },
        // Dark mode specific background colors
        dark: {
          bg: {
            primary: '#121212',
            secondary: '#1e1e1e',
            elevated: '#2d2d2d',
          },
          text: {
            primary: '#f4f4f5',
            secondary: '#a1a1aa',
          },
          border: '#2e2e2e',
        },
      },
      // Customize typography for dark mode
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.dark.text.primary'),
            h1: { color: theme('colors.dark.text.primary') },
            h2: { color: theme('colors.dark.text.primary') },
            h3: { color: theme('colors.dark.text.primary') },
            h4: { color: theme('colors.dark.text.primary') },
            strong: { color: theme('colors.dark.text.primary') },
            a: { 
              color: theme('colors.primary.dark'),
              '&:hover': { color: theme('colors.accent.dark') }
            },
            code: { color: theme('colors.secondary.dark') },
            blockquote: { 
              color: theme('colors.dark.text.secondary'),
              borderLeftColor: theme('colors.dark.border')
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};