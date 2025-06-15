const VideoPlayer = ({ videos, currentVideoIndex, setCurrentVideoIndex }) => {
    const handlePrev = () => {
        setCurrentVideoIndex(prev => (prev > 0 ? prev - 1 : videos.length - 1));
    };

    const handleNext = () => {
        setCurrentVideoIndex(prev => (prev < videos.length - 1 ? prev + 1 : 0));
    };

    return (
        <>
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
            <div className="flex justify-between mt-6">
                <button onClick={handlePrev} className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Previous
                </button>
                <button onClick={handleNext} className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600">
                    Next
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </>
    );
};

export default VideoPlayer;
