import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, Package, LayoutDashboard, Activity, TrendingUp } from 'lucide-react'; // Import relevant icons, added TrendingUp
import UserDashboardContainer from '../common/UserDashboardContainer'; // Ensure the path is correct

// Import Recharts components
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function AdminHome() {
    // Mock data for summary cards - replace with actual data from your backend
    const summaryData = [
        {
            id: 'total-users',
            title: 'Total Users',
            value: '1,250', // Example value
            icon: Users,
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
            icon: Package, // Using Package for orders
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

    // Mock data for the chart - replace with actual dynamic data
    const monthlyEarningsData = [
        { name: 'Jan', earnings: 4000 },
        { name: 'Feb', earnings: 3000 },
        { name: 'Mar', earnings: 5000 },
        { name: 'Apr', earnings: 4500 },
        { name: 'May', earnings: 6000 },
        { name: 'Jun', earnings: 7500 }, // Current month, slightly higher for the "lucrative" feel
    ];

    // Animation variants for the section and cards
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

    const chartVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 10,
                delay: 0.3 // A slight delay after summary cards
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
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
                    <LayoutDashboard className="mr-3 h-8 w-8 text-indigo-600" /> Admin Dashboard Overview
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                    Welcome back, Administrator! Here's a quick summary of your platform's performance and key metrics.
                </p>

                {/* Summary Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                    variants={sectionVariants} // Uses sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {summaryData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`relative p-6 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${item.bgColor}`}
                            variants={cardVariants}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative z-10 flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-semibold text-white`}>{item.title}</h3>
                                <item.icon className={`h-8 w-8 text-white opacity-80`} /> {/* Render icon component */}
                            </div>
                            <p className={`text-4xl font-bold text-white leading-tight`}>{item.value}</p>
                            <p className="text-sm text-white opacity-80 mt-2">View details &rarr;</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Monthly Earnings Chart */}
                <motion.section
                    className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-100"
                    variants={chartVariants} // Apply chart specific animation
                    initial="hidden"
                    animate="visible"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="mr-2 h-6 w-6 text-purple-600" /> Monthly Earnings Trend
                    </h3>
                    <div className="w-full h-80"> {/* Set a fixed height for the chart */}
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={monthlyEarningsData}
                                margin={{
                                    top: 15, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    formatter={(value) => `$${value.toLocaleString()}`}
                                    labelFormatter={(label) => `Month: ${label}`}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                                    itemStyle={{ color: '#4CAF50' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                <Line
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#8884d8"
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                    name="Total Earnings"
                                    dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.section>

                {/* Recent Activities Section */}
                <section className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <Activity className="mr-2 h-6 w-6 text-indigo-500" /> Recent Activities
                    </h3>
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <ul className="divide-y divide-gray-200">
                            <li className="py-3 flex items-center justify-between">
                                <span className="text-gray-700">New user registered: <span className="font-semibold">Alice Johnson</span></span>
                                <span className="text-gray-500 text-sm">2 hours ago</span>
                            </li>
                            <li className="py-3 flex items-center justify-between">
                                <span className="text-gray-700">Course updated: <span className="font-semibold">React.js Advanced</span></span>
                                <span className="text-gray-500 text-sm">Yesterday</span>
                            </li>
                            <li className="py-3 flex items-center justify-between">
                                <span className="text-gray-700">New order placed: <span className="font-semibold">#ORD-2025001</span></span>
                                <span className="text-gray-500 text-sm">3 days ago</span>
                            </li>
                        </ul>
                        <button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors">
                            View All Activities
                        </button>
                    </div>
                </section>
            </motion.div>
        </UserDashboardContainer>
    );
}