import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reqRegister = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      if (!reqRegister.ok) {
        const errorData = await reqRegister.json();
        console.error("Registration failed:", errorData.message || "Unknown error");
        alert(`Registration failed: ${errorData.message || "Unknown error"}`);
        return;
      }

      const resRegister = await reqRegister.json();

      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <motion.form
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-extrabold mb-8 text-purple-800">Create Account</h2>
      <div className="mb-6 relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Name"
          className="w-full px-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
        Sign Up
      </motion.button>
    </motion.form>
  );
};

export default RegistrationForm;
