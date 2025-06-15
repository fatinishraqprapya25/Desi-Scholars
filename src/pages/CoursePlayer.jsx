import React, { useState } from 'react';

const App = () => {
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

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('Description');

    const handlePrev = () => {
        setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
    };

    const handleNext = () => {
        setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-lg border-r overflow-y-auto fixed h-full">
                <div className="p-4 bg-indigo-600 text-white text-lg font-bold">Course Videos</div>
                <ul className="p-2">
                    {videos.map((video, index) => (
                        <li key={video.id}>
                            <button
                                onClick={() => setCurrentVideoIndex(index)}
                                className={`block w-full text-left p-2 rounded-md mb-1 ${index === currentVideoIndex
                                    ? 'bg-indigo-500 text-white shadow'
                                    : 'hover:bg-indigo-100'
                                    }`}
                            >
                                {video.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-72 p-4 md:p-8">
                <div className="bg-white rounded-xl shadow p-4 max-w-4xl mx-auto">
                    {/* Video player */}
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

                    {/* Prev / Next buttons */}
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handlePrev}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600"
                        >
                            ⬅ Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600"
                        >
                            Next ➡
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6">
                        <div className="flex space-x-4 border-b">
                            {['Description', 'Reference', 'Links', 'Social', 'Comments'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-2 font-medium ${activeTab === tab
                                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                                        : 'text-gray-600 hover:text-indigo-500'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 text-gray-700">
                            {activeTab === 'Description' && (
                                <p>
                                    Detailed explanation about <strong>{videos[currentVideoIndex].title}</strong>.
                                    Watch carefully and follow along with hands-on exercises.
                                </p>
                            )}
                            {activeTab === 'Reference' && (
                                <ul className="list-disc pl-5">
                                    <li>MDN Web Docs</li>
                                    <li>W3Schools</li>
                                    <li>JavaScript.info</li>
                                </ul>
                            )}
                            {activeTab === 'Links' && (
                                <ul className="list-disc pl-5">
                                    <li><a href="https://developer.mozilla.org" className="text-indigo-600 underline">MDN</a></li>
                                    <li><a href="https://w3schools.com" className="text-indigo-600 underline">W3Schools</a></li>
                                    <li><a href="https://reactjs.org" className="text-indigo-600 underline">React Docs</a></li>
                                </ul>
                            )}
                            {activeTab === 'Social' && (
                                <div className="space-x-2">
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-500 underline">Twitter</a>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-700 underline">LinkedIn</a>
                                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-800 underline">GitHub</a>
                                </div>
                            )}
                            {activeTab === 'Comments' && (
                                <p>Comments functionality coming soon! You could integrate Disqus, Firebase, or a custom system.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
