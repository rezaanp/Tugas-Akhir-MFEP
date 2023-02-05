/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'tmr': ['Times New Roman']
      },
      height: {
        110: "12%",
        910: "88%",
        610: "60%",
        710: "70%",
        810: "80%",
      },
      width: {
        210: "20%",
        810: "80%",
      },
    },
  },
  plugins: [],
};
