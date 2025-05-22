const SearchBar = () => {
    return (
        <form className="mb-4 flex items-center space-x-2">
            <input
                type="text"
                placeholder="Search courses..."
                className="flex-grow px-3 pb-2 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:placeholder-transparent transition"
            />
            <button
                type="submit"
                className="p-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center shadow-md transition"
                aria-label="Search"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;
