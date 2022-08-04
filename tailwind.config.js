/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/*.{xml,html,js}",
        "./src/partials/*/*.{xml,html,js}",
        "./src/partials/*/*/*.{xml,html,js}",
        "./src/assets/scripts/**/*.{xml,html,js}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/line-clamp'),
    ],
}