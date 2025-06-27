import { useState } from "react";
import { ChevronUp, ChevronDown, BookOpen, Bot } from "lucide-react";
import QuizMetabar from "./QuizMetaBar";

export default function Header() {
    const [infoOpen, setInfoOpen] = useState(true);

    return (
        <>
            <div className="bg-purple-50 px-4 py-3 flex items-center justify-between custom-dashed-border">
                {/* Left Section */}
                <div className="">
                    <h1 className="text-xl font-semibold text-gray-800">Reading and Writing</h1>
                    <button
                        onClick={() => setInfoOpen(!infoOpen)}
                        className="text-sm text-gray-600 flex items-center gap-1 mt-1 cursor-pointer"
                    >
                        Information {infoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>

                {/* Middle Section */}
                <div className="">
                    <div className="text-2xl font-bold text-gray-900">1:09</div>
                    <button className="border border-gray-400 px-2 rounded-full text-[13px] hover:bg-gray-100">
                        Hide
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    <button className="w-20 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer">
                        <Bot size={18} />
                        <span className="ps-1">Hint</span>
                    </button>
                    <button className="w-32 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer">
                        <BookOpen size={18} />
                        <span className="ps-1">Dictionary</span>
                    </button>
                </div>
            </div>

            <QuizMetabar />
        </>
    );
}
