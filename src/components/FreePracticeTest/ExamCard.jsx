import React from "react";
import { motion } from "framer-motion";

// Define a modern color palette for the component
const COLORS = {
    primary: "#6366F1", // Indigo-500
    primaryLight: "#EEF2FF", // Indigo-50
    secondary: "#10B981", // Emerald-500
    secondaryLight: "#ECFDF5", // Emerald-50
    accent: "#F59E0B", // Amber-500
    textDark: "#1F2937", // Gray-900 (Kept as per request)
    textMedium: "#4B5563", // Gray-700 (Kept as per request)
    textLight: "#6B7280", // Gray-500
    backgroundLight: "#F9FAFB", // Gray-50
    border: "#E5E7EB", // Gray-200
};

// Framer Motion variants for card animations
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1, // Staggered animation for better visual appeal
            duration: 0.6,
            ease: "easeOut",
        },
    }),
    hover: {
        scale: 1.03, // Slightly larger on hover
        boxShadow: `0px 20px 50px rgba(99, 102, 241, 0.25)`, // More prominent and softer shadow
        borderColor: COLORS.primary, // Primary color border on hover
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    tap: { scale: 0.97 },
};

export default function ExamCard({ exam, onClick, index }) {
    if (!exam) {
        console.error("ExamCard received undefined or null exam prop.");
        return null;
    }

    // Determine difficulty badge colors
    const difficultyColors = {
        Beginner: "bg-emerald-100 text-emerald-700",
        Intermediate: "bg-amber-100 text-amber-700",
        Advanced: "bg-rose-100 text-rose-700", // Using rose for advanced for better contrast
    };

    return (
        <motion.div
            key={exam.id}
            // Base styles for the card
            className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 cursor-pointer
                 border-2 border-transparent transition-all duration-300 ease-out
                 flex flex-col h-full overflow-hidden
                " // Ensure Inter font is applied - NOT CHANGED
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onClick(exam.id)}
            custom={index} // Pass index as custom prop for staggered animation
        >
            {/* Decorative background element (optional, for visual flair) */}
            <div
                className="absolute top-0 left-0 w-full h-2 rounded-t-3xl" // Adjusted rounded corners
                style={{ backgroundColor: COLORS.primary }}
            ></div>

            {/* Exam Icon Section */}
            <div className="flex justify-center items-center mb-6 mt-4">
                <motion.div
                    className="text-6xl p-5 rounded-full flex items-center justify-center" // Larger padding for icon, centered
                    style={{
                        backgroundColor: COLORS.primaryLight,
                        color: COLORS.primary,
                        minWidth: '80px', // Ensure consistent circle size
                        minHeight: '80px', // Ensure consistent circle size
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }} // Staggered icon animation
                >
                    {exam.icon}
                </motion.div>
            </div>

            {/* Exam Title */}
            <h2
                className="text-2xl sm:text-3xl font-extrabold text-center mb-3"
                style={{ color: COLORS.textDark }} // Font color NOT CHANGED
            >
                {exam.title}
            </h2>

            {/* Exam Description */}
            <p
                className="text-center mb-6 text-sm sm:text-base flex-grow leading-relaxed"
                style={{ color: COLORS.textMedium }} // Font color NOT CHANGED
            >
                {exam.description}
            </p>

            {/* Footer with Questions and Difficulty */}
            <div className="flex justify-between items-center mt-auto pt-5 border-t border-gray-200">
                {/* Questions Count */}
                <span
                    className={`text-sm sm:text-md font-semibold px-3 py-1.5 rounded-full`} // Pill-shaped badge
                    style={{
                        color: COLORS.primary, // Font color NOT CHANGED
                        backgroundColor: COLORS.primaryLight,
                    }}
                >
                    {exam.questions.length} Questions
                </span>

                {/* Difficulty Badge */}
                <span
                    className={`text-sm sm:text-md font-semibold px-3 py-1.5 rounded-full
                      ${difficultyColors[exam.difficulty] || "bg-gray-100 text-gray-700"}
                     `} // Dynamic colors based on difficulty, font color NOT CHANGED
                >
                    {exam.difficulty}
                </span>
            </div>
        </motion.div>
    );
};


