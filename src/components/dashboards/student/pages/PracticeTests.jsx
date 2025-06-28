import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../practicetests/PageHeader';
import PracticeTestCard from '../practicetests/PracticeTestCard';
import { useEffect, useState } from 'react';
import textShortener from "../../../../utils/textShorener";

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

function PracticeTestPage() {
    const [activeSubject, setActiveSubject] = useState('Math');

    const handleSubjectClick = (subject) => {
        setActiveSubject(subject);
    };
    const [practiceTestsData, setPracticeTestsData] = useState([]);
    useEffect(() => {
        const fetchPracticeTestData = async () => {
            const response = await fetch("http://localhost:5000/api/mcq/");
            const result = await response.json();
            result.data.forEach(test => {
                test.description = textShortener(test.description, 150);
            });
            setPracticeTestsData(result.data);
        }
        fetchPracticeTestData();
    }, []);

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader activeSubject={activeSubject} setActiveSubject={setActiveSubject} handleSubjectClick={handleSubjectClick} />

                {/* Test Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                    variants={sectionVariants} // Using sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {practiceTestsData.map((test, index) => (
                        <PracticeTestCard key={test._id} test={test} index={index} />
                    ))}
                </motion.div>
            </motion.section>
        </UserDashboardContainer>
    );
}

export default PracticeTestPage;