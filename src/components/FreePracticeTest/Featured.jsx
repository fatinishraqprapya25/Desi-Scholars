import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { featureItems } from "./Constants";

const FeaturesSection = () => (
    <motion.section
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
    >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Free Tests?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureItems.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
            ))}
        </div>
    </motion.section>
);

export default FeaturesSection;