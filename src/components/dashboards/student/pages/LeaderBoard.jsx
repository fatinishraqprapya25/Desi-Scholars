import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, User, Crown, Filter, ChevronsRight } from 'lucide-react'; // Added Filter and ChevronsRight
import UserDashboardContainer from '../../common/UserDashboardContainer';

function LeaderBoard() {
    // Mock data for leaderboard entries
    const leaderboardData = [
        { id: 1, name: 'Alice Johnson', score: 9850, rank: 1, avatar: 'https://placehold.co/40x40/E0F2F7/2196F3?text=AJ' },
        { id: 2, name: 'Bob Williams', score: 9520, rank: 2, avatar: 'https://placehold.co/40x40/E8F5E9/4CAF50?text=BW' },
        { id: 3, name: 'Charlie Brown', score: 9100, rank: 3, avatar: 'https://placehold.co/40x40/FFF3E0/FF9800?text=CB' },
        { id: 4, name: 'Diana Prince', score: 8870, rank: 4, avatar: 'https://placehold.co/40x40/FCE4EC/E91E63?text=DP' },
        { id: 5, name: 'Ethan Hunt', score: 8500, rank: 5, avatar: 'https://placehold.co/40x40/E3F2FD/2196F3?text=EH' },
        { id: 6, name: 'Fiona Green', score: 8230, rank: 6, avatar: 'https://placehold.co/40x40/F3E5F5/9C27B0?text=FG' },
        { id: 7, name: 'George White', score: 7990, rank: 7, avatar: 'https://placehold.co/40x40/ECEFF1/607D8B?text=GW' },
        { id: 8, name: 'Hannah Lee', score: 7800, rank: 8, avatar: 'https://placehold.co/40x40/F0F4C3/8BC34A?text=HL' },
        { id: 9, name: 'Ivan Petrov', score: 7650, rank: 9, avatar: 'https://placehold.co/40x40/CFD8DC/607D8B?text=IP' },
        { id: 10, name: 'Julia Roberts', score: 7500, rank: 10, avatar: 'https://placehold.co/40x40/FFEBEE/F44336?text=JR' },
    ];

    // Mock current user's rank (can be dynamic)
    const currentUserRank = { id: 11, name: 'You', score: 7200, rank: 11, avatar: 'https://placehold.co/40x40/D1C4E9/673AB7?text=ME' };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    };

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

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
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

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                    <Trophy className="mr-3 h-8 w-8 text-yellow-600" /> Leaderboard
                </h3>

                {/* Your Rank Card */}
                <motion.div
                    className="bg-white rounded-md shadow border border-blue-100 p-6 mb-10 flex items-center justify-between"
                    variants={cardVariants}
                >
                    <div className="flex items-center">
                        <img src={currentUserRank.avatar} alt="Your Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-blue-400" />
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Your Current Rank</p>
                            <p className="text-sm text-gray-600">Keep climbing!</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-blue-700">{currentUserRank.rank}</p>
                        <p className="text-lg font-semibold text-gray-700">{currentUserRank.score} points</p>
                    </div>
                </motion.div>

                {/* Top Achievers Section */}
                <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                    <Crown className="mr-3 h-8 w-8 text-yellow-500 fill-yellow-500" /> Top Achievers
                </h3>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                    variants={sectionVariants} // Use sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {leaderboardData.slice(0, 3).map((student, index) => (
                        <motion.div
                            key={student.id}
                            className={`p-6 rounded-md shadow-md border-2 ${getRankBgColor(student.rank)} // Changed shadow-md to shadow-md for lighter shadow
                                    flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300
                                    ${student.rank === 1 ? 'border-yellow-300' : student.rank === 2 ? 'border-gray-300' : student.rank === 3 ? 'border-amber-300' : ''}`} // Added specific border colors
                            variants={cardVariants} // Use cardVariants for individual card animation
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
                    ))}
                </motion.div>


                {/* Main Leaderboard Table */}
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
                                <motion.tr
                                    key={student.id}
                                    className="hover:bg-blue-50 transition-colors duration-200"
                                    variants={rowVariants}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <td className="py-4 px-6 text-left text-sm font-medium text-gray-800 whitespace-nowrap">
                                        <span className={`flex items-center font-bold ${getRankColor(student.rank)}`}>
                                            {student.rank === 1 && <Crown className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />}
                                            {student.rank === 2 && <Trophy className="h-5 w-5 mr-2 text-gray-400 fill-gray-400" />}
                                            {student.rank === 3 && <Trophy className="h-5 w-5 mr-2 text-amber-600 fill-amber-600" />}
                                            {student.rank > 3 && <span className="mr-2 text-gray-500">#</span>}
                                            {student.rank}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-left text-sm font-medium text-gray-800 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3 border border-gray-200" />
                                            <span>{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-left text-lg font-bold text-blue-700">{student.score}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* View Full Leaderboard Button */}
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
            </motion.section>
        </UserDashboardContainer>
    );
}

export default LeaderBoard;
