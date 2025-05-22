import { useEffect, useState } from "react";

const CountdownTimer = () => {
    const totalSeconds = 11 * 24 * 60 * 60 + 5 * 60 * 60 + 20 * 60 + 50;
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const days = Math.floor(secondsLeft / (24 * 60 * 60));
    const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
    const seconds = secondsLeft % 60;

    return (
        <section className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-10 md:mb-0">
                    Webinar Starts In
                </h2>

                <div className="flex flex-wrap gap-6 justify-center md:justify-end w-full md:w-auto">
                    {[
                        { label: "Days", value: days },
                        { label: "Hours", value: hours },
                        { label: "Minutes", value: minutes },
                        { label: "Seconds", value: seconds }
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-xl px-8 py-6 min-w-[100px] backdrop-blur-sm bg-opacity-90"
                        >
                            <span className="text-white text-6xl font-extrabold leading-none">
                                {value.toString().padStart(2, "0")}
                            </span>
                            <span className="text-purple-300 uppercase text-xs tracking-widest mt-2 select-none">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CountdownTimer;
