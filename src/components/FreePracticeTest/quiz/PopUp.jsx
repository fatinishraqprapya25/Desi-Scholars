import { useEffect, useState } from "react";

function App({ setShowPopUp, history, questions, handleHistoryQuestionIndex }) {
    const [questionStates, setQuestionStates] = useState({});

    useEffect(() => {
        if (Array.isArray(history) && Array.isArray(questions)) {
            const states = {};

            const idToNumber = {};
            questions.forEach((q, index) => {
                idToNumber[q._id] = index + 1;
                states[index + 1] = "unattempted";
            });

            history.forEach((entry) => {
                const number = idToNumber[entry.questionId];
                if (!number) return;
                if (entry.status === "Correct") {
                    states[number] = "solved";
                } else if (entry.status === "Incorrect") {
                    states[number] = "attempted";
                }
            });

            // Example: manually mark current and marked
            states[1] = "current";
            states[25] = "marked";

            setQuestionStates(states);
        }
    }, [history, questions]);

    const getButtonClasses = (state) => {
        switch (state) {
            case "current":
                return "bg-purple-600 text-white border-purple-600 relative";
            case "solved":
                return "bg-green-100 text-gray-800 border-green-300";
            case "attempted":
                return "bg-yellow-100 text-gray-800 border-yellow-300";
            case "unattempted":
                return "bg-gray-100 text-gray-800 border-gray-300";
            case "marked":
                return "bg-gray-100 text-gray-800 border-gray-300 relative";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const LegendItem = ({ colorClass, text, icon }) => (
        <div className="flex items-center space-x-1">
            <span
                className={`w-4 h-4 rounded-sm ${colorClass} flex items-center justify-center`}
            >
                {icon && <span className="text-white text-xs">{icon}</span>}
            </span>
            <span className="text-gray-700 text-sm">{text}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans bg-black/50">
            <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-2xl border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Question Map</h2>
                    <button
                        onClick={() => setShowPopUp(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <LegendItem
                        colorClass="bg-purple-600"
                        text="Current"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    />
                    <LegendItem
                        colorClass="bg-green-100 border border-green-300"
                        text="Solved"
                    />
                    <LegendItem
                        colorClass="bg-yellow-100 border border-yellow-300"
                        text="Attempted"
                    />
                    <LegendItem
                        colorClass="bg-gray-100 border border-gray-300"
                        text="Marked"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-purple-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        }
                    />
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
                    {questions && questions.map((q, index) => {
                        const number = index + 1;
                        const state = questionStates[number] || "unattempted";

                        return (
                            <button
                                key={q._id}
                                onClick={() => {
                                    setShowPopUp(false);
                                    handleHistoryQuestionIndex(q._id)
                                }}
                                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border font-medium text-sm sm:text-base transition-all duration-200 ease-in-out hover:shadow-md ${getButtonClasses(
                                    state
                                )}`}
                            >
                                {number}
                                {state === "current" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 absolute -top-1 -left-1 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                                {state === "marked" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 absolute -top-1 -right-1 text-purple-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
