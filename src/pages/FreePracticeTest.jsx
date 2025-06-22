import React, { useRef } from 'react'; // Import useRef
import TestHeader from '../components/FreePracticeTest/TestHeader';
import FilterBar from "../components/FreePracticeTest/FilterBar";
import QuestionsSection from '../components/FreePracticeTest/QuestionsSection';
import { motion, useInView } from 'framer-motion'; // Import motion and useInView

function PracticeTests() {
  // Create refs for each section to observe their visibility
  const headerRef = useRef(null);
  const filterBarRef = useRef(null);
  const questionsSectionRef = useRef(null);

  // Use useInView hook to determine if an element is in view
  // The 'once: true' option ensures the animation only plays once when it comes into view
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 }); // Trigger when 50% of header is in view
  const isFilterBarInView = useInView(filterBarRef, { once: true, amount: 0.3 }); // Trigger when 30% of filter bar is in view
  const isQuestionsSectionInView = useInView(questionsSectionRef, { once: true, amount: 0.1 }); // Trigger when 10% of questions is in view

  // Define common animation variants for clarity and reusability
  const slideInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800">

      {/* TestHeader with scroll-triggered animation */}
      <motion.div
        ref={headerRef} // Attach the ref
        variants={slideInDown} // Use defined animation variants
        initial="hidden" // Start from the hidden state
        animate={isHeaderInView ? "visible" : "hidden"} // Animate to visible if in view
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
        <FilterBar />
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
        <QuestionsSection />
      </motion.div>
    </div>
  );
}

export default PracticeTests;