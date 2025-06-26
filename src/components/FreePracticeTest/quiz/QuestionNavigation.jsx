const QuestionNavigation = ({ questions }) => {
    return (
        <div className="bg-gray-50 px-4">
            <div className="grid grid-cols-10 gap-2">
                {questions.map((question, index) => {
                    // Determine the color based on the status
                    let statusClass = "";
                    switch (question.status) {
                        case "correct":
                            statusClass = "bg-green-500 text-white border-green-700";
                            break;
                        case "incorrect":
                            statusClass = "bg-red-500 text-white border-red-700";
                            break;
                        case "review":
                            statusClass = "bg-yellow-500 text-white border-yellow-700";
                            break;
                        case "attempted":
                            statusClass = "bg-blue-500 text-white border-blue-700";
                            break;
                        default:
                            statusClass = "bg-white border-gray-300 text-gray-800";
                            break;
                    }

                    return (
                        <button
                            key={index}
                            className={`cursor-pointer w-6 h-6 border rounded-lg flex items-center justify-center font-bold transition hover:scale-105 ${statusClass}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const App = () => {
    const questions = [
        { id: 1, status: "correct" },
        { id: 2, status: "incorrect" },
        { id: 3, status: "review" },
    ];

    return (
        <div className="flex items-center justify-start mt-5">
            <QuestionNavigation questions={questions} />
        </div>
    );
};

export default App;
