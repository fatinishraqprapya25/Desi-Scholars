// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Container from "../common/Container";

export default function Hero() {
    return (
        <section
            className="py-20 md:py-28 lg:py-32 relative overflow-hidden" // Increased vertical padding, added relative and overflow-hidden for background effects
            style={{
                // More refined radial gradients for a softer, more inviting feel
                background: `radial-gradient(circle at top left, rgba(129, 140, 248, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at top right, rgba(129, 140, 248, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.2) 0%, transparent 50%),
                             linear-gradient(to bottom, #f0f4f8, #ffffff)` // Light gradient from a very light blue-gray to white
            }}
        >
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-12 px-4 md:px-0">
                    {/* Left content - Animated Text */}
                    <motion.div
                        className="flex-1 text-center md:text-left z-10" // Added z-10 to ensure text is above background elements
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm">
                            Unlock{" "}
                            <span className="text-indigo-700"> {/* Darker, richer indigo */}
                                <Typewriter
                                    words={["Your Potential", "Your Skills", "Your Career", "Your Future"]}
                                    loop={0} // infinite
                                    cursor
                                    cursorStyle="_" // More prominent cursor
                                    typeSpeed={70} // Slightly faster typing
                                    deleteSpeed={50} // Slightly faster deleting
                                    delaySpeed={2000} // Shorter delay between words
                                />
                            </span>{" "}
                            with DSAT Scholars
                        </h1>

                        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                            Join thousands of learners in **Kurigram, Bangladesh**, mastering new skills and advancing their careers
                            with our **top-tier courses, comprehensive resources, and practice tests.**
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        >
                            <Link
                                to="/webinar"
                                className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-5 4v-8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h3a2 2 0 002-2z" />
                                </svg>
                                Join Free Webinar
                            </Link>
                            <Link
                                to="/courses"
                                className="inline-flex items-center justify-center border border-indigo-600 text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l-1.834 1.018M12 14L9.819 19.99M12 14l2.181 5.99M12 14l-4.225 2.112" />
                                </svg>
                                Browse Courses
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right image with more dynamic animation */}
                    <motion.div
                        className="flex-1 max-w-md md:max-w-lg mx-auto relative z-0"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        whileHover={{ scale: 1.03, rotate: 2, y: -5, transition: { duration: 0.3 } }} // Added slight rotation and vertical lift on hover
                    >
                        <img
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                            alt="Learning illustration"
                            className="w-full h-auto rounded-xl shadow-2xl transform hover:shadow-indigo-300/50 transition-shadow duration-300" // Larger shadow and hover shadow
                        />
                        {/* Optional: Add a subtle overlay or shape behind the image for more depth */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -top-8 left-8 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}