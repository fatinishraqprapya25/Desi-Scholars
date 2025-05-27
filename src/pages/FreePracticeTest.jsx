import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Main App Component
const App = () => {
  // Define the test questions
  const initialQuestions = [
    {
      id: 'q1',
      questionText: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 'q2',
      questionText: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Mars',
    },
    {
      id: 'q3',
      questionText: 'What is the largest ocean on Earth?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctAnswer: 'Pacific',
    },
    {
      id: 'q4',
      questionText: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
      correctAnswer: 'Leonardo da Vinci',
    },
    {
      id: 'q5',
      questionText: 'What is the chemical symbol for water?',
      options: ['O2', 'H2O', 'CO2', 'NaCl'],
      correctAnswer: 'H2O',
    },
    {
      id: 'q6',
      questionText: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '7',
    },
    {
      id: 'q7',
      questionText: 'What is the highest mountain in the world?',
      options: ['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse'],
      correctAnswer: 'Mount Everest',
    },
    {
      id: 'q8',
      questionText: 'Which animal is known as the "King of the Jungle"?',
      options: ['Tiger', 'Lion', 'Elephant', 'Bear'],
      correctAnswer: 'Lion',
    },
    {
      id: 'q9',
      questionText: 'What is the currency of Japan?',
      options: ['Yuan', 'Won', 'Yen', 'Dollar'],
      correctAnswer: 'Yen',
    },
    {
      id: 'q10',
      questionText: 'What is the largest desert in the world?',
      options: ['Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Antarctic Polar Desert'],
      correctAnswer: 'Antarctic Polar Desert',
    },
  ];

  // State to store user's selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // State to control the visibility of the result modal
  const [showResults, setShowResults] = useState(false);
  // State to store the user's score
  const [score, setScore] = useState(0);
  // State to manage the current page view: 'landing' or 'test'
  const [currentPage, setCurrentPage] = useState('landing');
  // State to manage the index of the currently displayed question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Handle option selection for a question
  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Handle test submission or next question navigation
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if it's the last question
    if (currentQuestionIndex < initialQuestions.length - 1) {
      // If not the last question, move to the next one
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last question, calculate score and show results
      let calculatedScore = 0;
      initialQuestions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);
      setShowResults(true); // Show the result modal
    }
  };

  // Handle closing the result modal and resetting the test
  const handleCloseResults = () => {
    setShowResults(false);
    setSelectedAnswers({}); // Clear selected answers
    setScore(0); // Reset score
    setCurrentPage('landing'); // Go back to the landing page
    setCurrentQuestionIndex(0); // Reset question index
  };

  // Function to navigate to the test page
  const handleStartTest = () => {
    setCurrentPage('test');
    setCurrentQuestionIndex(0); // Ensure test starts from the first question
  };

  // Determine button text based on current question index
  const isLastQuestion = currentQuestionIndex === initialQuestions.length - 1;
  const buttonText = isLastQuestion ? 'Submit Test' : 'Next Question';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-blue-200">
        {currentPage === 'landing' ? (
          <LandingPage onStartTest={handleStartTest} />
        ) : (
          <>
            <TestHeader /> {/* Keep TestHeader for the test page itself */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Render only the current question */}
              <Question
                key={initialQuestions[currentQuestionIndex].id}
                question={initialQuestions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                selectedAnswer={selectedAnswers[initialQuestions[currentQuestionIndex].id]}
                onOptionSelect={handleOptionSelect}
              />

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {buttonText}
              </motion.button>
            </form>
          </>
        )}

        <AnimatePresence>
          {showResults && (
            <ResultModal
              score={score}
              totalQuestions={initialQuestions.length}
              onClose={handleCloseResults}
              questions={initialQuestions}
              selectedAnswers={selectedAnswers}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// LandingPage Component
const LandingPage = ({ onStartTest }) => {
  return (
    <motion.div
      className="text-center py-12 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Welcome to the Free Practice Test
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-prose mx-auto">
        Sharpen your mind and test your general knowledge with our quick and engaging multiple-choice quiz.
        Click the button below to start your practice session!
      </p>
      <motion.button
        onClick={onStartTest}
        className="bg-indigo-600 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-lg
                   hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105
                   focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Take Test Now
      </motion.button>
    </motion.div>
  );
};

// TestHeader Component
const TestHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Free Practice Test</h1>
    <p className="text-lg text-gray-600">
      Test your knowledge with these multiple-choice questions. Select the best answer for each question and click "Submit Test" to see your results.
    </p>
  </div>
);

// Question Component
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

// ResultModal Component
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

export default App;
