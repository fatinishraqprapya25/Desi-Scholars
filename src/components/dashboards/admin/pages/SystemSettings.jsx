import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Cog, Info, Activity, CheckCircle, XCircle, Clock, Database, Lightbulb
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function SystemPage() {
    const [systemInfo, setSystemInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching system information from an API
        const fetchSystemInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                setTimeout(() => {
                    const dummyData = {
                        version: 'LMS v2.1.0',
                        uptime: '15 days, 8 hours, 32 minutes',
                        status: {
                            database: 'Operational',
                            apiService: 'Operational',
                            notificationService: 'Operational',
                            fileStorage: 'Degraded (low disk space)',
                        },
                        lastUpdate: '2025-06-01 10:30 AM',
                        totalUsers: 5123,
                        activeCourses: 128,
                        storageUsed: '85%',
                        logsEnabled: true,
                        environment: 'Production',
                        serverLocation: 'East US 2',
                        buildHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
                    };
                    setSystemInfo(dummyData);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Failed to fetch system info:", err);
                setError("Failed to load system information. Please try again later.");
                setLoading(false);
            }
        };

        fetchSystemInfo();
    }, []);

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Operational':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'Degraded (low disk space)':
                return <XCircle className="h-5 w-5 text-yellow-500" />;
            case 'Maintenance':
                return <Clock className="h-5 w-5 text-blue-500" />;
            default:
                return <Info className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <UserDashboardContainer role={"admin"}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <Cog className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> System Overview
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    View critical information and real-time status of your LMS system.
                </p>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-blue-100 text-blue-800 rounded-lg flex items-center text-sm mb-6"
                    >
                        <Lightbulb className="h-4 w-4 mr-2" /> Loading system information...
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-100 text-red-800 rounded-lg flex items-center text-sm mb-6"
                    >
                        <XCircle className="h-4 w-4 mr-2" /> {error}
                    </motion.div>
                )}

                {systemInfo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                                <Info className="h-5 w-5 mr-2 text-blue-600" /> General Info
                            </h3>
                            <div className="space-y-2 text-gray-700 text-sm">
                                <p><span className="font-medium">Version:</span> {systemInfo.version}</p>
                                <p><span className="font-medium">Environment:</span> {systemInfo.environment}</p>
                                <p><span className="font-medium">Uptime:</span> {systemInfo.uptime}</p>
                                <p><span className="font-medium">Last Update:</span> {systemInfo.lastUpdate}</p>
                                <p><span className="font-medium">Server Location:</span> {systemInfo.serverLocation}</p>
                                <p><span className="font-medium">Build Hash:</span> {systemInfo.buildHash}</p>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                                <Activity className="h-5 w-5 mr-2 text-purple-600" /> Service Status
                            </h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                {Object.entries(systemInfo.status).map(([service, status]) => (
                                    <li key={service} className="flex items-center justify-between">
                                        <span className="font-medium">{service.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                        <span className="flex items-center gap-1">
                                            {getStatusIcon(status)} {status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                                <Database className="h-5 w-5 mr-2 text-green-600" /> Resource Usage
                            </h3>
                            <div className="space-y-2 text-gray-700 text-sm">
                                <p><span className="font-medium">Total Users:</span> {systemInfo.totalUsers}</p>
                                <p><span className="font-medium">Active Courses:</span> {systemInfo.activeCourses}</p>
                                <p><span className="font-medium">Storage Used:</span> {systemInfo.storageUsed}</p>
                                <p className="flex items-center"><span className="font-medium">Logs Enabled:</span> {systemInfo.logsEnabled ? <CheckCircle className="h-4 w-4 ml-2 text-green-500" /> : <XCircle className="h-4 w-4 ml-2 text-red-500" />}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </UserDashboardContainer>
    );
}
