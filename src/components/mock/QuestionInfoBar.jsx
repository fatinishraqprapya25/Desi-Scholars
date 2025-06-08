// components/quiz/QuestionInfoBar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const QuestionInfoBar = ({ questionId, domain, skill, difficulty, scoreBand }) => {
    const infoItems = [
        { label: "QUESTION ID", value: questionId, color: "text-blue-600" },
        { label: "DOMAIN", value: domain, color: "text-purple-600" },
        { label: "SKILL", value: skill, color: "text-emerald-600" },
        { label: "DIFFICULTY", value: difficulty.toUpperCase(), color: "text-orange-600" },
        { label: "SCORE BAND", value: scoreBand, color: "text-rose-600" },
    ];

    return (
        <div className="w-full bg-blue-100 text-blue-800 px-4 py-2 sm:px-6 sm:py-3 shadow-inner flex flex-wrap justify-center sm:justify-start items-center gap-x-6 gap-y-2 text-sm sm:text-base">
            {infoItems.map((item, index) => (
                <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <span className="font-semibold mr-1">{item.label}:</span>
                    <span className={`${item.color} font-bold`}>{item.value}</span>
                </motion.div>
            ))}
        </div>
    );
};

export default QuestionInfoBar;