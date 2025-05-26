import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is the duration of each course?",
    answer: "Most courses range from 4 to 12 weeks, depending on the topic and complexity. We offer highly flexible learning options, including self-paced modules and live sessions, allowing you to tailor your study schedule to fit your lifestyle and professional commitments. Our goal is to ensure you can complete the course effectively without feeling rushed.",
  },
  {
    question: "Will I get a certificate after completion?",
    answer: "Yes, upon successful completion of your course and all required assessments, you'll receive a verified digital certificate. This certificate is globally recognized and can be proudly shared on your professional profiles like LinkedIn, enhancing your resume and demonstrating your newly acquired skills to potential employers.",
  },
  {
    question: "Are your courses beginner-friendly?",
    answer: "Absolutely! We pride ourselves on structuring our content to be incredibly accessible and supportive for learners of all levels. Whether you're taking your very first step into coding or looking to deepen your existing knowledge, our curriculum, guided exercises, and community support are designed to help you succeed.",
  },
  {
    question: "Which payment methods do you accept?",
    answer: "We accept a comprehensive range of payment methods to ensure your convenience. These include major credit and debit cards such as Visa, MasterCard, and American Express, as well as popular mobile financial services like bKash, Nagad, and Rocket (for local transactions). Additionally, we support PayPal for international payments, providing secure and flexible options for everyone.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const accentPurple = '#8A4AF8'; // Consistent with TutorialsSection

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  return (
    <section className="bg-gradient-to-br from-[#EAEFFF] to-[#E0D7FA] py-12 sm:py-16 lg:py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center mb-8 lg:mb-10">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Frequently Asked <span className="text-[${accentPurple}]">Questions</span>
        </h2>
        <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
          Find answers to the most common questions about our courses and platform below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = index === activeIndex;
          return (
            <motion.div
              key={index}
              className="bg-[#21233F] border border-transparent rounded-xl shadow-xl transition-all duration-300 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={faqItemVariants}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => {}}
              onHoverEnd={() => {}}
            >
              <button
                onClick={() => toggleFAQ(index)}
                // Increased padding for question bars
                className={`w-full flex justify-between items-center px-6 py-4 text-left transition-all duration-300 ${isOpen ? `bg-[#3A3C5C] text-white border-b border-gray-600 rounded-t-xl` : `bg-[#21233F] text-white hover:bg-[#3A3C5C]/50 rounded-xl`}`}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 w-4 h-4 ${isOpen ? `rotate-180 text-[${accentPurple}]` : `rotate-0 text-gray-400`}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out px-6 ${isOpen ? "max-h-screen pb-3 pt-1" : "max-h-0"
                  }`} // Increased horizontal padding to match question bar, adjusted vertical
              >
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;