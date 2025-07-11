import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
        return;
      }

      const data = await response.json();
      localStorage.setItem("HIJDFJFJF12", data.data.token);
      navigate("/dashboard");


    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <motion.form
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md text-center mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-purple-800">Sign In</h2>
      <div className="mb-4 sm:mb-6 relative">
        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
        <input
          type="email"
          placeholder="Email"
          className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black sm:text-lg" t
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6 sm:mb-8 relative">
        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black sm:text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <motion.button
        type="submit"
        className="bg-purple-700 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300 text-lg sm:text-xl font-bold w-full transform hover:scale-105" // Adjusted padding and font size
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;