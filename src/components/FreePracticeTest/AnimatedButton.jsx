import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./Constants";

const AnimatedButton = ({ onClick, children, className = "", whileHover, whileTap, type = "button" }) => (
    <motion.button
        type={type}
        onClick={onClick}
        className={`relative group overflow-hidden px-8 py-3 border-2 border-${COLORS.primary.replace("#", "")} text-${COLORS.primary.replace("#", "")
            } rounded-lg font-semibold transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-${COLORS.primary.replace("#", "")
            } focus:ring-opacity-50 ${className}`}
        whileHover={whileHover || { scale: 1.05 }}
        whileTap={whileTap || { scale: 0.95 }}
    >
        <span
            className={`absolute left-0 top-0 h-full w-0 transition-all duration-300 ease-out group-hover:w-full -z-10`}
            style={{
                background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryDark})`,
            }}
        ></span>
        <span className={`relative z-10 group-hover:text-white transition-colors duration-300 ease-out`}>
            {children}
        </span>
    </motion.button>
);

export default AnimatedButton;