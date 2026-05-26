/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            colors: {
                navy: "#2E4F8F",
                "navy-hover": "#3a5fa8",
                "blue-mid": "#4F73B3",
                "blue-light": "#6E90C5",
            },
            letterSpacing: {
                ultrawide: "0.4em",
                superwide: "0.3em",
                xwide: "0.25em",
                wider2: "0.2em",
                wide2: "0.15em",
                mid: "0.1em",
                small: "0.06em",
                micro: "0.02em",
            },
        },
    },
    plugins: [],
};
