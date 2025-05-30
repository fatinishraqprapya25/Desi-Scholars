import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./Constants";
import AnimatedButton from "./AnimatedButton";

const ResultsDisplay = ({ score, totalQuestions, percentage, onRetakeOrNewTest }) => (
    <motion.div
        className={`mt-10 p-6 sm:p-8 rounded-xl shadow-lg text-center border-2 border-opacity-30`}
        style={{
            background: `linear-gradient(to bottom right, ${COLORS.primaryLight}, #BFDBFE)`,
            borderColor: `${COLORS.primary}4D`,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
        <motion.p
            className={`text-3xl sm:text-4xl font-extrabold mb-3`}
            style={{ color: COLORS.primary }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
        >
            You Scored: {score} / {totalQuestions}
        </motion.p>
        <motion.p
            className={`text-5xl sm:text-6xl font-extrabold mb-6`}
            style={{ color: COLORS.accent }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.7 }}
        >
            {percentage.toFixed(0)}%
        </motion.p>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 font-medium">
            {percentage === 100
                ? "Absolutely brilliant! A perfect score! 🎉"
                : percentage >= 70
                    ? "Excellent work! You're doing great! 👍"
                    : percentage >= 50
                        ? "Good effort! A little more practice and you'll master it!"
                        : "Keep learning! Every attempt is a step forward. 🌱"}
        </p>

        <motion.button
            className={`px-8 py-3.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-md sm:text-lg`}
            style={{
                backgroundColor: COLORS.primary,
            }}
            onClick={onRetakeOrNewTest}
            whileHover={{ scale: 1.03, backgroundColor: COLORS.primaryDark }}
            whileTap={{ scale: 0.97 }}
        >
            Take Another Test
        </motion.button>
    </motion.div>
);

export default ResultsDisplay;