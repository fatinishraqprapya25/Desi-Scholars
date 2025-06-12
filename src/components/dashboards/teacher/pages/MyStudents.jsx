import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import StudentsTable from '../students/StudentsTable';
import StudentsControls from '../students/StudentsControl';
import Pagination from '../students/Pagination';
import { Users } from 'lucide-react';
import PageHeader from "../../common/PageHeader";

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

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function MyStudents() {
    const [students, setStudents] = useState(initialStudentsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedStudents = useMemo(() => {
        let sortableStudents = [...students];
        if (sortConfig.key) {
            sortableStudents.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];

                // Handle numbers
                if (typeof valA === 'number' && typeof valB === 'number') {
                    return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
                }
                // Handle strings (case-insensitive)
                if (typeof valA === 'string' && typeof valB === 'string') {
                    const res = valA.toLowerCase().localeCompare(valB.toLowerCase());
                    return sortConfig.direction === 'ascending' ? res : -res;
                }
                // Fallback for other types or mixed types
                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableStudents;
    }, [students, sortConfig]);


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
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, studentsPerPage]);

    // Removed handleDeleteStudent as delete functionality is being removed
    // Removed handleViewStudentDetails as view/edit functionality is being removed

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = null; // Cycles to no sort
            key = null;
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesForSort = (key) => {
        if (!sortConfig.key || sortConfig.key !== key) {
            return '';
        }
        return sortConfig.direction; // 'ascending' or 'descending'
    };


    return (
        <UserDashboardContainer role={"teacher"}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants} initial="hidden" animate="visible"
            >
                <PageHeader title="Manage Students" icon={<Users />} />

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                >
                    <StudentsControls
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    // Removed onAddStudentClick as it's not directly related to edit/delete and might be part of other functionality
                    // If 'Add Student' should also be removed, remove this prop and the button in StudentsControls
                    />

                    <StudentsTable
                        students={currentStudents}
                        requestSort={requestSort}
                        getClassNamesForSort={getClassNamesForSort}
                        // Removed onView prop
                        // Removed onDelete prop
                        hasStudents={filteredStudents.length > 0}
                    />

                    {totalPages > 1 && filteredStudents.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={filteredStudents.length}
                            itemsPerPage={studentsPerPage}
                            indexOfFirstItem={indexOfFirstStudent}
                            indexOfLastItem={indexOfLastStudent}
                        />
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}