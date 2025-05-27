import React, { useState } from 'react';
import { FaStar, FaClock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../common/Header'; // Assuming Header component exists at this path
import Footer from '../common/Footer'; // Assuming Footer component exists at this path

// AccordionItem component for the course outline section
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-gray-200 rounded-xl mb-3 overflow-hidden shadow-sm"
      initial={false}
      animate={{ boxShadow: isOpen ? "0 8px 15px rgba(0,0,0,0.1)" : "0 2px 5px rgba(0,0,0,0.05)" }} // Subtle shadow change on open
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 bg-purple-50 hover:bg-purple-100 font-semibold text-purple-800 focus:outline-none transition-colors duration-200 flex justify-between items-center text-lg"
      >
        <span>{title}</span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={{ opacity: 0, maxHeight: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, maxHeight: isOpen ? '500px' : '0px' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden bg-white text-gray-700 border-t border-gray-200"
      >
        <div className="px-5 py-4 text-base leading-relaxed">
          {content}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ReviewCard component for individual student reviews
const ReviewCard = ({ name, platform, comment, rating }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-xl border border-purple-100 cursor-pointer flex flex-col h-full"
      whileHover={{ scale: 1.03, boxShadow: "0 18px 30px -8px rgba(0, 0, 0, 0.2), 0 10px 15px -7px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaUser className="mr-4 text-purple-700 text-3xl" />
          <div>
            <p className="font-bold text-gray-900 text-lg">{name}</p>
            <p className="text-sm text-gray-500">{platform}</p>
          </div>
        </div>
        {rating && (
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} />
            ))}
          </div>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed text-base flex-grow">"{truncateText(comment, 150)}"</p>
    </motion.div>
  );
};

// Main CourseDetailsPage component
const CourseDetailsPage = () => {
  const allStudentReviews = [
    {
      name: "Rafe Uddaraj Official",
      platform: "commented on Youtube",
      comment: "This course is a game-changer! I never thought I'd find such high-quality content in Bangladesh. The instructor's explanations are incredibly clear, and the practical projects helped solidify my understanding of React. My flex-box concept is now crystal clear. Highly recommended for anyone looking to master web development!",
      rating: 5,
    },
    {
      name: "Md Shoharab PK",
      platform: "comment:ed on Facebook",
      comment: "Truly, sir, the animations in your videos make everything so much easier to understand. I know how much effort goes into editing a video like this (I worked on video editing for a short time, so I understand the sweat and tears). Best wishes!",
      rating: 5,
    },
    {
      name: "Tanvirul Islam",
      platform: "commented on Facebook",
      comment: "Your videos and other channels' videos have a completely different explanation process. It's just mind-blowing! We always look forward to such videos from you.",
      rating: 5,
    },
    {
      name: "Md Sazzad Hossain",
      platform: "commented on Facebook",
      comment: "Your Node.js videos have been incredibly helpful. The content quality is far superior to any paid course. This video series has genuinely benefited me. And your theme... I've tried many themes, but yours is so well-suited to my setup that I can't uninstall it. Thank you for your efforts. You can't satisfy everyone, so simply ignore them.",
      rating: 5,
    },
    {
      name: "Cloud Fury",
      platform: "commented on Youtube",
      comment: "Dear Sumit, I had to reach out with massive appreciation. I am in awe of your teaching, communication, visual, technical skills, and knowledge. This is a truly fantastic video, so well constructed and perfectly delivered. Just amazing! I am neither a native Bangla speaker nor very technical (UK based Sylheti, and dabble a little in web development), but this video was just perfect. I really enjoyed it – huge thanks!",
      rating: 5,
    },
    {
      name: "Shahidul Islam Zahid",
      platform: "commented on Facebook",
      comment: "In one word, this playlist is WOW! The 6th video, which was 67 minutes long, even though it was basic, every minute of those 67 minutes will be useful in life. I learned some great things. I hope as you continue to move forward with solutions to complex problems, we will also not give up, because we are exploring, and it just appears before our eyes. I would say this series is the coolest playlist.",
      rating: 5,
    },
    {
      name: "Mohammad Sayed",
      platform: "commented on Youtube",
      comment: "I was simply mesmerized after watching this #69 episode. The Creator gives such beautiful explaining power to very few people. Many blessings and good wishes for Sumit Sir from Acharya Paksha. May Allah Subhanahu Wa Ta'ala increase your knowledge so that people can benefit more and more from you day by day.",
      rating: 5,
    },
    {
      name: "Abid Hasan",
      platform: "commented on Youtube",
      comment: "I typed and backspaced every time trying to describe you as a teacher. Can't describe actually. You are such a great teacher. Someone from Bangladesh doing 'this' great. Thank You.",
      rating: 5,
    },
    {
      name: "শাফায়াত ইসলাম সোহান",
      platform: "commented on Facebook",
      comment: "Brother, please stay by our side like this. Insha'Allah, we will also stay. We are greatly benefiting from your gifts. We request you not to stop giving us these gifts, otherwise, we will be greatly harmed...",
      rating: 5,
    },
    {
      name: "Nazmul Hasan",
      platform: "commented on Youtube",
      comment: "Excellent content! The way you break down complex topics is truly remarkable. I've learned so much from your tutorials. Keep up the fantastic work!",
      rating: 4,
    },
    {
      name: "Fahim Ahmed",
      platform: "commented on Facebook",
      comment: "This course has significantly improved my coding skills. The explanations are clear, and the examples are practical. Highly recommend it to anyone serious about React.",
      rating: 5,
    },
    {
      name: "Israt Jahan",
      platform: "commented on Youtube",
      comment: "I appreciate the effort put into making these videos. They are very comprehensive and easy to follow. A must-watch for beginners and intermediates alike.",
      rating: 4,
    },
  ];

  const [visibleReviews, setVisibleReviews] = useState(6);
  const reviewsPerPage = 6;

  const handleLoadMore = () => {
    setVisibleReviews(prevCount => prevCount + reviewsPerPage);
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
        <main className="pb-10">
          {/* Combined Course Banner and Overview Section - Enhanced */}
          <motion.div
            className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 shadow-2xl mb-8 py-16 md:py-20 overflow-hidden relative"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ minHeight: '550px', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)' }} // Increased minHeight and dynamic shape
            whileHover={{ scale: 1.005, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
          >
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm12 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4H10v4H6v2h4v4h2v-4h4v-2h-4zm0-30V0H10v4H6v2h4v4h2V6h4V4h-4zm12 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 54v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V20h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 54v-4H10v4H6v2h4v4h2v-4h4v-2h-4zM24 44v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm24 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM24 4v-4h-2v4h-4v2h4v4h2V6h4V4h-4zm24 0v-4h-2v4h-4v2h4v4h2V6h4V4h-4zm0 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 44v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 44v-4H10v4H6v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            <div className="max-w-6xl mx-auto px-4 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between z-10 relative">
              <div className="md:w-2/3">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-3 drop-shadow-2xl leading-tight">Master React for Web Development</h1>
                <p className="text-lg md:text-xl opacity-95 mb-4">
                  Unlock the power of modern web development. This comprehensive course takes you from foundational concepts to advanced techniques, enabling you to build dynamic and responsive user interfaces with confidence.
                </p>
                <p className="text-md md:text-lg opacity-85 mb-8">
                  Dive deep into state management, routing, API integration, and performance optimization. Perfect for aspiring developers and those looking to level up their React skills. Enroll today and transform your coding journey!
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start text-white space-y-2 md:space-y-0 md:space-x-6 mb-10">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-purple-200" /> <span className="font-semibold">John Doe</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-purple-200" /> <span className="font-semibold">12h 30m of video content</span>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5" />
                    ))}
                    <span className="ml-2 font-semibold">4.8 (1,230 ratings)</span>
                  </div>
                </div>

                {/* Enroll Button */}
                <motion.button
                  whileHover={{ scale: 1.07, y: -5, boxShadow: "0 15px 30px rgba(128, 0, 128, 0.6)" }}
                  whileTap={{ scale: 0.93 }}
                  className="bg-white text-purple-800 px-12 py-5 rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 text-xl font-bold transform hover:rotate-1"
                >
                  Enroll Now for $49.99
                </motion.button>
              </div>

              {/* Instructor Image */}
              <motion.div
                className="md:w-1/3 mt-10 md:mt-0 flex justify-center items-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="https://placehold.co/300x300/FFFFFF/6A0DAD?text=Instructor"
                  alt="Instructor"
                  className="rounded-full border-6 border-white shadow-2xl w-64 h-64 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/FFFFFF/6A0DAD?text=No+Image"; }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Course Content Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mt-12"> {/* Increased top margin */}
            {/* Left Column: Course Outline, Requirements */}
            <div className="md:col-span-2">
              {/* Course Outline (Accordion) */}
              <section className="mb-10 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"> {/* Stronger shadow, more padding, rounded-2xl */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Course Outline</h2> {/* Increased bottom margin */}
                <AccordionItem title="Module 1: Introduction to React" content="Learn the fundamentals of React, including JSX syntax, functional components, and props. Understand the component-based architecture and how to set up your development environment." />
                <AccordionItem title="Module 2: State & Lifecycle" content="Dive deep into React state management using the useState hook. Explore the component lifecycle with useEffect and learn how to manage side effects in your applications." />
                <AccordionItem title="Module 3: Routing and Navigation" content="Implement client-side routing with React Router DOM. Learn to create dynamic routes, nested routes, and handle navigation within your single-page applications." />
                <AccordionItem title="Module 4: Advanced Concepts" content="Master advanced React patterns such as the Context API for global state management, custom hooks for reusable logic, and performance optimization techniques like memoization." />
                <AccordionItem title="Module 5: Working with APIs" content="Integrate your React applications with backend APIs. Learn data fetching, error handling, and displaying dynamic content from external sources." />
              </section>

              {/* Requirements */}
              <section className="mb-10 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"> {/* Stronger shadow, more padding, rounded-2xl */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Requirements</h2> {/* Increased bottom margin */}
                <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
                  <li><span className="font-medium">Basic understanding of HTML, CSS, and JavaScript.</span></li>
                  <li><span className="font-medium">Familiarity with ES6+ features (e.g., arrow functions, destructuring).</span></li>
                  <li><span className="font-medium">A code editor (VS Code recommended) and a modern web browser.</span></li>
                  <li><span className="font-medium">Node.js and npm/yarn installed on your machine.</span></li>
                  <li><span className="font-medium">No prior React experience is required, but a willingness to learn is essential!</span></li>
                </ul>
              </section>
            </div>

            {/* Right Column: Related Courses Carousel */}
            <div className="md:col-span-1">
              <section className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"> {/* Stronger shadow, more padding, rounded-2xl */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Related Courses</h2> {/* Increased bottom margin */}
                <div className="space-y-6"> {/* Increased space between cards */}
                  <motion.div
                    className="bg-purple-50 p-5 rounded-lg shadow-md border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer" // Increased padding, stronger shadow
                    whileHover={{ scale: 1.03, y: -3 }} // More pronounced hover effect
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-lg text-purple-800 mb-2">Advanced JavaScript Concepts</h3> {/* Increased bottom margin */}
                    <p className="text-sm text-gray-700">Deep dive into closures, prototypes, and async JS.</p>
                    <div className="flex items-center text-yellow-500 text-sm mt-3"> {/* Increased top margin */}
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="w-4 h-4" />)}
                      <span className="ml-1 text-gray-800 font-medium">4.9 (800)</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-purple-50 p-5 rounded-lg shadow-md border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.03, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-lg text-purple-800 mb-2">Fullstack Node.js & Express</h3>
                    <p className="text-sm text-gray-700">Build robust backend APIs with Node.js.</p>
                    <div className="flex items-center text-yellow-500 text-sm mt-3">
                      {[...Array(4)].map((_, i) => <FaStar key={i} className="w-4 h-4" />)}
                      <FaStar key={4} className="w-4 h-4 text-gray-300" />
                      <span className="ml-1 text-gray-800">4.7 (1,500)</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-purple-50 p-5 rounded-lg shadow-md border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.03, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-lg text-purple-800 mb-2">Modern CSS & Tailwind CSS</h3>
                    <p className="text-sm text-gray-700">Master responsive design with Tailwind.</p>
                    <div className="flex items-center text-yellow-500 text-sm mt-3">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="w-4 h-4" />)}
                      <span className="ml-1 text-gray-800 font-medium">5.0 (650)</span>
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Student Reviews - Enhanced Section */}
        <section className="mt-12 py-10 px-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-2xl border border-purple-200"> {/* Lighter gradient, increased padding */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-900 mb-10 drop-shadow-md">What Our Students Say</h2> {/* Increased bottom margin */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap */}
              {allStudentReviews.slice(0, visibleReviews).map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  platform={review.platform}
                  comment={review.comment}
                  rating={review.rating}
                />
              ))}
            </div>
            {visibleReviews < allStudentReviews.length && (
              <div className="text-center mt-12"> {/* Increased top margin */}
                <motion.button
                  whileHover={{ scale: 1.07, y: -3 }} // More pronounced hover
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLoadMore}
                  className="bg-purple-700 text-white px-10 py-4 rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300 text-lg font-semibold" // Stronger button color
                >
                  Load More Reviews
                </motion.button>
              </div>
            )}
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
};

export default CourseDetailsPage;
