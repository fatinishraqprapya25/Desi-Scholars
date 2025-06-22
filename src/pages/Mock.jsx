import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaBook, FaBrain, FaLaptopCode, FaClock, FaPlayCircle, FaCheckCircle, FaStar, FaPuzzlePiece } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from '../components/mock/Hero';
import GeneralContents from '../components/mock/GeneralContents';
import MockGrid from '../components/mock/MockGrid';
import WhyUs from '../components/mock/WhyUs';

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

                    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Mock Tests Section */}
                        <MockGrid mockTests={mockTests} />

                        {/* General Content Section */}
                        <GeneralContents />

                        {/* Why Practice With Us Section */}
                        <WhyUs features={features} />
                    </div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}