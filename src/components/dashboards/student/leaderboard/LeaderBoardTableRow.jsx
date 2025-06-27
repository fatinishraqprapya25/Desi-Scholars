import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

const placeholderImage = "https://placehold.co/40x40/E0F2F7/2196F3?text=AJ";
const getRankColor = (rank) => {
    switch (rank) {
        case 1: return 'text-yellow-600';
        case 2: return 'text-gray-500';
        case 3: return 'text-amber-700';
        default: return 'text-gray-500';
    }
};

function LeaderboardTableRow({ id, student, index }) {
    return (
        <motion.tr
            key={id}
            className="hover:bg-blue-50 transition-colors duration-200"
            variants={rowVariants}
            transition={{ delay: index * 0.05 }}
        >
            <td className="py-4 px-6 text-left text-sm font-medium text-gray-800 whitespace-nowrap">
                <span className={`flex items-center font-bold ${getRankColor(student.rank)}`}>
                    {(index + 1) === 1 && <Crown className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />}
                    {(index + 1) === 2 && <Trophy className="h-5 w-5 mr-2 text-gray-400 fill-gray-400" />}
                    {(index + 1) === 3 && <Trophy className="h-5 w-5 mr-2 text-amber-600 fill-amber-600" />}
                    {(index + 1) > 3 && <span className="mr-2 text-gray-500">#</span>}
                    {(index + 1)}
                </span>
            </td>
            <td className="py-4 px-6 text-left text-sm font-medium text-gray-800 whitespace-nowrap">
                <div className="flex items-center">
                    <img src={placeholderImage} alt={student.name} className="w-8 h-8 rounded-full mr-3 border border-gray-200" />
                    <span>{student.name}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-left text-sm font-medium text-gray-800 whitespace-nowrap">
                <div className="flex items-center">
                    <span>{student.averageTime}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-left text-lg font-bold text-blue-700">{student.totalScore}</td>
        </motion.tr>
    );
}

export default LeaderboardTableRow;