import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function StartTestButton({ id }) {
    return (
        <Link to={`/practi${id}`}>
            <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg
                       hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                       flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95 mt-[-5px]"
            >
                <PlayCircle className="mr-2 h-5 w-5" /> Start Test
            </button></Link>
    );
}

export default StartTestButton;