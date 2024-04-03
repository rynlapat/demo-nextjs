import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        teal: {
          100: "#b2dfdb",
        },
        grey: "#EBEBEB",
        // bghome: "#ecfdf4",
        bghome: "#f6f6e8",
        bguser: "",
        greencactus: "#BFF098",
        lightgreencactus: "#1EAE98",
      },
      screens: {
        phone: { max: "450px" },
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      // body: {
      //   "max-width": "fit-content", // Note: Wrap the property in quotes if it contains hyphens
      // },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
});
export default config;
