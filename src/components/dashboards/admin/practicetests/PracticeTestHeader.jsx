import { motion } from 'framer-motion';
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const PracticeTestHeader = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
            <div className="relative flex-grow w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Search practice tests..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <Link to="/admin/practicetests/create">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                >
                    <PlusCircle className="h-4 w-4 mr-2" /> Create New Test
                </motion.button>
            </Link>
        </div>
    );
};

export default PracticeTestHeader;