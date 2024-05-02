module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      AlfaSlab: ['AlfaSlab'],
      CourierPrime: ['CourierPrime'],
    },
    extend: {
      colors: {
        'custom-green-board-top': '#0b863e',
        'custom-green-board-bottom': '#054420',
        'custom-yellow-border': '#fff48d',
        'custom-yellow-deal': '#f0ce4a',
        'custom-yellow-reset': '#f0ce4a',
        'custom-red': '#f64141',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translate(0, -100px)', opacity: 0 },
          '100%': { transform: 'translate(0, 0px)', opacity: 1 },
        },
      },
      animation: {
        'slide-in': 'slideIn 200ms ease-in-out forwards ',
      },
    },
  },
  plugins: [],
};
