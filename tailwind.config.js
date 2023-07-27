/** @type {import('tailwindcss').Config} */

const colors = {
  curiousGreen: {
    DEFAULT: "#339b38"
  },
  curiousCyan: {
    DEFAULT: "#40859B"
  }
}
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        curiousGreen: colors.curiousGreen,
        curiousCyan: colors.curiousCyan
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"]
  }
}


