import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { User, Users, Calendar, Tag, Hash, Edit, DollarSign, Trash2 } from 'lucide-react'; // Added Trash2 for delete icon

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

const getStatusBadge = (status) => {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-800';
        case 'inactive':
            return 'bg-red-100 text-red-800';
        case 'Archived':
            return 'bg-orange-100 text-orange-800';
        case 'Draft':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    } catch (e) {
        return 'Invalid Date';
    }
};

export default function CourseCard({ course, onDeleteCourse }) { // Added onDeleteCourse prop
    const defaultCourse = {
        _id: 'N/A',
        courseName: 'Untitled Course',
        description: 'No description provided.',
        instructorName: 'Unknown Instructor',
        courseStatus: 'inactive',
        isPaid: false,
        studentsEnrolled: 0,
        category: 'Uncategorized',
        updatedAt: null,
    };

    const currentCourse = { ...defaultCourse, ...course };

    return (
        <motion.div
            key={currentCourse._id}
            className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
            variants={cardVariants}
            layout
        >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center text-xs text-gray-500 min-w-0"> {/* Added min-w-0 */}
                    <Hash className="w-3.5 h-3.5 mr-1 text-gray-400 flex-shrink-0" /> ID: <span className="font-medium ml-0.5 truncate">{currentCourse._id}</span> {/* Added truncate */}
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(currentCourse.courseStatus)} flex-shrink-0`}>
                    {currentCourse.courseStatus}
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                {currentCourse.courseName}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={currentCourse.description}>
                {currentCourse.description}
            </p>

            <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                <div className="flex items-center min-w-0"><User className="h-3.5 w-3.5 mr-1.5 text-indigo-500 flex-shrink-0" /> <span className="truncate">{currentCourse.instructorName}</span></div>
                <div className="flex items-center min-w-0"><Users className="h-3.5 w-3.5 mr-1.5 text-blue-500 flex-shrink-0" /> <span className="truncate">{currentCourse.studentsEnrolled || '0'} Students</span></div>
                <div className="flex items-center min-w-0"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500 flex-shrink-0" /> Updated: <span className="truncate">{formatDate(currentCourse.updatedAt)}</span></div>
                <div className="flex items-center min-w-0"><Tag className="h-3.5 w-3.5 mr-1.5 text-green-500 flex-shrink-0" /> <span className="truncate">{currentCourse.category || 'N/A'}</span></div>
                <div className="flex items-center min-w-0">
                    <DollarSign className="h-3.5 w-3.5 mr-1.5 text-purple-500 flex-shrink-0" />
                    <span className="truncate">{currentCourse.isPaid ? 'Paid' : 'Free'}</span>
                </div>
            </div>

            <div className="flex justify-end pt-2 gap-2"> {/* Added gap-2 for spacing between buttons */}

                <Link to={`/admin/courses/edit/${currentCourse._id}`}>
                    <button
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        title="Edit Course"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Course
                    </button>
                </Link>

                {onDeleteCourse && (
                    <button
                        className="flex items-center px-3 py-2 text-black hover:text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        onClick={() => onDeleteCourse(currentCourse._id)}
                        title="Delete Course"
                    >
                        <Trash2 className="h-4 w-4" /> {/* Only icon for delete to save space */}
                    </button>
                )}
            </div>
        </motion.div>
    );
}