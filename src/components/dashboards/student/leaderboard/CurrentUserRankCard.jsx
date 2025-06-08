import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        }
    }
};

function CurrentUserRankCard({ userRank }) {
    return (
        <motion.div
            className="bg-white rounded-md shadow border border-blue-100 p-6 mb-10 flex items-center justify-between"
            variants={cardVariants}
        >
            <div className="flex items-center">
                <img src={userRank.avatar} alt="Your Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-blue-400" />
                <div>
                    <p className="text-lg font-semibold text-gray-800">Your Current Rank</p>
                    <p className="text-sm text-gray-600">Keep climbing!</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-4xl font-bold text-blue-700">{userRank.rank}</p>
                <p className="text-lg font-semibold text-gray-700">{userRank.score} points</p>
            </div>
        </motion.div>
    );
}

export default CurrentUserRankCard;