import { motion } from "framer-motion";
import { Clock, Edit, HardDrive, User, Calendar } from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

const getResourceBadge = (type) => {
    switch (type) {
        case 'PDF': return 'bg-red-100 text-red-800';
        case 'Video Guide': return 'bg-blue-100 text-blue-800';
        case 'Ebook': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

function ResourceCard({ resource, onEditResource }) {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
            variants={cardVariants}
            layout
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            {/* Resource ID and Type Badge */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center text-xs text-gray-500">
                    <span className="font-medium">{resource.id}</span>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getResourceBadge(resource.type)}`}>
                    {resource.type}
                </span>
            </div>

            {/* Resource Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                {resource.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={resource.description}>
                {resource.description}
            </p>

            {/* Resource Details (Author, Date, Size/Duration) */}
            <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                <div className="flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> {resource.author}</div>
                <div className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Uploaded: {resource.uploadDate}</div>
                {resource.fileSize && (
                    <div className="flex items-center col-span-2"><HardDrive className="h-3.5 w-3.5 mr-1.5 text-gray-500" /> Size: {resource.fileSize}</div>
                )}
                {resource.duration && (
                    <div className="flex items-center col-span-2"><Clock className="h-3.5 w-3.5 mr-1.5 text-purple-500" /> Duration: {resource.duration}</div>
                )}
            </div>

            {/* Action Button: Edit Resource */}
            <div className="flex justify-end pt-2">
                <button
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                    onClick={() => onEditResource(resource.id)}
                    title="Edit Resource"
                >
                    <Edit className="h-4 w-4 mr-2" /> Edit Resource
                </button>
            </div>
        </motion.div>
    );
}

export default ResourceCard;