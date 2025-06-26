import { motion } from "framer-motion";
import { FaBook, FaClock, FaPlayCircle, FaLightbulb, FaChartLine, FaPuzzlePiece, FaLaptopCode, FaFlask } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    primaryLight: '#60A5FA', // blue-400
    secondary: '#6366F1', // indigo-500
    accent: '#10B981', // emerald-500
    backgroundLight: '#F9FAFB', // gray-50
    cardBackground: '#FFFFFF', // white
    textPrimary: '#1F2937', // gray-900
    textSecondary: '#4B5563', // gray-700
    border: '#E5E7EB', // gray-200
};

const defaultMockTests = [
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
        icon: <FaBook className="text-green-500" />,
    },
    {
        id: 'science-fundamentals',
        title: 'Science Fundamentals Test',
        description: 'Covers core concepts in Physics, Chemistry, and Biology to test your basic scientific understanding.',
        modules: ['physics', 'chemistry', 'biology'],
        totalQuestions: 15,
        timeLimit: 450, // 7.5 minutes
        icon: <FaPuzzlePiece className="text-red-500" />,
    },
    {
        id: 'coding-challenge-1',
        title: 'Basic Coding Challenge',
        description: 'Assesses fundamental programming logic and problem-solving skills with a set of coding questions.',
        modules: ['logic', 'algorithms'],
        totalQuestions: 10,
        timeLimit: 180, // 3 minutes
        icon: <FaLaptopCode className="text-gray-700" />,
    },
    {
        id: 'general-knowledge-quiz',
        title: 'General Knowledge Quiz',
        description: 'A broad quiz covering current affairs, history, geography, and general awareness.',
        modules: ['gk'],
        totalQuestions: 20,
        timeLimit: 360, // 6 minutes
        icon: <FaFlask className="text-orange-500" />, // New icon and test
    },
];


// Framer Motion variants for staggered animation of cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
            duration: 0.6
        }
    }
};

export default function MockGrid({ mockTests: propMockTests }) {
    const currentMockTests = propMockTests || defaultMockTests;
    const navigate = useNavigate();

    const handleSelectTest = (testId) => {
        navigate(`/quiz/${testId}`);
    };


    return (
        <section id="mock-tests-section" className="bg-gray-50 py-16 sm:py-20 rounded-3xl shadow-inner mb-12 sm:mb-16">
            {/* The heading will remain centered within the max-width container */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Select Your Test
                </motion.h2>
            </div>


            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8" // Removed max-width and added padding
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {currentMockTests.map((test, index) => (
                    <Link to={`/mock/${test._id}`} key={test._id}>
                        <motion.div
                            className="relative bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center overflow-hidden group transform transition-all duration-400 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 cursor-pointer"
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectTest(test._id)} // Changed to test._id for consistency
                        >
                            {/* Dynamic Background Overlay for Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 opacity-0 group-hover:opacity-20 transition-opacity duration-400 rounded-3xl -z-10 blur-md"></div>
                            {/* Static White Background */}
                            <div className="absolute inset-0 bg-white rounded-3xl -z-20"></div>

                            {/* Card Content */}
                            <div className="p-7 flex flex-col items-center justify-between h-full w-full">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                                    {test.name}
                                </h3>
                                <p className="text-gray-600 text-base mb-5 flex-grow px-3 leading-relaxed max-h-24 overflow-hidden">
                                    {test.description}
                                </p>

                                {/* Test Details */}
                                <div className="text-base font-semibold text-gray-700 mb-6 space-y-2">
                                    <span className="flex items-center justify-center gap-3">
                                        <FaBook className="text-blue-500 text-xl" />{" "}
                                        <span className="font-bold">
                                            {test.totalQuestions || 6} Questions
                                        </span>
                                    </span>
                                    <span className="flex items-center justify-center gap-3">
                                        <FaClock className="text-indigo-500 text-xl" />{" "}
                                        <span className="font-bold">{test.duration} Minutes</span>
                                    </span>
                                </div>

                                {/* Call to Action Button */}
                                <motion.button
                                    className="mt-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 transform group-hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <FaPlayCircle className="text-xl" /> Start Test
                                </motion.button>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>
        </section>
    );
}