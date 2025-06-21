import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, Lightbulb, Plus, Loader2 } from 'lucide-react'; // Added Loader2 for loading state
import UserDashboardContainer from '../../common/UserDashboardContainer';
import BroadcastCard from '../notifications/BroadCastCard';
import { useNavigate } from 'react-router-dom';

export default function ManageBroadcastsPage() {
    const [broadcasts, setBroadcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for handling fetch errors
    const navigate = useNavigate();

    const adminToken = localStorage.getItem('ASDFDKFFJF');

    useEffect(() => {
        const fetchBroadcasts = async () => {
            setLoading(true);
            setError(null); // Clear previous errors
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
                    const errorMessage = result.message || 'Failed to fetch broadcasts.';
                    console.error(errorMessage);
                    setError(errorMessage);
                }
            } catch (err) {
                console.error('Error fetching broadcasts:', err);
                setError('Network error or server is unreachable.');
            } finally {
                setLoading(false);
            }
        };

        if (adminToken) { // Only fetch if token exists
            fetchBroadcasts();
        } else {
            setLoading(false);
            setError('Authentication token not found. Please log in.');
            // Optionally redirect to login if token is missing
            // navigate('/admin/login');
        }
    }, [adminToken]); // Added adminToken to dependencies

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    const handleEditBroadcast = (broadcastId) => {
        navigate(`/admin/edit-broadcast/${broadcastId}`);
    };

    const handleCreateBroadcast = () => {
        navigate('/admin/notifications/create');
    };

    // Helper function to render status badges (can be moved to a utility or component)
    const getStatusBadge = (status) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        switch (status) {
            case 'Sent':
                bgColor = 'bg-green-100';
                textColor = 'text-green-800';
                break;
            case 'Draft':
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-800';
                break;
            case 'Failed':
                bgColor = 'bg-red-100';
                textColor = 'text-red-800';
                break;
            default:
                // For 'Scheduled' or other future statuses
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-800';
                break;
        }
        return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`;
    };

    return (
        <UserDashboardContainer role="admin">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center mb-3 sm:mb-0">
                        <BellRing className="mr-3 h-8 w-8 text-purple-600" /> All Broadcasts
                    </h2>
                    <button
                        onClick={handleCreateBroadcast}
                        className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg shadow-md
                                   hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                                   transition-all duration-200"
                    >
                        <Plus className="h-5 w-5 mr-2" /> Create New Broadcast
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Loader2 className="animate-spin h-10 w-10 text-purple-500 mb-4" />
                        <p className="text-lg">Loading broadcasts...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 px-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
                        <Lightbulb className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <h3 className="text-lg font-medium">Error loading broadcasts:</h3>
                        <p className="mt-1 text-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()} // Simple reload to re-attempt fetch
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Retry
                        </button>
                    </div>
                ) : broadcasts.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6"
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
                                        sender: 'Admin', // Assuming admin always sends
                                        sendDate: new Date(broadcast.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }),
                                        // Pass the 'for' field to the card
                                        forAudience: broadcast.for,
                                        status: 'Sent', // Assuming all fetched are "sent" for now
                                    }}
                                    onEditBroadcast={handleEditBroadcast}
                                    cardVariants={cardVariants}
                                    getStatusBadge={getStatusBadge} // Pass the helper function
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-20 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Lightbulb className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Broadcasts Yet</h3>
                        <p className="mt-2 text-base text-gray-600 max-w-md mx-auto">
                            It looks like you haven't sent any broadcasts. Click the button above to create your first message.
                        </p>
                        <button
                            onClick={handleCreateBroadcast}
                            className="mt-6 inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md
                                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                                       transition-all duration-200"
                        >
                            <Plus className="h-5 w-5 mr-2" /> Create Broadcast Now
                        </button>
                    </div>
                )}
            </motion.div>
        </UserDashboardContainer>
    );
}