import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { email, password });
    alert('Login functionality is not implemented in this demo. Check console for data.');
  };

  return (
    <motion.form
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-extrabold mb-8 text-purple-800">Sign In</h2>
      <div className="mb-6 relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-8 relative">
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <motion.button
        type="submit"
        className="bg-purple-700 text-white px-10 py-4 rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300 text-xl font-bold w-full transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;
