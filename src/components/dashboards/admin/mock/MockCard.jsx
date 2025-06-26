export default function MockCard({ mock, index }) {
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const deleteMock = async () => {
        if (!window.confirm(`Are you sure you want to delete "${mock.name || 'this mock test'}"?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/mock/${mock._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken}`
                }
            });

            if (response.ok) {
                console.log(`Mock test "${mock.name}" deleted successfully!`);
                alert(`Mock test "${mock.name}" deleted successfully!`);
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("Failed to delete mock:", errorData.message || response.statusText);
                alert(`Failed to delete mock: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error during delete operation:", error);
            alert("An error occurred while trying to delete the mock test.");
        }
    };

    return (
        <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-lg p-6 bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between"
        >
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">ID: {mock.id || 'N/A'}</span>
                <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                    Active
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {mock.name || "Untitled Mock Test"}
            </h3>
            <p className="text-sm text-gray-600 mb-5 line-clamp-3">
                {mock.description || "A comprehensive test designed to evaluate your knowledge and skills."}
            </p>

            <div className="flex items-center text-sm text-gray-500 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{mock.duration || 0} Minutes</span>
            </div>

            <p className="text-xs text-gray-400 mb-6">
                Created on: {mock.createdAt ? new Date(mock.createdAt).toLocaleDateString() : "Unknown Date"}
            </p>

            <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150 text-sm font-medium">
                    Edit Test
                </button>
                <button
                    onClick={deleteMock}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150 text-sm font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}