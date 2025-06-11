import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlusCircle, Lightbulb } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import CourseCard from '../course/CourseCard';
import CourseSearchInput from '../course/CourseSearchInput';
import { Link } from 'react-router-dom';

const coursesData = [
    {
        id: 'C-001',
        title: 'Introduction to React',
        instructor: 'Dr. Emily White',
        studentsEnrolled: 120,
        status: 'Active',
        lastUpdated: '2025-05-30',
        category: 'Web Development',
        description: 'Master the fundamentals of React, JSX, state, props, and component lifecycle. Build interactive user interfaces with modern React practices.'
    },
    {
        id: 'C-002',
        title: 'Advanced JavaScript',
        instructor: 'Prof. David Lee',
        studentsEnrolled: 95,
        status: 'Active',
        lastUpdated: '2025-06-01',
        category: 'Web Development',
        description: 'Dive deep into ES6+, asynchronous JavaScript, advanced array methods, closures, and design patterns. Enhance your JavaScript proficiency.'
    },
    {
        id: 'C-003',
        title: 'Data Structures & Algorithms',
        instructor: 'Ms. Sarah Chen',
        studentsEnrolled: 150,
        status: 'Archived',
        lastUpdated: '2025-04-15',
        category: 'Computer Science',
        description: 'Learn essential data structures (arrays, linked lists, trees, graphs) and algorithms (sorting, searching) for efficient problem-solving.'
    },
    {
        id: 'C-004',
        title: 'Machine Learning Basics',
        instructor: 'Mr. Alex Kim',
        studentsEnrolled: 80,
        status: 'Active',
        lastUpdated: '2025-05-28',
        category: 'Artificial Intelligence',
        description: 'Explore the foundations of machine learning, including supervised and unsupervised learning, model evaluation, and common algorithms.'
    },
    {
        id: 'C-005',
        title: 'UI/UX Design Principles',
        instructor: 'Dr. Olivia Brown',
        studentsEnrolled: 70,
        status: 'Draft',
        lastUpdated: '2025-03-20',
        category: 'Design',
        description: 'Understand the core principles of User Interface (UI) and User Experience (UX) design. Learn to create intuitive and aesthetically pleasing digital products.'
    },
];

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const filteredCourses = useMemo(() => {
        let processedCourses = [...coursesData];

        if (searchTerm) {
            processedCourses = processedCourses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processedCourses;
    }, [searchTerm, coursesData]);

    return (
        <UserDashboardContainer role={"admin"}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <BookOpen className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Manage Courses
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    A centralized hub to **manage and organize all educational courses** on your platform. Easily search and add new course content.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Top Controls: Search and Add Course */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <CourseSearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                        <Link to="/admin/courses/create"><button
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add New Course
                        </button></Link>
                    </div>

                    {/* Course Cards Grid */}
                    {filteredCourses.length > 0 ? (
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
                                {filteredCourses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 text-base">
                            <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Adjust your search or add a new course!
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}