import { Zap, X, Pen, PencilLine, LocateOff, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import validateToken from "../../../utils/ValidateToken";

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

    // State to trigger the vibrate animation
    const [vibrateKey, setVibrateKey] = useState(0);

    useEffect(() => {
        if (!crossAble) {
            setCrossedOptions([]);
        }
    }, [crossAble]);

    useEffect(() => {
        handleSetBookmark();
    }, []);

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

    // Trigger vibrate animation when currentIndex changes
    useEffect(() => {
        setVibrateKey(prevKey => prevKey + 1); // Increment key to force re-render and animation
    }, [currentIndex]);


    const handleOptionClick = (index) => {
        if (!crossedOptions.includes(index)) {
            changeOption(index);
        }
    };

    const handleSetBookmark = () => {
        const fetchReq = async () => {
            const checkUser = await validateToken();
            const payload = { userId: checkUser.id, questionId: question._id }
            if (checkUser) {
                const response = await fetch("http://localhost:5000/api/review/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                if (result.success) {
                    setMarker(true);
                } else {
                    setMarker(false);
                }
            }
        }
        fetchReq();
    }

    const handleBookmark = () => {
        const addBookMark = async () => {
            const checkUser = await validateToken();
            const payload = {
                userId: checkUser.id,
                questionId: question._id,
                subject: question.subject
            }

            if (checkUser.id) {
                const response = await fetch("http://localhost:5000/api/review", {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                handleSetBookmark();
            }

        }
        addBookMark();
    }

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
                <p className="text-gray-800 font-medium mb-4 text-xl">
                    {question && question.question}
                </p>

                <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center space-x-2">
                        <div className="flex text-white items-center rounded-full w-fit px-3 py-1 text-base bg-red-500">
                            <LocateOff size={18} />
                            <span className="ps-1">Unattempted</span>
                        </div>

                        <button
                            onClick={handleBookmark}
                            className={`flex items-center py-1 rounded-full px-3 text-base transition duration-200
        ${marker
                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                    : 'bg-purple-100 text-black border border-purple-600 hover:bg-purple-200'
                                }
    `}
                        >
                            <Bookmark size={18} />
                            <span className="ps-1">{marker ? "Marked" : "Mark For Review"}</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
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
                            <Pen color={markable ? "tomato" : "oklch(0.5 0.19 304.98)"} size={22} />
                        </button>

                        <button
                            onClick={handleCross}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-medium rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <span className={`relative px-3 py-1 transition-all ease-in duration-75 rounded-full group-hover:bg-opacity-0
                                ${crossAble ? "bg-purple-500 text-white" : "bg-white text-gray-800"}
                            `}>
                                <del className={`${!crossAble ? "no-underline" : "line-through"}`}>ABE</del>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {question &&
                        question.options.map((option, index) => {
                            let name = String.fromCharCode(65 + index); // A, B, C, D

                            const isSelected = sOption === index;
                            const isCrossed = crossedOptions.includes(index);
                            // Ensure question.correctAnswerIndex exists for correct answer highlighting
                            const isCorrectAnswer = ansCorrect !== null && question?.correctAnswerIndex === index;

                            const getOptionClasses = () => {
                                let classes = `
                                    flex items-center border rounded-xl px-3 py-2 cursor-pointer transition-all duration-300 ease-in-out
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
                                // Wrap the option div with motion.div
                                <motion.div
                                    key={`${index}-${vibrateKey}`} // Use vibrateKey to re-trigger animation on currentIndex change
                                    className="flex items-center"
                                    initial={{ x: 0 }}
                                    animate={{ x: [0, -5, 5, -5, 5, 0] }} // Vibrate effect
                                    transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 20 }}
                                >
                                    <div
                                        onClick={() => handleOptionClick(index)}
                                        className={`${getOptionClasses()} flex-grow`}
                                        style={{ position: "relative", overflow: "hidden" }}
                                    >
                                        <div className="flex items-center w-full">
                                            <span className={`font-extrabold text-xl mr-3 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-300 border-2 ${isSelected
                                                ? "border-blue-500 text-blue-800" // Selected: blue border, blue text
                                                : "border-gray-400 text-gray-800" // Default: gray border, gray text
                                                }`}>
                                                {name}
                                            </span>
                                            <span className="text-gray-800 w-full text-lg">
                                                {option}
                                            </span>
                                        </div>

                                        {ansCorrect !== null && isSelected && ansCorrect && (
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
                                                <Zap size={22} />
                                            </span>
                                        )}
                                        {ansCorrect !== null && isSelected && !ansCorrect && (
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600">
                                                <X size={22} />
                                            </span>
                                        )}
                                    </div>

                                    {crossAble && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCrossClick(index);
                                            }}
                                            className="ml-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
                                            aria-label={`Cross out option ${name}`}
                                        >
                                            <X size={20} className="text-gray-500 hover:text-red-600" />
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default RightSide;