import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ feature }) => (
    <motion.div
        key={feature.title}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-blue-500/10 transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: feature.delay, ease: "easeOut" }}
    >
        <div className="text-4xl mb-5">{feature.icon}</div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{feature.text}</p>
    </motion.div>
);

export default FeatureCard;