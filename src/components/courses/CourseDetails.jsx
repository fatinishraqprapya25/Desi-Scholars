import React, { useEffect, useState } from 'react';
import { FaStar, FaClock, FaUser, FaChevronRight, FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../common/Header'; // Assuming Header component exists at this path
import Footer from '../common/Footer'; // Assuming Footer component exists at this path
import { Link, useParams } from 'react-router-dom';
import WhatUWillLearn from './WhatUWillLearn';

// Animation variants for sections to appear when scrolled into view
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.1,
      when: "beforeChildren", // Animate children after parent
    },
  },
};

// Animation variants for individual list items or cards
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// AccordionItem component for the course outline section
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-purple-200 rounded-2xl mb-4 overflow-hidden shadow-lg bg-white"
      initial={false}
      animate={{ boxShadow: isOpen ? "0 10px 20px rgba(0,0,0,0.15)" : "0 5px 10px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 bg-purple-100 hover:bg-purple-200 font-semibold text-purple-900 focus:outline-none transition-colors duration-200 flex justify-between items-center text-lg md:text-xl"
      >
        <span>{title}</span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronRight className="w-6 h-6 text-purple-700" />
        </motion.span>
      </button>
      <motion.div
        initial={{ opacity: 0, maxHeight: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, maxHeight: isOpen ? '500px' : '0px' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden bg-white text-gray-800 border-t border-gray-200"
      >
        <div className="px-6 py-5 text-base leading-relaxed">
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
      className="p-8 bg-white rounded-3xl shadow-2xl border border-purple-100 cursor-pointer flex flex-col h-full transform hover:scale-105 transition-all duration-300"
      whileHover={{ boxShadow: "0 25px 40px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.15)" }}
      transition={{ duration: 0.3 }}
      variants={itemVariants} // Apply item variants for staggered entrance
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <FaUser className="mr-5 text-purple-800 text-4xl" />
          <div>
            <p className="font-extrabold text-gray-900 text-xl">{name}</p>
            <p className="text-sm text-gray-600">{platform}</p>
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
      <p className="text-gray-700 leading-relaxed text-base flex-grow">"{truncateText(comment, 180)}"</p>
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
      name: "শাফায়াত ইসলাম সোহান",
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

  const adminToken = localStorage.getItem("ASDFDKFFJF");

  const [courseDetails, setCourseDetails] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [modules, setModules] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const { id } = useParams();


  // Effect to fetch initial course data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch current course details
        const courseResponse = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (!courseResponse.ok) {
          throw new Error("Failed to fetch course details.");
        }
        const courseResult = await courseResponse.json();
        if (!courseResult.success) {
          throw new Error(courseResult.message || "Failed to fetch course details.");
        }
        setCourseDetails(courseResult.data);

        // Fetch instructor details
        if (courseResult.data && courseResult.data.instructorId) {
          const instructorResponse = await fetch(`http://localhost:5000/api/teacher/${courseResult.data.instructorId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${adminToken}`
            }
          });
          if (!instructorResponse.ok) {
            throw new Error("Failed to fetch instructor information.");
          }
          const instructorResult = await instructorResponse.json();
          if (!instructorResult.success) {
            throw new Error(instructorResult.message || "Failed to fetch instructor information.");
          }
          setInstructorDetails(instructorResult.data);
        }

        // Fetch modules
        const modulesResponse = await fetch(`http://localhost:5000/api/modules/${id}`);
        if (!modulesResponse.ok) {
          throw new Error("Failed to fetch modules.");
        }
        const modulesResult = await modulesResponse.json();
        if (!modulesResult.success) {
          throw new Error(modulesResult.message || "Failed to fetch modules.");
        }
        setModules(modulesResult.data);

      } catch (error) {
        console.error("Error fetching course-specific data:", error);
        alert(error.message);
      }
    };

    fetchInitialData();
  }, [id, adminToken]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const allCoursesResponse = await fetch(`http://localhost:5000/api/courses/c/two`);
        if (!allCoursesResponse.ok) {
          throw new Error("Failed to fetch all courses.");
        }
        const allCoursesResult = await allCoursesResponse.json();
        if (!allCoursesResult.success) {
          throw new Error(allCoursesResult.message || "Failed to fetch all courses.");
        }
        setAllCourses(allCoursesResult.data);
      } catch (error) {
        console.error("Error fetching all courses:", error);
      }
    };
    fetchAllCourses();
  }, []);


  useEffect(() => {


  }, []);


  const handleLoadMore = () => {
    setVisibleReviews(prevCount => prevCount + reviewsPerPage);
  };

  if (!courseDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading course details...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 font-sans antialiased text-gray-900">
        <main className="pb-10">
          {/* Combined Course Banner and Overview Section */}
          <motion.div
            className="w-full bg-gradient-to-br from-purple-800 to-indigo-900 shadow-3xl mb-12 py-20 md:py-28 overflow-hidden relative"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ minHeight: '600px', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)' }}
            whileHover={{ scale: 1.002, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
          >
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
              <svg className="absolute top-1/4 left-1/4 w-32 h-32 text-purple-300 transform rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 13.293a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3z" /></svg>
              <svg className="absolute bottom-1/3 right-1/4 w-48 h-48 text-indigo-300 transform -rotate-30" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" /></svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between z-10 relative">
              <div className="md:w-3/5 lg:w-2/3">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-3xl leading-tight">{courseDetails.courseName}</h1>
                <p className="text-xl md:text-2xl opacity-95 mb-5 font-light">
                  {courseDetails.description}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start text-white space-y-3 md:space-y-0 md:space-x-8 mb-12">
                  <div className="flex items-center">
                    <FaUser className="mr-3 text-purple-300 text-xl" /> <span className="font-semibold text-lg">
                      {instructorDetails ? instructorDetails.name : "Loading Instructor..."}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-3 text-purple-300 text-xl" /> <span className="font-semibold text-lg">
                      {courseDetails.duration}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5" />
                    ))}
                    <span className="ml-2 font-semibold text-lg">{courseDetails.ratings.length} ratings</span>
                  </div>
                </div>

                {/* Enroll Button */}
                <Link to={`/checkout/${id}`}> <motion.button
                  whileHover={{ scale: 1.1, y: -7, boxShadow: "0 20px 40px rgba(128, 0, 128, 0.8)" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-purple-900 px-14 py-6 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300 text-2xl font-extrabold transform hover:rotate-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Enroll Now</span>
                </motion.button></Link>
              </div>

              <motion.div
                className="md:w-2/5 lg:w-1/3 mt-12 md:mt-0 flex justify-center items-center relative"
                initial={{ opacity: 0, x: 50, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                whileHover={{ rotate: 8, scale: 1.15, y: -10 }}
              >
                <div className="absolute inset-0 bg-white rounded-full opacity-10 transform scale-125"></div>
                <img
                  src={instructorDetails?.profilePicture || "https://placehold.co/350x350/FFFFFF/6A0DAD?text=Instructor"}
                  alt={instructorDetails?.name || "Instructor"}
                  className="rounded-full border-8 border-white shadow-3xl w-72 h-72 object-cover relative z-10"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/350x350/FFFFFF/6A0DAD?text=No+Image"; }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* What You'll Learn Section */}
          <WhatUWillLearn id={id} />

          {/* Course Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 mt-16">
            {/* Left Column: Course Outline */}
            <div className="md:col-span-2">
              <motion.section
                className="mb-12 bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Course Outline</h2>
                <div className="space-y-6">
                  {modules.length > 0 ? (
                    modules.map((module) => (
                      <AccordionItem key={module._id} title={module.moduleName} content={module.description} />
                    ))
                  ) : (
                    <p className="text-gray-600">No modules available for this course yet.</p>
                  )}
                </div>
              </motion.section>
            </div>

            {/* Right Column: Related Courses */}
            <div className="md:col-span-1">
              <motion.section
                className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Related Courses</h2>
                <motion.div
                  className="space-y-8"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {allCourses.length > 0 ? (
                    allCourses.map((course) => (
                      <Link to={`/courses/${course._id}`} key={course._id}>
                        {/* Added key to motion.div to help React in re-rendering specific items */}
                        <motion.div
                          key={course._id}
                          className="bg-purple-50 p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-103 mb-4"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                          variants={itemVariants}
                        >
                          <h3 className="font-extrabold text-xl text-purple-800 mb-3">{course.courseName}</h3>
                          <p className="text-base text-gray-700">
                            {course.description ? course.description.substring(0, 70) + '...' : 'No description available.'}
                          </p>

                        </motion.div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-600">No related courses available.</p>
                  )}
                </motion.div>
              </motion.section>
            </div>
          </div>

          {/* Meet Your Instructor Section */}
          <motion.section
            className="max-w-7xl mx-auto px-6 mt-16 mb-12 bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.7, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-purple-200 rounded-full opacity-30 transform scale-110 blur-xl"></div>
              <img
                src={instructorDetails?.profilePicture || "https://placehold.co/250x250/6A0DAD/FFFFFF?text=Instructor+Image"}
                alt={instructorDetails?.name || "Instructor Image"}
                className="rounded-full border-6 border-purple-400 shadow-xl w-60 h-60 object-cover mx-auto md:mx-0 relative z-10"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/250x250/6A0DAD/FFFFFF?text=No+Image"; }}
              />
            </motion.div>
            <motion.div
              className="flex-grow text-center md:text-left"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold mb-4 text-purple-900">Meet Your Instructor: {instructorDetails ? instructorDetails.name : "Loading..."}</motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-800 mb-5">
                {instructorDetails ? instructorDetails.about : "Loading instructor description..."}
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed mb-6">
                {instructorDetails ? instructorDetails.experience : "Loading instructor experience..."}
              </motion.p>
              <motion.div
                className="flex justify-center md:justify-start space-x-4"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {instructorDetails?.linkedin && (
                  <motion.a
                    href={instructorDetails.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-blue-700 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-800 transition-all duration-300 transform"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <FaLinkedinIn className="mr-2 text-lg" /> LinkedIn
                  </motion.a>
                )}
                {instructorDetails?.github && (
                  <motion.a
                    href={instructorDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-700 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 transform"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <FaGithub className="mr-2 text-lg" /> GitHub
                  </motion.a>
                )}
                {instructorDetails?.youtube && (
                  <motion.a
                    href={instructorDetails.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-red-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 transition-all duration-300 transform"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <FaYoutube className="mr-2 text-lg" /> YouTube
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Student Reviews Section */}
          <motion.section
            className="max-w-7xl mx-auto px-6 mt-16 mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold mb-10 text-center text-purple-900">What Our Students Say</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {allStudentReviews.slice(0, visibleReviews).map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </motion.div>
            {visibleReviews < allStudentReviews.length && (
              <div className="text-center mt-12">
                <motion.button
                  onClick={handleLoadMore}
                  className="bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-purple-800 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(128, 0, 128, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Reviews
                </motion.button>
              </div>
            )}
          </motion.section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CourseDetailsPage;