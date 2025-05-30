import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "./Constants"; // Assuming COLORS contains primary, primaryDarker, etc.
import QuestionItem from "./QuestionItem";
import ResultsDisplay from "./ResultDisplay";

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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(0); // For directional question animations

    // Reset currentQuestionIndex when a new exam is selected or when the exam is submitted/retaken
    useEffect(() => {
        setCurrentQuestionIndex(0);
        setDirection(0); // Reset direction
    }, [selectedExam, submitted]);

    if (!selectedExam) {
        return (
            <motion.div
                key="exam-error"
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-red-300 flex-grow flex items-center justify-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-red-600 font-bold text-xl flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Error: Exam details are not available. Please go back and select an exam.
                </p>
            </motion.div>
        );
    }

    const totalExamQuestions = selectedExam.questions.length;
    const currentQuestion = selectedExam.questions[currentQuestionIndex];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalExamQuestions - 1) {
            setDirection(1);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setDirection(-1);
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const isLastQuestion = currentQuestionIndex === totalExamQuestions - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    // Animation variants for question transitions
    const questionTransitionVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.6 }
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.4 }
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-purple-100 p-6 md:p-8 flex items-center justify-center font-sans overflow-hidden">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10"> {/* Adjusted grid-cols */}
                {/* Left Column: Quiz Info & Controls */}
                <motion.div
                    initial={{ opacity: 0, x: -70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                    className="lg:col-span-2 bg-white rounded-3xl shadow-3xl p-7 sm:p-10 h-fit sticky top-10 transform hover:scale-[1.01] transition-transform duration-300" // Adjusted col-span
                    style={{
                        border: `1px solid ${COLORS.border}`,
                        boxShadow: `0 15px 40px -10px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.08)`
                    }}
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 flex items-center gap-4 text-gray-900">
                        <motion.span
                            className={`text-md bg-clip-text text-transparent`}
                            style={{
                                backgroundImage: `linear-gradient(to right top, ${COLORS.primary}, #0ea5e9, #6366f1)`
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                        >
                            {selectedExam.icon}
                        </motion.span>
                        <motion.span
                            className={`bg-clip-text text-transparent leading-tight text-3xl`}
                            style={{
                                backgroundImage: `linear-gradient(to right, ${COLORS.primary}, #2563eb)`
                            }}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {selectedExam.title}
                        </motion.span>
                    </h2>
                    <p className="text-lg text-gray-700 mb-5 leading-relaxed border-l-4 border-blue-300 pl-4 italic">
                        {selectedExam.description}
                    </p>
                    <div className="flex items-center text-gray-600 mb-7 text-lg bg-blue-50 px-4 py-3 rounded-xl border border-blue-200">
                        <span className="text-2xl mr-3 animate-bounce-slow">🌟</span>
                        <span className="font-bold text-blue-800">Difficulty:</span>{" "}
                        <span className="ml-2 capitalize text-blue-700 font-semibold">{selectedExam.difficulty}</span>
                    </div>

                    <div className="mb-7 bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                            <span className="mr-2 text-blue-500">📊</span> Quiz Progress:
                        </h3>
                        <div className="w-full bg-gray-200 rounded-full h-3.5 dark:bg-gray-700 overflow-hidden shadow-inner">
                            <motion.div
                                className="h-3.5 rounded-full"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryDarker || '#2563eb'})`,
                                    width: `${((currentQuestionIndex + (submitted ? totalQuestions : 0)) / totalQuestions) * 100}%`,
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIndex + (submitted ? totalQuestions : 0)) / totalQuestions) * 100}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            ></motion.div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3 flex justify-between items-center">
                            <span className="font-bold text-gray-700 text-base">
                                Question {submitted ? totalQuestions : currentQuestionIndex + 1}
                            </span>{" "}
                            <span className="text-gray-400">/</span>{" "}
                            <span className="font-bold text-gray-700 text-base">{totalQuestions}</span>
                            <span className="ml-auto text-gray-600">{submitted ? "Answered" : "Completed"}</span>
                        </p>
                    </div>

                    {!submitted && (
                        <motion.div
                            className="flex items-start text-gray-600 mb-6 p-4 bg-blue-100 rounded-xl border border-blue-300 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <span className="text-2xl mr-3 text-blue-600 animate-pulse">💡</span>
                            <p className="text-sm text-blue-900 leading-snug">
                                Choose an option to answer. You can navigate between questions freely
                                before submitting your exam. Your answers will be saved automatically for the current session.
                            </p>
                        </motion.div>
                    )}

                    <button
                        onClick={handleRetakeOrNewTest}
                        className="px-6 py-3 w-full rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-base whitespace-nowrap
                                   bg-gray-100 text-gray-700 shadow-md hover:bg-gray-200 hover:text-gray-800 active:scale-97 border border-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 transition-colors duration-300"
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
                    </button>
                </motion.div>

                {/* Right Column: Dynamic Quiz Content (Questions or Results) */}
                <motion.div
                    key="quiz-content-area"
                    className="lg:col-span-3 bg-white rounded-3xl shadow-3xl p-7 sm:p-10 flex flex-col items-center justify-center"
                    style={{
                        border: `1px solid ${COLORS.border}`,
                        boxShadow: `0 15px 40px -10px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.08)`,
                        height: 'fit-content',
                        minHeight: submitted ? 'auto' : '400px',
                    }}
                    initial={{ opacity: 0, x: 70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                >
                    {isLoading ? (
                        <div
                            className="text-center py-20 text-3xl font-bold flex flex-col items-center justify-center gap-4"
                            style={{ color: COLORS.primary }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="inline-block text-6xl"
                            >
                                🌀
                            </motion.div>{" "}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, #0ea5e9)` }}>
                                Loading Questions...
                            </span>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait" custom={direction}>
                            {!submitted ? (
                                <motion.div
                                    key={currentQuestionIndex}
                                    variants={questionTransitionVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={direction}
                                    className="w-full max-w-3xl mx-auto flex flex-col items-center" // Added flex-col items-center for centering
                                >
                                    <QuestionItem
                                        q={currentQuestion}
                                        index={currentQuestionIndex}
                                        answers={answers}
                                        submitted={submitted}
                                        handleAnswer={handleAnswer}
                                    />

                                    {/* Navigation Buttons for Questions */}
                                    <div className="flex justify-between mt-10 gap-5 w-full max-w-2xl"> {/* Added w-full max-w-2xl */}
                                        <button
                                            onClick={handlePreviousQuestion}
                                            disabled={isFirstQuestion}
                                            className={`flex-1 text-lg py-4 rounded-xl transition-all duration-300 font-semibold shadow-md
                                                        ${isFirstQuestion ? "opacity-40 cursor-not-allowed bg-gray-200 text-gray-500" : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-500 hover:text-white active:scale-98"}`}
                                            style={{
                                                borderColor: isFirstQuestion ? undefined : COLORS.primary,
                                                color: isFirstQuestion ? undefined : COLORS.primary,
                                            }}
                                        >
                                            Previous
                                        </button>
                                        {isLastQuestion ? (
                                            <button
                                                onClick={handleSubmit}
                                                className="flex-1 text-lg py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg text-white
                                                            bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-98 transform"
                                                style={{
                                                    backgroundColor: COLORS.primary, // Fallback if gradient doesn't apply
                                                }}
                                            >
                                                Submit Your Answers!
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNextQuestion}
                                                className="flex-1 text-lg py-4 rounded-xl transition-all duration-300 font-semibold shadow-md text-white
                                                            bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-98 transform"
                                                style={{
                                                    backgroundColor: COLORS.primary, // Fallback if gradient doesn't apply
                                                    borderColor: COLORS.primary,
                                                }}
                                            >
                                                Next Question
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                // Display results if submitted
                                <ResultsDisplay
                                    score={score}
                                    totalQuestions={totalQuestions}
                                    percentage={percentage}
                                    onRetakeOrNewTest={handleRetakeOrNewTest}
                                    selectedExam={selectedExam}
                                    answers={answers}
                                />
                            )}
                        </AnimatePresence>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ExamTakingView;