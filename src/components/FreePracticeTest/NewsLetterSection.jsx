import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
const COLORS = {
    primary: '#4F46E5',       // A deep indigo
    primaryLight: '#A78BFA',  // A lighter violet/purple
    secondary: '#10B981',     // A vibrant emerald green
    secondaryLight: '#6EE7B7', // A lighter emerald green
    accent: '#EC4899',       // A bright pink/magenta (can be used as a third color if needed)
    textLight: "#F3F4F6",     // Light gray for text
    textDark: "#1F2937",      // Dark gray for text
};

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // State for displaying messages

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setMessage("Subscribing..."); // Show loading message

        // Simulate API call
        try {
            // In a real application, you would send the email to your backend here.
            // Example: const response = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
            // const data = await response.json();
            console.log("Newsletter subscription email:", email);

            // Simulate success after a short delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            setMessage("Thank you for subscribing to our newsletter!");
            setEmail(""); // Clear the input field
        } catch (error) {
            console.error("Subscription failed:", error);
            setMessage("Subscription failed. Please try again.");
        } finally {
            // Clear message after some time
            setTimeout(() => setMessage(""), 5000);
        }
    };

    // Animation variants for staggered appearance, consistent with HeroSection
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3, // Slightly less delay than hero for quicker appearance
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.section
            className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden py-20 px-6 md:px-12 lg:px-16" // Adjusted min-height and padding
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Dynamic, multi-layered background, consistent with HeroSection */}
            <div
                className="absolute inset-0 z-0 opacity-95"
                style={{
                    backgroundImage: `
                        url('data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23ffffff" fill-opacity="0.07" d="M0 0h16v16H0z" /%3E%3C/svg%3E'), /* Subtle dot pattern */
                        linear-gradient(160deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%), /* Main gradient */
                        radial-gradient(circle at 10% 20%, ${COLORS.secondaryLight} 0%, transparent 40%), /* Top-left highlight */
                        radial-gradient(circle at 90% 80%, #BFDBFE 0%, transparent 50%) /* Bottom-right highlight */
                    `,
                    backgroundBlendMode: 'overlay, normal, normal, normal, normal',
                    backgroundSize: 'auto, cover, cover, cover',
                    backgroundPosition: 'center, center, center, center',
                }}
            ></div>

            {/* Abstract shapes / blobs - subtle and consistent with HeroSection */}
            <div className="absolute -top-1/4 -left-[5%] w-[300px] h-[300px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-alt animation-delay-1000"></div>
            <div className="absolute -bottom-1/4 -right-[5%] w-[250px] h-[250px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-alt animation-delay-3000"></div>
            <div className="absolute top-1/4 right-[15%] w-[200px] h-[200px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-alt animation-delay-5000"></div>

            {/* Content Wrapper */}
            <div className="relative z-10 mx-auto text-center max-w-4xl">
                <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-lg" // Consistent styling
                    variants={itemVariants}
                >
                    Unlock Exclusive Insights
                </motion.h2>
                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto font-light drop-shadow-md leading-relaxed" // Consistent styling
                    variants={itemVariants}
                >
                    Subscribe to our newsletter for the latest test updates, expert learning tips, and exclusive content delivered straight to your inbox.
                </motion.p>
                <motion.form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
                    variants={itemVariants}
                >
                    <AnimatedButton
                        onClick={() =>
                            window.scrollTo({
                                top: document.getElementById("exams-list-section")?.offsetTop - 100 || 0,
                                behavior: "smooth",
                            })
                        }
                        // Enhanced button styling for a more lucrative look
                        className="text-xl px-12 py-4 font-extrabold rounded-[50%] shadow-2xl
                                   bg-gradient-to-r from-blue-600 to-indigo-700 text-white
                                   hover:from-blue-700 hover:to-indigo-800
                                   hover:shadow-primary-3xl transition-all duration-300
                                   transform hover:scale-105 active:scale-95 active:shadow-inner
                                   focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
                        style={{ letterSpacing: '0.08em' }} // Increased letter spacing for button text
                    >
                        Subscribe Now
                    </AnimatedButton>
                </motion.form>
                {message && (
                    <motion.p
                        className="mt-4 text-white text-md font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {message}
                    </motion.p>
                )}
            </div>
        </motion.section>
    );
};

export default NewsletterSection;
