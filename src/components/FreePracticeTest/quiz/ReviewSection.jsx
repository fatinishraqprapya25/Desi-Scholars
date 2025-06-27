import { Bookmark, Clock } from "lucide-react";

const ReviewSection = ({ questionNumber, handleCross }) => {
    return (
        <div className="flex items-center justify-between bg-gray-100 p-1 rounded-md shadow-sm mt-6">
            {/* Question Number */}
            <div className="bg-gray-800 text-white font-bold text-[12px] px-2 py-1 rounded-md">
                {questionNumber}
            </div>

            <div className="flex space-x-4">
                {/* Mark for Review */}
                <div className="flex items-center space-x-1">
                    <Bookmark className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Mark for Review</span>
                </div>

                {/* Timer */}
                <div className="flex items-center space-x-1">
                    <Clock
                        className={`cursor-pointer  "text-gray-600" : "text-red-600"}`}
                    />
                    <span className="text-indigo-600 font-bold">{formatTime(time)}</span>
                </div>

                {/* ABE Button */}
                
            </div>
        </div>
    );
};

export default ReviewSection;
