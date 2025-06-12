import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenText, CheckCircle, XCircle, Loader2, Save } from 'lucide-react'; // Icons for clarity
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../../common/PageHeader';

// --- Mock Data ---
// In a real application, this data would come from an API (e.g., Firestore)

const mockAssignments = [
    { id: 'A-001', title: 'Introduction to React', course: 'Web Development Basics', dueDate: '2025-06-15' },
    { id: 'A-002', title: 'CSS Layout Techniques', course: 'Web Design Principles', dueDate: '2025-06-20' },
    { id: 'A-003', title: 'Database Fundamentals', course: 'Data Management 101', dueDate: '2025-06-25' },
    { id: 'A-004', title: 'Advanced JavaScript Concepts', course: 'Web Development Basics', dueDate: '2025-07-01' },
];

const mockStudents = [
    { id: 'S-001', name: 'Alice Johnson', email: 'alice.j@example.com' },
    { id: 'S-002', name: 'Bob Williams', email: 'bob.w@example.com' },
    { id: 'S-003', name: 'Charlie Brown', email: 'charlie.b@example.com' },
    { id: 'S-004', name: 'Diana Prince', email: 'diana.p@example.com' },
    { id: 'S-005', name: 'Eve Adams', email: 'eve.a@example.com' },
];

const mockSubmissions = [
    { id: 'SUB-001', assignmentId: 'A-001', studentId: 'S-001', submissionDate: '2025-06-14', status: 'Submitted', grade: null, feedback: null },
    { id: 'SUB-002', assignmentId: 'A-001', studentId: 'S-002', submissionDate: '2025-06-13', status: 'Submitted', grade: 85, feedback: 'Good work, minor refactoring needed.' },
    { id: 'SUB-003', assignmentId: 'A-001', studentId: 'S-003', submissionDate: '2025-06-16', status: 'Late', grade: null, feedback: null },
    { id: 'SUB-004', assignmentId: 'A-002', studentId: 'S-001', submissionDate: '2025-06-19', status: 'Submitted', grade: null, feedback: null },
    { id: 'SUB-005', assignmentId: 'A-002', studentId: 'S-004', submissionDate: '2025-06-18', status: 'Submitted', grade: 92, feedback: 'Excellent use of Flexbox!' },
    { id: 'SUB-006', assignmentId: 'A-003', studentId: 'S-005', submissionDate: '2025-06-24', status: 'Submitted', grade: null, feedback: null },
    { id: 'SUB-007', assignmentId: 'A-003', studentId: 'S-002', submissionDate: '2025-06-23', status: 'Submitted', grade: 78, feedback: 'Understand JOINs better.' },
    { id: 'SUB-008', assignmentId: 'A-004', studentId: 'S-001', submissionDate: null, status: 'Not Submitted', grade: null, feedback: null },
    { id: 'SUB-009', assignmentId: 'A-004', studentId: 'S-003', submissionDate: null, status: 'Not Submitted', grade: null, feedback: null },
    { id: 'SUB-010', assignmentId: 'A-004', studentId: 'S-005', submissionDate: '2025-06-30', status: 'Submitted', grade: null, feedback: null },
];

