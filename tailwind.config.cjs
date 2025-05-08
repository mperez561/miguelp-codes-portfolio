/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",      // Very Dark Blue
        secondary: "#1E293B",    // Dark Blue/Slate
        accent: "#38BDF8",       // Sky Blue
        highlight: "#0EA5E9",    // Deeper Blue
        highlight_alt: "#2DD4BF", // Teal
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 