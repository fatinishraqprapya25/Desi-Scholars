import React, { useState, useEffect } from 'react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

const PaymentApprovalPage = () => {
    // Example payment requests data. In a real application, this would come from an API.
    const [payments, setPayments] = useState([
        {
            id: 1,
            courseName: 'React Basics',
            purchaseId: 'PURCH-12345',
            transactionId: 'TXN-67890',
            status: 'Pending',
            date: '2025-06-14',
            amount: 5000,
        },
        {
            id: 2,
            courseName: 'JavaScript Mastery',
            purchaseId: 'PURCH-54321',
            transactionId: 'TXN-09876',
            status: 'Pending',
            date: '2025-06-13',
            amount: 7500,
        },
        {
            id: 3,
            courseName: 'Full Stack Development',
            purchaseId: 'PURCH-98765',
            transactionId: 'TXN-11223',
            status: 'Approved',
            date: '2025-06-12',
            amount: 10000,
        },
        {
            id: 4,
            courseName: 'Python for Data Science',
            purchaseId: 'PURCH-24680',
            transactionId: 'TXN-44556',
            status: 'Declined',
            date: '2025-06-11',
            amount: 6000,
        },
        {
            id: 5,
            courseName: 'UX/UI Design Principles',
            purchaseId: 'PURCH-13579',
            transactionId: 'TXN-77889',
            status: 'Pending',
            date: '2025-06-10',
            amount: 4500,
        },
    ]);

    // State to manage the active filter/tab: 'all', 'pending', 'approved', 'declined'.
    const [activeFilter, setActiveFilter] = useState('pending');

    // Load Inter font for a better visual appeal
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    // Handler to update payment status (Approve/Decline).
    const handleAction = (id, action) => {
        setPayments(prev =>
            prev.map(payment =>
                payment.id === id ? { ...payment, status: action } : payment
            )
        );
    };

    // Filter payments based on the activeFilter state.
    const filteredPayments = payments.filter(payment => {
        if (activeFilter === 'all') {
            return true;
        } else if (activeFilter === 'pending') {
            return payment.status === 'Pending';
        } else if (activeFilter === 'approved') {
            return payment.status === 'Approved';
        } else if (activeFilter === 'declined') {
            return payment.status === 'Declined';
        }
        return true; // Default to showing all if filter is unknown
    });

    return (
        // Main container
        <UserDashboardContainer role="admin">
            {/* Removed background color classes from this div */}
            <div className="min-h-screen p-6 font-sans antialiased">
                <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">
                    {/* Page Title */}
                    <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">
                        Payment Approvals Dashboard
                    </h1>

                    {/* Filter/Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveFilter('pending')}
                            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
                            ${activeFilter === 'pending'
                                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                                    : 'bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                                }`}
                        >
                            Pending ({payments.filter(p => p.status === 'Pending').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('approved')}
                            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
                            ${activeFilter === 'approved'
                                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                                    : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700'
                                }`}
                        >
                            Recent Approved ({payments.filter(p => p.status === 'Approved').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('declined')}
                            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
                            ${activeFilter === 'declined'
                                    ? 'bg-red-600 text-white shadow-lg transform scale-105'
                                    : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700'
                                }`}
                        >
                            Recent Declined ({payments.filter(p => p.status === 'Declined').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
                            ${activeFilter === 'all'
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                                }`}
                        >
                            Payment History ({payments.length})
                        </button>
                    </div>

                    {/* Payment List Table */}
                    {filteredPayments.length === 0 ? (
                        <p className="text-center text-xl text-gray-500 py-10">No payments found for this category.</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Course Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Purchase ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPayments.map(payment => (
                                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.courseName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.purchaseId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.transactionId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.amount} BDT</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${payment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                        payment.status === 'Declined' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                {payment.status === 'Pending' ? (
                                                    <div className="flex gap-3 justify-center">
                                                        <button
                                                            onClick={() => handleAction(payment.id, 'Approved')}
                                                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:from-green-600 hover:to-green-700 transition duration-200 ease-in-out transform hover:scale-105"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(payment.id, 'Declined')}
                                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition duration-200 ease-in-out transform hover:scale-105"
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 italic">Actioned</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </UserDashboardContainer>
    );
};

export default PaymentApprovalPage;