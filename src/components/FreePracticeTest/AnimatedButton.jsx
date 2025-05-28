// src/components/AnimatedButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { PRIMARY_COLOR } from "../constants"; // Import constants

const AnimatedButton = ({ onClick, children, className = "", whileHover, whileTap, type = "button" }) => (
    <motion.button
        type={type}
        onClick={onClick}
        className={`relative group overflow-hidden px-8 py-3 border-2 border-[${PRIMARY_COLOR}] text-[${PRIMARY_COLOR}] rounded-lg font-semibold transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[${PRIMARY_COLOR}] focus:ring-opacity-50 ${className}`}
        whileHover={whileHover}
        whileTap={whileTap}
    >
        <span className={`absolute left-0 top-0 h-full w-0 bg-[${PRIMARY_COLOR}] transition-all duration-300 ease-out group-hover:w-full -z-10`}></span>
        <span className="relative z-10 group-hover:text-white transition-colors duration-300 ease-out">
            {children}
        </span>
    </motion.button>
);

export default AnimatedButton;