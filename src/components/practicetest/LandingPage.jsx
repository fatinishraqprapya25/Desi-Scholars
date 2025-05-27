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

export default LandingPage;