import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BellRing, PlusCircle, Search, Edit, Calendar, User, MessageSquare, Send, Lightbulb, Hash
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';


// Mock data for broadcasts and notifications
const broadcastsData = [
    {
        id: 'BR-001',
        title: 'System Maintenance Alert',
        message: 'Scheduled system maintenance will occur on 2025-07-10 from 2:00 AM to 4:00 AM UTC. Expect brief service interruptions.',
        sender: 'Admin Team',
        sendDate: '2025-07-01',
        status: 'Scheduled'
    },
    {
        id: 'BR-002',
        title: 'New Course Release: AI Ethics',
        message: 'Exciting news! Our new course "AI Ethics and Society" is now available. Enroll today to explore critical topics.',
        sender: 'Course Management',
        sendDate: '2025-06-28',
        status: 'Sent'
    },
    {
        id: 'BR-003',
        title: 'Platform Update: New Features',
        message: 'We\'ve rolled out new features including enhanced analytics and a redesigned dashboard. Check out the release notes!',
        sender: 'Product Team',
        sendDate: '2025-06-25',
        status: 'Sent'
    },
    {
        id: 'BR-004',
        title: 'Urgent Security Patch',
        message: 'An urgent security patch has been deployed to address a critical vulnerability. No user action is required.',
        sender: 'Security Team',
        sendDate: '2025-06-20',
        status: 'Sent'
    },
    {
        id: 'BR-005',
        title: 'Community Forum Guidelines',
        message: 'Please review the updated community forum guidelines to ensure a positive and respectful environment for all users.',
        sender: 'Community Moderation',
        sendDate: '2025-06-15',
        status: 'Draft'
    },
];

export default function ManageBroadcastsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const accentPurple = '#8A4AF8'; // Define the accent color for consistency

    // Framer Motion variants (reused from previous pages)
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    // Filtering logic for broadcasts
    const filteredBroadcasts = useMemo(() => {
        let processedBroadcasts = [...broadcastsData];

        if (searchTerm) {
            processedBroadcasts = processedBroadcasts.filter(broadcast =>
                broadcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                broadcast.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                broadcast.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                broadcast.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processedBroadcasts;
    }, [searchTerm, broadcastsData]);

    // Handlers for broadcast actions
    const handleCreateBroadcast = () => {
        alert('Prompt to create a new broadcast or notification (e.g., open a form modal)!');
    };

    const handleEditBroadcast = (broadcastId) => {
        alert(`Edit broadcast with ID: ${broadcastId}`);
    };

    // Function to get status badge styling for broadcasts
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Sent':
                return 'bg-green-100 text-green-800';
            case 'Scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'Draft':
                return 'bg-orange-100 text-orange-800';
            case 'Archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <BellRing className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Manage Broadcasts & Notifications
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Centralized management for all platform-wide broadcasts and user notifications. Easily search, create, and update messages.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Top Controls: Search and Add Broadcast */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <div className="relative flex-grow w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search broadcasts..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <button
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                            onClick={handleCreateBroadcast}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Create New Broadcast
                        </button>
                    </div>

                    {/* Broadcast Cards Grid */}
                    {filteredBroadcasts.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <AnimatePresence>
                                {filteredBroadcasts.map((broadcast) => (
                                    <motion.div
                                        key={broadcast.id}
                                        className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
                                        variants={cardVariants}
                                        layout // Enables smooth layout transitions for reordering/filtering
                                    >
                                        {/* Decorative top border */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

                                        {/* Broadcast ID and Status Badge */}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Hash className="w-3.5 h-3.5 mr-1 text-gray-400" /> ID: <span className="font-medium ml-0.5">{broadcast.id}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(broadcast.status)}`}>
                                                {broadcast.status}
                                            </span>
                                        </div>

                                        {/* Broadcast Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                            {broadcast.title}
                                        </h3>

                                        {/* Message/Description */}
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={broadcast.message}>
                                            {broadcast.message}
                                        </p>

                                        {/* Sender and Date */}
                                        <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                                            <div className="flex items-center"><Send className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> {broadcast.sender}</div>
                                            <div className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Date: {broadcast.sendDate}</div>
                                        </div>

                                        {/* Action Button: Edit Broadcast */}
                                        <div className="flex justify-end pt-2">
                                            <button
                                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                                                onClick={() => handleEditBroadcast(broadcast.id)}
                                                title="Edit Broadcast"
                                            >
                                                <Edit className="h-4 w-4 mr-2" /> Edit Broadcast
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 text-base">
                            <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No broadcasts found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Adjust your search or create a new broadcast!
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}
