import React, { useState } from "react";
import { motion } from "framer-motion";

// Define COLORS directly for a self-contained example
const COLORS = {
    primary: "#4F46E5", // A vibrant indigo
    primaryDark: "#3730A3", // A darker shade of indigo
    accent: "#EC4899", // A bright pink/magenta
    textLight: "#F3F4F6", // Light gray for text
    textDark: "#1F2937", // Dark gray for text
};

const NewsletterSection = () => {
    const [email, setEmail] = useState("");

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send the email to your backend here.
        console.log("Newsletter subscription email:", email);
        alert("Thank you for subscribing to our newsletter!"); // Using alert for demonstration
        setEmail(""); // Clear the input field
    };

    return (
        <div className="min-h-screen flex items-center justify-center font-sans">
            <motion.section
                className="text-white rounded-none shadow-none md:p-12 lg:p-16 text-center w-full
                   overflow-hidden relative"
                style={{
                    background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.primaryDark})`
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
                {/* Optional: Add subtle background patterns or shapes for more visual interest */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
                    </svg>
                </div>

                <div className="relative z-10 mx-auto">
                    {" "}
                    {/* Content wrapper to keep text above background pattern and centered */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                        Stay Updated & Never Miss a New Test!
                    </h2>
                    <p className="text-md sm:text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Join our community to receive updates on new tests, learning resources, and tips directly in your inbox.
                    </p>
                    <form
                        onSubmit={handleNewsletterSubmit}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className={`w-full flex-grow px-6 py-4 rounded-md text-gray-800 bg-white
                          border-2 border-transparent focus:outline-none focus:border-indigo-600
                          focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-40
                          transition-all duration-300 text-lg placeholder-gray-500
                          shadow-md`} // Refined input styling: rounded-full, larger padding, better focus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <motion.button
                            type="submit"
                            className="w-full sm:w-auto px-12 py-4 text-lg rounded-md font-extrabold
                         bg-transparent text-white shadow-xl hover:shadow-2xl hover:text-indigo-700
                         hover:bg-white transition-all duration-300 ease-out
                         focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-60
                         whitespace-nowrap border border-white/60" // Rounded-full, larger padding, more prominent shadow
                            whileHover={{ scale: 1.05, boxShadow: `0px 12px 25px rgba(0,0,0,0.25)` }} // Enhanced hover shadow
                            whileTap={{ scale: 0.95 }}
                        >
                            Subscribe Now
                        </motion.button>
                    </form>
                </div>
            </motion.section>
        </div>
    );
};

export default NewsletterSection;
