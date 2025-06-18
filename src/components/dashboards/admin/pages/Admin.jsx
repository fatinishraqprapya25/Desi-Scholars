import React, { useEffect, useState } from 'react';
import UserDashboardContainer from "../../common/UserDashboardContainer";
import { Link } from 'react-router-dom';

export default function Admins() {
    const [admins, setAdmins] = useState([]);
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const fetchAdmins = async () => {
        const reqAdmins = await fetch("http://localhost:5000/api/admin", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${adminToken}`
            }
        });
        const resAdmins = await reqAdmins.json();
        if (resAdmins.success) {
            setAdmins(resAdmins.data);
        } else {
            alert(resAdmins.message);
        }
    }

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDeleteAdmin = (adminId) => {
        const deleteAdmin = async () => {
            const deleteReq = await fetch(`http://localhost:5000/api/admin/${adminId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                }
            });
            const deleteRes = await deleteReq.json();
            if (deleteRes.success) {
                alert("Admin Deleted Successfully!")
            }
            fetchAdmins();

        }
        deleteAdmin();
    };

    return (
        <>
            <UserDashboardContainer role="admin">
                {/* Main padding for the content */}
                <div className="p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold">Admins List</h2>
                        <Link to="/admin/admins/create-admin">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
                            >
                                Create Admin
                            </button>
                        </Link>
                    </div>

                    {admins.length > 0 ? (
                        <div className="overflow-x-auto"> {/* Add overflow for smaller screens */}
                            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-300">
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">ID</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr key={admin._id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-800">{admin._id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{admin.name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{admin.email}</td>
                                            <td className="py-3 px-4 text-sm">
                                                <button
                                                    onClick={() => handleDeleteAdmin(admin._id)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700 transition duration-200 ease-in-out cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 py-5">No admins found.</p>
                    )}
                </div>
            </UserDashboardContainer>
        </>
    );
}