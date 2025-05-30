import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './Login'; // Assuming Login.js is your LoginForm
import RegistrationForm from './Register'; // Assuming Register.js is your RegistrationForm

const AuthPage = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(true); // true for Register, false for Login

  // Variants for the content panels to slide in/out
  const panelVariants = {
    initial: (isLeft) => ({
      x: isLeft ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8,
    }),
    animate: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    exit: (isLeft) => ({
      x: isLeft ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    }),
  };

  // Variants for the form panels to slide in/out
  const formVariants = {
    initial: (isLeft) => ({
      x: isLeft ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9,
    }),
    animate: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: 0.2, // Slightly delay form animation
      },
    },
    exit: (isLeft) => ({
      x: isLeft ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: 0.2, // Slightly delay form animation
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl h-[600px] flex flex-col md:flex-row"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Panel (Content or Form) */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 md:p-10 mb-8 md:mb-0">
          <AnimatePresence mode="wait">
            {isRegisterMode ? (
              <motion.div
                key="registerForm"
                className="w-full h-full flex items-center justify-center"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={true}
              >
                <RegistrationForm />
              </motion.div>
            ) : (
              <motion.div
                key="loginContent"
                className="w-full h-full flex flex-col items-center justify-center text-center text-gray-800"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={true}
              >
                <h2 className="text-4xl font-extrabold mb-4 text-purple-800">Welcome Back!</h2>
                <p className="text-lg mb-[10px]">
                  To keep connected with us please login with your personal info.
                </p>
                <motion.button
                  onClick={() => setIsRegisterMode(true)}
                  className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel (Content or Form) */}
        <div className="relative md:mt-0 mt-[60px] w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <AnimatePresence mode="wait">
            {isRegisterMode ? (
              <motion.div
                key="registerContent"
                className="w-full h-full flex flex-col items-center justify-center text-center"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={false}
              >
                <h2 className="text-4xl font-extrabold mb-4">Hello, Friend!</h2>
                <p className="text-lg">
                  Enter your personal details and start your journey with us.
                </p>
                <motion.button
                  onClick={() => setIsRegisterMode(false)}
                  className="border-2 border-white text-white px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="loginForm"
                className="w-full h-full flex mt-[-73px] items-center justify-center"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={false}
              >
                <LoginForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;