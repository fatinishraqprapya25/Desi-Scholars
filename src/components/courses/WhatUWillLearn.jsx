import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay: 0.1,
            when: "beforeChildren", // Animate children after parent
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};


export default function WhatUWillLearn({ id }) {
    const [learnings, setLearnings] = useState([]);
    useEffect(() => {
        const fetchLearnings = async () => {
            const response = await fetch(`http://localhost:5000/api/matrials/${id}`);
            if (!response.ok) {
                alert("failed to fetch learning matrials");
                return;
            }
            const result = await response.json();
            if (!result.success) {
                alert(result.message);
                return;
            }
            setLearnings(result.data);
        }
        fetchLearnings();
    }, []);

    return <motion.section
        className="max-w-7xl mx-auto px-6 mt-16 mb-12 bg-white rounded-3xl shadow-3xl p-10 border border-gray-100 relative overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 text-center relative z-10">What You'll Learn</h2>
        {/* Subtle background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <svg className="absolute top-1/4 left-1/4 w-24 h-24 text-purple-200 transform rotate-12" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" /></svg>
            <svg className="absolute bottom-1/3 right-1/4 w-28 h-28 text-indigo-200 transform -rotate-24" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 13.293a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3z" /></svg>
        </div>

        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-800 relative z-10"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1, // Stagger children animations
                    },
                },
            }}
            initial="hidden"
            whileInView="visible" // Use whileInView on the parent
            viewport={{ once: true, amount: 0.2 }}
        >
            {learnings.map(learning => <motion.p variants={itemVariants} className="flex items-start mb-3 text-lg"><FaCheckCircle className="text-green-600 mr-4 mt-1 flex-shrink-0 text-2xl" />{learning.title}</motion.p>)}

        </motion.div>
    </motion.section>

}