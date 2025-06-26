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

    const { id } = useParams();

    useEffect(() => {
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

        fetchMockDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMockData(prevData => ({
            ...prevData,
            [name]: value
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

                <form onSubmit={handleSubmit} className="space-y-6">
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
            </div>
        </UserDashboardContainer>
    );
}
