import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Importing a trash icon from react-icons

const TeacherTable = ({ teachers, onDelete }) => {
    const columns = ["Name", "Email", "Phone", "Gender", "Actions"]; // Added "Actions" column

    if (!teachers || teachers.length === 0) {
        return (
            <div className="text-center py-12 text-gray-600 text-lg sm:text-xl font-medium">
                No teachers found. Please add some to display them here.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-sm rounded-lg min-h-[350px] w-full bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {teachers.map((teacher, index) => (
                        <tr key={teacher.id || index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.phone || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.gender || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <button
                                    onClick={() => onDelete && onDelete(teacher.id)} // Pass teacher.id to onDelete
                                    className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full p-2 transition duration-150 ease-in-out"
                                    title="Delete Teacher"
                                >
                                    <FaTrashAlt className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherTable;