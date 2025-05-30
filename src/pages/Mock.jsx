import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaRedo, FaGraduationCap, FaClock, FaChartLine, FaLightbulb } from 'react-icons/fa';

// Import Header and Footer components
import Header from '../components/common/Header'; // Assuming Header is in the same directory or adjust path
import Footer from '../components/common/Footer'; // Assuming Footer is in the same directory or adjust path

// --- Constants.js (Mock for demonstration) ---
const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    secondary: '#6366F1', // indigo-500
    success: '#10B981', // green-500 (for results)
    danger: '#EF4444', // red-500 (for results)
    border: '#E5E7EB', // gray-200
};

// --- Mock Data for Modules ---
const modules = [
    {
        id: 'bangla',
        title: 'Bangla Literature',
        description: 'Test your knowledge of Bengali language and literature, including classic authors and modern works.',
        icon: '📚',
        difficulty: 'medium',
        timeLimit: 1800, // 30 minutes in seconds (individual module time, but we'll override total)
    },
    {
        id: 'english',
        title: 'English Grammar',
        description: 'Assess your understanding of English grammar rules, vocabulary, and sentence structure.',
        icon: '📝',
        difficulty: 'medium',
        timeLimit: 1800,
    },
    {
        id: 'math',
        title: 'Mathematics Fundamentals',
        description: 'Challenge your skills in basic mathematical concepts, algebra, geometry, and problem-solving.',
        icon: '➕',
        difficulty: 'hard',
        timeLimit: 1800,
    },
];

// --- Mock Data Generator for Questions ---
const generateModuleQuestions = (moduleId, numQuestions = 25) => {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        const options = [`Option A for Q${i + 1}`, `Option B for Q${i + 1}`, `Option C for Q${i + 1}`, `Option D for Q${i + 1}`];
        const correctAnswer = options[Math.floor(Math.random() * options.length)]; // Random correct answer
        questions.push({
            id: `${moduleId}-q${i + 1}`,
            moduleId: moduleId, // Add moduleId to question for display
            questionText: `What is the answer to question number ${i + 1}?`,
            options: options,
            correctAnswer: correctAnswer,
        });
    }
    return questions;
};

