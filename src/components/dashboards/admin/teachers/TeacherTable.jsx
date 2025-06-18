import { FaTrashAlt } from 'react-icons/fa'; 

const TeacherTable = ({ teachers, onDelete, onEdit }) => {
    const columns = ["Name", "Email", "Phone", "Gender", "Actions"];

    if (!teachers || teachers.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500 text-xl sm:text-2xl font-semibold">
                No educators found. Start by adding a new teacher!
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 min-h-[350px] w-full">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> {/* Lighter, professional header background */}
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" // Professional text color
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {teachers.map((teacher) => (
                        <tr
                            key={teacher.id}
                            className="group hover:bg-blue-50 transition duration-200 ease-in-out transform hover:scale-[1.005]"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td> {/* Darker text for name for emphasis */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.email}</td> {/* Slightly darker text */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.phone || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.gender || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-2">
                                {/* Delete Button */}
                                <button
                                    onClick={() => onDelete && onDelete(teacher._id)}
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