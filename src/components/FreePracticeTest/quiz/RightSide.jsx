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

    useEffect(() => {
        if (!crossAble) {
            setCrossedOptions([]);
        }
    }, [crossAble]);

    const handleOptionClick = (index) => {
        if (!crossedOptions.includes(index)) {
            changeOption(index);
        }
    };

    const handleCrossClick = (index) => {
        if (crossAble) {
            setCrossedOptions((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
            );
        }
    };

    return (
        <div className="bg-white w-full h-fit rounded-lg px-8 py-2 mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
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
