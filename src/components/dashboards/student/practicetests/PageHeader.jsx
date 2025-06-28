import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
            {/* Left Section: Content Type Selection */}
            <div className="flex items-center space-x-4">
                {/* EBRW Button */}
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                    {/* You'd replace this with an actual icon component or SVG */}
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    EBRW
                </button>

                {/* Math Text/Link */}
                <div className="flex items-center text-gray-700 font-medium">
                    {/* You'd replace this with an actual icon component or SVG */}
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5.99c.518 0 .99.186 1.341.517l4 4a2 2 0 01.517 1.34V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10l-2 2"></path>
                    </svg>
                    Math
                </div>
            </div>

            {/* Right Section: Filter Options */}
            <div className="flex items-center space-x-4">
                {/* Unsolved Dropdown */}
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Unsolved</option>
                        <option>Solved</option>
                        <option>Marked</option>
                        {/* Add other options here */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {/* Dropdown arrow icon */}
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
                        {/* Add other options here */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {/* Dropdown arrow icon */}
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;