import { ClipboardPen, Zap, X } from "lucide-react";
import { useState, useEffect } from "react";
import ReviewSection from "./ReviewSection";

const RightSide = ({
    currentIndex,
    markable,
    onChangeMarkable,
    question,
    meta,
    ansCorrect,
    sOption,
    changeOption,
    handleCross,
    crossAble,
}) => {
    const [flash, setFlash] = useState(false);
    const [crossedOptions, setCrossedOptions] = useState([]);

    // Clear crossed options when crossAble becomes false
    useEffect(() => {
        if (!crossAble) {
            setCrossedOptions([]);
        }
    }, [crossAble]);

    const handleOptionClick = (index) => {
        if (!crossedOptions.includes(index)) {
            changeOption(index); // Normal option selection if the option is not crossed
        }
    };

    const handleCrossClick = (index) => {
        if (crossAble) {
            setCrossedOptions((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index) // Remove the option from crossed list
                    : [...prev, index] // Add the option to crossed list
            );
        }
    };

    return (
        <div className="bg-white w-full h-fit rounded-lg px-8 py-2 mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Question ID:</h1>
                    <p className="text-indigo-600 font-bold text-xl">
                        {question && question._id}
                    </p>
                </div>

                <div className="flex">
                    <button
                        onClick={() => !crossAble && onChangeMarkable(!markable)}
                        className={`${markable ? "bg-yellow-500" : "bg-teal-500"
                            } text-white p-2 rounded-full transition duration-300 ${crossAble && "opacity-50 cursor-not-allowed"
                            }`}
                        disabled={crossAble}
                    >
                        <ClipboardPen />
                    </button>

                    <button
                        onClick={() => !crossAble && setFlash(!flash)}
                        className={`${flash ? "bg-black text-white" : "bg-white text-black"
                            } text-black border border-black p-2 rounded-full transition duration-300 ms-2 ${crossAble && "opacity-50 cursor-not-allowed"
                            }`}
                        disabled={crossAble}
                    >
                        <Zap />
                    </button>
                </div>
            </div>

            {meta && (
                <div className="overflow-x-auto">
                    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md min-w-max">
                        {/* Question Bank ID */}
                        <div className="flex flex-col space-x-2">
                            <span className="font-semibold text-gray-600">
                                Question Bank ID
                            </span>
                            <span className="font-bold text-gray-800">359902ae</span>
                        </div>

                        {/* Divider */}
                        <div className="mx-4 w-px h-6 bg-gray-300"></div>

                        {/* Section */}
                        <div className="flex flex-col space-x-2">
                            <span className="font-semibold text-gray-600">Section</span>
                            <span className="font-bold text-gray-800">
                                {question && question.subject}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="mx-4 w-px h-6 bg-gray-300"></div>

                        {/* Score Band */}
                        <div className="flex flex-col space-x-2">
                            <span className="font-semibold text-gray-600">Score Band</span>
                            <span className="font-bold text-gray-800">
                                {question && question.scoreBond}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="mx-4 w-px h-6 bg-gray-300"></div>

                        {/* Domain */}
                        <div className="flex flex-col space-x-2">
                            <span className="font-semibold text-gray-600">Domain</span>
                            <span className="font-bold text-gray-800">
                                {question && question.chapter}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="mx-4 w-px h-6 bg-gray-300"></div>

                        {/* Skill */}
                        <div className="flex flex-col space-x-2">
                            <span className="font-semibold text-gray-600">Skill</span>
                            <span className="font-bold text-gray-800">
                                {question && question.topic}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <ReviewSection handleCross={handleCross} questionNumber={currentIndex + 1} />

            {/* Content */}
            <div className="pt-3">
                <p className="text-gray-800 font-medium mb-4">
                    {question && question.question}
                </p>

                <div className="space-y-3">
                    {question &&
                        question.options.map((option, index) => {
                            let name = "A";
                            if (index === 0) {
                                name = "A";
                            } else if (index === 1) {
                                name = "B";
                            } else if (index === 2) {
                                name = "C";
                            } else {
                                name = "D";
                            }

                            const bgColor = (() => {
                                if (sOption === index) {
                                    if (ansCorrect === null) {
                                        return "bg-blue-400 border-blue-700";
                                    } else if (ansCorrect) {
                                        return "bg-green-500 border-green-700";
                                    } else {
                                        return "bg-red-500 border-red-700";
                                    }
                                }
                                return "bg-white";
                            })();

                            // Apply line-through to the entire option container if crossed
                            const crossedOut = crossedOptions.includes(index)
                                ? "line-through text-gray-500 cursor-not-allowed"
                                : "";

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition hover:bg-gray-100 ${bgColor} ${crossedOut}`}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="flex items-center w-full">
                                        <span className="font-bold text-indigo-600 mr-2">{name}</span>
                                        <span className="text-gray-800 w-full">{option}</span>
                                    </div>

                                    {/* Cross Button */}
                                    {crossAble && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering option click
                                                handleCrossClick(index);
                                            }}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <X />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default RightSide;
