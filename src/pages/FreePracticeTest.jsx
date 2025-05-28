import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY_COLOR = "#007aff";
const PRIMARY_COLOR_DARKER = "#005cb3"; // For hover states on filled buttons

const examsData = [
  // ... (exam data remains the same)
  {
    id: 1,
    title: "JavaScript Fundamentals",
    icon: "💻",
    description: "Dive into the core concepts of JavaScript, from variables to functions.",
    difficulty: "Beginner",
    questions: [
      {
        question: "What does 'var' keyword do in JavaScript?",
        options: ["Declares a variable", "Defines a function", "Creates a loop", "Imports a module"],
        correct: 0,
        explanation: "'var' is used to declare a variable in JavaScript, though 'let' and 'const' are preferred in modern JS."
      },
      {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "", "#", "/* */"],
        correct: 0,
        explanation: "// is used for single-line comments. /* */ is for multi-line comments."
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correct: 2,
        explanation: "JavaScript uses 'Number' for both integers and floating-point numbers. 'Float' is not a distinct data type."
      },
      {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correct: 2,
        explanation: "The correct JavaScript syntax for an alert box is alert('message');."
      },
      {
        question: "Where is the correct place to insert a JavaScript?",
        options: ["The <body> section", "The <head> section", "Both the <head> and the <body> section", "The <script> section"],
        correct: 2,
        explanation: "JavaScript can be placed in both the <head> and <body> sections, but placing it at the end of the <body> is often recommended for performance."
      },
    ],
  },
  {
    id: 2,
    title: "HTML Essentials",
    icon: "🌐",
    description: "Master the building blocks of the web: HTML structure and semantics.",
    difficulty: "Beginner",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Trainer Marking Language",
          "Hyper Text Markup Language",
          "Hyper Text Marketing Language",
          "Hyper Tool Multi Language",
        ],
        correct: 1,
        explanation: "HTML stands for HyperText Markup Language, which is used to structure content on the web."
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<style>", "<css>", "<link>"],
        correct: 1,
        explanation: "The <style> tag is used to embed CSS styles directly within an HTML document."
      },
      {
        question: "Which is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<newline>"],
        correct: 2,
        explanation: "The <br> tag is used to insert a single line break."
      },
      {
        question: "What is the correct HTML for adding a background color?",
        options: ["<body bg='yellow'>", "<background>yellow</background>", "<body style='background-color:yellow;'>", "<body color='yellow'>"],
        correct: 2,
        explanation: "Inline styles using the 'style' attribute are a common way to apply background colors to HTML elements."
      },
    ],
  },
  {
    id: 3,
    title: "CSS Styling & Layout",
    icon: "🎨",
    description: "Style your web pages with advanced CSS techniques and layout models.",
    difficulty: "Intermediate",
    questions: [
      {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct: 2,
        explanation: "The 'font-size' property is used to specify the size of the text."
      },
      {
        question: "How do you select an element with id 'header'?",
        options: [".header", "#header", "header", "*header"],
        correct: 1,
        explanation: "The '#' symbol is used in CSS to select an element by its ID."
      },
      {
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correct: 2,
        explanation: "The 'background-color' property sets the background color of an element."
      },
      {
        question: "How do you make the text bold?",
        options: ["font:bold;", "style:bold;", "font-weight:bold;", "text-decoration:bold;"],
        correct: 2,
        explanation: "The 'font-weight' property is used to set the boldness or lightness of the text."
      },
    ],
  },
];


// Reusable Animated Button Component
const AnimatedButton = ({ onClick, children, className = "", whileHover, whileTap, type = "button" }) => (
  <motion.button
    type={type}
    onClick={onClick}
    className={`relative group overflow-hidden px-8 py-3 border-2 border-[#007aff] text-[#007aff] rounded-lg font-semibold transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-opacity-50 ${className}`}
    whileHover={whileHover}
    whileTap={whileTap}
  >
    <span className="absolute left-0 top-0 h-full w-0 bg-[#007aff] transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
    <span className="relative z-10 group-hover:text-white transition-colors duration-300 ease-out">
      {children}
    </span>
  </motion.button>
);


