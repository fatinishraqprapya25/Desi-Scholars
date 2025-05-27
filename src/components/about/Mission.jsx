import { motion } from "framer-motion";

const Mission = () => (
    <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
    >
        <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900" variants={itemVariants}>
                Our Mission
            </motion.h2>
            <motion.p className="text-lg leading-relaxed text-center max-w-4xl mx-auto text-gray-700" variants={itemVariants}>
                Our core mission is to democratize education by providing high-quality, engaging, and free practice tests and learning resources. We believe that everyone deserves the opportunity to unlock their full potential and achieve academic success, regardless of their background or location. We are committed to fostering a love for learning and building confidence in students worldwide.
            </motion.p>
        </div>
    </motion.section>
);

export default Mission;