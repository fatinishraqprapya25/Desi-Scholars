import { motion } from 'framer-motion';
import { Hash, HelpCircle, Clock, Calendar, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusBadge = (status) => {
    switch (status) {
        case 'Published':
            return 'bg-green-100 text-green-800';
        case 'Draft':
            return 'bg-blue-100 text-blue-800';
        case 'Archived':
            return 'bg-orange-100 text-orange-800';
        case 'Inactive':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const PracticeTestCard = ({ test, onEditTest, variants }) => {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
            variants={variants}
            layout // Enables smooth layout transitions for reordering/filtering
        >
            {/* Decorative top border for "lucrative" feel */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            {/* Status Badge and ID at the top right */}
            <div className="flex justify-between items-start mb-2">
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
                <Link to="/admin/practicetests/edit">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        title="Edit Test"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Test
                    </motion.button></Link>
            </div>
        </motion.div>
    );
};

export default PracticeTestCard;