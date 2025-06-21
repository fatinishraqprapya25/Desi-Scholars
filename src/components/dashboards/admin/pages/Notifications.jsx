import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, Lightbulb, Plus } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import BroadcastCard from '../notifications/BroadCastCard';
import { useNavigate } from 'react-router-dom';

export default function ManageBroadcastsPage() {
    const [broadcasts, setBroadcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const adminToken = localStorage.getItem('ASDFDKFFJF');

    useEffect(() => {
        const fetchBroadcasts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/broadcasts', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const result = await res.json();
                if (res.ok && result.success) {
                    setBroadcasts(result.data);
                } else {
                    console.error(result.message || 'Failed to fetch broadcasts');
                }
            } catch (err) {
                console.error('Error fetching broadcasts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBroadcasts();
    }, []);

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    const handleEditBroadcast = (broadcastId) => {
        navigate(`/admin/edit-broadcast/${broadcastId}`);
    };

    const handleCreateBroadcast = () => {
        navigate('/admin/create-broadcast');
    };

    return (
        <UserDashboardContainer role="admin">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
                        <BellRing className="mr-2 text-indigo-600" /> Manage Broadcasts
                    </h2>
                    <button
                        onClick={handleCreateBroadcast}
                        className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Create Broadcast
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 mt-10">Loading broadcasts...</div>
                ) : broadcasts.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
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
                            {broadcasts.map((broadcast) => (
                                <BroadcastCard
                                    key={broadcast._id}
                                    broadcast={{
                                        id: broadcast._id,
                                        title: broadcast.title,
                                        message: broadcast.description,
                                        sender: 'Admin',
                                        sendDate: new Date(broadcast.createdAt).toLocaleDateString(),
                                        status: 'Sent',
                                    }}
                                    onEditBroadcast={handleEditBroadcast}
                                    cardVariants={cardVariants}
                                    getStatusBadge={(status) => 'bg-green-100 text-green-800'}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-10 text-gray-500 mt-6">
                        <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No broadcasts found</h3>
                        <p className="mt-1 text-sm text-gray-500">Click "Create Broadcast" to send your first one.</p>
                    </div>
                )}
            </motion.div>
        </UserDashboardContainer>
    );
}
