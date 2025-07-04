import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import { Users, BookOpen, Package, DollarSign, LayoutDashboard } from "lucide-react";

// Import the new components
import PageHeader from '../../common/PageHeader';
import SummaryCardsGrid from '../home/SummeryCardsGrid';
import MonthlyEarningsChart from '../home/MonthlyEarningsCart';
import RecentActivitiesSection from '../home/RecentActivitiesSection';
import { useEffect, useState } from 'react';

const monthlyEarningsData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: 4500 },
    { name: 'May', earnings: 6000 },
    { name: 'Jun', earnings: 7500 },
];

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

function AdminHome() {
    const [adminDetails, setAdminDetails] = useState({});
    const [coursesCount, setCoursesCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const summaryData = [
        {
            id: 'total-users',
            title: 'Total Users',
            value: usersCount,
            icon: Users,
            bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
            textColor: 'text-blue-800'
        },
        {
            id: 'total-courses',
            title: "Total Courses",
            value: coursesCount,
            icon: BookOpen,
            bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
            textColor: 'text-green-800'
        },
        {
            id: 'total-orders',
            title: 'Total Orders',
            value: ordersCount, // Example value
            icon: Package,
            bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
            textColor: 'text-yellow-800'
        },
        {
            id: 'total-earnings',
            title: 'Total Earnings',
            value: totalAmount, // Example value
            icon: DollarSign,
            bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
            textColor: 'text-purple-800'
        },
    ];

    const fetchAdminInfo = async () => {
        const response = await fetch("http://localhost:5000/api/admin/validate-admin", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${adminToken}`
            }
        });
        const result = await response.json();
        if (result.success) {
            setAdminDetails(result.data);
        } else {
            alert(result.message)
        }
    }

    const fetchCoursesCount = async () => {
        const response = await fetch("http://localhost:5000/api/courses");
        const result = await response.json();
        if (result.success) {
            setCoursesCount(result.data.length);
        }
    };

    const fetchUsersCount = async () => {
        const response = await fetch("http://localhost:5000/api/auth", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${adminToken}`
            }
        });
        const result = await response.json();
        if (result.success) {
            setUsersCount(result.data.length);
        }
    }

    const fetchOrdersCount = async () => {
        const response = await fetch("http://localhost:5000/api/payments/status/approved", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${adminToken}`
            }
        });
        const result = await response.json();
        if (result.success) {
            setOrdersCount(result.data.length);
            let totalRevenue = 0;
            result.data.map(sell => {
                totalRevenue += sell.amount;
            });
            setTotalAmount(totalRevenue);
        }
    }

    useEffect(() => {
        fetchCoursesCount();
        fetchAdminInfo();
        fetchUsersCount();
        fetchOrdersCount();
    }, []);



    return (
        <UserDashboardContainer role={"admin"}>
            <motion.div
                className="p-4 md:p-6 lg:p-8 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className='text-2xl pb-3 font-bold '>Welcome, {adminDetails.name}!</h1>
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
                <MonthlyEarningsChart />

                {/* Recent Activities Section */}
                <RecentActivitiesSection />
            </motion.div>
        </UserDashboardContainer>
    );
}

export default AdminHome;