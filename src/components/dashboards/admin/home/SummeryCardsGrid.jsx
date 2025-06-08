import { motion } from 'framer-motion';
import SummaryCard from './SummaryCard';

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    }
};

function SummaryCardsGrid({ summaryData }) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
        >
            {summaryData.map((item, index) => (
                <SummaryCard key={item.id} item={item} index={index} />
            ))}
        </motion.div>
    );
}

export default SummaryCardsGrid;