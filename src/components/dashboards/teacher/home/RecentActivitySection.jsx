import { motion } from 'framer-motion';
import { History, FileText, MessageSquareText, Users, BookOpen, Info } from 'lucide-react';

export default function RecentActivitySection({ activities, itemVariants }) {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'assignment_submitted':
                return <FileText className="h-4 w-4 text-blue-500" />;
            case 'message_received':
                return <MessageSquareText className="h-4 w-4 text-purple-500" />;
            case 'new_enrollment':
                return <Users className="h-4 w-4 text-green-500" />;
            case 'course_update':
                return <BookOpen className="h-4 w-4 text-orange-500" />;
            default:
                return <Info className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <History className="h-5 w-5 mr-2 text-teal-600" /> Recent Activity
            </h3>
            <ul className="space-y-3">
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <li key={index} className="flex items-center space-x-3 text-gray-700 text-sm">
                            {getActivityIcon(activity.type)}
                            <span>
                                {activity.type === 'assignment_submitted' && `Student ${activity.student} submitted an assignment in ${activity.course}.`}
                                {activity.type === 'message_received' && `Received a message from ${activity.sender}.`}
                                {activity.type === 'new_enrollment' && `New student ${activity.student} enrolled in ${activity.course}.`}
                                {activity.type === 'course_update' && `Course ${activity.course} was updated.`}
                            </span>
                            <span className="ml-auto text-gray-500 text-xs">{activity.time}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No recent activity.</p>
                )}
            </ul>
        </motion.div>
    );
}
