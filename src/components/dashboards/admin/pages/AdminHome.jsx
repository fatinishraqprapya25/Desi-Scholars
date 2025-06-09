import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import { Users, BookOpen, Package, DollarSign, LayoutDashboard } from "lucide-react";

// Import the new components
import PageHeader from '../../common/PageHeader';
import SummaryCardsGrid from '../home/SummeryCardsGrid';
import MonthlyEarningsChart from '../home/MonthlyEarningsCart';
import RecentActivitiesSection from '../home/RecentActivitiesSection';

const summaryData = [
    {
        id: 'total-users',
        title: 'Total Users',
        value: '1,250', // Example value
        icon: Users, // Lucide React icon component
        bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
        textColor: 'text-blue-800'
    },
    {
        id: 'total-courses',
        title: 'Total Courses',
        value: '75', // Example value
        icon: BookOpen,
        bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
        textColor: 'text-green-800'
    },
    {
        id: 'total-orders',
        title: 'Total Orders',
        value: '340', // Example value
        icon: Package,
        bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
        textColor: 'text-yellow-800'
    },
    {
        id: 'total-earnings',
        title: 'Total Earnings',
        value: '$12,500', // Example value
        icon: DollarSign,
        bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
        textColor: 'text-purple-800'
    },
];

const monthlyEarningsData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: 4500 },
    { name: 'May', earnings: 6000 },
    { name: 'Jun', earnings: 7500 }, // Current month, slightly higher for the "lucrative" feel
];

function AdminHome() {
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
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-6 md:p-8 lg:p-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Admin Dashboard Header */}
                <PageHeader
                    icon={<LayoutDashboard className="mr-3 h-8 w-8 text-indigo-600" />}
                    title="Admin Dashboard Overview"
                />
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                    Welcome back, Administrator! Here's a quick summary of your platform's performance and key metrics.
                </p>

                {/* Summary Cards Grid */}
                <SummaryCardsGrid summaryData={summaryData} />

                {/* Monthly Earnings Chart */}
                <MonthlyEarningsChart data={monthlyEarningsData} />

                {/* Recent Activities Section */}
                <RecentActivitiesSection />
            </motion.div>
        </UserDashboardContainer>
    );
}

export default AdminHome;