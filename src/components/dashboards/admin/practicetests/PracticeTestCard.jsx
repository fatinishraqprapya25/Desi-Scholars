import { motion } from 'framer-motion';
import { Hash, HelpCircle, Clock, Calendar, Edit, Trash2 } from 'lucide-react';
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

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const PracticeTestCard = ({ test, onEditTest, variants, onDeleted }) => {
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete test "${test.title}"?`)) return;

        try {
            const res = await fetch(`http://localhost:5000/api/tests/${test._id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                alert('Test deleted successfully.');
                if (onDeleted) onDeleted(test._id);
            } else {
                alert(`Failed to delete test: ${data.message || 'Unknown error'}`);
            }
        } catch (err) {
            alert('Error deleting test: ' + err.message);
        }
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
            variants={variants}
            layout
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            {/* Status Badge and ID */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center text-xs text-gray-500">
                    <Hash className="w-3.5 h-3.5 mr-1 text-gray-400" /> ID: <span className="font-medium ml-0.5">{test.id}</span>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(test.status)}`}>
                    {test.status || "active"}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{test.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={test.description}>{test.description}</p>

            {/* Questions, Duration, Created */}
            <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                <div className="flex items-center">
                    <HelpCircle className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> {test.totalQuestions || ""} Questions
                </div>
                <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-purple-500" /> {test.duration} Mins
                </div>
                <div className="flex items-center col-span-2">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Created: {formatDate(test.createdAt)}
                </div>
            </div>

            {/* Action Buttons: Edit & Delete */}
            <div className="flex justify-end pt-2 space-x-3">
                <Link to="/admin/practicetests/edit">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        title="Edit Test"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Test
                    </motion.button>
                </Link>

                <motion.button
                    onClick={handleDelete}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 shadow-md font-medium text-sm"
                    title="Delete Test"
                >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PracticeTestCard;
