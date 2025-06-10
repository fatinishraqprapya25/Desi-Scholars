import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, MinusCircle, FileText, Send, Lightbulb, XCircle } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

// Framer Motion variants
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: 'easeIn' } },
};

export default function CreatePracticeTestPage() {
    const [testDetails, setTestDetails] = useState({
        title: '',
        description: '',
        durationMinutes: 30, // Default duration
        questions: []
    });

    // Handle changes for basic test details (title, description, duration)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestDetails(prevDetails => ({
            ...prevDetails,
            [name]: name === 'durationMinutes' ? parseInt(value, 10) || 0 : value
        }));
    };

    // Add a new question to the test
    const handleAddQuestion = () => {
        setTestDetails(prevDetails => ({
            ...prevDetails,
            questions: [
                ...prevDetails.questions,
                {
                    questionText: '',
                    options: ['', '', '', ''], // Default 4 empty options
                    correctAnswerIndex: null // Index of the correct option
                }
            ]
        }));
    };

    // Remove a question by its index
    const handleRemoveQuestion = (qIndex) => {
        setTestDetails(prevDetails => ({
            ...prevDetails,
            questions: prevDetails.questions.filter((_, index) => index !== qIndex)
        }));
    };

    // Handle changes for a specific question's text
    const handleQuestionTextChange = (qIndex, value) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].questionText = value;
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Add an option to a specific question
    const handleAddOption = (qIndex) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].options.push(''); // Add an empty option
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Remove an option from a specific question
    const handleRemoveOption = (qIndex, oIndex) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, index) => index !== oIndex);
            // If the removed option was the correct one, reset correct answer
            if (newQuestions[qIndex].correctAnswerIndex === oIndex) {
                newQuestions[qIndex].correctAnswerIndex = null;
            } else if (newQuestions[qIndex].correctAnswerIndex > oIndex) {
                // Adjust index if correct answer was after the removed option
                newQuestions[qIndex].correctAnswerIndex -= 1;
            }
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Handle changes for a specific option's text
    const handleOptionTextChange = (qIndex, oIndex, value) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].options[oIndex] = value;
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Set the correct answer for a specific question
    const handleCorrectAnswerChange = (qIndex, oIndex) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].correctAnswerIndex = oIndex;
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!testDetails.title.trim()) {
            alert('Test title is required.');
            return;
        }
        if (testDetails.questions.length === 0) {
            alert('At least one question is required.');
            return;
        }

        for (let i = 0; i < testDetails.questions.length; i++) {
            const q = testDetails.questions[i];
            if (!q.questionText.trim()) {
                alert(`Question ${i + 1} text is required.`);
                return;
            }
            if (q.options.filter(opt => opt.trim() !== '').length < 2) {
                alert(`Question ${i + 1} must have at least two non-empty options.`);
                return;
            }
            if (q.correctAnswerIndex === null || q.correctAnswerIndex < 0 || q.correctAnswerIndex >= q.options.length) {
                alert(`Please select a correct answer for Question ${i + 1}.`);
                return;
            }
            if (!q.options[q.correctAnswerIndex].trim()) {
                alert(`The selected correct answer for Question ${i + 1} cannot be empty.`);
                return;
            }
        }

        console.log('New Practice Test Data:', testDetails);
        alert('Practice test created successfully! (Check console for data)');

        // Reset form after submission (optional)
        setTestDetails({
            title: '',
            description: '',
            durationMinutes: 30,
            questions: []
        });
    };

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <FileText className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Create New Practice Test
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Design and build new practice tests with customizable questions and options.
                </p>

                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-6"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Basic Test Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Test Information</h3>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={testDetails.title}
                                onChange={handleChange}
                                placeholder="e.g., React Hooks Deep Dive"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={testDetails.description}
                                onChange={handleChange}
                                placeholder="A brief overview of the test content..."
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                            <input
                                type="number"
                                id="durationMinutes"
                                name="durationMinutes"
                                value={testDetails.durationMinutes}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className="space-y-6 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Questions</h3>

                        {testDetails.questions.length === 0 && (
                            <div className="text-center py-6 text-gray-500">
                                <Lightbulb className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-base">No questions added yet.</p>
                                <p className="text-sm">Click "Add Question" to start building your test.</p>
                            </div>
                        )}

                        {testDetails.questions.map((question, qIndex) => (
                            <motion.div
                                key={qIndex} // Using index as key for now, consider unique IDs in real apps
                                variants={formItemVariants}
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
                                                required // Require all options to be filled
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
                        ))}

                        <motion.button
                            type="button"
                            onClick={handleAddQuestion}
                            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-md font-medium text-base mt-6"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <PlusCircle className="h-5 w-5 mr-2" /> Add Question
                        </motion.button>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg font-bold text-lg mt-8"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Send className="h-6 w-6 mr-3" /> Create Test
                    </motion.button>
                </motion.form>
            </motion.div>
        </UserDashboardContainer>
    );
}
