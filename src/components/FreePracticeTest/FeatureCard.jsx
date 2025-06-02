import React from "react";
import { motion } from "framer-motion";

// Define a modern color palette for the component
const COLORS = {
    primary: "#6366F1", // Indigo-500
    primaryLight: "#EEF2FF", // Indigo-50
    secondary: "#6366F1", // Emerald-500
    secondaryLight: "#ECFDF5", // Emerald-50
    accent: "#F59E0B", // Amber-500
    textDark: "#1F2937", // Gray-900 (Kept as per previous request)
    textMedium: "#4B5563", // Gray-700 (Kept as per previous request)
    textLight: "#6B7280", // Gray-500
    backgroundLight: "#F9FAFB", // Gray-50
    border: "#E5E7EB", // Gray-200
};

const FeatureCard = ({ feature }) => (
    <motion.div
        key={feature.title}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center
               border-2 border-transparent transition-all duration-300 ease-out
               flex flex-col items-center h-full" // Ensure Inter font is applied - NOT CHANGED
        initial={{ opacity: 0, y: 50 }} // Consistent initial animation
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: feature.delay || 0, duration: 0.6, ease: "easeOut" }}
        whileHover={{
            scale: 1.02, // Slightly less scale on hover
            boxShadow: `0px 15px 30px rgba(0, 0, 0, 0.08)`, // Softer, more subtle shadow
            borderColor: COLORS.secondary, // Change border color to secondary on hover
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
                className="text-4xl p-3 rounded-xl flex items-center justify-center" // Smaller icon, square background with rounded corners
                style={{
                    backgroundColor: COLORS.secondaryLight, // Use secondary light color for icon background
                    color: COLORS.secondary, // Use secondary color for icon
                    minWidth: '60px', // Ensure consistent size
                    minHeight: '60px', // Ensure consistent size
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (feature.delay || 0) + 0.2, duration: 0.5 }} // Staggered icon animation
            >
                {feature.icon}
            </motion.div>
        </div>

        {/* Feature Title */}
        <h3
            className="text-xl sm:text-2xl font-bold mb-3" // Slightly less bold font weight
            style={{ color: COLORS.textDark }} // Font color NOT CHANGED
        >
            {feature.title}
        </h3>

        {/* Feature Description */}
        <p
            className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow" // Added flex-grow for consistent height
            style={{ color: COLORS.textMedium }} // Font color NOT CHANGED
        >
            {feature.text}
        </p>
    </motion.div>
);


export default FeatureCard;
