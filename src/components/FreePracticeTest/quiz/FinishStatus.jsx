import { Link } from "react-router-dom";

// Main App component
const App = () => {
    return (
        <div className="min-h-screen bg-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-inter">
            {/* Back to practice link */}
            <div
                className="w-full max-w-4xl mb-8"
            >
                <Link href="/test" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors duration-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to practice
                </Link>
            </div>

            {/* Overall Score Section */}
            <div
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-4xl mb-8"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Overall Score</h2>
                    <div className="flex items-center text-purple-600 text-2xl sm:text-3xl font-bold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 sm:h-9 sm:w-9 mr-2"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2L6 6v6c0 5.5 4.5 10 10 10s10-4.5 10-10V6L12 2zm0 2.2L19.8 7 12 9.8 4.2 7 12 4.2zM6 8.3l6 2.5 6-2.5v3.7c0 4.2-3.2 7.7-7 8.3-3.8-.6-7-4.1-7-8.3V8.3z" />
                            <circle cx="12" cy="14" r="3" />
                        </svg>
                        65%
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* First Attempt Card */}
                    <div
                        className="bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center"
                    >
                        <div className="text-green-600 mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 sm:h-12 sm:w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-800">1</p>
                        <p className="text-sm sm:text-base text-gray-600">First Attempt</p>
                    </div>

                    {/* Eventually Correct Card */}
                    <div
                        className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center justify-center text-center"
                    >
                        <div className="text-yellow-600 mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 sm:h-12 sm:w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.324 1.118l1.519 4.674c.3.921-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.324-1.118L2.928 10.1c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-800">2</p>
                        <p className="text-sm sm:text-base text-gray-600">Eventually Correct</p>
                    </div>

                    {/* Incorrect Card */}
                    <div
                        className="bg-red-100 p-4 rounded-lg flex flex-col items-center justify-center text-center"
                    >
                        <div className="text-red-600 mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 sm:h-12 sm:w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-gray-800">1</p>
                        <p className="text-sm sm:text-base text-gray-600">Incorrect</p>
                    </div>
                </div>

                <p className="text-center text-gray-500 text-sm">
                    These stats will be updated on your dashboard.
                </p>
            </div>

            {/* Analysis Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Time Analysis Card */}
                <div
                    className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
                >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Time Analysis</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between text-gray-700">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Total Time
                            </div>
                            <span className="font-medium">1m 7s</span>
                        </li>
                        <li className="flex items-center justify-between text-gray-700">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Average Time per Question
                            </div>
                            <span className="font-medium">.33s</span>
                        </li>
                    </ul>
                </div>

                {/* Attempt Analysis Card */}
                <div
                    className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
                >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Attempt Analysis</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between text-gray-700">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9.247a1 1 0 01.791-.403l3.102.547a1 1 0 01.954 1.32l-1.543 4.358a1 1 0 01-1.32.954l-.547-3.102a1 1 0 01-.403-.791V9.247z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v.01M12 16v.01M12 18v.01M12 20v.01M12 22v.01" />
                                </svg>
                                Total Questions
                            </div>
                            <span className="font-medium">2</span>
                        </li>
                        <li className="flex items-center justify-between text-gray-700">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Average Attempts per Question
                            </div>
                            <span className="font-medium">0.5</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
