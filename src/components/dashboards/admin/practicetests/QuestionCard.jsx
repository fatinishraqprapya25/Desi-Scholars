import { motion } from 'framer-motion';
import { PlusCircle, MinusCircle, XCircle } from 'lucide-react';

const QuestionCard = ({
    question,
    qIndex,
    handleRemoveQuestion,
    handleQuestionTextChange,
    handleAddOption,
    handleRemoveOption,
    handleOptionTextChange,
    handleCorrectAnswerChange,
    variants // Pass variants from parent for consistency
}) => {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative"
        >
            <button
                type="button"
                onClick={() => handleRemoveQuestion(qIndex)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                title="Remove Question"
            >
                <XCircle className="h-6 w-6" />
            </button>
            <h4 className="text-md font-semibold text-gray-800 mb-3">Question {qIndex + 1}</h4>
            <div className="mb-4">
                <label htmlFor={`question-${qIndex}`} className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                <textarea
                    id={`question-${qIndex}`}
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                    placeholder="Enter your question here..."
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                ></textarea>
            </div>

            {/* Options for the current question */}
            <div className="space-y-3 pl-4 border-l-2 border-indigo-200">
                <h5 className="text-sm font-medium text-gray-700">Options (Select one correct answer)</h5>
                {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                        <input
                            type="radio"
                            id={`q${qIndex}-option${oIndex}`}
                            name={`q${qIndex}-correct-answer`}
                            checked={question.correctAnswerIndex === oIndex}
                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor={`q${qIndex}-option${oIndex}`} className="sr-only">Option {oIndex + 1}</label>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionTextChange(qIndex, oIndex, e.target.value)}
                            placeholder={`Option ${oIndex + 1}`}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                            required
                        />
                        {question.options.length > 2 && ( // Allow removing if more than 2 options
                            <motion.button
                                type="button"
                                onClick={() => handleRemoveOption(qIndex, oIndex)}
                                className="p-1 text-red-500 hover:text-red-700 rounded-full transition-colors"
                                title="Remove Option"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MinusCircle className="h-5 w-5" />
                            </motion.button>
                        )}
                    </div>
                ))}
                <motion.button
                    type="button"
                    onClick={() => handleAddOption(qIndex)}
                    className="flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium mt-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <PlusCircle className="h-4 w-4 mr-1.5" /> Add Option
                </motion.button>
            </div>
        </motion.div>
    );
};

export default QuestionCard;