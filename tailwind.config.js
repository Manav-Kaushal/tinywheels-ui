/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
      colors: {
        primary: {
          100: "#ccf2ff",
          200: "#99e5ff",
          300: "#66d9ff",
          400: "#33ccff",
          500: "#00bfff",
          600: "#0099cc",
          700: "#007399",
          800: "#004c66",
          900: "#002633",
        },
        secondary: {
          100: "#f8d0d8",
          200: "#f1a1b1",
          300: "#ea728a",
          400: "#e34363",
          500: "#dc143c",
          600: "#b01030",
          700: "#840c24",
          800: "#580818",
          900: "#2c040c",
        },
        silver: {
          100: "#f2f2f2",
          200: "#e6e6e6",
          300: "#d9d9d9",
          400: "#cdcdcd",
          500: "#c0c0c0",
          600: "#9a9a9a",
          700: "#737373",
          800: "#4d4d4d",
          900: "#262626",
        },
        accent: {
          100: "#ffedcc",
          200: "#ffdb99",
          300: "#ffc966",
          400: "#ffb733",
          500: "#ffa500",
          600: "#cc8400",
          700: "#996300",
          800: "#664200",
          900: "#332100",
        },
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
