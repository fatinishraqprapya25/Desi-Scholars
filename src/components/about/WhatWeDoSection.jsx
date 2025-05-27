import { motion } from "framer-motion";
import WhatWeDoCard from "./WhatWeDoCard";

const WhatWeDoSection = () => (
    <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
    >
        <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900" variants={itemVariants}>
                What We Do
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                <WhatWeDoCard
                    icon="📚"
                    title="Free Practice Tests"
                    description="Access a vast library of multiple-choice questions designed to help you prepare for various exams and assessments."
                />
                <WhatWeDoCard
                    icon="💡"
                    title="Self-Assessment Tools"
                    description="Identify your strengths and weaknesses with detailed result analysis, guiding your study efforts effectively."
                />
                <WhatWeDoCard
                    icon="📈"
                    title="Continuous Learning"
                    description="Promote a habit of regular practice and knowledge reinforcement to ensure long-term retention and growth."
                />
            </div>
        </div>
    </motion.section>
);

export default WhatWeDoSection;