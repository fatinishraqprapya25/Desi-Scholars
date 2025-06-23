import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const tutorials = [
  {
    icon: <FaHtml5 className="w-10 h-10 text-orange-400" />,
    title: 'HTML Essentials',
    description: 'Master the building blocks of the web.', // Decreased content
    link: '#',
  },
  {
    icon: <FaCss3 className="w-10 h-10 text-blue-400" />,
    title: 'CSS Styling', // Shortened title
    description: 'Style your web pages beautifully.', // Decreased content
    link: '#',
  },
  {
    icon: <FaReact className="w-10 h-10 text-cyan-400" />,
    title: 'React Basics', // Shortened title
    description: 'Kickstart your journey with React.', // Decreased content
    link: '#',
  },
  {
    icon: <FaNodeJs className="w-10 h-10 text-green-400" />,
    title: 'Node.js Intro', // Shortened title
    description: 'Server-side JavaScript made easy.', // Decreased content
    link: '#',
  },
];

const TutorialsSection = () => {
  const accentPurple = '#8A4AF8';
  const lightPurpleBg = 'linear-gradient(to bottom right, #F5F3FF, #E0D7FA)';

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const textChildVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardChildVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="py-16 sm:py-20 lg:py-28 overflow-hidden font-sans relative"
      style={{ background: lightPurpleBg }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      {/* Decorative background shapes/blobs for modern look */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob lg:w-96 lg:h-96"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 lg:w-80 lg:h-80"></div>
      <div className="absolute top-1/4 left-1/2 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 lg:w-60 lg:h-60"></div>


      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-8 lg:px-12 relative z-10">

        {/* Left Side - Text and SVG Illustration (PNG representation) */}
        <motion.div
          className="text-center md:text-left"
          variants={textChildVariants}
        >

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight">
            Unlock New Skills with Our <br /><span style={{ color: accentPurple }}>Awesome Tutorials</span>
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg lg:text-xl max-w-xl md:max-w-none mx-auto md:mx-0">
            Dive into web development with our **concise, practical, and highly engaging tutorials**. Whether you're a beginner or looking to sharpen your skills, we've got you covered.
          </p>
          <Link to="/resources"
            className={`mt-8 inline-flex items-center text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
               text-white bg-[#7A3BD5]`}
          >
            Explore All Resources
            <FaArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Right Side - Tutorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {tutorials.map((tutorial, index) => (
            <motion.a
              href={tutorial.link}
              key={index}
              className={`bg-white rounded-2xl p-7 shadow-2xl flex flex-col items-start border-2 border-transparent hover:border-[${accentPurple}] cursor-pointer relative overflow-hidden group transition-all duration-300 ease-in-out`}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: '0px 25px 50px rgba(0, 0, 0, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
              variants={cardChildVariants}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              {/* Subtle inner glow on hover, matching accent color */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[${accentPurple}] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>

              <div className="mb-5 text-white p-4 rounded-xl bg-gradient-to-br from-[#4A0E7A] to-[#6F219F] flex items-center justify-center shadow-lg border border-purple-700">
                {tutorial.icon}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 leading-snug">
                {tutorial.title}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base mb-5 flex-grow">
                {tutorial.description}
              </p>
              <div
                className={`mt-auto inline-flex items-center text-md font-semibold text-[${accentPurple}] group-hover:text-[#7A3BD5] transition-colors duration-300`}
              >
                Start Learning
                <FaArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialsSection;