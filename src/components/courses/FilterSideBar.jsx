import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar";

const FilterSidebar = ({ applyFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen((prev) => !prev);

    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const accentPurple = '#8A4AF8';

    const applyFilters = () => {
        const query = {};
        if (selectedLevel) query.level = selectedLevel.toLowerCase();
        if (selectedPrice) query.price = selectedPrice.toLowerCase();
        applyFilter(query);
    };

    const clearFilters = () => {
        setSelectedLevel("");
        setSelectedPrice("");
    };

    return (
        <>
            <style>{`
                .filter-sidebar::-webkit-scrollbar {
                    width: 8px;
                }
                .filter-sidebar::-webkit-scrollbar-track {
                    background: #f0f3f8;
                    border-radius: 10px;
                }
                .filter-sidebar::-webkit-scrollbar-thumb {
                    background-color: ${accentPurple};
                    border-radius: 10px;
                    border: 2px solid #f0f3f8;
                }
                .filter-sidebar::-webkit-scrollbar-thumb:hover {
                    background-color: #7A3BD5;
                }
                .filter-sidebar {
                    scrollbar-width: thin;
                    scrollbar-color: ${accentPurple} #f0f3f8;
                }
            `}</style>

            {/* Hamburger */}
            <button
                className={`
                    md:hidden fixed top-6 left-4 z-50 p-3 rounded-full
                    bg-[#8A4AF8] shadow-md
                    focus:outline-none focus:ring-2 focus:ring-[#8A4AF8] focus:ring-opacity-75
                    transition-all duration-300 transform
                    ${isOpen ? 'rotate-90' : 'rotate-0'}
                `}
                onClick={toggleSidebar}
                aria-label="Toggle Filters"
            >
                {isOpen ? <FaTimes className="w-5 h-5 text-white" /> : <FaBars className="w-5 h-5 text-white" />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                style={{ top: "10%" }}
                className={`
                    filter-sidebar
                    fixed bottom-0 left-4 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-40
                    transform transition-transform duration-300 ease-in-out
                    overflow-y-auto flex flex-col justify-between p-6
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:left-4 md:top-[10%] md:bottom-0
                `}
                aria-label="Filter Sidebar"
            >
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                        <button
                            className="md:hidden p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                            onClick={toggleSidebar}
                            aria-label="Close Filters"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Search */}
                    <SearchBar />

                    {/* Level */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Level</h3>
                        <div className="space-y-1">
                            {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                <label key={level} className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                    <input
                                        type="radio"
                                        name="level"
                                        value={level}
                                        checked={selectedLevel === level}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="mr-2 h-4 w-4 form-radio text-[#8A4AF8] focus:ring-[#8A4AF8]"
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Price</h3>
                        <div className="space-y-1">
                            {["Free", "Paid"].map((type) => (
                                <label key={type} className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                    <input
                                        type="radio"
                                        name="price"
                                        value={type}
                                        checked={selectedPrice === type}
                                        onChange={(e) => setSelectedPrice(e.target.value)}
                                        className="mr-2 h-4 w-4 form-radio text-[#8A4AF8] focus:ring-[#8A4AF8]"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                    <button
                        className="w-1/2 bg-[#8A4AF8] hover:bg-[#7A3BD5] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8A4AF8] focus:ring-opacity-75"
                        onClick={applyFilters}
                    >
                        Apply
                    </button>
                    <button
                        className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>
                </div>
            </aside>
        </>
    );
};

export default FilterSidebar;
