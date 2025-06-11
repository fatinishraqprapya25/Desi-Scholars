import { User, Users, Calendar, Tag, Hash, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

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

// --- CourseCard Component (Integrated) ---
function CourseCard({ course, onEditCourse }) {
    return (
        <motion.div
            key={course.id}
            className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
            variants={cardVariants}
            layout
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            {/* Status Badge and Course ID */}
            <div className="flex justify-between items-start mb-2">
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

            {/* Course Details */}
            <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                <div className="flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> {course.instructor}</div>
                <div className="flex items-center"><Users className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> {course.studentsEnrolled} Students</div>
                <div className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Updated: {course.lastUpdated}</div>
                <div className="flex items-center"><Tag className="h-3.5 w-3.5 mr-1.5 text-green-500" /> {course.category}</div>
            </div>

            {/* Action Button: Edit Course */}
            <div className="flex justify-end pt-2">
                {/* Note: Adjust the 'to' prop for the actual edit route */}
                <Link to={`/teacher/courses/edit/${course.id}`}>
                    <button
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        onClick={() => onEditCourse(course.id)}
                        title="Edit Course"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Course
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}

export default CourseCard;