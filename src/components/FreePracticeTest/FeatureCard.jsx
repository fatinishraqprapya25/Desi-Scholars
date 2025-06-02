import React from "react";
import { motion } from "framer-motion";

// Define a modern color palette for the component
const COLORS = {
    primary: "#6366F1", // Indigo-500
    primaryLight: "#EEF2FF", // Indigo-50
    secondary: "#6366F1", // Emerald-500 - Note: This is the same as primary, assuming intentional
    secondaryLight: "#ECFDF5", // Emerald-50
    accent: "#F59E0B", // Amber-500
    textDark: "#1F2937", // Gray-900
    textMedium: "#4B5563", // Gray-700
    textLight: "#6B7280", // Gray-500
    backgroundLight: "#F9FAFB", // Gray-50
    border: "#E5E7EB", // Gray-200
};

const FeatureCard = ({ feature }) => (
    <motion.div
        key={feature.title}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg text-center
                   border-2 border-transparent transition-all duration-300 ease-out
                   flex flex-col items-center h-full font-inter" // Increased rounded corners, refined shadow, added font-inter
        initial={{ opacity: 0, y: 50 }} // Consistent initial animation
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: feature.delay || 0, duration: 0.6, ease: "easeOut" }}
        whileHover={{
            scale: 1.03, // Slightly more pronounced scale on hover for a premium feel
            boxShadow: `0px 20px 40px rgba(0, 0, 0, 0.1)`, // Deeper, more luxurious shadow on hover
            borderColor: COLORS.primary, // Changed border color to primary on hover for consistency
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        }}
        whileTap={{ scale: 0.98 }} // Slight shrink on tap
    >
        {/* Feature Icon Section */}
        <div className="flex justify-center items-center mb-6">
            <motion.div
                className="text-4xl p-4 rounded-2xl flex items-center justify-center shadow-md" // Larger padding, more rounded, added subtle shadow
                style={{
                    backgroundColor: COLORS.secondaryLight, // Use secondary light color for icon background
                    color: COLORS.secondary, // Use secondary color for icon
                    minWidth: '72px', // Increased size for more prominence
                    minHeight: '72px', // Increased size for more prominence
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (feature.delay || 0) + 0.2, duration: 0.5 }} // Staggered icon animation
                whileHover={{
                    scale: 1.1, // Icon itself slightly scales on card hover
                    rotate: 5, // Subtle rotation for engagement
                    transition: { duration: 0.2 }
                }}
            >
                {feature.icon}
            </motion.div>
        </div>

        {/* Feature Title */}
        <h3
            className="text-xl sm:text-2xl font-semibold mb-3 tracking-wide" // Slightly less bold, added letter spacing
            style={{ color: COLORS.textDark }}
        >
            {feature.title}
        </h3>

        {/* Feature Description */}
        <p
            className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow px-2" // Added horizontal padding for better readability
            style={{ color: COLORS.textMedium }}
        >
            {feature.text}
        </p>
    </motion.div>
);

export default FeatureCard;
