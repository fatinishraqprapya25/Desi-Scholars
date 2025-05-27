const Question = ({ question, questionNumber, selectedAnswer, onOptionSelect }) => {
  return (
    <motion.div
      className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} // Removed delay based on questionNumber as only one question is shown
    >
      <p className="text-xl font-semibold text-gray-700 mb-4">
        {questionNumber}. {question.questionText}
      </p>
      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.label
            key={option}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
              ${selectedAnswer === option ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-100 border-gray-300'}
              border`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onOptionSelect(question.id, option)}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-800 text-base">{option}</span>
          </motion.label>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;