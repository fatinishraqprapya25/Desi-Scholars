// src/components/quiz/QuestionPromptAndPassage.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Define colors for consistency
const COLORS = {
    passageText: '#333333',
    questionPromptText: '#333333',
    arrowBg: '#F3F4F6', // Light gray for arrow background
    arrowBorder: '#D1D5DB', // Light gray border for arrow
    arrowColor: '#6B7280', // Dark gray for arrow icon
};

/**
 * QuestionPromptAndPassage Component
 * Displays the reading passage and the main question prompt.
 *
 * @param {object} props - The component props.
 * @param {string} props.passageText - The text of the reading passage.
 * @param {string} props.questionPrompt - The main question prompt text.
 * @param {function} props.onArrowClick - Callback for the column toggle arrow.
 * @param {string} [props.arrowDirection='right'] - 'left' or 'right' for the arrow icon.
 */
export default function QuestionPromptAndPassage({
    passageText,
    questionPrompt,
    onArrowClick,
    arrowDirection = 'right' // Default arrow pointing right
}) {
    return (
        <motion.div
            className="flex-grow relative px-4 md:px-6 lg:px-8 py-6 overflow-y-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
        >
            {/* Passage Text */}
            <div className="mb-8 leading-relaxed" style={{ color: COLORS.passageText }}>
                <p>{passageText}</p>
            </div>

            {/* Question Prompt */}
            <h3 className="text-lg font-semibold mb-4 leading-relaxed" style={{ color: COLORS.questionPromptText }}>
                {questionPrompt}
            </h3>

            {/* Column Toggle Arrow */}
            <motion.button
                onClick={onArrowClick}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full shadow-md z-10"
                style={{ backgroundColor: COLORS.arrowBg, borderColor: COLORS.arrowBorder, color: COLORS.arrowColor, border: '1px solid' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle content column"
            >
                {arrowDirection === 'right' ? (
                    <FaChevronRight className="w-4 h-4" /> // Assuming FaChevronRight is needed
                ) : (
                    <FaChevronLeft className="w-4 h-4" /> // Assuming FaChevronLeft is needed
                )}
            </motion.button>
        </motion.div>
    );
}

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';