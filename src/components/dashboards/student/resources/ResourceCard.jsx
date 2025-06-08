import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ResourceTypeIcon from './ResourceTypeIcon';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        }
    }
};

function ResourceCard({ resource, index }) {
    return (
        <motion.div
            key={resource.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
        >
            {/* Icon/Image Section */}
            <div className={`p-6 flex items-center justify-center rounded-t-2xl bg-gradient-to-br ${resource.color}`}>
                <img src={resource.icon} alt={resource.title} className="w-16 h-16 object-contain" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{resource.title}</h4>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{resource.description}</p>
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4 gap-y-2">
                    <span className="flex items-center">
                        <ResourceTypeIcon type={resource.type} /> {resource.type}
                    </span>
                </div>
                <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg
                               hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                               flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95 mt-auto"
                >
                    <ExternalLink className="mr-2 h-5 w-5" /> Visit Resource
                </a>
            </div>
        </motion.div>
    );
}

export default ResourceCard;