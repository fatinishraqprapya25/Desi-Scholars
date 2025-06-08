// CombinedQuizPage.jsx (Modified significantly)
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaBook, FaChartLine, FaPlayCircle, FaBrain, FaLaptopCode, FaQuestionCircle, FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

import QuizHeader from './MockHeader'; // Adjust path as needed
import QuestionInfoBar from './QuestionInfoBar'; // Adjust path as needed
import QuizBottomNavigation from './MockBottomNavigation'; // Adjust path as needed

// Re-import QuestionItem with its modifications
import QuestionItem from './QuestionItem'; // Assuming it's in the same directory, adjust path if different

// --- Constants.js (Mock) ---
const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    secondary: '#6366F1', // indigo-500
    success: '#10B981', // green-500 (for results)
    danger: '#EF4444', // red-500 (for results)
    border: '#E5E7EB', // gray-200
};

// --- Mock Data for Modules (as provided) ---
const modules = [
    { id: 'bangla', title: 'Bangla Literature', description: '...', icon: '📚', difficulty: 'medium', timeLimit: 1800, },
    { id: 'english', title: 'English Grammar', description: '...', icon: '📝', difficulty: 'medium', timeLimit: 1800, },
    { id: 'math', title: 'Mathematics Fundamentals', description: '...', icon: '➕', difficulty: 'hard', timeLimit: 1800, },
];

// --- Mock Data Generator for Questions (as provided) ---
const generateModuleQuestions = (moduleId, numQuestions = 4) => {
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
            domain: `${moduleTitle} Domain`, // Added for info bar
            skill: `Skill ${String.fromCharCode(65 + i)}`, // Added for info bar
            difficulty: moduleInfo.difficulty, // Added for info bar
            scoreBand: Math.ceil(Math.random() * 4), // Added for info bar
        });
    }
    return questions;
};

// --- Mock Data for Mock Tests (as provided) ---
const mockTests = [
    {
        id: 'general-aptitude-1',
        title: 'General Aptitude Test - Set 1',
        description: 'A concise test covering Bangla, English, and Mathematics fundamentals. 4 questions per subject.',
        modules: ['bangla', 'english', 'math'],
        totalQuestions: 12,
        timeLimit: 300,
        icon: <FaLightbulb />,
    },
    {
        id: 'advanced-math-english',
        title: 'Advanced Math & English Focus',
        description: 'Challenges your advanced skills in algebra and complex English grammar. 4 questions per subject.',
        modules: ['english', 'math'],
        totalQuestions: 8,
        timeLimit: 240,
        icon: <FaChartLine />,
    },
    {
        id: 'bangla-literature-deep-dive',
        title: 'Bangla Literature Snapshot',
        description: 'An in-depth snapshot focused exclusively on Bangla literature. Contains 4 focused questions.',
        modules: ['bangla'],
        totalQuestions: 4,
        timeLimit: 120,
        icon: <FaBook />,
    },
];

// --- ResultsDisplay.jsx (as provided, assuming it's in the same folder or path adjusted) ---
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


