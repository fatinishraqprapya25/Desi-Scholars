import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from '../components/practicetest/LandingPage';
import Question from '../components/practicetest/Question';
import ResultModal from "../components/practicetest/ResultModal";
import TestHeader from "../components/practicetest/TestHeader";

const App = () => {
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

export default App;
