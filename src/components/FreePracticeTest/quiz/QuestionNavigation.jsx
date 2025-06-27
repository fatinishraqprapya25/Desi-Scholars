import { useState, useEffect } from "react";

const QuestionNavigation = ({ history, handleHistoryQuestionIndex, questions }) => {
    const [newHistory, setNewHistory] = useState([]);

    useEffect(() => {
        if (Array.isArray(history) && Array.isArray(questions)) {
            const merged = history.filter(h => questions.some(q => q._id === h.questionId));
            setNewHistory(merged);
        }
    }, [history, questions]);

    return (
        <div className="bg-gray-50 px-4">
            <div className="grid grid-cols-10 gap-2">
                {newHistory.map((question, index) => {
                    let statusClass = "";
                    switch (question.status) {
                        case "Correct":
                            statusClass = "bg-pink-100 text-white border-green-700";
                            break;
                        case "Incorrect":
                            statusClass = "bg-sky-100 text-white border-red-700";
                            break;
                        default:
                            statusClass = "bg-white border-gray-300 text-gray-800";
                            break;
                    }

                    return (
                        <button onClick={() => handleHistoryQuestionIndex(question.questionId)}
                            key={index}
                            className={`px-4 py-2 bg-sky-50 border-2 border-sky-600 rounded cursor-pointer hover:bg-sky-100`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const App = ({ history, handleHistoryQuestionIndex, questions }) => {
    return (
        <div className="flex items-center justify-start mt-5">
            <QuestionNavigation handleHistoryQuestionIndex={handleHistoryQuestionIndex} history={history} questions={questions} />
        </div>
    );
};

export default App;
