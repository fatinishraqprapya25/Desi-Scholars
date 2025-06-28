import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Bookmark, MessageSquare, Flag } from 'lucide-react';

// Main Starter component
const Starter = ({ setHideQuiz }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4 font-sans antialiased">
            {/* Main Container Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full transform transition-all duration-300 hover:scale-[1.01]">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-10 px-4 rounded-t-2xl -mt-6 -mx-6 md:-mt-10 md:-mx-10 mb-8 shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Guidelines</h1>
                </div>

                {/* Question Status Types Section */}
                <section className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-purple-200 pb-3">Question Status Types</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Solved Card */}
                        <StatusCard
                            icon={<CheckCircle className="w-8 h-8 text-green-600" />}
                            title="Solved"
                            count="Correct on the first attempt"
                            bgColor="bg-green-100"
                            borderColor="border-green-400"
                            textColor="text-green-800"
                        />
                        {/* Attempted Card */}
                        <StatusCard
                            icon={<AlertTriangle className="w-8 h-8 text-yellow-600" />}
                            title="Attempted: 3"
                            count="Took more than one attempt"
                            bgColor="bg-yellow-100"
                            borderColor="border-yellow-400"
                            textColor="text-yellow-800"
                        />
                        {/* Unattempted Card */}
                        <StatusCard
                            icon={<XCircle className="w-8 h-8 text-red-600" />}
                            title="Unattempted"
                            count="Not attempted yet"
                            bgColor="bg-red-100"
                            borderColor="border-red-400"
                            textColor="text-red-800"
                        />
                    </div>
                </section>

                {/* Start Practice Button */}
                <div className="text-center mt-8">
                    <button onClick={() => setHideQuiz(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 text-lg">
                        Start Practice
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reusable component for Status Cards
const StatusCard = ({ icon, title, count, bgColor, borderColor, textColor }) => {
    return (
        <div className={`flex flex-col items-center p-5 rounded-xl border-2 ${borderColor} ${bgColor} shadow-md text-center transform transition-transform duration-200 hover:scale-105`}>
            <div className="mb-3">{icon}</div>
            <h3 className={`text-xl font-semibold ${textColor} mb-1`}>{title}</h3>
            <p className={`text-sm ${textColor} opacity-90`}>{count}</p>
        </div>
    );
};

export default Starter;
