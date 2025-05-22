// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PracticeTestPromo() {
    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-700 to-purple-800">
            {/* Background decorative elements - Simplified for reliability */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full mix-blend-overlay transform translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10"> {/* Ensure content is above background */}
                <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 text-center text-white"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Ready to <span className="text-yellow-300">Ace Your Exams</span>?
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-indigo-100/90"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Dive into our **free practice tests** and pinpoint your strengths and areas for growth. Whether it's **JavaScript, React**, or any other core subject, we've got you covered. It's quick, insightful, and absolutely free!
                    </motion.p>
                    <motion.a
                        href="/practice-tests" // Changed to a more meaningful link
                        className="inline-flex items-center justify-center bg-white text-indigo-700 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out transform"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} // Subtle lift and shadow on hover
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Start a Free Test
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}