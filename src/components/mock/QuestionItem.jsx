// QuestionItem.jsx (Modified)
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa'; // Assuming these are imported in your actual file

const QuestionItem = ({ q, index, answers, handleAnswer, submitted }) => {
    return (
        <div className="w-full"> {/* Removed mb-6 and p-0 from here to allow padding on parent grid item */}
            <div className="bg-white/90 backdrop-blur-lg p-5 sm:p-6 rounded-xl border border-gray-200 shadow-xl">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    {/* <span className="text-blue-600 font-bold mr-2">Question {index + 1}:</span> Removed question number from here, it's in the bottom nav */}
                    {q.questionText}
                </h3>

                {q.description && (
                    <div className="mt-3 mb-5 p-3.5 bg-sky-50 border-l-4 border-sky-400 rounded-md shadow-sm">
                        <div className="flex items-start">
                            <FaInfoCircle className="text-sky-500 text-lg mr-2.5 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-sky-700 leading-relaxed">{q.description}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-3.5">
                    {q.options.map((option, optionIndex) => (
                        <button
                            key={optionIndex}
                            onClick={() => !submitted && handleAnswer(index, option)}
                            className={`w-full text-left p-3.5 sm:p-4 rounded-lg border-2 transition-all duration-200 flex items-center group transform focus:outline-none
                                ${submitted
                                    ? (q.correctAnswer === option
                                        ? 'border-green-500 bg-green-100 text-green-800 font-semibold shadow-md'
                                        : (answers[index] === option
                                            ? 'border-red-500 bg-red-100 text-red-800 font-semibold shadow-md'
                                            : 'border-gray-300 bg-gray-100 text-gray-600 opacity-90'))
                                    : (answers[index] === option
                                        ? 'border-blue-500 bg-blue-100 text-blue-800 font-bold shadow-lg ring-2 ring-blue-400 scale-105'
                                        : 'border-gray-300 bg-white group-hover:bg-blue-50 group-hover:border-blue-400 text-gray-700 group-focus:border-blue-400 group-focus:ring-2 group-focus:ring-blue-300 group-hover:scale-105')
                                }`}
                            disabled={submitted}
                        >
                            <span className={`font-semibold mr-3 text-xs py-1 px-2 rounded-md transition-colors duration-200
                                ${answers[index] === option && !submitted ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 group-hover:bg-blue-200 group-hover:text-blue-700'}
                            `}>
                                {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="flex-1 ml-1.5 text-sm sm:text-base">{option}</span>
                            {submitted && q.correctAnswer === option && (
                                <FaCheckCircle className="ml-auto text-xl sm:text-2xl text-green-600" />
                            )}
                            {submitted && answers[index] === option && q.correctAnswer !== option && (
                                <FaTimesCircle className="ml-auto text-xl sm:text-2xl text-red-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;