import { ClipboardPen } from "lucide-react";
import { useState } from "react";

const RightSide = ({ markable, onChangeMarkable }) => {
    const [flash, setFlash] = useState(false);
    return (
        <div
            className="bg-white w-full h-fit rounded-lg px-8 py-2 mx-auto"
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Question ID</h1>
                    <p className="text-indigo-600 font-bold text-xl">#01371</p>
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
                        <ClipboardPen />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="border-t pt-3">
                <p className="text-gray-800 font-medium mb-4">
                    As used in the text, what does the phrase "a singular" most nearly mean?
                </p>

                <div className="space-y-3">
                    <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                        <span className="font-bold text-indigo-600 mr-2">A</span>
                        <span className="text-gray-800">indicated by</span>
                    </div>
                    <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                        <span className="font-bold text-indigo-600 mr-2">B</span>
                        <span className="text-gray-800">handmade from</span>
                    </div>
                    <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-100">
                        <span className="font-bold text-indigo-600 mr-2">C</span>
                        <span className="text-gray-800">represented by</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
