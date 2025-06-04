import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Users, UserPlus, Search, Edit, Trash2, SlidersHorizontal, ArrowDownUp,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye
} from 'lucide-react'; // Added Eye icon for View Details
import UserDashboardContainer from '../../common/UserDashboardContainer';

// Mock data for students (expanded with more variety for better demonstration)
const studentsData = [
    { id: 'S-001', name: 'Alice Johnson', email: 'alice.j@example.com', enrolledCourses: 3, status: 'Active', lastLogin: '2025-06-03', registrationDate: '2024-01-15' },
    { id: 'S-002', name: 'Bob Williams', email: 'bob.w@example.com', enrolledCourses: 1, status: 'Active', lastLogin: '2025-06-02', registrationDate: '2024-03-20' },
    { id: 'S-003', name: 'Charlie Brown', email: 'charlie.b@example.com', enrolledCourses: 0, status: 'Inactive', lastLogin: '2025-05-28', registrationDate: '2024-02-10' },
    { id: 'S-004', name: 'Diana Prince', email: 'diana.p@example.com', enrolledCourses: 2, status: 'Active', lastLogin: '2025-06-01', registrationDate: '2024-04-01' },
    { id: 'S-005', name: 'Eve Adams', email: 'eve.a@example.com', enrolledCourses: 4, status: 'Active', lastLogin: '2025-06-03', registrationDate: '2023-11-01' },
    { id: 'S-006', name: 'Frank Miller', email: 'frank.m@example.com', enrolledCourses: 1, status: 'Active', lastLogin: '2025-06-02', registrationDate: '2024-05-05' },
    { id: 'S-007', name: 'Grace Taylor', email: 'grace.t@example.com', enrolledCourses: 0, status: 'Suspended', lastLogin: '2025-05-15', registrationDate: '2023-10-22' },
    { id: 'S-008', name: 'Henry Green', email: 'henry.g@example.com', enrolledCourses: 2, status: 'Active', lastLogin: '2025-06-01', registrationDate: '2024-01-25' },
    { id: 'S-009', name: 'Ivy White', email: 'ivy.w@example.com', enrolledCourses: 5, status: 'Active', lastLogin: '2025-06-03', registrationDate: '2023-09-01' },
    { id: 'S-010', name: 'Jack Black', email: 'jack.b@example.com', enrolledCourses: 0, status: 'Inactive', lastLogin: '2025-05-20', registrationDate: '2024-02-18' },
    { id: 'S-011', name: 'Karen Hall', email: 'karen.h@example.com', enrolledCourses: 3, status: 'Active', lastLogin: '2025-06-01', registrationDate: '2024-03-05' },
    { id: 'S-012', name: 'Liam King', email: 'liam.k@example.com', enrolledCourses: 1, status: 'Active', lastLogin: '2025-06-03', registrationDate: '2024-04-12' },
    { id: 'S-013', name: 'Mia Lewis', email: 'mia.l@example.com', enrolledCourses: 2, status: 'Active', lastLogin: '2025-05-30', registrationDate: '2023-12-01' },
    { id: 'S-014', name: 'Noah Young', email: 'noah.y@example.com', enrolledCourses: 0, status: 'Active', lastLogin: '2025-06-01', registrationDate: '2024-01-08' },
    { id: 'S-015', name: 'Olivia Scott', email: 'olivia.s@example.com', enrolledCourses: 3, status: 'Active', lastLogin: '2025-06-02', registrationDate: '2024-02-28' },
];


