import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ videos, currentVideoIndex, setCurrentVideoIndex }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-blue-700 text-white rounded-full shadow-lg"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 w-72 h-screen bg-white border-r shadow-lg z-40 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
            >
                {/* Header */}
                <div className="p-5 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-extrabold text-xl tracking-wide">
                    📚 Course Videos
                </div>

                {/* Scrollable Content */}
                <div className="h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 p-3 space-y-2">
                    {videos.map((video, index) => (
                        <button
                            key={video.id}
                            onClick={() => {
                                setCurrentVideoIndex(index);
                                closeSidebar();
                            }}
                            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded transition-all duration-200
                                ${index === currentVideoIndex
                                    ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-500'
                                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700'
                                }`}
                        >
                            <svg
                                className={`w-5 h-5 mr-3 flex-shrink-0 ${index === currentVideoIndex ? 'text-white' : 'text-blue-600'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.027l2.846 1.708a.5.5 0 010 .85l-2.846 1.708A.5.5 0 019 11.5v-5a.5.5 0 01.555-.473z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="truncate">{video.moduleName}</span>
                        </button>
                    ))}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
