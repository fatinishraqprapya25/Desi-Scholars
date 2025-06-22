// tailwind.config.js (Make sure this file is updated as described in the previous response)

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#007aff',
                'primary-blue-darker': '#005cb3',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                'pulse-subtle': 'pulseSubtle 2s infinite',
                'wobble-y': 'wobbleY 1s ease-in-out infinite',
                'border-pulse': 'borderPulse 2s infinite',
                'spin-slow-reverse': 'spin-reverse 10s linear infinite', // Added or ensured
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                pulseSubtle: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.01)' },
                },
                wobbleY: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '15%': { transform: 'translateY(-5px)' },
                    '30%': { transform: 'translateY(0)' },
                    '45%': { transform: 'translateY(-2px)' },
                    '60%': { transform: 'translateY(0)' },
                },
                borderPulse: {
                    '0%, 100%': { 'border-color': 'rgba(139, 92, 246, 0.6)' }, // purple-500 with opacity
                    '50%': { 'border-color': 'rgba(236, 72, 153, 0.8)' }, // pink-500 with opacity
                },
                'spin-reverse': { // Keyframe for reverse spin
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(-360deg)' },
                }
            }
        },
    },
    plugins: [],
}