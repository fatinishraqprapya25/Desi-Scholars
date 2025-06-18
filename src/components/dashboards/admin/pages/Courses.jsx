import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlusCircle, Lightbulb } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import CourseCard from '../course/CourseCard';
import CourseSearchInput from '../course/CourseSearchInput';
import { Link } from 'react-router-dom';

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null); // For delete success/error
    const [statusMessageType, setStatusMessageType] = useState(''); // 'success' or 'error'

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/courses", {
                headers: {
                    "Content-Type": "Application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.success) {
                setCourses(result.data);
            } else {
                setError(result.message || "Failed to fetch courses.");
            }
        } catch (err) {
            setError("Network error or server unavailable. Please try again.");
            console.error("Error fetching courses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []); // Empty dependency array means this runs once on mount

    const deleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            return; // User cancelled the deletion
        }

        const adminToken = localStorage.getItem("ASDFDKFFJF");
        if (!adminToken) {
            setStatusMessage("Authentication token not found. Please log in as an admin.");
            setStatusMessageType('error');
            setTimeout(() => setStatusMessage(null), 5000);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            if (result.success) {
                setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
                setStatusMessage("Course deleted successfully!");
                setStatusMessageType('success');
            } else {
                setStatusMessage(result.message || "Failed to delete course.");
                setStatusMessageType('error');
            }
        } catch (err) {
            setStatusMessage(err.message || "Network error or server unavailable while deleting course.");
            setStatusMessageType('error');
            console.error("Error deleting course:", err);
        } finally {
            setTimeout(() => setStatusMessage(null), 5000); // Clear message after 5 seconds
        }
    };

    const filteredCourses = useMemo(() => {
        if (loading || error) {
            return [];
        }

        let processedCourses = [...courses];

        if (searchTerm) {
            processedCourses = processedCourses.filter(course =>
                course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.id || course._id).toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processedCourses;
    }, [searchTerm, courses, loading, error]);

    if (loading) {
        return (
            <UserDashboardContainer role={"admin"}>
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto text-center py-20">
                    <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-700">Loading courses...</p>
                </div>
            </UserDashboardContainer>
        );
    }

    if (error) {
        return (
            <UserDashboardContainer role={"admin"}>
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto text-center py-20">
                    <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Courses</h3>
                    <p className="text-gray-700">{error}</p>
                    <p className="text-sm text-gray-500 mt-2">Please check your network connection or try again later.</p>
                </div>
            </UserDashboardContainer>
        );
    }

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

                {/* Status Message Display */}
                {statusMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mb-4 p-3 rounded-lg text-sm font-medium ${statusMessageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {statusMessage}
                    </motion.div>
                )}

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <CourseSearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                        <Link to="/admin/courses/create">
                            <button
                                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" /> Add New Course
                            </button>
                        </Link>
                    </div>

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
                                        key={course.id || course._id}
                                        course={course}
                                        onDeleteCourse={deleteCourse} // Pass the delete function
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