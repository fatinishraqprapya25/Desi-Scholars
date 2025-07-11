import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react"; // Lucide icon for "Create Mock"
import UserDashboardContainer from "../../common/UserDashboardContainer";
import { Link } from "react-router-dom";
import MockCard from "../mock/MockCard";

export default function Mock() {
    const [mocks, setMocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMocks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/mock");
                const result = await response.json();
                if (result.success) {
                    setMocks(result.data || []); // Set mocks if data exists
                }
            } catch (error) {
                console.error("Error fetching mocks:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchMocks();
    }, []);

    return (
        <UserDashboardContainer role="admin">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Manage Mocks</h1>
                <p className="text-gray-500 max-w-3xl">
                    Create and manage your mock tests here. Use the search bar to find specific tests or create a new one to get started.
                </p>
            </div>

            {/* Search and Create Mock Section */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
                {/* Search Field */}
                <input
                    type="text"
                    placeholder="Search practice tests..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
                />
                {/* Create Mock Button */}
                <Link to="/admin/mock/create"><button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 ml-4">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Create Mock
                </button></Link>
            </div>

            {/* Content Section */}
            {loading ? (
                <p className="text-gray-600">Loading mocks...</p>
            ) : mocks.length === 0 ? (
                <div className="text-center mt-10">
                    {/* No Mocks Found Message */}
                    <p className="text-gray-500 text-lg mb-4">
                        No mock tests found. Start by creating your first mock test!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mocks.map((mock, index) => (
                        <MockCard mock={mock} index={index} />
                    ))}
                </div>
            )}
        </UserDashboardContainer>
    );
}
