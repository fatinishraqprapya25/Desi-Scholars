import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import LeaderboardTableRow from './LeaderBoardTableRow';

const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 12,
            delay: 0.2
        }
    }
};

function FullLeaderboardTable({ leaderboardData }) {
    return (
        <>
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <Award className="mr-3 h-8 w-8 text-blue-600" /> Full Leaderboard
            </h3>
            <motion.div
                className="overflow-x-auto bg-white rounded-md shadow-md border border-gray-100 p-6"
                variants={tableVariants}
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">Rank</th>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Student</th>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-xl">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leaderboardData.map((student, index) => (
                            <LeaderboardTableRow key={student.id} student={student} index={index} />
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </>
    );
}

export default FullLeaderboardTable;