// --- Custom Modal Component ---
const Modal = ({ show, onClose, title, message, type }) => {
    if (!show) return null;

    const icon = type === 'success' ? (
        <CheckCircle className="text-green-500 w-12 h-12" />
    ) : type === 'error' ? (
        <XCircle className="text-red-500 w-12 h-12" />
    ) : (
        <Loader2 className="text-blue-500 w-12 h-12 animate-spin" />
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border border-gray-200"
            >
                <div className="mb-4 flex justify-center">
                    {icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                {type !== 'loading' && (
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
                    >
                        Close
                    </button>
                )}
            </motion.div>
        </div>
    );
};

// --- Main Grade Assignments Page Component ---
export default function GradeAssignmentsPage() {
    const [assignments] = useState(mockAssignments);
    const [students] = useState(mockStudents);
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignments[0]?.id || '');
    const [isSaving, setIsSaving] = useState(false);
    const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '', type: '' });

    // Combine submissions with student data for display
    const detailedSubmissions = useMemo(() => {
        return submissions
            .filter(sub => sub.assignmentId === selectedAssignmentId)
            .map(sub => {
                const student = students.find(s => s.id === sub.studentId);
                return {
                    ...sub,
                    studentName: student ? student.name : 'Unknown Student',
                    studentEmail: student ? student.email : 'N/A',
                };
            });
    }, [submissions, selectedAssignmentId, students]);

    // Handle grade input changes
    const handleGradeChange = useCallback((submissionId, newGrade) => {
        setSubmissions(prevSubmissions =>
            prevSubmissions.map(sub =>
                sub.id === submissionId ? { ...sub, grade: newGrade === '' ? null : parseInt(newGrade, 10) } : sub
            )
        );
    }, []);

    // Simulate saving grades
    const handleSaveGrades = useCallback(async () => {
        setIsSaving(true);
        setModalConfig({ show: true, title: 'Saving...', message: 'Please wait while grades are being updated.', type: 'loading' });

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you'd send `submissions` data to your backend here
            console.log('Grades saved:', submissions);

            setModalConfig({ show: true, title: 'Success!', message: 'Grades have been saved successfully.', type: 'success' });
        } catch (error) {
            console.error('Error saving grades:', error);
            setModalConfig({ show: true, title: 'Error', message: 'Failed to save grades. Please try again.', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    }, [submissions]);

    useEffect(() => {
        if (!selectedAssignmentId && assignments.length > 0) {
            setSelectedAssignmentId(assignments[0].id);
        }
    }, [assignments, selectedAssignmentId]);

    return (
        <UserDashboardContainer role="teacher">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.5 } },
                }}
            >
                <PageHeader title="Grade Assignments" icon={<BookOpenText size={48} />} />

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                >
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Select Assignment</h2>
                    <select
                        value={selectedAssignmentId}
                        onChange={(e) => setSelectedAssignmentId(e.target.value)}
                        className="w-full sm:w-1/2 lg:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-700"
                    >
                        {assignments.map(assignment => (
                            <option key={assignment.id} value={assignment.id}>
                                {assignment.title} (Due: {assignment.dueDate})
                            </option>
                        ))}
                    </select>
                </motion.div>

                {selectedAssignmentId && (
                    <motion.div
                        className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                    >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Submissions for {assignments.find(a => a.id === selectedAssignmentId)?.title}</h2>

                        {detailedSubmissions.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                                                Student Name
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Submission Date
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Current Grade
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                                                Grade (0-100)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <AnimatePresence>
                                            {detailedSubmissions.map((submission) => (
                                                <motion.tr
                                                    key={submission.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    layout
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {submission.studentName}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {submission.submissionDate || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                            ${submission.status === 'Submitted' ? 'bg-green-100 text-green-800' :
                                                                submission.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'}`}>
                                                            {submission.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {submission.grade !== null ? submission.grade : 'Ungraded'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={submission.grade !== null ? submission.grade : ''}
                                                            onChange={(e) => handleGradeChange(submission.id, e.target.value)}
                                                            className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800 shadow-sm"
                                                            placeholder="Grade"
                                                        />
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8 text-gray-500 italic"
                            >
                                No submissions found for this assignment.
                            </motion.div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleSaveGrades}
                                disabled={isSaving || detailedSubmissions.length === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform shadow-md
                                    ${isSaving || detailedSubmissions.length === 0
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                                    }`}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} /> Save All Grades
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {modalConfig.show && (
                    <Modal
                        show={modalConfig.show}
                        onClose={() => setModalConfig({ ...modalConfig, show: false })}
                        title={modalConfig.title}
                        message={modalConfig.message}
                        type={modalConfig.type}
                    />
                )}
            </AnimatePresence>
        </UserDashboardContainer>
    );
}
