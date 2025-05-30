import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./Constants";

const NewsletterSection = ({ email, setEmail, handleNewsletterSubmit }) => (
    <motion.section
        className="text-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 text-center max-w-6xl mx-auto"
        style={{
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryDark})`,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
    >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Stay Updated & Never Miss a New Test!
        </h2>
        <p className="text-md sm:text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            Join our community to receive updates on new tests, learning resources, and tips directly in your inbox.
        </p>
        <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
        >
            <input
                type="email"
                placeholder="your.email@example.com"
                className={`w-full flex-grow px-5 py-3.5 rounded-lg text-gray-800 bg-white border-2 border-blue-200 
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                       transition-all duration-300 text-md sm:text-lg placeholder-gray-400 shadow-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <motion.button
                type="submit"
                className="w-full sm:w-auto px-9 py-3.5 text-md sm:text-lg rounded-lg font-semibold 
                       bg-white text-indigo-700 shadow-md hover:shadow-lg
                       hover:bg-indigo-50 transition-all duration-300 ease-out
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                       whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Subscribe Now
            </motion.button>
        </form>
    </motion.section>
);

export default NewsletterSection;