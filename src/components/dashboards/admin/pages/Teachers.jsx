import { useEffect, useState } from 'react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import TeacherTable from '../teachers/TeacherTable';

export default function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const adminToken = localStorage.getItem("");
    const fetchTeachers = async () => {
        const teachersReq = await fetch("http://localhost:5000/api/teacher", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${adminToken}`
            }
        });
    }
    useEffect(() => {

    }, []);

    // Simple handler to add a new teacher with default data
    const handleAddTeacher = () => {
        const newId = `T-${String(teachers.length + 1).padStart(3, '0')}`;
        const newTeacher = {
            id: newId,
            name: `New Teacher ${newId}`,
            email: `new${newId.toLowerCase()}@example.com`,
            assignedCourses: 0,
            status: 'Active',
            lastLogin: new Date().toISOString().slice(0, 10),
        };
        setTeachers(prev => [...prev, newTeacher]);
    };

    // Handler to delete teacher by id
    const handleDeleteTeacher = (id) => {
        if (window.confirm(`Are you sure you want to delete teacher ${id}?`)) {
            setTeachers(prev => prev.filter(t => t.id !== id));
        }
    };

    return (
        <UserDashboardContainer role="admin">
            <div className="p-6 font-sans w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Manage Educators</h1>
                    <button
                        onClick={handleAddTeacher}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Teacher
                    </button>
                </div>

                <TeacherTable
                    teachers={teachers}
                    onDeleteTeacher={handleDeleteTeacher}
                />
            </div>
        </UserDashboardContainer>
    );
}
