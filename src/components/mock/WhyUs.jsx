// src/components/WhyUs.jsx
import { motion } from "framer-motion";
// Ensure these icons are imported from react-icons/fa or similar
import { FaBrain, FaLaptopCode, FaChartLine, FaCheckCircle, FaStar, FaPuzzlePiece, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

// Define COLORS or import from a centralized file for consistency
const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryLight: '#60A5FA', // blue-400
    secondary: '#6366F1', // indigo-500
    accent: '#10B981', // emerald-500
    backgroundLight: '#F9FAFB', // gray-50
    cardBackground: '#FFFFFF', // white
    textPrimary: '#1F2937', // gray-900
    textSecondary: '#4B5563', // gray-700
    border: '#E5E7EB', // gray-200
    gold: '#FFD700' // Added for a premium feel
};

// You might want to pass this `features` array as a prop from Mock.jsx
// or define it here if this component is self-contained.
// For this example, I'll define it here for self-containment.
const features = [
    { icon: <FaBrain className="text-5xl text-blue-600" />, title: "Expertly Crafted Questions", description: "Developed by subject matter experts to cover all essential topics and difficulty levels, ensuring relevance and accuracy.", },
    { icon: <FaLaptopCode className="text-5xl text-indigo-600" />, title: "Realistic Test Environment", description: "Simulate the actual exam experience with timed tests and a user-friendly interface that mimics real-world conditions.", },
    { icon: <FaChartLine className="text-5xl text-emerald-600" />, title: "Instant Feedback & Review", description: "Get immediate, detailed results and review your answers to understand your strengths, weaknesses, and areas for improvement.", },
    { icon: <FaCheckCircle className="text-5xl text-blue-400" />, title: "Comprehensive Performance Analytics", description: "Track your progress over time with insightful analytics, highlighting trends and guiding your study efforts.", },
    { icon: <FaStar className="text-5xl text-yellow-500" />, title: "Adaptive Learning Paths", description: "Our system adapts to your performance, suggesting personalized study materials and practice tests for targeted improvement.", },
    { icon: <FaShieldAlt className="text-5xl text-purple-600" />, title: "Secure & Reliable Platform", description: "Your data and progress are safe with our robust and secure platform, ensuring a smooth and uninterrupted learning experience.", },
];


export default function WhyUs({ features: propFeatures }) { // Renamed prop to propFeatures to avoid conflict
    // Use propFeatures if provided, otherwise use the internal features data
    const currentFeatures = propFeatures || features;

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.6
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger animation for each card
                delayChildren: 0.2 // Delay before first card starts
            }
        }
    };

    return (
        <section className="bg-gray-50 py-16 sm:py-20 rounded-3xl shadow-inner mb-12 sm:mb-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-14 leading-tight bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Why Choose Our Platform?
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {currentFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200 cursor-pointer group relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            variants={cardVariants}
                            whileHover={{ y: -5 }} // Lift slightly on hover
                        >
                            {/* Decorative top border on hover */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                            {/* Icon container with background blur/light */}
                            <div className="mb-6 text-6xl transform transition-transform duration-300 group-hover:scale-110 p-3 rounded-full bg-blue-50 bg-opacity-70 backdrop-blur-sm border border-blue-100">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed text-center flex-grow">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}