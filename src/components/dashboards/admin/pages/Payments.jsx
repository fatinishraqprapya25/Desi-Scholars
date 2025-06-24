import React, { useState, useEffect } from 'react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

const PaymentApprovalPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('pending');

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/payments', {
                    headers: {
                        "Authorization": `Bearer ${adminToken}`
                    }
                });
                const result = await response.json();

                if (result.success) {
                    setPayments(result.data);
                } else {
                    throw new Error(result.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleAction = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/payments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify({ status }),
            });

            const result = await res.json();

            if (result.success) {
                setPayments(prev =>
                    prev.map(payment =>
                        payment._id === id ? { ...payment, status } : payment
                    )
                );
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Failed to update payment status.');
        }
    };

    const filteredPayments = payments.filter(payment => {
        if (activeFilter === 'all') return true;
        return payment.status?.toLowerCase() === activeFilter;
    });

    return (
        <UserDashboardContainer role="admin">
            <div className="min-h-screen p-4 md:p-6 font-sans antialiased">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-4 md:p-8">
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center text-indigo-700">
                        Payment Approvals Dashboard
                    </h1>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
                        {['pending', 'approved', 'declined', 'all'].map(status => (
                            <button
                                key={status}
                                onClick={() => setActiveFilter(status)}
                                className={`px-4 py-2 text-sm md:text-base rounded-full font-semibold transition-all duration-300
                                    ${activeFilter === status
                                        ? `text-white shadow-md scale-105 ${status === 'approved'
                                            ? 'bg-green-600'
                                            : status === 'declined'
                                                ? 'bg-red-600'
                                                : status === 'all'
                                                    ? 'bg-blue-600'
                                                    : 'bg-indigo-600'}`
                                        : 'bg-gray-200 text-gray-700 hover:bg-opacity-80 hover:text-indigo-700'}`}
                            >
                                {status === 'all' ? 'Payment History' :
                                    status.charAt(0).toUpperCase() + status.slice(1)} ({status === 'all'
                                        ? payments.length
                                        : payments.filter(p => p.status?.toLowerCase() === status).length})
                            </button>
                        ))}
                    </div>

                    {/* Status */}
                    {loading ? (
                        <p className="text-center text-lg text-gray-500 py-8">Loading payments...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 py-8">{error}</p>
                    ) : filteredPayments.length === 0 ? (
                        <p className="text-center text-lg text-gray-500 py-8">No payments found for this category.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">User</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Purchase ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Transaction ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Method</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {filteredPayments.map(payment => (
                                        <tr key={payment._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                {payment.userId?.name || payment.userId?.email || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3">{payment.purchaseId}</td>
                                            <td className="px-4 py-3">{payment.transactionId}</td>
                                            <td className="px-4 py-3">{payment.amount} BDT</td>
                                            <td className="px-4 py-3 capitalize">{payment.paymentMethod}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full
                                                    ${payment.status?.toLowerCase() === 'approved'
                                                        ? 'bg-green-100 text-green-800'
                                                        : payment.status?.toLowerCase() === 'declined'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {payment.status?.toLowerCase() === 'pending' ? (
                                                    <div className="flex justify-center flex-wrap gap-2">
                                                        <button
                                                            onClick={() => handleAction(payment._id, 'Approved')}
                                                            className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded transition transform hover:scale-105"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(payment._id, 'Declined')}
                                                            className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition transform hover:scale-105"
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 italic text-xs">Actioned</span>
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
