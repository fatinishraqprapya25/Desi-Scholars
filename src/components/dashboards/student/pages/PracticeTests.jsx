import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../practicetests/PageHeader';
import PracticeTestCard from '../practicetests/PracticeTestCard';

const practiceTestsData = [
    {
        id: 'web-dev-quiz',
        title: 'Web Development Fundamentals',
        description: 'Test your understanding of HTML, CSS, and basic JavaScript concepts. Essential for beginners.',
        difficulty: 'Beginner',
        questions: 20,
        timeLimit: '30 min',
        icon: 'https://placehold.co/60x60/E0F2F7/2196F3?text=WEB',
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

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader />

                {/* Test Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                    variants={sectionVariants} // Using sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {practiceTestsData.map((test, index) => (
                        <PracticeTestCard key={test.id} test={test} index={index} />
                    ))}
                </motion.div>
            </motion.section>
        </UserDashboardContainer>
    );
}

export default PracticeTestPage;