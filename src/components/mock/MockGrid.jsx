import { motion } from "framer-motion";
import { FaBook, FaClock, FaPlayCircle } from 'react-icons/fa';

export default function MockGrid({ mockTests }) {
    return (
        <section id="mock-tests-section" className="mb-12 sm:mb-16 py-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 sm:mb-14 leading-tight">
                Select Your Test
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
    )
}