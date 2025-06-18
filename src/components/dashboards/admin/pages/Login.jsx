import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidateAdmin from '../../../../utils/ValidateAdmin';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 🔒 Redirect if already logged in
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            const isLoggedIn = await ValidateAdmin();
            if (isLoggedIn) {
                navigate("/admin/dashboard");
            }
        };
        checkIfLoggedIn();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!result.success) {
                setError(result.message || "Login failed.");
            } else {
                localStorage.setItem("ASDFDKFFJF", result.data.token);
                navigate("/admin/dashboard"); // 🚀 Redirect after successful login
            }
        } catch (err) {
            setError("Server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
