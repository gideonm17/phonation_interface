/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'parchment': '#f4ecc2',
                'ink': '#2a2a2a',
                'galen-red': '#8b0000',
                'active-blue': '#0077be',
            },
            fontFamily: {
                serif: ['"Crimson Text"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
