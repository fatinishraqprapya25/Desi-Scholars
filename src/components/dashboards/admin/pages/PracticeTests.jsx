import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, PlusCircle, Search, Edit, Trash2, Eye, Calendar, Users, Hash, Lightbulb, Clock, HelpCircle, User
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer'; // Assuming this component exists

// Mock data for practice tests
const practiceTestsData = [
    {
        id: 'PT-001',
        title: 'React Fundamentals Quiz',
        description: 'A comprehensive quiz covering basic React concepts, JSX, components, and state management.',
        status: 'Published',
        totalQuestions: 25,
        durationMinutes: 30, // Example duration
        lastModified: '2025-05-29',
        createdBy: 'Dr. Emily White'
    },
    {
        id: 'PT-002',
        title: 'Advanced JavaScript Concepts',
        description: 'Test your knowledge on asynchronous JS, closures, prototypes, and advanced array methods.',
        status: 'Draft',
        totalQuestions: 40,
        durationMinutes: 2, // Example duration closer to 2 minutes
        lastModified: '2025-06-03',
        createdBy: 'Prof. David Lee'
    },
    {
        id: 'PT-003',
        title: 'SQL Database Essentials',
        description: 'Assess your understanding of SQL queries, database design, and normalization.',
        status: 'Published',
        totalQuestions: 30,
        durationMinutes: 45,
        lastModified: '2025-05-20',
        createdBy: 'Ms. Laura Davis'
    },
    {
        id: 'PT-004',
        title: 'Cybersecurity Basics Assessment',
        description: 'An introductory assessment on common cyber threats, security principles, and best practices.',
        status: 'Archived',
        totalQuestions: 20,
        durationMinutes: 2, // Example duration closer to 2 minutes
        lastModified: '2025-04-10',
        createdBy: 'Dr. Nancy Wilson'
    },
];

export default function ManagePracticeTestsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const accentPurple = '#8A4AF8'; // Define the accent color for consistency

    // Framer Motion variants (reused from CoursesPage)
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    const defaultAvatar = 'https://via.placeholder.com/40'; // Placeholder for creator avatar if not provided

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
    }, [searchTerm, practiceTestsData]);

    // Handlers for test actions
    const handleCreateTest = () => {
        alert('Prompt to create a new practice test (e.g., open a form modal)!');
    };

    const handleEditTest = (testId) => {
        alert(`Edit practice test with ID: ${testId}`);
    };

    // Function to get status badge styling (adapted for test statuses)
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Published':
                return 'bg-green-100 text-green-800';
            case 'Draft':
                return 'bg-blue-100 text-blue-800';
            case 'Archived':
                return 'bg-orange-100 text-orange-800';
            case 'Inactive': // Added for completeness, though not in mock data
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <UserDashboardContainer admin={true}>
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
                    {/* Top Controls: Search and Create Test */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <div className="relative flex-grow w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search practice tests..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <button
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                            onClick={handleCreateTest}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Create New Test
                        </button>
                    </div>

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
                                    <motion.div
                                        key={test.id}
                                        className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
                                        variants={cardVariants}
                                        layout // Enables smooth layout transitions for reordering/filtering
                                    >
                                        {/* Decorative top border for "lucrative" feel */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

                                        {/* Status Badge at the top right */}
                                        <div className="flex justify-between items-start mb-2">
                                            {/* Test ID */}
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Hash className="w-3.5 h-3.5 mr-1 text-gray-400" /> ID: <span className="font-medium ml-0.5">{test.id}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(test.status)}`}>
                                                {test.status}
                                            </span>
                                        </div>

                                        {/* Test Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                            {test.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={test.description}>
                                            {test.description}
                                        </p>

                                        {/* Questions, Duration, Last Modified */}
                                        <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                                            <div className="flex items-center"><HelpCircle className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> {test.totalQuestions} Questions</div>
                                            <div className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1.5 text-purple-500" /> {test.durationMinutes} Mins</div>
                                            <div className="flex items-center col-span-2"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Created: {test.lastModified}</div>
                                        </div>


                                        {/* Action Button: Edit Test */}
                                        <div className="flex justify-end pt-2">
                                            <button
                                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                                                onClick={() => handleEditTest(test.id)}
                                                title="Edit Test"
                                            >
                                                <Edit className="h-4 w-4 mr-2" /> Edit Test
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 text-base">
                            <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No practice tests found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Adjust your search or create a new practice test!
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}