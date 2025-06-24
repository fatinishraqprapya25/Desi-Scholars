import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function LatestAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await fetch("http://localhost:5000/api/broadcasts/filter/students");
            const result = await response.json();
            if (result.success) {
                setAnnouncements(result.data);
            }
        }
        fetchAnnouncements();
    }, []);

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
                                <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                                <p className="text-xs text-gray-500 text-right">{announcement.createdAt}</p>
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