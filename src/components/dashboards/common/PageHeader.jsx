import { motion } from 'framer-motion';

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

function PageHeader({ icon, title }) {
    return (
        <motion.h3
            className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            {icon} <span className="ml-3">{title}</span>
        </motion.h3>
    );
}

export default PageHeader;