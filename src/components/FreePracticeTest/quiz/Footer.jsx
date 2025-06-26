import React from "react";

const Footer = ({ handleNext, handleCheck, selectedOption, handlePrev, currentIndex, totalQuestions }) => {
    return (
        <div className="w-full fixed bottom-0 bg-gray-100 py-4 px-6 flex items-center justify-between border-t border-gray-300">
            <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Previous
            </button>

            <div className="text-gray-700 font-medium">
                <span>{currentIndex + 1}/{totalQuestions}</span>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleCheck}
                    disabled={selectedOption === null} // Disable if no option is selected
                    className={`px-4 py-2 rounded transition ${selectedOption === null
                        ? "bg-gray-400 text-gray-300 cursor-not-allowed" // Disabled styles
                        : "bg-green-500 text-white hover:bg-green-600" // Enabled styles
                        }`}
                >
                    Check
                </button>
                <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Footer;
