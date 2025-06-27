import { LogOut } from 'lucide-react';

const Footer = ({ handleNext, handleCheck, selectedOption, handlePrev, currentIndex, totalQuestions }) => {
    return (
        <div className="w-full fixed bottom-0 bg-white py-4 px-6 flex items-center justify-between border-t border-gray-200 shadow-md">
            <button
                className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out text-md font-medium"
            >
                <LogOut size={17} />
                Exit
            </button>

            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-md font-semibold shadow-sm">
                <span>Question {currentIndex + 1} of {totalQuestions}</span>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handlePrev}
                    className="bg-purple-300 text-gray-800 px-4 py-1 rounded-md hover:bg-purple-400 transition duration-300 ease-in-out text-md font-medium"
                >
                    Back
                </button>
                <button
                    onClick={handleCheck}
                    disabled={selectedOption === null}
                    className={`px-4 py-1 rounded-md transition duration-300 ease-in-out text-md font-medium ${selectedOption === null
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                        }`}
                >
                    Check
                </button>
                <button
                    onClick={handleNext}
                    className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out text-lg font-medium"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Footer;