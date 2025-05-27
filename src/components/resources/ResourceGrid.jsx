import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResourceCard from './ResourceCard'; // Import the new ResourceCard component

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const ResourceGrid = ({ filteredResources }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filteredResources[0]?.category || 'empty'} // Key changes to re-trigger AnimatePresence on category change
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden" // Ensure exit animation runs
      >
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <motion.p
            className="col-span-full text-center text-xl text-gray-600 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No resources found in this category.
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ResourceGrid;
