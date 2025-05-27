import { motion } from "framer-motion";

const WhatWeDo = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
    variants={itemVariants}
    whileHover={{ y: -5 }}
  >
    <div className="text-6xl text-blue-600 mb-5">{icon}</div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default WhatWeDo;