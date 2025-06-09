// src/components/teachers/AddTeacherModal.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
};

export default function AddTeacherModal({ isOpen, onClose, onSave }) {
    const [newTeacherName, setNewTeacherName] = useState('');
    const [newTeacherEmail, setNewTeacherEmail] = useState('');

    if (!isOpen) return null; // Important: Render nothing if not open

    const handleSave = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!newTeacherName.trim() || !newTeacherEmail.trim()) {
            alert('Please fill in both name and email.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(newTeacherEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        onSave({ name: newTeacherName, email: newTeacherEmail });
        setNewTeacherName(''); // Clear form after save
        setNewTeacherEmail('');
        onClose(); // Close modal after save
    };

    // Close modal on Escape key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-blue-100/60" // CHANGED BACKGROUND HERE
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }}
            onClick={onClose} // Close on backdrop click
        >
            <motion.div
                className="bg-white p-5 sm:p-7 rounded-xl shadow-2xl w-full max-w-md relative"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>
                <h3 className="text-xl font-semibold mb-5 text-gray-800">Add New Teacher</h3>

                <form onSubmit={handleSave}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="teacherName"
                                value={newTeacherName}
                                onChange={(e) => setNewTeacherName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
                                placeholder="e.g., Jane Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="teacherEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="teacherEmail"
                                value={newTeacherEmail}
                                onChange={(e) => setNewTeacherEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
                                placeholder="e.g., jane.doe@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Add Teacher
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}