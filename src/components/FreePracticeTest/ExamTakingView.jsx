import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./constants";
import QuestionItem from "./QuestionItem";
import ResultsDisplay from "./ResultDisplay"; // Assuming this is the correct import name
import AnimatedButton from "./AnimatedButton";

const ExamTakingView = ({
    selectedExam,
    answers,
    submitted,
    isLoading,
    handleAnswer,
    handleSubmit,
    handleRetakeOrNewTest,
    score,
    totalQuestions,
    percentage,
}) => {
    // Add this check at the beginning of the component
    if (!selectedExam) {
        // If selectedExam is undefined or null, display a message or return null.
        // This prevents the component from crashing.
        return (
            <motion.div
                key="exam-error"
                className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-red-300 flex-grow flex items-center justify-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
            >
                <p className="text-red-600 font-semibold text-lg">
                    Error: Exam details are not available. Please go back and select an exam.
                </p>
            </motion.div>
        );
    }

    // Rest of your component logic remains the same
    return (
        <motion.div
            key="exam-detail"
            className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-${COLORS.border.replace("#", "")} flex-grow`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b-2 border-${COLORS.primaryLight.replace("#", "")}`}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3 mb-4 sm:mb-0">
                    {selectedExam.icon} {selectedExam.title} {/* This line is now safe */}
                </h2>
                <motion.button
                    onClick={handleRetakeOrNewTest}
                    className={`px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 font-medium text-sm sm:text-base`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Exams
                </motion.button>
            </div>

            {isLoading ? (
                <div
                    className={`text-center py-20 text-2xl font-semibold`}
                    style={{ color: COLORS.primary }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                    >
                        🌀
                    </motion.div>{" "}
                    Loading ...
                </div>
            ) : (
                <div className="space-y-6 sm:space-y-8">
                    {/* This is also now safer because selectedExam is guaranteed to be an object here */}
                    {selectedExam.questions.map((q, index) => (
                        <QuestionItem
                            key={index}
                            q={q}
                            index={index}
                            answers={answers}
                            submitted={submitted}
                            handleAnswer={handleAnswer}
                        />
                    ))}

                    {!submitted && (
                        <AnimatedButton
                            onClick={handleSubmit}
                            className="mt-8 w-full text-lg py-4"
                        >
                            Submit Your Answers!
                        </AnimatedButton>
                    )}

                    {submitted && (
                        <ResultsDisplay
                            score={score}
                            totalQuestions={totalQuestions}
                            percentage={percentage}
                            onRetakeOrNewTest={handleRetakeOrNewTest}
                        />
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default ExamTakingView;