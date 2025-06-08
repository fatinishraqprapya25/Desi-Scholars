import { PlayCircle } from 'lucide-react';

function StartTestButton() {
    return (
        <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg
                       hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                       flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95 mt-auto"
        >
            <PlayCircle className="mr-2 h-5 w-5" /> Start Test
        </button>
    );
}

export default StartTestButton;