import { motion } from 'framer-motion';

const progressBarVariants = {
    hidden: { width: 0 },
    visible: {
        width: 'var(--progress-width)',
        transition: {
            duration: 1.5,
            ease: 'easeOut'
        }
    }
};

function CourseProgressBar({ progress }) {
    return (
        <div className="w-full bg-gray-200 rounded-md h-2.5 mb-2">
            <motion.div
                className="h-2.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-700"
                style={{ '--progress-width': `${progress}%` }}
                variants={progressBarVariants}
                initial="hidden"
                animate="visible"
            ></motion.div>
        </div>
    );
}

export default CourseProgressBar;