// --- QuestionItem.jsx (Reused/Adapted) ---
const QuestionItem = ({ q, index, answers, handleAnswer, submitted }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
                <span className="text-blue-600 mr-2">Q{index + 1}.</span> {q.questionText}
            </h3>
            {/* Display Module Name for the current question */}
            <p className="text-sm text-gray-500 mb-4 px-3 py-1 bg-blue-50 rounded-lg inline-block">
                Module: <span className="font-semibold text-blue-700 capitalize">{q.moduleId}</span>
            </p>
            <div className="space-y-3">
                {q.options.map((option, optionIndex) => (
                    <button
                        key={optionIndex}
                        onClick={() => !submitted && handleAnswer(index, option)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center
              ${submitted
                                ? (q.correctAnswer === option
                                    ? 'border-green-500 bg-green-50 text-green-800' // Correct answer
                                    : (answers[index] === option
                                        ? 'border-red-500 bg-red-50 text-red-800' // User's wrong answer
                                        : 'border-gray-200 bg-gray-50 text-gray-700')) // Unselected option after submission
                                : (answers[index] === option
                                    ? 'border-blue-500 bg-blue-50 text-blue-800 font-semibold' // User's selected answer
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50')
                            }`}
                        disabled={submitted}
                    >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                        {submitted && q.correctAnswer === option && (
                            <FaCheckCircle className="ml-auto text-green-600" />
                        )}
                        {submitted && answers[index] === option && q.correctAnswer !== option && (
                            <FaTimesCircle className="ml-auto text-red-600" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- ResultsDisplay.jsx (Reused/Adapted) ---
const ResultsDisplay = ({ score, totalQuestions, percentage, onRetakeOrNewTest, allQuestions, answers }) => {
    const isPassed = percentage >= 70; // Example passing score

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-2xl text-center w-full max-w-xl mx-auto border border-gray-100"
        >
            <h2 className={`text-4xl font-extrabold mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {isPassed ? 'Congratulations!' : 'Quiz Completed!'}
            </h2>
            <p className="text-xl text-gray-700 mb-6">
                You scored <span className="font-bold text-2xl">{score}</span> out of <span className="font-bold text-2xl">{totalQuestions}</span>.
            </p>
            <p className={`text-5xl font-extrabold mb-8 ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
                {percentage.toFixed(0)}%
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {allQuestions.map((q, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50 text-left">
                        <p className="font-semibold text-gray-900 mb-2">Q{index + 1}: {q.questionText} <span className="text-gray-500 text-sm">({q.moduleId.toUpperCase()})</span></p>
                        <p className="text-sm text-gray-700">Your Answer: <span className={`${answers[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>{answers[index] || 'No Answer'}</span></p>
                        <p className="text-sm text-gray-700">Correct Answer: <span className="text-green-600">{q.correctAnswer}</span></p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={onRetakeOrNewTest}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <FaRedo /> Start New Combined Quiz
                </button>
            </div>
        </motion.div>
    );
};

// --- CombinedQuizPage.jsx (Main Quiz Logic) ---
const CombinedQuizPage = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0); // Initialized to 0, set on start
    const [quizStarted, setQuizStarted] = useState(false); // New state to control start button
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Set total time limit to 5 minutes (300 seconds)
    const totalTimeLimit = 300;

    // Function to prepare and start the quiz
    const startCombinedQuiz = useCallback(() => {
        setIsLoading(true);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setPercentage(0);
        setTimeLeft(totalTimeLimit); // Set total time limit
        setCurrentQuestionIndex(0);
        setDirection(0);

        let combined = [];
        modules.forEach(mod => {
            combined = combined.concat(generateModuleQuestions(mod.id, 25)); // 25 questions per module
        });
        setAllQuestions(combined);
        setIsLoading(false);
        setQuizStarted(true); // Mark quiz as started
    }, [totalTimeLimit]);

    // Define handleSubmit before it's used in useEffect
    const handleSubmit = useCallback(() => {
        let correctCount = 0;
        allQuestions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctCount++;
            }
        });

        setScore(correctCount);
        const calculatedPercentage = (correctCount / allQuestions.length) * 100;
        setPercentage(calculatedPercentage);
        setSubmitted(true);
    }, [allQuestions, answers]);

    // Timer logic
    useEffect(() => {
        if (!quizStarted || submitted || isLoading) return; // Only run if quiz has started and not submitted/loading

        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval);
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [quizStarted, submitted, isLoading, handleSubmit]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswer = useCallback((questionIndex, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    }, []);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < allQuestions.length - 1) {
            setDirection(1);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    }, [currentQuestionIndex, allQuestions.length]);

    const handlePreviousQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setDirection(-1);
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    }, [currentQuestionIndex]);

    const handleRetakeCombinedQuiz = () => {
        setQuizStarted(false); // Go back to the initial state with the start button
        setIsLoading(false); // Ensure loading is false to show the button immediately
        setAllQuestions([]); // Clear questions
    };

    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const currentQuestion = allQuestions[currentQuestionIndex];

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
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-12">
            {!quizStarted ? (
                <motion.div
                    className="bg-white rounded-3xl shadow-3xl p-10 flex flex-col items-center text-center max-w-5xl mx-auto border border-gray-100" // Increased max-w for more space
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Hero Section */}
                    <div className="mb-12">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}>
                            Welcome to the Academic Challenge!
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                            Test your knowledge across core academic subjects with our comprehensive and timed quiz.
                            Prepare to challenge yourself and see how you stack up!
                        </p>
                    </div>

                    {/* Key Features Section */}
                    <div className="w-full mb-12">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Why Take Our Quiz?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                className="flex flex-col items-center p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-md text-blue-800"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <FaGraduationCap className="text-5xl mb-3 text-blue-600" />
                                <h3 className="text-xl font-bold mb-2">Comprehensive Coverage</h3>
                                <p className="text-sm text-center">Questions from Bangla, English, and Math to cover all bases.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center p-6 rounded-2xl bg-indigo-50 border border-indigo-200 shadow-md text-indigo-800"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <FaClock className="text-5xl mb-3 text-indigo-600" />
                                <h3 className="text-xl font-bold mb-2">Timed Challenge</h3>
                                <p className="text-sm text-center">Complete 75 questions in 5 minutes for a real test of speed.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center p-6 rounded-2xl bg-purple-50 border border-purple-200 shadow-md text-purple-800"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <FaChartLine className="text-5xl mb-3 text-purple-600" />
                                <h3 className="text-xl font-bold mb-2">Instant Results</h3>
                                <p className="text-sm text-center">Get immediate feedback and review your answers after submission.</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Module Overview Section (Existing, slightly refined) */}
                    <div className="w-full mb-12">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">What You'll Be Tested On:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {modules.map((mod, index) => (
                                <motion.div
                                    key={mod.id}
                                    className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm text-gray-800"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                                >
                                    <span className="text-5xl mb-3">{mod.icon}</span>
                                    <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                                    <p className="text-sm text-center">{mod.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Final Call to Action */}
                    <p className="text-lg text-gray-800 mb-8 font-semibold max-w-3xl mx-auto">
                        Ready to prove your academic prowess? You will face a total of <span className="text-blue-600 font-bold">{allQuestions.length || modules.length * 25} questions</span>
                        across all modules, with a combined time limit of <span className="text-blue-600 font-bold">{totalTimeLimit / 60} minutes</span>.
                        Click the button below to begin your challenge!
                    </p>

                    <button
                        onClick={startCombinedQuiz}
                        className="px-12 py-5 rounded-full text-3xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-white
                       bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    >
                        Start Your Challenge Now!
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    key="quiz-content-area"
                    className="bg-white rounded-3xl shadow-3xl p-7 sm:p-10 flex flex-col items-center justify-center mx-auto relative"
                    style={{
                        border: `1px solid ${COLORS.border}`,
                        boxShadow: `0 15px 40px -10px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.08)`,
                        height: 'fit-content',
                        minHeight: submitted ? 'auto' : '500px',
                        maxWidth: '90%',
                    }}
                    initial={{ opacity: 0, x: 70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                >
                    {/* Timer Display */}
                    {!submitted && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-md flex items-center gap-2">
                            <FaHourglassHalf className="text-xl" />
                            {formatTime(timeLeft)}
                        </div>
                    )}

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
                                    className="w-full max-w-3xl flex flex-col items-center"
                                >
                                    {/* Quiz Heading (Question Text) */}
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
                                        Question {currentQuestionIndex + 1} of {allQuestions.length}:
                                    </h3>
                                    <QuestionItem
                                        q={currentQuestion}
                                        index={currentQuestionIndex}
                                        answers={answers}
                                        submitted={submitted}
                                        handleAnswer={handleAnswer}
                                    />

                                    {/* Navigation Buttons for Questions */}
                                    <div className="flex justify-between mt-10 gap-5 w-full max-w-2xl">
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
                                                    backgroundColor: COLORS.primary,
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
                                                    backgroundColor: COLORS.primary,
                                                    borderColor: COLORS.primary,
                                                }}
                                            >
                                                Next Question
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <ResultsDisplay
                                    score={score}
                                    totalQuestions={allQuestions.length}
                                    percentage={percentage}
                                    onRetakeOrNewTest={handleRetakeCombinedQuiz}
                                    allQuestions={allQuestions} // Pass all questions for review
                                    answers={answers}
                                />
                            )}
                        </AnimatePresence>
                    )}
                </motion.div>
            )}
        </div>
    );
};

// --- App.jsx (Main Application Entry Point) ---
const App = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-purple-100 font-sans antialiased text-gray-900">
            <Header /> {/* Integrated Header */}
            <div className="flex-grow flex items-center justify-center p-6 md:p-8 overflow-hidden relative">
                {/* Decorative background shapes for more visual interest */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ delay: 1, duration: 2 }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ delay: 1.2, duration: 2 }}
                ></motion.div>
                <motion.div
                    className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ delay: 1.4, duration: 2 }}
                ></motion.div>

                <CombinedQuizPage />
            </div>
            <Footer /> {/* Integrated Footer */}
        </div>
    );
};

export default App;
