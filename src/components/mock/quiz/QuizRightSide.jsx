import React, { useState } from 'react';

const question = "Which choice completes the text with the most logical and precise word or phrase?";
const options = [
    { label: 'A', value: 'preventable', text: 'preventable' },
    { label: 'B', value: 'undeniable', text: 'undeniable' },
    { label: 'C', value: 'common', text: 'common' },
    { label: 'd', value: 'common', text: 'common d' },
];

const QuizRightSide = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
            <div className="p-6 bg-white rounded-lg mt-[-30px] max-w-2xl mx-auto my-8">
                {/* Header with question number and buttons */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white font-bold rounded-full">
                            1
                        </span>
                        <button className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50">
                            Mark for Review
                        </button>
                        <button className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50">
                            Report
                        </button>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800">
                        {/* Pencil icon - you might use an SVG or an icon library here */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                </div>

                {/* Question Text */}
                <p className="text-lg font-semibold text-gray-800 mb-6">
                    {question}
                </p>

                {/* Options */}
                <div className="space-y-4">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={`flex items-center w-full p-4 rounded-lg border cursor-pointer
              ${selectedOption === option.value
                                    ? 'bg-purple-100 border-purple-500' // Selected style
                                    : 'bg-white border-gray-300 hover:bg-gray-50' // Default style
                                }`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            <span className={`flex items-center justify-center w-6 h-6 rounded-full mr-4 text-sm font-semibold
              ${selectedOption === option.value
                                    ? 'bg-purple-600 text-white' // Selected style
                                    : 'bg-gray-200 text-gray-700' // Default style
                                }`}>
                                {option.label}
                            </span>
                            <span className="text-gray-800">{option.text}</span>
                        </button>
                    ))}
                </div>
            </div>
    );
};

export default QuizRightSide;