import UserDashboardContainer from "../../common/UserDashboardContainer";
import { useState } from "react";

export default function CreateMock() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const createMock = async (mockDetails) => {
        const adminToken = localStorage.getItem("ASDFDKFFJF");
        const response = await fetch("http://localhost:5000/api/mock", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${adminToken}`
            },
            body: JSON.stringify(mockDetails)
        });
        const result = await response.json();
        alert(result.message);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const mockDetails = {
            name,
            duration,
            description,
            price,
        };
        createMock(mockDetails);

        setName('');
        setDuration('');
        setDescription('');
        setPrice('');
    };

    return (
        <UserDashboardContainer role="admin">
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white shadow-xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Create New Mock Test</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Mock Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Mock Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                            placeholder="e.g., Full Stack Developer Mock"
                            required
                        />
                    </div>

                    {/* Duration Input */}
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (in minutes)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                            placeholder="e.g., 90"
                            required
                            min="1"
                        />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out resize-y"
                            placeholder="Provide a detailed description of the mock test..."
                            required
                        ></textarea>
                    </div>

                    {/* Price Input */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price (e.g., USD)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                            placeholder="e.g., 29.99"
                            step="0.01"
                            required
                            min="0"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Create Mock
                        </button>
                    </div>
                </form>
            </div>
        </UserDashboardContainer>
    );
}