export default function FreeTestPage() {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const selectedExam = examsData.find((exam) => exam.id === selectedExamId);

  useEffect(() => {
    if (selectedExamId !== null) {
      setIsLoading(true);
      setAnswers({});
      setSubmitted(false);
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [selectedExamId]);

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetakeOrNewTest = () => {
    setSelectedExamId(null);
    setAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    if (!selectedExam) return 0;
    let score = 0;
    selectedExam.questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  const score = submitted ? calculateScore() : 0;
  const totalQuestions = selectedExam ? selectedExam.questions.length : 0;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: "0px 12px 35px rgba(0, 122, 255, 0.15)", borderColor: PRIMARY_COLOR },
    tap: { scale: 0.97 },
  };

  const questionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Framer motion variants for general button scaling, can be combined with AnimatedButton
  const motionButtonScaling = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-6 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 md:mb-16 drop-shadow-md"
      >
        <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[${PRIMARY_COLOR}] to-sky-500`}>
          Ace Your Exams
        </span>
      </motion.h1>

      <AnimatePresence mode="wait">
        {!selectedExamId ? (
          <motion.div
            key="main-page-content"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
            className="space-y-16 md:space-y-20"
          >
            {/* --- Hero Section --- */}
            <motion.section
              className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-[${PRIMARY_COLOR}] to-sky-600 opacity-5 rounded-2xl`}></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-5 leading-tight">
                  Sharpen Your Skills, Master Every Concept
                </h2>
                <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                  Our free online tests help you gauge your understanding and identify areas for improvement. Start your learning journey today!
                </p>
                <AnimatedButton
                  onClick={() => window.scrollTo({ top: document.getElementById('exams-list-section')?.offsetTop - 100 || 0, behavior: 'smooth' })}
                  className="text-lg px-10 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Tests Now
                </AnimatedButton>
              </div>
            </motion.section>

            {/* --- Features/Benefits Section --- */}
            <motion.section
              className="max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Our Free Tests?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: "💡", title: "Instant Feedback", text: "Get immediate results and see correct answers with detailed explanations.", delay: 0.5 },
                  { icon: "📈", title: "Track Progress", text: "Monitor your learning journey and identify areas needing more attention.", delay: 0.6 },
                  { icon: "📚", title: "Diverse Topics", text: "Explore a wide range of subjects, from web development to general knowledge.", delay: 0.7 },
                ].map(feature => (
                  <motion.div
                    key={feature.title}
                    className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-blue-500/10 transition-shadow duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.delay, ease: "easeOut" }}
                  >
                    <div className="text-4xl mb-5">{feature.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* --- Exams List Section --- */}
            <section id="exams-list-section" className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Available Tests</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {examsData.map((exam, idx) => (
                  <motion.div
                    key={exam.id}
                    className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 cursor-pointer border-2 border-transparent transition-all duration-300 ease-out"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedExamId(exam.id)}
                    custom={idx} // For potential staggered animations
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                  >
                    <div className="text-5xl mb-4 text-center">{exam.icon}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
                      {exam.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">{exam.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className={`text-sm sm:text-md font-semibold text-[${PRIMARY_COLOR}] bg-blue-100 px-3 py-1.5 rounded-md`}>
                        {exam.questions.length} Questions
                      </span>
                      <span
                        className={`text-sm sm:text-md font-semibold px-3 py-1.5 rounded-md
                          ${exam.difficulty === "Beginner" ? "bg-green-100 text-green-700" : ""}
                          ${exam.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" : ""}
                          ${exam.difficulty === "Advanced" ? "bg-red-100 text-red-700" : ""}
                        `}
                      >
                        {exam.difficulty}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* --- Call to Action / Newsletter Signup --- */}
            <motion.section
              className={`bg-gradient-to-r from-[${PRIMARY_COLOR}] to-blue-700 text-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 text-center max-w-6xl mx-auto`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Stay Updated & Never Miss a New Test!
              </h2>
              <p className="text-md sm:text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto">
                Join our community to receive updates on new tests, learning resources, and tips directly in your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className={`w-full flex-grow px-5 py-3.5 rounded-lg text-gray-800 bg-white border-2 border-blue-200 
                            focus:outline-none focus:border-[${PRIMARY_COLOR}] focus:ring-2 focus:ring-[${PRIMARY_COLOR}] focus:ring-opacity-50 
                            transition-all duration-300 text-md sm:text-lg placeholder-gray-400 shadow-sm`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <AnimatedButton
                  type="submit"
                  className="w-full sm:w-auto text-md sm:text-lg !border-white !text-white group-hover:!bg-white group-hover:!text-[#007aff]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
                  Subscribe Now
                </AnimatedButton>
              </form>
            </motion.section>

          </motion.div>
        ) : (
          <motion.div
            key="exam-detail"
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b-2 border-blue-100">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3 mb-4 sm:mb-0">
                {selectedExam.icon} {selectedExam.title}
              </h2>
              <motion.button
                onClick={handleRetakeOrNewTest}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 font-medium text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Exams
              </motion.button>
            </div>

            {isLoading ? (
              <div className={`text-center py-20 text-2xl text-[${PRIMARY_COLOR}] font-semibold`}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">🌀</motion.div> Loading ...
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {selectedExam.questions.map((q, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-50 p-5 sm:p-6 rounded-xl shadow-sm border border-slate-200"
                    variants={questionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.08, ease: "easeOut" }}
                  >
                    <p className="font-semibold text-lg sm:text-xl mb-5 text-gray-800">
                      {index + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {q.options.map((option, oIndex) => {
                        const isCorrect = submitted && oIndex === q.correct;
                        const isSelectedAndWrong = submitted && answers[index] === oIndex && oIndex !== q.correct;
                        const isSelected = answers[index] === oIndex;

                        return (
                          <label
                            key={oIndex}
                            htmlFor={`question-${index}-option-${oIndex}`}
                            className={`flex items-center p-3.5 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                              ${submitted
                                ? isCorrect
                                  ? "bg-green-100 border-green-500 shadow-md"
                                  : isSelectedAndWrong
                                    ? "bg-red-100 border-red-500 shadow-md"
                                    : "bg-white border-gray-200"
                                : isSelected
                                  ? `bg-blue-100 border-[${PRIMARY_COLOR}] shadow-sm`
                                  : `bg-white hover:bg-blue-50 hover:border-[${PRIMARY_COLOR}]/50 border-gray-200`
                              }
                            `}
                          >
                            <input
                              type="radio"
                              id={`question-${index}-option-${oIndex}`}
                              name={`question-${index}`}
                              disabled={submitted}
                              checked={isSelected}
                              onChange={() => handleAnswer(index, oIndex)}
                              className={`mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 text-[${PRIMARY_COLOR}] focus:ring-[${PRIMARY_COLOR}] focus:ring-offset-1 border-gray-300`}
                            />
                            <span
                              className={`text-sm sm:text-base
                                ${isCorrect ? "font-semibold text-green-700" : ""}
                                ${isSelectedAndWrong ? "font-semibold text-red-700" : ""}
                                ${isSelected && !submitted ? `font-semibold text-[${PRIMARY_COLOR}]` : "text-gray-700"}`}
                            >
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {submitted && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, ease: "easeOut" }}
                        className={`mt-4 text-sm p-3 rounded-md
                          ${answers[index] === q.correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                        `}
                      >
                        <strong>Explanation:</strong> {q.explanation}
                      </motion.p>
                    )}
                  </motion.div>
                ))}

                {!submitted && (
                  <AnimatedButton
                    onClick={handleSubmit}
                    className="mt-8 w-full text-lg py-4"
                    whileHover={{ scale: 1.02 }} // Framer Motion scaling can combine
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Your Answers!
                  </AnimatedButton>
                )}

                {submitted && (
                  <motion.div
                    className={`mt-10 bg-gradient-to-br from-sky-100 to-blue-200 p-6 sm:p-8 rounded-xl shadow-lg text-center border-2 border-[${PRIMARY_COLOR}]/30`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.p
                      className={`text-3xl sm:text-4xl font-extrabold text-[${PRIMARY_COLOR}] mb-3`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
                    >
                      You Scored: {score} / {totalQuestions}
                    </motion.p>
                    <motion.p
                      className="text-5xl sm:text-6xl font-extrabold text-sky-600 mb-6"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.7 }}
                    >
                      {percentage.toFixed(0)}%
                    </motion.p>

                    <p className="text-lg sm:text-xl text-gray-700 mb-8 font-medium">
                      {percentage === 100
                        ? "Absolutely brilliant! A perfect score! 🎉"
                        : percentage >= 70
                          ? "Excellent work! You're doing great! 👍"
                          : percentage >= 50
                            ? "Good effort! A little more practice and you'll master it!"
                            : "Keep learning! Every attempt is a step forward. 🌱"}
                    </p>
                    <motion.button
                      className={`px-8 py-3.5 bg-[${PRIMARY_COLOR}] hover:bg-[${PRIMARY_COLOR_DARKER}] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-md sm:text-lg`}
                      onClick={handleRetakeOrNewTest}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Take Another Test
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-10 mt-16 md:mt-20 border-t border-gray-200">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} AceYourExams. All rights reserved.</p>
      </footer>
    </div>
  );
}