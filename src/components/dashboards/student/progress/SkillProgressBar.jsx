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

function SkillProgressBar({ skill }) {
    return (
        <motion.li key={skill.id} variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium text-gray-800">{skill.name}</span>
                <span className="text-md font-semibold text-gray-700">{skill.proficiency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-md h-3">
                <motion.div
                    className={`h-3 rounded-md ${skill.color}`}
                    style={{ '--progress-width': `${skill.proficiency}%` }}
                    variants={progressBarVariants}
                    initial="hidden"
                    animate="visible"
                ></motion.div>
            </div>
        </motion.li>
    );
}

export default SkillProgressBar;