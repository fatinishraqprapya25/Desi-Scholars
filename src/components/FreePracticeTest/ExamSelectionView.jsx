import { motion } from "framer-motion";
import HeroSection from "./Hero";
import FeaturesSection from "./Featured";
import ExamListSection from "./ExamLists";
import NewsletterSection from "./NewsletterSection";
import Container from "../../components/common/Container"

const ExamSelectionView = ({ onSelectExam, email, setEmail, handleNewsletterSubmit }) => (
    <motion.div
        key="main-page-content"
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
        className="space-y-16 md:space-y-20 flex-grow"
    >
        <HeroSection />

        <Container>
            <ExamListSection onSelectExam={onSelectExam} />
        </Container>
        <NewsletterSection
            email={email}
            setEmail={setEmail}
            handleNewsletterSubmit={handleNewsletterSubmit}
        />
        <Container>
            <FeaturesSection />
        </Container>
    </motion.div>
);

export default ExamSelectionView;