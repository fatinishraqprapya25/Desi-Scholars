import React from 'react';
import { motion } from 'framer-motion';

const ResourceCategoryTabs = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex justify-center mb-12 flex-wrap gap-4">
      {['e-books', 'pdfs', 'video-guides'].map((category) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md ${
            activeCategory === category
              ? 'bg-purple-700 text-white transform scale-105 shadow-xl'
              : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-800'
          }`}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </motion.button>
      ))}
    </div>
  );
};

export default ResourceCategoryTabs;
