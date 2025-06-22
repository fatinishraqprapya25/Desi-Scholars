import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Brain, Droplet, PersonStanding, Hourglass } from 'lucide-react';
import FlipCountdown from './FlipCountDown';

const App = () => {
    const totalBreakTime = 10 * 60; // 10 minutes in seconds
    const [remainingTime, setRemainingTime] = useState(totalBreakTime);
    const [isBreakActive, setIsBreakActive] = useState(true);

    // Timer effect
    useEffect(() => {
        if (isBreakActive && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (remainingTime === 0) {
            setIsBreakActive(false);
        }
    }, [isBreakActive, remainingTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const calculateProgress = () => {
        return ((totalBreakTime - remainingTime) / totalBreakTime) * 100;
    };

    const handleSkipBreak = () => {
        setIsBreakActive(false);
        setRemainingTime(0);
        // In a real application, you would navigate to the next section or trigger a callback
        console.log("Break skipped. Continuing to the next section!");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 font-inter">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div>


                    <motion.div
                        className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 md:p-8 rounded-t-xl flex justify-between items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='min-w-1/2'>
                            <div className="flex items-center ">
                                <Coffee className="text-white mr-3" size={32} />
                                <h1 className="text-3xl md:text-4xl font-bold">10-Minute Break</h1>
                            </div>
                            <p className="text-lg md:text-xl opacity-90 mb-4">
                                You've completed the first half
                            </p>
                        </div>

                        <FlipCountdown targetDate="2025-12-31T23:59:59" />

                    </motion.div>



                </div>

                {/* Suggestions Section - Hardcoded */}
                <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
                    {/* Mental Reset Card */}
                    <motion.div
                        className="rounded-lg border-2 border-blue-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl bg-blue-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full bg-blue-100 mr-3">
                                <Brain className="text-blue-500" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-700">
                                Mental Reset
                            </h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.15 }}
                            >
                                Close your eyes for 30 seconds
                            </motion.li>
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.20 }}
                            >
                                Practice deep breathing
                            </motion.li>
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.25 }}
                            >
                                Clear your mind of test questions
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Physical Refresh Card */}
                    <motion.div
                        className="rounded-lg border-2 border-green-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl bg-green-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full bg-green-100 mr-3">
                                <Droplet className="text-green-500" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-green-700">
                                Physical Refresh
                            </h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.35 }}
                            >
                                Drink some water
                            </motion.li>
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.40 }}
                            >
                                Stretch your neck and shoulders
                            </motion.li>
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.45 }}
                            >
                                Rest your eyes from the screen
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Quick Movement Card */}
                    <motion.div
                        className="rounded-lg border-2 border-purple-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl bg-purple-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full bg-purple-100 mr-3">
                                <PersonStanding className="text-purple-500" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-purple-700">
                                Quick Movement
                            </h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.55 }}
                            >
                                Stand up and walk around
                            </motion.li>
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.60 }}
                            >
                                Shake out your hands and arms
                            </motion.li>
                            <motion.li
                                className="text-gray-700 text-base"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.65 }}
                            >
                                Roll your shoulders backward and forward
                            </motion.li>
                        </ul>
                    </motion.div>
                </div>

                {/* Coming Up Next Section */}
                <motion.div
                    className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-5 mx-6 md:mx-8 mb-6 md:mb-8 flex items-center shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Hourglass className="text-yellow-600 mr-4" size={28} />
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                            Coming Up Next: Math Section
                        </h3>
                        <p className="text-gray-700 text-base">
                            The Math section will begin automatically when the break ends. Make sure you're ready!
                        </p>
                    </div>
                </motion.div>

                {/* Skip Button */}
                <div className="p-6 md:p-8 pt-0 flex justify-center">
                    <motion.button
                        onClick={handleSkipBreak}
                        className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!isBreakActive}
                    >
                        <span className="text-xl">≫</span>
                        <span className="ml-3 text-lg">Skip Break & Continue</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default App;
