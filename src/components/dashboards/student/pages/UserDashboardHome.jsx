import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import WelcomeBanner from '../home/WelcomeBanner';
import KeyMetrics from '../home/KeyMetrics';
import UpcomingEvents from '../home/UpcomingEvents';
import LatestAnnouncements from '../home/Announcements';
import QuickActions from '../home/QuickActions';
import RecommendedCourses from '../home/RecommendedCourses';

export default function UserDashboardHome({ activeSection }) {
    return (
        <UserDashboardContainer>
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full"
            >


                <>
                    <WelcomeBanner userName="Alex" />
                    <KeyMetrics />

                    <div className="">
                        {/* <UpcomingEvents /> */}
                        <LatestAnnouncements />
                    </div>

                    <QuickActions />
                    <RecommendedCourses />
                </>

            </motion.div>
        </UserDashboardContainer>
    );
}
