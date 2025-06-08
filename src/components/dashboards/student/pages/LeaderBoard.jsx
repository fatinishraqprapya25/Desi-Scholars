import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import LeaderboardHeader from '../leaderboard/LeaderBoardHeader';
import CurrentUserRankCard from '../leaderboard/CurrentUserRankCard';
import TopAchieversSection from '../leaderboard/TopArcieversSection';
import FullLeaderboardTable from '../leaderboard/FullLeaderBoardTable';
import ViewFullLeaderboardButton from '../leaderboard/ViewFullLeaderBoardButton';

function LeaderBoard() {
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

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <LeaderboardHeader />

                {/* Your Rank Card */}
                <CurrentUserRankCard userRank={currentUserRank} />

                {/* Top Achievers Section */}
                <TopAchieversSection leaderboardData={leaderboardData} />

                {/* Main Leaderboard Table */}
                <FullLeaderboardTable leaderboardData={leaderboardData} />

                {/* View Full Leaderboard Button */}
                <ViewFullLeaderboardButton />
            </motion.section>
        </UserDashboardContainer>
    );
}

export default LeaderBoard;