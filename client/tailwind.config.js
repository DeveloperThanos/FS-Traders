module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#F5F5F5",
        button: "#1E56A0",
        primary: "#03122F",
        secondary: "#07261B",
        text: {
          DEFAULT: "#242E49",  
          light: "#526377",    
        },
        icon: {
          light: "#A0AEC0", 
        },
      },
    },
  },
  plugins: [],
}
