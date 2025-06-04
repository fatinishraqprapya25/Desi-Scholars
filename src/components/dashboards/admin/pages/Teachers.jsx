import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, UserPlus, Search, Edit, Trash2, SlidersHorizontal, ArrowDownUp,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer'; // Assuming this component exists

// Mock data for teachers
const teachersData = [
    // ... (your data remains the same)
    { id: 'T-001', name: 'Dr. Emily White', email: 'emily.w@example.com', assignedCourses: 2, status: 'Active', lastLogin: '2025-06-04', hireDate: '2022-09-01' },
    { id: 'T-002', name: 'Prof. David Lee', email: 'david.l@example.com', assignedCourses: 3, status: 'Active', lastLogin: '2025-06-03', hireDate: '2021-03-10' },
    { id: 'T-003', name: 'Ms. Sarah Chen', email: 'sarah.c@example.com', assignedCourses: 1, status: 'Inactive', lastLogin: '2025-05-29', hireDate: '2023-01-20' },
    { id: 'T-004', name: 'Mr. Alex Kim', email: 'alex.k@example.com', assignedCourses: 4, status: 'Active', lastLogin: '2025-06-04', hireDate: '2020-11-15' },
    { id: 'T-005', name: 'Dr. Olivia Brown', email: 'olivia.b@example.com', assignedCourses: 2, status: 'Active', lastLogin: '2025-06-02', hireDate: '2022-04-01' },
    { id: 'T-006', name: 'Prof. James Green', email: 'james.g@example.com', assignedCourses: 0, status: 'On Leave', lastLogin: '2025-05-20', hireDate: '2019-07-01' },
    { id: 'T-007', name: 'Ms. Laura Davis', email: 'laura.d@example.com', assignedCourses: 3, status: 'Active', lastLogin: '2025-06-03', hireDate: '2023-09-10' },
    { id: 'T-008', name: 'Mr. Michael Taylor', email: 'michael.t@example.com', assignedCourses: 1, status: 'Active', lastLogin: '2025-06-01', hireDate: '2024-02-28' },
    { id: 'T-009', name: 'Dr. Nancy Wilson', email: 'nancy.w@example.com', assignedCourses: 5, status: 'Active', lastLogin: '2025-06-04', hireDate: '2018-12-01' },
    { id: 'T-010', name: 'Prof. Robert Johnson', email: 'robert.j@example.com', assignedCourses: 0, status: 'Retired', lastLogin: '2025-04-15', hireDate: '2017-05-01' },
    { id: 'T-011', name: 'Ms. Linda Martinez', email: 'linda.m@example.com', assignedCourses: 2, status: 'Active', lastLogin: '2025-06-02', hireDate: '2024-01-05' },
    { id: 'T-012', name: 'Mr. Daniel Garcia', email: 'daniel.g@example.com', assignedCourses: 3, status: 'Active', lastLogin: '2025-06-03', hireDate: '2023-06-20' },
];


