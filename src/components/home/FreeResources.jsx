import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3 } from 'react-icons/fa';

const tutorials = [
  {
    icon: <FaHtml5 className="w-10 h-10 text-orange-500" />, // HTML5 logo
    title: 'HTML Essentials',
    description: 'Master the building blocks of the web.',
    link: '#',
  },
  {
    icon: <FaCss3 className="w-10 h-10 text-blue-400" />, // CSS3 logo
    title: 'CSS Styling',
    description: 'Style your web pages beautifully.',
    link: '#',
  },
  {
    icon: <FaReact className="w-10 h-10 text-cyan-400" />, // React logo
    title: 'React Basics',
    description: 'Kickstart your journey with React.',
    link: '#',
  },
  {
    icon: <FaNodeJs className="w-10 h-10 text-green-400" />, // Node.js logo
    title: 'Node.js Intro',
    description: 'Server-side JavaScript made easy.',
    link: '#',
  },
];

const TutorialsSection = () => {
  const accentPurple = '#8A4AF8'; // Dominant purple from your website's theme

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg-gradient-to-br from-[#EAEFFF] to-[#E0D7FA] py-16 sm:py-20 lg:py-24 overflow-hidden font-sans"> {/* Light purple gradient background */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-8 lg:px-12">

        {/* Left Side - Text and SVG Illustration (PNG representation) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={textVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center md:text-left"
        >
          {/* Using the SVG illustration (from Screenshot_2.png) as a PNG.
              The colors of this SVG naturally fit your purple theme. */}
          <img
            src="https://i.ibb.co/L6V2V79/Screenshot-2.png"
            alt="Person working on a laptop, an illustration matching website theme"
            className="max-w-[280px] md:max-w-[350px] lg:max-w-[400px] mx-auto md:mx-0 mb-8 drop-shadow-lg"
          />
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight"> {/* Dark text for light background */}
            Quick Start <span className="text-[${accentPurple}]">Coding Tutorials</span> {/* Accent purple for highlight */}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg lg:text-xl max-w-xl md:max-w-none mx-auto md:mx-0"> {/* Darker grey for body text */}
            Jump in and learn new skills with our concise and impactful tutorials. Perfect for mastering web development basics.
          </p>
        </motion.div>

        {/* Right Side - Tutorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"> {/* Decreased gap among cards */}
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              className="bg-[#21233F] rounded-xl p-6 shadow-xl flex flex-col items-start border border-transparent hover:border-[${accentPurple}] cursor-pointer relative overflow-hidden group transition-all duration-300 ease-in-out" /* Dark card background, accent purple border on hover */
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              transition={{ delay: index * 0.15 }}
            >
              {/* Subtle inner glow on hover, matching accent color */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[${accentPurple}] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>

              <div className="mb-4 text-white p-3 rounded-lg bg-[#3A3C5C] flex items-center justify-center shadow-md border border-gray-700"> {/* Icon background darker than card */}
                {tutorial.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 leading-snug"> {/* White text on dark card */}
                {tutorial.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 flex-grow"> {/* Lighter gray for description on dark card */}
                {tutorial.description}
              </p>
              <a
                href={tutorial.link}
                className="mt-auto inline-flex items-center bg-[${accentPurple}] hover:bg-[#7A3BD5] text-white font-medium py-2.5 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md" /* Vibrant purple button */
              >
                Learn Now
                <svg
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsSection;