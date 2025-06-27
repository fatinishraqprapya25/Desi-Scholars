import { useState } from "react";
import { ChevronUp, ChevronDown, Calculator } from "lucide-react";
import QuizMetabar from "./QuizMetaBar";
import { motion, AnimatePresence } from "framer-motion";
import CombinedCalculator from "../../../pages/CombinedCalculator";

export default function Header({ time, setShowMetaBar, showMetaBar, chapterName, moduleName }) {
    const [infoOpen, setInfoOpen] = useState(true);
    const [hideTime, setHideTime] = useState(false);
    const [showCal, setShowCal] = useState(false);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <>
            <div
                className="bg-purple-50 px-4 py-3 flex items-center justify-between noto"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 10,
                    borderTop: 'none',
                    borderBottom: '2px solid transparent',
                    borderImage: `repeating-linear-gradient(to right, currentColor 0, currentColor var(--custom-dash-pattern, 15px), transparent var(--custom-dash-pattern, 15px), transparent calc(var(--custom-dash-pattern, 15px) + var(--custom-gap-pattern, 7px))) 1`,
                    borderImageSlice: '0 0 1 0',
                    borderImageWidth: '0 0 2px 0',
                }}
            >
                {/* Left Section */}
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">{chapterName}</h1>
                    <button
                        onClick={() => {
                            setInfoOpen(!infoOpen)
                            setShowMetaBar(!showMetaBar);
                        }}
                        className="text-sm text-gray-600 flex items-center gap-1 mt-1 cursor-pointer"
                    >
                        Information {infoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>

                {/* Middle Section */}
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                        {hideTime ? "*:*" : formatTime(time)}
                    </div>
                    <button
                        onClick={() => {
                            setHideTime(!hideTime);
                            setShowMetaBar(!showMetaBar);
                        }}
                        className="border border-gray-400 px-2 rounded-full text-[13px] hover:bg-gray-100 mt-1"
                    >
                        Hide
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {moduleName === "Math" ? <>
                        <button onClick={() => setShowCal(!showCal)} className="w-35 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <Calculator size={18} />
                            <span className="ps-1">Calculator</span>
                        </button>
                    </> : <></>}
                </div>
            </div>

            <AnimatePresence>
                {showMetaBar && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: 'hidden' }}
                    >
                        <QuizMetabar />
                    </motion.div>
                )}
            </AnimatePresence>

            {showCal && <CombinedCalculator />}
        </>
    );
}