// --- CombinedQuizPage (Now called QuizPage for clarity in this context) ---
const QuizPage = ({ testConfig, onQuizEnd }) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(testConfig.timeLimit);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(0); // For Framer Motion transition direction

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
        const questionsPerModule = 4;

        testConfig.modules.forEach(moduleId => {
            const moduleDef = modules.find(m => m.id === moduleId);
            if (moduleDef) {
                combined = combined.concat(generateModuleQuestions(moduleDef.id, questionsPerModule));
            }
        });
        if (combined.length !== testConfig.totalQuestions) {
            console.warn(`Mismatch: Generated ${combined.length} questions, expected ${testConfig.totalQuestions} for ${testConfig.title}. Adjusting...`);
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
    }, [allQuestions, answers]);

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    // Timer effect
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
            <div className="flex flex-col items-center justify-center gap-4 text-center py-20 text-2xl font-bold" style={{ color: COLORS.primary, minHeight: 'calc(100vh - 150px)' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="text-5xl">🌀</motion.div>
                <span className="bg-clip-text text-transparent text-3xl" style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}>
                    Preparing Your Challenge...
                </span>
            </div>
        );
    }

    if (allQuestions.length === 0 && !isLoading) {
        return (<div className="text-center py-20 text-xl text-gray-700" style={{ minHeight: 'calc(100vh - 150px)' }}>No questions found for this test. Please try another one.</div>);
    }

    return (
        <motion.div
            key={`quiz-page-${testConfig.id}`}
            className="flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] w-full max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-2xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
        >
            {!submitted && (
                <>
                    <QuizHeader
                        testTitle={testConfig.title}
                        timeLeft={timeLeft}
                        formatTime={formatTime}
                    />
                    {currentQuestion && ( // Ensure currentQuestion exists before passing its data
                        <QuestionInfoBar
                            questionId={currentQuestion.id}
                            domain={currentQuestion.domain}
                            skill={currentQuestion.skill}
                            difficulty={currentQuestion.difficulty}
                            scoreBand={currentQuestion.scoreBand}
                        />
                    )}
                </>
            )}

            <div className="flex-grow flex flex-col p-4 sm:p-6 overflow-hidden">
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
                                className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pb-20" // Added pb-20 to ensure space above bottom nav
                            >
                                {/* Left Column: Passage/Context (Mocked for now) */}
                                <div className="bg-white/90 backdrop-blur-lg p-5 sm:p-6 rounded-xl border border-gray-200 shadow-md flex flex-col">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Reading and Writing</h3>
                                    <div className="text-gray-700 text-sm leading-relaxed overflow-y-auto custom-scrollbar flex-grow pr-2">
                                        <p>
                                            Plants have evolved a variety of structures to adapt to their environments. The roots anchor the plant and absorb water and nutrients from the soil. The stem supports the plant and transports nutrients and water between the roots and leaves. The leaves are the primary site of photosynthesis, where sunlight is converted into energy for the plant. Additionally, flowers and fruits play crucial roles in reproduction and seed dispersal.
                                            {/* Add more placeholder text to simulate a longer passage if desired */}
                                            <br /><br />
                                            This passage discusses the fundamental components and functions of plants, emphasizing their adaptive strategies. Understanding these basic biological processes is crucial for comprehending plant physiology and their role in ecosystems. Further study might involve delving into cellular structures, genetic adaptations, or specific environmental interactions.
                                            <br /><br />
                                            (This is placeholder text to fill the left panel like a passage. In a real application, this would come from your question data.)
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column: Question Options and Controls */}
                                <div className="flex flex-col">
                                    <div className="w-full mb-4">
                                        <QuestionItem
                                            q={currentQuestion}
                                            index={currentQuestionIndex}
                                            answers={answers}
                                            submitted={submitted}
                                            handleAnswer={handleAnswer}
                                        />
                                    </div>

                                    {/* Action buttons as seen in screenshot */}
                                    <div className="w-full p-4 bg-white/90 backdrop-blur-lg rounded-xl border border-gray-200 shadow-md flex justify-around items-center gap-2 mb-4">
                                        <button className="flex-1 py-2.5 px-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                            <FaTimesCircle className="text-red-500" /> Unattempted
                                        </button>
                                        <button className="flex-1 py-2.5 px-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                            <FaInfoCircle className="text-yellow-500" /> Mark for Review
                                        </button>
                                        <button className="flex-1 py-2.5 px-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                            <FaQuestionCircle className="text-blue-500" /> Post Doubt
                                        </button>
                                        <button className="flex-1 py-2.5 px-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                            <FaInfoCircle className="text-purple-500" /> Report
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ) : (
                        // Results display takes full width when submitted
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
            </div>

            {!submitted && (
                <QuizBottomNavigation
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={allQuestions.length}
                    onPrevious={handlePreviousQuestion}
                    onNext={handleNextQuestion}
                    onSubmit={handleSubmit}
                    isFirstQuestion={isFirstQuestion}
                    isLastQuestion={isLastQuestion}
                    onExit={onQuizEnd} // Exit button takes you back to selection
                    submitted={submitted}
                />
            )}
        </motion.div>
    );
};

export default QuizPage;