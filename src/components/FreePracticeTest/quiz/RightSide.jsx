const RightSide = () => {
    return (
        <div className="bg-white w-full h-fit rounded-lg px-8 py-6 mx-auto">
            {/* Question Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Question ID</h1>
                    <p className="text-indigo-600 font-bold text-xl">#01371</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="bg-teal-500 text-white p-2 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4m0 0h-4m0 0V6m0 4v4m-8-4h4m0 0H6m0 0v4m0-4V6"
                            />
                        </svg>
                    </button>
                    <button className="bg-purple-500 text-white p-2 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12l-3 3m0 0l-3-3m3 3V9m0 3l3 3m-3-3l-3 3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Question Details */}
            <div className="bg-gray-100">
                {/* Scrollable Container */}
                <div className="flex items-center gap-6 overflow-x-auto scrollbar">
                    {/* Question Bank ID */}
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Question Bank ID:</span>
                        <span>84b5125b</span>
                    </div>
                    {/* Section */}
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Section:</span>
                        <span>English</span>
                    </div>
                    {/* Score Band */}
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Score Band:</span>
                        <span>2</span>
                    </div>
                    {/* Domain */}
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Domain:</span>
                        <span>Craft and Structure</span>
                    </div>
                    {/* Skill */}
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Skill:</span>
                        <span>Words in Context</span>
                    </div>
                </div>
            </div>

            {/* Question Content */}
            <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-gray-800">1</h2>
                    <div className="flex items-center gap-2">
                        <button className="text-blue-600 font-medium">Mark for Review</button>
                        <div className="flex items-center text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3"
                                />
                            </svg>
                            <span className="ml-1">14:14:55</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray-800 font-medium mb-4">
                    Which choice completes the text with the most logical and precise word or phrase?
                </p>

                {/* Options */}
                <div className="space-y-3">
                    <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                        <span className="font-bold text-indigo-600 mr-2">A</span>
                        <span className="text-gray-800">indicated by</span>
                    </div>
                    <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                        <span className="font-bold text-indigo-600 mr-2">B</span>
                        <span className="text-gray-800">handmade from</span>
                    </div>
                    <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                        <span className="font-bold text-indigo-600 mr-2">C</span>
                        <span className="text-gray-800">represented by</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
