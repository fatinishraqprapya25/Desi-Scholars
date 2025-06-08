import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        }
    }
};

function SummaryCard({ item, index }) {
    const IconComponent = item.icon;

    return (
        <motion.div
            key={item.id}
            className={`relative p-6 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${item.bgColor}`}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
        >
            <div className="relative z-10 flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold text-white`}>{item.title}</h3>
                {IconComponent && <IconComponent className={`h-8 w-8 text-white opacity-80`} />}
            </div>
            <p className={`text-4xl font-bold text-white leading-tight`}>{item.value}</p>
            <p className="text-sm text-white opacity-80 mt-2">View details &rarr;</p>
        </motion.div>
    );
}

export default SummaryCard;