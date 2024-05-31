/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'button-primary-default': '#60565A',
        'button-secondary-default': '#60565A'
      },
      backgroundColor: {
        default: '#FEF3C7',
        'button-primary-default': '#60565A',
        'button-secondary-default': '#FFFFFF'
      },
      textColor: {
        default: '#60565A',
        'button-primary-default': '#FFFFFF',
        'button-secondary-default': '#60565A'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  }
};
