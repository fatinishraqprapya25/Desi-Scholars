import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Send, Calendar, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BroadcastCard({ broadcast, cardVariants, getStatusBadge }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const adminToken = localStorage.getItem('ASDFDKFFJF');

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this broadcast? This action cannot be undone.');
        if (!confirmed) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`http://localhost:5000/api/broadcasts/${broadcast.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
            const data = await res.json();

            if (res.ok && data.success) {
                alert('Broadcast deleted successfully!');
                // Optional: Reload page or emit event to parent to refresh list
                window.location.reload();  // Simple way if no parent update
            } else {
                alert(`Failed to delete broadcast: ${data.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error deleting broadcast:', err);
            alert('An error occurred while deleting broadcast.');
        } finally {
            setIsDeleting(false);
        }
    };

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

            {/* Action Buttons: Edit and Delete */}
            <div className="flex justify-end gap-2 pt-2">
                <Link to={`/admin/notifications/edit/${broadcast.id}`}>
                    <button
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        title="Edit Broadcast"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                    </button>
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md font-medium text-sm ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    title="Delete Broadcast"
                >
                    <Trash2 className="h-4 w-4 mr-2" /> {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </motion.div>
    );
}
