module.exports = {
    darkMode: "class",
    content: [
        "./src/*.{xml,html,js}",
        "./src/partials/*/*.{xml,html,js}",
        "./src/partials/*/*/*.{xml,html,js}",
        "./src/assets/scripts/**/*.{xml,html,js}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rubik', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
            },
            colors: {
                defaultColorBackground: 'var(--defaultColorBackground)',
            },
        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/line-clamp'),
    ],
}