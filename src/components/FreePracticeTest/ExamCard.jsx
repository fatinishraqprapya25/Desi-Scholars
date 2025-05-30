import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./Constants";

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: `0px 12px 35px rgba(79, 70, 229, 0.15)`, borderColor: COLORS.primary },
    tap: { scale: 0.97 },
};

const ExamCard = ({ exam, onClick, index }) => (
    <motion.div
        key={exam.id}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 cursor-pointer border-2 border-transparent transition-all duration-300 ease-out flex flex-col"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={() => onClick(exam.id)}
        custom={index}
        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
        <div className="text-5xl mb-4 text-center">{exam.icon}</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
            {exam.title}
        </h2>
        <p className="text-gray-600 mb-6 text-center text-sm sm:text-base flex-grow">
            {exam.description}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <span
                className={`text-sm sm:text-md font-semibold px-3 py-1.5 rounded-md`}
                style={{
                    color: COLORS.primary,
                    backgroundColor: COLORS.primaryLight,
                }}
            >
                {exam.questions.length} Questions
            </span>
            <span
                className={`text-sm sm:text-md font-semibold px-3 py-1.5 rounded-md
          ${exam.difficulty === "Beginner" ? "bg-green-100 text-green-700" : ""}
          ${exam.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" : ""}
          ${exam.difficulty === "Advanced" ? "bg-red-100 text-red-700" : ""}
        `}
            >
                {exam.difficulty}
            </span>
        </div>
    </motion.div>
);

export default ExamCard;