import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const announcements = [
    { id: 1, title: 'Platform Maintenance Scheduled', date: 'June 10, 2025', message: 'Our platform will undergo scheduled maintenance from 2 AM to 4 AM UTC. Services may be temporarily interrupted.' },
    { id: 2, title: 'New Course: Advanced React Hooks', date: 'May 28, 2025', message: 'Exciting news! A new course on Advanced React Hooks has been launched. Enroll now to deepen your React expertise.' },
    { id: 3, title: 'Webinar: Future of AI in Education', date: 'May 25, 2025', message: 'Join our upcoming webinar on June 15th to discuss the transformative impact of AI in the education sector.' },
];

export default function LatestAnnouncements() {
    const itemVariants = {
        hidden: { x: 20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="mb-10">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <Megaphone className="mr-3 h-8 w-8 text-purple-600" /> Latest Announcements
            </h3>
            <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {announcements.length > 0 ? (
                    <ul className="space-y-4">
                        {announcements.map(announcement => (
                            <motion.li key={announcement.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100" variants={itemVariants}>
                                <p className="text-lg font-semibold text-gray-900 mb-1">{announcement.title}</p>
                                <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                                <p className="text-xs text-gray-500 text-right">{announcement.date}</p>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center py-4">No new announcements at this time.</p>
                )}
            </motion.div>
        </section>
    );
}