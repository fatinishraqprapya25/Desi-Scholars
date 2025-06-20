import { useState, useEffect } from "react";
import UserDashboardContainer from "../../../common/UserDashboardContainer";
import { motion } from "framer-motion";
import PageHeader from "../../../common/PageHeader";
import TestDetailsForm from "./TestDetailsForm";
import QuestionsSection from "./QuestionSection";
import { useParams } from "react-router-dom";

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function EditPracticeTestPage() {
    const [testDetails, setTestDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { testId } = useParams();

    useEffect(() => {
        const fetchTestData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/tests/${testId}`);
                if (!response.ok) throw new Error("Failed to fetch test data");
                const data = await response.json();
                setTestDetails(data);
            } catch (error) {
                console.error("Error loading test:", error);
                setTestDetails(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestData();
    }, [testId]);

    if (isLoading) {
        return (
            <UserDashboardContainer admin={true}>
                <motion.div
                    className="p-8 font-sans w-full max-w-7xl mx-auto flex justify-center items-center h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-xl text-gray-700">Loading test data...</p>
                </motion.div>
            </UserDashboardContainer>
        );
    }

    if (!testDetails) {
        return (
            <UserDashboardContainer admin={true}>
                <motion.div
                    className="p-8 font-sans w-full max-w-7xl mx-auto flex justify-center items-center h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-xl text-red-600">Failed to load test data.</p>
                </motion.div>
            </UserDashboardContainer>
        );
    }

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader title={testDetails.title || "Practice Test"} />

                <motion.div
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-6"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Show test details in read-only mode */}
                    <TestDetailsForm
                        testDetails={testDetails}
                        handleChange={() => { }} // no-op, readonly
                        readOnly={true}
                    />

                    {/* Show questions in read-only mode */}
                    <QuestionsSection
                        questions={testDetails.questions || []}
                        readOnly={true}
                    />
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}
