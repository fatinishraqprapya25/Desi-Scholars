import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

// Import new components
import PracticeTestHeader from '../PracticeTests/PracticeTestHeader';
import PracticeTestCard from "../PracticeTests/PracticeTestCard";
import NoTestsFoundMessage from "../PracticeTests/NoTestFound";

// Import constants
import { sectionVariants, itemVariants, cardVariants, practiceTestsData } from '../practicetests/PracticeTestConstants';


export default function ManagePracticeTestsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtering logic for practice tests
    const filteredTests = useMemo(() => {
        let processedTests = [...practiceTestsData];

        if (searchTerm) {
            processedTests = processedTests.filter(test =>
                test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processedTests;
    }, [searchTerm]);

    return (
        <UserDashboardContainer role={"admin"}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <FileText className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Manage Practice Tests
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Oversee and organize all practice tests on your platform. Easily search, create, and manage test content.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <PracticeTestHeader
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {/* Practice Test Cards Grid */}
                    {filteredTests.length > 0 ? (
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
                                {filteredTests.map((test) => (
                                    <PracticeTestCard
                                        key={test.id}
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