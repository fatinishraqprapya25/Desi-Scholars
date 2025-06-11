import { Search, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BroadcastControls({ searchTerm, onSearchChange, onCreateBroadcast, itemVariants }) {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search broadcasts..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <Link to="/admin/notifications/create">
                    <button
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                    >
                        <PlusCircle className="h-4 w-4 mr-2" /> Create New Broadcast
                    </button></Link>
            </div>
        </motion.div>
    );
}