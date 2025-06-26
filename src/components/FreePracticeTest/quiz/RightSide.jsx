import { ClipboardPen, Zap } from "lucide-react";
import { useState } from "react";

const RightSide = ({ markable, onChangeMarkable, question }) => {
    console.log(question);
    const [flash, setFlash] = useState(false);
    return (
        <div
            className="bg-white w-full h-fit rounded-lg px-8 py-2 mx-auto"
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Question ID:</h1>
                    <p className="text-indigo-600 font-bold text-xl">{question && question._id}</p>
                </div>

                <div className="flex">
                    <button
                        onClick={() => onChangeMarkable(!markable)} // Toggle markable mode
                        className={`${markable ? "bg-yellow-500" : "bg-teal-500"
                            } text-white p-2 rounded-full transition duration-300`}
                    >
                        <ClipboardPen />
                    </button>

                    <button
                        onClick={() => setFlash(!flash)}
                        className={`${flash ? "bg-black text-white" : "bg-white text-black"
                            } text-black border border-black p-2 rounded-full transition duration-300 ms-2`}
                    >
                        <Zap />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md min-w-max">
                    {/* Question Bank ID */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-600">Question Bank ID</span>
                        <span className="font-bold text-gray-800">359902ae</span>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 w-px h-6 bg-gray-300"></div>

                    {/* Section */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-600">Section</span>
                        <span className="font-bold text-gray-800">{question && question.subject}</span>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 w-px h-6 bg-gray-300"></div>

                    {/* Score Band */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-600">Score Band</span>
                        <span className="font-bold text-gray-800">{question && question.scoreBond}</span>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 w-px h-6 bg-gray-300"></div>

                    {/* Domain */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-600">Domain</span>
                        <span className="font-bold text-gray-800">{question && question.chapter}</span>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 w-px h-6 bg-gray-300"></div>

                    {/* Skill */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-600">Skill</span>
                        <span className="font-bold text-gray-800">{question && question.topic}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="border-t pt-3">
                <p className="text-gray-800 font-medium mb-4">
                    {question && question.question}
                </p>

                <div className="space-y-3">
                    {question && question.options.map((option, index) => {
                        let name = "A";
                        if (index === 0) {
                            name === "A";
                        } else if (index === 1) {
                            name = "B"
                        } else if (index === 2) {
                            name = "C";
                        } else {
                            name = "D"
                        }
                        return <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                            <span className="font-bold text-indigo-600 mr-2">{name}</span>
                            <span className="text-gray-800">{option}</span>
                        </div>
                    })}

                </div>
            </div>
        </div>
    );
};

export default RightSide;
