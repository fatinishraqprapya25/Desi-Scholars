import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

function AdminHeader() {
    return (
        <motion.div variants={headerVariants} initial="hidden" animate="visible">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
                <LayoutDashboard className="mr-3 h-8 w-8 text-indigo-600" /> Admin Dashboard Overview
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                Welcome back, Administrator! Here's a quick summary of your platform's performance and key metrics.
            </p>
        </motion.div>
    );
}

export default AdminHeader;