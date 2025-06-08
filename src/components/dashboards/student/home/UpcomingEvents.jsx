import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const upcomingEventsData = [
    { id: 1, title: 'Web Dev Project Deadline', date: 'June 15, 2025', time: '11:59 PM', course: 'Web Development' },
    { id: 2, title: 'Calculus Mid-term Exam', date: 'June 20, 2025', time: '10:00 AM', course: 'Calculus I' },
    { id: 3, title: 'DSA Live Session', date: 'June 12, 2025', time: '07:00 PM', course: 'Data Structures' },
];


export default function UpcomingEvents() {
    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
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
                <CalendarDays className="mr-3 h-8 w-8 text-orange-600" /> Upcoming Events & Deadlines
            </h3>
            <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {upcomingEventsData.length > 0 ? (
                    <ul className="space-y-4">
                        {upcomingEventsData.map(event => (
                            <motion.li key={event.id} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100" variants={itemVariants}>
                                <div className="flex-shrink-0 mr-4 text-blue-600">
                                    <CalendarDays className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{event.title}</p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">{event.date}</span> at {event.time}
                                    </p>
                                    <p className="text-xs text-gray-500">Course: {event.course}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center py-4">No upcoming events or deadlines.</p>
                )}
            </motion.div>
        </section>
    );
}