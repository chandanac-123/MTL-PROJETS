/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important:true,
  theme: {
    extend: {
      fontFamily: {
        inter: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        merri_weather: ['Merriweather', 'serif']
      },
      screens: {
        'sm': '553px',
        'md': '768px',
        mobile: '970px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        "green": "#7CC590",
        "yellow": "#FECB0D",
        "red": "#E48068",
        "brown": "#594740",
        "black": "#071437",
        "grey": "#999999",
        "blue": "#009EF7",
        "text-blue": '#3E97FF',
        "bg_white": "#FFFDF5",
        "text_black": "#415160",
        "text_grey": "#66727E",
        "neutral": "#FFFFFF",
        "btn_grey": "#EFEDE5",
        "orange": "#C99055",
        "cream": "#FFFDF5",
        "border_grey": "#DDDDDD",
        "card_text": "#3F4254",
        "bg_grey": '#F1F1F2',
        "outline_grey": "#E1E3EA",
        "light_green": "#F3FFF6",
        "head_grey": "#4F4F4F",
        "red-btn": "#EB5757",
        "badge-grey": "#E3E2DE",
        "badge-red": "#CC0B49",
        "table_text": "#424E5A",
        "table_text_grey": "#828282",
        "bg_red":"#FFEFEF",
        "border-black":"#000000",
        "breadcrumb":'#BDBDBD',
        "status_green":"#50CD89",
        "status_red":"#FFF5F8",
        "status_redtext":"#F1416C",
        "img_text":"#666666",
        "noti_textgrey":"#7E8299",
        "badge_text":'#1C1C1CB2',
        "categorybg":"#FFFAF9"
      }
    },
  },
  plugins: [],
}

