import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
        }
    }
};

function ProgressOverviewCard({ metric }) {
    return (
        <motion.div
            className={`p-6 rounded-md shadow-md border border-gray-100 flex flex-col items-center text-center
                        bg-gradient-to-br ${metric.color}`}
            variants={itemVariants}
        >
            <div className="mb-4">{metric.icon}</div>
            <p className="text-sm font-semibold text-gray-700 mb-1">{metric.name}</p>
            <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
        </motion.div>
    );
}

export default ProgressOverviewCard;