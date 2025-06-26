const QuestionModal = ({ currentIndex, length, setShowQuestionModal, mockQuestions }) => {
    const handleQuestionClick = (index) => {
        setCurrentIndex(index);
        setShowQuestionModal(false);
    };

    const questions = Array.from({ length: length }, (_, i) => ({
        id: i + 1,
        isCurrent: i === 0,
        isAnswered: i >= 1 && i <= 5
    }));

    return (
        <div className="fixed z-60 inset-0 overflow-y-auto">
            <div className="w-screen  h-screen bg-gray-200">

                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl relative">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Question Map</h2>
                            <button onClick={() => setShowQuestionModal(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300">
                                &times;
                            </button>
                        </div>

                        {/* Legend Section */}
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="flex items-center space-x-2 text-gray-700 text-base">
                                <div className="w-5 h-5 rounded-md bg-purple-100 border-2 border-purple-700 flex items-center justify-center relative">
                                    <span className="absolute text-sm">📍</span> {/* Location pin emoji */}
                                </div>
                                <span>Current</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700 text-base">
                                <div className="w-5 h-5 rounded-md bg-blue-100 border-2 border-blue-600 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
                                </div>
                                <span>Answered</span>
                            </div>
                        </div>

                        {/* Question Grid Section */}
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4 mb-10">
                            {questions.map((question) => (
                                <div
                                    key={question.id}
                                    className={`
                flex items-center justify-center w-14 h-14 rounded-lg text-lg font-medium cursor-pointer transition-all duration-200 ease-in-out
                ${question.isCurrent
                                            ? 'bg-purple-50 border-2 border-purple-700 text-purple-700 relative'
                                            : question.isAnswered
                                                ? 'bg-blue-50 border-2 border-blue-600 text-blue-600'
                                                : 'bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                                        }
              `}
                                >
                                    {question.id}
                                    {question.isCurrent && (
                                        <span className="absolute bottom-1 right-1 text-xs">📍</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Go to Review Page Button */}
                        <div className="flex justify-center">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QuestionModal;
