import { useState } from 'react';

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    const [transactionId, setTransactionId] = useState('');

    const course = {
        name: 'Full Stack Web Development',
        price: 5000, // You can make this dynamic if needed
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!transactionId.trim()) {
            alert('Please enter the transaction ID.');
            return;
        }

        // Here you would typically send data to your backend
        console.log('Checkout Details:', {
            courseName: course.name,
            price: course.price,
            paymentMethod,
            transactionId,
        });

        alert('Your payment details have been submitted!');
        setTransactionId('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>

                <div className="mb-4">
                    <p className="text-lg font-semibold">Course: {course.name}</p>
                    <p className="text-lg">Price: {course.price} BDT</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Select Payment Method</label>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id="bkash"
                                name="paymentMethod"
                                value="bkash"
                                checked={paymentMethod === 'bkash'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="bkash">bKash (Manual Payment)</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="nagad"
                                name="paymentMethod"
                                value="nagad"
                                checked={paymentMethod === 'nagad'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="nagad">Nagad (Manual Payment)</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="transactionId">
                            {paymentMethod.toUpperCase()} Transaction ID
                        </label>
                        <input
                            type="text"
                            id="transactionId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter your transaction ID"
                            className="w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
