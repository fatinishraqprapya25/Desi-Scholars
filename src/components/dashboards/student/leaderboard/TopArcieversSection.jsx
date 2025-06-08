import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import TopAchieverCard from './TopArchieverCard';

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

function TopAchieversSection({ leaderboardData }) {
    return (
        <>
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <Crown className="mr-3 h-8 w-8 text-yellow-500 fill-yellow-500" /> Top Achievers
            </h3>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                {leaderboardData.slice(0, 3).map((student, index) => (
                    <TopAchieverCard key={student.id} student={student} index={index} />
                ))}
            </motion.div>
        </>
    );
}

export default TopAchieversSection;