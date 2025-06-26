export default function QuizFooter() {
    return (
        <footer className="w-full bg-purple-100 py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-md rounded-b-lg">
            {/* Exit Button */}
            <button className="flex items-center bg-red-400 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L7.5 8.586 5.707 6.793a1 1 0 00-1.414 1.414L6.086 10l-1.793 1.793a1 1 0 101.414 1.414L7.5 11.414l1.793 1.793a1 1 0 001.414-1.414L8.914 10l1.793-1.793z" clipRule="evenodd" />
                </svg>
                Exit
            </button>

            {/* Question Counter */}
            <div className="bg-gray-800 text-white px-8 py-3 rounded-xl shadow-md flex items-center">
                <span className="font-semibold text-lg">Question 1 of 27</span>
                {/* Up arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Back and Next Buttons */}
            <div className="flex space-x-4">
                <button className="bg-purple-300 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
                    Back
                </button>
                <button className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                    Next
                </button>
            </div>
        </footer>
    );
}