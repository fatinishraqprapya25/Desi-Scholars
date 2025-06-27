import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import LeaderboardHeader from '../leaderboard/LeaderBoardHeader';
import CurrentUserRankCard from '../leaderboard/CurrentUserRankCard';
import TopAchieversSection from '../leaderboard/TopArcieversSection';
import FullLeaderboardTable from '../leaderboard/FullLeaderBoardTable';
import ViewFullLeaderboardButton from '../leaderboard/ViewFullLeaderBoardButton';
import { useEffect, useState } from 'react';
import validateToken from "../../../../utils/ValidateToken";
import StudentLeaderboardSummary from '../leaderboard/LeaderboardSummery';

function LeaderBoard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState({});

    const fetchLeaderboardData = async () => {
        const response = await fetch("http://localhost:5000/api/leaderboard-test");
        const result = await response.json();
        setLeaderboardData(result.data);
    }

    const fetchRank = async () => {
        const checkUser = await validateToken();
        const response = await fetch(`http://localhost:5000/api/leaderboard-test/${checkUser.id}`);
        const result = await response.json();
        setUserRank(result.data);
    }

    useEffect(() => {
        fetchLeaderboardData();
        fetchRank();
    }, []);

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
                className="mb-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <LeaderboardHeader />

                {/* Your Rank Card */}
                <CurrentUserRankCard userRank={userRank} />

                <StudentLeaderboardSummary />

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