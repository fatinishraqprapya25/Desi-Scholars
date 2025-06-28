import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Main App component
const App = ({ localHistory }) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localHistory);
    }, [])
    const handleBack = () => {
        navigate("/practice-test");
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    return (
        <div className="min-h-screen bg-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-inter">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-8">
                <button
                    onClick={handleBack}
                    className="flex items-center text-purple-700 hover:text-purple-900 transition-colors duration-200 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to practice
                </button>
            </div>

            {/* Overall Score Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-4xl mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Overall Score</h2>
                    <div className="flex items-center text-purple-600 text-2xl sm:text-3xl font-bold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 sm:h-9 sm:w-9 mr-2"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2L6 6v6c0 5.5 4.5 10 10 10s10-4.5 10-10V6L12 2zm0 2.2L19.8 7 12 9.8 4.2 7 12 4.2zM6 8.3l6 2.5 6-2.5v3.7c0 4.2-3.2 7.7-7 8.3-3.8-.6-7-4.1-7-8.3V8.3z" />
                            <circle cx="12" cy="14" r="3" />
                        </svg>
                        65%
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <StatCard
                        color="green"
                        iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        label="First Attempt"
                        value={localHistory && localHistory.questionsSolvedFirstAttempt}
                    />
                    <StatCard
                        color="yellow"
                        iconPath="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15h-1v-1h2v1h-1zm0-3h-1V7h2v7h-1z"
                        label="Eventually Correct"
                        value={localHistory && localHistory.questionsSolvedAfterMistake}
                    />
                    <StatCard
                        color="red"
                        iconPath="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        label="Incorrect"
                        value={localHistory && localHistory.incorrectButUncorrected}
                    />
                </div>

                <p className="text-center text-gray-500 text-sm">
                    These stats will be updated on your dashboard.
                </p>
            </div>

            {/* Analysis Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                <AnalysisCard
                    title="Time Analysis"
                    data={[
                        { label: "Total Time", value: localHistory && localHistory.totalTimeNeeded },
                        { label: "Average Time per Question", value: localHistory && (localHistory.totalTimeNeeded / localHistory.totalQuestionsSolved) }
                    ]}
                />
                <AnalysisCard
                    title="Attempt Analysis"
                    data={[
                        { label: "Total Questions", value: localHistory && localHistory.totalQuestionsSolved },
                        { label: "Average Attempts per Question", value: "0.5" }
                    ]}
                />
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ color, iconPath, label, value }) => (
    <div className={`bg-${color}-100 p-4 rounded-lg flex flex-col items-center justify-center text-center`}>
        <div className={`text-${color}-600 mb-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
        </div>
        <p className="text-3xl sm:text-4xl font-bold text-gray-800">{value}</p>
        <p className="text-sm sm:text-base text-gray-600">{label}</p>
    </div>
);

// Analysis Card Component
const AnalysisCard = ({ title, data }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
        <ul className="space-y-3">
            {data.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.label}
                    </div>
                    <span className="font-medium">{item.value}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default App;
