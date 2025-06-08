// src/components/quiz/QuizActionButtons.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaExclamationCircle, FaPencilAlt, FaFlag } from 'react-icons/fa'; // Icons for buttons

// Define colors for consistency
const COLORS = {
    unattemptedBg: '#EF5350', // Red from screenshot
    unattemptedHoverBg: '#E53935',
    actionBtnBg: '#FFFFFF', // White background for most action buttons
    actionBtnText: '#6C5DA9', // Purple text for action buttons
    actionBtnBorder: '#D1D5DB', // Light gray border
    actionBtnHoverBg: '#F3F4F6', // Light gray on hover
};

/**
 * QuizActionButtons Component
 * Displays action buttons related to the current question (Unattempted, Mark for Review, Post Doubt, Report, Edit).
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isUnattempted - State for "Unattempted" (might change to attempted/unattempted status).
 * @param {boolean} props.isMarkedForReview - State for "Mark for Review".
 * @param {boolean} props.isPostDoubt - State for "Post Doubt".
 * @param {function} props.onToggleAttempted - Callback to mark as attempted/unattempted.
 * @param {function} props.onToggleMarkForReview - Callback to toggle mark for review.
 * @param {function} props.onPostDoubt - Callback for "Post Doubt".
 * @param {function} props.onReport - Callback for "Report".
 * @param {function} props.onEdit - Callback for "Edit" (pencil icon).
 */
export default function QuizActionButtons({
    isUnattempted, // Assuming this controls the visual state
    isMarkedForReview,
    isPostDoubt,
    onToggleAttempted,
    onToggleMarkForReview,
    onPostDoubt,
    onReport,
    onEdit,
}) {
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } }
    };

    return (
        <motion.div
            className="flex flex-wrap justify-center gap-2 mb-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { staggerChildren: 0.1, delayChildren: 0.2 }
            }}
        >
            <motion.button
                onClick={onToggleAttempted}
                className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-sm shadow-sm"
                style={{
                    backgroundColor: isUnattempted ? COLORS.unattemptedBg : COLORS.actionBtnBg,
                    color: isUnattempted ? 'white' : COLORS.actionBtnText,
                    border: `1px solid ${isUnattempted ? COLORS.unattemptedBg : COLORS.actionBtnBorder}`
                }}
                whileHover={{ scale: 1.05, backgroundColor: isUnattempted ? COLORS.unattemptedHoverBg : COLORS.actionBtnHoverBg }}
                whileTap={{ scale: 0.95 }}
                variants={buttonVariants}
            >
                {/* Icon changes based on state, e.g., FaCheck for Attempted */}
                <FaExclamationCircle /> {isUnattempted ? 'Unattempted' : 'Attempted'}
            </motion.button>

            <motion.button
                onClick={onToggleMarkForReview}
                className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-sm shadow-sm"
                style={{
                    backgroundColor: isMarkedForReview ? COLORS.actionBtnText : COLORS.actionBtnBg, // Invert colors for marked
                    color: isMarkedForReview ? 'white' : COLORS.actionBtnText,
                    border: `1px solid ${isMarkedForReview ? COLORS.actionBtnText : COLORS.actionBtnBorder}`
                }}
                whileHover={{ scale: 1.05, backgroundColor: isMarkedForReview ? COLORS.actionBtnText : COLORS.actionBtnHoverBg }}
                whileTap={{ scale: 0.95 }}
                variants={buttonVariants}
            >
                <FaBookmark /> Mark for Review
            </motion.button>

            <motion.button
                onClick={onPostDoubt}
                className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-sm shadow-sm"
                style={{
                    backgroundColor: isPostDoubt ? COLORS.actionBtnText : COLORS.actionBtnBg, // Invert colors for doubted
                    color: isPostDoubt ? 'white' : COLORS.actionBtnText,
                    border: `1px solid ${isPostDoubt ? COLORS.actionBtnText : COLORS.actionBtnBorder}`
                }}
                whileHover={{ scale: 1.05, backgroundColor: isPostDoubt ? COLORS.actionBtnText : COLORS.actionBtnHoverBg }}
                whileTap={{ scale: 0.95 }}
                variants={buttonVariants}
            >
                Post Doubt
            </motion.button>

            <motion.button
                onClick={onReport}
                className="px-3 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm"
                style={{
                    backgroundColor: COLORS.actionBtnBg,
                    color: COLORS.actionBtnText,
                    border: `1px solid ${COLORS.actionBtnBorder}`
                }}
                whileHover={{ scale: 1.05, backgroundColor: COLORS.actionBtnHoverBg }}
                whileTap={{ scale: 0.95 }}
                variants={buttonVariants}
            >
                <FaFlag />
            </motion.button>

            <motion.button
                onClick={onEdit}
                className="px-3 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm"
                style={{
                    backgroundColor: COLORS.actionBtnBg,
                    color: COLORS.actionBtnText,
                    border: `1px solid ${COLORS.actionBtnBorder}`
                }}
                whileHover={{ scale: 1.05, backgroundColor: COLORS.actionBtnHoverBg }}
                whileTap={{ scale: 0.95 }}
                variants={buttonVariants}
            >
                <FaPencilAlt />
            </motion.button>
        </motion.div>
    );
}