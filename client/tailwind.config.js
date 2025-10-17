/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'text-light': 'var(--color-text-light)',
        'text-dark': 'var(--color-text)',
      },
      backgroundColor: {
        primary: 'var(--color-primary)',
      },
      textColor: {
        primary: 'var(--color-primary)',
        'text-light': 'var(--color-text-light)',
      },
    },
  },
  plugins: [],
};
