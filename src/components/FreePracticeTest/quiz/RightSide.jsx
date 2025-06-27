import { ClipboardPen, Zap, X, Pen, PencilLine, LocateOff, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import ReviewSection from "./ReviewSection"; // Assuming this component is relevant

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

    const [marker, setMarker] = useState(false);

    useEffect(() => {
        if (!crossAble) {
            setCrossedOptions([]);
        }
    }, [crossAble]);

    // Added for flash animation feedback
    useEffect(() => {
        if (ansCorrect !== null) {
            setFlash(true);
            const timer = setTimeout(() => {
                setFlash(false);
            }, 700); // Flash for 700ms
            return () => clearTimeout(timer);
        }
    }, [ansCorrect]);


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

            <div className="pt-3">
                <p className="text-gray-800 font-medium mb-4 text-lg">
                    {question && question.question}
                </p>

                <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center space-x-2">
                        {/* Unattempted Status */}
                        <div className="flex text-white items-center rounded-full w-fit px-3 py-1 text-sm bg-red-500">
                            <LocateOff size={16} />
                            <span className="ps-1">Unattempted</span>
                        </div>

                        {/* Mark Button */}
                        <button onClick={() => setMarker(!marker)} className="flex items-center text-white py-1 rounded-full px-3 text-sm bg-purple-600 hover:bg-purple-700 transition duration-200">
                            <Bookmark size={16} />
                            <span className="ps-1">{marker ? "Marked" : "Mark"}</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Markable/Pen Button */}
                        <button
                            onClick={() => !crossAble && onChangeMarkable(!markable)}
                            className={`
                                p-2 rounded-full transition duration-300 transform hover:scale-110
                                ${crossAble ? "opacity-50 cursor-not-allowed" : ""}
                                ${markable ? "bg-red-100" : "bg-gray-100"}
                            `}
                            disabled={crossAble}
                            aria-label="Toggle Markable"
                        >
                            <Pen color={markable ? "tomato" : "oklch(0.5 0.19 304.98)"} size={20} />
                        </button>

                        {/* Cross-out (ABE) Button */}
                        <button
                            onClick={handleCross}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <span className={`relative px-3 py-1 transition-all ease-in duration-75 rounded-full group-hover:bg-opacity-0
                                ${crossAble ? "bg-purple-500 text-white" : "bg-white text-gray-800"}
                            `}>
                                <del className={`${!crossAble ? "no-underline" : "line-through"}`}>ABE</del>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {question &&
                        question.options.map((option, index) => {
                            let name = String.fromCharCode(65 + index); // A, B, C, D

                            const isSelected = sOption === index;
                            const isCrossed = crossedOptions.includes(index);
                            // Ensure question.correctAnswerIndex exists for correct answer highlighting
                            const isCorrectAnswer = ansCorrect !== null && question?.correctAnswerIndex === index;

                            const getOptionClasses = () => {
                                let classes = `
                                    flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all duration-300 ease-in-out {/* Changed rounded-lg to rounded-xl */}
                                    ${isCrossed ? "opacity-60 pointer-events-none" : "hover:scale-[1.01] hover:bg-gray-100"}
                                    ${flash && isCorrectAnswer ? 'flash-animation' : ''}
                                `;

                                if (isSelected) {
                                    if (ansCorrect === null) {
                                        classes += " bg-blue-100 border-blue-500 text-blue-800"; // Selected, not yet evaluated
                                    } else if (ansCorrect) {
                                        classes += " bg-green-100 border-green-500 text-green-800"; // Correctly selected
                                    } else {
                                        classes += " bg-red-100 border-red-500 text-red-800"; // Incorrectly selected
                                    }
                                } else if (ansCorrect !== null && isCorrectAnswer) {
                                    classes += " bg-green-50 border-green-400 text-green-700"; // Correct answer when revealed
                                } else {
                                    classes += " bg-gray-50 border-gray-200 text-gray-800"; // Default light background
                                }

                                // Apply line-through only if it's currently crossed out
                                if (isCrossed) {
                                    classes += " line-through decoration-red-500 decoration-2";
                                }

                                return classes;
                            };

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    className={getOptionClasses()}
                                    style={{ position: "relative", overflow: "hidden" }}
                                >
                                    <div className="flex items-center w-full">
                                        <span className="font-extrabold text-lg mr-3 w-6 flex-shrink-0 text-center">{name}</span>
                                        <span className="text-gray-800 w-full text-md">
                                            {option}
                                        </span>
                                    </div>

                                    {/* Cross Button */}
                                    {crossAble && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering option click
                                                handleCrossClick(index);
                                            }}
                                            className="ml-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                            aria-label={`Cross out option ${name}`}
                                        >
                                            <X size={18} className="text-gray-500 hover:text-red-600" />
                                        </button>
                                    )}

                                    {/* Checkmark or Xmark for feedback if answered */}
                                    {ansCorrect !== null && isSelected && ansCorrect && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
                                            <Zap size={20} /> {/* Checkmark */}
                                        </span>
                                    )}
                                    {ansCorrect !== null && isSelected && !ansCorrect && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600">
                                            <X size={20} /> {/* X-mark */}
                                        </span>
                                    )}

                                </div>
                            );
                        })}
                </div>
            </div>
            {/* You might want to pass these props to ReviewSection if it's part of the flow */}
            {/* <ReviewSection {...{ currentIndex, question, meta, ansCorrect }} /> */}
        </div>
    );
};

export default RightSide;