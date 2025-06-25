import React from 'react';

const VideoPlayer = ({ videos, currentVideoIndex, setCurrentVideoIndex }) => {
    const handlePrev = () => {
        setCurrentVideoIndex(prev => (prev > 0 ? prev - 1 : videos.length - 1));
    };

    const handleNext = () => {
        setCurrentVideoIndex(prev => (prev < videos.length - 1 ? prev + 1 : 0));
    };

    // Optional: Log current video name for debugging (can be removed in production)
    if (videos[currentVideoIndex]) {
        console.log(videos[currentVideoIndex].moduleName);
    }

    // Handle case where videos array might be empty or currentVideoIndex is out of bounds
    const currentVideo = videos[currentVideoIndex];

    return (
        <>
            {/* Video Player */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200" style={{ paddingBottom: '56.25%', height: 0 }}>
                {currentVideo ? (
                    <iframe
                        src={currentVideo.videoLink}
                        title={currentVideo.moduleName}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-white text-lg">
                        No video available.
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={handlePrev}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-full shadow-xl
                               hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-full shadow-xl
                               hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
                >
                    Next
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </>
    );
};

export default VideoPlayer;