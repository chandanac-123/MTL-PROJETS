/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  important:true,
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '553px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        mobile: '970px',
      },
      backgroundImage: {
        'hero-pattern': "url('../../Static/Images/authbg.svg')"
      },
      colors: {
        "primary": "#009EF7",
        "secondary": "#7E8299",
        "color-green": "#00C47D",
        "color-white": "#FFFFFF",
        "color-light-gray": "#F9FAFB",
        "income-card-bg": "#F6E5CA",
        "income-card-strand": "#F6C000",
        "expense-card-bg": "#F4D7F0",
        "expense-card-strand": "#7239EA",
        "onhand-card-bg": "#CBDFE2",
        "onhand-card-strand": "#009EF7",
        "monthly-card-bg": "#FFEBEB",
        "monthly-red": "#EC305E",
        "color-rellow": "#F6C000",
        "color-pink": '#EC305E',
        "color-orange": "#FC3C00",
        "color-purple": "#7239EA",
        "color-gray": "#DDDDDD",
        "color-light-blue":"#F1FAFF",
        "search-bg-color":"#F1F1F1",
        "button-secondary":"#EEF6FF",
        "text-color-secondary":"#666666",
        "text-extra-light":'#BBBBBB',
        "color-black":'#071437',
        "bg-color-green":'#E8FFF3',
        "dark-shade-grey": "#222222",
        "text-dark-secondary":"#3F4254",
        "light-yellow-bg": "#FFF8DD",
        "paid-green": "#50CD89",
        "light-green-bg": "#E8FFF3",
        "Gray60-color": "#999999",
        "upload_bg":"#D9D9D9",
        "dodger-blue": "#3E97FF"
      }
    },
    
  },
  plugins: [],
}

