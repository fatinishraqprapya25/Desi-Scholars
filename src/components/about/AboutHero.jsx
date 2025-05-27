import { motion } from "framer-motion";

// Hero Section Component
const HeroSection = () => (
    <motion.section
        className="relative py-32 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-purple-700 to-indigo-800 text-white overflow-hidden shadow-xl"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
    >
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundSize: '200px 200px' }}></div>
        <div className="relative z-10 max-w-6xl mx-auto">
            <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-shadow-lg"
                variants={itemVariants}
            >
                Our Story: Empowering Learners
            </motion.h1>
            <motion.p
                className="text-xl sm:text-2xl font-light max-w-3xl mx-auto mb-10 text-shadow-md"
                variants={itemVariants}
            >
                We are dedicated to transforming education through innovative and accessible learning experiences.
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.button
                    className="bg-white text-indigo-700 py-4 px-10 rounded-full text-lg font-bold shadow-xl
                     hover:bg-gray-100 transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                    whileHover={{ scale: 1.07, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                    onClick={() => alert('Navigate to Courses Page')}
                >
                    Browse Courses
                </motion.button>
                <motion.button
                    className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-full text-lg font-bold shadow-xl
                     hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                    whileHover={{ scale: 1.07, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                    onClick={() => alert('Navigate to Home/Test Page')}
                >
                    Start Learning Now
                </motion.button>
            </div>
        </div>
    </motion.section>
);

export default AboutHero; 