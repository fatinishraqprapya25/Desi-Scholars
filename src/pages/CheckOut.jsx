import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import validateToken from '../utils/ValidateToken';

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('bkashManual');
    const [transactionId, setTransactionId] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [productData, setProductData] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("HIJDFJFJF12");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`);
            if (!response.ok) {
                alert("no course found!");
                navigate("/courses");
            }
            const result = await response.json();
            if (!result.success) {
                alert(result.message);
                navigate("/courses");
            }

            if (!result.data.isPaid) {
                navigate("/courses");
            }
            setProductData(result.data);
        };

        fetchCourseDetails();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!transactionId.trim()) {
            setAlertMessage('Please enter the transaction ID.');
            return;
        }

        const transactionDetails = {
            purchaseId: productData._id,
            ammount: productData.price,
            paymentMethod,
            transactionId,
        };

        const sendTransactionRequest = async () => {
            try {
                const checkUser = await validateToken(token);
                transactionDetails.userId = checkUser.id;
                const response = await fetch("http://localhost:5000/api/payments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(transactionDetails)
                });

                const result = await response.json();
                if (result.success) {
                    alert("Transaction sent to server, they will approve or decline.");
                }
                setAlertMessage(result.message);
            } catch (err) {
                alert(err.message);
                setAlertMessage(err.message);
            }
        };

        sendTransactionRequest();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 font-sans antialiased">
            <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Secure Checkout
                </h2>

                <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
                    <p className="text-xl font-bold text-indigo-800 mb-1">{productData.courseName}</p>
                    <p className="text-2xl font-extrabold text-indigo-700">
                        {productData.price} BDT
                    </p>
                </div>

                {alertMessage && (
                    <div className={`mb-4 p-3 rounded-lg text-sm text-center
                        ${alertMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        shadow-md transition-all duration-300 ease-in-out transform scale-y-100 origin-top
                        `}>
                        {alertMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700 mb-3">Select Payment Method</label>
                        <div className="space-y-3">
                            <div className="flex items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
                                <input
                                    type="radio"
                                    id="bkash"
                                    name="paymentMethod"
                                    value="bkashManual"
                                    checked={paymentMethod === 'bkashManual'}
                                    onChange={(e) => { setPaymentMethod(e.target.value); setAlertMessage(null); }}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full cursor-pointer"
                                />
                                <label htmlFor="bkash" className="ml-3 text-base text-gray-800 font-medium cursor-pointer">
                                    bKash (Manual Payment)
                                </label>
                            </div>

                            <div className="flex items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
                                <input
                                    type="radio"
                                    id="nagad"
                                    name="paymentMethod"
                                    value="nagadManual"
                                    checked={paymentMethod === 'nagadManual'}
                                    onChange={(e) => { setPaymentMethod(e.target.value); setAlertMessage(null); }}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full cursor-pointer"
                                />
                                <label htmlFor="nagad" className="ml-3 text-base text-gray-800 font-medium cursor-pointer">
                                    Nagad (Manual Payment)
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700 mb-3" htmlFor="transactionId">
                            {paymentMethod === 'bkashManual' ? 'BKASH' : 'NAGAD'} Transaction ID
                        </label>
                        <input
                            type="text"
                            id="transactionId"
                            value={transactionId}
                            onChange={(e) => { setTransactionId(e.target.value); setAlertMessage(null); }}
                            placeholder="Enter your transaction ID"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-xl hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102"
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
