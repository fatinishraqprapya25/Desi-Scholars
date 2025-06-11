import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, Lightbulb } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import BroadcastControls from '../notifications/BroadCastControlls';
import BroadcastCard from '../notifications/BroadCastCard';

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

    // Framer Motion variants
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

    // Filtering logic for broadcasts (memoized for performance)
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
    }, [searchTerm]);
    const handleCreateBroadcast = () => {
        alert('Action: Open a form or modal to create a new broadcast!');
    };

    const handleEditBroadcast = (broadcastId) => {
        alert(`Action: Edit broadcast with ID: ${broadcastId}. You would typically navigate to an edit page.`);
    };

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

                {/* Broadcast Controls Component */}
                <BroadcastControls
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onCreateBroadcast={handleCreateBroadcast}
                    itemVariants={itemVariants}
                />

                {/* Broadcast Cards Grid */}
                {filteredBroadcasts.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6"
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
                                <BroadcastCard
                                    key={broadcast.id}
                                    broadcast={broadcast}
                                    onEditBroadcast={handleEditBroadcast}
                                    cardVariants={cardVariants}
                                    getStatusBadge={getStatusBadge}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-10 text-gray-500 text-base mt-6">
                        <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No broadcasts found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Adjust your search or create a new broadcast!
                        </p>
                    </div>
                )}
            </motion.div>
        </UserDashboardContainer>
    );
}