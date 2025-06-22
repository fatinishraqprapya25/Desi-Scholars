import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Mock data for the questions section
const questionsData = [
    {
        id: '1443',
        subject: 'English',
        topics: [
            { id: 375, name: 'Craft and Structure' },
            { id: 31, name: 'Cross Text Connections' },
            { id: 117, name: 'Text Structure and Purpose' },
            { id: 225, name: 'Words in Context' },
            { id: 309, name: 'Expression of Ideas' },
            { id: 281, name: 'Rhetorical Synthesis' },
            { id: 348, name: 'Transitions' },
            { id: 432, name: 'Information and Ideas' },
            { id: 106, name: 'Central Ideas and Details' },
            { id: 243, name: 'Command of Evidence' },
            { id: 105, name: 'Inferences' },
            { id: 327, name: 'Standard English Conventions' },
            { id: 297, name: 'Boundaries' },
            { id: 362, name: 'Form, Structure, and Sense' },
        ],
    },
    {
        id: '1555',
        subject: 'Math',
        topics: [
            { id: 319, name: 'Algebra' },
            { id: 95, name: 'Linear equations in one variable' },
            { id: 142, name: 'Linear functions' },
            { id: 111, name: 'Linear equations in two variables' },
            { id: 108, name: 'Systems of two linear equations in two variables' },
            { id: 83, name: 'Linear inequalities in one or two variables' },
            { id: 447, name: 'Advanced Math' },
            { id: 98, name: 'Equivalent expressions' },
            { id: 188, name: 'Nonlinear equations in one variable and systems of equations in two variables' },
            { id: 211, name: 'Nonlinear functions' },
            { id: 344, name: 'Problem Solving and Data Analysis' },
            { id: 81, name: 'Ratios, rates, proportional relationships, and units' },
            { id: 24, name: 'Percentages' },
            { id: 77, name: 'One variable data: Distributions and measures of center and spread' },
            { id: 63, name: 'Two variable data: Models and scatterplots' },
            { id: 43, name: 'Probability and conditional probability' },
            { id: 24, name: 'Inference from sample statistics and margin of error' },
            { id: 15, name: 'Evaluating statistical claims: Observational studies and experiments' },
            { id: 231, name: 'Geometry and Trigonometry' },
            { id: 67, name: 'Area and volume' },
            { id: 77, name: 'Lines, angles, and triangles' },
            { id: 44, name: 'Right triangles and trigonometry' },
            { id: 33, name: 'Circles' },
        ],
    },
];

// Component to display a single subject card
const SubjectCard = ({ subjectData }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
            {/* Subject Header */}
            <div className="flex items-center mb-4">
                <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                    {subjectData.id}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                    {subjectData.subject}
                </h3>
            </div>

            {/* Topics List */}
            <div className="flex-grow"> {/* Allows the list to grow and fill available space */}
                {subjectData.topics.map((topic) => (
                    // Wrap the topic div with Link for navigation
                    <Link
                        key={topic.id}
                        to={`/practice-tests/${topic.id}`}
                        className="flex items-center mb-3 group p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-3 min-w-[36px] text-center group-hover:bg-pink-600 transition-colors duration-200">
                            {topic.id}
                        </span>
                        <p className="text-gray-700 text-base group-hover:text-blue-700 transition-colors duration-200">
                            {topic.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Main QuestionsSection component
export default function QuestionsSection() {
    return (
        <div className="max-w-6xl mx-auto my-8 p-4 font-inter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questionsData.map((subject) => (
                    <SubjectCard key={subject.id} subjectData={subject} />
                ))}
            </div>
        </div>
    );
}

// App component to render the QuestionsSection and load Tailwind CSS
export function App() {
    // Simple routing for demonstration purposes
    const [currentPath, setCurrentPath] = React.useState('/');

    // Simulate routing using hash for in-browser demonstration without a real server
    React.useEffect(() => {
        const handleHashChange = () => {
            setCurrentPath(window.location.hash.substring(1) || '/');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Set initial path
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    let content;
    if (currentPath.startsWith('/practice-tests/')) {
        const topicId = currentPath.split('/')[2];
        content = (
            <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto my-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Practice Test</h2>
                <p className="text-lg text-gray-600">You are viewing practice tests for Topic ID: <span className="font-semibold text-blue-600">{topicId}</span></p>
                <button
                    onClick={() => window.location.hash = '#/'}
                    className="mt-6 px-6 py-3 rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Go Back to Questions
                </button>
            </div>
        );
    } else {
        content = <QuestionsSection />;
    }

    return (
        <>
            {/* Tailwind CSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Inter font for overall aesthetics */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <style>
                {`
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f2f5; /* Light background for the page */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
        `}
            </style>
            <div className="container mx-auto p-4">
                {content}
            </div>
        </>
    );
}
