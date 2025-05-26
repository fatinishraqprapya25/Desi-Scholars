import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const FilterSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const accentPurple = '#8A4AF8'; // Consistent with other sections

    return (
        <>
            {/* Custom Scrollbar Styles */}
            <style>{`
                /* For Webkit browsers (Chrome, Safari, Edge) */
                .filter-sidebar::-webkit-scrollbar {
                    width: 8px; /* Slightly thinner scrollbar */
                }
                .filter-sidebar::-webkit-scrollbar-track {
                    background: #f0f3f8; /* Lighter track color */
                    border-radius: 10px;
                }
                .filter-sidebar::-webkit-scrollbar-thumb {
                    background-color: ${accentPurple}; /* Vibrant accent purple */
                    border-radius: 10px;
                    border: 2px solid #f0f3f8; /* Thinner border, matches track */
                    transition: background-color 0.3s ease;
                }
                .filter-sidebar::-webkit-scrollbar-thumb:hover {
                    background-color: #7A3BD5; /* Darker accent purple on hover */
                }
                /* For Firefox */
                .filter-sidebar {
                    scrollbar-width: thin;
                    scrollbar-color: ${accentPurple} #f0f3f8;
                }

                /* REMOVED: @media (min-width: 768px) { display: none; } to always show scrollbar */
            `}</style>

            {/* Hamburger Button for Mobile */}
            <button
                className={`
                    md:hidden
                    fixed top-6 left-4 z-50 p-3 rounded-full
                    bg-[${accentPurple}] shadow-md
                    focus:outline-none focus:ring-2 focus:ring-[${accentPurple}] focus:ring-opacity-75
                    transition-all duration-300 transform
                    ${isOpen ? 'rotate-90' : 'rotate-0'}
                `}
                onClick={toggleSidebar}
                aria-label="Toggle Filters"
            >
                {isOpen ? (
                    <FaTimes className="w-5 h-5 text-white" />
                ) : (
                    <FaBars className="w-5 h-5 text-white" />
                )}
            </button>

            {/* Overlay on mobile when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                style={{ top: "10%" }} // Set top to 10%
                className={`
                    filter-sidebar
                    fixed bottom-0 left-4 /* Set bottom to 0 and left for mobile */
                    w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-40
                    transform transition-transform duration-300 ease-in-out
                    overflow-y-auto /* Allows content to scroll if it overflows vertically */
                    flex flex-col justify-between p-6

                    /* Mobile State: slides in/out from the left */
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}

                    /* Desktop State: always visible and positioned */
                    md:translate-x-0 /* Always visible on desktop */
                    md:left-4 /* Position on desktop */
                    md:top-10% /* Top position on desktop */
                    md:bottom-0 /* Bottom position on desktop */
                `}
                aria-label="Filter Sidebar"
            >
                {/* Filter Options */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                        {/* Close button inside sidebar, only visible on mobile */}
                        <button
                            className="md:hidden p-1 rounded-full hover:bg-gray-100 text-gray-700 hover:text-[${accentPurple}] transition-colors duration-200"
                            onClick={toggleSidebar}
                            aria-label="Close Filters"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Filter Group: Type */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Type</h3>
                        <div className="space-y-1">
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Course
                            </label>
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Webinar
                            </label>
                        </div>
                    </div>

                    {/* Filter Group: Category */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Category</h3>
                        <select
                            className={`w-full border border-gray-300 rounded-md p-2 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[${accentPurple}] focus:border-[${accentPurple}] transition-all duration-200 appearance-none`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%234B5563' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                        >
                            <option className="text-gray-800">All</option>
                            <option className="text-gray-800">Web Development</option>
                            <option className="text-gray-800">Design</option>
                            <option className="text-gray-800">Marketing</option>
                            <option className="text-gray-800">Data Science</option>
                            <option className="text-gray-800">Mobile Development</option>
                        </select>
                    </div>

                    {/* Filter Group: Tags */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Tags</h3>
                        <input
                            type="text"
                            placeholder="e.g. React, UI/UX"
                            className={`w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[${accentPurple}] focus:border-[${accentPurple}] transition-all duration-200`}
                        />
                    </div>

                    {/* Filter Group: Level */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Level</h3>
                        <div className="space-y-1">
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Beginner
                            </label>
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Intermediate
                            </label>
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Advanced
                            </label>
                        </div>
                    </div>

                    {/* Filter Group: Price */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">Price</h3>
                        <div className="space-y-1">
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Free
                            </label>
                            <label className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150">
                                <input type="checkbox" className={`mr-2 h-4 w-4 rounded form-checkbox accent-[${accentPurple}] border-gray-300 focus:ring-[${accentPurple}]`} />
                                Paid
                            </label>
                        </div>
                    </div>
                </div>

                {/* Clear Filters Button */}
                <button
                    className={`mt-6 w-full bg-[${accentPurple}] hover:bg-[#7A3BD5] text-white font-medium py-2.5 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[${accentPurple}] focus:ring-opacity-75`}
                    onClick={() => console.log("Clear all filters")}
                >
                    Clear Filters
                </button>
            </aside>
        </>
    );
};

export default FilterSidebar;