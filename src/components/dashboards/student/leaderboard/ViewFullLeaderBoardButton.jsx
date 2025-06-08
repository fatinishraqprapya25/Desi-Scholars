import { ChevronsRight } from 'lucide-react';

function ViewFullLeaderboardButton() {
    return (
        <div className="mt-10 text-right">
            <button
                className="inline-flex bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-md shadow-lg
                           hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                           text-lg font-medium transform hover:scale-105 active:scale-95"
            >
                View Full Leaderboard
                <ChevronsRight className="ml-2 h-5 w-5" />
            </button>
        </div>
    );
}

export default ViewFullLeaderboardButton;