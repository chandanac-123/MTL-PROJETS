import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontFamily: {
        inter: ["Inter"],
        trirong: ["Trirong"],
      },
    },
    screens: {
      sm: "553px",
      md: "768px",
      mobile: "970px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    fontSize: {
      xs: "0.75rem", //12px
      sm: "0.875", //14px
      sidebartext: "0.938rem", //15px
      base: "1rem", //16px
      md: "1.125rem", //18px
      lg: "1.25rem", //20px
      xl: "1.375rem", //22px
      "2xl": "1.5rem", //24px
      "3xl": "2.125rem", //34px
      "4xl": "2.5rem", //40px
      "5xl": "2.25rem", //36px
    },
    borderRadius: {
      xxs: "0.5 rem", //8px
      xs: "0.625rem", //10px
      sm: "1rem", //16px
      base: "1.25rem", //20px
      md: "1.5rem", //24px
      lg: "1.875rem", //30px
      xl: "2.5rem", //40px
      xxl: "3.125rem", //50px
      xxxl: "3.75rem", //60px
      "4xl": "12.5rem", //200px
    },
    colors: {
      primary: "#9D5A46",
      secondary: "#222222",
      bg_primary: "#F6F4F4",
      bg_secondary: "#FFFFFF",
      bg_error: "#FFE4E4",
      text_error: "#E51C26",
      grey: "#4A4A4A",
      light_pink: "#EDE7DB",
      light_grey: "#EDEFEF",
      text_label: "#686868",
      inputbg: "#F4F4F4",
      textblack: "#242424",
      textgrey: "#1B3F6D",
      outline_grey: "#B5B5B5",
      bg_select: "#EDE7DB33",
      extra_light_grey: "#777777",
      bg_green: "#DEF9D5",
      badge_green: "#2B771E",
      badge_grey: "#808080",
      upload: "#AAAAAA",
      light_sandal: "#EEE8C7",
      badge_sandal: "#715A20",
      light_blue: "#E5F0F8",
      badge_blue: "#0C2A82",
      extra_light_pink: "#F7E6FF",
      badge_pink: "#622B93",
      light_orange: "#FCEBDB",
      badge_orange: "#C66202",
      dark_sandal: "#9D5A47",
      light_green: "#77AC64",
      light_red: "#FEE9E9",
      badge_red: "#CC1A1A",
      brown_bg: "#EEE8C7",
      brown_text: "#715A20",
      red_bg: "#FFDFDF",
      count_bg: "#383838",
      dark_primary: "#37180F",
      notification_bg: "#EEECE8",
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;

export default config;

// xs: "0.75rem", //12px
// sm: "0.875", //14px
// base: "1rem", //16px
// md: "1.125rem", //18px
// lg: "1.25rem", //20px
// xl: "1.375rem", //22px
// "2xl": "1.5rem", //24px
// "3xl": "2.125rem", //34px
// "4xl": "2.5rem", //40px
