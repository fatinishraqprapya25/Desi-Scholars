import { Eye, Edit, Trash2 } from 'lucide-react';

const TableBody = ({ teachers, handleEdit, handleDelete, handleViewDetails }) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-3 py-3 text-sm text-gray-800 break-words whitespace-normal">
                        {teacher.id}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 break-words whitespace-normal">
                        {teacher.name}
                    </td>
                    <td className="px-3 py-3 text-sm text-blue-600 break-words whitespace-normal hidden sm:table-cell">
                        <a href={`mailto:${teacher.email}`} className="hover:underline">{teacher.email}</a>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 text-center break-words whitespace-normal hidden md:table-cell">
                        {teacher.assignedCourses}
                    </td>
                    <td className="px-3 py-3 text-sm whitespace-normal">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                            ${teacher.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${teacher.status === 'On Leave' ? 'bg-orange-100 text-orange-800' : ''}
                            ${teacher.status === 'Retired' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                            {teacher.status}
                        </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500 break-words whitespace-normal hidden lg:table-cell">
                        {teacher.lastLogin}
                    </td>
                    <td className="px-3 py-3 text-center text-sm font-medium whitespace-nowrap">
                        <div className="flex justify-center items-center space-x-1 sm:space-x-1.5">
                            <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100" title="View Details" onClick={() => handleViewDetails(teacher.id)}>
                                <Eye className="h-4 w-4 sm:h-4.5 w-4.5" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100" title="Edit Teacher" onClick={() => handleEdit(teacher.id)}>
                                <Edit className="h-4 w-4 sm:h-4.5 w-4.5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100" title="Delete Teacher" onClick={() => handleDelete(teacher.id)}>
                                <Trash2 className="h-4 w-4 sm:h-4.5 w-4.5" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;