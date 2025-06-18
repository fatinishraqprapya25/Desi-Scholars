import { useState } from 'react';

const AddTeacherModal = ({ onClose, adminToken, fetchTeachers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newTeacher = { name, email, phone, gender, password };

        try {
            const response = await fetch("http://localhost:5000/api/teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(newTeacher)
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                alert("Teacher added successfully!");
                fetchTeachers();
                onClose();
            } else {
                setError(result.message || "Failed to add teacher.");
            }
        } catch (err) {
            setError("Network error or server unavailable.");
            console.error("Error adding teacher:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Changed background color to allow backdrop-filter to show
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}> {/* Blurry background */}
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Teacher</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., john.doe@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter a strong password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., +88017XXXXXXXX"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Teacher'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTeacherModal;