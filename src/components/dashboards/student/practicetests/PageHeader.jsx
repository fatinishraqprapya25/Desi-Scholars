import React, { useState } from 'react';

const Header = () => {
    const [activeSubject, setActiveSubject] = useState('Math');

    const handleSubjectClick = (subject) => {
        setActiveSubject(subject);
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
            {/* Left Section: Content Type Selection */}
            <div className="flex items-center space-x-4">
                {/* EBRW Button */}


                {/* Math Button */}
                <button
                    className={`flex items-center px-4 py-2 rounded-md font-medium
                        ${activeSubject === 'Math'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                        transition-all duration-200 ease-in-out`}
                    onClick={() => handleSubjectClick('Math')}
                >
                    {/* Icon for Math */}
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5.99c.518 0 .99.186 1.341.517l4 4a2 2 0 01.517 1.34V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10l-2 2"></path>
                    </svg>
                    Math
                </button>

                {/* English Button */}
                <button
                    className={`flex items-center px-4 py-2 rounded-md font-medium
                        ${activeSubject === 'English'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                        transition-all duration-200 ease-in-out`}
                    onClick={() => handleSubjectClick('English')}
                >
                    {/* Icon for English */}
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    English
                </button>
            </div>

            {/* Right Section: Filter Options */}
            <div className="flex items-center space-x-4">
                {/* Unsolved Dropdown */}
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Unsolved</option>
                        <option>Solved</option>
                        <option>Marked</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                    </div>
                </div>

                {/* Difficulty: All Dropdown */}
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Difficulty: All</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                    </div>
                </div>

                {/* All Providers Dropdown */}
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>All Providers</option>
                        <option>Provider A</option>
                        <option>Provider B</option>
                        <option>Provider C</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;