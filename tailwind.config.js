/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/public/images/landing-page-hero-bg.png')",
        "all-hero-bg": "url('/public/images/all-hero-bg.png')",
      },
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: "#B88E2F", // Main color
          50: "#FAE3B5", // Lighter shade
          100: "#F1D287", // Slightly darker
          200: "#D9A83D", // More intense
          300: "#C57D2E", // Even darker
          400: "#B88E2F", // Original color
          500: "#A2711A", // Darker shade
          600: "#6F5814", // Darker
          700: "#4F4010", // Dark
          800: "#3C2A0D", // Very dark
          900: "#2A1B08", // Darkest
        },

        // Secondary Colors
        secondary: {
          DEFAULT: "#FFF3E3", // Main color
          50: "#FFF9F2", // Lighter shade
          100: "#FFF5DC", // Slightly darker
          200: "#F3C9A9", // More intense
          300: "#E9A67F", // Even darker
          400: "#F1B585", // Original color
          500: "#D88D58", // Darker shade
          600: "#BF773F", // Darker
          700: "#9F602C", // Dark
          800: "#7F4A1C", // Very dark
          900: "#5F3B0D", // Darkest
        },

        // Text Colors
        textPrimary: "#333333",
        textSecondary: "#666666",
        textNeutral: "#242424",

        // Status and Tag Colors
        statusBg: "#2EC1AC",
        tagBg: "#E97171",

        // Neutral Grays
        grayLight: "#D9D9D9",
        grayMedium: "#9F9F9F",
        charcoalGray: "#898989",
        grayLightest: "#F4F5F7",

        // Warm Neutrals
        beigeLight: "#F9F1E7",
        ivoryLight: "#FAF3EA",

        // Accent Colors
        periwinkle: "#816DFA",
      },
    },
  },
  plugins: [],
};
