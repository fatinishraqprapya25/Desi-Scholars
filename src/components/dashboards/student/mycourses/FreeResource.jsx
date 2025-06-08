import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FolderOpen, Search } from 'lucide-react'; // Added Search for potential future use or alternative icon

function FreeResources() {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100" // Consistent light background and border
            initial="hidden"
            animate="visible"
            variants={itemVariants}
        >
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <FolderOpen className="mr-3 h-8 w-8 text-blue-600" /> Free Resources
            </h3>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Unlock a vast library of free study materials, comprehensive tutorials, and insightful guides to boost your learning journey.
            </p>
            <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-5 rounded-xl shadow-lg
                           hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                           text-lg font-medium flex items-center justify-center transform hover:scale-105 active:scale-95"
            >
                <BookOpen className="mr-2 h-5 w-5" /> Explore Resources
            </button>
        </motion.div>
    );
}

export default FreeResources;
