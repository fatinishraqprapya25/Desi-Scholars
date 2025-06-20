import { useState } from 'react';
import { motion } from 'framer-motion';

import UserDashboardContainer from "../../../common/UserDashboardContainer";
import TestHeader from './CreateTestHeader';
import TestDetailsForm from './TestDetailsForm';
import SubmitTestButton from './SubmitTestButton';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CreatePracticeTestPage() {
    const [testDetails, setTestDetails] = useState({
        title: '',
        description: '',
        duration: 30,
    });

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestDetails(prev => ({
            ...prev,
            [name]: name === 'durationMinutes' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(testDetails);
            const response = await fetch("http://localhost:5000/api/tests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(testDetails)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Test created successfully!");
                setTestDetails({
                    title: '',
                    description: '',
                    duration: 30,
                });
            } else {
                alert(result.message || "Failed to create test.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while creating the test.");
        }
    };

    return (
        <UserDashboardContainer role="admin">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <TestHeader />

                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-6"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <TestDetailsForm
                        testDetails={testDetails}
                        handleChange={handleChange}
                    />

                    <SubmitTestButton />
                </motion.form>
            </motion.div>
        </UserDashboardContainer>
    );
}
