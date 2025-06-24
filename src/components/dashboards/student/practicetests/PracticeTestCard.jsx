import { motion } from 'framer-motion';
import TestCardInfo from './TestCardInfo';
import StartTestButton from './StartTestButton';
import { useState } from 'react';

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
    const [testQuestionsCount, setTestQuestionCount] = useState(0);

    return (
        <motion.div
            key={test._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
        >
            <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{test.title}</h4>
                <p className="text-sm text-gray-600 mb- flex-grow mt-1">{test.description}</p>
                <TestCardInfo
                    difficulty={test.difficulty || "standard"}
                    questions={testQuestionsCount}
                />
                <StartTestButton id={test._id} />
            </div>
        </motion.div>
    );
}

export default PracticeTestCard;