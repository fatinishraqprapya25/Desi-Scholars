import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaBook, FaBrain, FaLaptopCode, FaClock, FaPlayCircle, FaCheckCircle, FaStar, FaPuzzlePiece } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from '../components/mock/Hero';
import GeneralContents from '../components/mock/GeneralContents';
import MockGrid from '../components/mock/MockGrid';
import WhyUs from '../components/mock/WhyUs';
import FAQSection from '../components/home/Faq';
import { useState, useEffect } from 'react';

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

    const [mocks, setMocks] = useState([]);
    const fetchMocks = async () => {
        const response = await fetch("http://localhost:5000/api/mock");
        const result = await response.json();
        setMocks(result.data);
    }
    useEffect(() => {
        fetchMocks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-start">
                <AnimatePresence>
                    {/* Hero Section - Full Width */}
                    <Hero />

                    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Mock Tests Section */}
                        <MockGrid mockTests={mocks} />

                        {/* General Content Section */}
                        <GeneralContents />

                        {/* Why Practice With Us Section */}
                        <WhyUs features={features} />
                    </div>
                </AnimatePresence>
            </main>
            <FAQSection />
            <Footer />
        </div>
    );
}