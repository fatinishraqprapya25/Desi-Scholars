import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const PRIMARY_COLOR = "#007aff";
const PRIMARY_COLOR_DARKER = "#005cb3";
const examsData = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        icon: "💻",
        description: "Dive into the core concepts of JavaScript, from variables to functions.",
        difficulty: "Beginner",
        questions: [
            {
                question: "What does 'var' keyword do in JavaScript?",
                options: ["Declares a variable", "Defines a function", "Creates a loop", "Imports a module"],
                correct: 0,
                explanation: "'var' is used to declare a variable in JavaScript, though 'let' and 'const' are preferred in modern JS."
            },
            {
                question: "Which symbol is used for single-line comments in JavaScript?",
                options: ["//", "", "#", "/* */"],
                correct: 0,
                explanation: "// is used for single-line comments. /* */ is for multi-line comments."
            },
            {
                question: "Which of the following is NOT a JavaScript data type?",
                options: ["String", "Boolean", "Float", "Undefined"],
                correct: 2,
                explanation: "JavaScript uses 'Number' for both integers and floating-point numbers. 'Float' is not a distinct data type."
            },
            {
                question: "How do you write 'Hello World' in an alert box?",
                options: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
                correct: 2,
                explanation: "The correct JavaScript syntax for an alert box is alert('message');."
            },
            {
                question: "Where is the correct place to insert a JavaScript?",
                options: ["The <body> section", "The <head> section", "Both the <head> and the <body> section", "The <script> section"],
                correct: 2,
                explanation: "JavaScript can be placed in both the <head> and <body> sections, but placing it at the end of the <body> is often recommended for performance."
            },
        ],
    },
    {
        id: 2,
        title: "HTML Essentials",
        icon: "🌐",
        description: "Master the building blocks of the web: HTML structure and semantics.",
        difficulty: "Beginner",
        questions: [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Trainer Marking Language",
                    "Hyper Text Markup Language",
                    "Hyper Text Marketing Language",
                    "Hyper Tool Multi Language",
                ],
                correct: 1,
                explanation: "HTML stands for HyperText Markup Language, which is used to structure content on the web."
            },
            {
                question: "Which HTML tag is used to define an internal style sheet?",
                options: ["<script>", "<style>", "<css>", "<link>"],
                correct: 1,
                explanation: "The <style> tag is used to embed CSS styles directly within an HTML document."
            },
            {
                question: "Which is the correct HTML element for inserting a line break?",
                options: ["<lb>", "<break>", "<br>", "<newline>"],
                correct: 2,
                explanation: "The <br> tag is used to insert a single line break."
            },
            {
                question: "What is the correct HTML for adding a background color?",
                options: ["<body bg='yellow'>", "<background>yellow</background>", "<body style='background-color:yellow;'>", "<body color='yellow'>"],
                correct: 2,
                explanation: "Inline styles using the 'style' attribute are a common way to apply background colors to HTML elements."
            },
        ],
    },
    {
        id: 3,
        title: "CSS Styling & Layout",
        icon: "🎨",
        description: "Style your web pages with advanced CSS techniques and layout models.",
        difficulty: "Intermediate",
        questions: [
            {
                question: "Which CSS property controls the text size?",
                options: ["font-style", "text-size", "font-size", "text-style"],
                correct: 2,
                explanation: "The 'font-size' property is used to specify the size of the text."
            },
            {
                question: "How do you select an element with id 'header'?",
                options: [".header", "#header", "header", "*header"],
                correct: 1,
                explanation: "The '#' symbol is used in CSS to select an element by its ID."
            },
            {
                question: "Which property is used to change the background color?",
                options: ["color", "bgcolor", "background-color", "background"],
                correct: 2,
                explanation: "The 'background-color' property sets the background color of an element."
            },
            {
                question: "How do you make the text bold?",
                options: ["font:bold;", "style:bold;", "font-weight:bold;", "text-decoration:bold;"],
                correct: 2,
                explanation: "The 'font-weight' property is used to set the boldness or lightness of the text."
            },
        ],
    },
];


// Reusable Animated Button Component (copied for self-containment, but ideally imported)
const AnimatedButton = ({ onClick, children, className = "", whileHover, whileTap, type = "button" }) => (
    <motion.button
        type={type}
        onClick={onClick}
        className={`relative group overflow-hidden px-8 py-3 border-2 border-[#007aff] text-[#007aff] rounded-lg font-semibold transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-opacity-50 ${className}`}
        whileHover={whileHover}
        whileTap={whileTap}
    >
        <span className="absolute left-0 top-0 h-full w-0 bg-[#007aff] transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
        <span className="relative z-10 group-hover:text-white transition-colors duration-300 ease-out">
            {children}
        </span>
    </motion.button>
);


