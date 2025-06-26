import React, { useEffect, useRef, useState } from 'react'; // Import useRef
import TestHeader from '../components/FreePracticeTest/TestHeader';
import FilterBar from "../components/FreePracticeTest/FilterBar";
import QuestionsSection from '../components/FreePracticeTest/QuestionsSection';
import { motion, useInView } from 'framer-motion'; // Import motion and useInView
import FreeResources from "../components/home/FreeResources";
import FAQSection from '../components/home/Faq';

// Define common animation variants for clarity and reusability
const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function PracticeTests() {
  const headerRef = useRef(null);
  const filterBarRef = useRef(null);
  const questionsSectionRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isFilterBarInView = useInView(filterBarRef, { once: true, amount: 0.3 });
  const isQuestionsSectionInView = useInView(questionsSectionRef, { once: true, amount: 0.1 });

  const [filters, setFilters] = useState({});

  const handleFilter = (f) => {
    setFilters(f);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800">

      <motion.div
        ref={headerRef}
        variants={slideInDown}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        <TestHeader />
      </motion.div>

      {/* FilterBar with scroll-triggered animation */}
      <motion.div
        ref={filterBarRef} // Attach the ref
        variants={slideInUp} // Use defined animation variants
        initial="hidden"
        animate={isFilterBarInView ? "visible" : "hidden"}
        // You can still add a slight delay here if you want items within the view to stagger
        transition={{ delay: 0.1 }}
      >
        <FilterBar callFilter={handleFilter} />
      </motion.div>

      {/* QuestionsSection with scroll-triggered animation */}
      <motion.div
        ref={questionsSectionRef} // Attach the ref
        variants={slideInUp} // Use defined animation variants
        initial="hidden"
        animate={isQuestionsSectionInView ? "visible" : "hidden"}
        // Add a slight delay for this component relative to the FilterBar
        transition={{ delay: 0.2 }}
      >
        <QuestionsSection filters={filters} />
      </motion.div>
      <FreeResources />
      <FAQSection />
    </div>
  );
}

export default PracticeTests;