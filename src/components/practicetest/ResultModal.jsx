import { motion } from "framer-motion"

const ResultModal = ({ score, totalQuestions, onClose, questions, selectedAnswers }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center relative border border-blue-300"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Results</h2>
        <p className="text-2xl text-blue-600 font-semibold mb-6">
          You scored {score} out of {totalQuestions}!
        </p>

        <div className="text-left max-h-96 overflow-y-auto mb-6 pr-4">
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
            return (
              <div key={question.id} className="mb-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="font-medium text-gray-700 mb-2">
                  {index + 1}. {question.questionText}
                </p>
                <p className="text-sm">
                  Your Answer: <span className={`${isCorrect ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                    {selectedAnswers[question.id] || 'Not answered'}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm">
                    Correct Answer: <span className="text-green-600 font-semibold">{question.correctAnswer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <motion.button
          onClick={onClose}
          className="bg-blue-600 text-white py-2 px-5 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retake Test
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultModal;