import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const HeaderVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

function LeaderboardHeader() {
    return (
        <div className="flex justify-between items-center mb-8"> {/* Added mb-8 for spacing below the header */}
            <motion.h3
                className="text-3xl font-extrabold text-gray-800 flex items-center"
                variants={HeaderVariants}
                initial="hidden"
                animate="visible"
            >
                <Trophy className="mr-3 h-8 w-8 text-yellow-600" /> Leaderboard
            </motion.h3>
            <div className="relative"> 
                <select className="
                    appearance-none /* Hide default arrow */
                    pr-10 /* Add padding for custom arrow */
                    bg-white
                    border border-gray-300
                    rounded-xl
                    px-5 py-2.5 /* Slightly more padding */
                    text-base text-gray-700 /* Slightly larger text */
                    font-medium /* Make text a bit bolder */
                    focus:outline-none
                    focus:ring-2 focus:ring-yellow-500
                    focus:border-yellow-500 /* Add border color on focus */
                    shadow-md /* More pronounced shadow */
                    hover:border-gray-400 /* Subtle hover effect */
                    cursor-pointer
                ">
                    <option>Practice Tests</option>
                    <option>Mock</option>
                </select>
                <div className="
                    pointer-events-none /* Make div ignore pointer events so select is clickable */
                    absolute inset-y-0 right-0 flex items-center px-2
                    text-gray-700
                ">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardHeader;