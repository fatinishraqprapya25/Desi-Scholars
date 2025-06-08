import { motion } from 'framer-motion';
import TestCardInfo from './TestCardInfo';
import StartTestButton from './StartTestButton';

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

function PracticeTestCard({ test, index }) {
    return (
        <motion.div
            key={test.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
        >
            {/* Icon/Image Section */}
            <div className={`p-6 flex items-center justify-center rounded-t-2xl bg-gradient-to-br ${test.color}`}>
                <img src={test.icon} alt={test.title} className="w-16 h-16 object-contain" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{test.title}</h4>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{test.description}</p>
                <TestCardInfo
                    difficulty={test.difficulty}
                    questions={test.questions}
                    timeLimit={test.timeLimit}
                />
                <StartTestButton />
            </div>
        </motion.div>
    );
}

export default PracticeTestCard;