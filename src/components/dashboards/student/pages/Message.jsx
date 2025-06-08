import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Inbox, MessageSquare, CornerUpRight, Paperclip, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
// Removed the import for UserDashboardContainer as it caused a resolution error.
// The main MessagePage component will now provide its own styling.

// --- Component: PageHeader ---
// A generic header component for the message page.
function PageHeader() {
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    return (
        <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-10"
        >
            <h3 className="text-3xl mt-3 font-extrabold text-gray-800 mb-4 flex items-center">
                <Mail className="mr-3 h-8 w-8 text-blue-600" /> Messages
            </h3>
            <p className="text-gray-700 text-lg max-w-2xl">
                Stay connected with your instructors and peers. Send new messages or review your inbox.
            </p>
        </motion.div>
    );
}

// --- Component: MessageComposer ---
// Form component for composing and sending new messages.
function MessageComposer() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [messageBody, setMessageBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend API
        console.log({
            recipient,
            subject,
            messageBody,
            timestamp: new Date().toISOString(),
            status: 'sent'
        });
        // Clear form after submission
        setRecipient('');
        setSubject('');
        setMessageBody('');
        // Using a simple alert for mock action. For production, consider a custom modal or toast notification.
        alert('Message sent successfully! (This is a mock action)');
    };

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

// --- Component: MessageCard ---
// Displays a single message, with toggleable details.
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
                onClick={toggleOpen}
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
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                </div>
            </div>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                {isOpen && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <p className="text-gray-700 whitespace-pre-wrap">{message.body}</p>
                        {/* You could add reply/forward buttons here */}
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

// --- Component: MessageList ---
// Displays a list of messages, categorised as Inbox or Sent.
function MessageList({ messages, type }) {
    const listVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            className="bg-white p-6 rounded-md shadow-md border border-gray-100"
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                {type === 'received' ? (
                    <Inbox className="mr-2 h-6 w-6 text-teal-600" />
                ) : (
                    <CornerUpRight className="mr-2 h-6 w-6 text-purple-600" />
                )}
                {type === 'received' ? 'Inbox' : 'Sent Messages'}
            </h4>
            {messages.length > 0 ? (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <MessageCard key={msg.id} message={msg} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center py-8">No {type} messages yet.</p>
            )}
        </motion.div>
    );
}

// --- Main Page Component: MessagePage ---
export default function MessagePage() {
    // Mock data for messages
    const mockReceivedMessages = [
        {
            id: 'rec-1',
            type: 'received',
            sender: 'Prof. Alice Smith',
            subject: 'Regarding your Web Dev assignment',
            body: 'Hi, your recent web development assignment submission was great! Just a small suggestion: consider using more semantic HTML tags for better accessibility. Keep up the good work!',
            timestamp: '2025-06-07T10:30:00Z',
            read: false,
        },
        {
            id: 'rec-2',
            type: 'received',
            sender: 'Student Support',
            subject: 'Update: Calculus I Study Group',
            body: 'Hello, the Calculus I study group for this week has been rescheduled to Friday at 3 PM in Room 101. Please make sure to bring your questions!',
            timestamp: '2025-06-06T14:15:00Z',
            read: true,
        },
        {
            id: 'rec-3',
            type: 'received',
            sender: 'John Doe',
            subject: 'Question about DSA problem',
            body: 'Hey, I was reviewing the recent Data Structures and Algorithms problem set, and I had a question about Problem 3. Specifically, the time complexity of the proposed solution. Could you clarify it a bit?',
            timestamp: '2025-06-05T09:00:00Z',
            read: true,
        },
    ];

    const mockSentMessages = [
        {
            id: 'sent-1',
            type: 'sent',
            recipient: 'Prof. Alice Smith',
            subject: 'Question about Assignment 3',
            body: 'Dear Professor Smith, I had a quick question regarding Assignment 3. For problem 2, are we expected to implement both the client-side and server-side validation, or just client-side for this phase?',
            timestamp: '2025-06-07T09:45:00Z',
            read: true, // For sent messages, 'read' would typically mean the recipient has read it. Mocking as read for demo.
        },
        {
            id: 'sent-2',
            type: 'sent',
            recipient: 'Student Support',
            subject: 'Issue with course enrollment',
            body: 'Hello, I am having trouble enrolling in the "Advanced React Patterns" course. It shows a prerequisite error, but I believe I have completed all required courses. Could you please assist?',
            timestamp: '2025-06-06T10:00:00Z',
            read: true,
        },
    ];

    const sectionContainerVariants = {
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

    return (
        <UserDashboardContainer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
                <motion.div
                    className="w-full mt-3"
                    variants={sectionContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Page Header */}
                    <PageHeader />

                    {/* Message Composer Section */}
                    <section className="mb-10">
                        <MessageComposer />
                    </section>

                    {/* Inbox Section */}
                    <section className="mb-10">
                        <MessageList messages={mockReceivedMessages} type="received" />
                    </section>

                    {/* Sent Messages Section */}
                    <section className="mb-10">
                        <MessageList messages={mockSentMessages} type="sent" />
                    </section>
                </motion.div>
            </div>
        </UserDashboardContainer>
    );
}
