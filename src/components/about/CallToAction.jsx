import { motion } from "framer-motion";

const CallToAction = () => (
    <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-indigo-800 to-purple-700 text-white shadow-xl"
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
                onClick={() => alert('Navigate to Home/Test Page')}
            >
                Start Learning Now
            </motion.button>
        </div>
    </motion.section>
);

export default CallToAction;