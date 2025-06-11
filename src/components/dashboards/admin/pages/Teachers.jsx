// src/components/teachers/TeachersPage.jsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, UserPlus, SlidersHorizontal } from 'lucide-react';

// Reusable Components
import UserDashboardContainer from '../../common/UserDashboardContainer';
import DashboardHeader from '../../common/PageHeader';
import SearchBar from '../teachers/SearchBar';
import ActionButton from '../teachers/ActionButton';
import AddTeacherModal from '../teachers/AddTeacherModal';
import TeacherTable from '../teachers/TeacherTable';
import TablePagination from '../teachers/TablePagination';
import PageHeader from '../../common/PageHeader';


const teachersData = [
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
    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const [allTeachers, setAllTeachers] = useState(teachersData); // State to hold teachers, allowing adds/deletes

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Columns configuration for the table
    const tableColumns = useMemo(() => [
        { key: 'id', label: 'ID', sortable: true, className: '' },
        { key: 'name', label: 'Name', sortable: true, className: '' },
        { key: 'email', label: 'Email', sortable: false, className: 'hidden sm:table-cell' },
        { key: 'assignedCourses', label: 'Courses', sortable: true, className: 'hidden md:table-cell' },
        { key: 'status', label: 'Status', sortable: true, className: '' },
        { key: 'lastLogin', label: 'Last Login', sortable: true, className: 'hidden lg:table-cell' },
    ], []);


    const sortedTeachers = useMemo(() => {
        let sortableTeachers = [...allTeachers]; // Use allTeachers state
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
    }, [allTeachers, sortConfig]);


    const filteredTeachers = useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return sortedTeachers.filter(teacher =>
            teacher.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            teacher.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            teacher.id.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [searchTerm, sortedTeachers]);

    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
    const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleAddTeacher = (newTeacher) => {
        const newId = `T-${String(allTeachers.length + 1).padStart(3, '0')}`; // Simple ID generation
        setAllTeachers(prev => [
            ...prev,
            { ...newTeacher, id: newId, assignedCourses: 0, status: 'Active', lastLogin: new Date().toISOString().slice(0, 10), hireDate: new Date().toISOString().slice(0, 10) }
        ]);
    };

    const handleEditTeacher = (teacherId) => {
        console.log('Edit teacher:', teacherId);
        // Implement edit logic here, perhaps open an edit modal
    };

    const handleDeleteTeacher = (teacherId) => {
        if (window.confirm(`Are you sure you want to delete teacher ${teacherId}?`)) {
            setAllTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
        }
    };

    const handleViewTeacherDetails = (teacherId) => {
        console.log('View teacher details:', teacherId);
        // Implement view details logic here, perhaps navigate to a detail page or open a view-only modal
    };

    return (
        <UserDashboardContainer role={"admin"}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader
                    title="Manage Educators"
                    icon={<Briefcase />}
                    sectionVariants={sectionVariants}
                />

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            placeholder="Search by name, email, or ID..."
                        />
                        <div className="flex flex-col sm:flex-row flex-shrink-0 gap-2 sm:gap-3 w-full md:w-auto">
                            <ActionButton icon={SlidersHorizontal} variant="secondary">Filter</ActionButton>
                            <ActionButton icon={UserPlus} onClick={() => setShowAddTeacherModal(true)} variant="primary">Add Teacher</ActionButton>
                        </div>
                    </div>

                    <TeacherTable
                        teachers={currentTeachers}
                        sortConfig={sortConfig}
                        requestSort={requestSort}
                        handleEdit={handleEditTeacher}
                        handleDelete={handleDeleteTeacher}
                        handleViewDetails={handleViewTeacherDetails}
                        columns={tableColumns}
                    />

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        filteredLength={filteredTeachers.length}
                        indexOfFirst={indexOfFirstTeacher}
                        indexOfLast={indexOfLastTeacher}
                        paginate={paginate}
                    />
                </motion.div>
            </motion.div>

            <AddTeacherModal
                isOpen={showAddTeacherModal}
                onClose={() => setShowAddTeacherModal(false)}
                onSave={handleAddTeacher}
            />
        </UserDashboardContainer>
    );
}