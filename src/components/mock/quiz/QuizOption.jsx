// src/components/quiz/QuizOption.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Define colors for consistency
const COLORS = {
    optionBg: '#FFFFFF',
    optionBorder: '#D1D5DB', // Light gray
    optionSelectedBorder: '#3B82F6', // Blue-500 for selected
    optionSelectedBg: '#EFF6FF', // Blue-50 for selected background
    optionText: '#333333',
    optionLetterBg: '#F3F4F6', // Light gray for the letter circle
    optionLetterText: '#6B7280', // Dark gray for letter
};

/**
 * QuizOption Component
 * Displays a single multiple-choice answer option.
 *
 * @param {object} props - The component props.
 * @param {string} props.optionLetter - The letter for the option (e.g., 'A', 'B').
 * @param {string} props.optionText - The text content of the option.
 * @param {boolean} props.isSelected - If true, applies selected styling.
 * @param {function} props.onSelect - Callback when this option is clicked.
 */
export default function QuizOption({ optionLetter, optionText, isSelected, onSelect }) {
    return (
        <motion.div
            className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected ? 'shadow-md' : 'shadow-sm hover:shadow-md'
                }`}
            style={{
                backgroundColor: isSelected ? COLORS.optionSelectedBg : COLORS.optionBg,
                borderColor: isSelected ? COLORS.optionSelectedBorder : COLORS.optionBorder,
            }}
            onClick={onSelect}
            whileHover={{ scale: isSelected ? 1 : 1.01 }} // Slightly larger hover for unselected
            whileTap={{ scale: 0.99 }}
        >
            <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3"
                style={{
                    backgroundColor: isSelected ? COLORS.optionSelectedBorder : COLORS.optionLetterBg,
                    color: isSelected ? 'white' : COLORS.optionLetterText,
                }}
            >
                {optionLetter}
            </div>
            <p className="flex-grow text-base" style={{ color: COLORS.optionText }}>
                {optionText}
            </p>
        </motion.div>
    );
}