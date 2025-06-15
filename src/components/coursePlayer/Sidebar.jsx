const Sidebar = ({ videos, currentVideoIndex, setCurrentVideoIndex }) => {
    return (
        <aside className="w-72 bg-white shadow-lg border-r overflow-y-auto fixed h-full rounded-r-xl">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-tr-xl">Course Videos</div>
            <ul className="p-2">
                {videos.map((video, index) => (
                    <li key={video.id}>
                        <button
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`block w-full text-left p-2 rounded-md mb-1 transition-all duration-200 ease-in-out
                ${index === currentVideoIndex
                                    ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500 ring-offset-2 ring-offset-white'
                                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                                }`}
                        >
                            <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.027l2.846 1.708a.5.5 0 010 .85l-2.846 1.708A.5.5 0 019 11.5v-5a.5.5 0 01.555-.473z" clipRule="evenodd" />
                            </svg>
                            {video.title}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
