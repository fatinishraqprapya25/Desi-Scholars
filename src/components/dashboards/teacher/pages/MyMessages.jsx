import { motion } from 'framer-motion';
import UserDashboardContainer from "../../common/UserDashboardContainer";
import PageHeader from '../../common/PageHeader';
import MessageComposer from '../messages/MessageComposer';
import MessageList from '../messages/MessageList';
import { FaMessage } from 'react-icons/fa6';

export default function MyMessages() {
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
        <UserDashboardContainer role="teacher">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
                <motion.div
                    className="w-full mt-3"
                    variants={sectionContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Renders the page header. */}
                    <PageHeader icon={<FaMessage />} title={"Message"} />

                    {/* Section for composing new messages. */}
                    <section className="mb-10">
                        <MessageComposer />
                    </section>

                    {/* Section for displaying received messages (Inbox). */}
                    <section className="mb-10">
                        <MessageList messages={mockReceivedMessages} type="received" />
                    </section>

                    {/* Section for displaying sent messages. */}
                    <section className="mb-10">
                        <MessageList messages={mockSentMessages} type="sent" />
                    </section>
                </motion.div>
            </div>
        </UserDashboardContainer>
    );
}