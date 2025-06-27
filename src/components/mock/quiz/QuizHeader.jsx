import { useState, useEffect } from 'react';

export default function QuizHeader({ moduleName, initialMinutes, initialSeconds }) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isTimerHidden, setIsTimerHidden] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(timer);
                    console.log("Timer finished!");
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);

    const toggleTimerVisibility = () => {
        setIsTimerHidden(!isTimerHidden);
    };

    const formatTime = (time) => String(time).padStart(2, '0');

    return (
        <>
            {/* Fixed Header Section */}
            <div className="fixed top-0 left-0 w-full z-50">
                <header className="w-full bg-purple-100 p-2 sm:p-3 shadow-md grid grid-cols-3 sm:flex-row items-center sm:items-center justify-between border-b border-gray-300 custom-dashed-border">
                    {/* Module Name on the Left */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                            {moduleName}
                        </h1>
                    </div>

                    {/* Timer and Button Centered */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wide">
                            {isTimerHidden ? '** : **' : `${formatTime(minutes)} : ${formatTime(seconds)}`}
                        </div>
                        <button
                            onClick={toggleTimerVisibility}
                            className="mt-2 px-2 bg-white text-gray-700 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            {isTimerHidden ? 'Show' : 'Hide'}
                        </button>
                    </div>
                </header>

                {/* Fixed Content Section */}
                <div className="max-w-6xl mx-auto bg-purple-500 text-white text-lg font-bold text-center py-1 rounded-b-xl mt-24 mt-[0px]">
                    This is Mock Test
                </div>
            </div>
        </>
    );
}
