import { useState, useEffect } from 'react';
import UserDashboardContainer from "../../common/UserDashboardContainer";
import { useParams } from 'react-router-dom';

export default function EditMock() {
    const [mockData, setMockData] = useState({
        name: '',
        description: '',
        duration: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [mockQuestions, setMockQuestions] = useState([]);
    const [newQuestionData, setNewQuestionData] = useState({
        question: '',
        options: ['', '', '', ''], // Start with 4 empty options
        correctAnswers: [],
        explanation: '',
        moduleName: '',
        difficulty: 'medium',
        tags: ["bluebook only"], // Default tag
        scoreBond: '1',
        type: 'mock', // Default to 'mock' as per your requirement
    });
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [questionError, setQuestionError] = useState(null);
    const [questionSuccessMessage, setQuestionSuccessMessage] = useState('');

    // State for delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);

    // State for edit feature
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null); // Stores the full question object being edited
    const [editedQuestionData, setEditedQuestionData] = useState({ // Stores form data for the question being edited
        question: '',
        options: [],
        correctAnswers: [],
        explanation: '',
        moduleName: '',
        difficulty: 'medium',
        tags: [],
        scoreBond: '1',
        type: 'mock',
    });
    const [isUpdatingQuestion, setIsUpdatingQuestion] = useState(false);


    const { id } = useParams();

    const fetchMockDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/mock/${id}`);

            if (response.ok) {
                const result = await response.json();
                setMockData({
                    name: result.data.name || '',
                    description: result.data.description || '',
                    duration: result.data.duration || '',
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch mock details.');
            }
        } catch (err) {
            console.error("Error fetching mock details:", err);
            setError('An error occurred while fetching mock details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/mockquestions/${id}`);
            const result = await response.json();
            if (result.success) {
                if (result.data !== null) {
                    setMockQuestions(result.data);
                }
            } else {
                setQuestionError(result.message || 'Failed to fetch questions.');
            }
        } catch (err) {
            console.error("Error fetching questions:", err);
            setQuestionError('An error occurred while fetching questions.');
        }
    };

    useEffect(() => {
        fetchMockDetails();
        fetchQuestions();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMockData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNewQuestionChange = (e) => {
        const { name, value } = e.target;
        setNewQuestionData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestionData.options];
        updatedOptions[index] = value;
        setNewQuestionData(prevData => ({
            ...prevData,
            options: updatedOptions
        }));
    };

    const handleCorrectAnswerChange = (index) => {
        const updatedCorrectAnswers = newQuestionData.correctAnswers.includes(index)
            ? newQuestionData.correctAnswers.filter(item => item !== index)
            : [...newQuestionData.correctAnswers, index];
        setNewQuestionData(prevData => ({
            ...prevData,
            correctAnswers: updatedCorrectAnswers.sort((a, b) => a - b) // Keep sorted for consistency
        }));
    };

    const handleAddOption = () => {
        setNewQuestionData(prevData => ({
            ...prevData,
            options: [...prevData.options, '']
        }));
    };

    const handleRemoveOption = (indexToRemove) => {
        setNewQuestionData(prevData => ({
            ...prevData,
            options: prevData.options.filter((_, index) => index !== indexToRemove),
            correctAnswers: prevData.correctAnswers.filter(answerIndex => answerIndex !== indexToRemove)
                .map(answerIndex => (answerIndex > indexToRemove ? answerIndex - 1 : answerIndex)) // Adjust indices of correct answers
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setError(null);
        const adminToken = localStorage.getItem("ASDFDKFFJF");

        try {
            const response = await fetch(`http://localhost:5000/api/mock/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(mockData)
            });

            if (response.ok) {
                setSuccessMessage('Mock test updated successfully!');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update mock test.');
            }
        } catch (err) {
            console.error("Error updating mock:", err);
            setError('An error occurred while updating the mock test.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddQuestionSubmit = async (e) => {
        e.preventDefault();
        setIsAddingQuestion(true);
        setQuestionSuccessMessage('');
        setQuestionError(null);
        const adminToken = localStorage.getItem("ASDFDKFFJF");

        try {
            const questionToSend = {
                ...newQuestionData,
                mockId: id, // Associate with the current mock test
            };

            const response = await fetch('http://localhost:5000/api/mockquestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(questionToSend)
            });

            if (response.ok) {
                setQuestionSuccessMessage('Question added successfully!');
                // Clear form and refetch questions
                setNewQuestionData({
                    question: '',
                    options: ['', '', '', ''],
                    correctAnswers: [],
                    explanation: '',
                    moduleName: '',
                    difficulty: 'medium',
                    tags: ["bluebook only"],
                    scoreBond: '1',
                    type: 'mock',
                });
                fetchQuestions(); // Refresh the list of questions
            } else {
                const errorData = await response.json();
                setQuestionError(errorData.message || 'Failed to add question.');
            }
        } catch (err) {
            console.error("Error adding question:", err);
            setQuestionError('An error occurred while adding the question.');
        } finally {
            setIsAddingQuestion(false);
        }
    };

    // Function to initiate question deletion
    const confirmDeleteQuestion = (question) => {
        setQuestionToDelete(question);
        setShowDeleteConfirm(true);
    };

    // Function to handle the actual deletion API call
    const handleDeleteQuestion = async () => {
        if (!questionToDelete) return; // Should not happen if button is disabled

        setIsDeletingQuestion(true);
        setQuestionSuccessMessage('');
        setQuestionError(null);
        const adminToken = localStorage.getItem("ASDFDKFFJF");

        try {
            const response = await fetch(`http://localhost:5000/api/mockquestions/${questionToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (response.ok) {
                setQuestionSuccessMessage('Question deleted successfully!');
                fetchQuestions(); // Re-fetch questions to update the list
                setQuestionToDelete(null);
                setShowDeleteConfirm(false);
            } else {
                const errorData = await response.json();
                setQuestionError(errorData.message || 'Failed to delete question.');
            }
        } catch (err) {
            console.error("Error deleting question:", err);
            setQuestionError('An error occurred while deleting the question.');
        } finally {
            setIsDeletingQuestion(false);
        }
    };

    // --- Edit Question Functions ---
    const startEditQuestion = (question) => {
        setEditingQuestion(question);
        setEditedQuestionData({
            question: question.question,
            options: [...question.options], // Deep copy options array
            correctAnswers: [...question.correctAnswers], // Deep copy correctAnswers array
            explanation: question.explanation || '',
            moduleName: question.moduleName,
            difficulty: question.difficulty,
            tags: [...question.tags], // Deep copy tags array
            scoreBond: question.scoreBond,
            type: question.type,
        });
        setShowEditModal(true);
        setQuestionError(null); // Clear previous question errors
        setQuestionSuccessMessage(''); // Clear previous question success messages
    };

    const handleEditedQuestionChange = (e) => {
        const { name, value } = e.target;
        setEditedQuestionData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditedOptionChange = (index, value) => {
        const updatedOptions = [...editedQuestionData.options];
        updatedOptions[index] = value;
        setEditedQuestionData(prevData => ({
            ...prevData,
            options: updatedOptions
        }));
    };

    const handleEditedCorrectAnswerChange = (index) => {
        const updatedCorrectAnswers = editedQuestionData.correctAnswers.includes(index)
            ? editedQuestionData.correctAnswers.filter(item => item !== index)
            : [...editedQuestionData.correctAnswers, index];
        setEditedQuestionData(prevData => ({
            ...prevData,
            correctAnswers: updatedCorrectAnswers.sort((a, b) => a - b)
        }));
    };

    const handleAddEditedOption = () => {
        setEditedQuestionData(prevData => ({
            ...prevData,
            options: [...prevData.options, '']
        }));
    };

    const handleRemoveEditedOption = (indexToRemove) => {
        setEditedQuestionData(prevData => ({
            ...prevData,
            options: prevData.options.filter((_, index) => index !== indexToRemove),
            correctAnswers: prevData.correctAnswers.filter(answerIndex => answerIndex !== indexToRemove)
                .map(answerIndex => (answerIndex > indexToRemove ? answerIndex - 1 : answerIndex))
        }));
    };

    const handleUpdateQuestionSubmit = async (e) => {
        e.preventDefault();
        setIsUpdatingQuestion(true);
        setQuestionSuccessMessage('');
        setQuestionError(null);
        const adminToken = localStorage.getItem("ASDFDKFFJF");

        try {
            const response = await fetch(`http://localhost:5000/api/mockquestions/${editingQuestion._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(editedQuestionData)
            });

            if (response.ok) {
                setQuestionSuccessMessage('Question updated successfully!');
                setShowEditModal(false); // Close modal
                setEditingQuestion(null); // Clear editing state
                fetchQuestions(); // Refresh the list
            } else {
                const errorData = await response.json();
                setQuestionError(errorData.message || 'Failed to update question.');
            }
        } catch (err) {
            console.error("Error updating question:", err);
            setQuestionError('An error occurred while updating the question.');
        } finally {
            setIsUpdatingQuestion(false);
        }
    };

    if (loading) {
        return (
            <UserDashboardContainer role="admin">
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="ml-4 text-lg text-gray-700">Loading mock details...</p>
                </div>
            </UserDashboardContainer>
        );
    }

    return (
        <UserDashboardContainer role="admin">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Edit Mock Test
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline ml-2">{successMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 mb-12 border-b pb-12">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Mock Test Details</h3>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Mock Test Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={mockData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="e.g., Advanced JavaScript Assessment"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={mockData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Provide a detailed description of the mock test."
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (in minutes)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={mockData.duration}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="e.g., 60"
                            min="1"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => { /* Implement navigation back or clear form */ }}
                            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>

                {/* Section for managing questions */}
                <h3 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
                    Manage Questions
                </h3>

                {questionError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{questionError}</span>
                    </div>
                )}

                {questionSuccessMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline ml-2">{questionSuccessMessage}</span>
                    </div>
                )}

                {/* Form to add a new question */}
                <div className="border-b pb-8 mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Add New Question</h4>
                    <form onSubmit={handleAddQuestionSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="new-question-text" className="block text-sm font-medium text-gray-700 mb-1">
                                Question Text
                            </label>
                            <textarea
                                id="new-question-text"
                                name="question"
                                rows="3"
                                value={newQuestionData.question}
                                onChange={handleNewQuestionChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter the question here."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                            {newQuestionData.options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={newQuestionData.correctAnswers.includes(index)}
                                        onChange={() => handleCorrectAnswerChange(index)}
                                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder={`Option ${index + 1}`}
                                        required
                                    />
                                    {newQuestionData.options.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOption(index)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            title="Remove Option"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddOption}
                                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Option
                            </button>
                        </div>

                        <div>
                            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                                Explanation (Optional)
                            </label>
                            <textarea
                                id="explanation"
                                name="explanation"
                                rows="2"
                                value={newQuestionData.explanation}
                                onChange={handleNewQuestionChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Provide an explanation for the correct answer."
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="moduleName" className="block text-sm font-medium text-gray-700 mb-1">
                                Module Name
                            </label>
                            <input
                                type="text"
                                id="moduleName"
                                name="moduleName"
                                value={newQuestionData.moduleName}
                                onChange={handleNewQuestionChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="e.g., JavaScript Basics"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={newQuestionData.difficulty}
                                onChange={handleNewQuestionChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                Tags (Comma-separated)
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={newQuestionData.tags.join(', ')}
                                onChange={(e) => setNewQuestionData(prevData => ({ ...prevData, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="e.g., bluebook only, algorithms"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="scoreBond" className="block text-sm font-medium text-gray-700 mb-1">
                                Score Bond
                            </label>
                            <select
                                id="scoreBond"
                                name="scoreBond"
                                value={newQuestionData.scoreBond}
                                onChange={handleNewQuestionChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                {['1', '2', '3', '4', '5', '6', '7'].map(bond => (
                                    <option key={bond} value={bond}>{bond}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                disabled={isAddingQuestion}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAddingQuestion ? 'Adding Question...' : 'Add Question'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List of existing questions */}
                <div className="mb-8 mt-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Existing Questions ({mockQuestions.length})</h4>
                    {mockQuestions.length === 0 ? (
                        <p className="text-gray-600">No questions added to this mock test yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {mockQuestions.map((q, index) => (
                                <li key={q._id} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium text-gray-900"><strong>{index + 1}.</strong> {q.question}</p>
                                        <div className="flex space-x-2"> {/* Container for edit and delete buttons */}
                                            <button
                                                type="button"
                                                onClick={() => startEditQuestion(q)}
                                                className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
                                                title="Edit Question"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-7.586 0a2 2 0 100 2.828L10.828 12H17v-6.172L13.586 3.586z" />
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => confirmDeleteQuestion(q)}
                                                className="p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md"
                                                title="Delete Question"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                                        {q.options.map((option, optIndex) => (
                                            <li key={optIndex} className={q.correctAnswers.includes(optIndex) ? "font-bold text-green-700" : ""}>
                                                {String.fromCharCode(65 + optIndex)}. {option}
                                                {q.correctAnswers.includes(optIndex) && <span className="ml-2 text-green-600">(Correct)</span>}
                                            </li>
                                        ))}
                                    </ul>
                                    {q.explanation && <p className="text-sm text-gray-600 mt-2"><strong>Explanation:</strong> {q.explanation}</p>}
                                    <p className="text-sm text-gray-600"><strong>Module:</strong> {q.moduleName} | <strong>Difficulty:</strong> {q.difficulty} | <strong>Score Bond:</strong> {q.scoreBond}</p>
                                    <p className="text-sm text-gray-600"><strong>Tags:</strong> {q.tags.join(', ')}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete the question: "
                            <span className="font-semibold text-red-600">
                                {questionToDelete?.question.substring(0, 50)}{questionToDelete?.question.length > 50 ? '...' : ''}
                            </span>
                            "? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => { setShowDeleteConfirm(false); setQuestionToDelete(null); }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isDeletingQuestion}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteQuestion}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isDeletingQuestion}
                            >
                                {isDeletingQuestion ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Question Modal */}
            {showEditModal && editingQuestion && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
                    <div className="bg-white rounded-lg p-8 shadow-xl max-w-2xl w-full mx-auto my-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit Question</h3>

                        {questionError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline ml-2">{questionError}</span>
                            </div>
                        )}

                        <form onSubmit={handleUpdateQuestionSubmit} className="space-y-6 mt-[300px]">
                            <div>
                                <label htmlFor="edit-question-text" className="block text-sm font-medium text-gray-700 mb-1">
                                    Question Text
                                </label>
                                <textarea
                                    id="edit-question-text"
                                    name="question"
                                    rows="3"
                                    value={editedQuestionData.question}
                                    onChange={handleEditedQuestionChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter the question here."
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                                {editedQuestionData.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={editedQuestionData.correctAnswers.includes(index)}
                                            onChange={() => handleEditedCorrectAnswerChange(index)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleEditedOptionChange(index, e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder={`Option ${index + 1}`}
                                            required
                                        />
                                        {editedQuestionData.options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveEditedOption(index)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                title="Remove Option"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddEditedOption}
                                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Option
                                </button>
                            </div>

                            <div>
                                <label htmlFor="edit-explanation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Explanation (Optional)
                                </label>
                                <textarea
                                    id="edit-explanation"
                                    name="explanation"
                                    rows="2"
                                    value={editedQuestionData.explanation}
                                    onChange={handleEditedQuestionChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Provide an explanation for the correct answer."
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="edit-moduleName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Module Name
                                </label>
                                <input
                                    type="text"
                                    id="edit-moduleName"
                                    name="moduleName"
                                    value={editedQuestionData.moduleName}
                                    onChange={handleEditedQuestionChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="e.g., JavaScript Basics"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                                    Difficulty
                                </label>
                                <select
                                    id="edit-difficulty"
                                    name="difficulty"
                                    value={editedQuestionData.difficulty}
                                    onChange={handleEditedQuestionChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="edit-tags" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags (Comma-separated)
                                </label>
                                <input
                                    type="text"
                                    id="edit-tags"
                                    name="tags"
                                    value={editedQuestionData.tags.join(', ')}
                                    onChange={(e) => setEditedQuestionData(prevData => ({ ...prevData, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="e.g., bluebook only, algorithms"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-scoreBond" className="block text-sm font-medium text-gray-700 mb-1">
                                    Score Bond
                                </label>
                                <select
                                    id="edit-scoreBond"
                                    name="scoreBond"
                                    value={editedQuestionData.scoreBond}
                                    onChange={handleEditedQuestionChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                >
                                    {['1', '2', '3', '4', '5', '6', '7'].map(bond => (
                                        <option key={bond} value={bond}>{bond}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end space-x-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => { setShowEditModal(false); setEditingQuestion(null); }}
                                    className="px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    disabled={isUpdatingQuestion}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdatingQuestion}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdatingQuestion ? 'Updating...' : 'Update Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserDashboardContainer>
    );
}