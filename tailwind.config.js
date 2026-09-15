/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./playground/**/*.{ts,tsx,html}"],
  important: ".tajir-footer",
  theme: {
    extend: {
      colors: {
        tj: {
          gold: "var(--tj-gold)",
          social: "var(--tj-social)",
        },
      },
      maxWidth: {
        footer: "1440px",
      },
      fontFamily: {
        footer: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
