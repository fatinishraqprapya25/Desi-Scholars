// tailwind.config.js (Make sure this file is updated as described in the previous response)

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Make sure this path covers your React components
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#007aff',
                'primary-blue-darker': '#005cb3',
            },
        },
    },
    plugins: [],
};