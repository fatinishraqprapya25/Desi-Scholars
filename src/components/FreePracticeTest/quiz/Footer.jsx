import { ChevronUp, LogOut } from 'lucide-react';

const Footer = ({
    handleNext,
    handleCheck,
    selectedOption,
    handlePrev,
    currentIndex,
    totalQuestions,
    setShowPopUp
}) => {
    return (
        <div
            className="w-full fixed bottom-0 bg-white py-4 px-6 flex items-center justify-between border-t border-gray-200 shadow-md"
            style={{
                borderImage: `repeating-linear-gradient(to right, currentColor 0, currentColor var(--custom-dash-pattern, 10px), transparent var(--custom-dash-pattern, 10px), transparent calc(var(--custom-dash-pattern, 10px) + var(--custom-gap-pattern, 5px))) 1`,
                borderWidth: '2px',
                borderStyle: 'solid',
            }}
        >
            {/* Exit Button */}
            <button
                className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out text-md font-medium"
            >
                <LogOut size={17} />
                Exit
            </button>

            <button onClick={() => setShowPopUp(true)} className="cursor-pointer flex items-center justify-center">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-md text-md font-semibold shadow-sm flex items-center space-x-2">
                    <span>Question {currentIndex + 1} of {totalQuestions} </span> <ChevronUp size={19} />
                </div>
            </button>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={handlePrev}
                    className="bg-purple-300 text-white px-4 py-1 rounded-full hover:bg-purple-400 transition duration-300 ease-in-out text-md font-medium"
                >
                    Back
                </button>
                <button
                    onClick={handleCheck}
                    disabled={selectedOption === null}
                    className={`px-4 py-1 rounded-full text-white transition duration-300 ease-in-out text-md font-medium ${selectedOption === null
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-purple-500 hover:bg-purple-600"
                        }`}
                >
                    Check
                </button>
                <button
                    onClick={handleNext}
                    className="bg-purple-600 text-white px-4 py-1 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out text-md font-medium"
                >
                    {(currentIndex + 1) === totalQuestions ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Footer;