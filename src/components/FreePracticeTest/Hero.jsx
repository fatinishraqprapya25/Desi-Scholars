import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton"; // Ensure this path is correct
import { COLORS } from "./Constants"; // Ensure this path and export are correct

const HeroSection = () => {
    // Fallback colors in case Constants.js is not fully configured
    const primaryColor = COLORS.primary || '#4F46E5'; // Example: Tailwind indigo-600
    const primaryLightColor = COLORS.primaryLight || '#A78BFA'; // Example: Tailwind violet-400
    const secondaryColor = COLORS.secondary || '#10B981'; // Example: Tailwind emerald-500
    const secondaryLightColor = COLORS.secondaryLight || '#6EE7B7'; // Example: Tailwind emerald-300

    // Animation variants for staggered appearance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.section
            className="relative w-full min-h-[700px] flex items-center justify-center overflow-hidden" // Increased min-height for grander presence
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Dynamic, multi-layered background spanning the full width */}
            <div
                className="absolute inset-0 z-0 opacity-95" // Higher opacity for more vibrant colors
                style={{
                    backgroundImage: `
                        url('data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23ffffff" fill-opacity="0.07" d="M0 0h16v16H0z" /%3E%3C/svg%3E'), /* Subtle dot pattern */
                        linear-gradient(160deg, ${primaryColor} 0%, ${primaryLightColor} 100%), /* Main gradient */
                        radial-gradient(circle at 10% 20%, ${secondaryLightColor} 0%, transparent 40%), /* Top-left highlight */
                        radial-gradient(circle at 90% 80%, #BFDBFE 0%, transparent 50%) /* Bottom-right highlight */
                    `,
                    backgroundBlendMode: 'overlay, normal, normal, normal, normal', // How the textures blend
                    backgroundSize: 'auto, cover, cover, cover', // Ensure gradients cover the area
                    backgroundPosition: 'center, center, center, center',
                }}
            ></div>

            {/* Abstract shapes / blobs - adjusted for full-width impact and more organic movement */}
            <div className="absolute -top-1/3 -left-[15%] w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob-alt animation-delay-2000"></div>
            <div className="absolute -bottom-1/3 -right-[15%] w-[550px] h-[550px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob-alt animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob-alt animation-delay-6000"></div>

            {/* Content remains centered, now with appropriate horizontal padding */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-16">
                <motion.h2
                    // Decreased line height using leading-none
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-none tracking-tight drop-shadow-2xl"
                    variants={itemVariants}
                >
                    Master Your Knowledge
                </motion.h2>
                <motion.p
                    className="text-xl sm:text-2xl md:text-3xl text-white text-opacity-95 mb-12 max-w-4xl mx-auto font-light drop-shadow-lg" // Slightly increased opacity for better contrast
                    variants={itemVariants}
                >
                    Prepare for success with our free, comprehensive online tests. Sharpen your skills, identify areas for improvement, and achieve academic excellence.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <AnimatedButton
                        onClick={() =>
                            window.scrollTo({
                                top: document.getElementById("exams-list-section")?.offsetTop - 100 || 0,
                                behavior: "smooth",
                            })
                        }
                        // Enhanced button styling for a more lucrative look
                        className="text-xl px-16 py-6 font-extrabold rounded-full shadow-2xl
                                   bg-gradient-to-r from-blue-600 to-indigo-700 text-white
                                   hover:from-blue-700 hover:to-indigo-800
                                   hover:shadow-primary-3xl transition-all duration-300
                                   transform hover:scale-105 active:scale-95 active:shadow-inner
                                   focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
                        style={{ letterSpacing: '0.08em' }} // Increased letter spacing for button text
                    >
                        Begin Your Test Now
                    </AnimatedButton>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
