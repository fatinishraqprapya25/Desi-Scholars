import { useState } from "react";
import { motion } from "framer-motion";
import { XCircle, MinusCircle, PlusCircle } from "lucide-react";

const QuestionCard = ({
    question,
    qIndex,
    handleRemoveQuestion,
    handleRemoveOption,
    variants
}) => {
    const [questionText, setQuestionText] = useState(question.question || "");
    const [options, setOptions] = useState(question.options || ["", ""]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
        question.correctAnswers?.[0] ?? 0
    );

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleRemoveOptionLocal = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        if (correctAnswerIndex === index) {
            setCorrectAnswerIndex(0); // reset to first if correct one was removed
        }
    };

    const handleQuestionUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/mcq/${question._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify({
                    question: questionText,
                    options,
                    correctAnswers: [correctAnswerIndex]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Update failed:", data?.message || response.statusText);
                alert("Failed to update the question.");
            } else {
                alert("Question updated successfully.");
            }
        } catch (error) {
            console.error("Error updating question:", error);
            alert("An error occurred while updating the question.");
        }
    };

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
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter your question here..."
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                ></textarea>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-indigo-200">
                <h5 className="text-sm font-medium text-gray-700">Options (Select one correct answer)</h5>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="radio"
                            id={`q${qIndex}-option${index}`}
                            name={`q${qIndex}-correct-answer`}
                            checked={correctAnswerIndex === index}
                            onChange={() => setCorrectAnswerIndex(index)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor={`q${qIndex}-option${index}`} className="sr-only">Option {index + 1}</label>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                            required
                        />
                        {options.length > 2 && (
                            <motion.button
                                type="button"
                                onClick={() => {
                                    handleRemoveOption(qIndex, index);
                                    handleRemoveOptionLocal(index);
                                }}
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
                    onClick={handleQuestionUpdate}
                    className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <PlusCircle className="h-4 w-4 mr-1.5" /> Update Question
                </motion.button>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
