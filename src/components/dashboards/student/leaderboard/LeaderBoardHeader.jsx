import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const HeaderVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

function LeaderboardHeader() {
    return (
        <motion.h3
            className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center"
            variants={HeaderVariants}
            initial="hidden"
            animate="visible"
        >
            <Trophy className="mr-3 h-8 w-8 text-yellow-600" /> Leaderboard
        </motion.h3>
    );
}

export default LeaderboardHeader;