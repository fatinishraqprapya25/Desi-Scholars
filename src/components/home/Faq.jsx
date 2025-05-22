import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        question: "What is the duration of each course?",
        answer: "Most courses range from 4 to 12 weeks, depending on the topic and complexity.",
    },
    {
        question: "Will I get a certificate after completion?",
        answer: "Yes, you'll receive a verified certificate upon successful course completion.",
    },
    {
        question: "Are your courses beginner-friendly?",
        answer: "Absolutely. We structure our content to help both beginners and experienced learners.",
    },
    {
        question: "Which payment methods do you accept?",
        answer: "We accept Visa, MasterCard, bKash, Nagad, Rocket, and PayPal.",
    },
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 text-lg">
                    Find answers to the most common questions below.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3"> {/* Reduced spacing from 6 to 3 */}
                {faqs.map((faq, index) => {
                    const isOpen = index === activeIndex;
                    return (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left bg-gradient-to-r from-gray-50 to-white rounded-2xl"
                            >
                                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                <FaChevronDown
                                    className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "rotate-0 text-gray-500"
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${isOpen ? "max-h-40 pb-4" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-700 text-sm">{faq.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQSection;
