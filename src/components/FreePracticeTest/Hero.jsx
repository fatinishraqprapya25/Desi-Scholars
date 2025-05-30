import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { COLORS } from "./Constants";

const HeroSection = () => (
    <motion.section
        className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
        <div
            className="absolute inset-0 opacity-50 rounded-2xl"
            style={{
                background: `linear-gradient(to bottom right, ${COLORS.primaryLight}, #BFDBFE)`,
            }}
        ></div>
        <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-5 leading-tight">
                Sharpen Your Skills, Master Every Concept
            </h2>
            <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Our free online tests help you gauge your understanding and identify areas for improvement. Start
                your learning journey today!
            </p>
            <AnimatedButton
                onClick={() =>
                    window.scrollTo({
                        top: document.getElementById("exams-list-section")?.offsetTop - 100 || 0,
                        behavior: "smooth",
                    })
                }
                className="text-lg px-10 py-4"
            >
                Explore Tests Now
            </AnimatedButton>
        </div>
    </motion.section>
);

export default HeroSection;