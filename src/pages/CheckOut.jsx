import { useState } from 'react';

const CheckoutPage = () => {
    // State to manage the selected payment method (bKash or Nagad).
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    // State to store the transaction ID entered by the user.
    const [transactionId, setTransactionId] = useState('');
    // State for managing a custom alert message instead of browser's alert.
    const [alertMessage, setAlertMessage] = useState(null);

    // Dummy course data. This could be fetched from an API in a real application.
    const course = {
        name: 'Full Stack Web Development',
        price: 5000, // Example price in BDT
    };

    // Function to handle form submission.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior.

        // Basic validation for the transaction ID.
        if (!transactionId.trim()) {
            setAlertMessage('Please enter the transaction ID.');
            return;
        }

        // Log the checkout details (in a real app, this would be sent to a backend).
        console.log('Checkout Details:', {
            courseName: course.name,
            price: course.price,
            paymentMethod,
            transactionId,
        });

        // Show a success message.
        setAlertMessage('Your payment details have been submitted successfully!');
        // Clear the transaction ID input after submission.
        setTransactionId('');
        // Optionally, reset payment method if desired
        // setPaymentMethod('bkash');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 font-sans antialiased">
            {/* Main card container with enhanced styling */}
            <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-100">
                {/* Checkout Page Title */}
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Secure Checkout
                </h2>

                {/* Course Details Section */}
                <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
                    <p className="text-xl font-bold text-indigo-800 mb-1">{course.name}</p>
                    <p className="text-2xl font-extrabold text-indigo-700">
                        {course.price} BDT
                    </p>
                </div>

                {/* Custom Alert Message Display */}
                {alertMessage && (
                    <div className={`mb-4 p-3 rounded-lg text-sm text-center
                        ${alertMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        shadow-md transition-all duration-300 ease-in-out transform scale-y-100 origin-top
                        `}>
                        {alertMessage}
                    </div>
                )}

                {/* Payment Form */}
                <form onSubmit={handleSubmit}>
                    {/* Payment Method Selection */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700 mb-3">Select Payment Method</label>
                        <div className="space-y-3">
                            {/* bKash Radio Button */}
                            <div className="flex items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
                                <input
                                    type="radio"
                                    id="bkash"
                                    name="paymentMethod"
                                    value="bkash"
                                    checked={paymentMethod === 'bkash'}
                                    onChange={(e) => { setPaymentMethod(e.target.value); setAlertMessage(null); }}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full cursor-pointer"
                                />
                                <label htmlFor="bkash" className="ml-3 text-base text-gray-800 font-medium cursor-pointer">
                                    bKash (Manual Payment)
                                </label>
                            </div>
                            {/* Nagad Radio Button */}
                            <div className="flex items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
                                <input
                                    type="radio"
                                    id="nagad"
                                    name="paymentMethod"
                                    value="nagad"
                                    checked={paymentMethod === 'nagad'}
                                    onChange={(e) => { setPaymentMethod(e.target.value); setAlertMessage(null); }}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full cursor-pointer"
                                />
                                <label htmlFor="nagad" className="ml-3 text-base text-gray-800 font-medium cursor-pointer">
                                    Nagad (Manual Payment)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Transaction ID Input */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700 mb-3" htmlFor="transactionId">
                            {paymentMethod.toUpperCase()} Transaction ID
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

                    {/* Submit Button */}
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
