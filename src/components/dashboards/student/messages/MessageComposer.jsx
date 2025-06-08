import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

function MessageComposer() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [messageBody, setMessageBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            recipient,
            subject,
            messageBody,
            timestamp: new Date().toISOString(),
            status: 'sent'
        });
        // Clears the form after submission.
        setRecipient('');
        setSubject('');
        setMessageBody('');
        // Uses a simple alert for demonstration. A custom modal or toast notification is recommended for production.
        alert('Message sent successfully! (This is a mock action)');
    };

    // Animation variants for the composer form.
    const composerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.2 } }
    };

    return (
        <motion.div
            className="bg-white p-6 rounded-md shadow-md border border-gray-100 mb-10"
            variants={composerVariants}
            initial="hidden"
            animate="visible"
        >
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Send className="mr-2 h-6 w-6 text-indigo-600" /> Compose New Message
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                    <input
                        type="text"
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="e.g., John Doe (Instructor), Class Support"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter subject"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="messageBody" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                        id="messageBody"
                        rows="6"
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y"
                        placeholder="Write your message here..."
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 px-6 rounded-md shadow-lg
                               hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 ease-in-out
                               text-lg font-medium transform hover:scale-105 active:scale-95"
                >
                    <Send className="mr-2 h-5 w-5" /> Send Message
                </button>
            </form>
        </motion.div>
    );
}

export default MessageComposer;