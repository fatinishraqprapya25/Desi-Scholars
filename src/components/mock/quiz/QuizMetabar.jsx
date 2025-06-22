// src/components/quiz/QuizMetadataBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa'; // For the chronological button arrow

// Define colors for consistency based on screenshots
const COLORS = {
    metadataBarBg: '#6C5DA9', // Dark purple from screenshot
    metadataText: '#FFFFFF',  // White text
    chronologicalBtnBg: '#8C52FF', // Darker purple for the button
    chronologicalBtnHoverBg: '#7A45E5',
    chronologicalBorder: '#A37FFF', // Lighter purple for border
};

/**
 * QuizMetadataBar Component
 * Displays key metadata about the current quiz question.
 *
 * @param {object} props - The component props.
 * @param {string} props.questionId - The ID of the question.
 * @param {string} props.domain - The domain of the question.
 * @param {string} props.skill - The skill tested by the question.
 * @param {string} props.difficulty - The difficulty level (e.g., 'E').
 * @param {string} props.scoreBand - The score band (e.g., '1').
 * @param {function} props.onChronologicalClick - Callback for the "Chronological" button.
 */
export default function QuizMetadataBar({
    questionId,
    domain,
    skill,
    difficulty,
    scoreBand,
    onChronologicalClick,
}) {
    // Animation variants for staggered appearance
    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <motion.div
            className="w-full py-3 px-4 md:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-4 border-b"
            style={{ backgroundColor: COLORS.metadataBarBg, borderColor: COLORS.chronologicalBorder }}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
            }}
        >
            {[
                { label: "QUESTION ID", value: questionId },
                { label: "DOMAIN", value: domain },
                { label: "SKILL", value: skill },
                { label: "DIFFICULTY", value: difficulty },
                { label: "SCORE BAND", value: scoreBand },
            ].map((item, index) => (
                <motion.div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left" variants={itemVariants}>
                    <span className="text-xs font-medium uppercase" style={{ color: COLORS.metadataText }}>{item.label}</span>
                    <span className="text-sm font-bold mt-0.5" style={{ color: COLORS.metadataText }}>
                        {item.label === "QUESTION ID" ? `#${item.value}` : item.value}
                    </span>
                </motion.div>
            ))}

            <motion.div variants={itemVariants}>
                {/* <motion.button
                    onClick={onChronologicalClick}
                    className="flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                    style={{ backgroundColor: COLORS.chronologicalBtnBg, color: COLORS.metadataText, border: `1px solid ${COLORS.chronologicalBorder}` }}
                    whileHover={{ scale: 1.05, backgroundColor: COLORS.chronologicalBtnHoverBg }}
                    whileTap={{ scale: 0.95 }}
                >
                    Chronological <FaChevronDown className="ml-2" />
                </motion.button> */}
            </motion.div>
        </motion.div>
    );
}