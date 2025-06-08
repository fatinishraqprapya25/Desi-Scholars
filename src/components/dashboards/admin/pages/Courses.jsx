import React, { useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, PlusCircle, Search, Edit, Trash2, Eye, Calendar, Users, Hash, Tag, Lightbulb, User, Clock, HelpCircle
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer'; // Assuming this component exists

// Mock data for courses (adjusted for the new card design)
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
    const accentPurple = '#8A4AF8'; // Define the accent color for consistency

    // Framer Motion variants
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

    const defaultAvatar = 'https://via.placeholder.com/40'; // Placeholder for instructor avatar

    // Filtering logic (simplified as no explicit status/category filters are visible)
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

    // Handlers
    const handleAddCourse = () => {
        alert('Prompt to add new course (e.g., open a form modal)!');
    };

    const handleEditCourse = (courseId) => {
        alert(`Edit course with ID: ${courseId}`);
    };

    // Function to get status badge styling
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Archived':
                return 'bg-orange-100 text-orange-800';
            case 'Draft':
                return 'bg-blue-100 text-blue-800';
            case 'Inactive':
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
                        <div className="relative flex-grow w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <button
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                            onClick={handleAddCourse}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add New Course
                        </button>
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
                                    <motion.div
                                        key={course.id}
                                        className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
                                        variants={cardVariants}
                                        layout // Enables smooth layout transitions for reordering/filtering
                                    >
                                        {/* Decorative top border */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

                                        {/* Status Badge at the top right */}
                                        <div className="flex justify-between items-start mb-2">
                                            {/* Course ID */}
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Hash className="w-3.5 h-3.5 mr-1 text-gray-400" /> ID: <span className="font-medium ml-0.5">{course.id}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(course.status)}`}>
                                                {course.status}
                                            </span>
                                        </div>

                                        {/* Course Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                            {course.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={course.description}>
                                            {course.description}
                                        </p>

                                        {/* Instructor, Students Enrolled, Last Updated, Category */}
                                        <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                                            <div className="flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> {course.instructor}</div>
                                            <div className="flex items-center"><Users className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> {course.studentsEnrolled} Students</div>
                                            <div className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Updated: {course.lastUpdated}</div>
                                            <div className="flex items-center"><Tag className="h-3.5 w-3.5 mr-1.5 text-green-500" /> {course.category}</div>
                                        </div>

                                        {/* Action Button: Edit Course */}
                                        <div className="flex justify-end pt-2">
                                            <Link to="/admin/courses/edit">
                                                <button
                                                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                                                    onClick={() => handleEditCourse(course.id)}
                                                    title="Edit Course"
                                                >
                                                    <Edit className="h-4 w-4 mr-2" /> Edit Course
                                                </button></Link>
                                        </div>
                                    </motion.div>
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