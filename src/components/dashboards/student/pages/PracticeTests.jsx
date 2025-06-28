import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../practicetests/PageHeader'; // Assuming PageHeader is designed well
import { FaBook, FaPuzzlePiece, FaCheckCircle } from 'react-icons/fa'; // Import icons

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
                console.log(result)
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
                    // Assuming PageHeader can also receive available subjects for navigation
                    availableSubjects={practiceTestsData.bySubject?.map(s => s._id) || []}
                />d 

                <div className="mt-8 space-y-6 px-4">
                    {isLoading && (
                        <div className="text-center py-10">
                            <p className="text-lg text-gray-600">Loading practice tests...</p>
                            {/* You can add a spinner here */}
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
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 max-w-[450px] flex justify-center"
                            variants={itemVariants}
                        >
                            <div> <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <FaBook className="text-indigo-500 mr-3" /> Chapter: {chapter}
                            </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                                    {Object.entries(topics).map(([topic, count]) => (
                                        <motion.li
                                            key={topic}
                                            className="flex items-center bg-gray-50 p-3 rounded-md text-gray-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 cursor-pointer max-w-4xl"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            // You might add an onClick handler here to navigate to a test for this topic
                                            onClick={() => console.log(`Start test for ${topic} in ${chapter}`)}
                                        >
                                            <FaPuzzlePiece className="text-green-500 mr-2" />
                                            <span className="font-medium mr-1">{topic}</span>
                                            <span className="text-sm text-gray-600"> ({count} question{count > 1 ? 's' : ''})</span>
                                            <FaCheckCircle className="text-blue-400 ml-auto" title="Start Test" />
                                        </motion.li>
                                    ))}
                                </ul></div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </UserDashboardContainer>
    );
}

export default PracticeTestPage;