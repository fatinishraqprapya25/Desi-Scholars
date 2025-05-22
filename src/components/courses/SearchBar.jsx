const SearchBar = () => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search courses..."
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
};

export default SearchBar;