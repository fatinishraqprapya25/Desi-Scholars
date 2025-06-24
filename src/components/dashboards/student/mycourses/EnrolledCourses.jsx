import { BookOpen, Compass, Clock, UserSquare2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ValidateToken from "../../../../utils/ValidateToken";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
        }
    }
};

export default function EnrolledCourses() {
    const accentColor = '#6366F1';
    const secondaryAccent = '#818CF8';


    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const checkUser = await ValidateToken();
            console.log(checkUser);
            const response = await fetch(`http://localhost:5000/api/courses/user/${checkUser.id}`);
            if (!response.ok) {
                alert("fakjfksdlf");
                return;
            }
            const result = await response.json();
            if (!result.success) {
                alert(result.message);
                return;
            }
            setEnrolledCourses(result.data);
        }

        fetchEnrolledCourses();
    }, []);

    return (
        <section className="mb-10 font-sans">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <BookOpen className="mr-3 h-8 w-8 text-blue-600" /> My Enrolled Courses
            </h3>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {enrolledCourses.map((course) => (
                    <motion.div
                        key={course.id}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer
                                   hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
                        variants={itemVariants}
                    >
                        {/* Course Image */}
                        <div className="relative h-40 w-full overflow-hidden">
                            <img
                                src={course.imageUrl || 'https://via.placeholder.com/400x200?text=Course+Image'}
                                alt={course.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Optional: Overlay for image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <div className="p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h4>
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                <UserSquare2 className="mr-2 h-4 w-4 text-gray-500" />
                                <span>Instructor: {course.instructor}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div
                                    className="h-2.5 rounded-full"
                                    style={{ width: `${course.progress}%`, background: `linear-gradient(to right, ${accentColor}, ${secondaryAccent})` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-700 font-medium mb-4">Progress: {course.progress}% Complete</p>

                            {/* Key Course Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-700">
                                    <Compass className="mr-2 h-4 w-4 text-blue-500" />
                                    <span>Next Lesson: <span className="font-semibold">{course.nextLesson}</span></span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>Last Accessed: {course.lastAccessed}</span>
                                </div>
                            </div>

                            {/* Call to Action Button */}
                            <button
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg
                                           hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                                           flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95"
                            >
                                <Compass className="mr-2 h-5 w-5" /> Continue Course
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}