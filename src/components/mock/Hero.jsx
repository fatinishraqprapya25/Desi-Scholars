import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";

export default function Hero() {
    return (
        <motion.section
            className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 sm:py-24 md:py-32 shadow-xl mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
                    Conquer Your Exams. <br className="hidden sm:inline" /> Practice, Perform, Prevail.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 mb-8">
                    Unlock your full potential with our comprehensive mock tests. Experience real exam conditions and get instant feedback to sharpen your skills.
                </p>
                <motion.button
                    className="px-10 py-4 bg-white text-blue-700 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center mx-auto gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('mock-tests-section').scrollIntoView({ behavior: 'smooth', block: 'start', offset: -100 })}
                >
                    <FaPlayCircle className="text-xl" /> Start Your Journey
                </motion.button>
            </div>
        </motion.section>
    )
}