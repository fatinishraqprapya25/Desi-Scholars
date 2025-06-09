import { Edit, Trash2, Eye, ArrowDownUp } from 'lucide-react';

export default function StudentsTable({
    students,
    requestSort,
    getClassNamesForSort,
    onView,
    onEdit,
    onDelete,
    hasStudents
}) {
    return (
        <div className="overflow-x-auto min-h-[300px] w-full">
            {hasStudents ? (
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            {[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'email', label: 'Email', className: 'hidden sm:table-cell' }, { key: 'enrolledCourses', label: 'Courses', className: 'hidden md:table-cell text-center' }, { key: 'status', label: 'Status' }, { key: 'lastLogin', label: 'Last Login', className: 'hidden lg:table-cell' }, { key: 'actions', label: 'Actions', noSort: true, classNameHeader: 'text-center' }].map(header => (
                                <th
                                    key={header.key}
                                    scope="col"
                                    className={`px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${header.noSort ? '' : 'cursor-pointer hover:bg-gray-100'} ${header.className || ''} ${header.classNameHeader || ''} ${header.key === 'id' ? 'rounded-tl-lg' : ''} ${header.key === 'actions' ? 'rounded-tr-lg' : ''}`}
                                    onClick={() => !header.noSort && requestSort(header.key)}
                                >
                                    {header.label}
                                    {!header.noSort && (getClassNamesForSort(header.key) === 'ascending' ? ' ↑' : getClassNamesForSort(header.key) === 'descending' ? ' ↓' : <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 py-3.5 text-sm text-gray-800 whitespace-normal break-words">{student.id}</td>
                                <td className="px-3 py-3.5 text-sm text-gray-800 whitespace-normal break-words">{student.name}</td>
                                <td className="px-3 py-3.5 text-sm text-blue-600 whitespace-normal break-words hidden sm:table-cell">
                                    <a href={`mailto:${student.email}`} className="hover:underline">{student.email}</a>
                                </td>
                                <td className="px-3 py-3.5 text-sm text-gray-700 whitespace-normal break-words hidden md:table-cell text-center">{student.enrolledCourses}</td>
                                <td className="px-3 py-3.5 text-sm whitespace-normal">
                                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${student.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                                        ${student.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : ''}
                                        ${student.status === 'Suspended' ? 'bg-red-100 text-red-800' : ''}
                                    `}>{student.status}</span>
                                </td>
                                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-normal break-words hidden lg:table-cell">{student.lastLogin}</td>
                                <td className="px-3 py-3.5 text-sm font-medium text-center whitespace-nowrap">
                                    <div className="flex justify-center items-center space-x-1 sm:space-x-1.5">
                                        <button onClick={() => onView(student.id)} className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100" title="View Details"><Eye className="h-4 w-4 sm:h-4.5" /></button>
                                        <button onClick={() => onEdit(student.id)} className="p-1 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-100" title="Edit Student"><Edit className="h-4 w-4 sm:h-4.5" /></button>
                                        <button onClick={() => onDelete(student.id)} className="p-1 text-red-600 hover:text-red-900 rounded-full hover:bg-red-100" title="Delete Student"><Trash2 className="h-4 w-4 sm:h-4.5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-10 text-gray-500 text-sm sm:text-base">No students found matching your criteria.</div>
            )}
        </div>
    );
}