import React, { useState, useEffect } from "react"; // Import useEffect
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence for transitions between questions
import { COLORS } from "./constants";
import QuestionItem from "./QuestionItem";
import ResultsDisplay from "./ResultDisplay";
import AnimatedButton from "./AnimatedButton"; // Assuming this is used for navigation buttons as well

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
    // State to manage the current question being displayed
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Reset currentQuestionIndex when a new exam is selected or when the exam is submitted/retaken
    useEffect(() => {
        setCurrentQuestionIndex(0);
    }, [selectedExam, submitted]); // Reset when selectedExam changes or submitted status changes

    if (!selectedExam) {
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

    const totalExamQuestions = selectedExam.questions.length;
    const currentQuestion = selectedExam.questions[currentQuestionIndex];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalExamQuestions - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const isLastQuestion = currentQuestionIndex === totalExamQuestions - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

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
                    {selectedExam.icon} {selectedExam.title}
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
                    {!submitted ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex} // Key changes to trigger exit/enter animations
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <QuestionItem
                                    q={currentQuestion}
                                    index={currentQuestionIndex}
                                    answers={answers}
                                    submitted={submitted}
                                    handleAnswer={handleAnswer}
                                />
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        // Display results if submitted
                        <ResultsDisplay
                            score={score}
                            totalQuestions={totalQuestions}
                            percentage={percentage}
                            onRetakeOrNewTest={handleRetakeOrNewTest}
                        />
                    )}

                    {/* Navigation Buttons for Questions */}
                    {!submitted && (
                        <div className="flex justify-between mt-8 gap-4">
                            <AnimatedButton
                                onClick={handlePreviousQuestion}
                                disabled={isFirstQuestion}
                                className={`flex-1 text-lg py-4 ${isFirstQuestion ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                Previous
                            </AnimatedButton>
                            {isLastQuestion ? (
                                <AnimatedButton
                                    onClick={handleSubmit}
                                    className="flex-1 text-lg py-4"
                                >
                                    Submit Your Answers!
                                </AnimatedButton>
                            ) : (
                                <AnimatedButton
                                    onClick={handleNextQuestion}
                                    className="flex-1 text-lg py-4"
                                >
                                    Next Question
                                </AnimatedButton>
                            )}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default ExamTakingView;