export default function QuizPage() {
    const { examId } = useParams(); // Get examId from URL
    const navigate = useNavigate(); // For navigation
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const selectedExam = examsData.find((exam) => exam.id === parseInt(examId));

    useEffect(() => {
        if (selectedExam) {
            setIsLoading(true);
            setAnswers({});
            setSubmitted(false);
            setCurrentQuestionIndex(0); // Reset to first question on exam load
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 700); // Simulate loading
            return () => clearTimeout(timer);
        } else {
            // If exam not found, redirect back or show an error
            navigate("/");
        }
    }, [examId, selectedExam, navigate]);

    if (!selectedExam) {
        return null; // Or a loading spinner/error message
    }

    const handleAnswer = (optionIndex) => {
        // Only allow answering if not submitted
        if (!submitted) {
            setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionIndex }));
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < selectedExam.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleSubmit(); // Submit if it's the last question
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleRetakeOrNewTest = () => {
        navigate("/"); // Go back to the main test selection page
    };

    const calculateScore = () => {
        let score = 0;
        selectedExam.questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                score++;
            }
        });
        return score;
    };

    const score = submitted ? calculateScore() : 0;
    const totalQuestions = selectedExam.questions.length;
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    const questionVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    };

    const currentQuestion = selectedExam.questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-6 md:p-8">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 md:mb-16 drop-shadow-md"
            >
                <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[${PRIMARY_COLOR}] to-sky-500`}>
                    {selectedExam.icon} {selectedExam.title}
                </span>
            </motion.h1>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b-2 border-blue-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </h2>
                    <motion.button
                        onClick={handleRetakeOrNewTest}
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 font-medium text-sm sm:text-base"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Exams
                    </motion.button>
                </div>

                {isLoading ? (
                    <div className={`text-center py-20 text-2xl text-[${PRIMARY_COLOR}] font-semibold`}>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">🌀</motion.div> Loading ...
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div
                                key={currentQuestionIndex} // Key ensures re-render and animation on question change
                                className="space-y-6 sm:space-y-8"
                                variants={questionVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="bg-slate-50 p-5 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                                    <p className="font-semibold text-lg sm:text-xl mb-5 text-gray-800">
                                        {currentQuestionIndex + 1}. {currentQuestion.question}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        {currentQuestion.options.map((option, oIndex) => {
                                            const isSelected = answers[currentQuestionIndex] === oIndex;

                                            return (
                                                <label
                                                    key={oIndex}
                                                    htmlFor={`question-${currentQuestionIndex}-option-${oIndex}`}
                                                    className={`flex items-center p-3.5 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                            ${isSelected
                                                            ? `bg-blue-100 border-[${PRIMARY_COLOR}] shadow-sm`
                                                            : `bg-white hover:bg-blue-50 hover:border-[${PRIMARY_COLOR}]/50 border-gray-200`
                                                        }
                          `}
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`question-${currentQuestionIndex}-option-${oIndex}`}
                                                        name={`question-${currentQuestionIndex}`}
                                                        checked={isSelected}
                                                        onChange={() => handleAnswer(oIndex)}
                                                        className={`mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 text-[${PRIMARY_COLOR}] focus:ring-[${PRIMARY_COLOR}] focus:ring-offset-1 border-gray-300`}
                                                    />
                                                    <span className={`text-sm sm:text-base ${isSelected ? `font-semibold text-[${PRIMARY_COLOR}]` : "text-gray-700"}`}>
                                                        {option}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <AnimatedButton
                                        onClick={handlePreviousQuestion}
                                        className={`px-6 py-3 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={currentQuestionIndex === 0}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Previous
                                    </AnimatedButton>

                                    {currentQuestionIndex < totalQuestions - 1 ? (
                                        <AnimatedButton
                                            onClick={handleNextQuestion}
                                            className="px-6 py-3"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Next Question
                                        </AnimatedButton>
                                    ) : (
                                        <AnimatedButton
                                            onClick={handleSubmit}
                                            className="px-6 py-3 !bg-[#007aff] !text-white group-hover:!bg-[#005cb3]"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Submit Exam
                                        </AnimatedButton>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                className={`mt-10 bg-gradient-to-br from-sky-100 to-blue-200 p-6 sm:p-8 rounded-xl shadow-lg text-center border-2 border-[${PRIMARY_COLOR}]/30`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                            >
                                <motion.p
                                    className={`text-3xl sm:text-4xl font-extrabold text-[${PRIMARY_COLOR}] mb-3`}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
                                >
                                    You Scored: {score} / {totalQuestions}
                                </motion.p>
                                <motion.p
                                    className="text-5xl sm:text-6xl font-extrabold text-sky-600 mb-6"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.7 }}
                                >
                                    {percentage.toFixed(0)}%
                                </motion.p>

                                <p className="text-lg sm:text-xl text-gray-700 mb-8 font-medium">
                                    {percentage === 100
                                        ? "Absolutely brilliant! A perfect score! 🎉"
                                        : percentage >= 70
                                            ? "Excellent work! You're doing great! 👍"
                                            : percentage >= 50
                                                ? "Good effort! A little more practice and you'll master it!"
                                                : "Keep learning! Every attempt is a step forward. 🌱"}
                                </p>

                                {/* Display correct answers and explanations for submitted quiz */}
                                <div className="mt-8 text-left space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers:</h3>
                                    {selectedExam.questions.map((q, index) => {
                                        const isCorrect = answers[index] === q.correct;
                                        const isSelectedAndWrong = answers[index] === undefined || (answers[index] === index && answers[index] !== q.correct);

                                        return (
                                            <div key={`review-${index}`} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                                <p className="font-semibold text-lg text-gray-800 mb-2">
                                                    {index + 1}. {q.question}
                                                </p>
                                                <p className={`text-md ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                                                    Your Answer:{" "}
                                                    <strong>
                                                        {answers[index] !== undefined
                                                            ? q.options[answers[index]]
                                                            : "Not Answered"}
                                                    </strong>
                                                    {isCorrect ? " (Correct!)" : " (Incorrect)"}
                                                </p>
                                                {!isCorrect && (
                                                    <p className="text-md text-green-700 mt-1">
                                                        Correct Answer: <strong>{q.options[q.correct]}</strong>
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-600 mt-2">
                                                    <strong>Explanation:</strong> {q.explanation}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>


                                <motion.button
                                    className={`mt-8 px-8 py-3.5 bg-[${PRIMARY_COLOR}] hover:bg-[${PRIMARY_COLOR_DARKER}] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-md sm:text-lg`}
                                    onClick={handleRetakeOrNewTest}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Take Another Test
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <footer className="text-center py-10 mt-16 md:mt-20 border-t border-gray-200">
                <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} AceYourExams. All rights reserved.</p>
            </footer>
        </div>
    );
}