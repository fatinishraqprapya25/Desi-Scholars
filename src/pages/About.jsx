import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const AboutUs = () => {
    // Animation variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 } },
    };

    // Animation variants for individual items within sections
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800">
                {/* Hero Section */}
                <motion.section
                    className="relative py-32 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-purple-700 to-indigo-800 text-white overflow-hidden shadow-xl" // Enhanced gradient and shadow
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                >
                    {/* Subtle background pattern for visual interest */}
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundSize: '200px 200px' }}></div>
                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-shadow-lg" // Larger text, text shadow
                            variants={itemVariants}
                        >
                            Our Story: Empowering Learners
                        </motion.h1>
                        <motion.p
                            className="text-xl sm:text-2xl font-light max-w-3xl mx-auto mb-10 text-shadow-md" // Text shadow
                            variants={itemVariants}
                        >
                            We are dedicated to transforming education through innovative and accessible learning experiences.
                        </motion.p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6"> {/* Increased gap */}
                            <motion.button
                                className="bg-white text-indigo-700 py-4 px-10 rounded-full text-lg font-bold shadow-xl
                            hover:bg-gray-100 transition-all duration-300 transform hover:scale-105
                            focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                                whileHover={{ scale: 1.07, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} // More pronounced hover effect
                                whileTap={{ scale: 0.95 }}
                                variants={itemVariants}
                                onClick={() => alert('Navigate to Courses Page')} // Placeholder for navigation
                            >
                                Browse Courses
                            </motion.button>
                            <motion.button
                                className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-full text-lg font-bold shadow-xl
                            hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-105
                            focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                                whileHover={{ scale: 1.07, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} // More pronounced hover effect
                                whileTap={{ scale: 0.95 }}
                                variants={itemVariants}
                                onClick={() => alert('Navigate to Home/Test Page')} // Placeholder for navigation
                            >
                                Start Learning Now
                            </motion.button>
                        </div>
                    </div>
                </motion.section>

                {/* Our Mission Section */}
                <motion.section
                    className="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner" // Added shadow-inner for subtle depth
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <div className="max-w-6xl mx-auto">
                        <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900" variants={itemVariants}>
                            Our Mission
                        </motion.h2>
                        <motion.p className="text-lg leading-relaxed text-center max-w-4xl mx-auto text-gray-700" variants={itemVariants}>
                            Our core mission is to democratize education by providing high-quality, engaging, and free practice tests and learning resources. We believe that everyone deserves the opportunity to unlock their full potential and achieve academic success, regardless of their background or location. We are committed to fostering a love for learning and building confidence in students worldwide.
                        </motion.p>
                    </div>
                </motion.section>

                {/* What We Do Section */}
                <motion.section
                    className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100" // Enhanced gradient background
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <div className="max-w-6xl mx-auto">
                        <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900" variants={itemVariants}>
                            What We Do
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto"> {/* Increased gap */}
                            <motion.div
                                className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300" // Larger padding, more rounded, stronger shadow, hover scale
                                variants={itemVariants}
                                whileHover={{ y: -5 }} // Slight lift on hover
                            >
                                <div className="text-6xl text-blue-600 mb-5">📚</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">Free Practice Tests</h3>
                                <p className="text-gray-600">
                                    Access a vast library of multiple-choice questions designed to help you prepare for various exams and assessments.
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-6xl text-blue-600 mb-5">💡</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">Self-Assessment Tools</h3>
                                <p className="text-gray-600">
                                    Identify your strengths and weaknesses with detailed result analysis, guiding your study efforts effectively.
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-6xl text-blue-600 mb-5">📈</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">Continuous Learning</h3>
                                <p className="text-gray-600">
                                    Promote a habit of regular practice and knowledge reinforcement to ensure long-term retention and growth.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Our Vision Section */}
                <motion.section
                    className="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner" // Added shadow-inner
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <div className="max-w-6xl mx-auto">
                        <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900" variants={itemVariants}>
                            Our Vision
                        </motion.h2>
                        <motion.p className="text-lg leading-relaxed text-center max-w-4xl mx-auto text-gray-700" variants={itemVariants}>
                            We envision a future where learning is limitless, accessible, and tailored to individual needs. We are continuously innovating to expand our content, enhance our features, and integrate cutting-edge technologies to provide the most effective and enjoyable learning experience possible. Our goal is to be a leading platform in online education, inspiring millions to achieve their academic and personal goals.
                        </motion.p>
                    </div>
                </motion.section>

                {/* Call to Action / Get in Touch Section */}
                <motion.section
                    className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-indigo-800 to-purple-700 text-white shadow-xl" // Enhanced gradient and shadow
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <div className="max-w-6xl mx-auto">
                        <motion.h2 className="text-4xl sm:text-5xl font-bold mb-6" variants={itemVariants}>
                            Ready to Unlock Your Potential?
                        </motion.h2>
                        <motion.p className="text-xl mb-10 max-w-3xl mx-auto font-light" variants={itemVariants}>
                            Explore our practice tests and start your journey towards mastery today.
                        </motion.p>
                        <motion.button
                            className="bg-white text-indigo-700 py-4 px-10 rounded-full text-lg font-bold shadow-xl
                            hover:bg-gray-100 transition-all duration-300 transform hover:scale-105
                            focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                            whileHover={{ scale: 1.07, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => alert('Navigate to Home/Test Page')} // Placeholder for navigation
                        >
                            Start Learning Now
                        </motion.button>
                    </div>
                </motion.section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
