// src/components/GeneralContents.jsx (or wherever you prefer to place it)
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa'; // A relevant icon for academic content

export default function GeneralContents() {
    return (
        <motion.section
            className="relative w-4/5 mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-sm border border-gray-200 mb-12 sm:mb-16 text-center overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Subtle Gradient Overlay/Accent */}
            <div
                className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl"
                aria-hidden="true"
            ></div>

            {/* Optional: Background graphic or pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white -z-10 opacity-70"></div>


            {/* Content Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center mb-2"
            >
                <FaGraduationCap className="text-6xl text-blue-600 mb-4 transform hover:rotate-6 transition-transform duration-300" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                    Prepare Smarter, Not Just Harder
                </h2>

            </motion.div>

            {/* Main Content Paragraphs */}
            <div className=" text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    With detailed performance analytics and immediate feedback, you'll always know where you stand. Pinpoint your strengths, identify areas for improvement, and turn your study efforts into tangible, measurable results. It's time to build confidence and excel!
                </motion.p>
            </div>

            {/* Call to Action Button */}
            <motion.button
                className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.95 }}
            // onClick={() => console.log("Explore Courses Clicked!")} // Replace with actual navigation
            >
                <span className="text-xl">🚀</span> Explore All Courses
            </motion.button>
        </motion.section>
    );
}