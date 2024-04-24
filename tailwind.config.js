/* eslint-disable no-undef */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        gabarito: ['Gabarito', 'sans-serif'],
      },

    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 
  plugins: [
    require('daisyui'),
    
  ],
  daisyui: {
    themes: ["cupcake", "dark", "bumblebee","cmyk"],
  },
  

};

 
