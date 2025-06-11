import { motion } from 'framer-motion';
import { CalendarDays, GraduationCap } from 'lucide-react';

export default function UpcomingDeadlinesSection({ deadlines, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="lg:col-span-3 bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <CalendarDays className="h-5 w-5 mr-2 text-red-600" /> Upcoming Deadlines
            </h3>
            <ul className="space-y-3">
                {deadlines.length > 0 ? (
                    deadlines.map((deadline, index) => (
                        <li key={index} className="flex items-center space-x-3 text-gray-700 text-sm p-2 bg-yellow-50 rounded-md border border-yellow-100">
                            <GraduationCap className="h-4 w-4 text-yellow-700" />
                            <span>
                                <span className="font-medium">{deadline.title}</span> for <span className="font-medium">{deadline.course}</span>.
                            </span>
                            <span className="ml-auto text-yellow-700 text-xs flex items-center">
                                <CalendarDays className="h-4 w-4 mr-1" /> {deadline.date}
                            </span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No upcoming deadlines.</p>
                )}
            </ul>
        </motion.div>
    );
}
