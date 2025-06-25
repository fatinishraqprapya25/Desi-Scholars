import React from 'react';

const Sidebar = ({ videos, currentVideoIndex, setCurrentVideoIndex }) => {
    return (
        <aside className="w-72 fixed left-0 top-0 h-screen bg-white border-r shadow-lg z-10 overflow-y-auto">
            <div className="p-5 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-extrabold text-xl tracking-wide">
                📚 Course Videos
            </div>

            <ul className="p-3 space-y-2">
                {videos.map((video, index) => (
                    <li key={video.id}>
                        <button
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-200
                                ${index === currentVideoIndex
                                    ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-500'
                                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700'
                                }`}
                        >
                            <svg
                                className={`w-5 h-5 mr-3 flex-shrink-0 ${index === currentVideoIndex ? 'text-white' : 'text-blue-600'
                                    }`}
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
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;