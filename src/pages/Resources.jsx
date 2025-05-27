import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaFilePdf, FaPlayCircle } from 'react-icons/fa'; // Icons for categories
import Header from '../components/common/Header'; // Assuming Header component exists at this path
import Footer from '../components/common/Footer'; // Assuming Footer component exists at this path
import ResourceCategoryTabs from '../components/resources/ResourceCategoryTabs'; // New component import
import ResourceGrid from '../components/resources/ResourceGrid'; // New component import

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
          <ResourceCategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          {/* Resource Cards Grid */}
          <ResourceGrid filteredResources={filteredResources} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreeResourcesPage;