export default function TeachersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [teachersPerPage] = useState(8);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sectionVariants = { /* ... (no change) ... */ };
    const itemVariants = { /* ... (no change) ... */ };
    const sortedTeachers = useMemo(() => { /* ... (no change, ensure teachersData is stable or in deps) ... */
        let sortableTeachers = [...teachersData];
        if (sortConfig.key) {
            sortableTeachers.sort((a, b) => {
                const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
                const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableTeachers;
    }, [teachersData, sortConfig]);


    const filteredTeachers = useMemo(() => { /* ... (no change) ... */
        return sortedTeachers.filter(teacher =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, sortedTeachers]);

    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

    const requestSort = (key) => { /* ... (no change) ... */ };
    const getClassNamesFor = (key) => { /* ... (no change) ... */ };
    const handleAddTeacher = () => { /* ... (no change) ... */ };
    const handleEditTeacher = (teacherId) => { /* ... (no change) ... */ };
    const handleDeleteTeacher = (teacherId) => { /* ... (no change) ... */ };
    const handleViewTeacherDetails = (teacherId) => { /* ... (no change) ... */ };

    return (
        <UserDashboardContainer admin={true}>
            {/* Main page container with responsive padding and max-width */}
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto" // Reduced lg padding slightly
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <Briefcase className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" /> Manage Educators
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Oversee and <strong>manage all faculty accounts</strong> on your platform. Utilize robust search, sorting, and filtering tools to efficiently locate and manage teacher profiles.
                </p>

                {/* Content block: search, buttons, table, pagination */}
                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100" // Reduced padding
                    variants={itemVariants}
                >
                    {/* Search and Action Buttons Row */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <div className="relative flex-grow w-full md:w-auto mb-3 md:mb-0">
                            <input
                                type="text"
                                placeholder="Search..." // Shorter placeholder for small screens
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <div className="flex flex-col sm:flex-row flex-shrink-0 gap-2 sm:gap-3 w-full md:w-auto">
                            <button className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium text-xs sm:text-sm">
                                <SlidersHorizontal className="h-4 w-4 mr-1.5 sm:mr-2" /> Filter
                            </button>
                            <button
                                className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md font-medium text-xs sm:text-sm"
                                onClick={handleAddTeacher}
                            >
                                <UserPlus className="h-4 w-4 mr-1.5 sm:mr-2" /> Add Teacher
                            </button>
                        </div>
                    </div>

                    {/* Teachers Table Container - THIS IS CRITICAL FOR TABLE RESPONSIVENESS */}
                    <div className="overflow-x-auto min-h-[300px] w-full"> {/* Ensure this div takes full width of its parent */}
                        {filteredTeachers.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200 table-auto"> {/* table-auto can sometimes help, or table-fixed if you set col widths */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* Reduced padding, ensure text can wrap or is short */}
                                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('id')}>
                                            ID {getClassNamesFor('id') ? (getClassNamesFor('id') === 'asc' ? '↑' : '↓') : <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />}
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('name')}>
                                            Name {getClassNamesFor('name') ? (getClassNamesFor('name') === 'asc' ? '↑' : '↓') : <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />}
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"> {/* Hidden on xs, shown from sm */}
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell" onClick={() => requestSort('assignedCourses')}> {/* Hidden on sm, shown from md */}
                                            Courses {getClassNamesFor('assignedCourses') ? (getClassNamesFor('assignedCourses') === 'asc' ? '↑' : '↓') : <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />}
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('status')}>
                                            Status {getClassNamesFor('status') ? (getClassNamesFor('status') === 'asc' ? '↑' : '↓') : <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />}
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-gray-100" onClick={() => requestSort('lastLogin')}> {/* Hidden on md, shown from lg */}
                                            Last Login {getClassNamesFor('lastLogin') ? (getClassNamesFor('lastLogin') === 'asc' ? '↑' : '↓') : <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />}
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentTeachers.map((teacher) => (
                                        <tr key={teacher.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            {/* Use break-words for content that might overflow its cell */}
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
                                            <td className="px-3 py-3 text-sm whitespace-normal"> {/* whitespace-normal to allow wrapping if status text is long */}
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
                                            <td className="px-3 py-3 text-center text-sm font-medium whitespace-nowrap"> {/* Actions usually don't wrap */}
                                                <div className="flex justify-center items-center space-x-1 sm:space-x-1.5">
                                                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100" title="View Details" onClick={() => handleViewTeacherDetails(teacher.id)}>
                                                        <Eye className="h-4 w-4 sm:h-4.5 w-4.5" />
                                                    </button>
                                                    <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100" title="Edit Teacher" onClick={() => handleEditTeacher(teacher.id)}>
                                                        <Edit className="h-4 w-4 sm:h-4.5 w-4.5" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100" title="Delete Teacher" onClick={() => handleDeleteTeacher(teacher.id)}>
                                                        <Trash2 className="h-4 w-4 sm:h-4.5 w-4.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-10 text-gray-500 text-sm sm:text-base">
                                No teachers found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && filteredTeachers.length > 0 && ( // Show only if multiple pages & results exist
                        <div className="mt-5 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-3">
                            <span>
                                Showing {indexOfFirstTeacher + 1}-{Math.min(indexOfLastTeacher, filteredTeachers.length)} of {filteredTeachers.length}
                            </span>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                                <button onClick={() => paginate(1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"> <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> </button>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"> <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> </button>

                                {/* Simplified Page Number Display for extreme responsiveness */}
                                <span className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md bg-gray-50">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"> <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> </button>
                                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"> <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}