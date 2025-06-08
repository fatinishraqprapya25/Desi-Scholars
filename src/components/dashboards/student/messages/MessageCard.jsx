import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

function MessageCard({ message }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const formatTimestamp = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Animation variants for the individual message card.
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    return (
        <motion.div
            className={`bg-white rounded-md shadow border cursor-pointer
                        ${message.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50 font-semibold'}
                        overflow-hidden transition-all duration-300`}
            variants={cardVariants}
        >
            <div
                className="p-4 flex items-center justify-between"
                onClick={toggleOpen} // Toggles the message details on click.
            >
                <div className="flex-grow">
                    <p className={`text-sm ${message.read ? 'text-gray-600' : 'text-blue-700'}`}>
                        {message.type === 'received' ? `From: ${message.sender}` : `To: ${message.recipient}`}
                    </p>
                    <h5 className={`text-lg font-bold ${message.read ? 'text-gray-900' : 'text-blue-900'}`}>{message.subject}</h5>
                </div>
                <div className="text-right ml-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center justify-end">
                        <Clock className="h-3 w-3 mr-1" /> {formatTimestamp(message.timestamp)}
                    </p>
                    {/* Displays ChevronUp when open, ChevronDown when closed. */}
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                </div>
            </div>
            {/* Animated container for the message body. */}
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                {isOpen && ( // Renders content only when open for performance.
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <p className="text-gray-700 whitespace-pre-wrap">{message.body}</p>
                        <div className="mt-4 text-right">
                            <button className="text-blue-600 hover:underline text-sm font-medium">Reply</button>
                            <button className="ml-4 text-gray-600 hover:underline text-sm font-medium">Archive</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default MessageCard;