import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../../common/PageHeader';

const staticStudents = [
    { id: 'S-001', name: 'Alice Johnson', email: 'alice.j@example.com', enrolledCourses: 3, status: 'Active', lastLogin: '2025-06-03', registrationDate: '2024-01-15' },
    { id: 'S-002', name: 'Bob Williams', email: 'bob.w@example.com', enrolledCourses: 1, status: 'Active', lastLogin: '2025-06-02', registrationDate: '2024-03-20' },
    { id: 'S-003', name: 'Charlie Brown', email: 'charlie.b@example.com', enrolledCourses: 0, status: 'Inactive', lastLogin: '2025-05-28', registrationDate: '2024-02-10' },
    { id: 'S-004', name: 'Diana Prince', email: 'diana.p@example.com', enrolledCourses: 2, status: 'Active', lastLogin: '2025-06-01', registrationDate: '2024-04-01' },
    { id: 'S-005', name: 'Eve Adams', email: 'eve.a@example.com', enrolledCourses: 4, status: 'Active', lastLogin: '2025-06-03', registrationDate: '2023-11-01' },
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
    return (
        <UserDashboardContainer role="teacher">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader title="Manage Students" icon={<Users />} />

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-sm text-left text-gray-700">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-2 font-semibold">ID</th>
                                    <th className="px-4 py-2 font-semibold">Name</th>
                                    <th className="px-4 py-2 font-semibold">Email</th>
                                    <th className="px-4 py-2 font-semibold">Courses</th>
                                    <th className="px-4 py-2 font-semibold">Status</th>
                                    <th className="px-4 py-2 font-semibold">Last Login</th>
                                    <th className="px-4 py-2 font-semibold">Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staticStudents.map((student) => (
                                    <tr key={student.id} className="border-t">
                                        <td className="px-4 py-2">{student.id}</td>
                                        <td className="px-4 py-2">{student.name}</td>
                                        <td className="px-4 py-2">{student.email}</td>
                                        <td className="px-4 py-2">{student.enrolledCourses}</td>
                                        <td className="px-4 py-2">{student.status}</td>
                                        <td className="px-4 py-2">{student.lastLogin}</td>
                                        <td className="px-4 py-2">{student.registrationDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}
