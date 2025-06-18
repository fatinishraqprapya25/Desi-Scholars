import { useEffect, useState } from 'react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import TeacherTable from '../teachers/TeacherTable';
import AddTeacherModal from '../teachers/AddTeacherModal';

export default function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    // Function to fetch teachers from the backend
    const fetchTeachers = async () => {
        try {
            const teachersReq = await fetch("http://localhost:5000/api/teacher", {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                }
            });
            const result = await teachersReq.json();
            if (result.success) {
                setTeachers(result.data);
            } else {
                console.error("Failed to fetch teachers:", result.message);
                // Optionally show a user-friendly error message
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
            // Handle network errors or other issues
        }
    };

    // Fetch teachers on component mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleAddTeacher = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchTeachers();
    };

    const handleDeleteTeacher = async (id) => {
        if (window.confirm(`Are you sure you want to delete this teacher?`)) {
            try {
                const deleteReq = await fetch(`http://localhost:5000/api/teacher/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${adminToken}`
                    }
                });
                const result = await deleteReq.json();
                if (result.success) {
                    setTeachers(prev => prev.filter(t => t.id !== id));
                    alert("Teacher deleted successfully!");
                } else {
                    console.error("Failed to delete teacher:", result.message);
                    alert(`Failed to delete teacher: ${result.message}`);
                }
            } catch (error) {
                console.error("Error deleting teacher:", error);
                alert("An error occurred while deleting the teacher.");
            }
        }
    };

    return (
        <UserDashboardContainer role="admin">
            <div className="p-6 font-sans w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Educators</h1>
                    <button
                        onClick={handleAddTeacher}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                    >
                        + Add New Teacher
                    </button>
                </div>

                <TeacherTable
                    teachers={teachers}
                    onDelete={handleDeleteTeacher} // Ensure this prop name matches what TeacherTable expects
                />
            </div>

            {/* Add Teacher Modal */}
            {isModalOpen && (
                <AddTeacherModal
                    onClose={handleCloseModal}
                    adminToken={adminToken}
                    fetchTeachers={fetchTeachers} // Pass fetchTeachers to re-fetch after adding
                />
            )}
        </UserDashboardContainer>
    );
}