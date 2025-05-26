import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import AboutDSATScholars from "../components/home/AbouDsatScholars";
import CountdownTimer from "../components/home/CountDownTimer";
import FAQSection from "../components/home/Faq";
import FreeResources from "../components/home/FreeResources";
import PracticeTestPromo from "../components/home/PracticeDemo";
import Hero from "../components/home/Hero";
import OurTeam from "../components/home/OurTeam";
import Testimonials from "../components/home/Testimonials";
import TopCoursesCarousel from "../components/home/TopCourses";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <AboutDSATScholars />
            <OurTeam />
            <TopCoursesCarousel />
            <PracticeTestPromo />
            <FreeResources />
            <Testimonials />
            <CountdownTimer />
            <FAQSection />
            <Footer />
        </>
    );
}