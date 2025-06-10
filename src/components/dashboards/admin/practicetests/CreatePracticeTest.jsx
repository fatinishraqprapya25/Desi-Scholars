import React, { useState } from 'react';
import { motion } from 'framer-motion';

import UserDashboardContainer from "../../common/UserDashboardContainer";
import TestHeader from './CreateTestHeader';
import TestDetailsForm from './TestDetailsForm';
import QuestionsSection from './QuestionSection';
import SubmitTestButton from './SubmitTestButton';


const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CreatePracticeTestPage() {
    const [testDetails, setTestDetails] = useState({
        title: '',
        description: '',
        durationMinutes: 30, // Default duration
        questions: []
    });

    const handleTestDetailsChange = (e) => {
        const { name, value } = e.target;
        setTestDetails(prevDetails => ({
            ...prevDetails,
            [name]: name === 'durationMinutes' ? parseInt(value, 10) || 0 : value
        }));
    };

    // Add a new question to the test
    const handleAddQuestion = () => {
        setTestDetails(prevDetails => ({
            ...prevDetails,
            questions: [
                ...prevDetails.questions,
                {
                    questionText: '',
                    options: ['', '', '', ''], // Default 4 empty options
                    correctAnswerIndex: null // Index of the correct option
                }
            ]
        }));
    };

    // Remove a question by its index
    const handleRemoveQuestion = (qIndex) => {
        setTestDetails(prevDetails => ({
            ...prevDetails,
            questions: prevDetails.questions.filter((_, index) => index !== qIndex)
        }));
    };

    // Handle changes for a specific question's text
    const handleQuestionTextChange = (qIndex, value) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].questionText = value;
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Add an option to a specific question
    const handleAddOption = (qIndex) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].options.push(''); // Add an empty option
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Remove an option from a specific question
    const handleRemoveOption = (qIndex, oIndex) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, index) => index !== oIndex);
            // If the removed option was the correct one, reset correct answer
            if (newQuestions[qIndex].correctAnswerIndex === oIndex) {
                newQuestions[qIndex].correctAnswerIndex = null;
            } else if (newQuestions[qIndex].correctAnswerIndex > oIndex) {
                // Adjust index if correct answer was after the removed option
                newQuestions[qIndex].correctAnswerIndex -= 1;
            }
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Handle changes for a specific option's text
    const handleOptionTextChange = (qIndex, oIndex, value) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].options[oIndex] = value;
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Set the correct answer for a specific question
    const handleCorrectAnswerChange = (qIndex, oIndex) => {
        setTestDetails(prevDetails => {
            const newQuestions = [...prevDetails.questions];
            newQuestions[qIndex].correctAnswerIndex = oIndex;
            return { ...prevDetails, questions: newQuestions };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!testDetails.title.trim()) {
            alert('Test title is required.');
            return;
        }
        if (testDetails.questions.length === 0) {
            alert('At least one question is required.');
            return;
        }

        for (let i = 0; i < testDetails.questions.length; i++) {
            const q = testDetails.questions[i];
            if (!q.questionText.trim()) {
                alert(`Question ${i + 1} text is required.`);
                return;
            }
            if (q.options.filter(opt => opt.trim() !== '').length < 2) {
                alert(`Question ${i + 1} must have at least two non-empty options.`);
                return;
            }
            if (q.correctAnswerIndex === null || q.correctAnswerIndex < 0 || q.correctAnswerIndex >= q.options.length) {
                alert(`Please select a correct answer for Question ${i + 1}.`);
                return;
            }
            if (!q.options[q.correctAnswerIndex].trim()) {
                alert(`The selected correct answer for Question ${i + 1} cannot be empty.`);
                return;
            }
        }

        console.log('New Practice Test Data:', testDetails);
        alert('Practice test created successfully! (Check console for data)');

        // Reset form after submission (optional)
        setTestDetails({
            title: '',
            description: '',
            durationMinutes: 30,
            questions: []
        });
    };

    return (
        <UserDashboardContainer admin={true}>
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
                        handleChange={handleTestDetailsChange}
                    />

                    <QuestionsSection
                        questions={testDetails.questions}
                        handleAddQuestion={handleAddQuestion}
                        handleRemoveQuestion={handleRemoveQuestion}
                        handleQuestionTextChange={handleQuestionTextChange}
                        handleAddOption={handleAddOption}
                        handleRemoveOption={handleRemoveOption}
                        handleOptionTextChange={handleOptionTextChange}
                        handleCorrectAnswerChange={handleCorrectAnswerChange}
                    />

                    <SubmitTestButton />
                </motion.form>
            </motion.div>
        </UserDashboardContainer>
    );
}