import React from 'react';
import { motion } from 'framer-motion';

export default function TeacherStatsCard({ title, value, icon: Icon, bgColor, textColor, borderColor, delay }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: delay,
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`bg-white rounded-xl shadow-sm p-4 border ${borderColor} flex items-center space-x-3`}
        >
            <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
        </motion.div>
    );
}
