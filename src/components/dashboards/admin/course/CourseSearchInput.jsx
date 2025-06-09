import { Search } from 'lucide-react';

export default function CourseSearchInput({ searchTerm, onSearchChange }) {
    return (
        <div className="relative flex-grow w-full md:w-auto">
            <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
        </div>
    );
}