import { useState, useEffect } from "react";
import { Bookmark, Clock } from "lucide-react";

const ReviewSection = ({ questionNumber, handleCross }) => {
    const [time, setTime] = useState(0); // Initial timer value in seconds
    const [isRunning, setIsRunning] = useState(true); // State to track if the timer is running

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000);
        }

        return () => clearInterval(interval); // Cleanup the interval on unmount or when isRunning changes
    }, [isRunning]); // Dependency array includes isRunning to toggle timer

    // Format the time to MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Toggle the timer state when the clock icon is clicked
    const handleClockClick = () => {
        setIsRunning((prevState) => !prevState); // Toggle between running and paused
    };

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
                        className={`cursor-pointer ${isRunning ? "text-gray-600" : "text-red-600"}`} // Change color when paused
                        onClick={handleClockClick} // Add click handler to toggle timer
                    />
                    <span className="text-indigo-600 font-bold">{formatTime(time)}</span>
                </div>

                {/* ABE Button */}
                <button onClick={handleCross}>
                    <div className="bg-gray-800 cursor-pointer text-white font-bold text-[12px] px-2 py-1 rounded-md">
                        <del>ABE</del>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ReviewSection;
