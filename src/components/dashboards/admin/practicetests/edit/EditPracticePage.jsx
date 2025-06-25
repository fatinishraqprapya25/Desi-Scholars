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
    const [mcqQuestions, setMcqQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const [newQuestion, setNewQuestion] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswers: [],
        explanation: '',
        difficulty: 'medium',
        type: 'test',
        subject: '',
        topic: '',
        chapter: '',
        tags: ['bluebook only'],  // tags is an array with one string
        scoreBond: '1',
    });

    const { testId } = useParams();
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddQuestion = () => {
        setShowAddForm(true);
    }

    useEffect(() => {
        const fetchTestData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/tests/${testId}`);
                if (!response.ok) throw new Error("Failed to fetch test data");
                const data = await response.json();
                setTestDetails(data.data);
            } catch (error) {
                setTestDetails(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestData();
    }, [testId]);

    useEffect(() => {
        const fetchMcqs = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/mcq/${testId}`);
                if (!res.ok) throw new Error("Failed to fetch MCQ questions");
                const data = await res.json();
                setMcqQuestions(data.data || []);
            } catch (err) {
                // console.error("Error fetching MCQs:", err);
            }
        };

        fetchMcqs();
    }, [testId]);

    const handleNewQuestion = () => {
        const newQuesSave = async () => {
            const payload = {
                ...newQuestion,
                testId: testId,
            };
            try {
                const res = await fetch("http://localhost:5000/api/mcq", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${adminToken}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    alert("Error: " + (errorData.message || "Failed to add question"));
                    return;
                }

                const saved = await res.json();
                setMcqQuestions(prev => [...prev, saved.data]);
                setShowAddForm(false);
                alert("Question added successfully!");

                // Reset the form after adding
                setNewQuestion({
                    question: '',
                    options: ['', '', '', ''],
                    correctAnswers: [],
                    explanation: '',
                    difficulty: 'medium',
                    type: 'test',
                    subject: '',
                    topic: '',
                    chapter: '',
                    tags: ['bluebook only'],
                    scoreBond: '1',
                });
            } catch (err) {
                alert("Something went wrong.");
            }
        }
        newQuesSave();
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tests/${testId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(testDetails),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update test.');
            }

            alert('Test updated successfully!');
        } catch (error) {
            alert('An error occurred while updating the test.');
        }
    };

    const handleRemoveQuestion = async (qIndex) => {
        const questionToRemove = mcqQuestions[qIndex];

        if (!questionToRemove?._id) {
            // If question has no _id (not saved yet), just remove locally
            setMcqQuestions(prev => prev.filter((_, i) => i !== qIndex));
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/mcq/${questionToRemove._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert("Failed to delete question: " + (errorData.message || res.statusText));
                return;
            }

            // Remove from local state after successful delete
            setMcqQuestions(prev => prev.filter((_, i) => i !== qIndex));
            alert("Question deleted successfully.");
        } catch (error) {
            alert("Error deleting question.");
        }
    };

    if (isLoading) {
        return (
            <UserDashboardContainer role="admin">
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
            <UserDashboardContainer role="admin">
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
        <UserDashboardContainer role="admin">
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
                    <TestDetailsForm
                        testDetails={testDetails}
                        handleChange={handleChange}
                        readOnly={true}
                        handleSave={handleSave}
                    />

                    <QuestionsSection
                        questions={mcqQuestions}
                        readOnly={true}
                        handleRemoveQuestion={handleRemoveQuestion}
                        handleAddQuestion={handleAddQuestion}
                    />

                    {showAddForm && (
                        <div className="border rounded-lg p-4 bg-gray-50 mt-4">
                            <h2 className="text-lg font-semibold mb-4">Add New MCQ</h2>

                            {/* Question */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Question</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.question}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                />
                            </div>

                            {/* Topic */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Topic</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.topic}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                                />
                            </div>

                            {/* Subject */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.subject}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                                />
                            </div>

                            {/* Chapter */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Chapter</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.chapter}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, chapter: e.target.value })}
                                />
                            </div>

                            {/* Options */}
                            {newQuestion.options.map((opt, index) => (
                                <div key={index} className="mb-2">
                                    <label className="block text-sm font-medium">Option {index + 1}</label>
                                    <input
                                        type="text"
                                        className="w-full border px-3 py-2 rounded"
                                        value={opt}
                                        onChange={(e) => {
                                            const updated = [...newQuestion.options];
                                            updated[index] = e.target.value;
                                            setNewQuestion({ ...newQuestion, options: updated });
                                        }}
                                    />
                                    <label className="inline-flex items-center mt-1">
                                        <input
                                            type="checkbox"
                                            checked={newQuestion.correctAnswers.includes(index)}
                                            onChange={() => {
                                                const updatedCorrect = newQuestion.correctAnswers.includes(index)
                                                    ? newQuestion.correctAnswers.filter(i => i !== index)
                                                    : [...newQuestion.correctAnswers, index];
                                                setNewQuestion({ ...newQuestion, correctAnswers: updatedCorrect });
                                            }}
                                        />
                                        <span className="ml-2 text-sm">Mark as Correct</span>
                                    </label>
                                </div>
                            ))}

                            {/* Explanation */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Explanation</label>
                                <textarea
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.explanation}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                                />
                            </div>

                            {/* Difficulty */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Difficulty</label>
                                <select
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.difficulty}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            {/* Score Bond */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Score Value</label>
                                <select
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.scoreBond}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, scoreBond: e.target.value })}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                                        <option key={score} value={score.toString()}>{score}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags (Select Single) */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Tags</label>
                                <select
                                    className="w-full border px-3 py-2 rounded"
                                    value={newQuestion.tags[0]} // single select value
                                    onChange={(e) => setNewQuestion({ ...newQuestion, tags: [e.target.value] })}
                                >
                                    <option value="bluebook only">bluebook only</option>
                                    <option value="exclude bluebook">exclude bluebook</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    onClick={handleNewQuestion}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}
