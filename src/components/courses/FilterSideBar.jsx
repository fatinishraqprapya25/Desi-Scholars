import { useState } from "react";

const FilterSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <>
            {/* Custom Scrollbar Styles */}
            <style>{`
        @media (max-width: 767px) {
          .filter-sidebar::-webkit-scrollbar {
            width: 10px;
          }
          .filter-sidebar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 10px;
            margin: 8px 0;
          }
          .filter-sidebar::-webkit-scrollbar-thumb {
            background-color: #6366f1;
            border-radius: 10px;
            border: 3px solid #f3f4f6;
            transition: background-color 0.3s ease;
          }
          .filter-sidebar::-webkit-scrollbar-thumb:hover {
            background-color: #4f46e5;
          }
          .filter-sidebar {
            scrollbar-width: thin;
            scrollbar-color: #6366f1 #f3f4f6;
          }
        }

        @media (min-width: 768px) {
          .filter-sidebar::-webkit-scrollbar {
            display: none;
          }
          .filter-sidebar {
            scrollbar-width: none;
          }
        }
      `}</style>

            {/* Hamburger Button - No Background */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Toggle Filters"
            >
                <div className="relative w-6 h-6">
                    <span
                        className={`absolute left-0 h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${isOpen ? "rotate-45 top-2.5" : "top-1"
                            }`}
                    />
                    <span
                        className={`absolute left-0 h-0.5 w-full bg-black transition-all duration-300 ${isOpen ? "opacity-0" : "top-2.5"
                            }`}
                    />
                    <span
                        className={`absolute left-0 h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${isOpen ? "-rotate-45 top-2.5" : "top-4"
                            }`}
                    />
                </div>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          filter-sidebar
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none md:w-64
          flex flex-col justify-between p-6
          overflow-y-auto max-h-[calc(100vh-2rem)]
        `}
                aria-label="Filter Sidebar"
            >
                {/* Filter Options */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Filters</h2>
                        <button
                            className="md:hidden p-1 rounded hover:bg-gray-200"
                            onClick={toggleSidebar}
                            aria-label="Close Filters"
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Type</h3>
                        <div className="space-y-1">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Course
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Webinar
                            </label>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Category</h3>
                        <select className="w-full border border-gray-300 rounded p-2">
                            <option>All</option>
                            <option>Web Development</option>
                            <option>Design</option>
                            <option>Marketing</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Tags</h3>
                        <input
                            type="text"
                            placeholder="e.g. React, UI/UX"
                            className="w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Level</h3>
                        <div className="space-y-1">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Beginner
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Intermediate
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Advanced
                            </label>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Price</h3>
                        <div className="space-y-1">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Free
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-2" />
                                Paid
                            </label>
                        </div>
                    </div>
                </div>

                {/* Clear Filters Button */}
                <button
                    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
                    onClick={() => alert("Clear all filters")}
                >
                    Clear Filters
                </button>
            </aside>
        </>
    );
};

export default FilterSidebar;
