import React, { useState, useEffect, useRef } from 'react';
import './FlipTimer.css';

const getTimeLeft = (targetTime) => {
    const totalSeconds = Math.max(0, Math.floor((targetTime - new Date()) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
};

const FlipDigit = ({ digit, prevDigit }) => {
    const [flipping, setFlipping] = useState(false);

    useEffect(() => {
        if (digit !== prevDigit) {
            setFlipping(true);
            const timeout = setTimeout(() => setFlipping(false), 600); // match flip duration
            return () => clearTimeout(timeout);
        }
    }, [digit, prevDigit]);

    return (
        <div className="flip-card bg-gradient-to-br from-[#5F00F5] to-[#A344F6] w-12 h-16 sm:w-14 sm:h-20 rounded text-white text-3xl sm:text-4xl font-bold shadow-md">
            <div className={`flip-card-inner ${flipping ? 'flipping' : ''}`}>
                <div className="flip-card-front">{digit}</div>
                <div className="flip-card-back">{prevDigit}</div>
            </div>
        </div>
    );
};

const FlipUnit = ({ label, value, prevValue }) => {
    const padded = String(value).padStart(2, '0').slice(-2).split('');
    const prevPadded = String(prevValue).padStart(2, '0').slice(-2).split('');

    return (
        <div className="flex flex-col items-center mx-1 sm:mx-2">
            <div className="flex space-x-1">
                {padded.map((digit, index) => (
                    <FlipDigit key={index} digit={digit} prevDigit={prevPadded[index]} />
                ))}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase text-[#5F00F5] tracking-wide">
                {label}
            </div>
        </div>
    );
};

const FlipTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(new Date(targetDate)));
    const prevTimeRef = useRef(timeLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            prevTimeRef.current = timeLeft;
            setTimeLeft(getTimeLeft(new Date(targetDate)));
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate, timeLeft]);

    return (
        <div className="w-full flex items-center justify-end">
            <div className="flex bg-white px-4 py-2 sm:px-6 sm:py-4 rounded-xl shadow-xl space-x-6">
                <FlipUnit label="Minutes" value={timeLeft.minutes} prevValue={prevTimeRef.current.minutes} />
                <FlipUnit label="Seconds" value={timeLeft.seconds} prevValue={prevTimeRef.current.seconds} />
            </div>
        </div>
    );
};

export default FlipTimer;
