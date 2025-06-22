// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Container from "../common/Container"; // Assuming you have a Container component

export default function AboutDSATScholars() {
    return (
        <section className="py-16 bg-gray-50"> {/* Simple light gray background */}
            <Container>
                <div className="flex flex-col md:flex-row items-center rounded-xl shadow-lg overflow-hidden bg-white"> {/* White background for the main content block */}
                    {/* Left - Animated Image with 3D effect */}
                    <motion.div
                        className="flex-1 relative md:min-h-[400px] flex items-center justify-center perspective-1000" // Added perspective for 3D effect
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        // 3D hover effects
                        whileHover={{
                            rotateY: 5, // Rotate 5 degrees on Y axis
                            rotateX: 2, // Rotate 2 degrees on X axis
                            scale: 1.02, // Slightly scale up
                            transition: { duration: 0.3 }
                        }}
                        // Reset when not hovering
                        whileTap={{
                            rotateY: 0,
                            rotateX: 0,
                            scale: 1,
                            transition: { duration: 0.3 }
                        }}
                        // Subtle angled shape, keeping the border simple
                        style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
                            alt="Abstract Learning"
                            className="w-full h-full object-cover absolute inset-0"
                            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)' }}
                        />
                        {/* Simple light gray border matching the background */}
                        <div className="absolute inset-0 border-2 border-gray-200" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)' }}></div>
                    </motion.div>

                    {/* Right - Text content */}
                    <div className="flex-1 p-8 text-center md:text-left bg-white"> {/* Plain white background for text */}
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-4"> {/* Darker gray for main heading */}
                            Discover <span className="text-indigo-600">DSAT Scholars</span> {/* Accent color for the name */}
                        </h2>
                        {/* <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            In Kurigram, Rangpur Division, Bangladesh, **DSAT Scholars** is dedicated to bringing
                            high-quality educational resources to aspiring learners.
                        </p> */}
                        <p className="text-gray-600 leading-relaxed mb-8">
                            At DSAT Scholars, we provide free, expert-led test prep and college mentorship to help Bangladeshi students from every background succeed. Whether you're studying in a village classroom or on your phone at home, our mission is to guide you toward global opportunities — with the resources, support, and belief you need to thrive.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out"
                        >
                            Explore Our Courses
                        </motion.button>
                    </div>
                </div>
            </Container>
        </section>
    );
}