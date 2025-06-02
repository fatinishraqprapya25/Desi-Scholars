import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBook, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaRedo, FaGraduationCap,
    FaClock, FaChartLine, FaLightbulb, FaPlayCircle, FaBrain, FaLaptopCode, FaInfoCircle
} from 'react-icons/fa';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

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
        timeLimit: 1800, // Individual module time limit (not used directly in this combined setup)
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

// --- Mock Data Generator for Questions (Now generates 4 questions per module) ---
const generateModuleQuestions = (moduleId, numQuestions = 4) => { // Default and expected numQuestions is 4
    const questions = [];
    const moduleInfo = modules.find(m => m.id === moduleId);
    const moduleTitle = moduleInfo?.title || moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

    for (let i = 0; i < numQuestions; i++) {
        const options = [`Option A for Q${i + 1} (${moduleId})`, `Option B for Q${i + 1} (${moduleId})`, `Option C for Q${i + 1} (${moduleId})`, `Option D for Q${i + 1} (${moduleId})`];
        const correctAnswer = options[Math.floor(Math.random() * options.length)];
        questions.push({
            id: `${moduleId}-q${i + 1}`,
            moduleId: moduleId,
            questionText: `Regarding ${moduleTitle}, what is the primary consideration for question ${i + 1}?`,
            description: `This question delves into key principles of ${moduleTitle}. Evaluate the options based on fundamental theories and practical applications discussed in the relevant study materials. This specific problem (#${i + 1}) focuses on ${['core concepts', 'advanced applications', 'historical context', 'procedural knowledge'][i % 4]}.`,
            options: options,
            correctAnswer: correctAnswer,
        });
    }
    return questions;
};

// --- Mock Data for Mock Tests (Adjusted for 4 questions per module) ---
const mockTests = [
    {
        id: 'general-aptitude-1',
        title: 'General Aptitude Test - Set 1',
        description: 'A concise test covering Bangla, English, and Mathematics fundamentals. 4 questions per subject.',
        modules: ['bangla', 'english', 'math'],
        totalQuestions: 12, // 3 modules * 4 questions
        timeLimit: 300, // 5 minutes in seconds
        icon: <FaLightbulb />,
    },
    {
        id: 'advanced-math-english',
        title: 'Advanced Math & English Focus',
        description: 'Challenges your advanced skills in algebra and complex English grammar. 4 questions per subject.',
        modules: ['english', 'math'],
        totalQuestions: 8, // 2 modules * 4 questions
        timeLimit: 240, // 4 minutes
        icon: <FaChartLine />,
    },
    {
        id: 'bangla-literature-deep-dive',
        title: 'Bangla Literature Snapshot',
        description: 'An in-depth snapshot focused exclusively on Bangla literature. Contains 4 focused questions.',
        modules: ['bangla'],
        totalQuestions: 4, // 1 module * 4 questions
        timeLimit: 120, // 2 minutes
        icon: <FaBook />,
    },
];


