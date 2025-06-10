import { useState, useEffect } from "react";
import UserDashboardContainer from "../../../common/UserDashboardContainer";
import { motion } from "framer-motion";
import PageHeader from "../../../common/PageHeader";
import TestDetailsForm from "./TestDetailsForm";
import QuestionsSection from "./QuestionSection";
import { Send } from 'lucide-react';


const mockExistingTestData = {
    id: 'PT-001',
    title: 'React Fundamentals Quiz (Edited)',
    description: 'An updated comprehensive quiz covering basic React concepts, JSX, components, state management, and new hooks.',
    durationMinutes: 40, // Example duration
    questions: [
        {
            questionText: 'What is JSX in React?',
            options: ['A JavaScript extension for XML-like syntax', 'A new JavaScript framework', 'A styling solution', 'A state management library'],
            correctAnswerIndex: 0,
        },
        {
            questionText: 'Which hook is used for side effects?',
            options: ['useState', 'useContext', 'useEffect', 'useReducer'],
            correctAnswerIndex: 2,
        },
        {
            questionText: 'How do you pass data to a child component?',
            options: ['Using state', 'Using props', 'Using context', 'All of the above'],
            correctAnswerIndex: 1,
        },
    ],
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function EditPracticeTestPage() {

    const [testDetails, setTestDetails] = useState({
        title: '',
        description: '',
        durationMinutes: 30,
        questions: []
    });

    const [isLoading, setIsLoading] = useState(true); // State to manage loading of test data

    useEffect(() => {

        const fetchTestData = () => {
            setIsLoading(true);
            setTimeout(() => {
                // For demonstration, we're using mockExistingTestData
                setTestDetails(mockExistingTestData);
                setIsLoading(false);
            }, 500); // Simulate network delay
        };

        fetchTestData();
    }, []);

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

    // Handle form submission (Update logic)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (same as create)
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

        // In a real app, you would send testDetails to an API for updating
        console.log('Updated Practice Test Data:', testDetails);
        alert('Practice test updated successfully! (Check console for data)');
        // Optionally, redirect the user after update
    };

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

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader title={testDetails.title} />

                < motion.form
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

                    {/* Reusing SubmitTestButton with custom text */}
                    <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg font-bold text-lg mt-8"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Send className="h-6 w-6 mr-3" /> Save
                    </motion.button>
                </motion.form>
            </motion.div>
        </UserDashboardContainer>
    );
}