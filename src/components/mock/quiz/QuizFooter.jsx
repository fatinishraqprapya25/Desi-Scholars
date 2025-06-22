// src/components/quiz/QuizFooter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaChevronUp, FaChevronDown, FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa'; // Icons for buttons

// Define colors to match the screenshot's theme
const COLORS = {
    footerBg: '#F8F7FA', // A very light purple/off-white background
    borderColor: '#E6E6E6', // Light gray border
    exitBtnBg: '#EF5350', // Red/pink color for Exit
    exitBtnHoverBg: '#E53935', // Darker red on hover
    questionNavBg: '#2C3A4F', // Dark background for central button
    questionNavText: '#FFFFFF', // White text for central button
    navBtnBack: '#D4BFFF', // Lightest purple for Back
    navBtnCheck: '#A37FFF', // Medium purple for Check
    navBtnNext: '#8C52FF', // Darkest purple for Next
    navBtnText: '#FFFFFF', // White text for nav buttons
    disabledBg: '#E0E0E0', // Gray for disabled buttons
    disabledText: '#A0A0A0', // Lighter gray for disabled text
};

/**
 * QuizFooter Component
 * Displays navigation controls and quiz progress at the bottom of the quiz interface.
 *
 * @param {object} props - The component props.
 * @param {number} props.currentQuestionIndex - The current question number (1-indexed).
 * @param {number} props.totalQuestions - The total number of questions in the quiz.
 * @param {function} props.onExitClick - Callback for the "Exit" button.
 * @param {function} props.onQuestionNavClick - Callback for the central question progress button (e.g., to open a question list).
 * @param {function} props.onBackClick - Callback for the "Back" button.
 * @param {function} props.onCheckClick - Callback for the "Check" button.
 * @param {function} props.onNextClick - Callback for the "Next" button.
 * @param {boolean} [props.isBackDisabled=false] - If true, the "Back" button will be disabled.
 * @param {boolean} [props.isNextDisabled=false] - If true, the "Next" button will be disabled.
 * @param {boolean} [props.isCheckDisabled=false] - If true, the "Check" button will be disabled.
 * @param {boolean} [props.isQuestionNavExpanded=false] - To show up/down arrow for question nav button.
 */
export default function QuizFooter({
    currentQuestionIndex,
    totalQuestions,
    onExitClick,
    onQuestionNavClick,
    onBackClick,
    onNextClick,
    isBackDisabled = false,
    isNextDisabled = false,
    isCheckDisabled = false,
    isQuestionNavExpanded = false, // Added for the arrow icon
}) {
    return (
        <motion.footer
            className="w-full py-3 px-4 md:px-6 lg:px-8 flex items-center justify-between sticky bottom-0 z-50 border-t"
            style={{ backgroundColor: COLORS.footerBg, borderColor: COLORS.borderColor }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        >
            {/* Left Section: Exit Button */}
            <motion.div
                className="flex-shrink-0"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.button
                    onClick={onExitClick}
                    className="px-6 py-3 rounded-xl text-white font-semibold transition-colors duration-300 flex items-center gap-2 text-base shadow-md"
                    style={{ backgroundColor: COLORS.exitBtnBg }}
                    whileHover={{ scale: 1.05, backgroundColor: COLORS.exitBtnHoverBg }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaSignOutAlt /> Exit
                </motion.button>
            </motion.div>

            {/* Middle Section: Question Progress Indicator */}
            <motion.div
                className="flex items-center justify-center flex-grow mx-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.button
                    onClick={onQuestionNavClick}
                    className="px-8 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-2 text-base shadow-md"
                    style={{ backgroundColor: COLORS.questionNavBg, color: COLORS.questionNavText }}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Question {currentQuestionIndex} of {totalQuestions}
                    {isQuestionNavExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                </motion.button>
            </motion.div>

            {/* Right Section: Navigation Buttons */}
            <motion.div
                className="flex items-center space-x-3 flex-shrink-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <motion.button
                    onClick={onBackClick}
                    disabled={isBackDisabled}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 text-base shadow-md ${isBackDisabled ? 'cursor-not-allowed' : ''}`}
                    style={{
                        backgroundColor: isBackDisabled ? COLORS.disabledBg : COLORS.navBtnBack,
                        color: isBackDisabled ? COLORS.disabledText : COLORS.navBtnText,
                    }}
                    whileHover={!isBackDisabled ? { scale: 1.05, boxShadow: '0 5px 10px rgba(163,127,255,0.2)' } : {}}
                    whileTap={!isBackDisabled ? { scale: 0.95 } : {}}
                >
                    <FaArrowLeft /> Back
                </motion.button>

                <motion.button
                    onClick={onNextClick}
                    disabled={isNextDisabled}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 text-base shadow-md ${isNextDisabled ? 'cursor-not-allowed' : ''}`}
                    style={{
                        backgroundColor: isNextDisabled ? COLORS.disabledBg : COLORS.navBtnNext,
                        color: isNextDisabled ? COLORS.disabledText : COLORS.navBtnText,
                    }}
                    whileHover={!isNextDisabled ? { scale: 1.05, boxShadow: '0 5px 10px rgba(140,82,255,0.4)' } : {}}
                    whileTap={!isNextDisabled ? { scale: 0.95 } : {}}
                >
                    Next <FaArrowRight />
                </motion.button>
            </motion.div>
        </motion.footer>
    );
}