export default function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students per page
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Framer Motion Variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                when: 'beforeChildren',
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    // --- Search, Sort, and Pagination Logic ---

    const sortedStudents = useMemo(() => {
        let sortableStudents = [...studentsData];
        if (sortConfig.key) {
            sortableStudents.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableStudents;
    }, [studentsData, sortConfig]);

    const filteredStudents = useMemo(() => {
        return sortedStudents.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, sortedStudents]);

    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (key) => {
        if (!sortConfig.key) return;
        return sortConfig.key === key ? sortConfig.direction : undefined;
    };

    // --- Action Handlers (Placeholders) ---
    const handleAddStudent = () => {
        alert('Add Student functionality would open a form/modal here!');
        // In a real app, you'd navigate to a new route or open a modal
    };

    const handleEditStudent = (studentId) => {
        alert(`Edit Student with ID: ${studentId}`);
        // In a real app, you'd navigate to an edit form or open a modal with student data
    };

    const handleDeleteStudent = (studentId) => {
        if (window.confirm(`Are you sure you want to delete student ID: ${studentId}?`)) {
            alert(`Deleting student with ID: ${studentId}`);
            // In a real app, you'd dispatch an action to delete the student from your state/backend
        }
    };

    const handleViewStudentDetails = (studentId) => {
        alert(`Viewing details for student ID: ${studentId}`);
        // In a real app, you'd navigate to a student's dedicated profile page
    };


    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-6 md:p-8 lg:p-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
                    <Users className="mr-3 h-8 w-8 text-blue-600" /> Manage Students
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                    Efficiently **manage student accounts** on your platform. Use the search and filter options to quickly find specific students, or add new ones as needed.
                </p>

                {/* Main Content Block (Search, Filter, Add Button, Table) */}
                <motion.div
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                        {/* Search Input */}
                        <div className="relative flex-grow w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search by name, email, or ID..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-shrink-0 gap-3 w-full md:w-auto">
                            <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
                                <SlidersHorizontal className="h-5 w-5 mr-2" /> Filter
                            </button>
                            <button
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md font-medium"
                                onClick={handleAddStudent}
                            >
                                <UserPlus className="h-5 w-5 mr-2" /> Add Student
                            </button>
                        </div>
                    </div>

                    {/* Students Table */}
                    <div className="overflow-x-auto min-h-[300px]"> {/* Added min-h for consistent look */}
                        {filteredStudents.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-tl-lg"
                                            onClick={() => requestSort('id')}
                                        >
                                            ID {getClassNamesFor('id') === 'ascending' ? '↑' : getClassNamesFor('id') === 'descending' ? '↓' : <ArrowDownUp className="inline-block h-3 w-3 ml-1" />}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                            onClick={() => requestSort('name')}
                                        >
                                            Name {getClassNamesFor('name') === 'ascending' ? '↑' : getClassNamesFor('name') === 'descending' ? '↓' : <ArrowDownUp className="inline-block h-3 w-3 ml-1" />}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                            onClick={() => requestSort('enrolledCourses')}
                                        >
                                            Courses {getClassNamesFor('enrolledCourses') === 'ascending' ? '↑' : getClassNamesFor('enrolledCourses') === 'descending' ? '↓' : <ArrowDownUp className="inline-block h-3 w-3 ml-1" />}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                            onClick={() => requestSort('status')}
                                        >
                                            Status {getClassNamesFor('status') === 'ascending' ? '↑' : getClassNamesFor('status') === 'descending' ? '↓' : <ArrowDownUp className="inline-block h-3 w-3 ml-1" />}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                            onClick={() => requestSort('lastLogin')}
                                        >
                                            Last Login {getClassNamesFor('lastLogin') === 'ascending' ? '↑' : getClassNamesFor('lastLogin') === 'descending' ? '↓' : <ArrowDownUp className="inline-block h-3 w-3 ml-1" />}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {student.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {student.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                <a href={`mailto:${student.email}`} className="hover:underline">{student.email}</a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {student.enrolledCourses}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                    ${student.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                                                    ${student.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                    ${student.status === 'Suspended' ? 'bg-red-100 text-red-800' : ''}
                                                `}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.lastLogin}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                                        title="View Details"
                                                        onClick={() => handleViewStudentDetails(student.id)}
                                                    >
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                                                        title="Edit Student"
                                                        onClick={() => handleEditStudent(student.id)}
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                        title="Delete Student"
                                                        onClick={() => handleDeleteStudent(student.id)}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-10 text-gray-500 text-lg">
                                No students found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {filteredStudents.length > studentsPerPage && (
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                            <span>Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} results</span>
                            <div className="flex gap-1 sm:gap-2 mt-3 sm:mt-0">
                                {/* First Page */}
                                <button
                                    onClick={() => paginate(1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </button>
                                {/* Previous Page */}
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-100'} transition-colors`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                {/* Next Page */}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                                {/* Last Page */}
                                <button
                                    onClick={() => paginate(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}