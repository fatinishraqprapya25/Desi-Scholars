import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
        }
    }
};

function AchievementCard({ achievement }) {
    return (
        <motion.div
            className="bg-white rounded-md shadow-md border border-gray-100 p-6 flex flex-col items-center text-center
                       transform hover:scale-105 transition-all duration-300"
            variants={itemVariants}
        >
            <div className="mb-4">{achievement.icon}</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">{achievement.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            <p className="text-xs text-gray-500">Earned: {achievement.date}</p>
        </motion.div>
    );
}

export default AchievementCard;