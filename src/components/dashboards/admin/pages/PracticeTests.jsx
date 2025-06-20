import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

import PracticeTestHeader from '../PracticeTests/PracticeTestHeader';
import PracticeTestCard from "../PracticeTests/PracticeTestCard";
import NoTestsFoundMessage from "../PracticeTests/NoTestFound";

import { sectionVariants, itemVariants, cardVariants } from '../practicetests/PracticeTestConstants';

export default function ManagePracticeTestsPage() {
    const [practiceTestsData, setPracticeTestsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPracticeTests = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/tests");
                const data = await res.json();
                if (res.ok) {
                    setPracticeTestsData(data.data || []);
                } else {
                    console.error("Failed to fetch practice tests:", data.message);
                }
            } catch (err) {
                console.error("Error fetching practice tests:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPracticeTests();
    }, []);

    return (
        <UserDashboardContainer role={"admin"}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <FileText className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" />
                    Manage Practice Tests
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Oversee and organize all practice tests on your platform.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <PracticeTestHeader />

                    {loading ? (
                        <p className="text-gray-600 mt-4">Loading practice tests...</p>
                    ) : practiceTestsData.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <AnimatePresence>
                                {practiceTestsData.map((test) => (
                                    <PracticeTestCard
                                        key={test._id}
                                        test={test}
                                        variants={cardVariants}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <NoTestsFoundMessage />
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}
