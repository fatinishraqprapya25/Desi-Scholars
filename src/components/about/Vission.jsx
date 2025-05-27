import { motion } from "framer-motion";

const VisionSection = () => (
    <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
    >
        <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900" variants={itemVariants}>
                Our Vision
            </motion.h2>
            <motion.p className="text-lg leading-relaxed text-center max-w-4xl mx-auto text-gray-700" variants={itemVariants}>
                We envision a future where learning is limitless, accessible, and tailored to individual needs. We are continuously innovating to expand our content, enhance our features, and integrate cutting-edge technologies to provide the most effective and enjoyable learning experience possible. Our goal is to be a leading platform in online education, inspiring millions to achieve their academic and personal goals.
            </motion.p>
        </div>
    </motion.section>
);

export default VisionSection;