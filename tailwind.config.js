/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#12372A",
          dark: "#0B261C",
        },

        sage: {
          DEFAULT: "#A8B5A0",
          soft: "#F1F3EC",
        },

        ivory: "#FAF8F2",
        gold: {
          DEFAULT: "#B59A63",
          light: "#D6C49C",
        },

        charcoal: "#202923",
        muted: "#68736A",
        border: "#DCE2D8",
      },

      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        editorial: ["Playfair Display", "Georgia", "serif"],
      },

      boxShadow: {
        bc: "0 4px 20px rgba(18, 55, 42, 0.06)",
        "bc-card": "0 8px 30px rgba(18, 55, 42, 0.08)",
        "bc-hover": "0 14px 40px rgba(18, 55, 42, 0.14)",
      },

      borderRadius: {
        bc: "4px",
        "bc-md": "8px",
        "bc-lg": "14px",
      },
    },
  },

  plugins: [],
};
