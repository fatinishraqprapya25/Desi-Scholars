import { Search, SlidersHorizontal, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function StudentsControls({ searchTerm, setSearchTerm }) {
    return (
        <motion.div
            className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4"
            variants={itemVariants}
        >
            <div className="relative flex-grow w-full md:w-auto mb-3 md:mb-0">
                <input
                    type="text"
                    placeholder="Search by name, email, ID..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5" />
            </div>

            <div className="flex flex-col sm:flex-row flex-shrink-0 gap-2 sm:gap-3 w-full md:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-xs sm:text-sm">
                    <SlidersHorizontal className="h-4 w-4 mr-1.5 sm:mr-2" /> Filter
                </button>
            </div>
        </motion.div>
    );
}