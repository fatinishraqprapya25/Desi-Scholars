import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award, Clock, HelpCircle, BookOpen, PlayCircle, ChevronsRight } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

// Mock data for practice tests
const practiceTestsData = [
    {
        id: 'web-dev-quiz',
        title: 'Web Development Fundamentals',
        description: 'Test your understanding of HTML, CSS, and basic JavaScript concepts. Essential for beginners.',
        difficulty: 'Beginner',
        questions: 20,
        timeLimit: '30 min',
        icon: 'https://placehold.co/60x60/E0F2F7/2196F3?text=WEB', // Placeholder image for icon
        color: 'from-blue-100 to-blue-200',
        iconColor: 'text-blue-600'
    },
    {
        id: 'react-basics',
        title: 'React.js Core Concepts',
        description: 'Assess your knowledge of React components, state, props, and hooks. Build interactive UIs.',
        difficulty: 'Intermediate',
        questions: 15,
        timeLimit: '25 min',
        icon: 'https://placehold.co/60x60/E8F5E9/4CAF50?text=RJS',
        color: 'from-green-100 to-green-200',
        iconColor: 'text-green-600'
    },
    {
        id: 'data-structures',
        title: 'Data Structures & Algorithms',
        description: 'Challenge your problem-solving skills with common data structures and algorithms. Crucial for interviews.',
        difficulty: 'Advanced',
        questions: 10,
        timeLimit: '45 min',
        icon: 'https://placehold.co/60x60/FFF3E0/FF9800?text=DSA',
        color: 'from-orange-100 to-orange-200',
        iconColor: 'text-orange-600'
    },
    {
        id: 'javascript-es6',
        title: 'Modern JavaScript (ES6+)',
        description: 'Evaluate your proficiency in ES6+ features like arrow functions, destructuring, and async/await. Stay updated.',
        difficulty: 'Intermediate',
        questions: 20,
        timeLimit: '30 min',
        icon: 'https://placehold.co/60x60/FCE4EC/E91E63?text=JS',
        color: 'from-pink-100 to-pink-200',
        iconColor: 'text-pink-600'
    },
    {
        id: 'css-flex-grid',
        title: 'CSS Layouts: Flexbox & Grid',
        description: 'Test your ability to create responsive and complex layouts using modern CSS techniques. Design like a pro.',
        difficulty: 'Intermediate',
        questions: 15,
        timeLimit: '20 min',
        icon: 'https://placehold.co/60x60/E3F2FD/2196F3?text=CSS',
        color: 'from-cyan-100 to-cyan-200',
        iconColor: 'text-cyan-600'
    },
    {
        id: 'python-basics',
        title: 'Python Programming Basics',
        description: 'Fundamental concepts of Python programming, including syntax, data types, and control flow.',
        difficulty: 'Beginner',
        questions: 25,
        timeLimit: '35 min',
        icon: 'https://placehold.co/60x60/D1C4E9/673AB7?text=PY',
        color: 'from-purple-100 to-purple-200',
        iconColor: 'text-purple-600'
    },
];

function PracticeTestPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h3 className="text-3xl mt-3 font-extrabold text-gray-800 mb-4 flex items-center">
                    <FileText className="mr-3 h-8 w-8 text-blue-600" /> Practice Tests
                </h3>
                <p className="text-gray-700 text-lg mb-10 max-w-2xl">
                    Sharpen your skills and prepare for success with our comprehensive collection of practice tests. Choose a test below to get started!
                </p>

                {/* Test Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                    variants={sectionVariants} // Using sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {practiceTestsData.map((test, index) => (
                        <motion.div
                            key={test.id}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
                                   hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
                            variants={cardVariants} // Use cardVariants for individual card animation
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Icon/Image Section */}
                            <div className={`p-6 flex items-center justify-center rounded-t-2xl bg-gradient-to-br ${test.color}`}>

                                <img src={test.icon} alt={test.title} className="w-16 h-16 object-contain" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow"> {/* Added flex-grow */}
                                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{test.title}</h4>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">{test.description}</p> {/* Added flex-grow */}
                                <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4 gap-y-2">
                                    <span className="flex items-center">
                                        <HelpCircle className="h-4 w-4 mr-1 text-gray-500" /> {test.difficulty}
                                    </span>
                                    <span className="flex items-center">
                                        <BookOpen className="h-4 w-4 mr-1 text-gray-500" /> {test.questions} Questions
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1 text-gray-500" /> {test.timeLimit}
                                    </span>
                                </div>
                                <button
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg
                                           hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                                           flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95 mt-auto" // mt-auto to push button to bottom
                                >
                                    <PlayCircle className="mr-2 h-5 w-5" /> Start Test
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.section>
        </UserDashboardContainer>
    );
}

export default PracticeTestPage;
