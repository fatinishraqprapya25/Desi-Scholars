import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';

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

const getRankColor = (rank) => {
    switch (rank) {
        case 1: return 'text-yellow-600'; // Gold
        case 2: return 'text-gray-500'; // Silver
        case 3: return 'text-amber-700'; // Bronze
        default: return 'text-gray-500';
    }
};

const getRankBgColor = (rank) => {
    switch (rank) {
        case 1: return 'bg-yellow-50';
        case 2: return 'bg-gray-100';
        case 3: return 'bg-amber-50';
        default: return 'bg-white';
    }
};

function TopAchieverCard({ student, index }) {
    return (
        <motion.div
            key={student.id}
            className={`p-6 rounded-md shadow-md border-2
                        ${getRankBgColor(student.rank)}
                        flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300
                        ${student.rank === 1 ? 'border-yellow-300' : student.rank === 2 ? 'border-gray-300' : student.rank === 3 ? 'border-amber-300' : ''}`}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
        >
            {student.rank === 1 && <Crown className="h-10 w-10 text-yellow-500 fill-yellow-500 mb-3" />}
            {student.rank === 2 && <Trophy className="h-10 w-10 text-gray-400 fill-gray-400 mb-3" />}
            {student.rank === 3 && <Trophy className="h-10 w-10 text-amber-600 fill-amber-600 mb-3" />}
            <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow-md" />
            <p className="text-2xl font-bold text-gray-900 mb-1">{student.name}</p>
            <p className={`text-xl font-semibold ${getRankColor(student.rank)} mb-2`}>Rank {student.rank}</p>
            <p className="text-xl font-bold text-blue-700">{student.score} points</p>
        </motion.div>
    );
}

export default TopAchieverCard;