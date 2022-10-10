module.exports = {
    darkMode: "class",
    content: [
        "./src/*.{xml,html,js}",
        "./src/partials/*/*.{xml,html,js}",
        "./src/partials/*/*/*.{xml,html,js}",
        "./src/assets/scripts/**/*.{xml,html,js}",


        // "./build/scripts/auth.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rubik', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
            },
            colors: {
                colorKey: 'var(--colorKey)',
                colorBackground: 'var(--colorBackground)',
                colorText: 'var(--colorText)',
                colorMeta: 'var(--colorMeta)',
                colorBorder: 'var(--colorBorder)',
                
                colorColorModeDarkKey: 'var(--colorKey)',
                colorColorModeDarkBackground: 'var(--colorColorModeDarkBackground)',
                colorColorModeDarkText: 'var(--colorColorModeDarkText)',
                colorColorModeDarkMeta: 'var(--colorColorModeDarkMeta)',
                colorColorModeDarkBorder: 'var(--colorColorModeDarkBorder)',
            },
        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/line-clamp'),
    ],
}