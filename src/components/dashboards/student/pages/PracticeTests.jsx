import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../practicetests/PageHeader'; // Assuming PageHeader is designed well
import { FaBook, FaPuzzlePiece } from 'react-icons/fa'; // Only import icons actually used

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
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function PracticeTestPage() {
    const [activeSubject, setActiveSubject] = useState('Math');
    const [practiceTestsData, setPracticeTestsData] = useState({
        bySubject: [],
        byChapter: [],
        byTopic: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPracticeTestData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/mcq/questions/aggregated', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setPracticeTestsData(result.data);
            } catch (e) {
                console.error('Error fetching data:', e);
                setError('Failed to load practice tests. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPracticeTestData();
    }, []);

    const handleSubjectClick = (subject) => {
        setActiveSubject(subject);
    };

    // Get the questions for current subject
    const currentSubjectData = practiceTestsData.bySubject?.find(
        (subject) => subject._id === activeSubject
    );

    // Group by chapter → topic → question count
    const chapterTopicMap = {};
    currentSubjectData?.questions.forEach((q) => {
        if (!chapterTopicMap[q.chapter]) {
            chapterTopicMap[q.chapter] = {};
        }
        if (!chapterTopicMap[q.chapter][q.topic]) {
            chapterTopicMap[q.chapter][q.topic] = 1;
        } else {
            chapterTopicMap[q.chapter][q.topic] += 1;
        }
    });

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader
                    activeSubject={activeSubject}
                    setActiveSubject={setActiveSubject}
                    handleSubjectClick={handleSubjectClick}
                    availableSubjects={practiceTestsData.bySubject?.map(s => s._id) || []}
                />

                <div className="mt-8 space-y-8 px-4">
                    {isLoading && (
                        <div className="text-center py-10">
                            <p className="text-lg text-gray-600">Loading practice tests...</p>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mt-4"></div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-10 text-red-600 text-lg">
                            <p>{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && Object.keys(chapterTopicMap).length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-lg text-gray-600">No practice tests available for {activeSubject} yet. Check back soon!</p>
                        </div>
                    )}

                    {!isLoading && !error && Object.entries(chapterTopicMap).map(([chapter, topics]) => (
                        <motion.div
                            key={chapter}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <FaBook className="text-indigo-600 mr-3 text-3xl" /> Chapter: {chapter}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Object.entries(topics).map(([topic, count]) => (
                                    <motion.div
                                        key={topic}
                                        className="flex flex-col items-start bg-gray-50 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => console.log(`Start test for ${topic} in ${chapter}`)}
                                    >
                                        <div className="flex items-center mb-3">
                                            <FaPuzzlePiece className="text-green-600 mr-3 text-xl" />
                                            <h3 className="text-lg font-semibold text-gray-900">{topic}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {count} question{count > 1 ? 's' : ''} available
                                        </p>
                                        <button className="mt-auto flex items-center justify-center px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200">
                                            Start Test
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </UserDashboardContainer>
    );
}

export default PracticeTestPage;