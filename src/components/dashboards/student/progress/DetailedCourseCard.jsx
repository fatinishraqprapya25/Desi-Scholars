import { motion } from 'framer-motion';
import { Compass, PlayCircle } from 'lucide-react';
import CourseProgressBar from './CourseProgressBar';

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

function DetailedCourseCard({ course }) {
    return (
        <motion.div
            className="bg-white rounded-md shadow-md border border-gray-100 overflow-hidden cursor-pointer
                       hover:shadow-md hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
            variants={itemVariants}
        >
            <div className="relative h-40 w-full overflow-hidden">
                <img
                    src={course.imageUrl || 'https://via.placeholder.co/400x200?text=Course+Image'}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h4>
                {/* Assuming instructor might be optional, or added in data */}
                {course.instructor && <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>}

                <CourseProgressBar progress={course.progress} />
                <p className="text-sm text-gray-700 font-medium mb-4">Progress: {course.progress}% Complete ({course.lessonsCompleted}/{course.totalLessons} Lessons)</p>

                <div className="flex items-center text-sm text-gray-700 mb-4">
                    <Compass className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Last Activity: <span className="font-semibold">{course.lastActivity}</span></span>
                </div>

                <button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-md shadow-md
                               hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                               flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95"
                >
                    <PlayCircle className="mr-2 h-5 w-5" /> Resume Course
                </button>
            </div>
        </motion.div>
    );
}

export default DetailedCourseCard;