import scrollbarHide from "tailwind-scrollbar-hide";
import { colors } from "./src/constants/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      screens: {
        sm: "375px",
        md: "480px",
        lg: "640px",
      },
      width: {
        maximum: "640px",
      },
      maxWidth: {
        maximum: "640px",
      },
      fontSize: {
        title1: "2.5rem",
        title2: "2.25rem",
        title3: "2rem",
        title4: "1.75rem",
        title5: "1.5rem",
        title6: "1.375rem",
        subtitle1: "1.25rem",
        subtitle2: "1.125rem",
        body1: "1rem",
        body2: "0.875rem",
        caption1: "0.75rem",
        caption2: "0.625rem",
      },
      colors,
    },
  },
  plugins: [
    scrollbarHide,
  ],
};
