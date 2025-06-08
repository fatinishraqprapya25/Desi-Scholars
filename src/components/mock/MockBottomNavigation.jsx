// components/quiz/MockBottomNavigation.jsx
import React from 'react';
import { FaAngleLeft, FaAngleRight, FaPowerOff } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MockBottomNavigation = ({
    currentQuestionIndex,
    totalQuestions,
    onPrevious,
    onNext,
    onSubmit,
    isFirstQuestion,
    isLastQuestion,
    onExit,
    submitted,
}) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg p-3 sm:p-4 flex justify-between items-center z-50">
            <button
                onClick={onExit}
                className="flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-md text-sm sm:text-base font-semibold"
            >
                <FaPowerOff className="mr-2" /> Exit
            </button>

            <div className="flex-grow text-center">
                <span className="text-gray-700 text-sm sm:text-base font-semibold">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                    onClick={onPrevious}
                    disabled={isFirstQuestion || submitted}
                    className={`flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md text-sm sm:text-base font-semibold
                        ${isFirstQuestion || submitted
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                        }`}
                >
                    <FaAngleLeft className="mr-2" /> Back
                </button>
                {isLastQuestion && !submitted ? (
                    <button
                        onClick={onSubmit}
                        className="flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 shadow-md text-sm sm:text-base font-semibold"
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        disabled={isLastQuestion || submitted}
                        className={`flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md text-sm sm:text-base font-semibold
                            ${isLastQuestion || submitted
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        Next <FaAngleRight className="ml-2" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MockBottomNavigation;