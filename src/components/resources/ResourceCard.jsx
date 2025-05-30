import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const ResourceCard = ({ resource }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-100"
      whileHover={{ scale: 1.03, boxShadow: "0 20px 35px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
      variants={itemVariants} // Apply item variants for staggered entrance
    >
      {/* Icon color adjusted to a primary blue from your theme */}
      <div className="text-6xl mb-4 text-blue-600">
        {resource.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{resource.title}</h3>
      <p className="text-gray-700 mb-6 flex-grow">{resource.description}</p>
      <motion.a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        // Both download and view buttons will now use the blue/indigo theme
        className={`flex items-center px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-white
                           bg-blue-600 hover:bg-blue-700`} // Unified blue theme for both button types
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {resource.type === 'download' ? (
          <>
            <FaDownload className="mr-3" /> Download
          </>
        ) : (
          <>
            <FaEye className="mr-3" /> View
          </>
        )}
      </motion.a>
    </motion.div>
  );
};

export default ResourceCard;