import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react'; // Added TrendingUp for potential future use or alternative icon

function RecentTestScores() {
    // Mock data for recent test scores
    const recentTestScores = [
        { id: 1, testName: 'Web Dev Basics Quiz', score: 85, date: '2024-05-20' },
        { id: 2, testName: 'Algebra Midterm', score: 72, date: '2024-05-15' },
        { id: 3, testName: 'Python Fundamentals', score: 92, date: '2024-05-10' },
        { id: 4, testName: 'Data Structures Exam', score: 68, date: '2024-05-05' },
        { id: 5, testName: 'English Grammar Test', score: 78, date: '2024-05-01' },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    };

    const tableVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 12,
                delay: 0.2 // Delay table animation slightly after section title
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.section
            className="mb-10 font-sans"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <CheckCircle className="mr-3 h-8 w-8 text-blue-600" /> Recent Test Scores
            </h3>

            <motion.div
                className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6" // Added padding, shadow, border, rounded corners
                variants={tableVariants}
            >
                <table className="min-w-full divide-y divide-gray-200"> {/* Removed bg-white from here */}
                    <thead className="bg-gray-50"> {/* Lighter header background */}
                        <tr>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">Test Name</th> {/* Rounded corners for header */}
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Score</th>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-xl">Date</th> {/* Rounded corners for header */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentTestScores.map((score, index) => (
                            <motion.tr
                                key={score.id}
                                className="hover:bg-blue-50 transition-colors duration-200" // Subtle blue hover
                                variants={rowVariants}
                                transition={{ delay: index * 0.05 }} // Staggered row animation
                            >
                                <td className="py-4 px-6 text-left text-sm font-medium text-gray-800 whitespace-nowrap">{score.testName}</td>
                                <td className="py-4 px-6 text-left">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs font-semibold shadow-sm
                                            ${score.score >= 80 ? 'bg-green-100 text-green-800' :
                                                score.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}
                                    >
                                        {score.score}%
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-left text-sm text-gray-600">{score.date}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.section>
    );
}

export default RecentTestScores;
