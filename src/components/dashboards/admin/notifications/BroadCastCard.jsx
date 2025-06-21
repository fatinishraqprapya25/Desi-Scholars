import { motion } from 'framer-motion';
import { Hash, Send, Calendar, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BroadcastCard({ broadcast, onEditBroadcast, cardVariants, getStatusBadge }) {
    return (
        <motion.div
            key={broadcast.id}
            className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
            variants={cardVariants}
            layout
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            {/* Broadcast ID and Status Badge */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center text-xs text-gray-500">
                    <Hash className="w-3.5 h-3.5 mr-1 text-gray-400" /> ID: <span className="font-medium ml-0.5">{broadcast.id}</span>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(broadcast.status)}`}>
                    {broadcast.status}
                </span>
            </div>

            {/* Broadcast Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                {broadcast.title}
            </h3>

            {/* Message/Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={broadcast.message}>
                {broadcast.message}
            </p>

            {/* Sender and Date */}
            <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                <div className="flex items-center"><Send className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> {broadcast.sender}</div>
                <div className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Date: {broadcast.sendDate}</div>
            </div>

            {/* Action Button: Edit Broadcast */}
            <div className="flex justify-end pt-2">
                <Link to={`/admin/notifications/edit/${broadcast.id}`}>
                    <button
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        title="Edit Broadcast"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Broadcast
                    </button></Link>
            </div>
        </motion.div>
    );
}