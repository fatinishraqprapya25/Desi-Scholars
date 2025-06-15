import React, { useState, useEffect } from 'react';

const App = () => {
    // Array of video objects, each with an ID, title, and YouTube embed URL.
    const videos = [
        { id: '1', title: 'HTML Introduction', url: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
        { id: '2', title: 'HTML Elements', url: 'https://www.youtube.com/embed/qz0aGYrrlhU' },
        { id: '3', title: 'CSS Introduction', url: 'https://www.youtube.com/embed/yfoY53QXEnI' },
        { id: '4', title: 'Flexbox Guide', url: 'https://www.youtube.com/embed/JJSoEo8JSnc' },
        { id: '5', title: 'CSS Grid', url: 'https://www.youtube.com/embed/jV8B24rSN5o' },
        { id: '6', title: 'JavaScript Basics', url: 'https://www.youtube.com/embed/W6NZfCO5SIk' },
        { id: '7', title: 'DOM Manipulation', url: 'https://www.youtube.com/embed/0ik6X4DJKCc' },
        { id: '8', title: 'ES6 Features', url: 'https://www.youtube.com/embed/NCwa_xi0Uuc' },
        { id: '9', title: 'Async JS & Fetch', url: 'https://www.youtube.com/embed/PoRJizFvM7s' },
        { id: '10', title: 'React Basics', url: 'https://www.youtube.com/embed/bMknfKXIFA8' },
        { id: '11', title: 'React Hooks', url: 'https://www.youtube.com/embed/f687hBjwFcM' },
        { id: '12', title: 'Deploy React App', url: 'https://www.youtube.com/embed/DPnqb74Smug' },
    ];

    // State to keep track of the currently selected video's index.
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    // State to manage which tab is currently active (e.g., Description, Reference).
    const [activeTab, setActiveTab] = useState('Description');

    // useEffect hook to dynamically add the Inter font to the document head.
    // This runs once when the component mounts.
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    // Handler for the "Previous" button. It cycles through the videos.
    const handlePrev = () => {
        setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
    };

    // Handler for the "Next" button. It cycles through the videos.
    const handleNext = () => {
        setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="flex bg-gray-50 min-h-screen" style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Sidebar for video list */}
            {/* Fixed position, full height, with shadow and border. Scrollable if content overflows. */}
            <aside className="w-72 bg-white shadow-lg border-r overflow-y-auto fixed h-full rounded-r-xl">
                {/* Sidebar header with a vibrant indigo background and bold text. */}
                <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-tr-xl">Course Videos</div>
                <ul className="p-2">
                    {/* Map through the videos array to create a list of video buttons. */}
                    {videos.map((video, index) => (
                        <li key={video.id}>
                            <button
                                onClick={() => setCurrentVideoIndex(index)}
                                // Apply active styling if the current video is selected.
                                className={`block w-full text-left p-2 rounded-md mb-1 transition-all duration-200 ease-in-out
                                    ${index === currentVideoIndex
                                        ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500 ring-offset-2 ring-offset-white'
                                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                                    }`}
                            >
                                {/* Video Icon for visual cue */}
                                <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.027l2.846 1.708a.5.5 0 010 .85l-2.846 1.708A.5.5 0 019 11.5v-5a.5.5 0 01.555-.473z" clipRule="evenodd" />
                                </svg>
                                {video.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content area */}
            {/* The ml-72 class creates space for the fixed sidebar. */}
            <main className="flex-1 ml-72 p-4 md:p-8">
                <div className="bg-white rounded-xl shadow p-4 max-w-4xl mx-auto">
                    {/* Video player section */}
                    <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            src={videos[currentVideoIndex].url}
                            title={videos[currentVideoIndex].title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>

                    {/* Previous and Next video navigation buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrev}
                            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                        >
                            Next
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>

                    {/* Tabbed interface for video details */}
                    <div className="mt-6">
                        <div className="flex space-x-4 border-b">
                            {/* Map through tab names to create interactive buttons */}
                            {['Description', 'Reference', 'Links', 'Social', 'Comments'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    // Apply active styling based on the activeTab state.
                                    className={`px-3 py-2 font-medium rounded-t-md transition-colors duration-200
                                        ${activeTab === tab
                                            ? 'border-b-2 border-indigo-500 text-indigo-600 bg-gray-50'
                                            : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Content display based on the active tab */}
                        <div className="mt-4 p-4 bg-gray-50 rounded-b-xl rounded-tr-xl text-gray-700 shadow-inner">
                            {activeTab === 'Description' && (
                                <p>
                                    Detailed explanation about <strong>{videos[currentVideoIndex].title}</strong>.
                                    Watch carefully and follow along with hands-on exercises. This section can be expanded
                                    to provide rich text content, images, and other multimedia specific to the video.
                                </p>
                            )}
                            {activeTab === 'Reference' && (
                                <ul className="list-disc pl-5">
                                    <li>MDN Web Docs - Your go-to for web development references.</li>
                                    <li>W3Schools - Comprehensive tutorials and examples.</li>
                                    <li>JavaScript.info - In-depth JavaScript guide.</li>
                                </ul>
                            )}
                            {activeTab === 'Links' && (
                                <ul className="list-disc pl-5">
                                    <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">MDN Web Docs</a> - Official documentation for web technologies.</li>
                                    <li><a href="https://w3schools.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">W3Schools Online Web Tutorials</a> - Learn HTML, CSS, JavaScript, and more.</li>
                                    <li><a href="https://react.dev" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">React Official Documentation</a> - Learn React from the source.</li>
                                </ul>
                            )}
                            {activeTab === 'Social' && (
                                <div className="space-x-4">
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">Twitter</a>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors duration-200">LinkedIn</a>
                                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-black transition-colors duration-200">GitHub</a>
                                    <p className="mt-2 text-sm text-gray-500">Connect with us on social media for updates and community discussions!</p>
                                </div>
                            )}
                            {activeTab === 'Comments' && (
                                <p className="text-gray-600">
                                    Comments functionality coming soon! This section can be extended to integrate
                                    a comment system (e.g., Disqus, Firebase Firestore for real-time comments, or a custom API).
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
