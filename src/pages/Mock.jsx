// App.js (Modified)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaBook, FaBrain, FaLaptopCode, FaClock, FaPlayCircle } from 'react-icons/fa';

// Import your existing Header and Footer
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import CombinedQuizPage from '../components/mock/CombinedQuizPage';

const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    secondary: '#6366F1', // indigo-500
    success: '#10B981', // green-500 (for results)
    danger: '#EF4444', // red-500 (for results)
    border: '#E5E7EB', // gray-200
};

const mockTests = [
    {
        id: 'general-aptitude-1',
        title: 'General Aptitude Test - Set 1',
        description: 'A concise test covering Bangla, English, and Mathematics fundamentals. 4 questions per subject.',
        modules: ['bangla', 'english', 'math'],
        totalQuestions: 12,
        timeLimit: 300, // 5 minutes in seconds
        icon: <FaLightbulb />,
    },
    {
        id: 'advanced-math-english',
        title: 'Advanced Math & English Focus',
        description: 'Challenges your advanced skills in algebra and complex English grammar. 4 questions per subject.',
        modules: ['english', 'math'],
        totalQuestions: 8,
        timeLimit: 240, // 4 minutes
        icon: <FaChartLine />,
    },
    {
        id: 'bangla-literature-deep-dive',
        title: 'Bangla Literature Snapshot',
        description: 'An in-depth snapshot focused exclusively on Bangla literature. Contains 4 focused questions.',
        modules: ['bangla'],
        totalQuestions: 4,
        timeLimit: 120, // 2 minutes
        icon: <FaBook />,
    },
];

const features = [
    { icon: <FaBrain className="text-5xl" style={{ color: COLORS.primary }} />, title: "Expertly Crafted Questions", description: "Developed by subject matter experts to cover all essential topics and difficulty levels.", },
    { icon: <FaLaptopCode className="text-5xl" style={{ color: COLORS.secondary }} />, title: "Realistic Test Environment", description: "Simulate the actual exam experience with timed tests and a user-friendly interface.", },
    { icon: <FaChartLine className="text-5xl" style={{ color: COLORS.secondary }} />, title: "Instant Feedback & Review", description: "Get immediate results and review your answers to understand your strengths and weaknesses.", },
];

const MockTestSelectionPage = ({ onSelectTest }) => {
    return (
        <motion.div
            className="p-8 sm:p-10 flex flex-col items-center text-center w-full max-w-full mx-auto"
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
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-start py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
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