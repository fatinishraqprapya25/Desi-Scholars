// src/components/quiz/QuizHeader.jsx (Restored Buttons)
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Import relevant icons for the buttons
import { FaLightbulb, FaBookOpen, FaCalculator } from 'react-icons/fa';

// Define colors (can still be imported from a central file if you have one)
const COLORS = {
    headerBg: '#F8F7FA', // A very light purple/off-white background color seen in the screenshot
    borderColor: '#E6E6E6', // A light gray border color
    textPrimary: '#333333', // Dark text for titles
    timerText: '#333333', // Darker text for timer
    warning: '#EF4444', // Red for low timer
    buttonBg: '#FFFFFF', // White background for buttons
    buttonBorder: '#D1D5DB', // Light gray border for buttons
    buttonHoverBg: '#F3F4F6', // Light gray on hover
};

export default function QuizHeader({ quizTitle, initialTime, showCalculator }) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    // Timer logic
    useEffect(() => {
        // Reset time if initialTime changes (e.g., loading a new quiz)
        setTimeRemaining(initialTime);
    }, [initialTime]);

    useEffect(() => {
        let timerId;
        // Timer runs as long as timeRemaining > 0
        if (timeRemaining > 0) {
            timerId = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timerId);
                        // Timer stops at 00:00. No onTimeUp callback as per simplified requirements.
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerId); // Cleanup on unmount
    }, [timeRemaining]); // Only dependent on timeRemaining

    // Format time for display (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Determine timer color based on time remaining
    const getTimerColorClass = () => {
        if (timeRemaining <= 30) return `${COLORS.warning} font-extrabold animate-pulse`; // Less than 30 seconds
        return `${COLORS.timerText} font-bold`; // Default
    };

    return (
        <motion.header
            className="w-full py-3 px-4 md:px-6 lg:px-8 flex items-center justify-between sticky top-0 border-b"
            style={{ backgroundColor: COLORS.headerBg, borderColor: COLORS.borderColor }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        >
            {/* Left Section: Quiz Title */}
            <motion.div
                className="flex flex-col items-start"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className="text-xl sm:text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
                    {quizTitle}
                </h1>
                {/* "Information" section still removed as per simplified requirements */}
            </motion.div>

            {/* Middle Section: Timer (always visible, no hide button) */}
            <motion.div
                className="flex flex-col items-center justify-center flex-grow mx-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className={`text-3xl sm:text-4xl ${getTimerColorClass()}`}>
                    {formatTime(timeRemaining)}
                </div>
                {/* "Hide" button still removed */}
            </motion.div>

            {/* Right Section: Buttons (Restored) */}
            <motion.div
                className="flex items-center space-x-3 flex-shrink-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <motion.button onClick={showCalculator}

                    className="flex items-center px-4 py-2 rounded-full border font-semibold text-sm sm:text-base"
                    style={{
                        backgroundColor: COLORS.buttonBg,
                        borderColor: COLORS.buttonBorder,
                        color: COLORS.textPrimary
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: COLORS.buttonHoverBg }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaCalculator className="mr-2" /> Calculator
                </motion.button>
            </motion.div>
        </motion.header>
    );
}