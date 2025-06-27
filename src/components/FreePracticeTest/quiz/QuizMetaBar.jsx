import { ChevronDown } from "lucide-react";

export default function QuizMetabar() {
    return (
        <div className="max-w-6xl noto mx-auto text-white px-6 py-1 rounded-b-3xl flex items-center justify-between" style={{ backgroundColor: "oklch(0.5 0.19 304.98)" }}>
            {/* Info grid */}
            <div className="grid grid-cols-5 gap-6 text-sm w-full max-w-5xl">
                <div>
                    <p className="text-gray-200 uppercase text-xs tracking-wide">Question ID</p>
                    <p className="font-medium">#5b4829d2</p>
                </div>
                <div>
                    <p className="text-gray-200 uppercase text-xs tracking-wide">Domain</p>
                    <p className="font-medium">Information and Ideas</p>
                </div>
                <div>
                    <p className="text-gray-200 uppercase text-xs tracking-wide">Skill</p>
                    <p className="font-medium">Inferences</p>
                </div>
                <div>
                    <p className="text-gray-200 uppercase text-xs tracking-wide">Difficulty</p>
                    <p className="font-medium">E</p>
                </div>
                <div>
                    <p className="text-gray-200 uppercase text-xs tracking-wide">Score Band</p>
                    <p className="font-medium">1</p>
                </div>
            </div>

            {/* Dropdown button */}
            <button className="ml-6 flex items-center gap-1 border border-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 transition">
                Chronological <ChevronDown size={16} />
            </button>
        </div>
    );
}