// --- QuestionItem.jsx (Redesigned for light theme, with box layout) ---
const QuestionItem = ({ q, index, answers, handleAnswer, submitted }) => {
    return (
        <div className="w-full mb-6 p-0">
            {/* Re-added box styling */}
            <div className="bg-white/90 backdrop-blur-lg p-5 sm:p-6 rounded-xl border border-gray-200 shadow-xl">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    <span className="text-blue-600 font-bold mr-2">Question {index + 1}:</span> {q.questionText}
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

// --- ResultsDisplay.jsx (Optimized and more lucrative design, with box layout) ---
const ResultsDisplay = ({ score, totalQuestions, percentage, onRetakeOrNewTest, allQuestions, answers }) => {
    const isPassed = percentage >= 70;
    const getFeedbackMessage = () => {
        if (isPassed) {
            if (percentage >= 90) return "Outstanding performance! You're well prepared!";
            if (percentage >= 80) return "Excellent work! Keep up the great effort!";
            return "Great job! You've passed. Continue refining your skills.";
        }
        if (percentage >= 50) return "Good effort! Focus on reviewing your answers to improve.";
        if (percentage >= 30) return "You're on the right track. Consistent practice will make a difference.";
        return "Keep practicing! Every attempt helps you learn and grow.";
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-5 sm:p-7 text-center w-full max-w-2xl lg:max-w-3xl mx-auto"
        >
            <div className={`relative p-6 sm:p-8 rounded-xl shadow-xl mb-8
                ${isPassed ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800' : 'bg-gradient-to-br from-red-100 to-red-200 text-red-800'}
            `}>
                <h2 className={`text-3xl sm:text-4xl font-extrabold mb-1.5 ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
                    {isPassed ? 'Congratulations!' : 'Quiz Completed!'}
                </h2>
                <p className={`text-md sm:text-lg mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                    {getFeedbackMessage()}
                </p>
                <p className="text-lg sm:text-xl text-gray-700 mb-5">
                    You scored <span className="font-bold text-2xl sm:text-3xl text-blue-600">{score}</span> out of <span className="font-bold text-2xl sm:text-3xl text-blue-600">{totalQuestions}</span>.
                </p>
                <div className="my-5 sm:my-6">
                    <motion.p
                        className={`text-6xl sm:text-7xl font-extrabold
                            ${isPassed ? 'text-green-600' : 'text-red-600'}
                            bg-clip-text text-transparent
                            ${isPassed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}
                        `}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
                    >
                        {percentage.toFixed(0)}%
                    </motion.p>
                </div>
            </div>

            <div className="p-6 rounded-xl shadow-lg bg-white mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Review Your Answers</h3>
                <div className="space-y-2.5 max-h-60 sm:max-h-72 overflow-y-auto pr-1.5 custom-scrollbar mb-5 text-left">
                    {allQuestions.map((q, index) => (
                        <div key={q.id} className="p-2.5 sm:p-3 rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                            <p className="font-semibold text-gray-800 mb-1 text-xs sm:text-sm leading-tight">
                                <span className="text-blue-600">Q{index + 1}:</span> {q.questionText.substring(0, 60)}{q.questionText.length > 60 ? '...' : ''}
                                <span className="text-gray-500 text-xs"> ({q.moduleId.toUpperCase()})</span>
                            </p>
                            <p className="text-xs text-gray-600">Your Answer: <span className={`font-medium ${answers[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>{answers[index] || 'No Answer'}</span></p>
                            <p className="text-xs text-green-700">Correct Answer: <span className="font-medium">{q.correctAnswer}</span></p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 rounded-xl shadow-lg bg-white mb-8 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2.5 sm:mb-3">Next Steps:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-1.5 text-sm sm:text-base pl-1">
                    <li>Thoroughly review your incorrect answers to understand the concepts.</li>
                    {isPassed ? (<li>Challenge yourself with a different or more advanced test.</li>) : (<li>Consider re-studying the topics where you faced difficulties.</li>)}
                    <li>Practice consistently to improve your speed and accuracy.</li>
                </ul>
            </div>

            <div className="flex justify-center gap-4 mt-6 sm:mt-8">
                <button
                    onClick={onRetakeOrNewTest}
                    className="px-7 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base sm:text-lg font-bold shadow-lg transition-colors duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <FaRedo /> Take Another Mock Test
                </button>
            </div>
        </motion.div>
    );
};

// --- CombinedQuizPage.jsx (Redesigned with 4 questions per module logic and light theme, with box layout) ---
const CombinedQuizPage = ({ testConfig, onQuizEnd }) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(testConfig.timeLimit);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const startQuiz = useCallback(() => {
        setIsLoading(true);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setPercentage(0);
        setTimeLeft(testConfig.timeLimit);
        setCurrentQuestionIndex(0);
        setDirection(0);

        let combined = [];
        const questionsPerModule = 4; // Fixed as per new requirement

        testConfig.modules.forEach(moduleId => {
            const moduleDef = modules.find(m => m.id === moduleId);
            if (moduleDef) {
                combined = combined.concat(generateModuleQuestions(moduleDef.id, questionsPerModule));
            }
        });
        // Ensure the total number of questions matches testConfig, mainly for safety
        // though mockTests.totalQuestions should now be modules.length * 4
        if (combined.length !== testConfig.totalQuestions) {
            console.warn(`Mismatch: Generated ${combined.length} questions, expected ${testConfig.totalQuestions} for ${testConfig.title}. Adjusting...`);
            // This part might need more robust handling if module question generation can fail or vary.
            // For now, assuming generateModuleQuestions always returns 4.
            combined = combined.slice(0, testConfig.totalQuestions);
        }

        setAllQuestions(combined);
        setIsLoading(false);
    }, [testConfig]);

    const handleSubmit = useCallback(() => {
        let correctCount = 0;
        allQuestions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        const calculatedPercentage = allQuestions.length > 0 ? (correctCount / allQuestions.length) * 100 : 0;
        setPercentage(calculatedPercentage);
        setSubmitted(true);
        // Removed onQuizEnd() call from here. It will now be triggered only by the button in ResultsDisplay.
    }, [allQuestions, answers]); // Removed onQuizEnd from dependency array

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    useEffect(() => {
        if (submitted || isLoading || allQuestions.length === 0) return;
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [submitted, isLoading, handleSubmit, allQuestions.length]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswer = useCallback((questionIndex, selectedOption) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionIndex]: selectedOption }));
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

    const currentQuestion = allQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    const questionTransitionVariants = {
        enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 30 } },
        exit: (direction) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0, scale: 0.95, transition: { type: "spring", stiffness: 260, damping: 30 } }),
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 text-center py-20 text-2xl font-bold" style={{ color: COLORS.primary, minHeight: 'calc(100vh - 150px)' }}> {/* Adjusted minHeight */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="text-5xl">🌀</motion.div>
                <span className="bg-clip-text text-transparent text-3xl" style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}>
                    Preparing Your Challenge...
                </span>
            </div>
        );
    }

    if (allQuestions.length === 0 && !isLoading) {
        return (<div className="text-center py-20 text-xl text-gray-700" style={{ minHeight: 'calc(100vh - 150px)' }}>No questions found for this test. Please try another one.</div>); {/* Adjusted minHeight */ }
    }

    return (
        <motion.div
            key={`quiz-page-${testConfig.id}`}
            className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-start mx-auto w-full max-w-3xl lg:max-w-4xl relative"
            style={{ minHeight: 'calc(100vh - 150px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
        >
            {!submitted && (

                <div className="w-full mb-5 sm:mb-6 p-4 sm:p-5 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                        <div className="text-center sm:text-left flex-grow">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 truncate" title={testConfig.title}>{testConfig.title}</h2>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Question <span className="font-semibold">{currentQuestionIndex + 1}</span> of <span className="font-semibold">{allQuestions.length}</span>
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-800 text-white rounded-lg shadow-md font-mono text-lg sm:text-xl">
                            <FaHourglassHalf className="text-sky-300 text-xl sm:text-2xl" />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                    <div className="mt-3.5 sm:mt-4 w-full bg-gray-200 rounded-full h-2.5 sm:h-3 shadow-inner overflow-hidden">
                        <motion.div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(allQuestions.length > 0 ? (currentQuestionIndex + 1) / allQuestions.length : 0) * 100}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
                {!submitted ? (
                    currentQuestion && (
                        <motion.div
                            key={currentQuestionIndex}
                            variants={questionTransitionVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={direction}
                            className="w-full flex flex-col items-center"
                        >
                            <QuestionItem
                                q={currentQuestion}
                                index={currentQuestionIndex}
                                answers={answers}
                                submitted={submitted}
                                handleAnswer={handleAnswer}
                            />
                            <div className="flex justify-between mt-4 sm:mt-5 gap-3 sm:gap-4 w-full max-w-md sm:max-w-lg">
                                <button
                                    onClick={handlePreviousQuestion}
                                    disabled={isFirstQuestion}
                                    className={`flex-1 text-sm sm:text-base py-3 px-4 sm:px-5 rounded-lg transition-all duration-200 font-semibold shadow-md transform hover:scale-105 focus:outline-none active:scale-95
                                        ${isFirstQuestion
                                            ? "opacity-60 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300"
                                            : "bg-white/90 text-blue-600 border-2 border-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-600"}`}
                                >
                                    Previous
                                </button>
                                {isLastQuestion ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 text-sm sm:text-base py-3 px-4 sm:px-5 rounded-lg transition-all duration-200 font-semibold shadow-xl text-white
                                        bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transform hover:scale-105 active:scale-95 focus:outline-none"
                                    >
                                        Submit Answers
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNextQuestion}
                                        className="flex-1 text-sm sm:text-base py-3 px-4 sm:px-5 rounded-lg transition-all duration-200 font-semibold shadow-xl text-white
                                        bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 focus:outline-none"
                                    >
                                        Next Question
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )
                ) : (
                    <ResultsDisplay
                        score={score}
                        totalQuestions={allQuestions.length}
                        percentage={percentage}
                        onRetakeOrNewTest={onQuizEnd}
                        allQuestions={allQuestions}
                        answers={answers}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- MockTestSelectionPage.jsx (Enhanced for light theme, with box layout) ---
const features = [
    { icon: <FaBrain className="text-5xl" style={{ color: COLORS.primary }} />, title: "Expertly Crafted Questions", description: "Developed by subject matter experts to cover all essential topics and difficulty levels.", },
    { icon: <FaLaptopCode className="text-5xl" style={{ color: COLORS.secondary }} />, title: "Realistic Test Environment", description: "Simulate the actual exam experience with timed tests and a user-friendly interface.", },
    { icon: <FaChartLine className="text-5xl" style={{ color: COLORS.secondary }} />, title: "Instant Feedback & Review", description: "Get immediate results and review your answers to understand your strengths and weaknesses.", },
];

const MockTestSelectionPage = ({ onSelectTest }) => {
    return (
        <motion.div
            // Removed parent box styling (bg-white/90, backdrop-blur-lg, rounded-3xl, shadow-2xl, border, border-gray-200)
            className="p-8 sm:p-10 flex flex-col items-center text-center w-full max-w-full mx-auto" // Max width changed to full
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="mb-10 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}>
                    Choose Your Academic Challenge!
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Select a mock test below to begin your preparation. Each test offers a unique set of challenges and subjects, meticulously designed to boost your confidence and skills.
                </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {mockTests.map((test, index) => (
                    <motion.div
                        key={test.id}
                        // Re-added box styling for each test card
                        className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-blue-500 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
                        onClick={() => onSelectTest(test)}
                        whileHover={{ borderColor: test.icon.props.style?.color || COLORS.primary }}
                    >
                        <div className="text-5xl sm:text-6xl mb-5" style={{ color: test.icon.props.style?.color || COLORS.primary }}>{test.icon}</div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{test.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow px-2">{test.description}</p>
                        <div className="text-md font-semibold text-gray-700 mb-4">
                            <span className="flex items-center justify-center gap-2">
                                <FaBook className="text-blue-500" /> {test.totalQuestions} Questions
                            </span>
                            <span className="flex items-center justify-center gap-2 mt-1">
                                <FaClock className="text-indigo-500" /> {test.timeLimit / 60} Minutes
                            </span>
                        </div>
                        <button
                            className="mt-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-bold shadow-lg transition-colors duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
                        >
                            <FaPlayCircle /> Start Test
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="w-full max-w-5xl mx-auto mt-10 mb-12 px-2 sm:px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 sm:mb-12">
                    Why Practice With Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            // Re-added box styling for each feature card
                            className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
                        >
                            <div className="mb-5">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Main App component
function App() {
    const [selectedTest, setSelectedTest] = useState(null);

    const handleSelectTest = (test) => {
        setSelectedTest(test);
    };

    const handleQuizEnd = () => {
        setSelectedTest(null); // Go back to test selection after quiz ends
    };

    return (
        // Adjusted main container for light theme and to remove the parent box for selection page
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8"> {/* Added padding and centering for content */}
                <AnimatePresence mode="wait">
                    {selectedTest ? (
                        <CombinedQuizPage key={selectedTest.id} testConfig={selectedTest} onQuizEnd={handleQuizEnd} />
                    ) : (
                        <MockTestSelectionPage onSelectTest={handleSelectTest} />
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}

export default App;