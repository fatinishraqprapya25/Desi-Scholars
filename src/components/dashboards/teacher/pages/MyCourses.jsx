import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlusCircle, Lightbulb } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import CourseCard from '../courses/CourseCard';
import CourseSearchInput from '../courses/CourseSearchInput';
import { Link } from 'react-router-dom';
import ValidateTeacher from '../../../../utils/ValidateTeacher';

export default function MyCourses() {
    const [coursesData, setCoursesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    console.log(coursesData);

    const fetchCourses = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/teacher/${id}`);
            const result = await response.json();
            if (result.success) {
                setCoursesData(result.data);
            } else {
                alert("failed to fetch teacher courses!");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const check = await ValidateTeacher();
            fetchCourses(check._id)
        }
        checkUser();
    }, []);

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
        <UserDashboardContainer role={"teacher"}>
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
                                        key={course._id}
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