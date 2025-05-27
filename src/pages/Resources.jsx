import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaFilePdf, FaPlayCircle, FaDownload, FaEye } from 'react-icons/fa'; // Icons for categories and actions
import Header from '../components/common/Header'; // Assuming Header component exists at this path
import Footer from '../components/common/Footer'; // Assuming Footer component exists at this path

// Mock Data for Resources
const resources = [
  {
    id: 'e1',
    category: 'e-books',
    title: 'React Fundamentals E-book',
    icon: <FaBook className="text-purple-600" />,
    type: 'download',
    link: '#download-react-ebook',
    description: 'A comprehensive guide to getting started with React, covering JSX, components, and state management.'
  },
  {
    id: 'e2',
    category: 'e-books',
    title: 'Advanced JavaScript Patterns',
    icon: <FaBook className="text-purple-600" />,
    type: 'download',
    link: '#download-js-patterns',
    description: 'Explore advanced JavaScript concepts like closures, prototypes, and async/await for robust applications.'
  },
  {
    id: 'e3',
    category: 'e-books',
    title: 'Tailwind CSS Mastery',
    icon: <FaBook className="text-purple-600" />,
    type: 'download',
    link: '#download-tailwind-mastery',
    description: 'Learn to build beautiful, responsive UIs rapidly with the power of Tailwind CSS utility classes.'
  },
  {
    id: 'p1',
    category: 'pdfs',
    title: 'React Hooks Cheatsheet',
    icon: <FaFilePdf className="text-red-600" />,
    type: 'view',
    link: '#view-hooks-cheatsheet',
    description: 'A quick reference guide for all essential React Hooks and their usage examples.'
  },
  {
    id: 'p2',
    category: 'pdfs',
    title: 'Web Development Roadmap',
    icon: <FaFilePdf className="text-red-600" />,
    type: 'download',
    link: '#download-roadmap-pdf',
    description: 'A step-by-step roadmap for aspiring web developers, outlining key technologies and learning paths.'
  },
  {
    id: 'p3',
    category: 'pdfs',
    title: 'ES6+ Features Overview',
    icon: <FaFilePdf className="text-red-600" />,
    type: 'view',
    link: '#view-es6-features',
    description: 'An concise overview of modern JavaScript (ES6+) features, including arrow functions, destructuring, and modules.'
  },
  {
    id: 'v1',
    category: 'video-guides',
    title: 'React State Management Tutorial',
    icon: <FaPlayCircle className="text-blue-600" />,
    type: 'view',
    link: '#watch-state-management',
    description: 'Video tutorial on managing complex application state using React Context API and Reducers.'
  },
  {
    id: 'v2',
    category: 'video-guides',
    title: 'Building a REST API with Node.js',
    icon: <FaPlayCircle className="text-blue-600" />,
    type: 'view',
    link: '#watch-nodejs-api',
    description: 'Step-by-step video guide on creating robust backend APIs with Node.js and Express.'
  },
  {
    id: 'v3',
    category: 'video-guides',
    title: 'Deploying React Apps to Netlify',
    icon: <FaPlayCircle className="text-blue-600" />,
    type: 'view',
    link: '#watch-netlify-deploy',
    description: 'Learn the easiest way to deploy your React single-page applications to Netlify with continuous deployment.'
  },
];

// Animation variants for card staggering
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

const FreeResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('e-books'); // Default active category

  const filteredResources = resources.filter(
    (resource) => resource.category === activeCategory
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 font-sans antialiased text-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-center text-purple-900 mb-12 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock Free Resources
          </motion.h1>

          {/* Category Tabs */}
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

          {/* Resource Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory} // Key changes to re-trigger AnimatePresence on category change
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden" // Ensure exit animation runs
            >
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-100"
                    whileHover={{ scale: 1.03, boxShadow: "0 20px 35px rgba(0,0,0,0.2)" }}
                    transition={{ duration: 0.3 }}
                    variants={itemVariants} // Apply item variants for staggered entrance
                  >
                    <div className="text-6xl mb-4">
                      {resource.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                    <p className="text-gray-700 mb-6 flex-grow">{resource.description}</p>
                    <motion.a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        resource.type === 'download'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreeResourcesPage;
