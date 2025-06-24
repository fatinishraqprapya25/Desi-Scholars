// In FreeResourcesPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaFilePdf, FaPlayCircle } from 'react-icons/fa';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ResourceCategoryTabs from '../components/resources/ResourceCategoryTabs';
import ResourceGrid from '../components/resources/ResourceGrid';
import PracticeTestPromo from '../components/home/PracticeDemo';
import FAQSection from "../components/home/Faq";

// Mock Data for Resources (remain unchanged, or updated to text-blue-600 as per previous instructions)
const resources = [
  {
    id: 'e1',
    category: 'e-books',
    title: 'React Fundamentals E-book',
    icon: <FaBook className="text-blue-600" />,
    type: 'download',
    link: '#download-react-ebook',
    description: 'A comprehensive guide to getting started with React, covering JSX, components, and state management.'
  },
  {
    id: 'e2',
    category: 'e-books',
    title: 'Advanced JavaScript Patterns',
    icon: <FaBook className="text-blue-600" />,
    type: 'download',
    link: '#download-js-patterns',
    description: 'Explore advanced JavaScript concepts like closures, prototypes, and async/await for robust applications.'
  },
  {
    id: 'e3',
    category: 'e-books',
    title: 'Tailwind CSS Mastery',
    icon: <FaBook className="text-blue-600" />,
    type: 'download',
    link: '#download-tailwind-mastery',
    description: 'Learn to build beautiful, responsive UIs rapidly with the power of Tailwind CSS utility classes.'
  },
  {
    id: 'p1',
    category: 'pdfs',
    title: 'React Hooks Cheatsheet',
    icon: <FaFilePdf className="text-blue-600" />,
    type: 'view',
    link: '#view-hooks-cheatsheet',
    description: 'A quick reference guide for all essential React Hooks and their usage examples.'
  },
  {
    id: 'p2',
    category: 'pdfs',
    title: 'Web Development Roadmap',
    icon: <FaFilePdf className="text-blue-600" />,
    type: 'download',
    link: '#download-roadmap-pdf',
    description: 'A step-by-step roadmap for aspiring web developers, outlining key technologies and learning paths.'
  },
  {
    id: 'p3',
    category: 'pdfs',
    title: 'ES6+ Features Overview',
    icon: <FaFilePdf className="text-blue-600" />,
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

const FreeResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('e-books');

  const filteredResources = resources.filter(
    (resource) => resource.category === activeCategory
  );

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-purple-100 font-sans antialiased text-gray-900 py-12 overflow-hidden">
        {/* Decorative background shapes for more visual interest */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: 1, duration: 2 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: 1.2, duration: 2 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: 1.4, duration: 2 }}
        ></motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-center mb-12 drop-shadow-lg bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, #2563eb, #6366f1)`
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock Free Resources
          </motion.h1>

          {/* Category Tabs */}
          <ResourceCategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          {/* Resource Cards Grid */}
          <ResourceGrid filteredResources={filteredResources} />
        </div>
      </div>
      <PracticeTestPromo />
      <FAQSection />
      <Footer />
    </>
  );
};

export default FreeResourcesPage;