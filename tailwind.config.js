/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                inter: "Inter",
                sansation: "Sansation"
            },
            colors: {
                bg: {
                    dark: "#000000",
                    light: "#fbfbfe"
                },
                accent: "#6f55b5",
                primary: {
                    dark: "#fcfdff",
                    light: "#000000"
                },
                secondary: {
                    dark: "#888794",
                    light: "#6b6b7b"
                },
                card: {
                    dark: "#1f2028",
                    light: "#e4e6ef"
                },
                field: {
                    dark: "#323743",
                    light: "#d1d1d6"
                },
                button: {
                    hover: "#5e46a0"
                },
                "secondary-button": {
                    DEFAULT: "#323743",
                    hover: "#2b303b",
                    hoverLight: "#bbbbc3"
                },
                link: {
                    DEFAULT: "#6950ab",
                    hover: "#7c59c9"
                }
            }
        }
    },

    plugins: []
}
