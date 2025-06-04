import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import {
    Users, UserPlus, Search, Edit, Trash2, SlidersHorizontal, ArrowDownUp,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, X // Added X for close icon
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

// Initial mock data (will be moved to state)
const initialStudentsData = [
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
    const [students, setStudents] = useState(initialStudentsData); // Manage students in state
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentEmail, setNewStudentEmail] = useState('');

    const sectionVariants = { /* ... (same as before) ... */ };
    const itemVariants = { /* ... (same as before) ... */ };
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
    };


    const sortedStudents = useMemo(() => {
        let sortableStudents = [...students]; // Use students from state
        if (sortConfig.key) {
            sortableStudents.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (typeof valA === 'number' && typeof valB === 'number') return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
                if (typeof valA === 'string' && typeof valB === 'string') {
                    if (valA.toLowerCase() < valB.toLowerCase()) return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (valA.toLowerCase() > valB.toLowerCase()) return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableStudents;
    }, [students, sortConfig]); // IMPORTANT: Update dependency to students

    const filteredStudents = useMemo(() => {
        return sortedStudents.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, sortedStudents]);

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const requestSort = (key) => { /* ... (same as before) ... */ };
    const getClassNamesForSort = (key) => { /* ... (same as before) ... */ };

    // --- Modal Action Handlers ---
    const handleOpenModal = () => {
        setNewStudentName('');
        setNewStudentEmail('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveNewStudent = () => {
        if (!newStudentName.trim() || !newStudentEmail.trim()) {
            alert('Please fill in both name and email.');
            return;
        }
        // Basic email validation (optional)
        if (!/\S+@\S+\.\S+/.test(newStudentEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        const newIdNumber = students.length > 0 ? Math.max(...students.map(s => parseInt(s.id.split('-')[1]))) + 1 : 1;
        const newStudent = {
            id: `S-${String(newIdNumber).padStart(3, '0')}`,
            name: newStudentName,
            email: newStudentEmail,
            enrolledCourses: 0,
            status: 'Active',
            lastLogin: new Date().toISOString().split('T')[0], // Today's date
            registrationDate: new Date().toISOString().split('T')[0] // Today's date
        };
        setStudents(prevStudents => [newStudent, ...prevStudents]); // Add to the beginning of the list
        handleCloseModal();
    };


    const handleEditStudent = (studentId) => alert(`Edit Student with ID: ${studentId}`);
    const handleDeleteStudent = (studentId) => {
        if (window.confirm(`Are you sure you want to delete student ID: ${studentId}?`)) {
            setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
            alert(`Deleted student with ID: ${studentId}`);
        }
    };
    const handleViewStudentDetails = (studentId) => alert(`Viewing details for student ID: ${studentId}`);

    // Close modal on Escape key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isModalOpen]);


    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants} initial="hidden" animate="visible"
            >
                {/* ... Header and Paragraph ... (same as your refined version) */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <Users className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 lg:h-8 text-blue-600" /> Manage Students
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Efficiently <strong>manage student accounts</strong> on your platform. Use the search and filter options to quickly find specific students, or add new ones as needed.
                </p>


                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                >
                    {/* ... Search and Filter Buttons ... (Filter button is a placeholder) */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <div className="relative flex-grow w-full md:w-auto mb-3 md:mb-0">
                            <input
                                type="text"
                                placeholder="Search by name, email, ID..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5" />
                        </div>

                        <div className="flex flex-col sm:flex-row flex-shrink-0 gap-2 sm:gap-3 w-full md:w-auto">
                            <button className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-xs sm:text-sm">
                                <SlidersHorizontal className="h-4 w-4 mr-1.5 sm:mr-2" /> Filter
                            </button>
                            <button
                                className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium text-xs sm:text-sm"
                                onClick={handleOpenModal} // Changed to handleOpenModal
                            >
                                <UserPlus className="h-4 w-4 mr-1.5 sm:mr-2" /> Add Student
                            </button>
                        </div>
                    </div>

                    {/* ... Students Table ... (same as your refined version, ensure dependencies for sort/filter use 'students' state) */}
                    <div className="overflow-x-auto min-h-[300px] w-full">
                        {filteredStudents.length > 0 ? (
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
                                    {currentStudents.map((student) => (
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
                                                    <button onClick={() => handleViewStudentDetails(student.id)} className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100" title="View Details"><Eye className="h-4 w-4 sm:h-4.5" /></button>
                                                    <button onClick={() => handleEditStudent(student.id)} className="p-1 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-100" title="Edit Student"><Edit className="h-4 w-4 sm:h-4.5" /></button>
                                                    <button onClick={() => handleDeleteStudent(student.id)} className="p-1 text-red-600 hover:text-red-900 rounded-full hover:bg-red-100" title="Delete Student"><Trash2 className="h-4 w-4 sm:h-4.5" /></button>
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


                    {/* ... Pagination ... (same as your refined version) */}
                    {totalPages > 1 && filteredStudents.length > 0 && (
                        <div className="mt-5 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-3">
                            <span>Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length}</span>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                                <button onClick={() => paginate(1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronsLeft className="h-3.5 w-3.5 sm:h-4" /></button>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronLeft className="h-3.5 w-3.5 sm:h-4" /></button>
                                <span className="px-2 sm:px-3 py-1 sm:py-1.5 border rounded-md bg-gray-50 text-xs sm:text-sm">Page {currentPage} of {totalPages}</span>
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="h-3.5 w-3.5 sm:h-4" /></button>
                                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronsRight className="h-3.5 w-3.5 sm:h-4" /></button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Add Student Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }}
                        onClick={handleCloseModal} // Close on backdrop click
                    >
                        <motion.div
                            className="bg-white p-5 sm:p-7 rounded-xl shadow-2xl w-full max-w-md relative"
                            variants={modalVariants}
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-semibold mb-5 text-gray-800">Add New Student</h3>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="studentName"
                                        value={newStudentName}
                                        onChange={(e) => setNewStudentName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="e.g., John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="studentEmail"
                                        value={newStudentEmail}
                                        onChange={(e) => setNewStudentEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="e.g., john.doe@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveNewStudent}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Student
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </UserDashboardContainer>
    );
}