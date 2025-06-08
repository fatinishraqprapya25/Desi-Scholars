import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

function PageHeader() {
    return (
        <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <h3 className="text-3xl mt-3 font-extrabold text-gray-800 mb-4 flex items-center">
                <FileText className="mr-3 h-8 w-8 text-blue-600" /> Practice Tests
            </h3>
            <p className="text-gray-700 text-lg mb-10 max-w-2xl">
                Sharpen your skills and prepare for success with our comprehensive collection of practice tests. Choose a test below to get started!
            </p>
        </motion.div>
    );
}

export default PageHeader;