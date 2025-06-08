// components/quiz/MockHeader.jsx
import React from 'react';
import { FaHourglassHalf, FaLightbulb, FaBook, FaBars } from 'react-icons/fa';

const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    secondary: '#6366F1', // indigo-500
    success: '#10B981', // green-500 (for results)
    danger: '#EF4444', // red-500 (for results)
    border: '#E5E7EB', // gray-200
    textPrimary: '#1F2937', // gray-900
    textSecondary: '#4B5563', // gray-700
};

const MockHeader = ({ testTitle, timeLeft, formatTime }) => {
    return (
        <div className="w-full bg-white shadow-md py-3 px-4 sm:px-6 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center space-x-2">
                <FaBook className="text-blue-600 text-xl sm:text-2xl" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate max-w-[200px] sm:max-w-xs md:max-w-md" title={testTitle}>
                    {testTitle}
                </h1>
                <span className="text-gray-500 text-sm hidden sm:block"> | Information </span>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-800 text-white rounded-md px-3 py-1.5 font-mono text-base sm:text-lg shadow-inner">
                    <FaHourglassHalf className="text-sky-300 mr-2" />
                    <span>{formatTime(timeLeft)}</span>
                </div>
                <button className="hidden sm:flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm font-medium">
                    <FaLightbulb className="mr-2 text-yellow-500" /> Hint
                </button>
                <button className="hidden sm:flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm font-medium">
                    <FaBook className="mr-2 text-purple-500" /> Dictionary
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm font-medium">
                    <span className="mr-2">Chronological</span> <FaBars />
                </button>
            </div>
        </div>
    );
};

export default MockHeader;