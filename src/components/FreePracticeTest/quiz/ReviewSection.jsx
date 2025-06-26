import { Eye, Bookmark, Clock } from "lucide-react";

const ReviewSection = () => {
    return (
        <div className="flex items-center justify-between bg-gray-100 p-1 rounded-md shadow-sm mt-6">
            {/* Question Number */}
            <div className="bg-gray-800 text-white font-bold text-[12px] px-2 py-1 rounded-md">
                69
            </div>

            <div className="flex space-x-4"> {/* Mark for Review */}
                <div className="flex items-center space-x-2">
                    <Bookmark className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Mark for Review</span>
                </div>

                {/* Timer */}
                <div className="flex items-center space-x-1">
                    <Clock className="text-gray-600" />
                    <span className="text-indigo-600 font-bold">33:26</span>
                </div>
                {/* ABE Button */}
                <div className="bg-gray-800 text-white font-bold text-[12px] px-2 py-1 rounded-md">
                    ABE
                </div>

            </div>


        </div>
    );
};

export default ReviewSection;
