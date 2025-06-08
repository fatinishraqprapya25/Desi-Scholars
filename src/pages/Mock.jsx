// src/pages/Mock.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaBook, FaBrain, FaLaptopCode, FaClock, FaPlayCircle, FaCheckCircle, FaStar, FaPuzzlePiece } from 'react-icons/fa'; // Added more icons
import { useNavigate } from 'react-router-dom';

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from '../components/mock/Hero';

// constant colors
const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    primaryLight: '#60A5FA', // blue-400
    secondary: '#6366F1', // indigo-500
    accent: '#10B981', // emerald-500
    background: '#F9FAFB', // gray-50
    cardBackground: '#FFFFFF', // white
    textPrimary: '#1F2937', // gray-900
    textSecondary: '#4B5563', // gray-700
    border: '#E5E7EB', // gray-200
};

// demo mock tests
const mockTests = [
    {
        id: 'general-aptitude-1',
        title: 'General Aptitude Test - Set 1',
        description: 'A concise test covering Bangla, English, and Mathematics fundamentals, perfect for general assessment.',
        modules: ['bangla', 'english', 'math'],
        totalQuestions: 12,
        timeLimit: 300, // 5 minutes in seconds
        icon: <FaLightbulb className="text-blue-500" />,
    },
    {
        id: 'advanced-math-english',
        title: 'Advanced Math & English Focus',
        description: 'Challenges your advanced skills in algebra, geometry, and complex English grammar structures.',
        modules: ['english', 'math'],
        totalQuestions: 8,
        timeLimit: 240, // 4 minutes
        icon: <FaChartLine className="text-indigo-500" />,
    },
    {
        id: 'bangla-literature-deep-dive',
        title: 'Bangla Literature Snapshot',
        description: 'An in-depth snapshot focused exclusively on classic and contemporary Bangla literature and grammar.',
        modules: ['bangla'],
        totalQuestions: 4,
        timeLimit: 120, // 2 minutes
        icon: <FaBook className="text-indigo-500" />,
    },
];

// demo features
const features = [
    { icon: <FaBrain className="text-5xl" style={{ color: COLORS.primary }} />, title: "Expertly Crafted Questions", description: "Developed by subject matter experts to cover all essential topics and difficulty levels, ensuring relevance and accuracy.", },
    { icon: <FaLaptopCode className="text-5xl" style={{ color: COLORS.secondary }} />, title: "Realistic Test Environment", description: "Simulate the actual exam experience with timed tests and a user-friendly interface that mimics real-world conditions.", },
    { icon: <FaChartLine className="text-5xl" style={{ color: COLORS.primary }} />, title: "Instant Feedback & Review", description: "Get immediate, detailed results and review your answers to understand your strengths, weaknesses, and areas for improvement.", },
];

export default function Mock() {
    const navigate = useNavigate();

    const handleSelectTest = (testId) => {
        navigate(`/quiz/${testId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-start">
                <AnimatePresence>
                    {/* Hero Section - Full Width */}
                    <Hero />

                    {/* Main Content Container (for non-full-width sections) */}
                    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* General Content Section */}
                        <section className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-200 mb-12 sm:mb-16 text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                                Prepare Smarter, Not Just Harder
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                                Our platform is designed to provide you with a cutting-edge preparation experience. Gain access to a wide array of mock tests, each meticulously crafted to cover key syllabus areas and challenge your knowledge.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mt-4">
                                With detailed performance analytics and immediate feedback, you'll always know where you stand and what to focus on next. It's time to turn your study efforts into tangible results.
                            </p>
                        </section>


                        {/* Mock Tests Section */}
                        <section id="mock-tests-section" className="mb-12 sm:mb-16 py-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 sm:mb-14 leading-tight">
                                Select Your Test
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                                {mockTests.map((test, index) => (
                                    <motion.div
                                        key={test.id}
                                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                                        onClick={() => handleSelectTest(test.id)}
                                    >
                                        <div className="text-6xl mb-5 transition-transform duration-300 group-hover:scale-110">
                                            {test.icon}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                                            {test.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow px-2">{test.description}</p>
                                        <div className="text-base font-semibold text-gray-700 mb-4">
                                            <span className="flex items-center justify-center gap-2">
                                                <FaBook className="text-blue-500" /> {test.totalQuestions} Questions
                                            </span>
                                            <span className="flex items-center justify-center gap-2 mt-1">
                                                <FaClock className="text-indigo-500" /> {test.timeLimit / 60} Minutes
                                            </span>
                                        </div>
                                        <motion.button
                                            className="mt-auto px-7 py-3 bg-blue-600 text-white rounded-full text-lg font-bold shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 transform group-hover:scale-105 active:scale-95"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FaPlayCircle /> Start Test
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Why Practice With Us Section */}
                        <section className="mb-12 sm:mb-16 py-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 sm:mb-14 leading-tight">
                                Why Choose Our Platform?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 + index * 0.1, duration: 0.6 }}
                                    >
                                        <div className="mb-5 text-6xl transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed text-center flex-grow">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}