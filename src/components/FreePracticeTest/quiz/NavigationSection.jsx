import QuestionNavigation from "./QuestionNavigation";

const NavigationSection = () => {
    return (
        <>
            <div className="bg-gray-50 p-4 rounded-lg">
                {/* Left Buttons */}
                <div className="flex space-x-2">
                    <button className="border border-purple-500 text-purple-500 px-2 text-[14px] rounded-lg hover:bg-purple-100 transition">
                        Hide Navigation
                    </button>

                    <button className="border border-gray-400 text-gray-700 px-2 py-1 text-[14px] rounded-lg hover:bg-gray-100 transition flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5l-4-4m0 0l-4 4m4-4v9m6 4.5a9 9 0 11-12 0 9 9 0 0112 0z"
                            />
                        </svg>
                        <span>Shuffle Question Order</span>
                    </button>
                </div>

                {/* Glossary */}
                <div className="flex items-center space-x-2 mt-3">
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-green-500"></span>
                        <span className="text-gray-700">Correct</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-red-500"></span>
                        <span className="text-gray-700">Incorrect</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-green-500 relative">
                            <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-red-500"></span>
                        </span>
                        <span className="text-gray-700">
                            Correct (with prior incorrect attempt)
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                        <span className="text-gray-700">Marked for Review</span>
                    </div>
                </div>
            </div>

            <QuestionNavigation />
        </>
    );
};

export default NavigationSection;
