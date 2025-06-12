import { motion } from 'framer-motion';
import { Inbox, CornerUpRight } from 'lucide-react';
import MessageCard from './MessageCard';

function MessageList({ messages, type }) {
    const listVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1, // Staggers children by 0.1 seconds.
            },
        },
    };

    return (
        <motion.div
            className="bg-white p-6 rounded-md shadow-md border border-gray-100"
            variants={listVariants}
            initial="hidden" // Starts hidden.
            animate="visible" // Animates to visible on mount.
        >
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                {/* Renders different icons based on message type (received/sent). */}
                {type === 'received' ? (
                    <Inbox className="mr-2 h-6 w-6 text-teal-600" />
                ) : (
                    <CornerUpRight className="mr-2 h-6 w-6 text-purple-600" />
                )}
                {/* Dynamically sets the section title. */}
                {type === 'received' ? 'Inbox' : 'Sent Messages'}
            </h4>
            {messages.length > 0 ? ( // Renders messages if available.
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <MessageCard key={msg.id} message={msg} /> // Renders each message using MessageCard.
                    ))}
                </div>
            ) : ( // Displays a message if no messages are found.
                <p className="text-gray-600 text-center py-8">No {type} messages yet.</p>
            )}
        </motion.div>
    );
}

export default MessageList;