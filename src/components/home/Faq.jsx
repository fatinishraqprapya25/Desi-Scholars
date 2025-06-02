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
  const lightPurpleBg = 'linear-gradient(to bottom right, #F5F3FF, #E0D7FA)'; // Consistent background gradient

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  const answerVariants = {
    open: { opacity: 1, height: "auto", paddingBottom: "1.5rem", paddingTop: "0.5rem", transition: { duration: 0.4, ease: "easeOut" } },
    closed: { opacity: 0, height: 0, paddingBottom: "0rem", paddingTop: "0rem", transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section
      className="py-12 sm:py-16 lg:py-24 px-4 font-sans relative overflow-hidden" // Added relative and overflow-hidden for blobs
      style={{ background: lightPurpleBg }}
    >
      {/* Decorative background blobs for modern look, consistent with TutorialsSection */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob lg:w-96 lg:h-96"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 lg:w-80 lg:h-80"></div>
      <div className="absolute top-1/4 left-1/2 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 lg:w-60 lg:h-60"></div>

      <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-14 relative z-10"> {/* Added z-10 */}
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight leading-tight">
          Frequently Asked <span style={{ color: accentPurple }}>Questions</span>
        </h2>
        <p className="text-gray-700 text-base lg:text-lg max-w-2xl mx-auto">
          Find comprehensive answers to the most common questions about our courses, platform, and learning experience below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 relative z-10"> {/* Added z-10 */}
        {faqs.map((faq, index) => {
          const isOpen = index === activeIndex;
          return (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden border-2
                ${isOpen ? `border-[${accentPurple}] shadow-xl` : `border-gray-200 hover:border-blue-300 hover:shadow-md`}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={faqItemVariants}
              transition={{ delay: index * 0.08 }} // Slightly increased delay for staggered effect
              whileHover={{ scale: isOpen ? 1 : 1.01 }} // Subtle scale on hover for non-active items
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center px-6 py-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
                  ${isOpen ? `bg-blue-50 text-blue-800 font-semibold` : `bg-white text-gray-800 hover:bg-gray-50`}`}
              >
                <span className="text-lg sm:text-xl font-medium">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 w-5 h-5 ${isOpen ? `rotate-180 text-[${accentPurple}]` : `rotate-0 text-gray-500`}`}
                />
              </button>

              <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={answerVariants}
                className="px-6" // Keep horizontal padding consistent
              >
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;